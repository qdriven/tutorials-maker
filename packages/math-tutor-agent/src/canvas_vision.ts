import { GoogleGenAI, createPartFromBase64 } from '@google/genai';
import {
  type CanvasContext,
  type FlowchartSpec,
  FlowchartSpecSchema,
} from '@tutorials-maker/math-tutor-protocol';
import { buildCanvasInstructionPrompt } from './tutor';

let _geminiVisionClient: GoogleGenAI | undefined;
function getGeminiVisionClient(apiKey: string): GoogleGenAI {
  if (!_geminiVisionClient) _geminiVisionClient = new GoogleGenAI({ apiKey });
  return _geminiVisionClient;
}

export const DEFAULT_CANVAS_VISION_MODEL = 'gemini-2.5-flash';

export type CanvasImageDescriber = (context: CanvasContext) => Promise<string | undefined>;

export type FlowchartExtractor = (context: CanvasContext) => Promise<FlowchartSpec | undefined>;

export async function describeCanvasImageWithGemini(
  context: CanvasContext,
): Promise<string | undefined> {
  if (!context.screenshotDataUrl) return undefined;

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return undefined;

  const image = parseDataUrl(context.screenshotDataUrl);
  if (!image) return undefined;

  const ai = getGeminiVisionClient(apiKey);

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_CANVAS_VISION_MODEL ?? DEFAULT_CANVAS_VISION_MODEL,
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Read this tldraw math tutoring board. Focus on handwritten equations, crossed-out work, arrows, and the student's latest visible step.

Return a concise plain-text summary with:
- the exact equation or expression you can read
- any student answer or partial step
- any visible mistake, if clear
- approximate location only when useful
- when the board contains a flowchart or program diagram, list its boxes in order and the branch labels on the arrows

Do not solve the problem unless the board already contains the solution.

Structural context, if available:
${buildCanvasInstructionPrompt(stripCanvasImage(context))}`,
          },
          createPartFromBase64(image.base64, image.mimeType),
        ],
      },
    ],
    config: {
      temperature: 0.1,
      maxOutputTokens: 512,
    },
  });

  return response.text?.trim() || undefined;
}

export async function extractFlowchartFromCanvasWithGemini(
  context: CanvasContext,
): Promise<FlowchartSpec | undefined> {
  if (!context.screenshotDataUrl) return undefined;

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return undefined;

  const image = parseDataUrl(context.screenshotDataUrl);
  if (!image) return undefined;

  const ai = getGeminiVisionClient(apiKey);

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_CANVAS_VISION_MODEL ?? DEFAULT_CANVAS_VISION_MODEL,
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Look at this tutoring board. If it contains a flowchart or program diagram, return its structure as strict JSON.

Return only JSON, no markdown, with this shape:
{
  "title": "short title of the flowchart",
  "nodes": [
    { "id": "n1", "kind": "start", "label": "开始" },
    { "id": "n2", "kind": "io", "label": "输入 a" },
    { "id": "n3", "kind": "process", "label": "a = a + 1" },
    { "id": "n4", "kind": "decision", "label": "a > 2" },
    { "id": "n5", "kind": "end", "label": "结束" }
  ],
  "edges": [
    { "from": "n1", "to": "n2" },
    { "from": "n4", "to": "n3", "label": "否" }
  ]
}

Rules:
- kind must be one of start, process, decision, io, end.
- Copy the text inside each box into label exactly as written, including Chinese text.
- Use the arrow branch labels such as 是 or 否 on the edge label field.
- If the board has no flowchart at all, return exactly {"nodes": [], "edges": []}.

Visual summary of the board:
${await summarizeBoardForFlowchart(context)}`,
          },
          createPartFromBase64(image.base64, image.mimeType),
        ],
      },
    ],
    config: {
      temperature: 0,
      maxOutputTokens: 1200,
    },
  });

  const spec = parseFlowchartSpecFromText(response.text ?? '');
  return spec;
}

async function summarizeBoardForFlowchart(context: CanvasContext): Promise<string> {
  const summary = await describeCanvasImageWithGemini(context);
  if (summary) return summary;
  return 'No visual summary is available.';
}

export function parseFlowchartSpecFromText(text: string): FlowchartSpec | undefined {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return undefined;

  let parsed: unknown;
  try {
    parsed = JSON.parse(text.slice(start, end + 1));
  } catch {
    return undefined;
  }

  const result = FlowchartSpecSchema.safeParse(parsed);
  if (!result.success) return undefined;
  if (result.data.nodes.length < 2 || result.data.edges.length === 0) return undefined;

  return result.data;
}

export function parseDataUrl(dataUrl: string) {
  const match = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl);
  if (!match) return undefined;

  return {
    mimeType: match[1] ?? 'image/jpeg',
    base64: match[2] ?? '',
  };
}

export function stripCanvasImage(context: CanvasContext): CanvasContext {
  const contextWithoutImage = { ...context };
  delete contextWithoutImage.screenshotDataUrl;
  return contextWithoutImage;
}
