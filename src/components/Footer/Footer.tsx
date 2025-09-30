import { useStudy } from '../../contexts/StudyContext';
import styles from './Footer.module.css';

export function Footer() {
  const { getProgressStats } = useStudy();
  const stats = getProgressStats();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.stat}>
        <span className={styles.label}>Chapters:</span>
        <span className={styles.value}>
          {stats.completedChapters}/{stats.totalChapters}
        </span>
      </div>
      <div className={styles.separator}>|</div>
      <div className={styles.stat}>
        <span className={styles.label}>Overall:</span>
        <span className={styles.value}>
          {stats.overallCompletionPercentage}% Complete
        </span>
      </div>
    </footer>
  );
}