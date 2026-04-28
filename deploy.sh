#!/bin/bash

echo "🚀 GitHub Pages deploy indul..."

git add .

git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

git push

echo "🌐 kész! GitHub Pages frissülni fog."
echo "👉 https://atteszp-beep.github.io/spaceinvansion/"
