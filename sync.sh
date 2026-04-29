#!/data/data/com.termux/files/usr/bin/bash

cd ~/scifi_aaa || exit

echo "⚡ ZERO-DELAY GIT SYNC STARTED (FIXED)"

inotifywait -m -r \
--exclude '\.git' \
-e modify,create,delete . | while read path action file; do

  echo "📡 Change detected: $file"

  git add -A

  if ! git diff --cached --quiet; then
    git commit -m "sync $(date '+%H:%M:%S')"
    git push origin main
    echo "🚀 synced"
  fi

done
