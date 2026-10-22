import { describe, expect, it } from 'vitest';
import {
  type TutorTurnStateInput,
  createWaitingForStudentTurn,
  resolveTutorTurnState,
} from './tutor-turn-state';

describe('tutor turn state', () => {
  it('creates a waiting turn from an ask_student action', () => {
    const turn = createWaitingForStudentTurn(
      {
        type: 'ask_student',
        targetShapeId: 'student-step-2',
        question: 'What is negative eight divided by two?',
      },
      '2026-05-22T04:00:00.000Z'
    );

    expect(turn).toEqual({
      phase: 'waiting_for_student',
      targetShapeId: 'student-step-2',
      question: 'What is negative eight divided by two?',
      waitingSince: '2026-05-22T04:00:00.000Z',
    });
  });

  it('marks the turn as student_responded after a later student canvas event', () => {
    const turn: TutorTurnStateInput = {
      phase: 'waiting_for_student',
      targetShapeId: 'student-step-2',
      question: 'Try the division.',
      waitingSince: '2026-05-22T04:00:00.000Z',
    };

    const resolved = resolveTutorTurnState(turn, [
      {
        type: 'shape_updated',
        shapeId: 'student-step-3',
        at: '2026-05-22T04:00:04.000Z',
      },
    ]);

    expect(resolved).toMatchObject({
      phase: 'student_responded',
      lastStudentEventAt: '2026-05-22T04:00:04.000Z',
    });
  });

  it('treats deleting a student shape as a response', () => {
    const turn: TutorTurnStateInput = {
      phase: 'waiting_for_student',
      question: 'Can you fix that line?',
      waitingSince: '2026-05-22T04:00:00.000Z',
    };

    const resolved = resolveTutorTurnState(turn, [
      {
        type: 'shape_deleted',
        shapeId: 'student-step-2',
        at: '2026-05-22T04:00:02.000Z',
      },
    ]);

    expect(resolved?.phase).toBe('student_responded');
  });

  it('keeps waiting if the only events happened before the prompt', () => {
    const turn: TutorTurnStateInput = {
      phase: 'waiting_for_student',
      question: 'Now you try.',
      waitingSince: '2026-05-22T04:00:10.000Z',
    };

    const resolved = resolveTutorTurnState(turn, [
      {
        type: 'shape_updated',
        at: '2026-05-22T04:00:04.000Z',
      },
    ]);

    expect(resolved?.phase).toBe('waiting_for_student');
  });
});
