#!/usr/bin/env bash
set -euo pipefail

# Deploy built Angular site to the `main` branch (only built files)
# Usage: run from the `website/` directory: ./scripts/deploy_to_main.sh

ROOT_DIR=$(pwd)
BUILD_CMD="npm run build"
BUILD_DIR="dist/website"
DEPLOY_WORKTREE_DIR="$ROOT_DIR/.deploy_main"

# Ensure git and npm are available
command -v git >/dev/null 2>&1 || { echo "git not found" >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm not found" >&2; exit 1; }

# Remember current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "Current git branch: $CURRENT_BRANCH"

# Install deps if node_modules missing
if [ ! -d "node_modules" ]; then
  echo "Installing node dependencies..."
  npm ci
fi

echo "Running build: $BUILD_CMD"
$BUILD_CMD

if [ ! -d "$BUILD_DIR" ]; then
  echo "Build output directory not found: $BUILD_DIR" >&2
  exit 1
fi

# Fetch latest refs
git fetch origin main

# Remove existing worktree if present
if [ -d "$DEPLOY_WORKTREE_DIR" ]; then
  echo "Removing existing worktree at $DEPLOY_WORKTREE_DIR"
  git worktree remove -f "$DEPLOY_WORKTREE_DIR" || rm -rf "$DEPLOY_WORKTREE_DIR"
fi

# Create a new worktree based on origin/main (detached if local main absent)
if git show-ref --verify --quiet refs/heads/main; then
  git worktree add "$DEPLOY_WORKTREE_DIR" main
else
  git worktree add --detach "$DEPLOY_WORKTREE_DIR" origin/main
fi

# Clean deploy directory, preserving the worktree metadata directory
find "$DEPLOY_WORKTREE_DIR" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} + || true

# Copy build files into the worktree root, preserving hidden files if present
cp -a "$BUILD_DIR"/. "$DEPLOY_WORKTREE_DIR"/

# Commit & push from the worktree
pushd "$DEPLOY_WORKTREE_DIR" >/dev/null

# Configure author if missing
if ! git config user.name >/dev/null; then
  git config user.name "github-actions[bot]"
  git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
fi

git add --all
if git diff --staged --quiet; then
  echo "No changes to deploy. Exiting."
else
  git commit -m "Deploy: build from $CURRENT_BRANCH at $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
  git push origin HEAD:main
fi

popd >/dev/null

# Remove the temporary worktree
git worktree remove -f "$DEPLOY_WORKTREE_DIR" || true

echo "Deployment finished. main branch updated with build artifacts."
