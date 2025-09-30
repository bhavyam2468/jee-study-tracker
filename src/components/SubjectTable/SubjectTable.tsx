import { useState } from 'react';
import type { Subject } from '../../types';
import { useStudy } from '../../contexts/StudyContext';
import { Checkball } from '../Checkball/Checkball';
import { ConfirmDialog } from '../Modals/ConfirmDialog';
import styles from './SubjectTable.module.css';

interface SubjectTableProps {
  subject: Subject;
}

interface ConfirmState {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

export function SubjectTable({ subject }: SubjectTableProps) {
  const { updateCheckball, addColumn, addChapter, removeSubject, removeColumn, removeChapter, updateChapterName, updateColumnName } = useStudy();
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    show: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [editingChapterName, setEditingChapterName] = useState('');
  const [editingColumnName, setEditingColumnName] = useState('');
  
  const handleDeleteSubject = () => {
    setConfirmState({
      show: true,
      title: 'Delete Subject',
      message: `Are you sure you want to delete "${subject.name}"? This action cannot be undone.`,
      onConfirm: () => {
        removeSubject(subject.id);
        setConfirmState({ ...confirmState, show: false });
      }
    });
  };
  
  const handleDeleteColumn = (columnId: string, columnName: string) => {
    setConfirmState({
      show: true,
      title: 'Delete Column',
      message: `Are you sure you want to delete "${columnName}"?`,
      onConfirm: () => {
        removeColumn(subject.id, columnId);
        setConfirmState({ ...confirmState, show: false });
      }
    });
  };
  
  const handleDeleteChapter = (chapterId: string, chapterName: string) => {
    setConfirmState({
      show: true,
      title: 'Delete Chapter',
      message: `Are you sure you want to delete "${chapterName}"?`,
      onConfirm: () => {
        removeChapter(subject.id, chapterId);
        setConfirmState({ ...confirmState, show: false });
      }
    });
  };
  
  const handleAddColumn = () => {
    const newColumn = addColumn(subject.id, '');
    if (newColumn) {
      setEditingColumnId(newColumn.id);
      setEditingColumnName('');
    }
  };
  
  const handleAddChapter = () => {
    const newChapter = addChapter(subject.id, '');
    if (newChapter) {
      setEditingChapterId(newChapter.id);
      setEditingChapterName('');
    }
  };
  
  const handleSaveChapter = (chapterId: string) => {
    if (editingChapterName.trim()) {
      updateChapterName(subject.id, chapterId, editingChapterName.trim());
    } else {
      // If empty, delete the chapter
      removeChapter(subject.id, chapterId);
    }
    setEditingChapterId(null);
    setEditingChapterName('');
  };
  
  const handleSaveColumn = (columnId: string) => {
    if (editingColumnName.trim()) {
      updateColumnName(subject.id, columnId, editingColumnName.trim());
    } else {
      // If empty, delete the column
      removeColumn(subject.id, columnId);
    }
    setEditingColumnId(null);
    setEditingColumnName('');
  };
  
  const startEditingChapter = (chapterId: string, currentName: string) => {
    setEditingChapterId(chapterId);
    setEditingChapterName(currentName);
  };
  
  const startEditingColumn = (columnId: string, currentName: string) => {
    setEditingColumnId(columnId);
    setEditingColumnName(currentName);
  };
  
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2 className={styles.subjectName}>{subject.name}</h2>
        <div className={styles.headerButtons}>
          <button
            className={styles.addButton}
            onClick={handleAddColumn}
            title="Add column"
          >
            + Column
          </button>
          <button
            className={styles.deleteButton}
            onClick={handleDeleteSubject}
            title="Delete subject"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.chapterColumn}>Chapter</th>
              {subject.columns.map(column => (
                <th key={column.id} className={styles.columnHeader}>
                  <div className={styles.columnHeaderContent}>
                    {editingColumnId === column.id ? (
                      <div className={styles.editingContainer}>
                        <input
                          type="text"
                          value={editingColumnName}
                          onChange={(e) => setEditingColumnName(e.target.value)}
                          placeholder="Column name"
                          className={styles.editInput}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveColumn(column.id);
                            if (e.key === 'Escape') setEditingColumnId(null);
                          }}
                        />
                        <button
                          className={styles.saveButton}
                          onClick={() => handleSaveColumn(column.id)}
                          title="Save"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <span onClick={() => startEditingColumn(column.id, column.name)}>{column.name || 'Untitled'}</span>
                        <button
                          className={styles.deleteColumnButton}
                          onClick={() => handleDeleteColumn(column.id, column.name)}
                          title="Delete column"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subject.chapters.map(chapter => (
              <tr key={chapter.id} className={styles.chapterRow}>
                <td className={styles.chapterName}>
                  <div className={styles.chapterNameContent}>
                    {editingChapterId === chapter.id ? (
                      <div className={styles.editingContainer}>
                        <input
                          type="text"
                          value={editingChapterName}
                          onChange={(e) => setEditingChapterName(e.target.value)}
                          placeholder="Chapter name"
                          className={styles.editInput}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveChapter(chapter.id);
                            if (e.key === 'Escape') setEditingChapterId(null);
                          }}
                        />
                        <button
                          className={styles.saveButton}
                          onClick={() => handleSaveChapter(chapter.id)}
                          title="Save"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <span onClick={() => startEditingChapter(chapter.id, chapter.name)}>{chapter.name || 'Untitled'}</span>
                        <button
                          className={styles.deleteChapterButton}
                          onClick={() => handleDeleteChapter(chapter.id, chapter.name)}
                          title="Delete chapter"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </td>
                {subject.columns.map(column => {
                  const checkball = chapter.checkballs.find(cb => cb.columnId === column.id);
                  return (
                    <td key={column.id} className={styles.checkballCell}>
                      {checkball && (
                        <Checkball
                          level={checkball.level}
                          onChange={(level) => 
                            updateCheckball(subject.id, chapter.id, column.id, level)
                          }
                          chapterName={chapter.name}
                          columnName={column.name}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button
        className={styles.addChapterButton}
        onClick={handleAddChapter}
        title="Add chapter"
      >
        + Add Chapter
      </button>
      
      {confirmState.show && (
        <ConfirmDialog
          title={confirmState.title}
          message={confirmState.message}
          onConfirm={confirmState.onConfirm}
          onCancel={() => setConfirmState({ ...confirmState, show: false })}
        />
      )}
    </div>
  );
}