// Returns true when the app is running inside a Tauri WebView (desktop app)
// rather than a normal web browser. Used to hide web-only UI like cookie
// consent banners and AdSense disclosures from the desktop build.
export const isTauri = () => {
  if (typeof window === 'undefined') return false;
  return Boolean(window.__TAURI_INTERNALS__ || window.__TAURI__);
};
