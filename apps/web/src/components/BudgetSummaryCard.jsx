import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Home, Gift, PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';

function BudgetSummaryCard({ income, monthlyIncome, incomePeriod, categories }) {
  const needsTotal = categories.filter(c => c.group === 'NEEDS').reduce((sum, cat) => sum + cat.amount, 0);
  const wantsTotal = categories.filter(c => c.group === 'WANTS').reduce((sum, cat) => sum + cat.amount, 0);
  const savingsTotal = categories.filter(c => c.group === 'SAVINGS').reduce((sum, cat) => sum + cat.amount, 0);
  
  const totalExpenses = needsTotal + wantsTotal + savingsTotal;
  const balance = monthlyIncome - totalExpenses;
  const expenseRatio = monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-lg border-t-4 border-t-primary">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Monthly Budget Summary
              </CardTitle>
              <CardDescription>
                Real-time overview of your normalized monthly budget allocation
              </CardDescription>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-primary-foreground bg-primary px-2 py-1 rounded-sm">
              Monthly Equivalents
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl bg-primary/10 p-4 space-y-1 flex flex-col justify-center border border-primary/20"
            >
              <p className="text-sm font-medium text-primary">
                Monthly Income
              </p>
              <p className="text-2xl font-bold text-primary">
                ${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              {incomePeriod === 'yearly' && (
                <p className="text-xs font-medium text-primary/80 mt-1">
                  (Based on ${income.toLocaleString('en-US')} Yearly)
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-xl bg-secondary p-4 space-y-1 flex flex-col justify-center border border-secondary-foreground/20"
            >
              <p className="text-sm font-medium text-secondary-foreground">Total Monthly Expenses</p>
              <p className="text-2xl font-bold text-secondary-foreground">
                ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className={`rounded-xl p-4 space-y-1 flex flex-col justify-center transition-colors duration-300 border ${
                balance >= 0 
                  ? 'bg-accent/10 border-accent/20' 
                  : 'bg-destructive/10 border-destructive/20'
              }`}
            >
              <p className={`text-sm font-medium flex items-center gap-1 ${
                balance >= 0 ? 'text-accent' : 'text-destructive'
              }`}>
                {balance >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                Remaining Balance
              </p>
              <p className={`text-2xl font-bold ${
                balance >= 0 ? 'text-accent' : 'text-destructive'
              }`}>
                ${Math.abs(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t">
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-card border text-center">
              <Home className="h-4 w-4 text-primary mb-1" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Needs</span>
              <span className="font-semibold text-foreground">
                ${needsTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-card border text-center">
              <Gift className="h-4 w-4 text-secondary-foreground mb-1" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Wants</span>
              <span className="font-semibold text-foreground">
                ${wantsTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-card border text-center">
              <PiggyBank className="h-4 w-4 text-accent mb-1" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Savings</span>
              <span className="font-semibold text-foreground">
                ${savingsTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {monthlyIncome > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Expense Ratio (vs Monthly Income)</span>
                <span className="font-medium text-card-foreground">
                  {expenseRatio.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(expenseRatio, 100)}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`h-full rounded-full transition-colors duration-300 ${
                    expenseRatio <= 80 
                      ? 'bg-primary' 
                      : expenseRatio <= 100 
                      ? 'bg-secondary-foreground' 
                      : 'bg-destructive'
                  }`}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BudgetSummaryCard;