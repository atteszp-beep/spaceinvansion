#!/bin/bash

echo "🚀 scifi_aaa auto deploy indul..."

# minden fájl hozzáadása
git add .

# commit üzenet időbélyeggel
git commit -m "auto deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# push GitHubra
git push

echo "✅ kész! feltöltve GitHubra."
