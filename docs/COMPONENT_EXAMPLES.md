# Component Examples

> **Code examples for common macOS desktop simulator components**

## LoadingScreen Component

The LoadingScreen component provides a beautiful macOS-style loading interface with animations and the Apple logo (🍎).

### Component Code

```typescript
// src/components/Auth/LoadingScreen.tsx
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
        {/* Apple Logo 🍎 */}
        <div style={{
          fontSize: '120px',
          margin: '0 0 40px 0',
          animation: 'float 3s ease-in-out infinite',
          filter: 'drop-shadow(0 10px 30px rgba(255,255,255,0.3))',
        }}>
          🍎
        </div>

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

      {/* CSS Animations */}
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
```

### Key Features

1. **Apple Logo 🍎**: Large animated Apple emoji with floating animation
2. **Gradient Background**: macOS-style blue gradient background
3. **Loading Spinner**: Circular spinner with smooth rotation
4. **Progress Dots**: Three animated dots showing loading progress
5. **Typography**: macOS system fonts with proper styling
6. **Animations**: Multiple CSS animations for smooth, professional feel

### Usage in App

The LoadingScreen is used in the authentication flow:

```typescript
// src/App.tsx
const AuthenticatedApp: React.FC = () => {
  const { isLoading, isAuthenticated, error, user } = useAuth0();

  if (isLoading) {
    return <LoadingScreen />; // Show loading screen during auth
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <DesktopPage />;
};
```

### Customization Options

You can customize the LoadingScreen for your API apps:

```typescript
interface LoadingScreenProps {
  title?: string;
  subtitle?: string;
  logo?: string;
  color?: string;
}

const CustomLoadingScreen: React.FC<LoadingScreenProps> = ({
  title = "Loading macOS",
  subtitle = "Preparing your desktop environment...",
  logo = "🍎",
  color = "#007aff"
}) => {
  return (
    <div style={{
      // ... base styles
    }}>
      <div style={{ fontSize: '120px' }}>
        {logo}
      </div>
      
      <h2>{title}</h2>
      <p>{subtitle}</p>
      
      {/* Custom spinner with your app color */}
      <div style={{
        borderTop: `4px solid ${color}`,
        // ... other spinner styles
      }} />
    </div>
  );
};
```

### Integration with API Apps

For apps that connect to APIs, you can show loading states:

```typescript
const APILoadingScreen: React.FC<{ message?: string }> = ({ 
  message = "Connecting to API..." 
}) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '40px',
  }}>
    <div style={{ fontSize: '60px', marginBottom: '20px' }}>
      🔄
    </div>
    
    <div style={{
      width: '32px',
      height: '32px',
      border: '3px solid #e5e5e7',
      borderTop: '3px solid #007aff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '16px',
    }} />
    
    <p style={{
      color: '#6e6e73',
      fontSize: '14px',
      textAlign: 'center',
      margin: 0,
    }}>
      {message}
    </p>
  </div>
);

// Usage in your API app
const MyAPIApp: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(true);
  const webservice = useWebService('my-app');

  useEffect(() => {
    const connect = async () => {
      try {
        await webservice.connect({
          baseURL: 'https://api.example.com',
          auth: { type: 'bearer', token: 'token' }
        });
      } finally {
        setIsConnecting(false);
      }
    };
    
    connect();
  }, []);

  if (isConnecting) {
    return <APILoadingScreen message="Establishing secure connection..." />;
  }

  return <div>Your app content here</div>;
};
```

## Related Documentation

- [API App Quick Start Guide](./API_APP_QUICKSTART.md)
- [Frontend App Development Guide](./FRONTEND_APP_DEVELOPMENT.md)
- [Main Project Documentation](../CLAUDE.md)

---

*The LoadingScreen component demonstrates the macOS design principles used throughout the platform.* ✨