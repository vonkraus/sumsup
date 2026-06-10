'use strict';
// Cross-platform wrapper for generate-llms.js
// Replaces "|| true" which doesn't work in Windows cmd.exe
try {
  require('./generate-llms.js');
} catch (e) {
  console.log('prebuild step skipped:', e.message);
}
