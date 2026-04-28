#!/bin/bash

echo "🚀 GitHub Pages deploy..."

git add .

git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

git push

echo "🌐 deployed to GitHub Pages!"
echo "👉 https://atteszp-beep.github.io/spaceinvansion/"
