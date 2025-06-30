#!/bin/bash

# Changelog generation script for fugir-io
# Usage: ./generate-changelog.sh <version> <type>

set -e

VERSION="$1"
TYPE="$2"
CURRENT_DATE=$(date +"%Y-%m-%d")

if [ -z "$VERSION" ]; then
    echo "Error: Version parameter is required"
    echo "Usage: $0 <version> <type>"
    exit 1
fi

if [ -z "$TYPE" ]; then
    TYPE="patch"
fi

# Get the previous version tag
PREVIOUS_VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "")

if [ -z "$PREVIOUS_VERSION" ]; then
    echo "No previous version found, generating initial changelog..."
    PREVIOUS_VERSION="HEAD~10"  # Last 10 commits if no tags
else
    echo "Generating changelog from $PREVIOUS_VERSION to current..."
fi

# Create or update CHANGELOG.md
CHANGELOG_FILE="CHANGELOG.md"
TEMP_FILE="CHANGELOG.tmp"

# Function to categorize commits
categorize_commit() {
    local commit_msg="$1"
    local commit_hash="$2"
    
    # Security updates
    if echo "$commit_msg" | grep -iE "(security|vulnerability|audit|fix.*cve|patch.*security)" > /dev/null; then
        echo "security"
    # Performance updates  
    elif echo "$commit_msg" | grep -iE "(performance|optimize|perf|speed|faster|cache)" > /dev/null; then
        echo "performance"
    # Feature updates
    elif echo "$commit_msg" | grep -iE "(feat|feature|add|new|implement)" > /dev/null; then
        echo "feature"
    # Bug fixes
    elif echo "$commit_msg" | grep -iE "(fix|bug|issue|resolve|correct)" > /dev/null; then
        echo "fix"
    # Dependencies
    elif echo "$commit_msg" | grep -iE "(dep|dependency|update.*package|bump|upgrade)" > /dev/null; then
        echo "dependency"
    # Documentation
    elif echo "$commit_msg" | grep -iE "(doc|readme|comment|documentation)" > /dev/null; then
        echo "documentation"
    # Refactoring
    elif echo "$commit_msg" | grep -iE "(refactor|clean|restructure|reorganize)" > /dev/null; then
        echo "refactor"
    # Testing
    elif echo "$commit_msg" | grep -iE "(test|spec|coverage)" > /dev/null; then
        echo "test"
    # CI/CD
    elif echo "$commit_msg" | grep -iE "(ci|cd|workflow|github|action|deploy)" > /dev/null; then
        echo "ci"
    # Configuration
    elif echo "$commit_msg" | grep -iE "(config|configure|setting|env)" > /dev/null; then
        echo "config"
    else
        echo "other"
    fi
}

# Get commits since last version
echo "Analyzing commits since $PREVIOUS_VERSION..."

# Initialize arrays for different types of changes
declare -a security_updates=()
declare -a performance_updates=()
declare -a feature_updates=()
declare -a bug_fixes=()
declare -a dependency_updates=()
declare -a documentation_updates=()
declare -a refactor_updates=()
declare -a test_updates=()
declare -a ci_updates=()
declare -a config_updates=()
declare -a other_updates=()

# Process commits
while IFS='|' read -r hash subject; do
    if [ -n "$hash" ] && [ -n "$subject" ]; then
        category=$(categorize_commit "$subject" "$hash")
        case $category in
            "security")
                security_updates+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
            "performance")
                performance_updates+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
            "feature")
                feature_updates+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
            "fix")
                bug_fixes+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
            "dependency")
                dependency_updates+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
            "documentation")
                documentation_updates+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
            "refactor")
                refactor_updates+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
            "test")
                test_updates+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
            "ci")
                ci_updates+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
            "config")
                config_updates+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
            *)
                other_updates+=("- $subject ([${hash:0:7}](https://github.com/fugir-io/fugir-io.github.io/commit/$hash))")
                ;;
        esac
    fi
done < <(git log ${PREVIOUS_VERSION}..HEAD --pretty=format:"%H|%s" --no-merges)

# Generate changelog entry
{
    echo "# Changelog"
    echo ""
    echo "All notable changes to this project will be documented in this file."
    echo ""
    echo "The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),"
    echo "and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)."
    echo ""
    
    # Add new version entry
    echo "## [$VERSION] - $CURRENT_DATE"
    echo ""
    
    # Add version type description
    case $TYPE in
        "major")
            echo "### 🚨 Breaking Changes"
            echo ""
            echo "This major version includes breaking changes. Please review the migration guide."
            echo ""
            ;;
        "minor")
            echo "### ✨ New Features"
            echo ""
            echo "This minor version introduces new features and improvements."
            echo ""
            ;;
        "patch")
            echo "### 🐛 Bug Fixes & Improvements"
            echo ""
            echo "This patch version includes bug fixes and minor improvements."
            echo ""
            ;;
    esac
    
    # Security Updates (highest priority)
    if [ ${#security_updates[@]} -gt 0 ]; then
        echo "### 🔒 Security Updates"
        echo ""
        printf '%s\n' "${security_updates[@]}"
        echo ""
    fi
    
    # Feature Updates
    if [ ${#feature_updates[@]} -gt 0 ]; then
        echo "### ✨ New Features"
        echo ""
        printf '%s\n' "${feature_updates[@]}"
        echo ""
    fi
    
    # Performance Updates
    if [ ${#performance_updates[@]} -gt 0 ]; then
        echo "### ⚡ Performance Improvements"
        echo ""
        printf '%s\n' "${performance_updates[@]}"
        echo ""
    fi
    
    # Bug Fixes
    if [ ${#bug_fixes[@]} -gt 0 ]; then
        echo "### 🐛 Bug Fixes"
        echo ""
        printf '%s\n' "${bug_fixes[@]}"
        echo ""
    fi
    
    # Dependency Updates
    if [ ${#dependency_updates[@]} -gt 0 ]; then
        echo "### 📦 Dependencies"
        echo ""
        printf '%s\n' "${dependency_updates[@]}"
        echo ""
    fi
    
    # Refactoring
    if [ ${#refactor_updates[@]} -gt 0 ]; then
        echo "### 🔨 Code Refactoring"
        echo ""
        printf '%s\n' "${refactor_updates[@]}"
        echo ""
    fi
    
    # Documentation
    if [ ${#documentation_updates[@]} -gt 0 ]; then
        echo "### 📚 Documentation"
        echo ""
        printf '%s\n' "${documentation_updates[@]}"
        echo ""
    fi
    
    # Testing
    if [ ${#test_updates[@]} -gt 0 ]; then
        echo "### 🧪 Testing"
        echo ""
        printf '%s\n' "${test_updates[@]}"
        echo ""
    fi
    
    # CI/CD
    if [ ${#ci_updates[@]} -gt 0 ]; then
        echo "### 🚀 CI/CD"
        echo ""
        printf '%s\n' "${ci_updates[@]}"
        echo ""
    fi
    
    # Configuration
    if [ ${#config_updates[@]} -gt 0 ]; then
        echo "### ⚙️ Configuration"
        echo ""
        printf '%s\n' "${config_updates[@]}"
        echo ""
    fi
    
    # Other changes
    if [ ${#other_updates[@]} -gt 0 ]; then
        echo "### 🔧 Other Changes"
        echo ""
        printf '%s\n' "${other_updates[@]}"
        echo ""
    fi
    
    # If there are existing changelog entries, append them
    if [ -f "$CHANGELOG_FILE" ]; then
        # Skip the header and first version if it exists
        tail -n +2 "$CHANGELOG_FILE" | sed '/^## \[/,$!d'
    fi
    
} > "$TEMP_FILE"

# Replace the changelog file
mv "$TEMP_FILE" "$CHANGELOG_FILE"

echo "✅ Changelog generated successfully for version $VERSION"
echo "📄 Updated $CHANGELOG_FILE"

# Show summary
echo ""
echo "📊 Change Summary for v$VERSION:"
echo "🔒 Security updates: ${#security_updates[@]}"
echo "✨ Feature updates: ${#feature_updates[@]}"
echo "⚡ Performance updates: ${#performance_updates[@]}"
echo "🐛 Bug fixes: ${#bug_fixes[@]}"
echo "📦 Dependency updates: ${#dependency_updates[@]}"
echo "🔨 Code refactoring: ${#refactor_updates[@]}"
echo "📚 Documentation: ${#documentation_updates[@]}"
echo "🧪 Testing: ${#test_updates[@]}"
echo "🚀 CI/CD: ${#ci_updates[@]}"
echo "⚙️ Configuration: ${#config_updates[@]}"
echo "🔧 Other changes: ${#other_updates[@]}"