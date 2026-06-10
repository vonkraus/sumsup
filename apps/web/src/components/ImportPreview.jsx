import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, AlertTriangle } from 'lucide-react';

export default function ImportPreview({ isOpen, onOpenChange, data, onConfirm }) {
  if (!data) return null;

  const totalCategories = data.categories?.length || 0;
  const totalExpenses = data.categories?.reduce((sum, cat) => sum + cat.amount, 0) || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>Preview Import</DialogTitle>
          <DialogDescription>
            Review the data found in your file. Confirm to apply these to your budget.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm border border-amber-500/20">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Session Only:</strong> This data is temporary. Applying this import will replace your current session data, but it will NOT be permanently saved to a database.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 py-1">
          <div className="bg-muted p-4 rounded-xl border">
            <p className="text-sm text-muted-foreground font-medium mb-1">Detected Income</p>
            <p className="text-2xl font-bold text-foreground">
              ${data.income.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-xl border">
            <p className="text-sm text-muted-foreground font-medium mb-1">Detected Expenses ({totalCategories} items)</p>
            <p className="text-2xl font-bold text-foreground">
              ${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {totalCategories === 0 && data.income === 0 && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm font-medium">No valid data found to import. Please check your file format.</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto border rounded-xl relative mt-2">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Group</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.categories?.length > 0 ? (
                data.categories.map((cat, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{cat.name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{cat.group || 'NEEDS'}</TableCell>
                    <TableCell className="text-right">
                      ${cat.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="mt-2 pt-2 border-t shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={totalCategories === 0 && data.income === 0}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Check className="w-4 h-4 mr-2" />
            Import & Replace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}