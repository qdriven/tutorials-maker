import { type TutorCanvasAction, layoutFlowchartSpec } from '@tutorials-maker/math-tutor-protocol';

export type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type LayoutShape = {
  id: string;
  type: string;
  x: number;
  y: number;
  props?: object;
  meta?: Record<string, unknown>;
};

export type LayoutEditor = {
  getCurrentPageShapes(): LayoutShape[];
  getShapePageBounds?(shape: unknown): Rect | undefined;
  getViewportPageBounds?(): Rect;
};

export type TutorVisualScale = {
  studentLineHeight: number;
  formulaHeight: number;
  formulaFontSize: number;
  noteFontSize: number;
  noteWidth: number;
  markSize: number;
  strokeWidth: number;
  itemGap: number;
  blockGap: number;
  margin: number;
};

export type ResolvedTutorCanvasAction = TutorCanvasAction & {
  layout: {
    bounds: Rect;
    noteBounds?: Rect;
    scale: TutorVisualScale;
  };
};

export type PrimitiveTutorCanvasAction = Exclude<
  TutorCanvasAction,
  { type: 'correct_step' } | { type: 'ask_student' }
>;

type OccupiedRect = {
  rect: Rect;
  owner: 'student' | 'ai' | 'system';
};

const FALLBACK_STUDENT_LINE_HEIGHT = 82;
const MAX_LAYOUT_COORD = 4000;

export function layoutTutorActions(
  editor: LayoutEditor,
  actions: PrimitiveTutorCanvasAction[]
): ResolvedTutorCanvasAction[] {
  const scale = deriveTutorVisualScale(editor);
  const occupied = getOccupiedRects(editor, scale.margin);
  const resolvedActions: ResolvedTutorCanvasAction[] = [];
  let previousWrite: { hint: Rect; placed: Rect } | undefined;

  for (const action of actions) {
    if (action.type === 'clear_ai_annotations') {
      removeAiOccupiedRects(occupied);
      previousWrite = undefined;
      resolvedActions.push(withLayout(action, { x: 0, y: 0, w: 0, h: 0 }, scale));
      continue;
    }

    const measured = measureTutorAction(action, scale);
    const hint = actionHintRect(editor, action, measured);

    const placement =
      shouldFreelyOverlayTarget(action) || !('x' in action)
        ? hint
        : placeRect(editor, hint, measured, occupied, scale, previousWrite);
    const placedBounds = { ...placement, w: measured.w, h: measured.h };

    const noteBounds = placeLocalNoteIfNeeded(editor, action, placedBounds, occupied, scale);
    const resolved = withLayout(moveAction(action, placedBounds), placedBounds, scale, noteBounds);
    resolvedActions.push(resolved);

    occupied.push({
      rect: inflateRect(placedBounds, scale.margin),
      owner: 'ai',
    });
    if (noteBounds) {
      occupied.push({
        rect: inflateRect(noteBounds, scale.margin),
        owner: 'ai',
      });
    }

    previousWrite =
      action.type === 'write_text' || action.type === 'write_formula' || action.type === 'hint_card'
        ? { hint, placed: placedBounds }
        : undefined;
  }

  return resolvedActions;
}

export function deriveTutorVisualScale(editor: LayoutEditor): TutorVisualScale {
  const studentHeights = editor
    .getCurrentPageShapes()
    .filter((shape) => getShapeOwner(shape) === 'student')
    .map((shape) => getShapeBounds(editor, shape)?.h)
    .filter((height): height is number => typeof height === 'number' && height >= 12)
    .sort((a, b) => a - b);

  const studentLineHeight =
    studentHeights.length > 0
      ? clamp(median(studentHeights), 36, 150)
      : FALLBACK_STUDENT_LINE_HEIGHT;

  const formulaHeight = clamp(studentLineHeight * 0.85, 48, 88);
  const noteFontSize = clamp(studentLineHeight * 0.36, 22, 34);

  return {
    studentLineHeight,
    formulaHeight,
    formulaFontSize: clamp(formulaHeight * 0.68, 36, 58),
    noteFontSize,
    noteWidth: clamp(studentLineHeight * 5.6, 300, 460),
    markSize: clamp(studentLineHeight * 0.35, 24, 42),
    strokeWidth: clamp(studentLineHeight * 0.045, 3, 6),
    itemGap: clamp(studentLineHeight * 0.22, 18, 30),
    blockGap: clamp(studentLineHeight * 0.5, 36, 64),
    margin: clamp(studentLineHeight * 0.16, 12, 24),
  };
}

export function rectanglesOverlap(a: Rect, b: Rect) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function inflateRect(rect: Rect, amount: number): Rect {
  return {
    x: rect.x - amount,
    y: rect.y - amount,
    w: rect.w + amount * 2,
    h: rect.h + amount * 2,
  };
}

function placeRect(
  editor: LayoutEditor,
  hint: Rect,
  measured: Pick<Rect, 'w' | 'h'>,
  occupied: OccupiedRect[],
  scale: TutorVisualScale,
  previousWrite?: { hint: Rect; placed: Rect }
): Rect {
  const currentOccupied = occupied.map((item) => item.rect);
  const occupiedBounds = unionRects(currentOccupied);
  const viewport = editor.getViewportPageBounds?.();
  const sameTutorBlock =
    previousWrite &&
    Math.abs(previousWrite.hint.x - hint.x) <= scale.margin &&
    hint.y >= previousWrite.hint.y - scale.margin &&
    hint.y - previousWrite.hint.y <= scale.studentLineHeight * 4.2;

  const tutorBlockStackGap = Math.max(scale.itemGap, scale.margin * 2 + 4);
  const rightLaneX = Math.min(
    MAX_LAYOUT_COORD - measured.w,
    Math.max((occupiedBounds?.x ?? hint.x) + (occupiedBounds?.w ?? 0) + scale.blockGap, hint.x)
  );
  const belowBoardY = Math.min(
    MAX_LAYOUT_COORD - measured.h,
    (occupiedBounds ? occupiedBounds.y + occupiedBounds.h : hint.y) + scale.blockGap
  );

  const candidates: Rect[] = [
    ...(sameTutorBlock && previousWrite
      ? [
          {
            x: previousWrite.placed.x,
            y: previousWrite.placed.y + previousWrite.placed.h + tutorBlockStackGap,
            w: measured.w,
            h: measured.h,
          },
        ]
      : []),
    { ...hint, w: measured.w, h: measured.h },
    { x: rightLaneX, y: hint.y, w: measured.w, h: measured.h },
    {
      x: rightLaneX,
      y: Math.max(viewport?.y ?? 0, (viewport?.y ?? 0) + scale.blockGap),
      w: measured.w,
      h: measured.h,
    },
    { x: hint.x, y: belowBoardY, w: measured.w, h: measured.h },
    {
      x: Math.max(viewport?.x ?? 0, hint.x),
      y: belowBoardY,
      w: measured.w,
      h: measured.h,
    },
  ].map((candidate) => keepRectWithinUsefulBounds(candidate, viewport, scale.margin));

  const clearCandidate = candidates.find((candidate) => !collides(candidate, currentOccupied));
  if (clearCandidate) return clearCandidate;

  return keepRectWithinUsefulBounds(
    {
      x: rightLaneX,
      y: belowBoardY,
      w: measured.w,
      h: measured.h,
    },
    viewport,
    scale.margin
  );
}

function measureTutorAction(
  action: PrimitiveTutorCanvasAction,
  scale: TutorVisualScale
): Pick<Rect, 'w' | 'h'> {
  switch (action.type) {
    case 'write_text':
      return measureTutorText(action.text, scale);
    case 'write_formula':
      return measureTutorFormula(action.latex, scale);
    case 'hint_card':
      return measureTutorHintCard(action, scale);
    case 'highlight':
      return {
        w: action.w,
        h: action.h + (action.label ? scale.itemGap + scale.noteFontSize * 1.35 : 0),
      };
    case 'draw_arrow':
      return {
        w: Math.max(24, Math.abs(action.to.x - action.from.x)),
        h: Math.max(24, Math.abs(action.to.y - action.from.y)),
      };
    case 'mark_wrong':
    case 'mark_correct':
      return {
        w: scale.markSize,
        h: scale.markSize,
      };
    case 'draw_flowchart': {
      const flowchartLayout = layoutFlowchartSpec(action.spec, { x: 0, y: 0 });
      return {
        w: flowchartLayout.width,
        h: flowchartLayout.height,
      };
    }
    case 'trace_flowchart':
      return {
        w: 160,
        h: 48,
      };
    case 'clear_ai_annotations':
      return { w: 0, h: 0 };
  }
}

function measureTutorHintCard(
  action: Extract<PrimitiveTutorCanvasAction, { type: 'hint_card' }>,
  scale: TutorVisualScale
): Pick<Rect, 'w' | 'h'> {
  const width = clamp(scale.noteWidth * 1.08, 320, 500);

  const bodyCharWidth = scale.noteFontSize * 0.72;
  const bodyLineCount = Math.max(1, Math.ceil((action.body.length * bodyCharWidth) / (width - 44)));
  const equationHeight = action.equation?.trim() ? scale.formulaHeight * 0.72 + scale.itemGap : 0;

  return {
    w: width,
    h:
      scale.noteFontSize * 1.25 +
      bodyLineCount * scale.noteFontSize * 1.48 +
      equationHeight +
      scale.itemGap * 2.2,
  };
}

function measureTutorText(text: string, scale: TutorVisualScale): Pick<Rect, 'w' | 'h'> {
  const charWidth = scale.noteFontSize * 0.56;
  const idealWidth = clamp(text.length * charWidth + scale.noteFontSize, 180, scale.noteWidth);
  const lineCount = Math.max(1, Math.ceil((text.length * charWidth) / idealWidth));
  return {
    w: idealWidth,
    h: lineCount * scale.noteFontSize * 1.28 + scale.noteFontSize * 0.7,
  };
}

function measureLocalNote(text: string, scale: TutorVisualScale): Pick<Rect, 'w' | 'h'> {
  const width = Math.min(320, scale.noteWidth);
  const charWidth = Math.max(12, scale.noteFontSize * 0.46);
  const lineCount = Math.max(1, Math.ceil((text.length * charWidth) / width));

  return {
    w: width,
    h: lineCount * scale.noteFontSize * 1.18 + scale.noteFontSize * 0.45,
  };
}

function placeLocalNoteIfNeeded(
  editor: LayoutEditor,
  action: TutorCanvasAction,
  markBounds: Rect,
  occupied: OccupiedRect[],
  scale: TutorVisualScale
) {
  const text =
    action.type === 'mark_wrong'
      ? action.reason
      : action.type === 'mark_correct'
        ? action.note
        : undefined;
  if (!text) return undefined;

  const measured = measureLocalNote(text, scale);
  const hint = {
    x: markBounds.x + markBounds.w + scale.itemGap * 0.5,
    y: markBounds.y,
    w: measured.w,
    h: measured.h,
  };

  return placeRect(editor, hint, measured, occupied, scale);
}

function measureTutorFormula(latex: string, scale: TutorVisualScale): Pick<Rect, 'w' | 'h'> {
  const compactLatex = latex
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)')
    .replace(/\\left|\\right/g, '');
  const hasFraction = /\\frac/.test(latex);
  return {
    w: clamp(compactLatex.length * scale.formulaFontSize * 0.56 + 28, 92, 620),
    h: Math.min(96, scale.formulaHeight + (hasFraction ? 14 : 0)),
  };
}

function actionHintRect(
  editor: LayoutEditor,
  action: PrimitiveTutorCanvasAction,
  measured: Pick<Rect, 'w' | 'h'>
): Rect {
  switch (action.type) {
    case 'write_text':
    case 'write_formula':
    case 'hint_card':
      {
        const targetBounds = findTargetBounds(editor, action.targetShapeId);
        if (targetBounds) {
          return {
            x: targetBounds.x + targetBounds.w + 32,
            y: targetBounds.y,
            ...measured,
          };
        }
      }
      return {
        x:
          typeof action.x === 'number' ? action.x : (editor.getViewportPageBounds?.().x ?? 0) + 120,
        y:
          typeof action.y === 'number' ? action.y : (editor.getViewportPageBounds?.().y ?? 0) + 120,
        ...measured,
      };
    case 'draw_arrow':
      return {
        x: Math.min(action.from.x, action.to.x),
        y: Math.min(action.from.y, action.to.y),
        ...measured,
      };
    case 'clear_ai_annotations':
      return { x: 0, y: 0, ...measured };
    case 'draw_flowchart':
    case 'trace_flowchart':
      return {
        x:
          typeof action.x === 'number' ? action.x : (editor.getViewportPageBounds?.().x ?? 0) + 120,
        y:
          typeof action.y === 'number' ? action.y : (editor.getViewportPageBounds?.().y ?? 0) + 120,
        ...measured,
      };
    case 'mark_wrong':
    case 'mark_correct':
      {
        const targetBounds = findTargetBounds(editor, action.targetShapeId);
        if (targetBounds) {
          return {
            x: targetBounds.x + targetBounds.w - measured.w * 0.35,
            y: targetBounds.y + targetBounds.h / 2 - measured.h / 2,
            ...measured,
          };
        }
      }
      return { x: action.x, y: action.y, ...measured };
    default:
      return { x: action.x, y: action.y, ...measured };
  }
}

function findTargetBounds(editor: LayoutEditor, targetShapeId?: string) {
  if (!targetShapeId) return undefined;
  const shape = editor.getCurrentPageShapes().find((candidate) => candidate.id === targetShapeId);
  return shape ? getShapeBounds(editor, shape) : undefined;
}

function moveAction(action: PrimitiveTutorCanvasAction, rect: Rect): PrimitiveTutorCanvasAction {
  switch (action.type) {
    case 'write_text':
    case 'write_formula':
    case 'hint_card':
    case 'mark_wrong':
    case 'mark_correct':
      return {
        ...action,
        x: Math.round(rect.x),
        y: Math.round(rect.y),
      };
    case 'draw_flowchart':
    case 'trace_flowchart':
      return {
        ...action,
        x: Math.round(rect.x),
        y: Math.round(rect.y),
      };
    case 'highlight':
    case 'draw_arrow':
    case 'clear_ai_annotations':
      return action;
  }
}

function withLayout(
  action: PrimitiveTutorCanvasAction,
  bounds: Rect,
  scale: TutorVisualScale,
  noteBounds?: Rect
): ResolvedTutorCanvasAction {
  return {
    ...action,
    layout: {
      bounds: roundRect(bounds),
      ...(noteBounds ? { noteBounds: roundRect(noteBounds) } : {}),
      scale,
    },
  } as ResolvedTutorCanvasAction;
}

function shouldFreelyOverlayTarget(action: PrimitiveTutorCanvasAction) {
  return (
    action.type === 'highlight' || action.type === 'mark_wrong' || action.type === 'mark_correct'
  );
}

function getOccupiedRects(editor: LayoutEditor, margin: number): OccupiedRect[] {
  return editor
    .getCurrentPageShapes()
    .map((shape) => {
      const bounds = getShapeBounds(editor, shape);
      if (!bounds) return undefined;
      return {
        rect: inflateRect(bounds, margin),
        owner: getShapeOwner(shape),
      };
    })
    .filter((item): item is OccupiedRect => Boolean(item));
}

function removeAiOccupiedRects(occupied: OccupiedRect[]) {
  for (let index = occupied.length - 1; index >= 0; index -= 1) {
    if (occupied[index]?.owner === 'ai') {
      occupied.splice(index, 1);
    }
  }
}

function getShapeOwner(shape: LayoutShape): 'student' | 'ai' | 'system' {
  if (shape.meta?.owner === 'ai') return 'ai';
  if (shape.meta?.owner === 'system') return 'system';
  return 'student';
}

function getShapeBounds(editor: LayoutEditor, shape: LayoutShape): Rect | undefined {
  const pageBounds = editor.getShapePageBounds?.(shape);
  if (pageBounds && pageBounds.w > 0 && pageBounds.h > 0) {
    return {
      x: pageBounds.x,
      y: pageBounds.y,
      w: pageBounds.w,
      h: pageBounds.h,
    };
  }

  const props = shape.props ?? {};
  const shapeProps = props as { w?: unknown; h?: unknown };
  const width = typeof shapeProps.w === 'number' ? shapeProps.w : undefined;
  const height = typeof shapeProps.h === 'number' ? shapeProps.h : undefined;
  if (!width || !height) return undefined;

  return {
    x: shape.x,
    y: shape.y,
    w: width,
    h: height,
  };
}

function collides(rect: Rect, occupied: Rect[]) {
  return occupied.some((item) => rectanglesOverlap(rect, item));
}

function unionRects(rects: Rect[]) {
  if (rects.length === 0) return undefined;

  const minX = Math.min(...rects.map((rect) => rect.x));
  const minY = Math.min(...rects.map((rect) => rect.y));
  const maxX = Math.max(...rects.map((rect) => rect.x + rect.w));
  const maxY = Math.max(...rects.map((rect) => rect.y + rect.h));

  return {
    x: minX,
    y: minY,
    w: maxX - minX,
    h: maxY - minY,
  };
}

function keepRectWithinUsefulBounds(rect: Rect, viewport: Rect | undefined, margin: number): Rect {
  if (!viewport) return roundRect(rect);

  return roundRect({
    ...rect,
    x: clamp(rect.x, viewport.x + margin, MAX_LAYOUT_COORD - rect.w),
    y: Math.max(viewport.y + margin, rect.y),
  });
}

function median(values: number[]) {
  const middle = Math.floor(values.length / 2);
  if (values.length % 2 === 1) return values[middle] ?? FALLBACK_STUDENT_LINE_HEIGHT;
  return (
    ((values[middle - 1] ?? FALLBACK_STUDENT_LINE_HEIGHT) +
      (values[middle] ?? FALLBACK_STUDENT_LINE_HEIGHT)) /
    2
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function roundRect(rect: Rect): Rect {
  return {
    x: Math.round(rect.x),
    y: Math.round(rect.y),
    w: Math.round(rect.w),
    h: Math.round(rect.h),
  };
}
