import { useCallback, useRef } from 'react';
import { useAppStore } from '🍎/stores/useAppStore';

export interface ResizeOptions {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onResizeStart?: () => void;
  onResize?: (size: { width: number; height: number }) => void;
  onResizeEnd?: (size: { width: number; height: number }) => void;
  disabled?: boolean;
}

export interface ResizeInstance {
  element: HTMLElement | null;
  destroy: () => void;
}

export const useWindowResize = (
  appId: string,
  options: ResizeOptions = {}
): [(element: HTMLElement) => ResizeInstance] => {
  const { updateApp } = useAppStore((state) => ({
    updateApp: state.updateApp,
  }));

  const activeInstanceRef = useRef<ResizeInstance | null>(null);

  const createResizeInstance = useCallback((element: HTMLElement): ResizeInstance => {
    if (options.disabled) {
      return { element, destroy: () => {} };
    }

    let isResizing = false;
    let resizeDirection = '';
    let startMousePos = { x: 0, y: 0 };
    let startElementRect = { width: 0, height: 0, left: 0, top: 0 };

    const RESIZE_MARGIN = 10; // pixels from edge to activate resize

    const getResizeDirection = (e: MouseEvent, rect: DOMRect): string => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      let direction = '';
      
      if (y <= RESIZE_MARGIN) direction += 'n';
      if (y >= rect.height - RESIZE_MARGIN) direction += 's';
      if (x <= RESIZE_MARGIN) direction += 'w';
      if (x >= rect.width - RESIZE_MARGIN) direction += 'e';
      
      return direction;
    };

    const getCursor = (direction: string): string => {
      const cursors: Record<string, string> = {
        'n': 'ns-resize',
        's': 'ns-resize', 
        'e': 'ew-resize',
        'w': 'ew-resize',
        'ne': 'nesw-resize',
        'nw': 'nwse-resize',
        'se': 'nwse-resize',
        'sw': 'nesw-resize',
      };
      return cursors[direction] || 'default';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) return;
      
      const rect = element.getBoundingClientRect();
      const direction = getResizeDirection(e, rect);
      element.style.cursor = getCursor(direction);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const direction = getResizeDirection(e, rect);
      
      if (!direction) return;

      e.preventDefault();
      e.stopPropagation();

      isResizing = true;
      resizeDirection = direction;
      startMousePos = { x: e.clientX, y: e.clientY };
      startElementRect = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };

      updateApp(appId, { isResizing: true });
      options.onResizeStart?.();

      document.addEventListener('mousemove', handleDocumentMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      document.body.style.cursor = getCursor(direction);
      document.body.style.userSelect = 'none';
    };

    const handleDocumentMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startMousePos.x;
      const deltaY = e.clientY - startMousePos.y;

      let newWidth = startElementRect.width;
      let newHeight = startElementRect.height;
      let newLeft = startElementRect.left;
      let newTop = startElementRect.top;

      // Handle horizontal resize
      if (resizeDirection.includes('e')) {
        newWidth = startElementRect.width + deltaX;
      } else if (resizeDirection.includes('w')) {
        newWidth = startElementRect.width - deltaX;
        newLeft = startElementRect.left + deltaX;
      }

      // Handle vertical resize
      if (resizeDirection.includes('s')) {
        newHeight = startElementRect.height + deltaY;
      } else if (resizeDirection.includes('n')) {
        newHeight = startElementRect.height - deltaY;
        newTop = startElementRect.top + deltaY;
      }

      // Apply constraints
      const minWidth = options.minWidth ?? 200;
      const minHeight = options.minHeight ?? 100;
      const maxWidth = options.maxWidth ?? window.innerWidth;
      const maxHeight = options.maxHeight ?? window.innerHeight;

      newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

      // Apply new dimensions
      element.style.width = `${newWidth}px`;
      element.style.height = `${newHeight}px`;
      
      if (resizeDirection.includes('w')) {
        element.style.left = `${newLeft}px`;
      }
      if (resizeDirection.includes('n')) {
        element.style.top = `${newTop}px`;
      }

      // Update app store
      updateApp(appId, {
        width: newWidth,
        height: newHeight,
        left: resizeDirection.includes('w') ? newLeft : undefined,
        top: resizeDirection.includes('n') ? newTop : undefined,
      });

      options.onResize?.({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      if (!isResizing) return;

      isResizing = false;
      resizeDirection = '';

      updateApp(appId, { isResizing: false });
      
      const rect = element.getBoundingClientRect();
      options.onResizeEnd?.({ width: rect.width, height: rect.height });

      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      element.style.cursor = '';
    };

    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mousedown', handleMouseDown);

    // Cleanup function
    const cleanup = () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleDocumentMouseMove);  
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (document.body.style.cursor) {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    const instance: ResizeInstance = {
      element,
      destroy: cleanup,
    };

    activeInstanceRef.current = instance;
    return instance;
  }, [appId, options, updateApp]);

  return [createResizeInstance];
};