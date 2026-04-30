#!/data/data/com.termux/files/usr/bin/bash

echo "⚡ AUTO SYNC STARTED..."

while inotifywait -r -e modify,create,delete,move .; do
    echo "📦 Changes detected..."

    git add .

    git commit -m "auto sync $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

    git push

    echo "🚀 Synced to GitHub!"
done
