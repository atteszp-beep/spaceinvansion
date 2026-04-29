#!/data/data/com.termux/files/usr/bin/bash

cd ~/scifi_aaa || exit

echo "👀 Git auto watcher indul..."

while true; do

  git add .

  if ! git diff --cached --quiet; then
    echo "📦 Változás észlelve..."

    git commit -m "auto update $(date '+%Y-%m-%d %H:%M:%S')"

    git push origin main

    echo "🚀 Feltöltve GitHubra!"
  fi

  sleep 5

done
