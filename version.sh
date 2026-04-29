#!/bin/bash

# =========================
# AUTO VERSION SYSTEM
# =========================

VERSION_FILE="version.txt"

# ha nincs version file → alap 1.0
if [ ! -f "$VERSION_FILE" ]; then
  echo "1.0" > $VERSION_FILE
fi

VERSION=$(cat $VERSION_FILE)

# split major.minor
MAJOR=$(echo $VERSION | cut -d'.' -f1)
MINOR=$(echo $VERSION | cut -d'.' -f2)

# növelés (minor +1)
MINOR=$((MINOR + 1))

NEW_VERSION="$MAJOR.$MINOR"

echo "🧠 Current version: $VERSION"
echo "🚀 New version: $NEW_VERSION"

# mentés file-ba
echo $NEW_VERSION > $VERSION_FILE

# git commit
git add .

read -p "Commit message: " msg

git commit -m "v$NEW_VERSION - $msg"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ DONE -> Version: $NEW_VERSION"
