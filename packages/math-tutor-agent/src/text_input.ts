import type { llm } from '@livekit/agents';
import { type TutorLogger, createTutorLogger, elapsedMs, summarizeError } from './observability';

type MathTutorTextAgent = {
  shouldWriteCanvasForText: (text: string) => boolean;

  writeSolutionStepsFromText: (text: string) => Promise<string>;

  buildCanvasAwareTextMessage: (text: string) => Promise<llm.ChatMessage>;
};

type TextInputSession = {
  say: (
    text: string,
    options?: {
      allowInterruptions?: boolean;
      addToChatCtx?: boolean;
    },
  ) => unknown;
  generateReply: (options: {
    userInput?: string | llm.ChatMessage;
    instructions?: string;
    inputModality?: 'text' | 'audio';
  }) => unknown;
};

type TextInputEvent = {
  text: string;
};

type TextInputOptions = {
  logger?: TutorLogger;
};

export function createTextInputCallback(
  mathTutorAgent: MathTutorTextAgent,
  options: TextInputOptions = {},
) {
  const logger = options.logger ?? createTutorLogger('text_input');

  let turnQueue: Promise<void> = Promise.resolve();

  return async (session: TextInputSession, event: TextInputEvent) => {
    const text = event.text.trim();
    if (!text) return;

    const runTurn = turnQueue.then(() =>
      handleTextInputTurn(session, mathTutorAgent, text, logger),
    );
    turnQueue = runTurn.catch(() => undefined);
    await runTurn;
  };
}

async function handleTextInputTurn(
  session: TextInputSession,
  mathTutorAgent: MathTutorTextAgent,
  text: string,
  logger: TutorLogger,
) {
  const startedAt = Date.now();
  const shouldWriteCanvas = mathTutorAgent.shouldWriteCanvasForText(text);
  logger.info(
    {
      event: 'text_input.received',
      textLength: text.length,
      shouldWriteCanvas,
    },
    'received typed tutor turn',
  );

  if (shouldWriteCanvas) {
    try {
      const narration = await mathTutorAgent.writeSolutionStepsFromText(text);
      session.say(narration, {
        allowInterruptions: true,
        addToChatCtx: true,
      });
      logger.info(
        {
          event: 'text_input.canvas_write.done',
          durationMs: elapsedMs(startedAt),
          narrationLength: narration.length,
        },
        'typed tutor turn wrote canvas actions',
      );
      return;
    } catch (error) {
      logger.warn(
        {
          event: 'text_input.canvas_write.failed',
          durationMs: elapsedMs(startedAt),
          error: summarizeError(error),
        },
        'typed tutor turn canvas write failed',
      );
    }
  }

  try {
    const message = await mathTutorAgent.buildCanvasAwareTextMessage(text);
    session.generateReply({ userInput: message, inputModality: 'text' });
    logger.info(
      {
        event: 'text_input.reply_scheduled',
        durationMs: elapsedMs(startedAt),
      },
      'typed tutor turn reply scheduled',
    );
  } catch (error) {
    logger.error(
      {
        event: 'text_input.failed',
        durationMs: elapsedMs(startedAt),
        error: summarizeError(error),
      },
      'typed tutor turn failed',
    );
  }
}
