import { useState } from 'react';
import styles from './Modal.module.css';

interface AddSubjectModalProps {
  onAdd: (name: string) => void;
  onClose: () => void;
}

export function AddSubjectModal({ onAdd, onClose }: AddSubjectModalProps) {
  const [name, setName] = useState('');
  
  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name.trim());
      onClose();
    }
  };
  
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Add New Subject</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subject name (e.g., Biology)"
          className={styles.input}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
            if (e.key === 'Escape') onClose();
          }}
        />
        <div className={styles.buttons}>
          <button onClick={handleSubmit} className={styles.primaryButton}>
            Add
          </button>
          <button onClick={onClose} className={styles.secondaryButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}