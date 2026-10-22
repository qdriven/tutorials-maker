import { ParticipantKind, type Room } from '@livekit/rtc-node';
import { z } from 'zod';
import {
  type CanvasContext,
  CanvasContextSchema,
  type TutorCanvasCommand,
  normalizeTutorCommand,
} from '@tutorials-maker/math-tutor-protocol';
import { type TutorLogger, createTutorLogger, elapsedMs, summarizeError } from './observability';

const CANVAS_RPC_RESPONSE_TIMEOUT_MS = 8000;

const MAX_SCREENSHOT_CHUNKS = 16;
const MAX_SCREENSHOT_BYTES = 120_000;

const ScreenshotManifestSchema = z.discriminatedUnion('ok', [
  z.object({
    ok: z.literal(true),
    token: z.string().min(1),
    bytes: z.number().int().positive().max(MAX_SCREENSHOT_BYTES),
    charLength: z.number().int().positive().max(MAX_SCREENSHOT_BYTES),
    chunkCount: z.number().int().positive().max(MAX_SCREENSHOT_CHUNKS),
    chunkSize: z.number().int().positive(),
  }),
  z.object({
    ok: z.literal(false),
    reason: z.string().optional(),
  }),
]);

function findStudentIdentity(room: Room): string {
  for (const participant of room.remoteParticipants.values()) {
    if (participant.kind !== ParticipantKind.AGENT) {
      return participant.identity;
    }
  }

  throw new Error('No student participant is connected yet.');
}

export class CanvasBridge {
  constructor(
    private readonly room: Room,
    private readonly logger: TutorLogger = createTutorLogger('canvas_bridge'),
  ) {}

  async getContext(): Promise<CanvasContext> {
    const startedAt = Date.now();
    const destinationIdentity = findStudentIdentity(this.room);
    this.logger.info(
      {
        event: 'canvas.get_context.start',
        destinationIdentity,
      },
      'reading canvas context',
    );
    const payload = await this.room.localParticipant?.performRpc({
      destinationIdentity,
      method: 'canvas.get_context',
      payload: '',
      responseTimeout: CANVAS_RPC_RESPONSE_TIMEOUT_MS,
    });

    if (!payload) {
      throw new Error('The student canvas did not return context.');
    }

    const context = CanvasContextSchema.parse(JSON.parse(payload));
    this.logger.info(
      {
        event: 'canvas.get_context.structure_done',
        durationMs: elapsedMs(startedAt),
        shapeCount: context.shapes.length,
        recentEventCount: context.recentEvents.length,
      },
      'canvas structural context received',
    );

    try {
      const screenshotDataUrl = await this.getChunkedScreenshot(destinationIdentity);
      if (screenshotDataUrl) {
        this.logger.info(
          {
            event: 'canvas.get_context.done',
            durationMs: elapsedMs(startedAt),
            shapeCount: context.shapes.length,
            screenshotChars: screenshotDataUrl.length,
          },
          'canvas context received with screenshot',
        );
        return CanvasContextSchema.parse({
          ...context,
          screenshotDataUrl,
        });
      }
    } catch (error) {
      this.logger.warn(
        {
          event: 'canvas.screenshot.failed',
          durationMs: elapsedMs(startedAt),
          error: summarizeError(error),
        },
        'unable to fetch chunked canvas screenshot',
      );
    }

    this.logger.info(
      {
        event: 'canvas.get_context.done',
        durationMs: elapsedMs(startedAt),
        shapeCount: context.shapes.length,
        screenshotChars: 0,
      },
      'canvas context received without screenshot',
    );
    return context;
  }

  async applyCommand(command: TutorCanvasCommand): Promise<string> {
    const startedAt = Date.now();
    const destinationIdentity = findStudentIdentity(this.room);
    const normalized = normalizeTutorCommand(command);
    this.logger.info(
      {
        event: 'canvas.apply_actions.start',
        destinationIdentity,
        actionCount: normalized.actions.length,
        actionTypes: normalized.actions.map((action) => action.type),
      },
      'applying canvas actions',
    );
    const result = await this.room.localParticipant?.performRpc({
      destinationIdentity,
      method: 'canvas.apply_actions',
      payload: JSON.stringify(normalized),
      responseTimeout: CANVAS_RPC_RESPONSE_TIMEOUT_MS,
    });

    this.logger.info(
      {
        event: 'canvas.apply_actions.done',
        durationMs: elapsedMs(startedAt),
        resultLength: result?.length ?? 0,
      },
      'canvas actions applied',
    );
    return result ?? JSON.stringify({ ok: false });
  }

  private async getChunkedScreenshot(destinationIdentity: string): Promise<string | undefined> {
    const startedAt = Date.now();
    const manifestPayload = await this.room.localParticipant?.performRpc({
      destinationIdentity,
      method: 'canvas.prepare_screenshot',
      payload: '',
      responseTimeout: CANVAS_RPC_RESPONSE_TIMEOUT_MS,
    });

    if (!manifestPayload) return undefined;

    const manifest = ScreenshotManifestSchema.parse(JSON.parse(manifestPayload));
    if (!manifest.ok) return undefined;
    this.logger.info(
      {
        event: 'canvas.screenshot.manifest',
        bytes: manifest.bytes,
        charLength: manifest.charLength,
        chunkCount: manifest.chunkCount,
      },
      'canvas screenshot manifest received',
    );

    const chunkResults = await Promise.all(
      Array.from({ length: manifest.chunkCount }, (_, index) =>
        this.room.localParticipant?.performRpc({
          destinationIdentity,
          method: 'canvas.get_screenshot_chunk',
          payload: JSON.stringify({ token: manifest.token, index }),
          responseTimeout: CANVAS_RPC_RESPONSE_TIMEOUT_MS,
        }),
      ),
    );

    const chunks: string[] = [];
    for (let index = 0; index < chunkResults.length; index += 1) {
      const chunk = chunkResults[index];
      if (typeof chunk !== 'string') {
        throw new Error(`Canvas screenshot chunk ${index} was empty.`);
      }
      chunks.push(chunk);
    }

    const dataUrl = chunks.join('');

    if (dataUrl.length !== manifest.charLength || !dataUrl.startsWith('data:image/')) {
      throw new Error('Canvas screenshot chunks did not assemble into an image.');
    }

    this.logger.info(
      {
        event: 'canvas.screenshot.done',
        durationMs: elapsedMs(startedAt),
        chunkCount: manifest.chunkCount,
        charLength: dataUrl.length,
      },
      'canvas screenshot assembled',
    );
    return dataUrl;
  }
}
