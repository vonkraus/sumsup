import React, { useState, useRef } from 'react';
import { FileSpreadsheet, FolderOpen, Trash2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { deleteSnapshot } from '@/lib/budgetHistory.js';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog.jsx';

const SWIPE_THRESHOLD = 72; // px left to trigger delete

function SwipeableRow({ children, onDelete }) {
  const [offset, setOffset] = useState(0);
  const startX = useRef(null);
  const rowRef = useRef(null);

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    if (startX.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    if (dx < 0) setOffset(Math.max(dx, -SWIPE_THRESHOLD));
  };

  const onTouchEnd = () => {
    if (offset <= -SWIPE_THRESHOLD) {
      onDelete();
    }
    setOffset(0);
    startX.current = null;
  };

  return (
    <div
      ref={rowRef}
      style={{ transform: `translateX(${offset}px)`, transition: offset === 0 ? 'transform 0.2s ease' : 'none' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
}

export default function SpreadsheetNameInput({ name, onNewBudget, snapshots, onLoadSnapshot, onDeleted }) {
  const { t } = useLanguage();
  const [confirmDelete, setConfirmDelete] = useState(null); // { label, displayName }

  const handleDelete = () => {
    deleteSnapshot(confirmDelete.label);
    setConfirmDelete(null);
    onDeleted();
  };

  const handleSwipeDelete = (label, displayName) => {
    deleteSnapshot(label);
    onDeleted();
  };

  return (
    <>
      <div className="bg-card rounded-xl border shadow-sm">
        {/* Name input row */}
        <div className="flex items-center gap-3 p-4">
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => onNewBudget(e.target.value)}
            placeholder="Name your Budget"
            className="spreadsheet-name-input w-full px-3 py-1.5 rounded-md"
            aria-label="Budget Name"
          />
        </div>

        {/* Saved budgets */}
        <div className="border-t border-border/60 px-4 pb-4 pt-3">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
            Saved Budgets
          </p>
          {snapshots.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Name your budget above to start saving it locally on this device.
            </p>
          ) : (
            <ul className="space-y-2">
              {snapshots.map((snapshot) => {
                const { label, monthKey, spreadsheetName, income, incomePeriod } = snapshot;
                const displayName = spreadsheetName?.trim() || monthKey;
                const monthly = incomePeriod === 'yearly' ? income / 12 : income;
                return (
                  <SwipeableRow
                    key={label}
                    onDelete={() => handleSwipeDelete(label, displayName)}
                  >
                    <div
                      className="flex items-center justify-between border border-border/60 bg-muted/30 px-3 py-2.5 cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                      onClick={() => onLoadSnapshot(snapshot)}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FolderOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                          {monthly > 0 && (
                            <p className="text-xs text-muted-foreground">
                              ${monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })} / mo income
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-0 text-muted-foreground hover:text-destructive shrink-0 ml-3 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setConfirmDelete({ label, displayName }); }}
                        aria-label={`Delete ${displayName}`}
                      >
                        <ArrowLeft className="h-3 w-3" />
                        <span className="text-xs mx-1">/</span>
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </SwipeableRow>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <AlertDialog open={!!confirmDelete} onOpenChange={open => !open && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {confirmDelete?.displayName ?? ''}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this saved budget from your device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
