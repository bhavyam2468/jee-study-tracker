import { useCallback, useRef, useState } from 'react';

export function useLongPress(
  onLongPress: () => void,
  onClick: () => void,
  delay = 500
) {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<number | undefined>(undefined);
  
  const start = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    timeout.current = setTimeout(() => {
      onLongPress();
      setLongPressTriggered(true);
    }, delay);
  }, [onLongPress, delay]);
  
  const clear = useCallback((shouldTriggerClick = true) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (shouldTriggerClick && !longPressTriggered) {
      onClick();
    }
    setLongPressTriggered(false);
  }, [onClick, longPressTriggered]);
  
  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: () => clear(true),
    onTouchEnd: () => clear(true),
    onMouseLeave: () => clear(false)
  };
}