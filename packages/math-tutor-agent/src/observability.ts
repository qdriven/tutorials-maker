import { log } from '@livekit/agents';

type LogPayload = Record<string, unknown>;
type LogMethod = (payload: LogPayload, message?: string) => void;

export type TutorLogger = {
  child: (payload: LogPayload) => TutorLogger;
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
};

const noopLogger: TutorLogger = {
  child: () => noopLogger,
  debug: () => undefined,
  info: () => undefined,
  warn: () => undefined,
  error: () => undefined,
};

export function createTutorLogger(component: string): TutorLogger {
  try {
    return log().child({ app: 'math-tutor', component }) as TutorLogger;
  } catch {
    return noopLogger.child({ component });
  }
}

export function summarizeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack?.split('\n').slice(0, 5).join('\n'),
    };
  }

  if (typeof error === 'object' && error !== null) {
    const candidate = error as Record<string, unknown>;
    return {
      name: typeof candidate.name === 'string' ? candidate.name : undefined,
      message: typeof candidate.message === 'string' ? candidate.message : String(error),
      statusCode: candidate.statusCode,
      body: candidate.body,
      recoverable: candidate.recoverable,
    };
  }

  return { message: String(error) };
}

export function elapsedMs(startedAt: number) {
  return Date.now() - startedAt;
}
