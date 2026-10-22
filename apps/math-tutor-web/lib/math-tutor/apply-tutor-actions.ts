import katex from 'katex';
import type { TLAsset } from 'tldraw';
import { AssetRecordType, toRichText } from 'tldraw';
import type { TutorCanvasAction } from '@tutorials-maker/math-tutor-protocol';
import { createFlowchartShapes, createFlowchartTraceShapes } from './flowchart-canvas';
import {
  type LayoutShape,
  type PrimitiveTutorCanvasAction,
  type ResolvedTutorCanvasAction,
  type TutorVisualScale,
  layoutTutorActions,
} from './tutor-action-layout';
import { createWaitingForStudentTurn } from './tutor-turn-state';

type ShapeLike = {
  id: string;
  type?: string;
  x?: number;
  y?: number;
  props?: object;
  meta?: Record<string, unknown>;
};

type TutorEditor = {
  createAssets?(assets: TLAsset[]): unknown;
  createShape(shape: Record<string, unknown>): void;
  deleteShapes(ids: string[]): void;
  getCurrentPageShapes(): ShapeLike[];
  getShapePageBounds?(shape: unknown): { x: number; y: number; w: number; h: number } | undefined;
  getViewportPageBounds?(): { x: number; y: number; w: number; h: number };
};

export type TutorActionBatchResult = {
  turnStateUpdate?: ReturnType<typeof createWaitingForStudentTurn>;
  clearTurnState?: boolean;
};

const FORMULA_FONT_SIZE = 54;
const FORMULA_PADDING = 10;
const FALLBACK_NOTE_WIDTH = 360;
const HINT_CARD_PADDING = 18;

const AI_META = {
  owner: 'ai',
  role: 'tutor-annotation',
};

function colorFor(actionColor?: string) {
  switch (actionColor) {
    case 'red':
      return 'red';
    case 'green':
      return 'green';
    case 'blue':
      return 'blue';
    default:
      return 'black';
  }
}

function svgColorFor(actionColor?: string) {
  switch (actionColor) {
    case 'red':
      return '#c6452f';
    case 'green':
      return '#147464';
    case 'blue':
      return '#2364d2';
    default:
      return '#17212b';
  }
}

function createAiShape(editor: TutorEditor, shape: Record<string, unknown>) {
  editor.createShape({
    ...shape,
    meta: {
      ...(typeof shape.meta === 'object' && shape.meta !== null ? shape.meta : {}),
      ...AI_META,
    },
  });
}

function createFormulaAsset(
  editor: TutorEditor,
  latex: string,
  color?: string,
  fontSize = FORMULA_FONT_SIZE
) {
  if (!editor.createAssets) return undefined;

  const renderedFormula = renderLatexFormulaSvg(latex, color, { fontSize });
  const assetId = AssetRecordType.createId();
  editor.createAssets([
    {
      id: assetId,
      typeName: 'asset',
      type: 'image',
      props: {
        w: renderedFormula.width,
        h: renderedFormula.height,
        name: `formula-${assetId}.svg`,
        isAnimated: false,
        mimeType: 'image/svg+xml',
        src: renderedFormula.src,
      },
      meta: AI_META,
    },
  ]);

  return {
    assetId,
    width: renderedFormula.width,
    height: renderedFormula.height,
  };
}

export function renderLatexFormulaSvg(
  latex: string,
  color?: string,
  options: { fontSize?: number } = {}
) {
  const fontSize = options.fontSize ?? FORMULA_FONT_SIZE;

  const mathMarkup = katex
    .renderToString(latex, {
      displayMode: false,
      output: 'mathml',
      strict: false,
      throwOnError: false,
      trust: false,
    })
    .replace(/^<span class="katex">/, '')
    .replace(/<\/span>$/, '');

  const { width, height } = measureMathMarkup(mathMarkup, latex, fontSize);
  const foreground = svgColorFor(color);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <foreignObject x="0" y="0" width="${width}" height="${height}">
    <div xmlns="http://www.w3.org/1999/xhtml" style="box-sizing:border-box;display:flex;align-items:center;width:${width}px;height:${height}px;padding:${FORMULA_PADDING}px;color:${foreground};font-size:${fontSize}px;line-height:1.15;font-family:'Times New Roman',serif;">
      ${mathMarkup}
    </div>
  </foreignObject>
</svg>`.trim();

  return {
    width,
    height,
    src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
  };
}

function measureMathMarkup(mathMarkup: string, latex: string, fontSize: number) {
  if (typeof document === 'undefined') {
    return estimateFormulaSize(latex, fontSize);
  }

  const probe = document.createElement('div');
  probe.style.position = 'fixed';
  probe.style.left = '-10000px';
  probe.style.top = '-10000px';
  probe.style.display = 'inline-block';
  probe.style.fontSize = `${fontSize}px`;
  probe.style.lineHeight = '1.15';
  probe.style.fontFamily = "'Times New Roman', serif";
  probe.innerHTML = mathMarkup;
  document.body.appendChild(probe);
  const rect = probe.getBoundingClientRect();
  probe.remove();

  return {
    width: Math.max(48, Math.ceil(rect.width + FORMULA_PADDING * 2)),
    height: Math.max(48, Math.ceil(rect.height + FORMULA_PADDING * 2)),
  };
}

function estimateFormulaSize(latex: string, fontSize = FORMULA_FONT_SIZE) {
  const compactLatex = latex.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)');
  const width = Math.ceil(Math.max(48, compactLatex.length * fontSize * 0.48));
  const fractionCount = (latex.match(/\\frac/g) ?? []).length;
  const height = Math.ceil(fractionCount > 0 ? fontSize * 1.7 : fontSize * 1.35);

  return { width, height };
}

function clearAiAnnotations(editor: TutorEditor) {
  const aiShapeIds = editor
    .getCurrentPageShapes()
    .filter(isAiAnnotationShape)
    .map((shape) => shape.id);

  if (aiShapeIds.length > 0) {
    editor.deleteShapes(aiShapeIds);
  }
}

function isAiAnnotationShape(shape: ShapeLike) {
  if (shape.meta?.owner === 'ai' || shape.meta?.role === 'tutor-annotation') return true;

  const props = shape.props as
    | {
        color?: unknown;
        geo?: unknown;
        text?: unknown;
        richText?: unknown;
      }
    | undefined;

  if (!props) return false;

  if (props.color === 'yellow' && props.geo === 'rectangle') return true;

  const serializedProps = JSON.stringify(props).toLowerCase();
  return (
    serializedProps.includes('your turn') ||
    serializedProps.includes('factor this') ||
    serializedProps.includes('can you rewrite or circle')
  );
}

function textSizeForNote(scale?: TutorVisualScale) {
  const noteSize = scale?.noteFontSize ?? 28;
  if (noteSize <= 23) return 's';
  if (noteSize <= 29) return 'm';
  if (noteSize <= 34) return 'l';
  return 'xl';
}

function textWidthFor(action: ResolvedTutorCanvasAction) {
  return action.layout?.bounds.w ?? FALLBACK_NOTE_WIDTH;
}

function createTutorNote(
  editor: TutorEditor,
  text: string,
  x: number,
  y: number,
  color: 'red' | 'green' | 'blue' | 'grey' | 'black',
  scale?: TutorVisualScale,
  width?: number,
  size?: 's' | 'm' | 'l' | 'xl'
) {
  createAiShape(editor, {
    type: 'text',
    x,
    y,
    props: {
      richText: toRichText(text),
      color,
      size: size ?? textSizeForNote(scale),
      font: 'draw',
      w: width ?? Math.min(360, scale?.noteWidth ?? FALLBACK_NOTE_WIDTH),
      autoSize: false,
      scale: 1,
    },
  });
}

function createHintCard(
  editor: TutorEditor,
  action: Extract<ResolvedTutorCanvasAction, { type: 'hint_card' }>
) {
  const scale = action.layout?.scale;
  const bounds = action.layout?.bounds ?? {
    x: action.x ?? 0,
    y: action.y ?? 0,
    w: scale?.noteWidth ?? FALLBACK_NOTE_WIDTH,
    h: 180,
  };
  const color = action.color ?? 'blue';
  const titleSize = scale?.noteFontSize && scale.noteFontSize <= 25 ? 's' : 'm';
  const bodySize = textSizeForNote(scale);
  const bodyWidth = Math.max(220, bounds.w - HINT_CARD_PADDING * 2);

  createAiShape(editor, {
    type: 'geo',
    x: bounds.x,
    y: bounds.y,
    props: {
      geo: 'rectangle',
      w: bounds.w,
      h: bounds.h,
      dash: 'draw',
      color,
      fill: 'semi',
      size: 'm',
      richText: toRichText(''),
    },
  });

  createTutorNote(
    editor,
    action.title.toUpperCase(),
    bounds.x + HINT_CARD_PADDING,
    bounds.y + HINT_CARD_PADDING * 0.75,
    color,
    scale,
    bodyWidth,
    titleSize
  );

  createTutorNote(
    editor,
    action.body,
    bounds.x + HINT_CARD_PADDING,
    bounds.y + HINT_CARD_PADDING * 2.45,
    'black',
    scale,
    bodyWidth,
    bodySize
  );

  const equation = action.equation?.trim();
  if (!equation) return;

  const formulaAsset = createFormulaAsset(
    editor,
    equation,
    color,
    scale ? Math.max(28, scale.formulaFontSize * 0.72) : 34
  );
  const formulaY = bounds.y + bounds.h - (formulaAsset?.height ?? 46) - HINT_CARD_PADDING * 0.75;

  if (formulaAsset) {
    createAiShape(editor, {
      type: 'image',
      x: bounds.x + HINT_CARD_PADDING,
      y: formulaY,
      props: {
        assetId: formulaAsset.assetId,
        w: formulaAsset.width,
        h: formulaAsset.height,
        playing: true,
        url: '',
        crop: null,
        flipX: false,
        flipY: false,
        altText: equation,
      },
    });
    return;
  }

  createTutorNote(
    editor,
    equation,
    bounds.x + HINT_CARD_PADDING,
    formulaY,
    color,
    scale,
    bodyWidth,
    'm'
  );
}

function applyTutorAction(editor: TutorEditor, action: ResolvedTutorCanvasAction) {
  const scale = action.layout?.scale;
  switch (action.type) {
    case 'write_text':
      createAiShape(editor, {
        type: 'text',
        x: action.x,
        y: action.y,
        props: {
          richText: toRichText(action.text),
          color: colorFor(action.color),
          size: textSizeForNote(scale),
          font: 'draw',
          w: textWidthFor(action),
          autoSize: false,
          scale: 1,
        },
      });
      return;
    case 'write_formula':
      {
        const formulaAsset = createFormulaAsset(
          editor,
          action.latex,
          action.color,
          scale?.formulaFontSize
        );
        if (formulaAsset) {
          createAiShape(editor, {
            type: 'image',
            x: action.x,
            y: action.y,
            props: {
              assetId: formulaAsset.assetId,
              w: formulaAsset.width,
              h: formulaAsset.height,
              playing: true,
              url: '',
              crop: null,
              flipX: false,
              flipY: false,
              altText: action.latex,
            },
          });
          return;
        }

        createAiShape(editor, {
          type: 'text',
          x: action.x,
          y: action.y,
          props: {
            richText: toRichText(action.latex),
            color: colorFor(action.color),
            size: 'xl',
            font: 'mono',
          },
        });
      }
      return;
    case 'hint_card':
      createHintCard(editor, action);
      return;
    case 'highlight':
      return;
    case 'draw_arrow':
      createAiShape(editor, {
        type: 'arrow',
        x: action.from.x,
        y: action.from.y,
        props: {
          start: { x: 0, y: 0 },
          end: {
            x: action.to.x - action.from.x,
            y: action.to.y - action.from.y,
          },
          richText: toRichText(action.label ?? ''),
          color: 'blue',
          size: 'm',
        },
      });
      return;
    case 'mark_wrong':
      {
        const markSize = scale?.markSize ?? 32;

        createAiShape(editor, {
          type: 'geo',
          x: action.x,
          y: action.y,
          props: {
            geo: 'x-box',
            w: markSize,
            h: markSize,
            dash: 'draw',
            color: 'red',
            fill: 'none',
            size: 'm',
            richText: toRichText(''),
          },
        });
        createTutorNote(
          editor,
          action.reason,
          action.layout.noteBounds?.x ?? action.x + markSize + (scale?.itemGap ?? 18) * 0.5,
          action.layout.noteBounds?.y ?? action.y,
          'red',
          scale,
          action.layout.noteBounds?.w ?? Math.min(320, scale?.noteWidth ?? FALLBACK_NOTE_WIDTH),
          's'
        );
      }
      return;
    case 'mark_correct':
      {
        const markSize = scale?.markSize ?? 32;

        createAiShape(editor, {
          type: 'geo',
          x: action.x,
          y: action.y,
          props: {
            geo: 'check-box',
            w: markSize,
            h: markSize,
            dash: 'draw',
            color: 'green',
            fill: 'none',
            size: 'm',
            richText: toRichText(''),
          },
        });
        if (action.note) {
          createTutorNote(
            editor,
            action.note,
            action.layout.noteBounds?.x ?? action.x + markSize + (scale?.itemGap ?? 18) * 0.5,
            action.layout.noteBounds?.y ?? action.y,
            'green',
            scale,
            action.layout.noteBounds?.w ?? Math.min(300, scale?.noteWidth ?? FALLBACK_NOTE_WIDTH),
            's'
          );
        }
      }
      return;
    case 'clear_ai_annotations':
      clearAiAnnotations(editor);
      return;
    case 'draw_flowchart':
      createFlowchartShapes(editor, action.spec, {
        x: action.x ?? 0,
        y: action.y ?? 0,
      });
      return;
    case 'trace_flowchart':
      createFlowchartTraceShapes(editor, action.path, {
        ...(action.note ? { note: action.note } : {}),
        origin: { x: action.x ?? 0, y: action.y ?? 0 },
      });
      return;
  }
}

export function applyTutorActionBatch(editor: TutorEditor, actions: TutorCanvasAction[]) {
  const primitiveActions = expandSemanticTutorActions(actions);
  const resolvedActions = layoutTutorActions(
    editor as TutorEditor & { getCurrentPageShapes(): LayoutShape[] },
    primitiveActions
  );

  for (const action of resolvedActions) {
    applyTutorAction(editor, action);
  }

  return createActionBatchResult(actions);
}

function expandSemanticTutorActions(actions: TutorCanvasAction[]): PrimitiveTutorCanvasAction[] {
  return actions.flatMap((action) => {
    if (action.type === 'ask_student') {
      return [
        {
          type: 'hint_card',
          targetShapeId: action.targetShapeId,
          x: action.x ?? 0,
          y: action.y ?? 0,
          title: 'Your turn',
          body: action.question,
          color: 'blue',
        },
      ];
    }

    if (action.type !== 'correct_step') return [action];

    return [
      {
        type: 'mark_wrong',
        targetShapeId: action.targetShapeId,
        x: 0,
        y: 0,
        reason: action.reason,
      },
      {
        type: 'write_formula',
        targetShapeId: action.targetShapeId,
        x: 0,
        y: 0,
        latex: action.latex,
      },
    ];
  });
}

function createActionBatchResult(actions: TutorCanvasAction[]): TutorActionBatchResult {
  const askStudentAction = actions.find(
    (action): action is Extract<TutorCanvasAction, { type: 'ask_student' }> =>
      action.type === 'ask_student'
  );

  if (!askStudentAction) {
    return {
      clearTurnState: actions.some(
        (action) => action.type === 'clear_ai_annotations' || action.type !== 'highlight'
      ),
    };
  }

  return {
    turnStateUpdate: createWaitingForStudentTurn(askStudentAction),
  };
}
