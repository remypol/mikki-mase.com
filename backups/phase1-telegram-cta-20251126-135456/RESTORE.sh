#!/bin/bash
echo "🔄 Restoring from Phase 1 backup..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

cp "$SCRIPT_DIR/index.astro.backup" "$PROJECT_ROOT/src/pages/index.astro"
cp -r "$SCRIPT_DIR/components-backup/"* "$PROJECT_ROOT/src/components/"
cp "$SCRIPT_DIR/global.css.backup" "$PROJECT_ROOT/src/styles/global.css"

cd "$PROJECT_ROOT"
npm run build
echo "✅ Restored successfully"
