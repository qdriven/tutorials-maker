import { inference, voice } from '@livekit/agents';
import * as livekit from '@livekit/agents-plugin-livekit';
import type * as silero from '@livekit/agents-plugin-silero';

export const DEFAULT_STT_MODEL = 'deepgram/nova-3';
export const DEFAULT_STT_LANGUAGE = 'multi';
export const DEFAULT_TTS_MODEL = 'cartesia/sonic-3';
export const DEFAULT_TTS_VOICE = '9626c31c-bec5-4cca-baa8-f8ba9e84c8bc';
export const DEFAULT_TTS_LANGUAGE = 'en';

type PipelineDependencies = {
  createTurnDetector?: () => NonNullable<
    voice.AgentSessionOptions['turnHandling']
  >['turnDetection'];
};

export function createMathTutorPipelineOptions(
  vad: silero.VAD,
  dependencies: PipelineDependencies = {},
): voice.AgentSessionOptions {
  const createTurnDetector =
    dependencies.createTurnDetector ?? (() => new livekit.turnDetector.MultilingualModel());

  return {
    stt: new inference.STT({
      model: process.env.MATH_TUTOR_STT_MODEL ?? DEFAULT_STT_MODEL,
      language: process.env.MATH_TUTOR_STT_LANGUAGE ?? DEFAULT_STT_LANGUAGE,
    }),
    tts: new inference.TTS({
      model: process.env.MATH_TUTOR_TTS_MODEL ?? DEFAULT_TTS_MODEL,
      voice: process.env.MATH_TUTOR_TTS_VOICE ?? DEFAULT_TTS_VOICE,
      language: process.env.MATH_TUTOR_TTS_LANGUAGE ?? DEFAULT_TTS_LANGUAGE,
    }),
    vad,
    turnHandling: {
      turnDetection: createTurnDetector(),
      preemptiveGeneration: { enabled: true },
    },
  };
}

export function createMathTutorPipelineSession(
  vad: silero.VAD,
  dependencies: PipelineDependencies = {},
) {
  return new voice.AgentSession(createMathTutorPipelineOptions(vad, dependencies));
}
