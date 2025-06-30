# Fugir.io Makefile
# Development and release automation

.PHONY: help install dev build test lint format clean release changelog version-major version-minor version-patch check-git status

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

version-major: check-git ## Bump major version (breaking changes)
	$(eval NEW_VERSION := $(shell echo $$(($(MAJOR) + 1)).0.0))
	@echo "Bumping version from $(CURRENT_VERSION) to $(NEW_VERSION)"
	@npm version --no-git-tag-version $(NEW_VERSION)
	@$(MAKE) changelog VERSION=$(NEW_VERSION) TYPE="major"
	@git add package.json package-lock.json CHANGELOG.md
	@git commit -m "chore: bump version to $(NEW_VERSION)"
	@git tag -a v$(NEW_VERSION) -m "Release v$(NEW_VERSION)"
	@echo "Version bumped to $(NEW_VERSION). Run 'make release' to publish."

version-minor: check-git ## Bump minor version (new features)
	$(eval NEW_VERSION := $(MAJOR).$(shell echo $$(($(MINOR) + 1))).0)
	@echo "Bumping version from $(CURRENT_VERSION) to $(NEW_VERSION)"
	@npm version --no-git-tag-version $(NEW_VERSION)
	@$(MAKE) changelog VERSION=$(NEW_VERSION) TYPE="minor"
	@git add package.json package-lock.json CHANGELOG.md
	@git commit -m "chore: bump version to $(NEW_VERSION)"
	@git tag -a v$(NEW_VERSION) -m "Release v$(NEW_VERSION)"
	@echo "Version bumped to $(NEW_VERSION). Run 'make release' to publish."

version-patch: check-git ## Bump patch version (bug fixes)
	$(eval NEW_VERSION := $(MAJOR).$(MINOR).$(shell echo $$(($(PATCH) + 1))))
	@echo "Bumping version from $(CURRENT_VERSION) to $(NEW_VERSION)"
	@npm version --no-git-tag-version $(NEW_VERSION)
	@$(MAKE) changelog VERSION=$(NEW_VERSION) TYPE="patch"
	@git add package.json package-lock.json CHANGELOG.md
	@git commit -m "chore: bump version to $(NEW_VERSION)"
	@git tag -a v$(NEW_VERSION) -m "Release v$(NEW_VERSION)"
	@echo "Version bumped to $(NEW_VERSION). Run 'make release' to publish."

# Changelog generation
changelog: ## Generate changelog for current version
	@echo "Generating changelog for version $(VERSION)..."
	@./scripts/generate-changelog.sh $(VERSION) $(TYPE)

# Release management
release: check-git ## Trigger GitHub release workflow
	@echo "Triggering release workflow for version $(CURRENT_VERSION)..."
	@git push origin main
	@git push origin v$(CURRENT_VERSION)
	@echo "Release workflow triggered. Check GitHub Actions for progress."

# Git checks
check-git: ## Check git status before operations
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "Error: Working directory is not clean. Please commit or stash changes."; \
		exit 1; \
	fi
	@if [ "$$(git rev-parse --abbrev-ref HEAD)" != "main" ]; then \
		echo "Warning: Not on main branch. Current branch: $$(git rev-parse --abbrev-ref HEAD)"; \
		read -p "Continue anyway? [y/N] " -n 1 -r; \
		echo; \
		if [[ ! $$REPLY =~ ^[Yy]$$ ]]; then \
			exit 1; \
		fi; \
	fi

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