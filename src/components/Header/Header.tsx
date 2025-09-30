import React, { useState, useRef, useEffect } from 'react';
import { useStudy } from '../../contexts/StudyContext';
import { exportToPDF, exportToJSON } from '../../services/pdfService';
import styles from './Header.module.css';

export function Header() {
  const { appState, toggleTheme, exportData, importData } = useStudy();
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Show help modal on first visit
  useEffect(() => {
    const hasSeenHelp = localStorage.getItem('jee-tracker-seen-help');
    if (!hasSeenHelp) {
      setShowHelpModal(true);
      localStorage.setItem('jee-tracker-seen-help', 'true');
    }
  }, []);
  
  const handleExportJSON = () => {
    exportToJSON(appState);
  };
  
  const [notification, setNotification] = useState<string | null>(null);
  
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
  
  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const success = importData(content);
        if (success) {
          showNotification('Data imported successfully!');
        } else {
          showNotification('Failed to import data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>JEE Study Tracker</h1>
      </div>
      
      <div className={styles.right}>
        <button
          onClick={() => setShowHelpModal(true)}
          className={styles.iconButton}
          aria-label="How to use"
          title="How to use"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
          </svg>
        </button>
        
        <button
          onClick={toggleTheme}
          className={styles.iconButton}
          aria-label="Toggle theme"
          title="Toggle light/dark mode"
        >
          {appState.theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        
        <button
          onClick={() => setShowPDFModal(true)}
          className={styles.iconButton}
          aria-label="Export PDF"
          title="Export as PDF"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </button>
        
        <button
          onClick={handleExportJSON}
          className={styles.iconButton}
          aria-label="Export data"
          title="Export data as JSON"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className={styles.iconButton}
          aria-label="Import data"
          title="Import data from JSON"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportJSON}
          style={{ display: 'none' }}
        />
      </div>
      
      {showHelpModal && (
        <div className={styles.modalOverlay} onClick={() => setShowHelpModal(false)}>
          <div className={styles.helpModal} onClick={(e) => e.stopPropagation()}>
            <h2>Quick Start Guide</h2>
            <div className={styles.helpContent}>
              <div className={styles.helpItem}>
                <strong>Track Progress:</strong>
                <p>Click checkballs: Empty → Half → Full → Empty</p>
              </div>
              <div className={styles.helpItem}>
                <strong>Precise Control:</strong>
                <p>Long-press any checkball for 0-10 level slider</p>
              </div>
              <div className={styles.helpItem}>
                <strong>Keyboard:</strong>
                <p>Focus checkball, press 0-9 keys for exact levels</p>
              </div>
              <div className={styles.helpItem}>
                <strong>Add Content:</strong>
                <p>Use "+ Column" and "+ Add Chapter" buttons</p>
              </div>
              <div className={styles.helpItem}>
                <strong>Save Data:</strong>
                <p>Auto-saves locally. Export JSON for backup.</p>
              </div>
            </div>
            <button onClick={() => setShowHelpModal(false)} className={styles.closeButton}>
              Got it!
            </button>
          </div>
        </div>
      )}
      
      {showPDFModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPDFModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>PDF Export</h2>
            <p>Choose export layout:</p>
            <div className={styles.modalButtons}>
              <button
                className={styles.modalButton}
                onClick={async () => {
                  setShowPDFModal(false);
                  try {
                    await exportToPDF(appState, 'styled');
                    showNotification('PDF exported successfully!');
                  } catch (error) {
                    showNotification('Failed to export PDF. Please try again.');
                  }
                }}
              >
                Styled Layout
              </button>
              <button
                className={styles.modalButton}
                onClick={async () => {
                  setShowPDFModal(false);
                  try {
                    await exportToPDF(appState, 'plain');
                    showNotification('PDF exported successfully!');
                  } catch (error) {
                    showNotification('Failed to export PDF. Please try again.');
                  }
                }}
              >
                Plain White/Black
              </button>
            </div>
            <button 
              className={styles.closeButton}
              onClick={() => setShowPDFModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {notification && (
        <div className={styles.notification}>
          {notification}
        </div>
      )}
    </header>
  );
}