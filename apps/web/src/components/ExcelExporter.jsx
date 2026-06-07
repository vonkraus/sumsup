import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { useLanguage } from '@/contexts/LanguageContext';
import { buildCategoryFormulas, buildSummaryFormulas, formatCurrencyCell } from '@/lib/spreadsheetFormulaBuilder';

function ExcelExporter({ income, categories, spreadsheetName }) {
  const { t } = useLanguage();

  const getSafeFilename = () => {
    const baseName = spreadsheetName ? spreadsheetName.trim() : 'Budget';
    const safeName = baseName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `${safeName}_summary`;
  };

  const handleExport = () => {
    try {
      const sheetName = spreadsheetName ? spreadsheetName.substring(0, 31) : (t('export.spreadsheet_summary') || 'Budget Summary');

      // Budget Summary Sheet
      const colCategory = t('export.col_category') || 'Category';
      const colAmount = t('export.col_amount') || 'Amount';
      const colPercent = t('export.col_percent') || 'Percentage';
      
      const summaryData = [
        ['Budget Summary', spreadsheetName || ''],
        ['Total Income', formatCurrencyCell(income, true)],
        [],
        [colCategory, colAmount, colPercent]
      ];

      // Row tracking:
      // Row 1: Budget Summary | [Name]
      // Row 2: Total Income   | [Income]
      // Row 3: [Blank]
      // Row 4: Headers
      // Row 5: First Category -> Excel 1-based index is 5
      let currentRow = 5; 
      
      categories.forEach(cat => {
        const formulas = buildCategoryFormulas(currentRow, '$B$2', false);
        summaryData.push([
          cat.name,
          formatCurrencyCell(cat.amount, true),
          { t: 'n', f: formulas.percentage, z: '0.00"%"' }
        ]);
        currentRow++;
      });

      // Append summary totals rows
      const sumFormulas = buildSummaryFormulas(5, currentRow - 1, '$B$2', false);
      
      summaryData.push([]); // Blank row for spacing
      summaryData.push([
        'Total Expenses',
        { t: 'n', f: sumFormulas.totalExpenses, z: '"$"#,##0.00' },
        ''
      ]);
      summaryData.push([
        'Remaining Balance',
        { t: 'n', f: sumFormulas.remainingBalance, z: '"$"#,##0.00' },
        ''
      ]);

      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      summarySheet['!cols'] = [
        { wch: 25 },
        { wch: 15 },
        { wch: 15 }
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, summarySheet, sheetName);

      XLSX.writeFile(workbook, `${getSafeFilename()}.xlsx`);

      toast.success(t('export.excel_success') || 'Excel file exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error(t('export.excel_failed') || 'Failed to export Excel file');
    }
  };

  return (
    <Button 
      onClick={handleExport}
      className="w-full sm:w-auto transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      disabled={categories.length === 0}
    >
      <Download className="mr-2 h-4 w-4" />
      {t('export.excel')}
    </Button>
  );
}

export default ExcelExporter;