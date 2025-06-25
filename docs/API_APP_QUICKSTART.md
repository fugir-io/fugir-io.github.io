# API App Quick Start Guide

> **Fast track to building frontend apps for backend APIs**

## 5-Minute Setup

### 1. Create App Component
Create `src/components/apps/YourApp/YourApp.tsx`:

```typescript
import React, { useState, useEffect } from 'react';
import { useWebService } from '🍎/helpers/use-webservice';

const YourApp: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const webservice = useWebService('your-app-id');

  useEffect(() => {
    // Connect to your API
    webservice.connect({
      baseURL: 'https://your-api.com',
      auth: { type: 'bearer', token: 'your-token' } // Optional
    });
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await webservice.get('/endpoint');
      setData(response.data);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: '-apple-system' }}>
      <h1>Your App</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      
      <div style={{ marginTop: '20px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ 
            padding: '10px', 
            border: '1px solid #ccc', 
            margin: '5px 0' 
          }}>
            {JSON.stringify(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourApp;
```

### 2. Register App
Add to `src/configs/apps/apps-config.ts`:

```typescript
import YourApp from '🍎/components/apps/YourApp/YourApp';

export const appsConfig = {
  // ... existing apps
  'your-app-id': createAppConfig({
    title: 'Your App',
    resizable: true,
    expandable: true,
    width: 800,
    height: 600,
    component: YourApp,
  }),
};
```

### 3. Add App ID Type
Update `src/stores/useAppsStore.ts`:

```typescript
export type AppID = 
  | 'wallpapers' | 'finder' | 'vscode' | 'calculator' 
  | 'safari' | 'appstore' | 'calendar' | 'developer' 
  | 'terminal' | 'your-app-id'; // Add here
```

### 4. Add Icon
1. Create `public/app-icons/your-app-id/256.png`
2. Update `src/components/Dock/Dock.tsx`:

```typescript
const iconMap: Record<AppID, string> = {
  // ... existing icons
  'your-app-id': '/app-icons/your-app-id/256.png',
};
```

## API Patterns

### Authentication
```typescript
// Bearer Token
auth: { type: 'bearer', token: 'your-jwt-token' }

// Basic Auth
auth: { type: 'basic', username: 'user', password: 'pass' }

// API Key
auth: { type: 'apikey', key: 'your-key', headerName: 'X-API-Key' }
```

### HTTP Methods
```typescript
// GET
const users = await webservice.get('/users');

// POST
const newUser = await webservice.post('/users', { name: 'John' });

// PUT
const updated = await webservice.put('/users/1', { name: 'Jane' });

// DELETE
await webservice.delete('/users/1');
```

### Error Handling
```typescript
try {
  const response = await webservice.get('/data');
  setData(response.data);
} catch (error) {
  console.error('Failed:', error);
  setError(error.message);
}
```

## Styling

### macOS Button
```typescript
<button style={{
  padding: '8px 16px',
  borderRadius: '8px',
  border: 'none',
  background: '#007aff',
  color: 'white',
  cursor: 'pointer',
  fontFamily: '-apple-system',
}}>
  Click Me
</button>
```

### Card Layout
```typescript
<div style={{
  background: 'white',
  borderRadius: '12px',
  border: '1px solid #e5e5e7',
  padding: '16px',
  marginBottom: '16px',
}}>
  Your content here
</div>
```

## Testing

Start dev server and test your app:
```bash
npm run dev
# Open http://localhost:4040
# Click your app in the dock
```

## Next Steps

For advanced features, see the [Full Development Guide](./FRONTEND_APP_DEVELOPMENT.md):
- Real-time WebSocket connections
- File upload/download
- Advanced authentication
- State management
- Performance optimization

---

**That's it! Your API app is ready to use.** 🎉