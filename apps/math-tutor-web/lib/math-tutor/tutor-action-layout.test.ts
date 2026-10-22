import { describe, expect, it } from 'vitest';
import {
  type LayoutShape,
  type PrimitiveTutorCanvasAction,
  deriveTutorVisualScale,
  layoutTutorActions,
  rectanglesOverlap,
} from './tutor-action-layout';

function makeEditor(shapes: LayoutShape[], viewport = { x: 0, y: 0, w: 1200, h: 800 }) {
  return {
    getCurrentPageShapes() {
      return shapes;
    },
    getViewportPageBounds() {
      return viewport;
    },
    getShapePageBounds(shape: LayoutShape) {
      const props = (shape.props ?? {}) as { w?: number; h?: number };
      return {
        x: shape.x,
        y: shape.y,
        w: props.w ?? 80,
        h: props.h ?? 60,
      };
    },
  };
}

function studentShape(id: string, x: number, y: number, w: number, h: number): LayoutShape {
  return {
    id,
    type: 'draw',
    x,
    y,
    props: { w, h },
    meta: { owner: 'student' },
  };
}

function layoutBounds(action: ReturnType<typeof layoutTutorActions>[number]) {
  expect(action.layout).toBeDefined();
  return action.layout.bounds;
}

describe('layoutTutorActions', () => {
  it('stacks consecutive tutor formulas from the same hint without overlap', () => {
    const editor = makeEditor([studentShape('problem', 80, 80, 420, 90)]);
    const actions: PrimitiveTutorCanvasAction[] = [
      { type: 'write_formula', latex: '2x + 8 - 8 = 0 - 8', x: 620, y: 120 },
      { type: 'write_formula', latex: '2x = -8', x: 620, y: 120 },
      { type: 'write_formula', latex: 'x = -4', x: 620, y: 120 },
    ];

    const resolved = layoutTutorActions(editor, actions);

    expect(resolved[0]?.type).toBe('write_formula');
    expect(resolved[1]?.type).toBe('write_formula');
    expect(resolved[2]?.type).toBe('write_formula');
    expect(rectanglesOverlap(layoutBounds(resolved[0]!), layoutBounds(resolved[1]!))).toBe(false);
    expect(rectanglesOverlap(layoutBounds(resolved[1]!), layoutBounds(resolved[2]!))).toBe(false);
    expect((resolved[1] as { y: number }).y).toBeGreaterThan((resolved[0] as { y: number }).y);
    expect((resolved[2] as { y: number }).y).toBeGreaterThan((resolved[1] as { y: number }).y);
  });

  it('moves explanatory text away from occupied student work', () => {
    const student = studentShape('student-main-equation', 100, 100, 620, 120);
    const editor = makeEditor([student]);

    const [resolved] = layoutTutorActions(editor, [
      {
        type: 'write_text',
        text: 'This step changes the sign because we subtract eight from both sides.',
        x: 130,
        y: 130,
      },
    ]);

    expect(resolved?.type).toBe('write_text');
    expect(rectanglesOverlap(layoutBounds(resolved!), { x: 100, y: 100, w: 620, h: 120 })).toBe(
      false
    );
  });

  it('falls back to a right-side solution lane when the local area is crowded', () => {
    const editor = makeEditor([
      studentShape('problem', 80, 80, 700, 120),
      studentShape('wrong-step', 80, 240, 700, 120),
      studentShape('scratch', 80, 400, 700, 160),
    ]);

    const [resolved] = layoutTutorActions(editor, [
      { type: 'write_formula', latex: '2x = -8', x: 120, y: 250 },
    ]);

    expect(resolved?.type).toBe('write_formula');
    expect((resolved as { x: number }).x).toBeGreaterThanOrEqual(820);
  });

  it('does not clamp a solution lane back into a narrow current viewport', () => {
    const editor = makeEditor(
      [studentShape('problem', 80, 80, 700, 120), studentShape('wrong-step', 80, 240, 700, 120)],
      { x: 0, y: 0, w: 520, h: 420 }
    );

    const [resolved] = layoutTutorActions(editor, [
      {
        type: 'write_text',
        text: 'I will keep the correction in the right-side lane.',
        x: 120,
        y: 250,
      },
    ]);

    expect((resolved as { x: number }).x).toBeGreaterThanOrEqual(820);
  });

  it('keeps tutor visual scale readable but bounded by student work size', () => {
    const small = deriveTutorVisualScale(makeEditor([studentShape('small', 40, 40, 180, 32)]));
    const large = deriveTutorVisualScale(makeEditor([studentShape('large', 40, 40, 480, 220)]));

    expect(small.formulaHeight).toBeGreaterThanOrEqual(48);
    expect(small.noteFontSize).toBeGreaterThanOrEqual(22);
    expect(large.formulaHeight).toBeLessThanOrEqual(88);
    expect(large.noteFontSize).toBeLessThanOrEqual(34);
    expect(large.markSize).toBeLessThanOrEqual(42);
    expect(large.strokeWidth).toBeLessThanOrEqual(6);
  });

  it('leaves attention marks close to their hinted target while scaling the mark', () => {
    const editor = makeEditor([studentShape('wrong-step', 100, 100, 500, 100)]);

    const [resolved] = layoutTutorActions(editor, [
      { type: 'mark_wrong', x: 560, y: 110, reason: 'The sign should be negative here.' },
    ]);

    expect(resolved?.type).toBe('mark_wrong');
    expect((resolved as { x: number }).x).toBe(560);
    expect(layoutBounds(resolved!).w).toBeGreaterThanOrEqual(24);
    expect(layoutBounds(resolved!).w).toBeLessThanOrEqual(42);
  });

  it('anchors a wrong-step mark to the target shape instead of a stale coordinate hint', () => {
    const editor = makeEditor([studentShape('wrong-step', 100, 240, 520, 88)]);

    const [resolved] = layoutTutorActions(editor, [
      {
        type: 'mark_wrong',
        targetShapeId: 'wrong-step',
        x: 20,
        y: 20,
        reason: 'The sign should be negative here.',
      },
    ]);

    expect(resolved?.type).toBe('mark_wrong');
    expect((resolved as { x: number }).x).toBeGreaterThan(580);
    expect((resolved as { y: number }).y).toBeGreaterThan(250);
  });

  it('anchors a correction formula to the target shape instead of a stale coordinate hint', () => {
    const editor = makeEditor([studentShape('wrong-step', 100, 240, 520, 88)]);

    const [resolved] = layoutTutorActions(editor, [
      {
        type: 'write_formula',
        targetShapeId: 'wrong-step',
        latex: '2x = -8',
        x: 20,
        y: 20,
      },
    ]);

    expect(resolved?.type).toBe('write_formula');
    expect((resolved as { x: number }).x).toBeGreaterThan(640);
    expect((resolved as { y: number }).y).toBeGreaterThan(220);
  });

  it('keeps generated solution steps in a single vertical column', () => {
    const editor = makeEditor([studentShape('uploaded-homework', 80, 80, 520, 300)]);

    const resolved = layoutTutorActions(editor, [
      {
        type: 'write_text',
        text: 'Factor out x.',
        x: 700,
        y: 120,
      },
      {
        type: 'write_formula',
        latex: 'x(x + 7) = 0',
        x: 700,
        y: 178,
      },
      {
        type: 'write_text',
        text: 'Set each factor equal to zero.',
        x: 700,
        y: 246,
      },
      {
        type: 'write_formula',
        latex: 'x = 0',
        x: 700,
        y: 304,
      },
      {
        type: 'write_formula',
        latex: 'x + 7 = 0',
        x: 700,
        y: 362,
      },
      {
        type: 'write_formula',
        latex: 'x = -7',
        x: 700,
        y: 420,
        color: 'green',
      },
    ]);

    const writeActions = resolved.filter(
      (action) => action.type === 'write_text' || action.type === 'write_formula'
    );
    const xPositions = writeActions.map((action) => Math.round((action as { x: number }).x));
    const yPositions = writeActions.map((action) => Math.round((action as { y: number }).y));

    expect(new Set(xPositions).size).toBe(1);
    expect(yPositions).toEqual([...yPositions].sort((a, b) => a - b));
  });
});
