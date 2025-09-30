import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AppState, ActionType, CompletionLevel, ProgressStats } from '../types';
import { loadAppState, saveAppState, validateImportData } from '../services/storageService';
import { calculateProgressStats } from '../services/progressCalculator';
import { createDefaultSubjects } from '../data/defaultSubjects';

interface StudyContextType {
  appState: AppState;
  addSubject: (name: string) => void;
  removeSubject: (subjectId: string) => void;
  addColumn: (subjectId: string, columnName: string, columnType?: string) => { id: string; name: string } | null;
  removeColumn: (subjectId: string, columnId: string) => void;
  updateColumnName: (subjectId: string, columnId: string, name: string) => void;
  addChapter: (subjectId: string, chapterName: string) => { id: string; name: string } | null;
  removeChapter: (subjectId: string, chapterId: string) => void;
  updateChapterName: (subjectId: string, chapterId: string, name: string) => void;
  updateCheckball: (subjectId: string, chapterId: string, columnId: string, level: CompletionLevel) => void;
  toggleTheme: () => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
  resetData: () => void;
  getProgressStats: () => ProgressStats;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

function studyReducer(state: AppState, action: ActionType): AppState {
  switch (action.type) {
    case 'ADD_SUBJECT': {
      const newSubject = {
        id: crypto.randomUUID(),
        name: action.payload.name,
        order: state.subjects.length,
        columns: [
          { id: crypto.randomUUID(), name: 'PYQs', type: 'pyqs' as const, order: 0 },
          { id: crypto.randomUUID(), name: 'Notes', type: 'notes' as const, order: 1 }
        ],
        chapters: []
      };
      return { ...state, subjects: [...state.subjects, newSubject] };
    }
    
    case 'REMOVE_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.filter(s => s.id !== action.payload.subjectId)
      };
    
    case 'ADD_COLUMN': {
      return {
        ...state,
        subjects: state.subjects.map(subject => {
          if (subject.id === action.payload.subjectId) {
            const newColumn = {
              id: crypto.randomUUID(),
              name: action.payload.name,
              type: (action.payload.columnType || 'custom') as any,
              order: subject.columns.length
            };
            
            return {
              ...subject,
              columns: [...subject.columns, newColumn],
              chapters: subject.chapters.map(chapter => ({
                ...chapter,
                checkballs: [...chapter.checkballs, { columnId: newColumn.id, level: 0 as const }]
              }))
            };
          }
          return subject;
        })
      };
    }
    
    case 'REMOVE_COLUMN':
      return {
        ...state,
        subjects: state.subjects.map(subject => {
          if (subject.id === action.payload.subjectId) {
            return {
              ...subject,
              columns: subject.columns.filter(c => c.id !== action.payload.columnId),
              chapters: subject.chapters.map(chapter => ({
                ...chapter,
                checkballs: chapter.checkballs.filter(cb => cb.columnId !== action.payload.columnId)
              }))
            };
          }
          return subject;
        })
      };
    
    case 'ADD_CHAPTER': {
      return {
        ...state,
        subjects: state.subjects.map(subject => {
          if (subject.id === action.payload.subjectId) {
            const newChapter = {
              id: crypto.randomUUID(),
              name: action.payload.name,
              order: subject.chapters.length,
              checkballs: subject.columns.map(col => ({
                columnId: col.id,
                level: 0 as const
              }))
            };
            
            return {
              ...subject,
              chapters: [...subject.chapters, newChapter]
            };
          }
          return subject;
        })
      };
    }
    
    case 'REMOVE_CHAPTER':
      return {
        ...state,
        subjects: state.subjects.map(subject => {
          if (subject.id === action.payload.subjectId) {
            return {
              ...subject,
              chapters: subject.chapters.filter(c => c.id !== action.payload.chapterId)
            };
          }
          return subject;
        })
      };
    
    case 'UPDATE_COLUMN_NAME':
      return {
        ...state,
        subjects: state.subjects.map(subject => {
          if (subject.id === action.payload.subjectId) {
            return {
              ...subject,
              columns: subject.columns.map(col => {
                if (col.id === action.payload.columnId) {
                  return { ...col, name: action.payload.name };
                }
                return col;
              })
            };
          }
          return subject;
        })
      };
    
    case 'UPDATE_CHAPTER_NAME':
      return {
        ...state,
        subjects: state.subjects.map(subject => {
          if (subject.id === action.payload.subjectId) {
            return {
              ...subject,
              chapters: subject.chapters.map(chapter => {
                if (chapter.id === action.payload.chapterId) {
                  return { ...chapter, name: action.payload.name };
                }
                return chapter;
              })
            };
          }
          return subject;
        })
      };
    
    case 'UPDATE_CHECKBALL':
      return {
        ...state,
        subjects: state.subjects.map(subject => {
          if (subject.id === action.payload.subjectId) {
            return {
              ...subject,
              chapters: subject.chapters.map(chapter => {
                if (chapter.id === action.payload.chapterId) {
                  return {
                    ...chapter,
                    checkballs: chapter.checkballs.map(cb => {
                      if (cb.columnId === action.payload.columnId) {
                        return { ...cb, level: action.payload.level };
                      }
                      return cb;
                    })
                  };
                }
                return chapter;
              })
            };
          }
          return subject;
        })
      };
    
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    
    case 'IMPORT_DATA':
      return action.payload;
    
    case 'RESET_DATA':
      return {
        subjects: createDefaultSubjects(),
        theme: 'dark',
        lastModified: new Date().toISOString()
      };
    
    default:
      return state;
  }
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [appState, dispatch] = useReducer(studyReducer, loadAppState());
  
  // Auto-save to localStorage with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveAppState(appState);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [appState]);
  
  // Apply theme to document
  useEffect(() => {
    document.body.className = appState.theme === 'light' ? 'light-theme' : '';
  }, [appState.theme]);
  
  const value: StudyContextType = {
    appState,
    addSubject: (name) => dispatch({ type: 'ADD_SUBJECT', payload: { name } }),
    removeSubject: (subjectId) => dispatch({ type: 'REMOVE_SUBJECT', payload: { subjectId } }),
    addColumn: (subjectId, name, columnType) => {
      const newId = crypto.randomUUID();
      dispatch({ type: 'ADD_COLUMN', payload: { subjectId, name, columnType } });
      return { id: newId, name };
    },
    removeColumn: (subjectId, columnId) =>
      dispatch({ type: 'REMOVE_COLUMN', payload: { subjectId, columnId } }),
    updateColumnName: (subjectId, columnId, name) =>
      dispatch({ type: 'UPDATE_COLUMN_NAME', payload: { subjectId, columnId, name } }),
    addChapter: (subjectId, name) => {
      const newId = crypto.randomUUID();
      dispatch({ type: 'ADD_CHAPTER', payload: { subjectId, name } });
      return { id: newId, name };
    },
    removeChapter: (subjectId, chapterId) =>
      dispatch({ type: 'REMOVE_CHAPTER', payload: { subjectId, chapterId } }),
    updateChapterName: (subjectId, chapterId, name) =>
      dispatch({ type: 'UPDATE_CHAPTER_NAME', payload: { subjectId, chapterId, name } }),
    updateCheckball: (subjectId, chapterId, columnId, level) =>
      dispatch({ type: 'UPDATE_CHECKBALL', payload: { subjectId, chapterId, columnId, level } }),
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    exportData: () => JSON.stringify(appState, null, 2),
    importData: (jsonString) => {
      try {
        const parsed = JSON.parse(jsonString);
        if (validateImportData(parsed)) {
          dispatch({ type: 'IMPORT_DATA', payload: parsed });
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    resetData: () => dispatch({ type: 'RESET_DATA' }),
    getProgressStats: () => calculateProgressStats(appState.subjects)
  };
  
  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within StudyProvider');
  }
  return context;
}