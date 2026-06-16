#!/usr/bin/env bash
# Flags mentions of other-platform names (Android, Google Play, Windows, etc.) in the
# web app source. Run before every iOS/Android store submission. Apple rejected v1.25
# (Guideline 2.3.10) because the Capacitor-wrapped app rendered an "Android" badge and
# Windows/Mac download links verbatim — see commit 92de9f9 for the fix.
#
# This is a grep-based sanity check, not a static analyzer: it can't tell whether a hit
# is already gated behind isNativeApp()/isCapacitor(). Treat every hit as "go look at
# this line and confirm it's either gated or fine to ship inside the native apps."
#
# Usage: ./scripts/check-platform-leaks.sh

set -euo pipefail

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/apps/web/src"

# Word-boundary patterns for platform names that are irrelevant inside a native app binary.
PATTERN='\bAndroid\b|\bGoogle Play\b|\bWindows\b|\bMicrosoft\b|\bPlay Store\b'

echo "Scanning $SRC_DIR for platform-leak strings..."
echo

MATCHES=$(grep -rnE --include='*.jsx' --include='*.js' "$PATTERN" "$SRC_DIR" || true)

if [ -z "$MATCHES" ]; then
  echo "No matches found."
  exit 0
fi

echo "$MATCHES"
echo
echo "----"
echo "Found $(echo "$MATCHES" | wc -l | tr -d ' ') hit(s) above."
echo "For each: confirm it's wrapped in an isNativeApp()/isCapacitor() check (or otherwise"
echo "fine to ship inside the iOS/Android app) before submitting to App Review."
exit 1
