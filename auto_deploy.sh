#!/data/data/com.termux/files/usr/bin/bash

WATCH_DIR="./public"

echo "🚀 Auto deploy indul..."

while inotifywait -r -e modify,create,delete $WATCH_DIR; do
    echo "📦 Változás észlelve... deploy indul"

    # ide jön a deploy parancs (pl. copy, git, ftp, stb.)

    cp -r public/* ./deploy_target/ 2>/dev/null

    echo "✅ Deploy kész: $(date)"
done
