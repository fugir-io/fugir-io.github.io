#!/bin/bash

# Local Testing Script for Fugir.io
# This script runs comprehensive local testing before committing

set -e  # Exit on any error

echo "🚀 Running Fugir.io Local Test Suite"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_step "Installing dependencies..."
    npm install
fi

# Step 1: Type checking
print_step "Running TypeScript type check..."
if npm run check; then
    print_success "Type check passed"
else
    print_error "Type check failed"
    exit 1
fi

# Step 2: Linting
print_step "Running linter..."
if npm run lint; then
    print_success "Linting passed"
else
    print_error "Linting failed"
    exit 1
fi

# Step 3: Unit tests
print_step "Running unit tests..."
if npm run test:run; then
    print_success "Unit tests passed"
else
    print_error "Unit tests failed"
    exit 1
fi

# Step 4: Build test
print_step "Testing production build..."
if npm run build; then
    print_success "Build completed successfully"
    
    # Check build output
    if [ -f "dist/index.html" ] && [ -d "dist/assets" ]; then
        print_success "Build output validation passed"
    else
        print_error "Build output validation failed - missing files"
        exit 1
    fi
else
    print_error "Build failed"
    exit 1
fi

# Step 5: Security audit (non-blocking)
print_step "Running security audit..."
if npm audit --audit-level high; then
    print_success "No high-risk security issues found"
else
    print_warning "Security issues detected - please review"
fi

echo ""
echo "🎉 All tests passed! Your code is ready for commit."
echo ""
echo "Next steps:"
echo "  • git add ."
echo "  • git commit -m \"your commit message\""
echo "  • git push"
echo ""