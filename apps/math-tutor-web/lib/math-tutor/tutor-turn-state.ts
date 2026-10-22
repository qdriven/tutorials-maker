import type {
  CanvasEvent,
  TutorCanvasAction,
  TutorTurnState,
} from '@tutorials-maker/math-tutor-protocol';

export type TutorTurnStateInput = TutorTurnState;

export function createWaitingForStudentTurn(
  action: Extract<TutorCanvasAction, { type: 'ask_student' }>,
  waitingSince = new Date().toISOString()
): TutorTurnState {
  return {
    phase: 'waiting_for_student',
    ...(action.targetShapeId ? { targetShapeId: action.targetShapeId } : {}),
    question: action.question,
    waitingSince,
  };
}

export function resolveTutorTurnState(
  turn: TutorTurnStateInput | undefined,
  recentEvents: CanvasEvent[]
): TutorTurnState | undefined {
  if (!turn || turn.phase !== 'waiting_for_student' || !turn.waitingSince) {
    return turn;
  }

  const waitingSinceMs = Date.parse(turn.waitingSince);
  const latestStudentEvent = recentEvents
    .filter((event) => ['shape_created', 'shape_updated', 'shape_deleted'].includes(event.type))
    .filter((event) => Date.parse(event.at) > waitingSinceMs)
    .sort((a, b) => Date.parse(b.at) - Date.parse(a.at))[0];

  if (!latestStudentEvent) return turn;

  return {
    ...turn,
    phase: 'student_responded',
    lastStudentEventAt: latestStudentEvent.at,
  };
}
