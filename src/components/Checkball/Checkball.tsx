import { useState, useRef, useEffect } from 'react';
import type { CompletionLevel } from '../../types';
import { useLongPress } from '../../hooks/useLongPress';
import styles from './Checkball.module.css';

interface CheckballProps {
  level: CompletionLevel;
  onChange: (level: CompletionLevel) => void;
  chapterName: string;
  columnName: string;
}

export function Checkball({ level, onChange, chapterName, columnName }: CheckballProps) {
  const [showSlider, setShowSlider] = useState(false);
  const checkballRef = useRef<HTMLDivElement>(null);
  
  const handleClick = () => {
    // Three-click cycle: 0 → 5 → 10 → 0
    if (level === 0) {
      onChange(5);
    } else if (level === 5) {
      onChange(10);
    } else {
      onChange(0);
    }
  };
  
  const handleLongPress = () => {
    setShowSlider(true);
  };
  
  const longPressHandlers = useLongPress(handleLongPress, handleClick, 500);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!checkballRef.current?.contains(document.activeElement)) return;
      
      const key = e.key;
      if (key >= '0' && key <= '9') {
        e.preventDefault();
        const num = parseInt(key);
        onChange(num as CompletionLevel);
      } else if (key === ' ') {
        e.preventDefault();
        handleClick();
      } else if (key === 'Enter') {
        e.preventDefault();
        setShowSlider(true);
      } else if (key === 'Escape' && showSlider) {
        e.preventDefault();
        setShowSlider(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [level, showSlider]);
  
  const fillPercentage = (level / 10) * 100;
  
  return (
    <div className={styles.checkballContainer} ref={checkballRef}>
      <div
        className={styles.checkball}
        {...longPressHandlers}
        tabIndex={0}
        role="checkbox"
        aria-checked={level === 10}
        aria-label={`${columnName} progress for ${chapterName}: ${level} out of 10`}
        style={{
          background: level > 0
            ? `linear-gradient(to top, var(--checkball-fill) ${fillPercentage}%, var(--checkball-empty) ${fillPercentage}%)`
            : 'var(--checkball-empty)'
        }}
      >
        <div className={styles.checkballInner} />
      </div>
      
      {showSlider && (
        <div className={styles.sliderOverlay} onClick={() => setShowSlider(false)}>
          <div className={styles.sliderContainer} onClick={(e) => e.stopPropagation()}>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={level}
              onChange={(e) => onChange(parseInt(e.target.value) as CompletionLevel)}
              className={styles.slider}
              style={{
                background: `linear-gradient(to right, var(--checkball-fill) 0%, var(--checkball-fill) ${fillPercentage}%, var(--checkball-border) ${fillPercentage}%, var(--checkball-border) 100%)`
              }}
            />
            <div className={styles.sliderLabel}>{level}/10</div>
            <button onClick={() => setShowSlider(false)} className={styles.closeButton}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}