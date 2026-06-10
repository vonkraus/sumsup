import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const parseExcelFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellFormula: false });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: '',
          blankrows: false,
          raw: false
        });
        console.log('XLSX parsed rows:', jsonData.length, 'first row:', JSON.stringify(jsonData[0]));
        resolve(jsonData);
      } catch (error) {
        console.error('XLSX parse error:', error);
        reject(new Error('Failed to parse Excel file. The file might be corrupted.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsArrayBuffer(file);
  });
};

export const parseCSVFile = async (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('CSV parsed rows:', results.data.length, 'first row:', JSON.stringify(results.data[0]));
        if (results.errors && results.errors.length > 0) {
          reject(new Error('Failed to parse CSV file: ' + results.errors[0].message));
        } else {
          resolve(results.data);
        }
      },
      error: (error) => reject(new Error('Failed to read CSV file: ' + error.message))
    });
  });
};

export const parseJSONFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        console.log('JSON parsed:', JSON.stringify(jsonData).substring(0, 100));
        resolve(jsonData);
      } catch (error) {
        reject(new Error('Invalid JSON format. Please ensure the file contains valid JSON.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
};

export const parseFile = async (file) => {
  if (!file) throw new Error('No file provided.');
  const extension = file.name.split('.').pop().toLowerCase();
  console.log('Importing file:', file.name, 'extension:', extension, 'size:', file.size);
  switch (extension) {
    case 'xlsx':
    case 'xls':
      return await parseExcelFile(file);
    case 'csv':
      return await parseCSVFile(file);
    case 'json':
      return await parseJSONFile(file);
    default:
      throw new Error(`Unsupported file type: .${extension}. Please upload .xlsx, .xls, .csv, or .json files.`);
  }
};
