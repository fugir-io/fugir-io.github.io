# Fugir.io Makefile
# Development and release automation

# Colors for output
ERROR_COLOR := \033[31m
INFO_COLOR := \033[36m
NO_COLOR := \033[0m

.PHONY: help install dev build test lint format clean changelog codereview status version-major version-minor version-patch release check-git

# Default target
help: ## Show this help message
	@echo "Fugir.io Development Makefile"
	@echo ""
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development targets
install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

test: ## Run tests
	npm run test:run

test-watch: ## Run tests in watch mode
	npm test

test-ui: ## Open test UI
	npm run test:ui

coverage: ## Generate test coverage report
	npm run test:coverage

lint: ## Run linting
	npm run lint

format: ## Format code
	npm run format

check: ## Run TypeScript type checking
	npm run check

clean: ## Clean build artifacts and node_modules
	npm run clean

ci: ## Run full CI pipeline locally
	npm run ci

# Version management
CURRENT_VERSION := $(shell node -p "require('./package.json').version")
MAJOR := $(shell echo $(CURRENT_VERSION) | cut -d. -f1)
MINOR := $(shell echo $(CURRENT_VERSION) | cut -d. -f2)
PATCH := $(shell echo $(CURRENT_VERSION) | cut -d. -f3)

# Version management
version-major: check-git ## Create major version tag (breaking changes)
	$(eval NEW_VERSION := $(shell echo $$(($(MAJOR) + 1)).0.0))
	@echo "$(INFO_COLOR)Creating major release tag v$(NEW_VERSION)$(NO_COLOR)"
	@git tag -a v$(NEW_VERSION) -m "Release v$(NEW_VERSION)"
	@echo "$(INFO_COLOR)Tag created. Run 'make release' to publish$(NO_COLOR)"

version-minor: check-git ## Create minor version tag (new features)
	$(eval NEW_VERSION := $(MAJOR).$(shell echo $$(($(MINOR) + 1))).0)
	@echo "$(INFO_COLOR)Creating minor release tag v$(NEW_VERSION)$(NO_COLOR)"
	@git tag -a v$(NEW_VERSION) -m "Release v$(NEW_VERSION)"
	@echo "$(INFO_COLOR)Tag created. Run 'make release' to publish$(NO_COLOR)"

version-patch: check-git ## Create patch version tag (bug fixes)
	$(eval NEW_VERSION := $(MAJOR).$(MINOR).$(shell echo $$(($(PATCH) + 1))))
	@echo "$(INFO_COLOR)Creating patch release tag v$(NEW_VERSION)$(NO_COLOR)"
	@git tag -a v$(NEW_VERSION) -m "Release v$(NEW_VERSION)"
	@echo "$(INFO_COLOR)Tag created. Run 'make release' to publish$(NO_COLOR)"

release: ## Push release tag to trigger release workflow
	@echo "$(INFO_COLOR)Pushing release tag...$(NO_COLOR)"
	@git push origin --tags
	@echo "$(INFO_COLOR)Release workflow triggered. Check GitHub Actions for progress.$(NO_COLOR)"

check-git: ## Check git status before operations
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "$(ERROR_COLOR)Error: Working directory is not clean. Please commit or stash changes.$(NO_COLOR)"; \
		exit 1; \
	fi
	@if [ "$$(git rev-parse --abbrev-ref HEAD)" != "main" ]; then \
		echo "$(ERROR_COLOR)Warning: Not on main branch. Current branch: $$(git rev-parse --abbrev-ref HEAD)$(NO_COLOR)"; \
		read -p "Continue anyway? [y/N] " -n 1 -r; \
		echo; \
		if [[ ! $$REPLY =~ ^[Yy]$$ ]]; then \
			exit 1; \
		fi; \
	fi

changelog: ## Generate or update changelog for specified version (TAG_VERSION=1.2.3 make generate-changelog)
	@if [ -z "$(TAG_VERSION)" ]; then \
		echo "$(ERROR_COLOR)Error: TAG_VERSION is required. Usage: TAG_VERSION=1.2.3 make generate-changelog$(NO_COLOR)"; \
		exit 1; \
	fi
	echo "$(INFO_COLOR)Generating changelog for version$(NO_COLOR)"; \
	claude -p --dangerously-skip-permissions "CRITICAL: Update or create the changelog for version $(TAG_VERSION). Analyze BOTH git commits AND code structure to understand changes:\n\nCODE ANALYSIS REQUIRED:\n1. EXAMINE src/components/ directory for new desktop applications\n2. IDENTIFY UI/UX improvements in Desktop/, Dock/, TopBar/ components\n3. UNDERSTAND app system changes in src/configs/apps/\n4. REVIEW state management updates in Zustand stores\n5. CHECK for wallpaper, theme, and visual enhancements\n\nCONTENT CLASSIFICATION:\n1. **New Applications & Features** → New desktop apps, system features, major UI additions\n2. **User Interface Improvements** → Visual enhancements, animations, wallpapers, themes\n3. **Performance & Technical Improvements** → React optimizations, bundle size, rendering improvements\n4. **Bug Fixes & Stability** → Component fixes, window management, authentication issues\n5. **Developer Experience** → Build system, testing, development workflow improvements\n\nSPECIFIC FOCUS for $(TAG_VERSION):\n- Focus on authentic Fugir desktop experience recreation\n- Highlight user-facing visual and interactive improvements\n- Emphasize new desktop applications and system features\n- Document window management and desktop environment enhancements\n- Include performance metrics for rendering and load times when available\n\nKEY MESSAGING:\n- Authentic Fugir experience in the browser\n- New desktop applications and system capabilities\n- Enhanced window management and user interactions\n- Visual fidelity and animation improvements\n- Cross-browser compatibility and mobile responsiveness\n\nWrite user-focused descriptions emphasizing the desktop simulation experience. Reference CLAUDE.md changelog guidelines. Only modify CHANGELOG-X.X.md files in docs/releases."

codereview: ## Perform code review of current branch changes using Claude
	@echo "$(INFO_COLOR)Performing code review of current branch changes...$(NO_COLOR)"
	claude -p --dangerously-skip-permissions "Provide a code review for the current changes on the branch compared to its origin. Focus on the following aspects:\n\n- **Functionality**: Does the code achieve its intended purpose effectively?\n- **Logic**: Are there any logical errors or inefficiencies in the implementation?\n- **Strategy**: Is the approach taken appropriate and scalable?\n- **Componentization**: Are components well-structured and reusable?\n- **Testing**: Are there sufficient tests, especially integration tests, to ensure reliability?\n- **Goal Alignment**: Does the code align with the branch's intended goals?\n\nSummarize the findings in a clear and concise manner."

status: ## Show current project status
	@echo "Project: fugir-io"
	@echo "Current version: $(CURRENT_VERSION)"
	@echo "Git branch: $$(git rev-parse --abbrev-ref HEAD)"
	@echo "Git status:"
	@git status --short
	@echo ""
	@echo "Last 5 commits:"
	@git log --oneline -5

# Security and maintenance
audit: ## Run security audit
	npm audit

audit-fix: ## Fix security vulnerabilities
	npm audit fix

update-deps: ## Update dependencies to latest versions
	npm update
	@echo "Dependencies updated. Review changes and run tests."

# Docker targets (if using Docker)
docker-build: ## Build Docker image
	docker build -t fugir-io:$(CURRENT_VERSION) .
	docker tag fugir-io:$(CURRENT_VERSION) fugir-io:latest

docker-run: ## Run Docker container
	docker run -p 4040:4040 fugir-io:latest