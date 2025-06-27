#!/bin/bash

# Coverage Report Generator for Fugir.io
# Generates detailed test coverage reports

echo "📊 Generating Test Coverage Report for Fugir.io"
echo "==============================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Install coverage dependencies if needed
if ! npm list --depth=0 @vitest/coverage-v8 >/dev/null 2>&1; then
    print_step "Installing coverage dependencies..."
    npm install --save-dev @vitest/coverage-v8
fi

# Generate coverage report
print_step "Running tests with coverage..."
npm run test:coverage

print_success "Coverage report generated!"

# Check if coverage directory exists and show paths
if [ -d "coverage" ]; then
    print_info "Coverage reports available at:"
    echo "  • Text summary: See above output"
    echo "  • HTML report: coverage/index.html"
    echo "  • JSON report: coverage/coverage.json"
    
    # Try to open HTML report in browser (macOS/Linux)
    if command -v open >/dev/null 2>&1; then
        echo ""
        echo "📱 Opening HTML coverage report in browser..."
        open coverage/index.html
    elif command -v xdg-open >/dev/null 2>&1; then
        echo ""
        echo "📱 Opening HTML coverage report in browser..."
        xdg-open coverage/index.html
    else
        echo ""
        print_info "To view the HTML report, open coverage/index.html in your browser"
    fi
else
    echo "❌ Coverage directory not found"
    exit 1
fi

echo ""
print_success "Coverage analysis complete!"