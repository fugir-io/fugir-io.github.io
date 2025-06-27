# Frontend App Development Guide

> **Building Apps for Backend Web APIs in the macOS Desktop Simulator**

This guide helps developers create frontend applications that connect to backend web APIs within the macOS desktop simulator environment.

## Table of Contents

1. [Quick Start](#quick-start)
2. [App Architecture](#app-architecture)
3. [WebService Integration](#webservice-integration)
4. [Creating Your First API App](#creating-your-first-api-app)
5. [Authentication Patterns](#authentication-patterns)
6. [State Management](#state-management)
7. [UI Components & Styling](#ui-components--styling)
8. [Advanced Features](#advanced-features)
9. [Deployment & Testing](#deployment--testing)

---

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Basic TypeScript/React knowledge
- Understanding of REST APIs

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd fugir-io.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:4040
```

---

## App Architecture

### Core Directory Structure

```
src/
├── components/
│   ├── apps/           # Individual application components
│   ├── Desktop/        # Window management
│   ├── Dock/          # App launcher
│   └── SystemUI/      # System-level UI components
├── configs/
│   ├── apps/          # App configurations
│   └── menu/          # Menu bar configurations
├── services/          # API and service integrations
├── stores/            # Global state management
├── helpers/           # Utility functions and hooks
└── assets/           # Static assets
```

### App Registration Flow

1. **Create App Component** → `src/components/apps/YourApp/`
2. **Configure App** → `src/configs/apps/apps-config.ts`
3. **Add Menu Items** → `src/configs/menu/topbar.menu.config.ts`
4. **Add Icons** → `public/app-icons/your-app/`

---

## WebService Integration

### Core WebService Architecture

The platform provides a powerful WebService system for connecting to backend APIs:

#### Key Components

- **`webservice-connector.ts`** - HTTP client with auth & streaming
- **`webservice.store.ts`** - Per-app connection management
- **`use-webservice.ts`** - React hook for easy integration
- **`WebServiceConfig.svelte`** - Visual configuration UI

#### Basic Usage Pattern

```typescript
import { useWebService } from '🍎/helpers/use-webservice';

const MyAPIApp: React.FC = () => {
  const webservice = useWebService('my-api-app');

  // Connect to your backend
  useEffect(() => {
    webservice.connect({
      baseURL: 'https://api.yourservice.com',
      auth: {
        type: 'bearer',
        token: 'your-auth-token'
      }
    });
  }, []);

  // Make API calls
  const fetchData = async () => {
    try {
      const response = await webservice.get('/data');
      console.log('API Response:', response);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};
```

### Supported Authentication Methods

#### 1. Bearer Token Authentication

```typescript
const authConfig = {
  type: "bearer" as const,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
};
```

#### 2. Basic Authentication

```typescript
const authConfig = {
  type: "basic" as const,
  username: "user@example.com",
  password: "your-password",
};
```

#### 3. API Key Authentication

```typescript
const authConfig = {
  type: "apikey" as const,
  key: "your-api-key",
  headerName: "X-API-Key", // Optional, defaults to 'Authorization'
};
```

### HTTP Methods Available

```typescript
// GET request
const users = await webservice.get("/users");

// POST request with data
const newUser = await webservice.post("/users", {
  name: "John Doe",
  email: "john@example.com",
});

// PUT request
const updatedUser = await webservice.put("/users/123", userData);

// DELETE request
await webservice.delete("/users/123");

// Custom request with full options
const response = await webservice.request({
  method: "PATCH",
  url: "/users/123",
  data: { status: "active" },
  headers: { "Content-Type": "application/json" },
});
```

---

## Creating Your First API App

### Step 1: Create the App Component

Create `src/components/apps/MyAPIApp/MyAPIApp.tsx`:

```typescript
import React, { useState, useEffect } from 'react';
import { useWebService } from '🍎/helpers/use-webservice';

interface User {
  id: number;
  name: string;
  email: string;
}

const MyAPIApp: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize WebService connection
  const webservice = useWebService('my-api-app');

  useEffect(() => {
    // Connect to your backend API
    const initializeConnection = async () => {
      try {
        await webservice.connect({
          baseURL: 'https://jsonplaceholder.typicode.com',
          // Add authentication if needed
          // auth: { type: 'bearer', token: 'your-token' }
        });
        console.log('✅ Connected to API');
      } catch (err) {
        console.error('❌ Connection failed:', err);
        setError('Failed to connect to API');
      }
    };

    initializeConnection();
  }, [webservice]);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await webservice.get('/users');
      setUsers(response.data || response); // Handle different response formats
      console.log('✅ Users fetched:', response);
    } catch (err: any) {
      console.error('❌ Fetch failed:', err);
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Create new user
  const createUser = async () => {
    try {
      const newUser = await webservice.post('/users', {
        name: 'New User',
        email: 'new@example.com'
      });

      setUsers(prev => [...prev, newUser.data || newUser]);
      console.log('✅ User created:', newUser);
    } catch (err) {
      console.error('❌ Create failed:', err);
      setError('Failed to create user');
    }
  };

  return (
    <div style={{
      padding: '20px',
      height: '100%',
      overflow: 'auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid #e5e5e7',
        paddingBottom: '16px',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
          My API App
        </h1>
        <p style={{ margin: '8px 0 0', color: '#6e6e73' }}>
          Connected to backend API service
        </p>
      </div>

      {/* Actions */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
        <button
          onClick={fetchUsers}
          disabled={loading}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: '#007aff',
            color: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Loading...' : 'Fetch Users'}
        </button>

        <button
          onClick={createUser}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #007aff',
            background: 'white',
            color: '#007aff',
            cursor: 'pointer'
          }}
        >
          Create User
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#ff3b30',
          color: 'white',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          ❌ {error}
        </div>
      )}

      {/* Users List */}
      <div style={{
        border: '1px solid #e5e5e7',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {users.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6e6e73' }}>
            No users loaded. Click "Fetch Users" to load data.
          </div>
        ) : (
          users.map((user, index) => (
            <div
              key={user.id || index}
              style={{
                padding: '16px',
                borderBottom: index < users.length - 1 ? '1px solid #e5e5e7' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                  {user.name}
                </div>
                <div style={{ color: '#6e6e73', fontSize: '14px' }}>
                  {user.email}
                </div>
              </div>
              <div style={{
                background: '#34c759',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                ID: {user.id}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAPIApp;
```

### Step 2: Register the App

Add to `src/configs/apps/apps-config.ts`:

```typescript
import MyAPIApp from "🍎/components/apps/MyAPIApp/MyAPIApp";

export const appsConfig = {
  // ... existing apps
  "my-api-app": createAppConfig({
    title: "My API App",
    resizable: true,
    expandable: true,
    width: 800,
    height: 600,
    shouldOpenWindow: true,
    dockBreaksBefore: false,
    component: MyAPIApp,
  }),
};
```

### Step 3: Add to App Store Types

Update `src/stores/useAppsStore.ts`:

```typescript
export type AppID =
  | "wallpapers"
  | "finder"
  | "vscode"
  | "calculator"
  | "safari"
  | "appstore"
  | "calendar"
  | "developer"
  | "terminal"
  | "my-api-app"; // Add your app ID
```

### Step 4: Add Menu Configuration

Add to `src/configs/menu/topbar.menu.config.ts`:

```typescript
export const topbarMenuConfig = {
  // ... existing configs
  "my-api-app": {
    File: [
      {
        title: "Refresh Data",
        shortcut: "⌘R",
        action: { action: "refresh-data" },
      },
      {
        title: "Export Data",
        shortcut: "⌘E",
        action: { action: "export-data" },
        breakAfter: true,
      },
      {
        title: "Close",
        shortcut: "⌘W",
        action: { action: "close-window" },
      },
    ],
    Edit: [
      {
        title: "Add New Item",
        shortcut: "⌘N",
        action: { action: "add-item" },
      },
      {
        title: "Delete Selected",
        shortcut: "⌫",
        action: { action: "delete-selected" },
      },
    ],
    View: [
      {
        title: "List View",
        action: { action: "view-list" },
      },
      {
        title: "Grid View",
        action: { action: "view-grid" },
      },
    ],
    Help: [
      {
        title: "API Documentation",
        action: { action: "show-api-docs" },
      },
      {
        title: "About My API App",
        action: { action: "about-app" },
      },
    ],
  },
};
```

### Step 5: Add App Icon

1. Create directory: `public/app-icons/my-api-app/`
2. Add icon files: `256.png`, `128.png`, `64.png`
3. Update icon mapping in `src/components/Dock/Dock.tsx`:

```typescript
const iconMap: Record<AppID, string> = {
  // ... existing icons
  "my-api-app": "/app-icons/my-api-app/256.png",
};
```

---

## Authentication Patterns

### JWT Token Management

```typescript
const APIApp: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const webservice = useWebService('api-app');

  // Login and get token
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await webservice.post('/auth/login', credentials);
      const { token } = response.data;

      setToken(token);
      localStorage.setItem('api-token', token);

      // Update webservice with new token
      await webservice.connect({
        baseURL: 'https://api.example.com',
        auth: { type: 'bearer', token }
      });

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Auto-login on app start
  useEffect(() => {
    const savedToken = localStorage.getItem('api-token');
    if (savedToken) {
      setToken(savedToken);
      webservice.connect({
        baseURL: 'https://api.example.com',
        auth: { type: 'bearer', token: savedToken }
      });
    }
  }, []);

  return (
    <div>
      {token ? <AuthenticatedView /> : <LoginView onLogin={login} />}
    </div>
  );
};
```

### OAuth Integration

```typescript
const OAuthApp: React.FC = () => {
  const webservice = useWebService('oauth-app');

  const handleOAuthLogin = async () => {
    // Redirect to OAuth provider
    const clientId = 'your-client-id';
    const redirectUri = encodeURIComponent(window.location.origin + '/oauth/callback');
    const oauthUrl = `https://oauth-provider.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = oauthUrl;
  };

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await webservice.post('/oauth/token', {
        code,
        grant_type: 'authorization_code'
      });

      const { access_token } = response.data;

      // Update connection with OAuth token
      await webservice.connect({
        baseURL: 'https://api.example.com',
        auth: { type: 'bearer', token: access_token }
      });

    } catch (error) {
      console.error('OAuth exchange failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleOAuthLogin}>Login with OAuth</button>
    </div>
  );
};
```

---

## State Management

### Local Component State

For simple apps, use React's built-in state:

```typescript
const SimpleAPIApp: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Component logic here
};
```

### Zustand Store Integration

For complex apps, integrate with the existing Zustand stores:

```typescript
// Create app-specific store
import { create } from 'zustand';

interface MyAPIAppStore {
  users: User[];
  loading: boolean;
  error: string | null;
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMyAPIAppStore = create<MyAPIAppStore>((set) => ({
  users: [],
  loading: false,
  error: null,
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

// Use in component
const MyAPIApp: React.FC = () => {
  const { users, loading, error, setUsers, setLoading, setError } = useMyAPIAppStore();
  const webservice = useWebService('my-api-app');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await webservice.get('/users');
      setUsers(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* UI implementation */}
    </div>
  );
};
```

---

## UI Components & Styling

### macOS-Style Components

The platform follows macOS design patterns. Here are reusable component patterns:

#### Button Styles

```typescript
const MacOSButton: React.FC<{ children: React.ReactNode; onClick: () => void; variant?: 'primary' | 'secondary' }> = ({
  children,
  onClick,
  variant = 'primary'
}) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 16px',
      borderRadius: '8px',
      border: variant === 'primary' ? 'none' : '1px solid #007aff',
      background: variant === 'primary' ? '#007aff' : 'white',
      color: variant === 'primary' ? 'white' : '#007aff',
      cursor: 'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.opacity = '0.8';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.opacity = '1';
    }}
  >
    {children}
  </button>
);
```

#### Card Layout

```typescript
const MacOSCard: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e5e7',
    overflow: 'hidden',
    marginBottom: '16px',
  }}>
    {title && (
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e5e5e7',
        fontWeight: '600',
        fontSize: '16px',
      }}>
        {title}
      </div>
    )}
    <div style={{ padding: '16px' }}>
      {children}
    </div>
  </div>
);
```

#### Loading States

```typescript
const LoadingSpinner: React.FC = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '3px solid #e5e5e7',
      borderTop: '3px solid #007aff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
  </div>
);
```

### Responsive Layouts

```typescript
const ResponsiveGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
    padding: '16px',
  }}>
    {children}
  </div>
);
```

---

## Advanced Features

### Real-time Updates with WebSockets

```typescript
const RealtimeAPIApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const webservice = useWebService('realtime-app');

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('wss://api.example.com/ws');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = async (text: string) => {
    try {
      await webservice.post('/messages', { text });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      {/* Real-time message display */}
      <div style={{ height: '400px', overflow: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Message input */}
      <MessageInput onSend={sendMessage} />
    </div>
  );
};
```

### File Upload Handling

```typescript
const FileUploadApp: React.FC = () => {
  const webservice = useWebService('file-app');

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await webservice.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
        style={{
          padding: '8px',
          border: '2px dashed #007aff',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};
```

### Data Caching Strategy

```typescript
const CachedDataApp: React.FC = () => {
  const [cache, setCache] = useState<Map<string, any>>(new Map());
  const webservice = useWebService('cached-app');

  const fetchWithCache = async (endpoint: string, cacheTime = 5 * 60 * 1000) => {
    const cached = cache.get(endpoint);

    if (cached && Date.now() - cached.timestamp < cacheTime) {
      return cached.data;
    }

    try {
      const response = await webservice.get(endpoint);
      const data = response.data;

      setCache(prev => new Map(prev.set(endpoint, {
        data,
        timestamp: Date.now()
      })));

      return data;
    } catch (error) {
      console.error('Fetch failed:', error);
      throw error;
    }
  };

  return (
    <div>
      {/* Use cached data */}
    </div>
  );
};
```

---

## Deployment & Testing

### Environment Configuration

Create environment-specific configurations:

```typescript
// src/config/environment.ts
const config = {
  development: {
    apiBaseURL: "http://localhost:3000/api",
    wsURL: "ws://localhost:3000/ws",
  },
  production: {
    apiBaseURL: "https://api.yourservice.com",
    wsURL: "wss://api.yourservice.com/ws",
  },
};

export const getConfig = () => {
  const env = process.env.NODE_ENV || "development";
  return config[env as keyof typeof config];
};
```

### Testing API Apps

```typescript
// tests/api-app.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MyAPIApp from '🍎/components/apps/MyAPIApp/MyAPIApp';

// Mock webservice
jest.mock('🍎/helpers/use-webservice', () => ({
  useWebService: () => ({
    connect: jest.fn(),
    get: jest.fn().mockResolvedValue({ data: [{ id: 1, name: 'Test User' }] }),
    post: jest.fn(),
  }),
}));

describe('MyAPIApp', () => {
  test('fetches and displays users', async () => {
    render(<MyAPIApp />);

    fireEvent.click(screen.getByText('Fetch Users'));

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });
});
```

### Performance Optimization

```typescript
const OptimizedAPIApp: React.FC = () => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return rawData.map(item => ({
      ...item,
      computed: expensiveComputation(item)
    }));
  }, [rawData]);

  // Debounce API calls
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      const results = await webservice.get(`/search?q=${query}`);
      setSearchResults(results.data);
    }, 300),
    [webservice]
  );

  return (
    <div>
      {/* Optimized UI */}
    </div>
  );
};
```

---

## Best Practices

### 1. Error Handling

- Always wrap API calls in try-catch blocks
- Provide user-friendly error messages
- Implement retry mechanisms for failed requests
- Log errors for debugging

### 2. Loading States

- Show loading indicators for API operations
- Disable buttons during operations to prevent duplicate requests
- Provide progress feedback for long operations

### 3. Security

- Never store sensitive data in localStorage
- Validate API responses before using
- Implement proper CORS handling
- Use HTTPS in production

### 4. Performance

- Implement data caching where appropriate
- Use pagination for large datasets
- Debounce search inputs
- Memoize expensive computations

### 5. User Experience

- Provide clear feedback for all user actions
- Implement optimistic updates where possible
- Handle offline scenarios gracefully
- Follow macOS design patterns

---

## Example Apps

### 1. REST API Client

- Full CRUD operations
- Authentication flow
- Error handling
- Data caching

### 2. Real-time Dashboard

- WebSocket connections
- Live data updates
- Chart visualization
- Alert notifications

### 3. File Manager

- File upload/download
- Progress tracking
- Thumbnail generation
- Batch operations

---

## Troubleshooting

### Common Issues

#### CORS Errors

```typescript
// Add to your backend
app.use(
  cors({
    origin: ["http://localhost:4040", "https://your-domain.com"],
    credentials: true,
  }),
);
```

#### Authentication Token Expiry

```typescript
// Implement token refresh
const refreshToken = async () => {
  try {
    const response = await webservice.post("/auth/refresh");
    const { token } = response.data;

    localStorage.setItem("api-token", token);

    // Update webservice connection
    await webservice.connect({
      baseURL: config.apiBaseURL,
      auth: { type: "bearer", token },
    });
  } catch (error) {
    // Redirect to login
    localStorage.removeItem("api-token");
    window.location.href = "/login";
  }
};
```

#### Memory Leaks

```typescript
// Always cleanup subscriptions
useEffect(() => {
  const subscription = setupSubscription();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

---

## Getting Help

- **Documentation**: Check this guide and inline code comments
- **Console Logs**: Use browser dev tools to debug API calls
- **Network Tab**: Monitor actual HTTP requests/responses
- **Error Boundaries**: Implement to catch and display React errors

---

## Contributing

When contributing new API apps:

1. Follow the established patterns in this guide
2. Add comprehensive documentation
3. Include error handling
4. Write tests for critical functionality
5. Update this guide with new patterns

---

_Happy coding! 🚀_
