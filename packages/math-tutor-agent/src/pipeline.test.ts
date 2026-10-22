import { initializeLogger } from '@livekit/agents';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMathTutorPipelineOptions } from './pipeline';

describe('createMathTutorPipelineOptions', () => {
  beforeEach(() => {
    initializeLogger({ pretty: false, level: 'silent' });
    vi.stubEnv('LIVEKIT_API_KEY', 'test-api-key');
    vi.stubEnv('LIVEKIT_API_SECRET', 'test-api-secret');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('configures a LiveKit STT and Cartesia TTS tutoring pipeline by default', () => {
    const vad = { kind: 'fake-vad' };
    const turnDetector = { kind: 'fake-turn-detector' };
    const options = createMathTutorPipelineOptions(vad as never, {
      createTurnDetector: () => turnDetector as never,
    });

    expect(options.vad).toBe(vad);
    expect(options.stt).toMatchObject({
      model: 'deepgram/nova-3',
      opts: expect.objectContaining({ language: 'multi' }),
    });
    expect(options.tts).toMatchObject({
      model: 'cartesia/sonic-3',
      opts: expect.objectContaining({
        voice: '9626c31c-bec5-4cca-baa8-f8ba9e84c8bc',
        language: 'en',
      }),
    });
    expect(options.turnHandling).toMatchObject({
      preemptiveGeneration: { enabled: true },
    });
    expect(options.turnHandling?.turnDetection).toBe(turnDetector);
  });

  it('allows provider model overrides from environment variables', () => {
    vi.stubEnv('MATH_TUTOR_STT_MODEL', 'deepgram/flux-general');
    vi.stubEnv('MATH_TUTOR_STT_LANGUAGE', 'en');
    vi.stubEnv('MATH_TUTOR_TTS_MODEL', 'cartesia/sonic-turbo');
    vi.stubEnv('MATH_TUTOR_TTS_VOICE', 'voice-test');
    vi.stubEnv('MATH_TUTOR_TTS_LANGUAGE', 'en-US');

    const options = createMathTutorPipelineOptions({} as never, {
      createTurnDetector: () => ({}) as never,
    });

    expect(options.stt).toMatchObject({
      model: 'deepgram/flux-general',
      opts: expect.objectContaining({ language: 'en' }),
    });
    expect(options.tts).toMatchObject({
      model: 'cartesia/sonic-turbo',
      opts: expect.objectContaining({
        voice: 'voice-test',
        language: 'en-US',
      }),
    });
  });
});
