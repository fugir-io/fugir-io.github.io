# Fugir.io Development Quick Start 🚀

Get up and running with Fugir.io development in under 5 minutes.

## Prerequisites

- **Node.js** 18+ and npm
- **Git** for version control
- **Modern browser** (Chrome, Firefox, Safari, Edge)

## 1. Clone & Setup (2 minutes)

```bash
# Clone the repository
git clone https://github.com/fugir-io/fugir-io.github.io-react.git
cd fugir-io.github.io-react

# Install dependencies
npm install

# Start development server
npm run dev
```

🎉 **That's it!** Open [http://localhost:4040](http://localhost:4040) to see Fugir.io running.

## 2. Essential Commands

### Development

```bash
npm run dev              # Start dev server (localhost:4040)
npm run dev:watch        # Dev server + tests + TypeScript watch
```

### Testing & Quality

```bash
npm run test:local       # 🔥 Run complete test suite (recommended before commits)
npm run test             # Interactive test watch mode
npm run test:ui          # Visual test interface
npm run lint             # Check formatting and style
npm run check            # TypeScript type checking
```

### Building

```bash
npm run build            # Production build
npm run serve            # Preview production build
```

## 3. Project Structure (90 seconds)

```
fugir-io.github.io-react/
├── src/
│   ├── components/          # React components
│   │   ├── Desktop/         # Desktop, windows, dock
│   │   ├── TopBar/          # Menu bar, system UI
│   │   └── apps/            # Individual applications
│   ├── stores/              # Zustand state management
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript definitions
│   └── test/                # Test setup & utilities
├── scripts/                 # Development scripts
└── docs/                    # Documentation
```

## 4. Development Workflow

### 🔄 Standard Workflow

1. **Start dev environment**: `npm run dev:watch`
2. **Make your changes** in `src/`
3. **Test locally**: `npm run test:local`
4. **Commit & push**: Git + CI handles the rest

### 🧪 Test-Driven Development

1. **Write tests first**: `src/components/**/*.test.tsx`
2. **Run tests**: `npm run test`
3. **Write implementation** until tests pass
4. **Refactor** with confidence

### 🏗️ Adding New Features

1. **Create component**: `src/components/YourFeature/`
2. **Add tests**: `YourFeature.test.tsx`
3. **Update types**: `src/types/` if needed
4. **Test thoroughly**: `npm run test:local`

## 5. Common Tasks (1 minute each)

### Add a New App

```typescript
// 1. Create component
// src/components/apps/MyApp/MyApp.tsx
export default function MyApp() {
  return <div>My App Content</div>;
}

// 2. Register in config
// src/configs/apps/appsConfig.ts
import MyApp from '../../components/apps/MyApp/MyApp';

export const myApp = createAppConfig({
  title: "My App",
  resizable: true,
  height: 600,
  width: 800,
}, MyApp);
```

### Add Icons

Place app icons in `public/app-icons/my-app/`:

- `16.png`, `32.png`, `256.png`, `512.png`, `1024.png`

### Update Styles

- **Global styles**: `src/css/global.scss`
- **Component styles**: Inline styles or CSS modules
- **Theme variables**: `src/configs/theme/colors.config.ts`

### Connect to APIs

```typescript
// Use built-in HTTP client
import { useWebService } from "@/helpers/use-webservice";

function MyComponent() {
  const webservice = useWebService("my-app");

  useEffect(() => {
    webservice.connect({
      baseURL: "https://api.example.com",
      auth: { type: "bearer", token: "your-token" },
    });
  }, []);

  const fetchData = async () => {
    const response = await webservice.get("/data");
    return response.data;
  };
}
```

## 6. Before You Commit ⚡

**Always run the local test suite:**

```bash
npm run test:local
```

This runs:

- ✅ TypeScript type checking
- ✅ ESLint + Prettier formatting
- ✅ Unit tests with coverage
- ✅ Production build test
- ✅ Security audit

## 7. Getting Help

### Documentation

- **[Complete Dev Guide](./DEV.md)** - Full technical documentation
- **[API Integration](./API_APP_QUICKSTART.md)** - Connect to backend APIs
- **[Component Examples](./COMPONENT_EXAMPLES.md)** - UI component patterns

### Debugging

- **Browser DevTools**: React DevTools extension recommended
- **Console logs**: Check for errors and warnings
- **Test output**: `npm run test:ui` for visual debugging
- **Build issues**: Check `npm run build` output

### Performance

- **Bundle analyzer**: Check build output size
- **Memory leaks**: Monitor component unmounting
- **State updates**: Use React DevTools profiler

## 8. Key Technologies

- **⚛️ React 18** - UI framework with hooks & suspense
- **📘 TypeScript** - Type safety and better DX
- **⚡ Vite** - Fast build tool and dev server
- **🧪 Vitest** - Modern testing framework
- **🐻 Zustand** - Lightweight state management
- **🎨 Sass** - Enhanced CSS with variables and mixins
- **🔒 Auth0** - Authentication and user management

## 9. Troubleshooting 🔧

### Common Issues

**Port 4040 already in use:**

```bash
# Find and kill process using port 4040
lsof -ti:4040 | xargs kill -9
# Or use a different port
npm run dev -- --port 3000
```

**Build errors:**

```bash
# Clear cache and reinstall
npm run clean
npm install
npm run build
```

**Test failures:**

```bash
# Run tests with verbose output
npm run test -- --reporter=verbose
# Run specific test file
npm run test Calculator.test.tsx
```

**TypeScript errors:**

```bash
# Check TypeScript configuration
npm run check
# Restart TypeScript language server in VS Code: Cmd+Shift+P > "TypeScript: Restart TS Server"
```

**Performance issues:**

- Check browser console for errors
- Monitor network tab for slow requests
- Use React DevTools profiler

### Quick Fixes

1. **Restart dev server**: `Ctrl+C` then `npm run dev`
2. **Clear browser cache**: Hard refresh with `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. **Update dependencies**: `npm update` (be careful with major version changes)
4. **Reset git state**: `git stash` to temporarily save changes

## Ready to Build? 🛠️

You're all set! The development environment is designed for:

- **Fast feedback loops** with hot reloading
- **Confidence** through comprehensive testing
- **Quality** through automated linting and type checking
- **Productivity** with great developer experience

Start with `npm run dev:watch` and enjoy building! 🎉

---

**Next Steps:**

- Explore the [complete dev documentation](./DEV.md)
- Check out [component examples](./COMPONENT_EXAMPLES.md)
- Build your first [API-connected app](./API_APP_QUICKSTART.md)
