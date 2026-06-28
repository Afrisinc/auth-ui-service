#!/bin/sh
set -e

CONFIG_FILE="/usr/share/nginx/html/config.json"

echo "Injecting runtime environment variables..."

sed -i "s|__VITE_API_URL__|${VITE_API_URL:-}|g" "$CONFIG_FILE"

echo "Environment injection complete:"
cat "$CONFIG_FILE"

exec nginx -g "daemon off;"
