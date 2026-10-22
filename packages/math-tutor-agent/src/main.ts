import { type JobContext, ServerOptions, cli, defineAgent, voice } from '@livekit/agents';
import * as silero from '@livekit/agents-plugin-silero';
import { audioEnhancement } from '@livekit/plugins-ai-coustics';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { Agent } from './agent';
import { CanvasBridge } from './canvas_bridge';
import { INITIAL_GREETING_INSTRUCTIONS } from './greeting';
import { type TutorLogger, createTutorLogger, summarizeError } from './observability';
import { createMathTutorPipelineSession } from './pipeline';
import { createTextInputCallback } from './text_input';

dotenv.config({ path: '.env.local' });

interface ProcessUserData extends Record<string, unknown> {
  vad: silero.VAD;
}

export default defineAgent<ProcessUserData>({
  prewarm: async (proc) => {
    // silero.VAD.load() is typed as the base LiveKit VAD class, but at runtime it
    // returns the plugin's Silero VAD implementation.
    proc.userData.vad = (await silero.VAD.load()) as silero.VAD;
  },

  entry: async (ctx) => {
    const logger = createTutorLogger('runtime').child({
      roomName: ctx.room.name,
      jobId: ctx.job.id,
    });
    logger.info({ event: 'job.entry' }, 'math tutor job entry started');

    const canvasBridge = new CanvasBridge(ctx.room, logger.child({ component: 'canvas_bridge' }));
    const mathTutorAgent = new Agent(canvasBridge);

    const session = createMathTutorPipelineSession(ctx.proc.userData.vad);
    observeAgentSession(session, logger, () => setAgentRuntimeStatus(ctx, logger, 'failed'));

    await session.start({
      agent: mathTutorAgent,
      room: ctx.room,
      inputOptions: {
        noiseCancellation: audioEnhancement({ model: 'quailVfS' }),
        textInputCallback: createTextInputCallback(mathTutorAgent, {
          logger: logger.child({ component: 'text_input' }),
        }),
      },
    });

    await ctx.connect();
    await setAgentRuntimeStatus(ctx, logger, 'running');

    session.generateReply({
      instructions: INITIAL_GREETING_INSTRUCTIONS,
    });
  },
});

function observeAgentSession(
  session: voice.AgentSession,
  logger: TutorLogger,
  markFailed: () => Promise<void>,
) {
  session.on(voice.AgentSessionEventTypes.AgentStateChanged, (event) => {
    logger.info(
      {
        event: 'agent.state.changed',
        oldState: event.oldState,
        newState: event.newState,
      },
      'agent state changed',
    );
  });

  session.on(voice.AgentSessionEventTypes.UserStateChanged, (event) => {
    logger.info(
      {
        event: 'user.state.changed',
        oldState: event.oldState,
        newState: event.newState,
      },
      'user state changed',
    );
  });

  session.on(voice.AgentSessionEventTypes.UserInputTranscribed, (event) => {
    logger.info(
      {
        event: 'user.input.transcribed',
        isFinal: event.isFinal,
        transcriptLength: event.transcript.length,
        language: event.language,
      },
      'user input transcribed',
    );
  });

  session.on(voice.AgentSessionEventTypes.SpeechCreated, (event) => {
    logger.info(
      {
        event: 'speech.created',
        source: event.source,
        speechId: event.speechHandle.id,
        userInitiated: event.userInitiated,
      },
      'speech handle created',
    );
  });

  session.on(voice.AgentSessionEventTypes.FunctionToolsExecuted, (event) => {
    logger.info(
      {
        event: 'tools.executed',
        toolNames: event.functionCalls.map((call) => call.name),
        outputCount: event.functionCallOutputs.length,
      },
      'llm tools executed',
    );
  });

  session.on(voice.AgentSessionEventTypes.Error, (event) => {
    logger.error(
      {
        event: 'agent.session.error',
        error: summarizeError(event.error),
      },
      'agent session emitted error',
    );
  });

  session.on(voice.AgentSessionEventTypes.Close, (event) => {
    logger.info(
      {
        event: 'agent.session.close',
        reason: event.reason,
        error: event.error ? summarizeError(event.error) : null,
      },
      'agent session closed',
    );
    if (event.reason === 'error') {
      void markFailed();
    }
  });
}

async function setAgentRuntimeStatus(
  ctx: JobContext,
  logger: TutorLogger,
  status: 'running' | 'failed' | 'closed',
) {
  try {
    await ctx.agent?.setAttributes({
      'mathTutor.agentStatus': status,
      'mathTutor.agentStatusAt': new Date().toISOString(),
    });
  } catch (error) {
    logger.warn(
      {
        event: 'agent.status_attribute.failed',
        status,
        error: summarizeError(error),
      },
      'failed to update agent runtime status attribute',
    );
  }
}

cli.runApp(
  new ServerOptions({
    agent: fileURLToPath(import.meta.url),
    agentName: process.env.AGENT_NAME ?? 'math-tutor',
  }),
);
