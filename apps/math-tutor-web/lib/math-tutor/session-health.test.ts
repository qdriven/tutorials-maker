import { describe, expect, it } from 'vitest';
import { getTutorSessionHealth } from './session-health';

describe('getTutorSessionHealth', () => {
  it('marks the tutor as failed when the agent reports a runtime failure', () => {
    const health = getTutorSessionHealth({
      isConnected: true,
      agentState: 'listening',
      agentStatus: 'failed',
      now: 10_000,
      pendingUserMessageAt: null,
    });

    expect(health.status).toBe('failed');
    expect(health.canSendPrompt).toBe(false);
  });

  it('marks the tutor as stalled when a user turn has no assistant response in time', () => {
    const health = getTutorSessionHealth({
      isConnected: true,
      agentState: 'listening',
      agentStatus: 'running',
      now: 46_000,
      pendingUserMessageAt: 1_000,
      hasAssistantResponseAfterPending: false,
    });

    expect(health.status).toBe('stalled');
    expect(health.canSendPrompt).toBe(false);
  });

  it('allows prompts when a pending turn has received a later assistant response', () => {
    const health = getTutorSessionHealth({
      isConnected: true,
      agentState: 'listening',
      agentStatus: 'running',
      now: 46_000,
      pendingUserMessageAt: 1_000,
      hasAssistantResponseAfterPending: true,
    });

    expect(health.status).toBe('ready');
    expect(health.canSendPrompt).toBe(true);
  });
});
