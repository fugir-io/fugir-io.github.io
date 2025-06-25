import { useCallback, useRef } from 'react';
import { useAppsStore } from '🍎/stores/useAppsStore';

export interface DragOptions {
  handle?: string;
  bounds?: 'parent' | HTMLElement | { top?: number; left?: number; right?: number; bottom?: number };
  axis?: 'x' | 'y' | 'both';
  disabled?: boolean;
  onDragStart?: (e: MouseEvent) => void;
  onDrag?: (e: MouseEvent, position: { x: number; y: number }) => void;
  onDragEnd?: (e: MouseEvent, position: { x: number; y: number }) => void;
}

export interface DragInstance {
  element: HTMLElement | null;
  destroy: () => void;
}

export const useDraggable = (options: DragOptions = {}): [(element: HTMLElement) => DragInstance] => {
  const { setAppBeingDragged } = useAppsStore((state) => ({
    setAppBeingDragged: state.setAppBeingDragged,
  }));

  const activeInstanceRef = useRef<DragInstance | null>(null);

  const createDragInstance = useCallback((element: HTMLElement): DragInstance => {
    if (options.disabled) {
      return { element, destroy: () => {} };
    }

    let isDragging = false;
    let startPosition = { x: 0, y: 0 };
    let elementStartPosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      // Check if we should handle this drag (handle selector)
      if (options.handle) {
        const handle = element.querySelector(options.handle);
        if (!handle || !handle.contains(e.target as Node)) {
          return;
        }
      }

      isDragging = true;
      startPosition = { x: e.clientX, y: e.clientY };
      
      const rect = element.getBoundingClientRect();
      elementStartPosition = { x: rect.left, y: rect.top };

      setAppBeingDragged(true);
      options.onDragStart?.(e);

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startPosition.x;
      const deltaY = e.clientY - startPosition.y;

      let newX = elementStartPosition.x + deltaX;
      let newY = elementStartPosition.y + deltaY;

      // Apply axis constraints
      if (options.axis === 'x') {
        newY = elementStartPosition.y;
      } else if (options.axis === 'y') {
        newX = elementStartPosition.x;
      }

      // Apply bounds constraints
      if (options.bounds) {
        const bounds = getBounds(options.bounds, element);
        if (bounds) {
          newX = Math.max(bounds.left, Math.min(newX, bounds.right));
          newY = Math.max(bounds.top, Math.min(newY, bounds.bottom));
        }
      }

      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;

      options.onDrag?.(e, { x: newX, y: newY });
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;

      isDragging = false;
      setAppBeingDragged(false);

      const rect = element.getBoundingClientRect();
      options.onDragEnd?.(e, { x: rect.left, y: rect.top });

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // Add event listener
    element.addEventListener('mousedown', handleMouseDown);

    // Cleanup function
    const cleanup = () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const instance: DragInstance = {
      element,
      destroy: cleanup,
    };

    activeInstanceRef.current = instance;
    return instance;
  }, [options, setAppBeingDragged]);

  return [createDragInstance];
};

function getBounds(
  bounds: DragOptions['bounds'],
  element: HTMLElement
): { top: number; left: number; right: number; bottom: number } | null {
  if (!bounds) return null;

  if (bounds === 'parent') {
    const parent = element.parentElement;
    if (!parent) return null;
    
    const parentRect = parent.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    return {
      top: 0,
      left: 0,
      right: parentRect.width - elementRect.width,
      bottom: parentRect.height - elementRect.height,
    };
  }

  if (bounds instanceof HTMLElement) {
    const boundsRect = bounds.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    return {
      top: boundsRect.top,
      left: boundsRect.left,
      right: boundsRect.right - elementRect.width,
      bottom: boundsRect.bottom - elementRect.height,
    };
  }

  // Bounds is an object with constraints
  return {
    top: bounds.top ?? -Infinity,
    left: bounds.left ?? -Infinity,
    right: bounds.right ?? Infinity,
    bottom: bounds.bottom ?? Infinity,
  };
}