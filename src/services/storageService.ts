import type { AppState } from '../types';
import { createDefaultSubjects } from '../data/defaultSubjects';
import { APP_VERSION } from '../config/appConfig';

const STORAGE_KEY = 'jee-study-tracker-data';
const VERSION_KEY = 'jee-study-tracker-version';

export function loadAppState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedVersion = localStorage.getItem(VERSION_KEY);

    if (stored && storedVersion === APP_VERSION) {
      const parsed = JSON.parse(stored);
      // Validate the structure
      if (parsed.subjects && Array.isArray(parsed.subjects)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  
  // If no stored data, or version mismatch, or error, return default state
  // and update the stored version.
  localStorage.setItem(VERSION_KEY, APP_VERSION);
  return {
    subjects: createDefaultSubjects(),
    theme: 'dark',
    lastModified: new Date().toISOString(),
    version: APP_VERSION, // Add version to the state
  };
}

export function saveAppState(state: AppState): void {
  try {
    const toSave = {
      ...state,
      lastModified: new Date().toISOString(),
      version: APP_VERSION, // Ensure version is saved
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    localStorage.setItem(VERSION_KEY, APP_VERSION); // Update version key on save
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