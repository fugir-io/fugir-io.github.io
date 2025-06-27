# Fugir.io 🚀

![](./docs/assets/screenshot.png)

A modern macOS-inspired web desktop built with React, TypeScript, and Vite.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:4040
```

📖 **[→ Complete Development Quick Start Guide](./docs/QUICK_START.md)** - Get productive in 5 minutes

## Development Scripts

### Core Commands

- `npm run dev` - Start development server (localhost:4040)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Testing & Quality

- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Open Vitest UI for interactive testing
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Check code formatting and style
- `npm run format` - Auto-fix formatting issues
- `npm run check` - TypeScript type checking

### Enhanced Development Scripts

- `npm run test:local` - Run complete local test suite (lint + types + tests + build)
- `npm run dev:watch` - Start dev server with tests and TypeScript in watch mode
- `npm run coverage` - Generate and open coverage report
- `npm run ci` - Run full CI pipeline locally

## Testing

This project uses **Vitest** for fast, modern testing with the following features:

### Test Structure

```
src/
├── test/
│   ├── setup.ts          # Test configuration
│   └── utils.tsx         # Test utilities
└── components/
    └── **/*.test.tsx     # Component tests
```

### Key Testing Features

- ✅ **React Testing Library** for component testing
- ✅ **Vitest** for fast test execution
- ✅ **Coverage reporting** with HTML output
- ✅ **Mocked browser APIs** (localStorage, matchMedia, etc.)
- ✅ **TypeScript support** in tests

### Running Tests

```bash
# Watch mode (recommended for development)
npm run test

# Single run (for CI)
npm run test:run

# With coverage
npm run test:coverage

# Interactive UI
npm run test:ui

# Full local test suite
npm run test:local
```

## CI/CD

The project uses GitHub Actions for continuous integration:

### Workflows

1. **Continuous Integration** (`.github/workflows/ci.yml`)

   - Runs on every push/PR
   - Type checking, linting, testing, building
   - Security audit
   - Upload test coverage and build artifacts

2. **Deploy to Pages** (`.github/workflows/deploy.yaml`)
   - Runs after CI passes on main branch
   - Deploys to GitHub Pages
   - Includes final test run before deployment

### Branch Protection

- All PRs must pass CI before merging
- Main branch deployments only occur after successful CI

## Project Structure

```
fugir-io.github.io-react/
├── src/
│   ├── components/       # React components
│   ├── stores/          # Zustand state management
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── test/            # Test setup and utilities
│   └── assets/          # Static assets
├── scripts/             # Development scripts
├── .github/workflows/   # CI/CD workflows
└── docs/                # Documentation
```

## Key Features

- 🖥️ **macOS-like Interface** - Authentic desktop experience
- 🚀 **Modern Tech Stack** - React 18, TypeScript, Vite
- 🧪 **Comprehensive Testing** - Vitest + React Testing Library
- 🔒 **Auth0 Integration** - Secure authentication
- 📱 **PWA Support** - Progressive Web App capabilities
- 🎨 **Dynamic Wallpapers** - Beautiful background options (including "Defiance" default)
- 🧮 **Built-in Apps** - Calculator, Terminal, Safari, VSCode
- ⚡ **Hot Module Replacement** - Fast development experience

## Development Workflow

1. **Start Development Environment**

   ```bash
   npm run dev:watch  # Starts dev server + test watch + TypeScript watch
   ```

2. **Make Changes** - Edit components, add features, write tests

3. **Test Locally**

   ```bash
   npm run test:local  # Full test suite before committing
   ```

4. **Commit & Push** - CI will run automatically

5. **Deploy** - Automatic deployment to GitHub Pages after CI passes

📖 **[→ Detailed Development Guide](./docs/DEV.md)** - Architecture, patterns, and advanced workflows

## Configuration

### Environment Variables

Create `.env.local` for development:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_CALLBACK_URL=http://localhost:4040/callback
```

### TypeScript Configuration

- `tsconfig.json` - Main TypeScript config
- `@/*` path alias points to `src/`
- Strict mode enabled for better type safety

## Developer Resources

### 📚 Documentation

- **[Quick Start Guide](./docs/QUICK_START.md)** - Get up and running in 5 minutes
- **[Development Guide](./docs/DEV.md)** - Complete technical documentation
- **[API Integration](./docs/API_APP_QUICKSTART.md)** - Connect apps to backend services
- **[Component Examples](./docs/COMPONENT_EXAMPLES.md)** - UI patterns and examples

### 🛠️ Essential Commands

```bash
npm run dev:watch        # 🔥 Best for development (dev + tests + types)
npm run test:local       # 🧪 Full test suite before commits
npm run test:ui          # 🎨 Visual test interface
```

### 🚀 Adding Features

1. **Apps**: Create in `src/components/apps/` + register in `appsConfig.ts`
2. **Components**: Add to `src/components/` with tests
3. **State**: Use Zustand stores in `src/stores/`
4. **Styling**: Sass files in `src/css/` or inline styles

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and write tests
4. Run the local test suite: `npm run test:local`
5. Commit changes: `git commit -m "Add feature"`
6. Push to branch: `git push origin feature-name`
7. Open a Pull Request

## Building a Cloud Native Adventure
