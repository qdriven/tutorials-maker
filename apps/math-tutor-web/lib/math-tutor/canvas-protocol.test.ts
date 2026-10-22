import { describe, expect, it } from 'vitest';
import {
  CanvasContextSchema,
  TutorCanvasActionSchema,
  TutorCanvasCommandSchema,
  normalizeTutorCommand,
} from '@tutorials-maker/math-tutor-protocol';

describe('TutorCanvasActionSchema', () => {
  it('accepts safe instructional actions for formulas, highlights, arrows, and corrections', () => {
    const command = TutorCanvasCommandSchema.parse({
      narration: "Let's isolate x one step at a time.",
      actions: [
        { type: 'write_formula', latex: '2x + 3 = 7', x: 420, y: 160 },
        {
          type: 'write_formula',
          latex: '2x = -8',
          x: 420,
          y: 230,
          targetShapeId: 'student-step-2',
        },
        {
          type: 'highlight',
          x: 410,
          y: 154,
          w: 180,
          h: 46,
          color: 'yellow',
          label: 'original equation',
        },
        {
          type: 'hint_card',
          title: 'Next step',
          body: 'What common factor appears in both terms?',
          equation: 'x^2 + 7x',
          targetShapeId: 'student-step-2',
        },
        {
          type: 'draw_arrow',
          from: { x: 510, y: 205 },
          to: { x: 510, y: 260 },
          label: 'subtract 3',
        },
        {
          type: 'mark_wrong',
          x: 380,
          y: 310,
          reason: 'The sign changed in the wrong direction.',
        },
        {
          type: 'correct_step',
          targetShapeId: 'student-step-2',
          reason: 'The eight should move as negative eight.',
          latex: '2x = -8',
        },
        {
          type: 'ask_student',
          targetShapeId: 'student-step-2',
          question: 'What is negative eight divided by two?',
        },
      ],
    });

    expect(command.actions).toHaveLength(8);
    expect(command.actions[0]).toMatchObject({ type: 'write_formula' });
    expect(command.actions[1]).toMatchObject({
      type: 'write_formula',
      targetShapeId: 'student-step-2',
    });
    expect(command.actions[3]).toMatchObject({
      type: 'hint_card',
      title: 'Next step',
      targetShapeId: 'student-step-2',
    });
    expect(command.actions[6]).toMatchObject({
      type: 'correct_step',
      targetShapeId: 'student-step-2',
      latex: '2x = -8',
    });
    expect(command.actions[7]).toMatchObject({
      type: 'ask_student',
      targetShapeId: 'student-step-2',
    });
  });

  it('rejects unsupported drawing instructions instead of letting the agent mutate the canvas freely', () => {
    expect(() =>
      TutorCanvasActionSchema.parse({
        type: 'run_javascript',
        code: 'editor.deleteShapes(editor.getCurrentPageShapeIds())',
      })
    ).toThrow();
  });

  it('accepts the flowchart actions used for 程序框图 tutoring', () => {
    const command = TutorCanvasCommandSchema.parse({
      narration: 'I redrew the flowchart and traced the path.',
      actions: [
        {
          type: 'draw_flowchart',
          spec: {
            nodes: [
              { id: 's', kind: 'start', label: '开始' },
              { id: 'd', kind: 'decision', label: 'a > 2' },
              { id: 'e', kind: 'end', label: '结束' },
            ],
            edges: [
              { from: 's', to: 'd' },
              { from: 'd', to: 'e', label: '是' },
            ],
          },
          x: 420,
          y: 120,
        },
        { type: 'trace_flowchart', path: ['s', 'd', 'e'], note: 'the taken path' },
      ],
    });

    expect(command.actions).toHaveLength(2);
    expect(command.actions[0]).toMatchObject({ type: 'draw_flowchart' });
    expect(command.actions[1]).toMatchObject({ type: 'trace_flowchart' });
  });
});

describe('CanvasContextSchema', () => {
  it('keeps the compact fields the agent needs to tutor from the current whiteboard', () => {
    const context = CanvasContextSchema.parse({
      roomName: 'math-room',
      viewport: { x: 0, y: 0, w: 1280, h: 720, zoom: 1 },
      selectedShapeIds: ['shape-a'],
      recentEvents: [
        {
          type: 'shape_created',
          shapeId: 'shape-a',
          at: '2026-05-22T04:00:00.000Z',
        },
      ],
      shapes: [
        {
          id: 'shape-a',
          type: 'text',
          x: 200,
          y: 120,
          text: '2x + 3 = 7',
          owner: 'student',
        },
      ],
      screenshotDataUrl: 'data:image/png;base64,abc',
    });

    expect(context.shapes[0]?.owner).toBe('student');
    expect(context.selectedShapeIds).toEqual(['shape-a']);
  });

  it('accepts structured board understanding for tutor step references', () => {
    const context = CanvasContextSchema.parse({
      roomName: 'math-room',
      viewport: { x: 0, y: 0, w: 1280, h: 720, zoom: 1 },
      selectedShapeIds: ['student-step-2'],
      recentEvents: [],
      shapes: [],
      board: {
        activeStepId: 'step-2',
        steps: [
          {
            id: 'step-1',
            shapeId: 'student-problem',
            role: 'problem',
            index: 1,
            text: '2x + 8 = 0',
            x: 90,
            y: 95,
            w: 650,
            h: 60,
          },
          {
            id: 'step-2',
            shapeId: 'student-step-2',
            role: 'student_step',
            index: 2,
            text: '2x = 8',
            x: 90,
            y: 275,
            w: 650,
            h: 60,
          },
        ],
      },
      tutorTurn: {
        phase: 'waiting_for_student',
        targetShapeId: 'student-step-2',
        question: 'What should you do next?',
        waitingSince: '2026-05-22T04:00:02.000Z',
      },
    });

    expect(context.board?.activeStepId).toBe('step-2');
    expect(context.board?.steps[1]?.role).toBe('student_step');
    expect(context.tutorTurn?.phase).toBe('waiting_for_student');
  });
});

describe('normalizeTutorCommand', () => {
  it('clamps extreme coordinates and drops empty narration whitespace', () => {
    const normalized = normalizeTutorCommand({
      narration: '   ',
      actions: [
        { type: 'hint_card', title: 'Check', body: 'Try the next operation.', x: -50, y: 9000 },
      ],
    });

    expect(normalized.narration).toBeUndefined();
    expect(normalized.actions[0]).toMatchObject({ type: 'hint_card', x: 0, y: 4000 });
  });
});
