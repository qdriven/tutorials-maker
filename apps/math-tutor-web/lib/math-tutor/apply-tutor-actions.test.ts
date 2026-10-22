import { describe, expect, it } from 'vitest';
import { applyTutorActionBatch, renderLatexFormulaSvg } from './apply-tutor-actions';

function rectanglesOverlap(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number }
) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function makeEditor() {
  const shapes: Array<Record<string, unknown>> = [];
  return {
    shapes,
    editor: {
      createShape(shape: Record<string, unknown>) {
        shapes.push(shape);
      },
      deleteShapes(ids: string[]) {
        shapes.push({ type: 'delete', ids });
      },
      getCurrentPageShapes() {
        return [
          { id: 'student-shape', meta: { owner: 'student' } },
          { id: 'ai-note', meta: { owner: 'ai' } },
        ];
      },
    },
  };
}

function makeEditorWithStudentBounds() {
  const shapes: Array<Record<string, unknown>> = [];
  const assets: Array<Record<string, unknown>> = [];
  const studentShape = {
    id: 'student-main-equation',
    type: 'draw',
    x: 100,
    y: 100,
    props: { w: 620, h: 120 },
    meta: { owner: 'student' },
  };

  return {
    assets,
    shapes,
    studentBounds: { x: 100, y: 100, w: 620, h: 120 },
    editor: {
      createAssets(newAssets: unknown[]) {
        assets.push(...(newAssets as Record<string, unknown>[]));
      },
      createShape(shape: Record<string, unknown>) {
        shapes.push(shape);
      },
      deleteShapes(ids: string[]) {
        shapes.push({ type: 'delete', ids });
      },
      getCurrentPageShapes() {
        return [studentShape];
      },
      getViewportPageBounds() {
        return { x: 0, y: 0, w: 1200, h: 800 };
      },
      getShapePageBounds(shape: unknown) {
        const candidate = shape as { x: number; y: number; props?: { w?: number; h?: number } };
        return {
          x: candidate.x,
          y: candidate.y,
          w: candidate.props?.w ?? 80,
          h: candidate.props?.h ?? 60,
        };
      },
    },
  };
}

function makeEditorWithAssets() {
  const shapes: Array<Record<string, unknown>> = [];
  const assets: Array<Record<string, unknown>> = [];
  return {
    assets,
    shapes,
    editor: {
      createAssets(newAssets: unknown[]) {
        assets.push(...(newAssets as Record<string, unknown>[]));
      },
      createShape(shape: Record<string, unknown>) {
        shapes.push(shape);
      },
      deleteShapes(ids: string[]) {
        shapes.push({ type: 'delete', ids });
      },
      getCurrentPageShapes() {
        return [];
      },
    },
  };
}

describe('applyTutorActionBatch', () => {
  it('turns tutor actions into tldraw shapes tagged as AI-owned annotations', () => {
    const { editor, shapes } = makeEditor();

    const result = applyTutorActionBatch(editor, [
      { type: 'write_text', text: 'Subtract three from both sides.', x: 220, y: 180 },
      { type: 'write_formula', latex: '2x = 4', x: 220, y: 240 },
      { type: 'mark_wrong', x: 380, y: 320, reason: 'Sign error here.' },
      { type: 'draw_arrow', from: { x: 350, y: 210 }, to: { x: 350, y: 270 } },
    ]);

    expect(result.clearTurnState).toBe(true);
    expect(shapes).toHaveLength(5);
    expect(
      shapes.every((shape) => shape.meta && (shape.meta as { owner?: string }).owner === 'ai')
    ).toBe(true);
    expect(shapes.map((shape) => shape.type)).toEqual(['text', 'text', 'geo', 'text', 'arrow']);

    const arrow = shapes[4] as {
      x: number;
      y: number;
      props: { start: { x: number; y: number }; end: { x: number; y: number } };
    };
    expect(arrow.x).toBe(350);
    expect(arrow.y).toBe(210);
    expect(arrow.props.start).toEqual({ x: 0, y: 0 });
    expect(arrow.props.end).toEqual({ x: 0, y: 60 });
  });

  it('ignores legacy highlight actions so yellow boxes are never drawn', () => {
    const { editor, shapes } = makeEditor();

    applyTutorActionBatch(editor, [
      { type: 'highlight', x: 210, y: 172, w: 260, h: 56, color: 'yellow', label: 'Factor this' },
    ]);

    expect(shapes).toHaveLength(0);
  });

  it('clears only AI annotations when requested', () => {
    const { editor, shapes } = makeEditor();

    const result = applyTutorActionBatch(editor, [{ type: 'clear_ai_annotations' }]);

    expect(result.clearTurnState).toBe(true);
    expect(shapes).toEqual([{ type: 'delete', ids: ['ai-note'] }]);
  });

  it('clears legacy AI hint and highlight shapes without AI metadata', () => {
    const deleted: string[][] = [];
    const editor = {
      createShape() {},
      deleteShapes(ids: string[]) {
        deleted.push(ids);
      },
      getCurrentPageShapes() {
        return [
          { id: 'student-shape', meta: { owner: 'student' } },
          {
            id: 'legacy-yellow-frame',
            type: 'geo',
            props: { color: 'yellow', geo: 'rectangle' },
          },
          {
            id: 'legacy-waiting-note',
            type: 'text',
            props: { richText: { type: 'doc', content: [{ text: 'YOUR TURN' }] } },
          },
        ];
      },
    };

    applyTutorActionBatch(editor, [{ type: 'clear_ai_annotations' }]);

    expect(deleted).toEqual([['legacy-yellow-frame', 'legacy-waiting-note']]);
  });

  it('renders LaTeX formulas as image assets instead of raw text', () => {
    const { editor, assets, shapes } = makeEditorWithAssets();

    applyTutorActionBatch(editor, [
      { type: 'write_formula', latex: 'y = \\frac{1}{2}', x: 220, y: 240 },
    ]);

    expect(assets).toHaveLength(1);
    expect(shapes).toHaveLength(1);
    expect(shapes[0]?.type).toBe('image');
    expect((shapes[0]?.props as { altText?: string }).altText).toBe('y = \\frac{1}{2}');
    expect(JSON.stringify(shapes[0])).not.toContain('richText');
    expect((assets[0]?.props as { src?: string }).src).toContain('data:image/svg+xml');
  });

  it('lays tutor explanations away from occupied student work before creating shapes', () => {
    const { editor, shapes, studentBounds } = makeEditorWithStudentBounds();

    applyTutorActionBatch(editor, [
      {
        type: 'write_text',
        text: 'This step changes the sign because we subtract eight from both sides.',
        x: 130,
        y: 130,
      },
      { type: 'write_formula', latex: '2x = -8', x: 130, y: 130 },
    ]);

    const tutorBounds = shapes.map((shape) => {
      const props = shape.props as { w?: number; h?: number };
      return {
        x: shape.x as number,
        y: shape.y as number,
        w: props.w ?? 240,
        h: props.h ?? 64,
      };
    });

    expect(tutorBounds.every((bounds) => !rectanglesOverlap(bounds, studentBounds))).toBe(true);
    expect(tutorBounds[1]!.y).toBeGreaterThan(tutorBounds[0]!.y);
  });

  it('renders wrong-step feedback as a compact mark plus a readable reason note', () => {
    const { editor, shapes } = makeEditorWithStudentBounds();

    applyTutorActionBatch(editor, [
      { type: 'mark_wrong', x: 560, y: 120, reason: 'Sign should be negative.' },
    ]);

    expect(shapes).toHaveLength(2);
    expect(shapes[0]).toMatchObject({
      type: 'geo',
      props: {
        geo: 'x-box',
        color: 'red',
      },
    });
    expect((shapes[0]?.props as { w?: number }).w).toBeGreaterThanOrEqual(24);
    expect((shapes[0]?.props as { w?: number }).w).toBeLessThanOrEqual(42);
    expect(shapes[1]).toMatchObject({
      type: 'text',
      props: {
        color: 'red',
        size: 's',
      },
    });
    expect(JSON.stringify(shapes[1])).toContain('Sign should be negative.');

    const noteProps = shapes[1]?.props as { w?: number; h?: number };
    expect(
      rectanglesOverlap(
        {
          x: shapes[1]?.x as number,
          y: shapes[1]?.y as number,
          w: noteProps.w ?? 240,
          h: noteProps.h ?? 40,
        },
        { x: 100, y: 100, w: 620, h: 120 }
      )
    ).toBe(false);
  });

  it('expands a semantic correct_step into a targeted mark and correction formula', () => {
    const { editor, shapes } = makeEditorWithStudentBounds();

    applyTutorActionBatch(editor, [
      {
        type: 'correct_step',
        targetShapeId: 'student-main-equation',
        reason: 'Subtract eight from both sides, so the right side becomes negative eight.',
        latex: '2x = -8',
      },
    ]);

    expect(shapes.map((shape) => shape.type)).toEqual(['geo', 'text', 'image']);
    expect(shapes[0]).toMatchObject({
      type: 'geo',
      props: { geo: 'x-box', color: 'red' },
    });
    expect(JSON.stringify(shapes[1])).toContain('Subtract eight from both sides');
    expect((shapes[2]?.props as { altText?: string }).altText).toBe('2x = -8');
    expect(shapes[0]?.x as number).toBeGreaterThan(680);
    expect(shapes[2]?.x as number).toBeGreaterThan(740);
  });

  it('renders a hint_card as a compact tutor card with an optional formula', () => {
    const { editor, assets, shapes, studentBounds } = makeEditorWithStudentBounds();

    applyTutorActionBatch(editor, [
      {
        type: 'hint_card',
        title: 'Next step',
        body: 'What common factor appears in both terms?',
        equation: 'x^2 + 7x',
        targetShapeId: 'student-main-equation',
      },
    ]);

    expect(assets).toHaveLength(1);
    expect(shapes.map((shape) => shape.type)).toEqual(['geo', 'text', 'text', 'image']);
    expect(shapes[0]).toMatchObject({
      type: 'geo',
      props: { geo: 'rectangle', color: 'blue', fill: 'semi' },
    });
    expect(JSON.stringify(shapes[1])).toContain('NEXT STEP');
    expect(JSON.stringify(shapes[2])).toContain('What common factor');
    expect((shapes[3]?.props as { altText?: string }).altText).toBe('x^2 + 7x');

    const cardProps = shapes[0]?.props as { w?: number; h?: number };
    expect(
      rectanglesOverlap(
        {
          x: shapes[0]?.x as number,
          y: shapes[0]?.y as number,
          w: cardProps.w ?? 320,
          h: cardProps.h ?? 160,
        },
        studentBounds
      )
    ).toBe(false);
  });

  it('turns ask_student into a blue prompt card and a waiting turn update', () => {
    const { editor, shapes } = makeEditorWithStudentBounds();

    const result = applyTutorActionBatch(editor, [
      {
        type: 'ask_student',
        targetShapeId: 'student-main-equation',
        question: 'What is negative eight divided by two?',
      },
    ]);

    expect(shapes).toHaveLength(3);
    expect(shapes[0]).toMatchObject({
      type: 'geo',
      props: {
        color: 'blue',
      },
    });
    expect(shapes[1]).toMatchObject({
      type: 'text',
      props: {
        color: 'blue',
      },
    });
    expect(JSON.stringify(shapes)).toContain('YOUR TURN');
    expect(result.turnStateUpdate).toMatchObject({
      phase: 'waiting_for_student',
      targetShapeId: 'student-main-equation',
      question: 'What is negative eight divided by two?',
    });
    expect(result.clearTurnState).toBeUndefined();
  });
});

describe('renderLatexFormulaSvg', () => {
  it('turns fractions into MathML inside an SVG data url', () => {
    const result = renderLatexFormulaSvg('y = \\frac{1}{2}');
    const svg = decodeURIComponent(result.src.replace('data:image/svg+xml;charset=utf-8,', ''));

    expect(result.width).toBeGreaterThan(40);
    expect(result.height).toBeGreaterThan(40);
    expect(svg).toContain('<mfrac>');
    expect(svg).toContain('<mn>1</mn>');
    expect(svg).toContain('<mn>2</mn>');
  });
});
