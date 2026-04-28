#!/bin/bas#!/bin/bash

echo "👀 Smart auto push watcher elindult..."

while true; do

  # figyeli a fájl változásokat
  inotifywait -r -e modify,create,delete .

  echo "🔍 változás észlelve → ellenőrzés..."

  # Git státusz ellenőrzés
  if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo "⚠️ nincs valódi változás → nincs push"
  else
    echo "🚀 valódi változás → push indul!"
    ./push.sh
  fi

  echo "⏳ várakozás..."
done
