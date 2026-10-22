import { describe, expect, it, vi } from 'vitest';
import { createTextInputCallback } from './text_input';

describe('createTextInputCallback', () => {
  it('queues typed fallback turns without interrupting active playout', async () => {
    const agent = {
      shouldWriteCanvasForText: vi.fn(() => false),
      buildCanvasAwareTextMessage: vi.fn(async (text: string) => ({ role: 'user', text })),
    };
    const session = {
      interrupt: vi.fn(),
      say: vi.fn(),
      generateReply: vi.fn(),
    };

    const callback = createTextInputCallback(agent as never);
    await callback(session as never, { text: ' What is on the board? ' } as never);

    expect(session.interrupt).not.toHaveBeenCalled();
    expect(session.generateReply).toHaveBeenCalledWith({
      userInput: { role: 'user', text: 'What is on the board?' },
      inputModality: 'text',
    });
  });

  it('writes canvas solution requests before generating a short spoken confirmation', async () => {
    const agent = {
      shouldWriteCanvasForText: vi.fn(() => true),
      writeSolutionStepsFromText: vi.fn(async () => 'I wrote two steps.'),
      buildCanvasAwareTextMessage: vi.fn(),
    };
    const session = {
      interrupt: vi.fn(),
      say: vi.fn(),
      generateReply: vi.fn(),
    };

    const callback = createTextInputCallback(agent as never);
    await callback(session as never, { text: 'Write the solution on the canvas.' } as never);

    expect(session.interrupt).not.toHaveBeenCalled();
    expect(agent.writeSolutionStepsFromText).toHaveBeenCalledWith(
      'Write the solution on the canvas.',
    );
    expect(agent.buildCanvasAwareTextMessage).not.toHaveBeenCalled();
    expect(session.generateReply).not.toHaveBeenCalled();
    expect(session.say).toHaveBeenCalledWith('I wrote two steps.', {
      allowInterruptions: true,
      addToChatCtx: true,
    });
  });
});
