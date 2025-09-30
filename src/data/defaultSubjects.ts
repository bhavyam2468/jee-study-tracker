import type { Subject, Column } from '../types';
import { DEFAULT_COLUMNS, DEFAULT_SUBJECTS } from '../config/appConfig';

// Re-export for backwards compatibility
export { AVAILABLE_COLUMNS } from '../config/appConfig';

function createDefaultColumns(): Column[] {
  return DEFAULT_COLUMNS.map((col, index) => ({
    id: crypto.randomUUID(),
    ...col,
    order: index
  }));
}

function createChaptersForSubject(chapterNames: string[], columns: Column[]) {
  return chapterNames.map((name, index) => ({
    id: crypto.randomUUID(),
    name,
    order: index,
    checkballs: columns.map(col => ({
      columnId: col.id,
      level: 0 as const
    }))
  }));
}

export function createDefaultSubjects(): Subject[] {
  return DEFAULT_SUBJECTS.map((subject, index) => {
    const columns = createDefaultColumns();
    return {
      id: crypto.randomUUID(),
      name: subject.name,
      order: index,
      columns,
      chapters: createChaptersForSubject(subject.chapters, columns)
    };
  });
}