import React, { useState, useEffect, useRef } from 'react';
import { useAppsStore } from '@/stores/useAppsStore';
import { useAppStore } from '@/stores/useAppStore';
import { useAuth0 } from '../../contexts/Auth0Context';
import { getMenuConfigForApp, MenuItem } from '@/configs/menu/topbar.menu.config';

const TopBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  
  const { activeApp } = useAppsStore((state) => ({
    activeApp: state.activeApp,
  }));
  const appConfig = useAppStore((state) => state.getApp(activeApp || 'finder'));
  const { user, logout } = useAuth0();
  
  // Get menu configuration for current app
  const menuConfig = getMenuConfigForApp(activeApp);
  const menuNames = Object.keys(menuConfig);
  const currentAppName = appConfig?.title || 'Finder';

  // Log when active app changes to show dynamic menu behavior
  useEffect(() => {
    console.log(`🚀 Active app changed to: ${activeApp} (${currentAppName})`);
    console.log(`📋 Available menus:`, menuNames);
  }, [activeApp, currentAppName, menuNames]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
      if (showUserMenu) {
        setShowUserMenu(false);
      }
    };

    if (activeMenu || showUserMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeMenu, showUserMenu]);

  // Handle menu clicks
  const handleMenuClick = (menuName: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.left, y: rect.bottom });
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  // Handle menu item clicks
  const handleMenuItemClick = (item: MenuItem) => {
    setActiveMenu(null);
    
    if (item.action) {
      console.log('Menu action:', item.action);
      // Here you can implement actual menu actions
      // For now, just log the action
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '24px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        fontSize: '13px',
        fontWeight: '500',
        zIndex: 1000,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Left side - Apple logo and app name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} ref={menuRef}>
        <div style={{ fontSize: '14px' }}>🚀</div>
        <span style={{ 
          fontWeight: '600',
          color: '#1d1d1f',
          borderRight: '1px solid rgba(0, 0, 0, 0.2)',
          paddingRight: '16px',
          marginRight: '0px',
        }}>
          {currentAppName}
        </span>
        
        {/* Dynamic menu items */}
        {menuNames.map((menuName) => (
          <span
            key={menuName}
            style={{
              cursor: 'pointer',
              padding: '2px 8px',
              borderRadius: '4px',
              background: activeMenu === menuName ? 'rgba(0, 122, 255, 0.15)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
            onClick={(e) => handleMenuClick(String(menuName), e)}
            onMouseEnter={(e) => {
              if (activeMenu && activeMenu !== menuName) {
                handleMenuClick(String(menuName), e);
              }
            }}
          >
            {menuName}
          </span>
        ))}
      </div>

      {/* Right side - System controls and time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
        <div style={{ fontSize: '12px' }}>🔍</div>
        <div style={{ fontSize: '12px' }}>🎛️</div>
        <div style={{ fontSize: '12px' }}>🔋</div>
        <div style={{ fontSize: '12px' }}>📶</div>
        <div style={{ fontSize: '12px' }}>🔊</div>
        
        {/* User Avatar */}
        <div 
          style={{ 
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#007aff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'white',
            cursor: 'pointer',
            marginLeft: '4px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowUserMenu(!showUserMenu);
          }}
          title={user?.name || 'User'}
        >
          {user?.name?.[0]?.toUpperCase() || '👤'}
        </div>

        {/* User Menu */}
        {showUserMenu && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '8px 0',
            minWidth: '200px',
            zIndex: 10000,
          }}>
            <div style={{
              padding: '8px 16px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              fontSize: '12px',
              color: '#666',
            }}>
              Signed in as<br />
              <strong>{user?.name || user?.email}</strong>
            </div>
            <button
              onClick={() => {
                setShowUserMenu(false);
                logout();
              }}
              style={{
                width: '100%',
                padding: '8px 16px',
                border: 'none',
                background: 'transparent',
                textAlign: 'left',
                fontSize: '13px',
                cursor: 'pointer',
                color: '#333',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 122, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Sign Out
            </button>
          </div>
        )}
        
        <span style={{ 
          marginLeft: '8px',
          fontSize: '12px',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {formatTime(currentTime)}
        </span>
      </div>

      {/* Dropdown Menu */}
      {activeMenu && (
        <div
          style={{
            position: 'fixed',
            left: `${menuPosition.x}px`,
            top: `${menuPosition.y}px`,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '4px 0',
            minWidth: '220px',
            zIndex: 10001,
            animation: 'menuSlideDown 0.2s ease-out',
          }}
        >
          {menuConfig[activeMenu]?.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  padding: '6px 16px',
                  cursor: item.disabled ? 'default' : 'pointer',
                  fontSize: '13px',
                  color: item.disabled ? '#999' : '#333',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background-color 0.15s ease',
                }}
                onClick={() => !item.disabled && handleMenuItemClick(item)}
                onMouseEnter={(e) => {
                  if (!item.disabled) {
                    e.currentTarget.style.background = 'rgba(0, 122, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{item.title}</span>
                {item.shortcut && (
                  <span style={{ 
                    fontSize: '11px', 
                    color: '#666',
                    fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                  }}>
                    {item.shortcut}
                  </span>
                )}
              </div>
              {item.breakAfter && (
                <div style={{
                  height: '1px',
                  background: 'rgba(0, 0, 0, 0.1)',
                  margin: '4px 16px',
                }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>

    <style>{`
      @keyframes menuSlideDown {
        from {
          opacity: 0;
          transform: translateY(-8px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `}</style>
    </>
  );
};

export default TopBar;