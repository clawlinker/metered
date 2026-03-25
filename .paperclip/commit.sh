#!/bin/bash
# Auto-commit script for Paperclip agents
# Called after agent completes work on an issue

set -e
cd /root/metered

ISSUE_ID="${1:-unknown}"
AGENT_NAME="${2:-agent}"
MESSAGE="${3:-work completed}"

# Stage all changes
git add -A

# Check if there are changes to commit
if git diff --cached --quiet; then
  echo "No changes to commit"
  exit 0
fi

# Commit with Paperclip co-author
git commit -m "${MESSAGE}

Issue: ${ISSUE_ID}
Agent: ${AGENT_NAME}

Co-Authored-By: Paperclip <noreply@paperclip.ing>"

# Push
git push origin main 2>&1 || echo "Push failed — will retry on next commit"

echo "Committed and pushed by ${AGENT_NAME} for ${ISSUE_ID}"
