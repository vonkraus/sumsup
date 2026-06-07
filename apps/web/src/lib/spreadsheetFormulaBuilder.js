/**
 * Utility functions for generating format-agnostic spreadsheet formulas.
 * Supports Excel (.xlsx) and CSV-based imports for Google Sheets / Apple Numbers.
 */

/**
 * Builds formula strings for a single category row.
 * 
 * @param {number} categoryIndex - The 1-based row index in the spreadsheet.
 * @param {string} totalIncomeCell - The reference to the total income cell (e.g. '$B$2').
 * @param {boolean} usePrefix - Whether to prepend '=' for string-based formulas (used in CSV).
 * @returns {object} Object containing strings for amount and percentage formulas.
 */
export const buildCategoryFormulas = (categoryIndex, totalIncomeCell, usePrefix = false) => {
  const prefix = usePrefix ? '=' : '';
  return {
    amount: `${prefix}B${categoryIndex}`,
    percentage: `${prefix}B${categoryIndex}/${totalIncomeCell}*100`
  };
};

/**
 * Builds summary formulas for the bottom totals rows.
 * 
 * @param {number} startRow - The 1-based row index of the first category.
 * @param {number} endRow - The 1-based row index of the last category.
 * @param {string} totalIncomeCell - The reference to the total income cell (e.g. '$B$2').
 * @param {boolean} usePrefix - Whether to prepend '=' for string-based formulas (used in CSV).
 * @returns {object} Object containing strings for total expenses and remaining balance formulas.
 */
export const buildSummaryFormulas = (startRow, endRow, totalIncomeCell, usePrefix = false) => {
  const prefix = usePrefix ? '=' : '';
  const sumExpenses = `SUM(B${startRow}:B${endRow})`;
  return {
    totalExpenses: `${prefix}${sumExpenses}`,
    remainingBalance: `${prefix}${totalIncomeCell}-${sumExpenses}`
  };
};

/**
 * Formats a raw numeric value into a cell-compatible structure or formatted string.
 * 
 * @param {number} value - The numeric value to format.
 * @param {boolean} isExcel - True if generating an object for xlsx; false for raw CSV.
 * @returns {object|string} The formatted object (Excel) or numeric string (CSV).
 */
export const formatCurrencyCell = (value, isExcel = false) => {
  if (isExcel) {
    return { v: value, t: 'n', z: '"$"#,##0.00' };
  }
  return Number(value).toFixed(2);
};

/**
 * Formats a raw percentage value into a cell-compatible structure or formatted string.
 * 
 * @param {number} value - The numeric value to format.
 * @param {boolean} isExcel - True if generating an object for xlsx; false for raw CSV.
 * @returns {object|string} The formatted object (Excel) or numeric string (CSV).
 */
export const formatPercentageCell = (value, isExcel = false) => {
  if (isExcel) {
    // 0.00"%" displays 5 as 5.00% without dividing by 100 internally like a standard % format would
    return { v: value, t: 'n', z: '0.00"%"' };
  }
  return Number(value).toFixed(2);
};