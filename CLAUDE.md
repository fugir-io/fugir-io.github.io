# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands

- `npm run dev` - Start development server on port 4040
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once (for CI)
- `npm run lint` - Check code formatting and linting
- `npm run format` - Auto-fix formatting issues
- `npm run check` - TypeScript type checking without build

### Enhanced Development Workflows

- `npm run dev:watch` - Start dev server with tests and TypeScript in watch mode
- `npm run test:local` - Full test suite (lint + types + tests + build)
- `npm run test:ui` - Open Vitest UI for interactive testing
- `npm run test:coverage` - Generate test coverage report
- `npm run ci` - Run complete CI pipeline locally

### Testing Framework

- Uses **Vitest** with React Testing Library
- Test files: `**/*.test.{ts,tsx}`
- Setup file: `src/test/setup.ts`
- Coverage reports in HTML format

## Architecture Overview

This is a **macOS desktop simulator** built with React 18, TypeScript, and Vite. It recreates the macOS Monterey/Big Sur desktop experience in a web browser with authentic UI elements, window management, and applications.

### Core Structure

- **Entry point**: `src/main.tsx` → `src/App.tsx`
- **Authentication**: Auth0 with context provider wrapping the entire app
- **Routing**: React Router with protected routes
- **Path alias**: `@/*` maps to `src/*` (configured in both Vite and TypeScript)

### State Management (Zustand)

All state is managed through Zustand stores with persistence:

- **`useAppStore.ts`**: Individual app configurations and window properties
- **`useAppsStore.ts`**: Global app state and focus management
- **`useThemeStore.ts`**: Theme and appearance settings
- **`useWallpaperStore.ts`**: Desktop wallpaper management
- **`useSystemStore.ts`**: System-wide settings and preferences

### App System Architecture

Apps are configured declaratively in `src/configs/apps/appsConfig.ts`:

```typescript
const myApp = createAppConfig(
  {
    title: "App Name",
    resizable: true,
    height: 600,
    width: 800,
    shouldOpenWindow: true,
    dockBreaksBefore: false, // Visual separator in dock
  },
  "app-id",
);
```

**App Properties**:

- Window dimensions and resize behavior
- Dock appearance and positioning
- Focus and visibility state
- Position persistence across sessions

### Component Organization

- **`src/components/Desktop/`**: Desktop environment, windows, context menus
- **`src/components/Dock/`**: Dock and dock items with animations
- **`src/components/TopBar/`**: Menu bar, system controls, time display
- **`src/components/apps/`**: Individual application components
- **`src/components/Auth/`**: Login and loading screens

### Window Management System

- **Resizing**: Edge-based resizing with 10px margins and minimum size constraints
- **Focus Management**: Z-index stacking with automatic focus switching
- **State Persistence**: Window positions and sizes saved in Zustand store
- **Dynamic Menu Bar**: App-specific menus configured in `src/configs/menu/`

### Asset Structure

- **`public/app-icons/`**: Application icons in multiple sizes (16px to 1024px)
- **`src/assets/wallpapers/`**: Desktop wallpaper images organized by macOS version
- **`public/sounds/`**: System audio feedback and sounds
- **`public/cursors/`**: Custom cursor SVGs for different states

## Adding New Applications

1. **Create app configuration** in `src/configs/apps/appsConfig.ts`:

   ```typescript
   const newApp = createAppConfig(
     {
       title: "New App",
       resizable: true,
       width: 800,
       height: 600,
     },
     "new-app",
   );
   ```

2. **Add to exports** in the same file:

   ```typescript
   export const appsConfig = {
     // existing apps...
     newApp,
   } as const;
   ```

3. **Create component** in `src/components/apps/NewApp/NewApp.tsx`

4. **Add icons** to `public/app-icons/new-app/` (16px, 32px, 128px, 256px, 512px, 1024px)

## Configuration Files

### TypeScript

- **`tsconfig.json`**: Main config with strict mode and path mapping
- **`@/*` alias**: Points to `src/` directory
- **Strict mode**: Enabled for better type safety

### Build Tools

- **Vite**: Main build tool with React plugin
- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting
- **PostCSS**: CSS processing with Sass support

### PWA Configuration

- **Service Worker**: Configured in `vite.config.ts`
- **Manifest**: PWA manifest with multiple icon sizes
- **Caching**: Google Fonts and static assets caching

## Environment Setup

### Required Environment Variables

Create `.env.local` for Auth0 integration:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_CALLBACK_URL=http://localhost:4040/callback
```

### Development Port

The application runs on **port 4040** by default to avoid conflicts with common development ports.
