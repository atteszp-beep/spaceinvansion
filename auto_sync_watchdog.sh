#!/data/data/com.termux/files/usr/bin/bash

echo "🛡️ AUTO SYNC WATCHDOG STARTED"

while true; do
    echo "🚀 Starting auto_sync..."

    ./auto_sync.sh

    echo "⚠️ auto_sync crashed or stopped!"
    echo "🔄 Restarting in 3 seconds..."

    sleep 3
done
