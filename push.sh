#!/bin/bash

# CONFIG
REPO_DIR=~/scifi_aaa
BRANCH=main
COMMIT_MSG="auto update $(date '+%Y-%m-%d %H:%M:%S')"

cd $REPO_DIR || exit

# ellenőrzés van-e változás
if [[ -n $(git status --porcelain) ]]; then
  echo "🔄 Changes detected..."

  git add .
  git commit -m "$COMMIT_MSG"
  git push origin $BRANCH

  echo "✅ Pushed to GitHub"
else
  echo "✔ No changes"
fi
