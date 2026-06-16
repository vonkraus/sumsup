#!/bin/bash
# Archives, exports, and verifies a release IPA. Fails loudly on any error --
# this used to swallow xcodebuild failures (`| xcpretty || true`) and silently
# re-export a stale archive from a previous run. Don't reintroduce that pattern.
set -euo pipefail

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
FINAL_IPA="$OUTPUTS_DIR/${BUNDLE_ID}-${VERSION}.ipa"
APP_PATH="$ARCHIVE_PATH/Products/Applications/${SCHEME}.app"

echo "Building iOS $BUNDLE_ID v$VERSION..."

# Wipe any previous output for this version first. A failed run must never be
# mistaken for a fresh success by silently reusing a stale archive/IPA on disk.
rm -rf "$ARCHIVE_PATH" "$EXPORT_PATH" "$FINAL_IPA"
mkdir -p "$OUTPUTS_DIR/archive" "$OUTPUTS_DIR/ipa"

# Pipe through xcpretty for readability if it's installed, but never swallow
# the real exit code -- pipefail (above) makes the pipeline fail if either
# side fails, and there is no `|| true` anywhere in this script.
run_xcodebuild() {
    if command -v xcpretty >/dev/null 2>&1; then
        "$@" | xcpretty
    else
        "$@"
    fi
}

echo "Archiving..."
run_xcodebuild xcodebuild archive \
    -project "$PROJECT" \
    -scheme "$SCHEME" \
    -sdk iphoneos \
    -configuration Release \
    -archivePath "$ARCHIVE_PATH"

if [ ! -d "$APP_PATH" ]; then
    echo "ERROR: archive step did not produce $APP_PATH"
    exit 1
fi

echo "Verifying code signature..."
codesign --verify --deep --strict "$APP_PATH"

echo "Exporting IPA..."
run_xcodebuild xcodebuild -exportArchive \
    -archivePath "$ARCHIVE_PATH" \
    -exportPath "$EXPORT_PATH" \
    -exportOptionsPlist "$EXPORT_OPTIONS"

IPA_SRC=$(find "$EXPORT_PATH" -name "*.ipa" | head -1)
if [ -z "$IPA_SRC" ]; then
    echo "ERROR: IPA not found in $EXPORT_PATH"
    exit 1
fi

cp "$IPA_SRC" "$FINAL_IPA"
echo "Output: $FINAL_IPA"
