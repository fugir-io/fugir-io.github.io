import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '🍎/stores/useAppStore';
import { useAppsStore, AppID } from '🍎/stores/useAppsStore';
import { useSystemStore } from '🍎/stores/useSystemStore';
import { AppConfig } from '🍎/types/app.types';
import TrafficLights from './TrafficLights';
import AppNexus from '🍎/components/apps/AppNexus';

interface WindowProps {
  appID: AppID;
}

const Window: React.FC<WindowProps> = ({ appID }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [windowStart, setWindowStart] = useState({ x: 0, y: 0 });
  
  // Resizing state
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Store subscriptions
  const appConfig = useAppStore((state) => state.getApp(appID));
  const updateApp = useAppStore((state) => state.updateApp);
  const {
    openApps,
    activeApp,
    appZIndices,
    appsInFullscreen,
    setActiveApp,
  } = useAppsStore((state) => ({
    openApps: state.openApps,
    activeApp: state.activeApp,
    appZIndices: state.appZIndices,
    appsInFullscreen: state.appsInFullscreen,
    setActiveApp: state.setActiveApp,
  }));
  const prefersReducedMotion = useSystemStore((state) => state.prefersReducedMotion);

  // Local state
  const [isVisible, setIsVisible] = useState(false);

  // Initialize app config if not exists
  useEffect(() => {
    if (!appConfig) {
      // Create default config
      const defaultConfig: AppConfig = {
        title: appID,
        resizable: true,
        isResizing: false,
        expandable: false,
        isExpanding: false,
        draggingEnabled: true,
        isDragging: false,
        isMaximized: false,
        isVisible: true,
        top: Math.random() * 200 + 100,
        left: Math.random() * 400 + 100,
        width: 600,
        height: 500,
        shouldOpenWindow: true,
        dockBreaksBefore: false,
      };
      updateApp(appID, defaultConfig);
    }
  }, [appID, appConfig, updateApp]);

  // Set visibility based on open state
  useEffect(() => {
    setIsVisible(openApps[appID] && !!appConfig);
  }, [appID, appConfig, openApps]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!appConfig || !titleBarRef.current?.contains(e.target as Node)) return;
    
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setWindowStart({ x: Number(appConfig.left || 0), y: Number(appConfig.top || 0) });
    setActiveApp(appID);
    
    console.log('Started dragging window:', appID);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !appConfig) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const newX = windowStart.x + deltaX;
    const newY = Math.max(24, windowStart.y + deltaY); // Don't go above menu bar
    
    updateApp(appID, { left: newX, top: newY });
    console.log('Dragging to:', { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      console.log('Stopped dragging window:', appID);
    }
  };

  // Resize handlers
  const getResizeDirection = (e: React.MouseEvent): string => {
    if (!windowRef.current) return '';
    
    const rect = windowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const margin = 8;
    let direction = '';
    
    if (y <= margin) direction += 'n';
    if (y >= rect.height - margin) direction += 's';
    if (x <= margin) direction += 'w';
    if (x >= rect.width - margin) direction += 'e';
    
    return direction;
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!appConfig?.resizable) return;
    
    const direction = getResizeDirection(e);
    if (!direction) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: Number(appConfig.width || 600),
      height: Number(appConfig.height || 500),
    });
    
    console.log('Started resizing:', direction);
  };

  const handleResizeMouseMove = (e: MouseEvent) => {
    if (!isResizing || !appConfig) return;
    
    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;
    
    let newWidth = resizeStart.width;
    let newHeight = resizeStart.height;
    let newLeft = Number(appConfig.left || 0);
    let newTop = Number(appConfig.top || 0);
    
    if (resizeDirection.includes('e')) newWidth += deltaX;
    if (resizeDirection.includes('w')) { newWidth -= deltaX; newLeft = Number(newLeft) + deltaX; }
    if (resizeDirection.includes('s')) newHeight += deltaY;
    if (resizeDirection.includes('n')) { newHeight -= deltaY; newTop = Number(newTop) + deltaY; }
    
    // Apply constraints
    newWidth = Math.max(200, newWidth);
    newHeight = Math.max(100, newHeight);
    
    updateApp(appID, { 
      width: newWidth, 
      height: newHeight,
      left: newLeft,
      top: newTop,
    });
  };

  const handleResizeMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
      setResizeDirection('');
      console.log('Stopped resizing window:', appID);
    }
  };

  // Global mouse event handlers
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, windowStart, appConfig, appID, updateApp]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMouseMove);
      document.addEventListener('mouseup', handleResizeMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleResizeMouseMove);
        document.removeEventListener('mouseup', handleResizeMouseUp);
      };
    }
  }, [isResizing, resizeStart, resizeDirection, appConfig, appID, updateApp]);

  // Handle window focus
  const handleWindowClick = () => {
    setActiveApp(appID);
  };

  // Get cursor style for resizing
  const getResizeCursor = (direction: string): string => {
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

  // Handle cursor changes for resize
  const handleMouseMoveForCursor = (e: React.MouseEvent) => {
    if (!appConfig?.resizable || isDragging || isResizing) return;
    
    const direction = getResizeDirection(e);
    if (windowRef.current) {
      windowRef.current.style.cursor = direction ? getResizeCursor(direction) : 'default';
    }
  };

  if (!appConfig || !openApps[appID]) {
    return null;
  }

  const isActive = activeApp === appID;
  const isFullscreen = appsInFullscreen[appID];
  const zIndex = appZIndices[appID] || 0;

  const windowStyle: React.CSSProperties = {
    position: 'absolute',
    left: isFullscreen ? 0 : appConfig.left,
    top: isFullscreen ? 0 : appConfig.top,
    width: isFullscreen ? '100vw' : appConfig.width,
    height: isFullscreen ? '100vh' : appConfig.height,
    zIndex,
    borderRadius: isFullscreen ? 0 : '12px',
    overflow: 'hidden',
    boxShadow: isActive 
      ? '0 25px 50px rgba(0, 0, 0, 0.4)' 
      : '0 15px 35px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
  };

  const variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: prefersReducedMotion ? 'tween' : 'spring',
        stiffness: 300,
        damping: 30,
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      }
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={windowRef}
          style={windowStyle}
          onClick={handleWindowClick}
          onMouseDown={handleResizeMouseDown}
          onMouseMove={handleMouseMoveForCursor}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`window ${isActive ? 'window--active' : ''} ${isFullscreen ? 'window--fullscreen' : ''}`}
        >
          {/* Window Titlebar */}
          <div 
            ref={titleBarRef}
            className="window-titlebar" 
            onMouseDown={handleMouseDown}
            style={{
              height: '28px',
              background: isActive 
                ? 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)'
                : 'linear-gradient(180deg, rgba(200,200,200,0.8) 0%, rgba(200,200,200,0.6) 100%)',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
            }}>
            <TrafficLights appID={appID} />
            
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              color: isActive ? '#000' : '#666',
              textAlign: 'center',
              flex: 1,
              marginLeft: '60px', // Space for traffic lights
            }}>
              {appConfig.title}
            </div>
          </div>

          {/* Window Content */}
          <div className="window-content" style={{
            height: 'calc(100% - 28px)',
            overflow: 'hidden',
          }}>
            <AppNexus appID={appID} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;