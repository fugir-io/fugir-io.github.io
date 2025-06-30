# Release Workflow Documentation

This document describes the automated release workflow for the fugir-io project.

## Overview

The release system uses a combination of:

- **Makefile** for local development and version management
- **GitHub Actions** for automated releases and deployment
- **Semantic Versioning** for version management
- **Automated Changelog Generation** for release notes

## Quick Start

### Creating a Release

1. **For patch releases (bug fixes):**

   ```bash
   make version-patch
   ```

2. **For minor releases (new features):**

   ```bash
   make version-minor
   ```

3. **For major releases (breaking changes):**

   ```bash
   make version-major
   ```

4. **Trigger the release:**
   ```bash
   make release
   ```

## Makefile Commands

### Development Commands

```bash
make help           # Show all available commands
make dev            # Start development server
make build          # Build for production
make test           # Run tests
make lint           # Run linting
make format         # Format code
make ci             # Run full CI pipeline locally
```

### Version Management

```bash
make version-patch  # Bump patch version (13.0.0 → 13.0.1)
make version-minor  # Bump minor version (13.0.0 → 13.1.0)
make version-major  # Bump major version (13.0.0 → 14.0.0)
```

### Release Management

```bash
make changelog      # Generate changelog for current version
make release        # Trigger GitHub release workflow
make status         # Show current project status
```

### Maintenance

```bash
make audit          # Run security audit
make audit-fix      # Fix security vulnerabilities
make update-deps    # Update dependencies
```

## Release Process

### 1. Version Bumping

When you run `make version-{patch|minor|major}`, the following happens:

1. **Version Check**: Ensures git working directory is clean
2. **Version Update**: Updates `package.json` and `package-lock.json`
3. **Changelog Generation**: Automatically generates changelog entries
4. **Git Operations**: Commits changes and creates a git tag
5. **Confirmation**: Shows next steps

### 2. Changelog Generation

The changelog system automatically categorizes commits into:

- 🔒 **Security Updates** - Security fixes and vulnerability patches
- ✨ **New Features** - New functionality and enhancements
- ⚡ **Performance Improvements** - Performance optimizations
- 🐛 **Bug Fixes** - Bug fixes and corrections
- 📦 **Dependencies** - Dependency updates and changes
- 🔨 **Code Refactoring** - Code restructuring and cleanup
- 📚 **Documentation** - Documentation updates
- 🧪 **Testing** - Test additions and improvements
- 🚀 **CI/CD** - Build and deployment changes
- ⚙️ **Configuration** - Configuration changes
- 🔧 **Other Changes** - Miscellaneous changes

### 3. GitHub Release Workflow

When you run `make release`, it triggers the GitHub Actions workflow that:

1. **Validates** the release version and package.json consistency
2. **Runs Tests** - Full test suite including security scans
3. **Creates Release** - GitHub release with automated release notes
4. **Deploys** - Automatically deploys to GitHub Pages
5. **Notifies** - Provides success/failure notifications

## Workflow Files

### `.github/workflows/release.yml`

The main release workflow with jobs:

- **validate** - Version validation
- **test** - Full test suite
- **security-scan** - Security vulnerability checks
- **create-release** - GitHub release creation
- **deploy** - GitHub Pages deployment
- **notify** - Release notifications

## Manual Release (Alternative)

If you need to create a release manually:

```bash
# 1. Update version in package.json
npm version patch|minor|major --no-git-tag-version

# 2. Generate changelog
./scripts/generate-changelog.sh <version> <type>

# 3. Commit and tag
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to <version>"
git tag -a v<version> -m "Release v<version>"

# 4. Push and trigger release
git push origin main
git push origin v<version>
```

## Security Considerations

### Security Scanning

The release workflow automatically:

- Runs `npm audit` to check for vulnerabilities
- Blocks releases with high/critical vulnerabilities
- Reports security scan results

### Access Control

- Release workflow requires push access to main branch
- GitHub token permissions are scoped to minimum required
- Release artifacts are signed and checksummed

## Troubleshooting

### Common Issues

1. **"Working directory not clean"**

   ```bash
   git status
   git add . && git commit -m "your changes"
   # or
   git stash
   ```

2. **"Not on main branch"**

   ```bash
   git checkout main
   git pull origin main
   ```

3. **Version mismatch errors**
   - Ensure package.json version matches the tag version
   - Check for uncommitted changes

4. **Release workflow failures**
   - Check GitHub Actions logs
   - Verify all tests pass locally: `make ci`
   - Ensure no security vulnerabilities: `make audit`

### Manual Workflow Trigger

You can also trigger releases manually from GitHub:

1. Go to Actions → Release workflow
2. Click "Run workflow"
3. Enter the version (e.g., v13.1.0)
4. Click "Run workflow"

## Best Practices

1. **Always run tests before releasing**: `make ci`
2. **Review changelog entries** before finalizing release
3. **Use semantic versioning consistently**
4. **Keep commits atomic and well-described**
5. **Run security audits regularly**: `make audit`
6. **Update dependencies periodically**: `make update-deps`

## Integration with Development

### Pre-commit Checks

Consider adding these to your development workflow:

```bash
# Before committing
make lint format check test

# Before releasing
make ci audit
```

### IDE Integration

You can integrate Makefile commands with your IDE:

- VS Code: Use tasks.json to run Makefile targets
- IntelliJ: Add Makefile support plugin
- Terminal: Use shell aliases for common commands

## Version History

See [CHANGELOG.md](../CHANGELOG.md) for detailed version history and changes.
