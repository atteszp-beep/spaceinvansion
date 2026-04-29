#!/data/data/com.termux/files/usr/bin/bash

cd ~/scifi_aaa || exit

echo "🚀 ACODE STUDIO PRO v2 STARTED"

LAST_COMMIT=0

sync_git() {

  NOW=$(date +%s)

  # debounce (3 sec)
  if (( NOW - LAST_COMMIT < 3 )); then
    return
  fi

  LAST_COMMIT=$NOW

  git add -A

  if ! git diff --cached --quiet; then
    git commit -m "auto sync $(date '+%H:%M:%S')"
    git push origin main
    echo "🚀 GitHub synced"
  fi
}

restart_server() {
  echo "🔄 Restarting server..."

  pkill -f node

  nohup node server.js > server.log 2>&1 &

  echo "✅ Server running"
}

inotifywait -m -r \
--exclude '\.git|node_modules|server.log' \
-e close_write,create,delete,modify . | while read path action file; do

  echo "📡 CHANGE: $file"

  sync_git

  # ha server fájl változik → restart
  if [[ "$file" == *.js ]]; then
    restart_server
  fi

done
