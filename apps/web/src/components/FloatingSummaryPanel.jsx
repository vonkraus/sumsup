import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart } from 'lucide-react';

export default function FloatingSummaryPanel({ 
  incomeType = 'Salary', 
  monthlyIncome = 0, 
  totalMonthlyExpenses = 0, 
  remainingBalance = 0 
}) {
  const isNegative = remainingBalance < 0;

  // Format the income type label based on the selection
  const displayIncomeType = incomeType === 'Freelance' ? 'Freelance Income' : incomeType;

  return (
    <div className="floating-summary-panel">
      <Card className="shadow-lg border border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            Quick Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {displayIncomeType}
            </p>
            <p className="text-2xl font-bold tracking-tight text-foreground">
              ${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="space-y-1 pt-4 border-t">
            <p className="text-sm font-medium text-muted-foreground">
              Total Monthly Expenses
            </p>
            <p className="text-2xl font-bold tracking-tight text-foreground">
              ${totalMonthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="space-y-1 pt-4 border-t">
            <p className="text-sm font-medium text-muted-foreground">
              Remaining Balance
            </p>
            <p className={`text-2xl font-bold tracking-tight ${isNegative ? 'text-destructive' : 'text-primary'}`}>
              ${remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}