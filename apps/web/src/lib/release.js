const BASE = 'https://github.com/vonkraus/sumsup/releases/latest/download';
const APP_STORE = 'https://apps.apple.com/us/app/sums-up-budget-calc/id6779474644';

export const DOWNLOAD_URLS = {
  windows: `${BASE}/Sums.Up_0.6.0_x64-setup.exe`,
  macArm:  `${BASE}/Sums.Up_0.6.0_aarch64.dmg`,
  macX64:  `${BASE}/Sums.Up_0.6.0_x64.dmg`,
  all:     'https://github.com/vonkraus/sumsup/releases/latest',
  android: 'https://play.google.com/store/apps/details?id=com.sumsup.app',
  ios:     APP_STORE,
};
