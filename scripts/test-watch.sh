#!/bin/bash

# Development Watch Script for Fugir.io
# This script starts multiple development processes for active development

echo "🚀 Starting Fugir.io Development Test Environment"
echo "================================================"

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting the following processes:${NC}"
echo "  • Vite dev server (port 4040)"
echo "  • TypeScript watch mode"
echo "  • Test watch mode"
echo ""
echo -e "${GREEN}Press Ctrl+C to stop all processes${NC}"
echo ""

# Function to kill background processes on script exit
cleanup() {
    echo ""
    echo "🛑 Stopping all processes..."
    kill $(jobs -p) 2>/dev/null || true
    wait
    echo "✅ All processes stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Start TypeScript watch in background
echo "🔍 Starting TypeScript watch..."
npm run check:watch &
TS_PID=$!

# Start test watch in background
echo "🧪 Starting test watch..."
npm run test:watch &
TEST_PID=$!

# Start dev server (this will run in foreground)
echo "🌐 Starting development server..."
echo "   → http://localhost:4040"
echo ""

npm run dev

# This line should never be reached due to the trap, but just in case
cleanup