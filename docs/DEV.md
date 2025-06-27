# DEV

This file provides guidance to developers when working with code in this repository.

## Overview

This is a macOS desktop simulator built with React, TypeScript, and Vite. It recreates the macOS Monterey/Big Sur desktop experience in a web browser, complete with a dock, windows, applications, and system UI elements. The project uses Auth0 for authentication and includes a PWA manifest.

## Development Commands

```bash
# Development server (runs on port 4040)
npm run dev

# Production build
npm run build

# Preview production build
npm run serve

# Type checking
npm run check
npm run check:watch

# Linting and formatting
npm run lint
npm run format
npm run format-watch

# Clean build artifacts
npm run clean
```

## Architecture

### Core Structure

- **Main entry**: `src/main.tsx` → `src/App.tsx`
- **Routing**: React Router with Auth0 authentication guard
- **Alias**: `🍎` points to `src/` directory in Vite config

### Key Systems

**App Management**

- Apps are configured in `src/configs/apps/appsConfig.ts` using `createAppConfig()`
- App state managed through Zustand stores with centralized `AppConfig` types
- Window properties (position, size, visibility) stored per app

**Component Organization**

- `src/components/Desktop/`: Desktop, windows, context menus, boot screen
- `src/components/Dock/`: Dock and dock items
- `src/components/TopBar/`: Menu bar, action center, time display
- `src/components/apps/`: Individual application components (Safari, Calculator, etc.)

**State Management (Zustand Stores)**

- `useAppStore.ts`: Individual app configurations and properties
- `useAppsStore.ts`: Global app state management
- `useThemeStore.ts`: Theme and appearance settings
- `useWallpaperStore.ts`: Desktop wallpaper management
- `useSystemStore.ts`: System-wide settings

**Styling**

- Global styles in `src/css/global.scss`
- Uses Sass for preprocessing
- macOS-style design system with proper shadows, blur effects, and animations

### Assets Structure

- `public/app-icons/`: Application icons in multiple sizes
- `src/assets/wallpapers/`: Desktop wallpaper images
- `public/sounds/`: System sounds and audio feedback
- `public/cursors/`: Custom cursor SVGs

## App Development

To add a new app:

1. Create app configuration in `src/configs/apps/appsConfig.ts`
2. Add app component in `src/components/apps/`
3. Register in `appsConfig` export
4. Add appropriate icons to `public/app-icons/[app-name]/`

App configuration properties:

- `title`: Window title
- `resizable`: Whether window can be resized
- `expandable`: Whether window can be maximized
- `width/height`: Default window dimensions
- `shouldOpenWindow`: Whether clicking dock opens window
- `dockBreaksBefore`: Add visual separator in dock

## Authentication

Uses Auth0 SPA SDK with authentication guard on routes. Configuration in `src/config/auth0.config.ts` and context provider in `src/contexts/Auth0Context.tsx`.

## WebService Integration

Applications can connect to external web services using the WebService architecture:

**Core Components:**

- `src/services/webservice-connector.ts`: Main connector class with HTTP methods, authentication, and streaming support
- `src/stores/webservice.store.ts`: Zustand store for managing connections per application
- `src/helpers/use-webservice.ts`: React hook for easy webservice integration in components
- `src/components/SystemUI/WebServiceConfig.tsx`: Configuration UI component

**Usage in Applications:**

```typescript
import { useWebService } from "🍎/helpers/use-webservice";
const webservice = useWebService("app-id");

// Connect to service
await webservice.connect({
  baseURL: "https://api.example.com",
  auth: { type: "bearer", token: "your-token" },
});

// Make requests
const response = await webservice.get("/endpoint");
```

**Supported Features:**

- REST API, GraphQL, and microservice presets
- Bearer token, Basic auth, and API key authentication
- File uploads and streaming data
- Connection status management and retry logic
- Per-application configuration and connection isolation

## Frontend App Development

For comprehensive guides on building frontend applications that connect to backend APIs:

- **[API App Quick Start Guide](./docs/API_APP_QUICKSTART.md)** - 5-minute setup for new API apps
- **[Frontend App Development Guide](./docs/FRONTEND_APP_DEVELOPMENT.md)** - Complete development documentation

**Key Features for API Apps:**

- WebService integration with authentication
- Real-time WebSocket support
- File upload/download capabilities
- macOS-style UI components
- State management patterns
- Error handling and loading states
- Performance optimization techniques

## Window Management

**Resizing System:**

- Windows support edge-based resizing with 10px margins
- Global mouse event handling for smooth resize operations
- Minimum size constraints (200px width, 100px height)
- Resize state tracking per window with proper cleanup

**Window States:**

- `isResizing`: Currently being resized
- `isMaximized`: Full-screen mode
- `isDragging`: Being moved around desktop
- Position and size are persisted in app store

**Focus Management:**

- Automatic focus switching when new apps are opened
- Z-index stacking system for proper window layering
- Visual focus indicators in dock and windows
- Dynamic menu bar updates based on active application

## Menu System

**Dynamic Menu Bar:**

- App-specific menu configurations in `src/configs/menu/topbar.menu.config.ts`
- Animated dropdown menus with proper positioning
- Keyboard shortcuts display
- Menu actions with extensible action system

**Context Menus:**

- Desktop right-click context menus
- App-specific context menu options
- Configurable menu items with separators

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
