import { isNativeApp } from '@/lib/platform.js';

const webDownload = (data, filename, mimeType, isBase64) => {
  let blob;
  if (isBase64) {
    const byteChars = atob(data);
    const byteArrays = [];
    for (let i = 0; i < byteChars.length; i += 512) {
      const slice = byteChars.slice(i, i + 512);
      const byteNums = new Array(slice.length);
      for (let j = 0; j < slice.length; j++) byteNums[j] = slice.charCodeAt(j);
      byteArrays.push(new Uint8Array(byteNums));
    }
    blob = new Blob(byteArrays, { type: mimeType });
  } else {
    blob = new Blob([data], { type: mimeType });
  }
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const ensureDirectory = async (Filesystem, Directory) => {
  try {
    await Filesystem.mkdir({ path: '', directory: Directory.Documents, recursive: true });
  } catch (e) {
    // Directory already exists — that's fine
  }
};

export const saveFile = async ({ filename, data, mimeType, isBase64 = false }) => {
  if (isNativeApp()) {
    const { Filesystem, Directory, Encoding } = await import('@capacitor/filesystem');
    const { Share } = await import('@capacitor/share');
    await ensureDirectory(Filesystem, Directory);
    const writeOptions = { path: filename, data, directory: Directory.Documents };
    if (!isBase64) writeOptions.encoding = Encoding.UTF8;
    const result = await Filesystem.writeFile(writeOptions);
    await Share.share({ title: filename, url: result.uri, dialogTitle: 'Save your budget file' });
  } else {
    webDownload(data, filename, mimeType, isBase64);
  }
};

export const saveToFiles = async ({ filename, data, mimeType, isBase64 = false }) => {
  if (isNativeApp()) {
    const { Filesystem, Directory, Encoding } = await import('@capacitor/filesystem');
    await ensureDirectory(Filesystem, Directory);
    const writeOptions = { path: filename, data, directory: Directory.Documents };
    if (!isBase64) writeOptions.encoding = Encoding.UTF8;
    await Filesystem.writeFile(writeOptions);
    return filename;
  } else {
    webDownload(data, filename, mimeType, isBase64);
    return null;
  }
};
