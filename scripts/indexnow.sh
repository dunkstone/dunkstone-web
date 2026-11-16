#!/bin/sh
# Tells Bing and the other IndexNow engines that the site's pages changed.
# Run after a push that adds or changes pages, once Vercel has deployed it.
# With no arguments it sends every URL in dist/sitemap.xml; or pass URLs.
set -eu
cd "$(dirname "$0")/.."
key_file=$(ls dist | grep -E '^[0-9a-f]{32}\.txt$' | head -n 1)
key=${key_file%.txt}
if [ "$#" -gt 0 ]; then urls="$*"; else urls=$(grep -o '<loc>[^<]*</loc>' dist/sitemap.xml | sed 's/<[^>]*>//g'); fi
list=$(printf '%s\n' $urls | sed 's/.*/"&"/' | paste -sd, -)
body="{\"host\":\"dunkstone.com\",\"key\":\"$key\",\"keyLocation\":\"https://dunkstone.com/$key_file\",\"urlList\":[$list]}"
status=$(curl -s -o /dev/null -w '%{http_code}' -X POST https://api.indexnow.org/indexnow \
  -H 'Content-Type: application/json; charset=utf-8' --data "$body")
echo "IndexNow answered $status for: $urls"
# 200 or 202 means accepted. 403: the key file isn't live yet. 422: a URL isn't on dunkstone.com.
case "$status" in 200|202) ;; *) exit 1 ;; esac
