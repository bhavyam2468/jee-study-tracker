import React from 'react';
import styles from './ConfirmDialog.module.css';

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel'
}: ConfirmDialogProps) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onCancel} className={styles.cancelButton}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}