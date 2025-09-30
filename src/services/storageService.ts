import type { AppState } from '../types';
import { createDefaultSubjects } from '../data/defaultSubjects';

const STORAGE_KEY = 'jee-study-tracker-data';

export function loadAppState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate the structure
      if (parsed.subjects && Array.isArray(parsed.subjects)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  
  // Return default state
  return {
    subjects: createDefaultSubjects(),
    theme: 'dark',
    lastModified: new Date().toISOString()
  };
}

export function saveAppState(state: AppState): void {
  try {
    const toSave = {
      ...state,
      lastModified: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function exportAsJSON(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function validateImportData(data: any): data is AppState {
  if (!data || typeof data !== 'object') return false;
  if (!data.subjects || !Array.isArray(data.subjects)) return false;
  
  for (const subject of data.subjects) {
    if (!subject.id || !subject.name || !subject.chapters || !subject.columns) {
      return false;
    }
    
    for (const chapter of subject.chapters) {
      if (!chapter.id || !chapter.name || !chapter.checkballs) return false;
      
      for (const checkball of chapter.checkballs) {
        if (typeof checkball.level !== 'number' || checkball.level < 0 || checkball.level > 10) {
          return false;
        }
      }
    }
  }
  
  return true;
}