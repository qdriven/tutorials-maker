import { describe, expect, it } from 'vitest';
import { buildCanvasInstructionPrompt, parseTutorCommandFromText } from './tutor';

describe('buildCanvasInstructionPrompt', () => {
  it('summarizes the student board and tells the model to use LiveKit canvas tools', () => {
    const prompt = buildCanvasInstructionPrompt({
      roomName: 'room-a',
      viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
      selectedShapeIds: ['shape-1'],
      recentEvents: [],
      screenshotDataUrl: 'data:image/jpeg;base64,abc',
      shapes: [
        {
          id: 'shape-1',
          type: 'text',
          x: 100,
          y: 120,
          text: '2x + 3 = 7',
          owner: 'student',
        },
        {
          id: 'shape-2',
          type: 'text',
          x: 100,
          y: 240,
          text: 'system hint',
          owner: 'system',
        },
        {
          id: 'shape-3',
          type: 'text',
          x: 360,
          y: 120,
          text: '2x = 4',
          owner: 'ai',
        },
      ],
      board: {
        activeStepId: 'student_step_1',
        steps: [
          {
            id: 'student_step_1',
            shapeId: 'shape-1',
            role: 'problem',
            index: 1,
            text: '2x + 3 = 7',
            x: 100,
            y: 120,
            w: 240,
            h: 60,
          },
        ],
      },
      tutorTurn: {
        phase: 'waiting_for_student',
        targetShapeId: 'shape-1',
        question: 'What is seven minus three?',
        waitingSince: '2026-05-22T04:00:00.000Z',
      },
    });

    expect(prompt).toContain('2x + 3 = 7');
    expect(prompt).toContain('Visible tutor annotations');
    expect(prompt).toContain('2x = 4');
    expect(prompt).toContain('Do not treat tutor-owned annotations as new student work');
    expect(prompt).toContain('Canvas image: attached');
    expect(prompt).not.toContain('system hint');
    expect(prompt).toContain('writeCanvasActions');
    expect(prompt).toContain('Do not erase student work');
    expect(prompt).toContain('Coordinates are rough placement hints');
    expect(prompt).toContain('solution lane');
    expect(prompt).toContain('Use compact local marks');
    expect(prompt).toContain('Structured student steps');
    expect(prompt).toContain('student_step_1');
    expect(prompt).toContain('targetShapeId="shape-1"');
    expect(prompt).toContain('Current focus step');
    expect(prompt).toContain('role="problem"');
    expect(prompt).toContain('When judging correctness, diagnose the current focus step first');
    expect(prompt).toContain('write_formula');
    expect(prompt).toContain('hint_card');
    expect(prompt).toContain('same targetShapeId');
    expect(prompt).toContain('correct_step');
    expect(prompt).toContain('ask_student');
    expect(prompt).toContain('try the next micro-step');
    expect(prompt).toContain('Tutor turn state: waiting_for_student');
    expect(prompt).toContain('What is seven minus three?');
    expect(prompt).toContain('do not continue solving');
  });
});

describe('parseTutorCommandFromText', () => {
  it('extracts strict JSON commands from model text', () => {
    const command = parseTutorCommandFromText(`
      Here is the action:
      {
        "narration": "We subtract three.",
        "actions": [
          { "type": "write_formula", "latex": "2x = 4", "x": 200, "y": 240 }
        ]
      }
    `);

    expect(command.narration).toBe('We subtract three.');
    expect(command.actions[0]).toMatchObject({ type: 'write_formula', latex: '2x = 4' });
  });

  it('accepts formula text aliases from model-generated tool JSON', () => {
    const command = parseTutorCommandFromText(`
      {
        "actions": [
          { "type": "write_formula", "text": "x = 2", "x": 200, "y": 300 }
        ]
      }
    `);

    expect(command.actions[0]).toMatchObject({ type: 'write_formula', latex: 'x = 2' });
  });

  it('accepts correction formula aliases from model-generated tool JSON', () => {
    const command = parseTutorCommandFromText(`
      {
        "actions": [
          {
            "type": "correct_step",
            "targetShapeId": "student-step-2",
            "reason": "Move eight as negative eight.",
            "text": "2x = -8"
          }
        ]
      }
    `);

    expect(command.actions[0]).toMatchObject({
      type: 'correct_step',
      targetShapeId: 'student-step-2',
      latex: '2x = -8',
    });
  });
});
