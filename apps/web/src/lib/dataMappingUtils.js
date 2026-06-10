const cleanNumber = (val) => {
  if (val === null || val === undefined || val === '') return NaN;
  if (typeof val === 'number') return val;
  return Number(String(val).replace(/[^0-9.-]+/g, ''));
};

export const mapImportedDataToCalculator = (rawParsedData, filename) => {
  let income = 0;
  const categories = [];

  // Handle structured JSON (our own JSON export format)
  if (!Array.isArray(rawParsedData) && typeof rawParsedData === 'object') {
    if (rawParsedData.income !== undefined || rawParsedData.categories) {
      return {
        income: Number(rawParsedData.income) || 0,
        categories: Array.isArray(rawParsedData.categories)
          ? rawParsedData.categories.map(c => ({
              id: c.id || Math.random().toString(36).substring(2, 9),
              name: c.name || 'Unnamed Category',
              amount: Number(c.amount) || 0,
              group: c.group || 'NEEDS',
              billingPeriod: c.billingPeriod || 'monthly'
            }))
          : []
      };
    }
  }

  if (Array.isArray(rawParsedData)) {
    // Array of objects (generic JSON)
    if (rawParsedData.length > 0 && !Array.isArray(rawParsedData[0]) && typeof rawParsedData[0] === 'object') {
      rawParsedData.forEach(row => {
        const name = row.Category || row.category || row.name || row.Name;
        const amount = cleanNumber(row.Amount || row.amount || row.Value || row.value);
        if (name && !isNaN(amount) && amount > 0) {
          if (String(name).toLowerCase().includes('income')) {
            income += amount;
          } else {
            categories.push({
              id: Math.random().toString(36).substring(2, 9),
              name: String(name),
              amount,
              group: row.Group || row.group || 'NEEDS',
              billingPeriod: row.BillingPeriod || row.billingPeriod || 'monthly'
            });
          }
        }
      });
      return { income, categories };
    }

    // 2D Array from Excel/CSV
    let isHeaderFound = false;
    let nameIndex = 0;
    let amountIndex = 1;

    for (const row of rawParsedData) {
      if (!row || row.length === 0) continue;

      const firstCell = String(row[0] || '').trim();
      if (!firstCell) continue;

      // Detect header row
      if (!isHeaderFound) {
        const rowLower = row.map(c => String(c || '').toLowerCase());
        const hasCategory = rowLower.some(c => c.includes('category') || c.includes('name'));
        const hasAmount = rowLower.some(c => c.includes('amount') || c.includes('value'));

        if (hasCategory || hasAmount) {
          isHeaderFound = true;
          const catIdx = rowLower.findIndex(c => c.includes('category') || c.includes('name'));
          const amtIdx = rowLower.findIndex(c => c.includes('amount') || c.includes('value'));
          if (catIdx >= 0) nameIndex = catIdx;
          if (amtIdx >= 0) amountIndex = amtIdx;
          console.log('Header found, nameIndex:', nameIndex, 'amountIndex:', amountIndex);
          continue;
        }
      }

      const possibleAmount = cleanNumber(row[amountIndex]);

      // Total Income row
      if (firstCell.toLowerCase() === 'total income' && !isNaN(possibleAmount)) {
        income = possibleAmount;
        console.log('Income found:', income);
        continue;
      }

      // Skip summary/header rows
      if (
        firstCell.toLowerCase().includes('total') ||
        firstCell.toLowerCase().includes('balance') ||
        firstCell.toLowerCase().includes('budget summary') ||
        firstCell.toLowerCase().includes('category') ||
        firstCell.toLowerCase().includes('remaining')
      ) continue;

      // Valid category row
      if (firstCell && !isNaN(possibleAmount) && possibleAmount > 0) {
        categories.push({
          id: Math.random().toString(36).substring(2, 9),
          name: firstCell,
          amount: possibleAmount,
          group: 'NEEDS',
          billingPeriod: 'monthly'
        });
        console.log('Category added:', firstCell, possibleAmount);
      }
    }
  }

  console.log('Import result - income:', income, 'categories:', categories.length);

  if (categories.length === 0 && income === 0) {
    throw new Error('Could not find recognizable budget data. Ensure columns are named "Category" and "Amount".');
  }

  return { income, categories };
};
