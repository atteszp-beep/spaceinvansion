#!/data/data/com.termux/files/usr/bin/bash

cd ~/scifi_aaa || exit

echo "📦 Git pull indul..."

git pull origin main

echo "🔧 Deploy frissítés..."

# ha build kell:
# npm install
# npm run build

echo "✅ Deploy kész: $(date)"
