import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { History, Trash2 } from 'lucide-react';
import { deleteSnapshot, formatMonthKey } from '@/lib/budgetHistory.js';
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

export function SavedMonthsCard({ snapshots, onDeleted }) {
  const [confirmDelete, setConfirmDelete] = useState(null); // { label, displayName }

  const handleDelete = () => {
    deleteSnapshot(confirmDelete.label);
    setConfirmDelete(null);
    onDeleted();
  };

  return (
    <>
      <Card className="shadow-lg bg-card border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-secondary" />
            Saved Months
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-4">
            Your budget history is saved locally on this device — never on a server.
          </p>
          {snapshots.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved months yet. When a new month begins you'll be prompted to save your budget here.</p>
          ) : null}
          <ul className="space-y-2">
            {snapshots.map(({ label, monthKey, spreadsheetName, income, incomePeriod }) => {
              const monthly = incomePeriod === 'yearly' ? income / 12 : income;
              const displayName = spreadsheetName?.trim() || formatMonthKey(monthKey);
              return (
                <li
                  key={label}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{displayName}</p>
                    {monthly > 0 && (
                      <p className="text-xs text-muted-foreground">
                        ${monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })} / mo income
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => setConfirmDelete({ label, displayName })}
                    aria-label={`Delete ${displayName}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

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
