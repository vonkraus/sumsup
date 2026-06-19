const SNAPSHOT_PREFIX = 'sumsup_budget_';
const SESSION_MONTH_KEY = 'sumsup_session_month';

export function currentMonthKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export function snapshotLabel(monthKey, spreadsheetName) {
  if (spreadsheetName?.trim()) return spreadsheetName.trim();
  const [year, month] = monthKey.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  const monthName = date.toLocaleString('default', { month: 'long' });
  return `Sumsup_${monthName}_${year}`;
}

export function getSessionMonth() {
  return localStorage.getItem(SESSION_MONTH_KEY) || null;
}

export function setSessionMonth(monthKey) {
  localStorage.setItem(SESSION_MONTH_KEY, monthKey);
}

export function saveSnapshot(monthKey, data) {
  try {
    const label = snapshotLabel(monthKey, data.spreadsheetName);
    localStorage.setItem(
      `${SNAPSHOT_PREFIX}${label}`,
      JSON.stringify({ ...data, monthKey, label, savedAt: Date.now() })
    );
  } catch {}
}

export function deleteSnapshot(label) {
  localStorage.removeItem(`${SNAPSHOT_PREFIX}${label}`);
}

export function getAllSnapshots() {
  const snapshots = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(SNAPSHOT_PREFIX)) continue;
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (!data?.monthKey) continue;
      snapshots.push(data);
    } catch {}
  }
  return snapshots.sort((a, b) => (b.monthKey ?? '').localeCompare(a.monthKey ?? ''));
}

export function formatMonthKey(monthKey) {
  const [year, month] = monthKey.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}
