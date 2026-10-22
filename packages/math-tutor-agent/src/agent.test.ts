import { initializeLogger } from '@livekit/agents';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Agent, shouldWriteCanvasForText } from './agent';
import type { CanvasBridge } from './canvas_bridge';

describe('Agent canvas-aware text input', () => {
  beforeEach(() => {
    initializeLogger({ pretty: false, level: 'silent' });
    vi.stubEnv('GOOGLE_API_KEY', 'test-google-api-key');
    vi.stubEnv('LIVEKIT_API_KEY', 'test-api-key');
    vi.stubEnv('LIVEKIT_API_SECRET', 'test-api-secret');
    vi.stubEnv('LIVEKIT_URL', 'wss://example.livekit.cloud');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('keeps canvas images out of tutor LLM typed messages by default', async () => {
    const canvas = {
      getContext: async () => ({
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        screenshotDataUrl: 'data:image/jpeg;base64,abc',
        shapes: [],
      }),
    } as unknown as CanvasBridge;

    const agent = new Agent(canvas, {
      describeCanvasImage: async () => undefined,
    });
    const message = await agent.buildCanvasAwareTextMessage('What can you see?');

    expect(message.textContent).toContain('What can you see?');
    expect(message.textContent).toContain('Do not assume the board is blank');
    expect(message.content.some((content) => typeof content !== 'string')).toBe(false);
  });

  it('adds a textual visual summary to typed fallback messages', async () => {
    const canvas = {
      getContext: async () => ({
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        screenshotDataUrl: 'data:image/jpeg;base64,abc',
        shapes: [],
      }),
    } as unknown as CanvasBridge;

    const agent = new Agent(canvas, {
      describeCanvasImage: async () =>
        'The current board shows 2x + 3 = 7, then 2x = 4, then x = 2.',
    });
    const message = await agent.buildCanvasAwareTextMessage('What is on the board?');

    expect(message.textContent).toContain('Current visual canvas summary');
    expect(message.textContent).toContain('2x + 3 = 7');
    expect(message.textContent).toContain('trust the current board state');
  });

  it('reuses a fresh canvas snapshot between text context and readCanvas', async () => {
    let contextReads = 0;
    let visualReads = 0;
    const canvas = {
      getContext: async () => {
        contextReads += 1;
        return {
          roomName: 'room-a',
          viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
          selectedShapeIds: [],
          recentEvents: [],
          screenshotDataUrl: 'data:image/jpeg;base64,abc',
          shapes: [{ id: 'shape:draw-1', type: 'draw', x: 100, y: 120, owner: 'student' }],
        };
      },
    } as unknown as CanvasBridge;

    const agent = new Agent(canvas, {
      describeCanvasImage: async () => {
        visualReads += 1;
        return 'The board shows 2x + 8 = 0.';
      },
    });

    await agent.buildCanvasAwareTextMessage('What can you see?');
    const readResult = await agent.toolCtx.readCanvas.execute({}, {} as never);

    expect(readResult).toContain('2x + 8 = 0');
    expect(contextReads).toBe(1);
    expect(visualReads).toBe(1);
  });

  it('uses Gemini through LiveKit Inference as the tutor LLM', () => {
    const agent = new Agent();
    const tutorModel = agent.llm as { label: () => string; model: string };

    expect(tutorModel.label()).toBe('inference.LLM');
    expect(tutorModel.model).toBe('google/gemini-2.5-flash');
  });

  it('tells voice turns that full-process requests imply writing on the canvas', () => {
    const agent = new Agent();

    expect(String(agent.instructions)).toContain(
      'If the student asks you to write the whole process, complete solution, full solution, worked steps, or entire process, treat that as a canvas-writing request even if they do not repeat the word canvas or board.',
    );
    expect(agent.toolCtx.writeSolutionStepsOnCanvas.description).toContain(
      'Use this for requests like "write the whole process", "show the complete solution", or "walk through the full steps", even if the student does not repeat the word canvas or board.',
    );
    expect(agent.toolCtx.writeSolutionStepsOnCanvas.description).toContain(
      'Also use this for direct homework requests like "solve it for me", "solve this equation", or "help me solve this problem".',
    );
  });

  it('returns a visual canvas summary from readCanvas for realtime voice turns', async () => {
    const canvas = {
      getContext: async () => ({
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        screenshotDataUrl: 'data:image/jpeg;base64,abc',
        shapes: [{ id: 'shape:draw-1', type: 'draw', x: 100, y: 120, owner: 'student' }],
      }),
    } as unknown as CanvasBridge;

    const agent = new Agent(canvas, {
      describeCanvasImage: async () =>
        'The board visually shows the handwritten equation 2x + 8 = 0.',
    });

    const result = await agent.toolCtx.readCanvas.execute({}, {} as never);

    expect(result).toContain('Current visual canvas summary');
    expect(result).toContain('2x + 8 = 0');
  });

  it('detects explicit requests to write solution steps on the canvas', () => {
    expect(
      shouldWriteCanvasForText(
        'Please solve the equation and write the full solution steps directly on the canvas.',
      ),
    ).toBe(true);
    expect(
      shouldWriteCanvasForText(
        'Now check whether the final answer is correct. Please mark the final answer on the canvas.',
      ),
    ).toBe(true);
    expect(shouldWriteCanvasForText('Please annotate the mistake on the whiteboard.')).toBe(true);
    expect(shouldWriteCanvasForText('What is on the board?')).toBe(false);
  });

  it('treats explicit full-process requests as canvas write requests inside the tutor', () => {
    expect(shouldWriteCanvasForText('Can you write the whole process for me?')).toBe(true);
    expect(shouldWriteCanvasForText('Please show me the complete solution steps.')).toBe(true);
  });

  it('treats direct solve-it homework requests as canvas write requests inside the tutor', () => {
    expect(shouldWriteCanvasForText('Can you solve it for me?')).toBe(true);
    expect(shouldWriteCanvasForText('Please solve this equation.')).toBe(true);
    expect(shouldWriteCanvasForText('Can you explain what I wrote?')).toBe(false);
  });

  it('does not treat view-only board questions as canvas write requests', () => {
    expect(shouldWriteCanvasForText('I drew a triangle on the board. Can you see it?')).toBe(false);
    expect(shouldWriteCanvasForText('Please check what is written on the whiteboard first.')).toBe(
      false,
    );
  });

  it('writes generated solution steps to the canvas for explicit text requests', async () => {
    const applied: unknown[] = [];
    const canvas = {
      getContext: async () => ({
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        screenshotDataUrl: 'data:image/jpeg;base64,abc',
        shapes: [],
      }),
      applyCommand: async (command: unknown) => {
        applied.push(command);
        return JSON.stringify({ ok: true });
      },
    } as unknown as CanvasBridge;

    const agent = new Agent(canvas, {
      describeCanvasImage: async () => 'The board shows 2x + 8 = 0.',
      createCanvasSolutionCommand: async () => ({
        narration: 'I wrote the steps.',
        actions: [{ type: 'write_formula', latex: 'x = -4', x: 440, y: 260 }],
      }),
    });

    const result = await agent.writeSolutionStepsFromText('Write the solution on the canvas.');

    expect(result).toBe('I wrote the steps.');
    expect(applied).toHaveLength(1);
    expect(applied[0]).toMatchObject({
      actions: [{ type: 'write_formula', latex: 'x = -4' }],
    });
  });

  it('emits structured logs for the canvas solution write pipeline', async () => {
    const events: string[] = [];
    const logger = {
      child: () => logger,
      debug: () => undefined,
      info: (payload: Record<string, unknown>) => {
        if (typeof payload.event === 'string') events.push(payload.event);
      },
      warn: (payload: Record<string, unknown>) => {
        if (typeof payload.event === 'string') events.push(payload.event);
      },
      error: (payload: Record<string, unknown>) => {
        if (typeof payload.event === 'string') events.push(payload.event);
      },
    };
    const canvas = {
      getContext: async () => ({
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        screenshotDataUrl: 'data:image/jpeg;base64,abc',
        shapes: [{ id: 'shape:problem', type: 'draw', x: 100, y: 120, owner: 'student' }],
      }),
      applyCommand: async () => JSON.stringify({ ok: true }),
    } as unknown as CanvasBridge;

    const agent = new Agent(canvas, {
      logger,
      describeCanvasImage: async () => 'The board shows 2x + 8 = 0.',
      createCanvasSolutionCommand: async () => ({
        narration: 'I wrote the steps.',
        actions: [{ type: 'write_formula', latex: 'x = -4', x: 440, y: 260 }],
      }),
    });

    await agent.writeSolutionStepsFromText('Write the solution on the canvas.');

    expect(events).toEqual([
      'canvas_solution.start',
      'canvas_solution.context.done',
      'canvas_solution.visual_summary.done',
      'canvas_solution.command.generated',
      'canvas_solution.done',
    ]);
  });
});
