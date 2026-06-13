#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")/App" && pwd)"
PROJECT="$PROJECT_DIR/Sums Up.xcodeproj"
SCHEME="Sums Up"
BUNDLE_ID="com.sumsup.app"
EXPORT_OPTIONS="$(cd "$(dirname "$0")" && pwd)/ExportOptions.plist"
OUTPUTS_DIR="$(cd "$(dirname "$0")" && pwd)/outputs"

# Read version from project
VERSION=$(grep -m1 'MARKETING_VERSION' "$PROJECT/project.pbxproj" | awk -F' = ' '{gsub(/;/,"",$2); print $2}' | xargs)
ARCHIVE_PATH="$OUTPUTS_DIR/archive/${BUNDLE_ID}-${VERSION}.xcarchive"
EXPORT_PATH="$OUTPUTS_DIR/ipa/${BUNDLE_ID}-${VERSION}"

echo "Building iOS $BUNDLE_ID v$VERSION..."
mkdir -p "$OUTPUTS_DIR/archive" "$OUTPUTS_DIR/ipa"

# Archive
xcodebuild archive \
    -project "$PROJECT" \
    -scheme "$SCHEME" \
    -sdk iphoneos \
    -configuration Release \
    -archivePath "$ARCHIVE_PATH" \
    | xcpretty 2>/dev/null || true

# Export IPA
xcodebuild -exportArchive \
    -archivePath "$ARCHIVE_PATH" \
    -exportPath "$EXPORT_PATH" \
    -exportOptionsPlist "$EXPORT_OPTIONS" \
    | xcpretty 2>/dev/null || true

# Copy IPA with versioned name alongside
IPA_SRC=$(find "$EXPORT_PATH" -name "*.ipa" | head -1)
if [ -n "$IPA_SRC" ]; then
    cp "$IPA_SRC" "$OUTPUTS_DIR/${BUNDLE_ID}-${VERSION}.ipa"
    echo "Output: $OUTPUTS_DIR/${BUNDLE_ID}-${VERSION}.ipa"
else
    echo "ERROR: IPA not found in $EXPORT_PATH"
    exit 1
fi
