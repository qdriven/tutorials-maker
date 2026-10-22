import { describe, expect, it, vi } from 'vitest';
import { CanvasBridge } from './canvas_bridge';

describe('CanvasBridge', () => {
  it('assembles a high resolution canvas screenshot from RPC chunks', async () => {
    const screenshot = `data:image/jpeg;base64,${'a'.repeat(22_000)}`;
    const chunkSize = 10_000;

    const performRpc = vi.fn(async ({ method, payload }: { method: string; payload: string }) => {
      if (method === 'canvas.get_context') {
        return JSON.stringify({
          roomName: 'room-a',
          viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
          selectedShapeIds: [],
          recentEvents: [],
          shapes: [],
        });
      }

      if (method === 'canvas.prepare_screenshot') {
        return JSON.stringify({
          ok: true,
          token: 'shot-1',
          bytes: screenshot.length,
          charLength: screenshot.length,
          chunkCount: Math.ceil(screenshot.length / chunkSize),
          chunkSize,
        });
      }

      if (method === 'canvas.get_screenshot_chunk') {
        const { index } = JSON.parse(payload) as { index: number };
        return screenshot.slice(index * chunkSize, (index + 1) * chunkSize);
      }

      throw new Error(`Unexpected RPC method: ${method}`);
    });
    const room = {
      remoteParticipants: new Map([['student', { kind: 0, identity: 'student' }]]),
      localParticipant: { performRpc },
    };

    const bridge = new CanvasBridge(room as never);
    const context = await bridge.getContext();

    expect(context.screenshotDataUrl).toBe(screenshot);
    expect(performRpc).toHaveBeenCalledWith(
      expect.objectContaining({
        destinationIdentity: 'student',
        method: 'canvas.prepare_screenshot',
      }),
    );
    expect(performRpc).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'canvas.get_screenshot_chunk',
        payload: JSON.stringify({ token: 'shot-1', index: 2 }),
      }),
    );
  });
});
