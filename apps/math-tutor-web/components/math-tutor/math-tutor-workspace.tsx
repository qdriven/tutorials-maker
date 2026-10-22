'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TokenSource } from 'livekit-client';
import { ArrowLeft, CircleAlert, Eraser, Mic2, Send } from 'lucide-react';
import {
  DefaultColorStyle,
  DefaultDashStyle,
  DefaultSizeStyle,
  type Editor,
  type TLComponents,
  Tldraw,
} from 'tldraw';
import 'tldraw/tldraw.css';
import {
  type ReceivedMessage,
  useAgent,
  useSession,
  useSessionContext,
  useSessionMessages,
} from '@livekit/components-react';
import {
  type CanvasContext,
  CanvasContextSchema,
  type CanvasEvent,
  type CanvasShape,
  CanvasShapeSchema,
  type TutorCanvasCommand,
  type TutorTurnState,
  normalizeTutorCommand,
} from '@tutorials-maker/math-tutor-protocol';
import type { AppConfig } from '@/app-config';
import { AgentChatTranscript } from '@/components/agents-ui/agent-chat-transcript';
import { AgentControlBar } from '@/components/agents-ui/agent-control-bar';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { StartAudioButton } from '@/components/agents-ui/start-audio-button';
import { MathTutorLogo } from '@/components/math-tutor/math-tutor-logo';
import { MobileDesktopTip } from '@/components/math-tutor/mobile-desktop-tip';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';
import { applyTutorActionBatch } from '@/lib/math-tutor/apply-tutor-actions';
import { buildBoardUnderstanding } from '@/lib/math-tutor/board-understanding';
import {
  CANVAS_CONTEXT_RPC_BUDGET_BYTES,
  CANVAS_CONTEXT_STRUCTURAL_BUDGET_BYTES,
  fitCanvasContextForRpc,
  serializeCanvasContextForRpc,
  utf8ByteLength,
} from '@/lib/math-tutor/canvas-context';
import { getStudentCanvasChangeFromStoreEntry } from '@/lib/math-tutor/canvas-events';
import { getTutorSessionHealth } from '@/lib/math-tutor/session-health';
import { resolveTutorTurnState } from '@/lib/math-tutor/tutor-turn-state';
import { cn } from '@/lib/shadcn/utils';
import { getSandboxTokenSource } from '@/lib/utils';

const RECENT_EVENT_LIMIT = 60;
const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

const MIN_USEFUL_SCREENSHOT_BYTES = 1_800;
const HIGH_RES_SCREENSHOT_MAX_BYTES = 80_000;
const SCREENSHOT_CHUNK_CHAR_COUNT = 10_000;
const SCREENSHOT_CACHE_TTL_MS = 60_000;

const TUTOR_TLDRAW_COMPONENTS: TLComponents = {
  ActionsMenu: null,
  DebugMenu: null,
  DebugPanel: null,
  HelpMenu: null,
  MainMenu: null,
  Minimap: null,
  NavigationPanel: null,
  PageMenu: null,
  QuickActions: null,
  RichTextToolbar: null,
  SharePanel: null,
  StylePanel: null,
  ZoomMenu: null,
};

function canExposeLocalTestHooks(hostname: string) {
  return IN_DEVELOPMENT || hostname === 'localhost' || hostname === '127.0.0.1';
}

function compactShape(
  editor: Editor,
  shape: ReturnType<Editor['getCurrentPageShapes']>[number]
): CanvasShape {
  const props = (shape.props ?? {}) as Record<string, unknown>;

  const text = typeof props.text === 'string' ? props.text : extractPlainText(props.richText);
  const bounds = editor.getShapePageBounds(shape);
  const x = bounds?.x ?? shape.x;
  const y = bounds?.y ?? shape.y;
  const w = bounds?.w ?? (typeof props.w === 'number' ? props.w : undefined);
  const h = bounds?.h ?? (typeof props.h === 'number' ? props.h : undefined);
  const owner =
    shape.meta?.owner === 'ai' ? 'ai' : shape.meta?.owner === 'system' ? 'system' : 'student';

  return CanvasShapeSchema.parse({
    id: shape.id,
    type: shape.type,
    x,
    y,
    ...(w ? { w } : {}),
    ...(h ? { h } : {}),
    ...(text ? { text } : {}),
    owner,
  });
}

function extractPlainText(richText: unknown) {
  if (!richText || typeof richText !== 'object') return undefined;
  const doc = richText as {
    content?: Array<{ content?: Array<{ text?: string }> }>;
  };

  const text = doc.content
    ?.map((block) => block.content?.map((item) => item.text ?? '').join('') ?? '')
    .filter(Boolean)
    .join('\n')
    .trim();

  return text || undefined;
}

const CONTEXT_SCREENSHOT_EXPORT_ATTEMPTS = [
  { scale: 0.5, pixelRatio: 0.75, quality: 0.48, padding: 24 },
  { scale: 0.44, pixelRatio: 0.65, quality: 0.42, padding: 18 },
  { scale: 0.38, pixelRatio: 0.55, quality: 0.36, padding: 16 },
  { scale: 0.3, pixelRatio: 0.5, quality: 0.3, padding: 12 },
  { scale: 0.24, pixelRatio: 0.4, quality: 0.24, padding: 8 },
] as const;

const HIGH_RES_SCREENSHOT_EXPORT_ATTEMPTS = [
  { scale: 1, pixelRatio: 1.5, quality: 0.86, padding: 64 },
  { scale: 1, pixelRatio: 1.25, quality: 0.82, padding: 56 },
  { scale: 0.9, pixelRatio: 1.2, quality: 0.78, padding: 48 },
  { scale: 0.8, pixelRatio: 1, quality: 0.72, padding: 44 },
  { scale: 0.7, pixelRatio: 0.95, quality: 0.66, padding: 40 },
  { scale: 0.6, pixelRatio: 0.9, quality: 0.6, padding: 32 },
] as const;

type ScreenshotExportAttempt = {
  scale: number;
  pixelRatio: number;
  quality: number;
  padding: number;
};
type ScreenshotCacheEntry = { dataUrl: string; createdAt: number };

async function captureCanvasScreenshot(
  editor: Editor,
  maxBytes: number,
  attempts: readonly ScreenshotExportAttempt[] = CONTEXT_SCREENSHOT_EXPORT_ATTEMPTS
) {
  const shapes = editor.getCurrentPageShapes().filter((shape) => shape.meta?.owner !== 'system');
  if (shapes.length === 0 || maxBytes < MIN_USEFUL_SCREENSHOT_BYTES) return undefined;

  try {
    for (const attempt of attempts) {
      const { url } = await editor.toImageDataUrl(shapes, {
        ...attempt,
        background: true,
        format: 'jpeg',
      });

      if (utf8ByteLength(url) <= maxBytes) {
        return url;
      }
    }

    return undefined;
  } catch (error) {
    console.warn('Failed to capture tldraw screenshot', error);
    return undefined;
  }
}

async function buildCanvasContext(
  editor: Editor,
  roomName: string,
  recentEvents: CanvasEvent[],
  options: { includeScreenshot?: boolean; tutorTurn?: TutorTurnState } = {}
): Promise<CanvasContext> {
  const bounds = editor.getViewportPageBounds();

  const pageShapes = editor
    .getCurrentPageShapes()
    .filter((shape) => shape.meta?.owner !== 'system');
  const visibleShapeIds = new Set(pageShapes.map((shape) => shape.id));
  const selectedShapeIds = Array.from(editor.getSelectedShapeIds()).filter((id) =>
    visibleShapeIds.has(id)
  );
  const shapes = pageShapes.map((shape) => compactShape(editor, shape));

  const board = buildBoardUnderstanding(shapes, selectedShapeIds, recentEvents);

  const tutorTurn = resolveTutorTurnState(options.tutorTurn, recentEvents);
  const structuralBudget = options.includeScreenshot
    ? CANVAS_CONTEXT_STRUCTURAL_BUDGET_BYTES
    : CANVAS_CONTEXT_RPC_BUDGET_BYTES;
  const baseContext = fitCanvasContextForRpc(
    CanvasContextSchema.parse({
      roomName,
      viewport: {
        x: bounds.x,
        y: bounds.y,
        w: bounds.w,
        h: bounds.h,
        zoom: editor.getZoomLevel(),
      },
      selectedShapeIds,
      recentEvents,
      shapes,
      board,
      ...(tutorTurn ? { tutorTurn } : {}),
    }),
    structuralBudget
  );

  if (!options.includeScreenshot) return baseContext;

  const screenshotBudget =
    CANVAS_CONTEXT_RPC_BUDGET_BYTES - utf8ByteLength(JSON.stringify(baseContext)) - 256;
  const screenshotDataUrl = await captureCanvasScreenshot(editor, screenshotBudget);

  return fitCanvasContextForRpc(
    CanvasContextSchema.parse({
      ...baseContext,
      ...(screenshotDataUrl ? { screenshotDataUrl } : {}),
    })
  );
}

function pruneScreenshotCache(cache: Map<string, ScreenshotCacheEntry>) {
  const now = Date.now();
  for (const [token, entry] of cache) {
    if (now - entry.createdAt > SCREENSHOT_CACHE_TTL_MS) {
      cache.delete(token);
    }
  }
}

function clearSystemHints(mountedEditor: Editor) {
  const systemShapeIds = mountedEditor
    .getCurrentPageShapes()
    .filter((shape) => shape.meta?.owner === 'system')
    .map((shape) => shape.id);

  if (systemShapeIds.length > 0) {
    mountedEditor.deleteShapes(systemShapeIds);
  }
}

interface TutorShellProps {
  appConfig: AppConfig;
}

function SessionDiagnostics() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();
  return null;
}

function TutorLogo() {
  return <MathTutorLogo className="size-11" imageClassName="scale-110" />;
}

function TutorShell({ appConfig }: TutorShellProps) {
  const tokenSource = useMemo(() => {
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === 'string'
      ? getSandboxTokenSource(appConfig)
      : TokenSource.endpoint('/api/token');
  }, [appConfig]);

  const session = useSession(
    tokenSource,
    appConfig.agentName ? { agentName: appConfig.agentName } : undefined
  );

  return (
    <AgentSessionProvider session={session}>
      <SessionDiagnostics />
      <TutorRoom />
      <StartAudioButton label="Start Audio" />
    </AgentSessionProvider>
  );
}

function TutorRoom() {
  const router = useRouter();
  const session = useSessionContext();
  const { messages, send, isSending } = useSessionMessages(session);
  const agent = useAgent();
  const agentState = agent.state;
  const [editor, setEditor] = useState<Editor | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [startNotice, setStartNotice] = useState<string | null>(null);
  const [canvasAssistantMessages, setCanvasAssistantMessages] = useState<ReceivedMessage[]>([]);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [pendingUserTurn, setPendingUserTurn] = useState<{
    sentAt: number;
    messageCountBeforeSend: number;
  } | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const recentEventsRef = useRef<CanvasEvent[]>([]);
  const screenshotCacheRef = useRef<Map<string, ScreenshotCacheEntry>>(new Map());
  const tutorTurnRef = useRef<TutorTurnState | undefined>(undefined);
  const localVisualTestRanRef = useRef(false);

  const [, setTutorTurnVersion] = useState(0);

  const roomName = session.room.name || 'math-tutor-room';
  const agentRuntimeStatus = agent.attributes['mathTutor.agentStatus'];
  const liveAssistantMessageText = useMemo(() => {
    return new Set(
      messages
        .filter((message) => !message.from?.isLocal)
        .map((message) => message.message.trim())
        .filter(Boolean)
    );
  }, [messages]);
  const visibleCanvasAssistantMessages = useMemo(() => {
    return canvasAssistantMessages.filter(
      (message) => !liveAssistantMessageText.has(message.message.trim())
    );
  }, [canvasAssistantMessages, liveAssistantMessageText]);
  const transcriptMessages = useMemo(() => {
    return [...messages, ...visibleCanvasAssistantMessages].sort(
      (first, second) => Number(first.timestamp) - Number(second.timestamp)
    );
  }, [messages, visibleCanvasAssistantMessages]);
  const pendingUserMessageAt = pendingUserTurn?.sentAt ?? null;
  const hasAssistantResponseAfterPending = useMemo(() => {
    if (!pendingUserTurn) return false;
    return transcriptMessages
      .slice(pendingUserTurn.messageCountBeforeSend)
      .some((message) => !message.from?.isLocal);
  }, [pendingUserTurn, transcriptMessages]);
  const tutorHealth = getTutorSessionHealth({
    isConnected: session.isConnected,
    agentState,
    agentStatus: agentRuntimeStatus,
    now,
    pendingUserMessageAt,
    hasAssistantResponseAfterPending,
  });
  const promptEntryDisabled =
    !session.isConnected || tutorHealth.status === 'failed' || tutorHealth.status === 'stalled';
  const statusLabel =
    tutorHealth.status === 'failed' || tutorHealth.status === 'stalled'
      ? tutorHealth.status
      : session.isConnected
        ? agentState
        : 'not connected';

  const updateTutorTurn = useCallback((turn: TutorTurnState | undefined) => {
    tutorTurnRef.current = turn;
    setTutorTurnVersion((version) => version + 1);
  }, []);

  const applyTutorActions = useCallback(
    (activeEditor: Editor, actions: TutorCanvasCommand['actions']) => {
      const result = applyTutorActionBatch(activeEditor, actions);
      if (result.turnStateUpdate) {
        updateTutorTurn(result.turnStateUpdate);
      }
      if (result.clearTurnState) {
        updateTutorTurn(undefined);
      }
      return result;
    },
    [updateTutorTurn]
  );

  const appendCanvasAssistantMessage = useCallback((narration: string | undefined) => {
    const text = narration?.trim();
    if (!text) return;

    setCanvasAssistantMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `canvas-${crypto.randomUUID()}`,
        timestamp: Date.now(),
        message: text,
      } satisfies ReceivedMessage,
    ]);
  }, []);

  const rememberEvent = useCallback(
    (event: CanvasEvent) => {
      const nextEvents = [event, ...recentEventsRef.current].slice(0, RECENT_EVENT_LIMIT);
      recentEventsRef.current = nextEvents;
      const nextTutorTurn = resolveTutorTurnState(tutorTurnRef.current, nextEvents);
      if (nextTutorTurn !== tutorTurnRef.current) {
        updateTutorTurn(nextTutorTurn);
      }
    },
    [updateTutorTurn]
  );

  useEffect(() => {
    if (!pendingUserTurn) return;
    if (hasAssistantResponseAfterPending) {
      setPendingUserTurn(null);
    }
  }, [hasAssistantResponseAfterPending, pendingUserTurn]);

  useEffect(() => {
    if (!session.isConnected || pendingUserMessageAt === null) return;
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [pendingUserMessageAt, session.isConnected]);

  useEffect(() => {
    if (!editor) return;

    const cleanup = editor.store.listen(
      (entry) => {
        const studentChange = getStudentCanvasChangeFromStoreEntry(entry);
        if (!studentChange) return;

        rememberEvent({
          ...studentChange,
          at: new Date().toISOString(),
        });
      },
      { source: 'user', scope: 'document' }
    );

    return cleanup;
  }, [editor, rememberEvent]);

  useEffect(() => {
    if (!editor) return;
    void loadPendingHomeworkImage(editor);
  }, [editor]);

  useEffect(() => {
    if (!editor || localVisualTestRanRef.current) return;
    if (!canExposeLocalTestHooks(window.location.hostname)) return;
    if (new URLSearchParams(window.location.search).get('mathTutorTest') !== 'hint-card') return;

    localVisualTestRanRef.current = true;
    const testActions: TutorCanvasCommand['actions'] = [
      {
        type: 'hint_card',
        title: 'Next step',
        body: 'What common factor appears in both terms?',
        equation: 'x^2 + 7x',
        x: 420,
        y: 170,
        color: 'blue',
      },
      {
        type: 'ask_student',
        question: 'Try writing the two factors before solving for x.',
        x: 420,
        y: 410,
      },
    ];
    applyTutorActions(editor, testActions);
    focusTutorWorkAfterCanvasWrite(editor, testActions);
  }, [applyTutorActions, editor]);

  useEffect(() => {
    if (!session.isConnected || !editor) return;

    const localParticipant = session.room.localParticipant;

    localParticipant.registerRpcMethod('canvas.get_context', async () => {
      const context = await buildCanvasContext(editor, roomName, recentEventsRef.current, {
        tutorTurn: tutorTurnRef.current,
      });
      const payload = serializeCanvasContextForRpc(context);
      if (IN_DEVELOPMENT) {
        console.info('canvas.get_context payload', {
          bytes: utf8ByteLength(payload),
          hasScreenshot: Boolean(context.screenshotDataUrl),
          shapeCount: context.shapes.length,
          tutorTurn: context.tutorTurn?.phase,
        });
      }
      return payload;
    });

    localParticipant.registerRpcMethod('canvas.prepare_screenshot', async () => {
      pruneScreenshotCache(screenshotCacheRef.current);
      const dataUrl = await captureCanvasScreenshot(
        editor,
        HIGH_RES_SCREENSHOT_MAX_BYTES,
        HIGH_RES_SCREENSHOT_EXPORT_ATTEMPTS
      );

      if (!dataUrl) {
        return JSON.stringify({ ok: false, reason: 'no_screenshot' });
      }

      const token = crypto.randomUUID();

      screenshotCacheRef.current.set(token, { dataUrl, createdAt: Date.now() });
      const bytes = utf8ByteLength(dataUrl);
      const chunkCount = Math.ceil(dataUrl.length / SCREENSHOT_CHUNK_CHAR_COUNT);

      if (IN_DEVELOPMENT) {
        console.info('canvas.prepare_screenshot payload', {
          bytes,
          chunkCount,
        });
      }

      return JSON.stringify({
        ok: true,
        token,
        bytes,
        charLength: dataUrl.length,
        chunkCount,
        chunkSize: SCREENSHOT_CHUNK_CHAR_COUNT,
      });
    });

    localParticipant.registerRpcMethod('canvas.get_screenshot_chunk', async (data) => {
      const request = JSON.parse(data.payload) as { token?: string; index?: number };
      if (typeof request.token !== 'string' || typeof request.index !== 'number') {
        throw new Error('Invalid screenshot chunk request.');
      }

      pruneScreenshotCache(screenshotCacheRef.current);
      const entry = screenshotCacheRef.current.get(request.token);
      if (!entry) {
        throw new Error('Screenshot chunk expired.');
      }

      const start = request.index * SCREENSHOT_CHUNK_CHAR_COUNT;
      const end = start + SCREENSHOT_CHUNK_CHAR_COUNT;
      return entry.dataUrl.slice(start, end);
    });

    localParticipant.registerRpcMethod('canvas.apply_actions', async (data) => {
      const command = normalizeTutorCommand(JSON.parse(data.payload));
      applyTutorActions(editor, command.actions);
      appendCanvasAssistantMessage(command.narration);
      focusTutorWorkAfterCanvasWrite(editor, command.actions);
      if (IN_DEVELOPMENT) {
        console.info('canvas.apply_actions payload', {
          actionCount: command.actions.length,
          actionTypes: command.actions.map((action) => action.type),
        });
      }
      return JSON.stringify({ ok: true, applied: command.actions.length });
    });

    localParticipant.registerRpcMethod('canvas.clear_ai_annotations', async () => {
      applyTutorActions(editor, [{ type: 'clear_ai_annotations' }]);
      return JSON.stringify({ ok: true });
    });

    return () => {
      localParticipant.unregisterRpcMethod('canvas.get_context');
      localParticipant.unregisterRpcMethod('canvas.prepare_screenshot');
      localParticipant.unregisterRpcMethod('canvas.get_screenshot_chunk');
      localParticipant.unregisterRpcMethod('canvas.apply_actions');
      localParticipant.unregisterRpcMethod('canvas.clear_ai_annotations');
    };
  }, [
    appendCanvasAssistantMessage,
    applyTutorActions,
    editor,
    roomName,
    session.isConnected,
    session.room.localParticipant,
  ]);

  const startLiveKitSession = async (enableMicrophone: boolean) => {
    await session.start({
      tracks: {
        microphone: { enabled: enableMicrophone },
      },
    });
  };

  const startSession = async () => {
    setStartError(null);
    setStartNotice(null);
    setPendingUserTurn(null);
    setIsStarting(true);
    try {
      await startLiveKitSession(true);
    } catch (error) {
      await session.end().catch(() => undefined);
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        try {
          await startLiveKitSession(false);
          setStartNotice('Microphone is blocked, so this session is running in text-only mode.');
        } catch {
          await session.end().catch(() => undefined);
          setStartError('Voice session could not start. Check LiveKit and model credentials.');
        }
      } else {
        setStartError('Voice session could not start. Check LiveKit and model credentials.');
      }
    } finally {
      setIsStarting(false);
    }
  };

  const restartSession = async () => {
    setStartError(null);
    setStartNotice(null);
    setPendingUserTurn(null);
    setIsStarting(true);
    try {
      await session.end().catch(() => undefined);
      await startLiveKitSession(true);
    } catch (error) {
      await session.end().catch(() => undefined);
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        try {
          await startLiveKitSession(false);
          setStartNotice('Microphone is blocked, so this session is running in text-only mode.');
        } catch {
          await session.end().catch(() => undefined);
          setStartError('Voice session could not restart. Check LiveKit and model credentials.');
        }
      } else {
        setStartError('Voice session could not restart. Check LiveKit and model credentials.');
      }
    } finally {
      setIsStarting(false);
    }
  };

  const sendPrompt = async () => {
    const text = prompt.trim();
    if (!text) return;
    if (!tutorHealth.canSendPrompt || isSending) return;

    const sentAt = Date.now();
    setPendingUserTurn({ sentAt, messageCountBeforeSend: transcriptMessages.length });
    setNow(sentAt);
    try {
      await send(text);
      setPrompt('');
    } catch {
      setPendingUserTurn(null);
      setStartError('The tutor message could not be sent. Restart the session and try again.');
    }
  };

  const clearAi = () => {
    const activeEditor = editorRef.current ?? editor;
    if (!activeEditor) return;
    applyTutorActions(activeEditor, [{ type: 'clear_ai_annotations' }]);
  };

  const currentTutorTurn = tutorTurnRef.current;

  return (
    <main className="min-h-svh bg-[#eef5ff] text-[#17212b] md:h-svh md:overflow-hidden">
      <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave the tutoring board?</DialogTitle>
            <DialogDescription>
              Your current canvas session may be interrupted. Are you sure you want to return to the
              homework upload page?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-md border-[#b8cdf4] bg-white px-4 font-medium text-[#17212b] shadow-sm shadow-[#4880e5]/5 hover:border-[#4880e5]/60 hover:bg-[#eef5ff]"
              onClick={() => setIsLeaveDialogOpen(false)}
            >
              Stay here
            </Button>
            <Button
              type="button"
              className="h-10 rounded-md bg-[#4880e5] px-4 font-semibold text-white shadow-sm shadow-[#4880e5]/20 hover:bg-[#356fce]"
              onClick={() => {
                setIsLeaveDialogOpen(false);
                router.push('/');
              }}
            >
              Return home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <MobileDesktopTip className="mx-auto mt-4 mb-4" />
      <div className="grid min-h-svh grid-cols-1 md:h-svh md:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="flex min-h-[68svh] flex-col border-[#c9daf7] bg-[#fbfdff] md:min-h-svh md:border-r">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d9e7fb] bg-[#f8fbff]/95 px-5 py-3 shadow-[0_1px_0_rgba(72,128,229,0.08)]">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                type="button"
                variant="outline"
                aria-label="Back to homework upload"
                className="h-10 rounded-md border-[#b8cdf4] bg-white px-3 font-medium text-[#17212b] shadow-sm shadow-[#4880e5]/5 hover:border-[#4880e5]/60 hover:bg-[#eef5ff]"
                onClick={() => setIsLeaveDialogOpen(true)}
              >
                <ArrowLeft className="size-4" />
              </Button>
              <TutorLogo />
              <div className="min-w-0">
                <div className="font-mono text-[11px] leading-none font-bold text-[#4880e5] uppercase">
                  Live AI classroom
                </div>
                <h1 className="mt-1 font-mono text-[24px] leading-none font-bold text-[#111827]">
                  Math Tutor Board
                </h1>
              </div>
            </div>
            <TooltipProvider>
              <div className="flex flex-wrap items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      aria-label="Clear AI annotations"
                      className="h-10 rounded-md border-[#d7e4fb] bg-white/75 px-3 font-medium text-[#536176] shadow-sm shadow-[#4880e5]/5 hover:border-[#9bbbf1] hover:bg-white hover:text-[#17212b]"
                      onClick={clearAi}
                    >
                      <Eraser className="size-4" />
                      <span className="ml-2 hidden sm:inline">Clear AI</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove only the tutor&apos;s notes, not the student work.</p>
                  </TooltipContent>
                </Tooltip>
                {!session.isConnected && (
                  <Button
                    disabled={isStarting}
                    className="group relative h-12 overflow-visible rounded-xl border border-[#2f6fe7] bg-[#4880e5] px-5 font-semibold text-white shadow-[0_16px_36px_rgba(72,128,229,0.32)] ring-4 ring-[#4880e5]/15 transition hover:-translate-y-0.5 hover:bg-[#356fce] hover:shadow-[0_20px_42px_rgba(72,128,229,0.38)] focus-visible:ring-4 focus-visible:ring-[#4880e5]/30 disabled:translate-y-0 disabled:opacity-70"
                    onClick={startSession}
                  >
                    {!isStarting && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-1 -z-10 [animation:pulse_2.4s_ease-in-out_infinite] rounded-2xl border border-[#4880e5]/45 bg-[#4880e5]/10 opacity-80"
                      />
                    )}
                    <span className="absolute inset-x-3 top-1 rounded-full bg-white/25 opacity-70 blur-sm transition group-hover:opacity-95" />
                    <Mic2 className="relative mr-2 size-4" />
                    <span className="relative flex flex-col items-start leading-none">
                      <span>{isStarting ? 'Connecting...' : 'Start tutoring'}</span>
                      {!isStarting && (
                        <span className="mt-1 text-[10px] font-semibold tracking-wide text-[#dbeafe] uppercase">
                          speak with your AI tutor
                        </span>
                      )}
                    </span>
                  </Button>
                )}
              </div>
            </TooltipProvider>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Tldraw
              className="absolute inset-0"
              components={TUTOR_TLDRAW_COMPONENTS}
              licenseKey={process.env.NEXT_PUBLIC_TLDRAW_LICENSE_KEY || undefined}
              onMount={(mountedEditor) => {
                editorRef.current = mountedEditor;
                if (canExposeLocalTestHooks(window.location.hostname)) {
                  const tutorWindow = window as Window & {
                    mathTutorEditor?: Editor;
                    mathTutorApplyActions?: (actions: TutorCanvasCommand['actions']) => void;
                    mathTutorGetCanvasContext?: () => Promise<CanvasContext>;
                  };
                  tutorWindow.mathTutorEditor = mountedEditor;

                  tutorWindow.mathTutorApplyActions = (actions) => {
                    applyTutorActions(mountedEditor, actions);
                    focusTutorWorkAfterCanvasWrite(mountedEditor, actions);
                  };

                  tutorWindow.mathTutorGetCanvasContext = () =>
                    buildCanvasContext(mountedEditor, roomName, recentEventsRef.current, {
                      tutorTurn: tutorTurnRef.current,
                    });
                }
                setEditor(mountedEditor);
                clearSystemHints(mountedEditor);

                mountedEditor.updateInstanceState({ isGridMode: true });
                configureStudentWritingDefaults(mountedEditor);
                mountedEditor.complete();
                mountedEditor.selectNone();
                mountedEditor.setCurrentTool('select');
              }}
            />
          </div>
        </section>

        <aside className="flex min-h-[32svh] flex-col bg-[#f3f7ff] text-[#17212b] md:min-h-svh">
          <div className="border-b border-[#d9e7fb] bg-[#f8fbff] px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-mono text-[11px] leading-none font-bold text-[#4880e5] uppercase">
                  Voice transcript
                </div>
                <h2 className="mt-2 font-mono text-[21px] leading-none font-bold text-[#111827]">
                  Tutor dialogue
                </h2>
              </div>
              <div
                className={cn(
                  'rounded-full px-3 py-1 font-mono text-[11px] font-bold',
                  tutorHealth.status === 'failed' || tutorHealth.status === 'stalled'
                    ? 'bg-[#fff1ee] text-[#c6452f]'
                    : session.isConnected
                      ? 'bg-[#e4efff] text-[#275fbd]'
                      : 'bg-[#e7edf5] text-[#64748b]'
                )}
              >
                {statusLabel}
              </div>
            </div>
            {startError && (
              <div className="mt-3 flex items-start gap-2 rounded-md border border-[#f0b7ad] bg-[#fff1ee] px-3 py-2 text-sm text-[#8f2e20]">
                <CircleAlert className="mt-0.5 size-4 shrink-0 text-[#c6452f]" />
                <span>{startError}</span>
              </div>
            )}
            {startNotice && !startError && (
              <div className="mt-3 flex items-start gap-2 rounded-md border border-[#bdd3fb] bg-[#eef5ff] px-3 py-2 text-sm text-[#275fbd]">
                <CircleAlert className="mt-0.5 size-4 shrink-0 text-[#4880e5]" />
                <span>{startNotice}</span>
              </div>
            )}
            {tutorHealth.message && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-md border border-[#f0b7ad] bg-[#fff1ee] px-3 py-2 text-sm text-[#8f2e20]">
                <div className="flex min-w-0 items-start gap-2">
                  <CircleAlert className="mt-0.5 size-4 shrink-0 text-[#c6452f]" />
                  <span>{tutorHealth.message}</span>
                </div>
                <Button
                  size="sm"
                  disabled={isStarting}
                  onClick={restartSession}
                  className="h-8 shrink-0 rounded-md bg-[#4880e5] px-3 text-xs font-semibold text-white hover:bg-[#356fce]"
                >
                  Restart
                </Button>
              </div>
            )}
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            <AgentChatTranscript
              agentState={agentState}
              messages={transcriptMessages}
              className="h-full bg-[#f3f7ff] [&_.is-assistant]:max-w-[92%] [&_.is-assistant>div]:rounded-[18px] [&_.is-assistant>div]:rounded-tl-md [&_.is-assistant>div]:border [&_.is-assistant>div]:border-white/80 [&_.is-assistant>div]:bg-white/95 [&_.is-assistant>div]:px-4 [&_.is-assistant>div]:py-3.5 [&_.is-assistant>div]:text-[#17212b] [&_.is-assistant>div]:shadow-[0_12px_32px_rgba(72,128,229,0.11)] [&_.is-assistant>div]:ring-1 [&_.is-assistant>div]:ring-[#d9e7fb] [&_.is-user>div]:rounded-[18px] [&_.is-user>div]:rounded-tr-md [&_.is-user>div]:bg-[#4880e5] [&_.is-user>div]:px-4 [&_.is-user>div]:py-3.5 [&_.is-user>div]:text-white [&_.is-user>div]:shadow-[0_12px_28px_rgba(72,128,229,0.22)] [&>div>div]:px-5 [&>div>div]:py-5"
            />
          </div>

          <div className="border-t border-[#d9e7fb] bg-[#f8fbff] p-4">
            {currentTutorTurn && currentTutorTurn.phase !== 'observing' && (
              <div className="mb-3 rounded-md border border-[#c9daf7] bg-white px-3 py-2 text-xs text-[#64748b] shadow-sm shadow-[#4880e5]/5">
                <div className="font-semibold text-[#25313a]">
                  {currentTutorTurn.phase === 'waiting_for_student'
                    ? 'Tutor is waiting'
                    : 'Student response detected'}
                </div>
                {currentTutorTurn.question && (
                  <div className="mt-1 line-clamp-2">{currentTutorTurn.question}</div>
                )}
              </div>
            )}
            <div className="flex gap-2">
              <textarea
                value={prompt}
                disabled={promptEntryDisabled}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    sendPrompt();
                  }
                }}
                placeholder="Type a backup question for the tutor..."
                className="min-h-11 flex-1 resize-none rounded-md border border-[#c9daf7] bg-white px-3 py-2 text-sm text-[#17212b] outline-none placeholder:text-[#8a94a6] focus:border-[#4880e5] focus:ring-2 focus:ring-[#4880e5]/15 disabled:cursor-not-allowed disabled:bg-[#edf3fb] disabled:opacity-70"
              />
              <Button
                disabled={
                  isSending ||
                  !session.isConnected ||
                  !tutorHealth.canSendPrompt ||
                  prompt.trim().length === 0
                }
                onClick={sendPrompt}
                className="h-11 rounded-md bg-[#4880e5] text-white shadow-sm shadow-[#4880e5]/20 hover:bg-[#356fce]"
              >
                <Send className="size-4" />
              </Button>
            </div>
            {session.isConnected && (
              <div className="mt-4">
                <AgentControlBar
                  variant="livekit"
                  controls={{
                    leave: true,
                    microphone: true,
                    camera: false,
                    screenShare: false,
                    chat: false,
                  }}
                  isConnected={session.isConnected}
                  onDisconnect={session.end}
                  className="border-[#c9daf7] bg-white text-[#17212b]"
                />
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

export function MathTutorWorkspace({ appConfig }: TutorShellProps) {
  return <TutorShell appConfig={appConfig} />;
}

function focusTutorWorkAfterCanvasWrite(editor: Editor, actions: TutorCanvasCommand['actions']) {
  const hasVisibleTutorWrite = actions.some(
    (action) => action.type !== 'clear_ai_annotations' && action.type !== 'highlight'
  );

  if (!hasVisibleTutorWrite) return;

  window.requestAnimationFrame(() => {
    editor.complete();
    editor.selectNone();
    editor.zoomToFit({ animation: { duration: 300 } });
  });
}

async function loadPendingHomeworkImage(editor: Editor): Promise<void> {
  const SESSION_KEY = 'mathTutor.pendingHomeworkImage';
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return;

  sessionStorage.removeItem(SESSION_KEY);

  try {
    const { dataUrl, fileName } = JSON.parse(raw) as { dataUrl: string; fileName: string };
    if (!dataUrl?.startsWith('data:image/')) return;

    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], fileName, { type: blob.type });
    const existingShapeIds = new Set(editor.getCurrentPageShapes().map((shape) => shape.id));

    await editor.putExternalContent({
      type: 'files',
      files: [file],
      point: { x: 140, y: 160 },
      ignoreParent: false,
    });

    const newHomeworkImages = editor
      .getCurrentPageShapes()
      .filter((shape) => shape.type === 'image' && !existingShapeIds.has(shape.id));

    if (newHomeworkImages.length > 0) {
      const placedHomeworkImages = newHomeworkImages.map((shape) => ({
        shape,
        geometry: getHomeworkImageStarterGeometry(editor, shape),
      }));

      editor.updateShapes(
        placedHomeworkImages.map(({ shape, geometry }) => ({
          id: shape.id,
          type: 'image' as const,
          x: geometry.x,
          y: geometry.y,
          props: {
            w: geometry.w,
            h: geometry.h,
          },
          meta: { ...shape.meta, owner: 'student' },
        }))
      );

      configureStudentWritingDefaults(editor);

      focusHomeworkStarterArea(editor);
    }

    editor.selectNone();
    window.requestAnimationFrame(() => editor.selectNone());
  } catch (e) {
    console.warn('[MathTutor] Failed to load pending homework image', e);
  }
}

function configureStudentWritingDefaults(editor: Editor) {
  editor.setStyleForNextShapes(DefaultColorStyle, 'black');
  editor.setStyleForNextShapes(DefaultDashStyle, 'draw');
  editor.setStyleForNextShapes(DefaultSizeStyle, 'm');
}

function getHomeworkImageStarterGeometry(editor: Editor, shape: { props?: unknown }) {
  const props = (shape.props ?? {}) as { w?: number; h?: number };
  const sourceWidth = Number.isFinite(props.w) && props.w ? props.w : 1200;
  const sourceHeight = Number.isFinite(props.h) && props.h ? props.h : 1200;
  const viewport = editor.getViewportScreenBounds();
  const isNarrowCanvas = viewport.w < 760;

  const maxWidth = isNarrowCanvas
    ? clamp(viewport.w * 0.72, 280, 380)
    : clamp(viewport.w * 0.34, 420, 520);
  const maxHeight = isNarrowCanvas
    ? clamp(viewport.h * 0.34, 220, 360)
    : clamp(viewport.h * 0.46, 340, 500);
  const scale = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight, 1);
  const width = Math.round(sourceWidth * scale);
  const height = Math.round(sourceHeight * scale);

  return {
    x: isNarrowCanvas ? 48 : 80,
    y: isNarrowCanvas ? 96 : 120,
    w: width,
    h: height,
  };
}

function focusHomeworkStarterArea(editor: Editor) {
  editor.setCamera({ x: 0, y: 0, z: 1 }, { animation: { duration: 300 } });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
