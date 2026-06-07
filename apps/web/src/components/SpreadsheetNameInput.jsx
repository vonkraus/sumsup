import React from 'react';
import { FileSpreadsheet, PencilLine } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

export default function SpreadsheetNameInput({ name, onChange }) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-xl border shadow-sm transition-smooth hover:shadow-md group">
      <div className="p-2 bg-primary/10 rounded-lg">
        <FileSpreadsheet className="h-5 w-5 text-primary" />
      </div>
      <div className="relative flex-1 flex items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Name your Budget"
          className="spreadsheet-name-input w-full px-3 py-1.5 rounded-md"
          aria-label="Budget Name"
        />
        <PencilLine className="absolute right-3 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
      </div>
    </div>
  );
}