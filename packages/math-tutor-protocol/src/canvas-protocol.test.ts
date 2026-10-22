import { describe, expect, it } from 'vitest';
import { normalizeTutorCommand } from './canvas-protocol';

describe('normalizeTutorCommand', () => {
  it('keeps a draw_flowchart action and its spec', () => {
    const command = normalizeTutorCommand({
      narration: 'I drew the flowchart.',
      actions: [
        {
          type: 'draw_flowchart',
          spec: {
            nodes: [
              { id: 's', kind: 'start', label: '开始' },
              { id: 'e', kind: 'end', label: '结束' },
            ],
            edges: [{ from: 's', to: 'e' }],
          },
          x: 120,
          y: 240,
        },
      ],
    });

    expect(command.actions[0]?.type).toBe('draw_flowchart');
    expect(command.actions[0]?.type === 'draw_flowchart' ? command.actions[0].spec.nodes : [])
      .toHaveLength(2);
  });

  it('keeps a trace_flowchart action with its path', () => {
    const command = normalizeTutorCommand({
      actions: [{ type: 'trace_flowchart', path: ['s', 'p1'], note: 'first branch' }],
    });

    expect(command.actions[0]?.type).toBe('trace_flowchart');
    expect(command.actions[0]?.type === 'trace_flowchart' ? command.actions[0].path : []).toEqual([
      's',
      'p1',
    ]);
  });

  it('clamps out of range coordinates on flowchart actions', () => {
    const command = normalizeTutorCommand({
      actions: [{ type: 'draw_flowchart', spec: { nodes: [{ id: 's', kind: 'start' }], edges: [] }, x: 99999, y: -40 }],
    });

    const action = command.actions[0];
    expect(action?.type === 'draw_flowchart' ? action.x : undefined).toBe(4000);
    expect(action?.type === 'draw_flowchart' ? action.y : undefined).toBe(0);
  });

  it('rejects an unknown flowchart node kind', () => {
    expect(() =>
      normalizeTutorCommand({
        actions: [
          {
            type: 'draw_flowchart',
            spec: { nodes: [{ id: 's', kind: 'loop' }], edges: [] },
          },
        ],
      })
    ).toThrow();
  });

  it('keeps the original action set working', () => {
    const command = normalizeTutorCommand({
      actions: [{ type: 'write_formula', latex: 'x = 1', x: 10, y: 20 }],
    });

    expect(command.actions[0]?.type).toBe('write_formula');
  });
});
