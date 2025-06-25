import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Animation */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
                         radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        animation: 'breathe 4s ease-in-out infinite',
      }} />
      
      {/* Loading Content */}
      <div style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Apple Logo */}
        {/* <div style={{
          fontSize: '120px',
          margin: '0 0 40px 0',
          animation: 'float 3s ease-in-out infinite',
          filter: 'drop-shadow(0 10px 30px rgba(255,255,255,0.3))',
        }}>
          🍎
        </div> */}

        {/* Loading Spinner */}
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(255,255,255,0.2)',
          borderTop: '4px solid rgba(255,255,255,0.8)',
          borderRadius: '50%',
          margin: '0 auto 30px',
          animation: 'spin 1.5s linear infinite',
        }} />

        {/* Loading Text */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: '300',
          color: 'rgba(255,255,255,0.9)',
          margin: '0 0 10px 0',
          letterSpacing: '1px',
        }}>
          Loading macOS
        </h2>

        <p style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.6)',
          margin: '0',
          fontWeight: '300',
        }}>
          Preparing your desktop environment...
        </p>

        {/* Progress Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '40px',
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.4)',
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-10px);
          }
        }
        
        @keyframes breathe {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;