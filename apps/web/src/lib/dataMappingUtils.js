export const mapImportedDataToCalculator = (rawParsedData, filename) => {
  let income = 0;
  const categories = [];
  
  // Handle JSON structurally if it matches our expected export shape
  if (!Array.isArray(rawParsedData) && typeof rawParsedData === 'object') {
    if (rawParsedData.income !== undefined || rawParsedData.categories) {
      return {
        income: Number(rawParsedData.income) || 0,
        categories: Array.isArray(rawParsedData.categories) ? rawParsedData.categories.map(c => ({
          id: c.id || Math.random().toString(36).substring(2, 9),
          name: c.name || 'Unnamed Category',
          amount: Number(c.amount) || 0,
          group: c.group || 'NEEDS',
          billingPeriod: c.billingPeriod || 'monthly'
        })) : []
      };
    }
  }

  // Handle Array of Arrays (CSV and Excel mapped formats)
  if (Array.isArray(rawParsedData)) {
    // Check if it's an array of objects (from generic JSON imports)
    if (rawParsedData.length > 0 && !Array.isArray(rawParsedData[0]) && typeof rawParsedData[0] === 'object') {
      rawParsedData.forEach(row => {
        const name = row.Category || row.name || row.Name;
        const amount = Number(row.Amount || row.amount || row.Value || row.value);
        if (name && !isNaN(amount)) {
          if (name.toLowerCase().includes('income')) {
            income += amount;
          } else {
            categories.push({
              id: Math.random().toString(36).substring(2, 9),
              name: String(name),
              amount: amount,
              group: row.Group || row.group || 'NEEDS',
              billingPeriod: row.BillingPeriod || row.billingPeriod || 'monthly'
            });
          }
        }
      });
      return { income, categories };
    }

    // Handle 2D Array (from Excel/CSV parse)
    let isHeaderFound = false;
    let nameIndex = 0;
    let amountIndex = 1;

    rawParsedData.forEach(row => {
      if (!row || row.length === 0) return;

      // Detect header row
      if (!isHeaderFound) {
        const rowString = row.join(' ').toLowerCase();
        if (rowString.includes('category') || rowString.includes('amount')) {
          isHeaderFound = true;
          nameIndex = row.findIndex(cell => typeof cell === 'string' && cell.toLowerCase().includes('category')) || 0;
          amountIndex = row.findIndex(cell => typeof cell === 'string' && cell.toLowerCase().includes('amount'));
          if (amountIndex === -1) amountIndex = 1;
          return; // Skip header row
        }
      }

      // Check for summary rows (Total Income, Total Expenses, Remaining Balance) typical of our app's export
      const firstCell = String(row[0] || '').trim();
      const possibleAmount = Number(String(row[amountIndex]).replace(/[^0-9.-]+/g, ""));

      if (firstCell.toLowerCase() === 'total income' && !isNaN(possibleAmount)) {
        income = possibleAmount;
        return;
      }
      
      if (firstCell.toLowerCase().includes('total') || firstCell.toLowerCase().includes('balance')) {
        return; // Skip summary rows
      }

      // Standard category rows
      if (firstCell && !isNaN(possibleAmount) && possibleAmount > 0) {
        // Exclude percentage strings or header artifacts
        categories.push({
          id: Math.random().toString(36).substring(2, 9),
          name: firstCell,
          amount: possibleAmount,
          group: 'NEEDS', // Default fallback
          billingPeriod: 'monthly'
        });
      }
    });
  }

  // Fallback structural validation
  if (categories.length === 0 && income === 0) {
    throw new Error('Could not find recognizable budget data. Ensure columns are named "Category" and "Amount".');
  }

  return { income, categories };
};