import type { CanvasEvent } from '@tutorials-maker/math-tutor-protocol';

type StoreEntryLike = {
  changes?: {
    added?: Record<string, unknown>;
    updated?: Record<string, [unknown, unknown]>;
    removed?: Record<string, unknown>;
  };
};

type ShapeRecordLike = {
  id: string;
  typeName: 'shape';
  meta?: {
    owner?: unknown;
  };
};

export type StudentCanvasChange = Pick<CanvasEvent, 'type' | 'shapeId'>;

function isShapeRecord(record: unknown): record is ShapeRecordLike {
  return (
    Boolean(record) &&
    typeof record === 'object' &&
    (record as { typeName?: unknown }).typeName === 'shape' &&
    typeof (record as { id?: unknown }).id === 'string'
  );
}

function isStudentOwnedShape(record: ShapeRecordLike) {
  return record.meta?.owner !== 'ai' && record.meta?.owner !== 'system';
}

function findStudentShape(records: unknown[]) {
  for (const record of records) {
    if (isShapeRecord(record) && isStudentOwnedShape(record)) {
      return record;
    }
  }

  return undefined;
}

export function getStudentCanvasChangeFromStoreEntry(
  entry: StoreEntryLike
): StudentCanvasChange | undefined {
  const changes = entry.changes;
  if (!changes) return undefined;

  const addedShape = findStudentShape(Object.values(changes.added ?? {}));
  if (addedShape) {
    return { type: 'shape_created', shapeId: addedShape.id };
  }

  const updatedShape = findStudentShape(
    Object.values(changes.updated ?? {}).map(([, after]) => after)
  );
  if (updatedShape) {
    return { type: 'shape_updated', shapeId: updatedShape.id };
  }

  const removedShape = findStudentShape(Object.values(changes.removed ?? {}));
  if (removedShape) {
    return { type: 'shape_deleted', shapeId: removedShape.id };
  }

  return undefined;
}
