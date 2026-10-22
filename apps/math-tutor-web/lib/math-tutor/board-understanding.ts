import type {
  BoardUnderstanding,
  CanvasEvent,
  CanvasShape,
} from '@tutorials-maker/math-tutor-protocol';

const MAX_BOARD_STEPS = 40;
const MAX_STEP_TEXT_CHARS = 220;

export function buildBoardUnderstanding(
  shapes: CanvasShape[],
  selectedShapeIds: string[],
  recentEvents: CanvasEvent[] = []
): BoardUnderstanding {
  const selected = new Set(selectedShapeIds);

  const studentShapes = shapes
    .filter((shape) => shape.owner === 'student')
    .filter((shape) => hasUsefulBounds(shape))
    .filter(
      (shape) => Boolean(shape.text?.trim()) || shape.type === 'draw' || shape.type === 'image'
    )
    .sort((a, b) => a.y - b.y || a.x - b.x)
    .slice(0, MAX_BOARD_STEPS);

  const steps = studentShapes.map((shape, index) => ({
    id: `student_step_${index + 1}`,
    shapeId: shape.id,
    role: classifyStepRole(shape, index),
    index: index + 1,
    ...(shape.text?.trim() ? { text: trimStepText(shape.text.trim()) } : {}),
    x: shape.x,
    y: shape.y,
    w: shape.w ?? inferShapeWidth(shape),
    h: shape.h ?? inferShapeHeight(shape),
  }));

  const activeSelectedStep = steps.find((step) => selected.has(step.shapeId));
  const recentlyChangedStep = findRecentlyChangedStep(steps, recentEvents);
  const activeStepId = activeSelectedStep?.id ?? recentlyChangedStep?.id ?? steps.at(-1)?.id;

  return {
    ...(activeStepId ? { activeStepId } : {}),
    steps,
  };
}

function classifyStepRole(
  shape: CanvasShape,
  index: number
): 'problem' | 'student_step' | 'scratch' {
  if (shape.type === 'image') return 'problem';
  if (index === 0 && looksLikeMath(shape.text)) return 'problem';
  if (looksLikeMath(shape.text)) return 'student_step';
  return 'scratch';
}

function findRecentlyChangedStep(steps: BoardUnderstanding['steps'], recentEvents: CanvasEvent[]) {
  const stepByShapeId = new Map(steps.map((step) => [step.shapeId, step]));
  const eventsNewestFirst = [...recentEvents]
    .filter(
      (event) => (event.type === 'shape_created' || event.type === 'shape_updated') && event.shapeId
    )
    .sort((a, b) => Date.parse(b.at) - Date.parse(a.at));

  for (const event of eventsNewestFirst) {
    const step = event.shapeId ? stepByShapeId.get(event.shapeId) : undefined;
    if (step) return step;
  }

  return undefined;
}

function looksLikeMath(text?: string) {
  if (!text) return false;
  return /[=+\-*/÷×]|\\frac|\d\s*[a-z](?![a-z])|(?:^|[^a-z])[a-z]\s*\d/i.test(text);
}

function hasUsefulBounds(shape: CanvasShape) {
  return Number.isFinite(shape.x) && Number.isFinite(shape.y);
}

function inferShapeWidth(shape: CanvasShape) {
  if (shape.text) return Math.max(120, Math.min(720, shape.text.length * 22));
  return 180;
}

function inferShapeHeight(shape: CanvasShape) {
  return shape.text ? 64 : 80;
}

function trimStepText(text: string) {
  if (text.length <= MAX_STEP_TEXT_CHARS) return text;
  return `${text.slice(0, MAX_STEP_TEXT_CHARS - 1)}...`;
}
