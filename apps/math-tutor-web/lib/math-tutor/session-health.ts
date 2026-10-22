const DEFAULT_TUTOR_RESPONSE_TIMEOUT_MS = 45_000;

export type TutorSessionHealthStatus =
  'disconnected' | 'connecting' | 'ready' | 'busy' | 'failed' | 'stalled';

export type TutorSessionHealthInput = {
  isConnected: boolean;
  agentState: string;
  agentStatus?: string;
  now: number;
  pendingUserMessageAt: number | null;
  hasAssistantResponseAfterPending?: boolean;
  timeoutMs?: number;
};

export type TutorSessionHealth = {
  status: TutorSessionHealthStatus;
  canSendPrompt: boolean;
  message?: string;
};

export function getTutorSessionHealth({
  isConnected,
  agentState,
  agentStatus,
  now,
  pendingUserMessageAt,
  hasAssistantResponseAfterPending = false,
  timeoutMs = DEFAULT_TUTOR_RESPONSE_TIMEOUT_MS,
}: TutorSessionHealthInput): TutorSessionHealth {
  if (!isConnected) {
    return { status: 'disconnected', canSendPrompt: false };
  }

  if (agentStatus === 'failed' || agentState === 'failed') {
    return {
      status: 'failed',
      canSendPrompt: false,
      message: 'The tutor connection stopped. Restart the session to continue.',
    };
  }

  const hasUnansweredTurn = pendingUserMessageAt !== null && !hasAssistantResponseAfterPending;

  if (hasUnansweredTurn && now - pendingUserMessageAt >= timeoutMs) {
    return {
      status: 'stalled',
      canSendPrompt: false,
      message: 'The tutor is taking too long to respond. Restart the session to reconnect.',
    };
  }

  if (agentState === 'thinking' || agentState === 'speaking' || hasUnansweredTurn) {
    return { status: 'busy', canSendPrompt: false };
  }

  if (agentState === 'connecting' || agentState === 'initializing' || agentState === 'idle') {
    return { status: 'connecting', canSendPrompt: false };
  }

  return { status: 'ready', canSendPrompt: true };
}
