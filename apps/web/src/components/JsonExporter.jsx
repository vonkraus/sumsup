import React from 'react';
import { Button } from '@/components/ui/button';
import { FileJson } from 'lucide-react';
import { toast } from 'sonner';
import { saveFile, saveToFiles } from '@/lib/download.js';
import { isNativeApp } from '@/lib/platform.js';

function JsonExporter({ income, incomePeriod, categories, spreadsheetName }) {
  const getSafeFilename = () => {
    const baseName = spreadsheetName ? spreadsheetName.trim() : 'Budget';
    const safeName = baseName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `${safeName}_backup.json`;
  };

  const handleExport = async () => {
    try {
      const exportData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        spreadsheetName: spreadsheetName || '',
        income,
        incomePeriod: incomePeriod || 'monthly',
        categories: categories.map(c => ({
          id: c.id,
          name: c.name,
          amount: c.amount,
          group: c.group,
          billingPeriod: c.billingPeriod
        }))
      };

      if (isNativeApp()) {
        const savedPath = await saveToFiles({
          filename: getSafeFilename(),
          data: JSON.stringify(exportData, null, 2),
          mimeType: 'application/json'
        });
        if (savedPath) toast.success(`Saved to your Documents folder: ${savedPath}`);
      } else {
        await saveFile({
          filename: getSafeFilename(),
          data: JSON.stringify(exportData, null, 2),
          mimeType: 'application/json'
        });
        toast.success('Budget backed up as JSON');
      }
    } catch (error) {
      console.error('JSON export error:', error);
      toast.error('Failed to export JSON backup');
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      className="w-full sm:w-auto transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      disabled={categories.length === 0}
    >
      <FileJson className="mr-2 h-4 w-4" />
      Backup (JSON)
    </Button>
  );
}

export default JsonExporter;
