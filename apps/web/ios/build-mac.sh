#!/bin/bash
# Builds and uploads a Mac (Designed for iPad) archive to App Store Connect.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/App" && pwd)"
PROJECT="$PROJECT_DIR/Sums Up.xcodeproj"
SCHEME="Sums Up"
BUNDLE_ID="com.sumsup.app"
EXPORT_OPTIONS="$(cd "$(dirname "$0")" && pwd)/ExportOptions-mac.plist"
OUTPUTS_DIR="$(cd "$(dirname "$0")" && pwd)/outputs"

VERSION=$(grep -m1 'MARKETING_VERSION' "$PROJECT/project.pbxproj" | awk -F' = ' '{gsub(/;/,"",$2); print $2}' | xargs)
ARCHIVE_PATH="$OUTPUTS_DIR/archive/${BUNDLE_ID}-${VERSION}-mac.xcarchive"
EXPORT_PATH="$OUTPUTS_DIR/mac/${BUNDLE_ID}-${VERSION}-mac"

echo "Building Mac (Designed for iPad) $BUNDLE_ID v$VERSION..."

rm -rf "$ARCHIVE_PATH" "$EXPORT_PATH"
mkdir -p "$OUTPUTS_DIR/archive" "$OUTPUTS_DIR/mac"

run_xcodebuild() {
    if command -v xcpretty >/dev/null 2>&1; then
        "$@" | xcpretty
    else
        "$@"
    fi
}

echo "Archiving for Mac..."
run_xcodebuild xcodebuild archive \
    -project "$PROJECT" \
    -scheme "$SCHEME" \
    -destination "platform=macOS,id=00006041-000C106E0131801C" \
    -configuration Release \
    -archivePath "$ARCHIVE_PATH" \
    CODE_SIGN_STYLE=Automatic \
    DEVELOPMENT_TEAM=AFHC4AF39T

echo "Exporting and uploading to App Store Connect..."
run_xcodebuild xcodebuild -exportArchive \
    -archivePath "$ARCHIVE_PATH" \
    -exportPath "$EXPORT_PATH" \
    -exportOptionsPlist "$EXPORT_OPTIONS"

echo "Done. Archive: $ARCHIVE_PATH"
