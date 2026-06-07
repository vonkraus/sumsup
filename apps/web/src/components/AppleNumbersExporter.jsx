import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Copy, Download, Apple } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { buildCategoryFormulas, buildSummaryFormulas, formatCurrencyCell } from '@/lib/spreadsheetFormulaBuilder';

function AppleNumbersExporter({ income, categories, spreadsheetName }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const getSafeFilename = () => {
    const baseName = spreadsheetName ? spreadsheetName.trim() : 'Budget';
    const safeName = baseName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `${safeName}_formulas.csv`;
  };

  const generateCSV = () => {
    const colCategory = t('export.col_category') || 'Category';
    const colAmount = t('export.col_amount') || 'Amount';
    const colPercent = t('export.col_percent') || 'Percentage';

    let csv = `Budget Summary,${spreadsheetName || 'Budget'}\n`;
    csv += `Total Income,${formatCurrencyCell(income, false)}\n\n`;

    csv += `${colCategory},${colAmount},${colPercent}\n`;

    // Row mapping: 
    // 1: Budget Summary
    // 2: Total Income
    // 3: Blank
    // 4: Headers
    // 5: First Category
    let currentRow = 5;
    categories.forEach(cat => {
      const formulas = buildCategoryFormulas(currentRow, '$B$2', true);
      const safeName = cat.name.includes(',') ? `"${cat.name}"` : cat.name;
      csv += `${safeName},${formatCurrencyCell(cat.amount, false)},${formulas.percentage}\n`;
      currentRow++;
    });

    const sumFormulas = buildSummaryFormulas(5, currentRow - 1, '$B$2', true);
    csv += `\nTotal Expenses,${sumFormulas.totalExpenses},\n`;
    csv += `Remaining Balance,${sumFormulas.remainingBalance},\n`;

    return csv;
  };

  const handleCopyToClipboard = async () => {
    try {
      const csv = generateCSV();
      await navigator.clipboard.writeText(csv);
      toast.success(t('export.csv_copied'));
    } catch (error) {
      console.error('Copy error:', error);
      toast.error(t('export.copy_failed'));
    }
  };

  const handleDownloadCSV = () => {
    try {
      const csv = generateCSV();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', getSafeFilename());
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(t('export.csv_downloaded'));
    } catch (error) {
      console.error('Download error:', error);
      toast.error(t('export.download_failed'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="w-full sm:w-auto transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          disabled={categories.length === 0}
        >
          <Apple className="mr-2 h-4 w-4" />
          {t('export.numbers')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('export.numbers')}</DialogTitle>
          <DialogDescription>
            {t('export.follow_steps_apple')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <p className="text-sm font-medium">{t('export.apple_step1')}</p>
            <div className="flex gap-2">
              <Button 
                onClick={handleDownloadCSV}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <Download className="mr-2 h-4 w-4" />
                {t('export.download_csv')}
              </Button>
              <Button 
                onClick={handleCopyToClipboard}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <Copy className="mr-2 h-4 w-4" />
                {t('export.copy')}
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium mb-2">{t('export.apple_step2')}</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>{t('export.apple_inst1')}</li>
              <li>{t('export.apple_inst2')}</li>
              <li>{t('export.apple_inst3')}</li>
              <li>{t('export.apple_inst4')}</li>
            </ul>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium mb-2">{t('export.apple_step3')}</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>{t('export.apple_alt1')}</li>
              <li>{t('export.apple_alt2')}</li>
              <li>{t('export.apple_alt3')}</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AppleNumbersExporter;