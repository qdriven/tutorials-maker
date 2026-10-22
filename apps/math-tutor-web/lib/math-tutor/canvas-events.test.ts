import { describe, expect, it } from 'vitest';
import { getStudentCanvasChangeFromStoreEntry } from './canvas-events';

describe('canvas event extraction', () => {
  it('reports student shape creation', () => {
    const change = getStudentCanvasChangeFromStoreEntry({
      changes: {
        added: {
          'shape:student': { id: 'shape:student', typeName: 'shape', meta: { owner: 'student' } },
        },
        updated: {},
        removed: {},
      },
    });

    expect(change).toEqual({ type: 'shape_created', shapeId: 'shape:student' });
  });

  it('ignores ai and system owned shape changes', () => {
    const change = getStudentCanvasChangeFromStoreEntry({
      changes: {
        added: {
          'shape:ai': { id: 'shape:ai', typeName: 'shape', meta: { owner: 'ai' } },
          'shape:system': { id: 'shape:system', typeName: 'shape', meta: { owner: 'system' } },
        },
        updated: {
          'shape:ai-updated': [
            { id: 'shape:ai-updated', typeName: 'shape', meta: { owner: 'ai' } },
            { id: 'shape:ai-updated', typeName: 'shape', meta: { owner: 'ai' } },
          ],
        },
        removed: {},
      },
    });

    expect(change).toBeUndefined();
  });

  it('reports student updates and deletes', () => {
    expect(
      getStudentCanvasChangeFromStoreEntry({
        changes: {
          added: {},
          updated: {
            'shape:student-updated': [
              { id: 'shape:student-updated', typeName: 'shape' },
              { id: 'shape:student-updated', typeName: 'shape' },
            ],
          },
          removed: {},
        },
      })
    ).toEqual({ type: 'shape_updated', shapeId: 'shape:student-updated' });

    expect(
      getStudentCanvasChangeFromStoreEntry({
        changes: {
          added: {},
          updated: {},
          removed: {
            'shape:student-deleted': { id: 'shape:student-deleted', typeName: 'shape' },
          },
        },
      })
    ).toEqual({ type: 'shape_deleted', shapeId: 'shape:student-deleted' });
  });
});
