// Returns true when running inside a native app wrapper (Tauri desktop or Capacitor mobile)
// rather than a regular web browser. Used to hide web-only UI like cookie consent
// banners and AdSense disclosures.
export const isTauri = () => {
  if (typeof window === 'undefined') return false;
  return Boolean(window.__TAURI_INTERNALS__ || window.__TAURI__);
};

export const isCapacitor = () => {
  if (typeof window === 'undefined') return false;
  return Boolean(window.Capacitor?.isNativePlatform?.());
};

export const isNativeApp = () => isTauri() || isCapacitor();
