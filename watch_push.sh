#!/bin/bash

REPO_DIR=~/scifi_aaa

while true
do
  cd $REPO_DIR || exit

  if [[ -n $(git status --porcelain) ]]; then
    echo "🔄 Changes detected..."

    git add .
    git commit -m "auto $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main

    echo "✅ Pushed"
  else
    echo "✔ No changes"
  fi

  sleep 10
done
