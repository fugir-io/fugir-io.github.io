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

### Makefile Commands (Preferred for Development)

**Development:**

- `make dev` - Start development server
- `make build` - Build for production
- `make test` - Run tests
- `make lint` - Run linting
- `make format` - Format code
- `make ci` - Run full CI pipeline locally

**Version Management:**

- `make version-patch` - Bump patch version (bug fixes)
- `make version-minor` - Bump minor version (new features)
- `make version-major` - Bump major version (breaking changes)

**Release Management:**

- `make changelog` - Generate changelog for current version
- `make release` - Trigger GitHub release workflow
- `make status` - Show current project status

**Maintenance:**

- `make audit` - Run security audit
- `make update-deps` - Update dependencies
- `make help` - Show all available commands

### Testing Framework

- Uses **Vitest** with React Testing Library
- Test files: `**/*.test.{ts,tsx}`
- Setup file: `src/test/setup.ts`
- Coverage reports in HTML format

## Architecture Overview

This is a **Fugir Environment** built with React 18, TypeScript, and Vite. It recreates the Fugir Monterey/Big Sur desktop experience in a web browser with authentic UI elements, window management, and applications.

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
- **`src/assets/wallpapers/`**: Desktop wallpaper images organized by Fugir version
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

## Release Management

### Automated Release Workflow

This project uses an automated release system with:

- **Semantic Versioning** (major.minor.patch)
- **Automated Changelog Generation** from commit history
- **GitHub Actions** for release automation
- **Makefile** for development workflow

### Creating Releases

1. **Patch Release (bug fixes):** `make version-patch`
2. **Minor Release (new features):** `make version-minor`
3. **Major Release (breaking changes):** `make version-major`
4. **Trigger Release:** `make release`

### Changelog Categories

The changelog system automatically categorizes commits:

- 🔒 Security Updates
- ✨ Feature Updates
- ⚡ Performance Updates
- 🐛 Bug Fixes
- 📦 Dependencies
- 🔨 Refactoring
- 📚 Documentation
- 🧪 Testing
- 🚀 CI/CD
- ⚙️ Configuration

### Release Workflow

1. Version bump updates `package.json` and generates changelog
2. Git commit and tag creation
3. GitHub Actions workflow triggers on tag push
4. Automated testing, security scanning, and deployment
5. GitHub release creation with artifacts
6. Automatic deployment to GitHub Pages

See [docs/RELEASE_WORKFLOW.md](docs/RELEASE_WORKFLOW.md) for detailed documentation.


## Changelog Format Guidelines

When generating or updating changelog files for the Fugir Environment, follow these formatting guidelines:

### File Structure

- **Filename**: `CHANGELOG.md` (single file in project root)
- **Title**: `# Fugir.io Fugir Environment - Changelog`

### Content Structure

1. **Overview Section**
   - Brief summary of the release
   - Highlight major themes or features introduced

2. **New Applications & Features**
   - New desktop applications added to the simulator
   - Significant UI/UX improvements
   - Desktop environment enhancements
   - Window management improvements

3. **User Interface Improvements**
   - Visual enhancements and theme updates
   - Wallpaper and appearance changes
   - Dock and menu bar improvements
   - Animation and interaction refinements

4. **Performance & Technical Improvements**
   - Rendering optimizations
   - Memory usage improvements
   - Load time enhancements
   - State management optimizations

5. **Bug Fixes & Stability**
   - Application crashes and errors resolved
   - Window management issues fixed
   - UI/UX inconsistencies corrected
   - Authentication and routing fixes

6. **Developer Experience**
   - Build system improvements
   - Testing framework enhancements
   - Development workflow optimizations
   - Documentation updates

### Content Classification Guidelines

**New Applications & Features**:
- New desktop applications (Calculator, Notes, Safari, etc.)
- System-level features (Spotlight, Notification Center, etc.)
- Authentication and user management features
- Desktop environment capabilities

**User Interface Improvements**:
- Visual design updates and theme changes
- Wallpaper collections and customization options
- Dock animations and interactions
- Menu bar functionality and appearance
- Window styling and behaviors

**Performance & Technical Improvements**:
- React component optimizations
- Zustand store improvements
- Bundle size reductions
- Rendering performance enhancements
- PWA and caching improvements

**Bug Fixes & Stability**:
- Application-specific bug fixes
- Window management and focus issues
- State persistence problems
- Cross-browser compatibility fixes
- Mobile responsiveness issues

### Example Changelog Entry

```markdown
## Version 1.2.0 - Desktop Applications Update

### Overview
Major release introducing new desktop applications and enhanced window management system.

### New Applications & Features
- **Calculator App**: Full-featured calculator with scientific mode
- **Notes App**: Rich text editor with save/load functionality  
- **Enhanced Window Management**: Improved resizing and focus handling
- **Spotlight Search**: System-wide search functionality

### User Interface Improvements
- **New Wallpaper Collection**: Added 15 new Fugir-style wallpapers
- **Dock Animations**: Smooth hover effects and app launch animations
- **Dark Mode Support**: Complete dark theme implementation
- **Menu Bar Enhancements**: Dynamic menu updates based on active app

### Performance & Technical Improvements
- **Bundle Size Reduction**: 20% smaller initial load through code splitting
- **Rendering Optimizations**: Improved frame rates for window animations
- **State Management**: More efficient Zustand store architecture
- **PWA Enhancements**: Better offline caching and app installation

### Bug Fixes & Stability
- **Window Focus**: Fixed issues with window stacking and focus management
- **Mobile Responsiveness**: Improved touch interactions on mobile devices
- **Authentication**: Resolved Auth0 callback handling edge cases
- **Cross-Browser**: Fixed Safari-specific rendering issues

### Developer Experience
- **Enhanced Testing**: Added comprehensive component test coverage
- **Build Optimizations**: Faster development builds and hot reloading
- **Documentation**: Updated component documentation and usage examples
```

### Formatting Guidelines

- Use consistent bullet point formatting (`-` for main points)
- Use `**Bold**` for emphasis on feature names and key terms
- Use code blocks for technical details and configuration
- Use consistent date format: (YYYY-MM-DD)
- Group related changes under logical subsections
- Focus on user-facing benefits and visual improvements
- Include performance metrics when available

### Language Style

- Write user-focused descriptions emphasizing desktop experience
- Highlight visual and interactive improvements
- Use clear, accessible language for general users
- Emphasize the authentic Fugir experience recreation
- Maintain consistent tone focused on user benefits