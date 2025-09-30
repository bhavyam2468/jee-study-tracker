// Checkball completion level: 0-10 (0 = empty, 5 = half, 10 = full)
export type CompletionLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Column {
  id: string;
  name: string;
  type: 'pyqs' | 'notes' | 'lectures' | 'quick-revision' | 'brush-up' | 'custom';
  order: number;
}

export interface CheckballState {
  columnId: string;
  level: CompletionLevel;
}

export interface Chapter {
  id: string;
  name: string;
  order: number;
  checkballs: CheckballState[];
}

export interface Subject {
  id: string;
  name: string;
  order: number;
  columns: Column[];
  chapters: Chapter[];
}

export interface AppState {
  subjects: Subject[];
  theme: 'light' | 'dark';
  lastModified: string;
  version?: string; // Optional version for data versioning
}

export interface ProgressStats {
  totalChapters: number;
  completedChapters: number;
  overallCompletionPercentage: number;
  subjectProgress: {
    subjectId: string;
    subjectName: string;
    completedChapters: number;
    totalChapters: number;
    completionPercentage: number;
  }[];
}

export type ActionType =
  | { type: 'ADD_SUBJECT'; payload: { name: string } }
  | { type: 'REMOVE_SUBJECT'; payload: { subjectId: string } }
  | { type: 'ADD_COLUMN'; payload: { subjectId: string; name: string; columnType?: string } }
  | { type: 'REMOVE_COLUMN'; payload: { subjectId: string; columnId: string } }
  | { type: 'UPDATE_COLUMN_NAME'; payload: { subjectId: string; columnId: string; name: string } }
  | { type: 'ADD_CHAPTER'; payload: { subjectId: string; name: string } }
  | { type: 'REMOVE_CHAPTER'; payload: { subjectId: string; chapterId: string } }
  | { type: 'UPDATE_CHAPTER_NAME'; payload: { subjectId: string; chapterId: string; name: string } }
  | { type: 'UPDATE_CHECKBALL'; payload: { subjectId: string; chapterId: string; columnId: string; level: CompletionLevel } }
  | { type: 'TOGGLE_THEME' }
  | { type: 'IMPORT_DATA'; payload: AppState }
  | { type: 'RESET_DATA' };