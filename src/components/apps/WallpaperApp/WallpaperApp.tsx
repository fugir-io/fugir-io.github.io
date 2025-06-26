import React, { useState } from 'react';
import { useWallpaperStore, Wallpaper } from '@/stores/useWallpaperStore';

const WallpaperApp: React.FC = () => {
  const {
    currentWallpaper,
    availableWallpapers,
    isDynamic,
    setWallpaper,
    setDynamic,
  } = useWallpaperStore();

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'macos' | 'nature' | 'artistic'>('all');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filteredWallpapers = availableWallpapers.filter(wallpaper => 
    selectedCategory === 'all' || wallpaper.category === selectedCategory
  );

  const handleWallpaperSelect = (wallpaper: Wallpaper) => {
    setWallpaper(wallpaper.id);
  };

  const handleImageError = (wallpaperId: string) => {
    setImageErrors(prev => new Set(prev).add(wallpaperId));
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px 16px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
      }}>
        <h2 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '24px',
          fontWeight: '600',
          color: '#1d1d1f',
        }}>
          Desktop & Screen Saver
        </h2>
        
        {/* Dynamic wallpaper toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#424245',
            cursor: 'pointer',
          }}>
            <input
              type="checkbox"
              checked={isDynamic}
              onChange={(e) => setDynamic(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#007aff',
              }}
            />
            Dynamic Desktop
          </label>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['all', 'macos', 'nature', 'artistic'] as const).map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                backgroundColor: selectedCategory === category ? '#007aff' : '#f1f3f4',
                color: selectedCategory === category ? '#ffffff' : '#424245',
                transition: 'all 0.2s ease',
              }}
            >
              {category === 'all' ? 'All' : 
               category === 'macos' ? 'macOS' :
               category === 'nature' ? 'Nature' : 'Artistic'}
            </button>
          ))}
        </div>
      </div>

      {/* Wallpaper Grid */}
      <div style={{
        flex: 1,
        padding: '24px',
        overflow: 'auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {filteredWallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              onClick={() => handleWallpaperSelect(wallpaper)}
              style={{
                position: 'relative',
                aspectRatio: '16/10',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: currentWallpaper === wallpaper.id ? '3px solid #007aff' : '1px solid #e0e0e0',
                transition: 'all 0.2s ease',
                backgroundColor: '#f1f3f4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                if (currentWallpaper !== wallpaper.id) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Wallpaper Preview */}
              {imageErrors.has(wallpaper.id) ? (
                // Fallback gradient if image fails to load
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: wallpaper.category === 'macos' 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : wallpaper.category === 'nature'
                    ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '600',
                  textAlign: 'center',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}>
                  {wallpaper.name}
                </div>
              ) : (
                <>
                  <img
                    src={`/${wallpaper.thumbnail}`}
                    alt={wallpaper.name}
                    style={{ display: 'none' }}
                    onError={() => handleImageError(wallpaper.id)}
                  />
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url('/${wallpaper.thumbnail}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    position: 'relative',
                  }}>
                    {/* Wallpaper name overlay */}
                    <div style={{
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '8px',
                      width: '100%',
                      textAlign: 'left',
                      textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                    }}>
                      {wallpaper.name}
                    </div>
                  </div>
                </>
              )}

              {/* Selection indicator */}
              {currentWallpaper === wallpaper.id && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#007aff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M20 6L9 17L4 12" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {/* Dynamic indicator */}
              {wallpaper.type === 'dynamic' && (
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  padding: '4px 6px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: '500',
                }}>
                  Dynamic
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa',
        fontSize: '12px',
        color: '#6e6e73',
        textAlign: 'center',
      }}>
        {isDynamic ? 'Dynamic wallpapers change throughout the day' : 'Static wallpaper selected'}
      </div>
    </div>
  );
};

export default WallpaperApp;