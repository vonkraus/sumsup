import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { UploadCloud, FileSpreadsheet, FileJson, FileText, AlertCircle, AlertTriangle } from 'lucide-react';
import { parseFile } from '@/lib/fileParser.js';
import { mapImportedDataToCalculator } from '@/lib/dataMappingUtils.js';
import { toast } from 'sonner';
import { isNativeApp } from '@/lib/platform.js';

export default function FileImporter({ isOpen, onOpenChange, onDataReady }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const rawData = await parseFile(file);
      const mappedData = mapImportedDataToCalculator(rawData, file.name);
      mappedData.suggestedName = file.name.replace(/\.[^/.]+$/, '');
      
      toast.success('File parsed successfully');
      onDataReady(mappedData);
      onOpenChange(false);
    } catch (error) {
      console.error('Import error:', error);
      toast.error(error.message || 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  }, [onDataReady, onOpenChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv'],
      'application/json': ['.json']
    },
    multiple: false
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Budget Data</DialogTitle>
          <DialogDescription>
            Upload your previously exported file or a custom spreadsheet to populate your budget.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 p-3 mt-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm border border-amber-500/20">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Temporary Data:</strong> Imported budget data is NOT saved to a database. {isNativeApp() ? 'It will be cleared when you close the app.' : 'It will be lost when you close or refresh this page.'}
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`
            mt-2 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer
            transition-all duration-200 ease-in-out
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 hover:bg-muted'}
            ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <div className="flex gap-2 text-muted-foreground mb-2">
              <FileSpreadsheet className="w-8 h-8" />
              <FileText className="w-8 h-8" />
              <FileJson className="w-8 h-8" />
            </div>
            
            {isProcessing ? (
              <p className="text-sm font-medium animate-pulse">Processing file...</p>
            ) : isDragActive ? (
              <p className="text-sm font-medium text-primary">Drop the file here</p>
            ) : (
              <>
                <p className="text-sm font-medium">
                  Drag & drop a file here, or click to select
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports .xlsx, .xls, .csv, and .json
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            Ensure your spreadsheet has at least <strong>Category</strong> and <strong>Amount</strong> columns for the best results.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}