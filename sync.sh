#!/data/data/com.termux/files/usr/bin/bash

cd ~/scifi_aaa || exit

echo "⚡ ZERO-DELAY GIT SYNC STARTED"

while inotifywait -r -e modify,create,delete .; do

  echo "📡 Change detected..."

  git add -A

  if ! git diff --cached --quiet; then
    git commit -m "sync $(date '+%H:%M:%S')"
    git push origin main
    echo "🚀 synced to GitHub"
  fi

done
