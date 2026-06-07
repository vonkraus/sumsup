import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Home, Gift, PiggyBank, List, ChevronUp, ChevronDown, Check, X, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const GROUP_CONFIG = {
  NEEDS: { labelKey: 'group.needs', icon: Home, colorClass: 'text-primary', bgClass: 'bg-primary/10' },
  WANTS: { labelKey: 'group.wants', icon: Gift, colorClass: 'text-secondary', bgClass: 'bg-secondary/10' },
  SAVINGS: { labelKey: 'group.savings', icon: PiggyBank, colorClass: 'text-accent', bgClass: 'bg-accent/10' }
};

const getMonthlyAmount = (category) => {
  const amount = category.amount || 0;
  if (category.billingPeriod === 'yearly') return amount / 12;
  if (category.billingPeriod === '6-months') return amount / 6;
  return amount;
};

function CategoryRow({ category, totalMonthlyExpenses, onUpdateAmount, onUpdateName, onUpdateBillingPeriod, onDelete, onMove, isFirst, isLast }) {
  const { t } = useLanguage();
  const [localAmount, setLocalAmount] = useState(category.amount || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(category.name);

  useEffect(() => {
    const parsedLocal = parseFloat(localAmount) || 0;
    if (parsedLocal !== category.amount) {
      setLocalAmount(category.amount || '');
    }
  }, [category.amount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setEditNameValue(category.name);
  }, [category.name]);

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setLocalAmount(val);
    const parsed = parseFloat(val);
    onUpdateAmount(category.id, isNaN(parsed) ? 0 : Math.max(0, parsed));
  };

  const handleSaveName = () => {
    const trimmed = editNameValue.trim();
    if (trimmed && trimmed !== category.name) {
      onUpdateName(category.id, trimmed);
    } else {
      setEditNameValue(category.name);
    }
    setIsEditingName(false);
  };

  const handleCancelName = () => {
    setEditNameValue(category.name);
    setIsEditingName(false);
  };

  const handleKeyDownName = (e) => {
    if (e.key === 'Enter') handleSaveName();
    if (e.key === 'Escape') handleCancelName();
  };

  const monthlyEquivalent = getMonthlyAmount(category);
  const percentage = totalMonthlyExpenses > 0 ? (monthlyEquivalent / totalMonthlyExpenses) * 100 : 0;
  
  const isYearly = category.billingPeriod === 'yearly';
  const is6Months = category.billingPeriod === '6-months';
  const isMonthly = category.billingPeriod === 'monthly' || (!isYearly && !is6Months);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-background p-3 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-muted-foreground hover:text-foreground"
            onClick={() => onMove(category.id, 'up')}
            disabled={isFirst}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-muted-foreground hover:text-foreground"
            onClick={() => onMove(category.id, 'down')}
            disabled={isLast}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-2 h-8">
          {isEditingName ? (
            <div className="flex items-center gap-1 z-10 bg-background rounded-md shadow-sm border p-0.5">
              <Input
                value={editNameValue}
                onChange={(e) => setEditNameValue(e.target.value)}
                onKeyDown={handleKeyDownName}
                autoFocus
                className="h-7 py-1 px-2 text-sm w-32 sm:w-48 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="flex items-center border-l pl-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-primary hover:text-primary hover:bg-primary/10" 
                  onClick={handleSaveName}
                  aria-label="Save name"
                >
                  <Check className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
                  onClick={handleCancelName}
                  aria-label="Cancel editing"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="group/name flex items-center gap-2 cursor-pointer hover:bg-muted/50 px-1.5 py-0.5 -ml-1.5 rounded transition-colors" 
              onClick={() => setIsEditingName(true)}
            >
              <h3 className="font-medium text-foreground truncate">
                {category.name}
              </h3>
              <Edit2 className="h-3 w-3 text-muted-foreground opacity-0 group-hover/name:opacity-100 transition-opacity" />
            </div>
          )}
          
          {!isEditingName && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm whitespace-nowrap">
              {isYearly ? t('period.yearly') : is6Months ? t('period.6months') : t('period.monthly')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-foreground/30 rounded-full"
            />
          </div>
          <span className="text-[10px] text-muted-foreground w-8 text-right">
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-between sm:justify-end mt-2 sm:mt-0">
        <div className="flex bg-muted/60 p-0.5 rounded-md border items-center">
          <button
            type="button"
            onClick={() => onUpdateBillingPeriod(category.id, 'monthly')}
            className={`px-2 py-1.5 text-[10px] font-semibold rounded-sm transition-all ${isMonthly ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t('category.mo')}
          </button>
          <button
            type="button"
            onClick={() => onUpdateBillingPeriod(category.id, '6-months')}
            className={`px-2 py-1.5 text-[10px] font-semibold rounded-sm transition-all ${is6Months ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t('category.6mo')}
          </button>
          <button
            type="button"
            onClick={() => onUpdateBillingPeriod(category.id, 'yearly')}
            className={`px-2 py-1.5 text-[10px] font-semibold rounded-sm transition-all ${isYearly ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t('category.yr')}
          </button>
        </div>

        <div className="flex items-center">
          <div className="relative ml-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={localAmount}
              onChange={handleAmountChange}
              className="w-24 pl-6 text-right h-9 text-sm bg-background"
              placeholder="0.00"
            />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(category.id)}
            className="h-9 w-9 ml-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
            aria-label="Delete category"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryList({ categories, onDeleteCategory, onUpdateCategoryAmount, onUpdateCategoryName, onUpdateBillingPeriod, onMoveCategory }) {
  const { t } = useLanguage();
  const totalMonthlyExpenses = categories.reduce((sum, cat) => sum + getMonthlyAmount(cat), 0);

  if (categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-8 text-center"
      >
        <div className="rounded-full bg-muted p-6 mb-4">
          <List className="h-12 w-12 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-muted-foreground mb-2">
          {t('category.empty')}
        </p>
        <p className="text-sm text-muted-foreground max-w-sm">
          {t('category.empty_desc')}
        </p>
      </motion.div>
    );
  }

  const groupKeys = ['NEEDS', 'WANTS', 'SAVINGS'];

  return (
    <div className="space-y-8">
      {groupKeys.map((groupKey) => {
        const groupCategories = categories.filter(c => c.group === groupKey);
        const groupMonthlyTotal = groupCategories.reduce((sum, cat) => sum + getMonthlyAmount(cat), 0);
        const config = GROUP_CONFIG[groupKey];
        const GroupIcon = config.icon;

        if (groupCategories.length === 0) return null;

        return (
          <div key={groupKey} className="space-y-4">
            <div className="flex items-center gap-3 border-b border-border pb-2">
              <div className={`p-1.5 rounded-md ${config.bgClass}`}>
                <GroupIcon className={`h-5 w-5 ${config.colorClass}`} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {t(config.labelKey)}
              </h3>
              <div className="ml-auto flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{t('category.group_monthly')}</span>
                  <span className="font-bold text-foreground">
                    ${groupMonthlyTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {groupCategories.map((category, index) => (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    totalMonthlyExpenses={totalMonthlyExpenses}
                    onUpdateAmount={onUpdateCategoryAmount}
                    onUpdateName={onUpdateCategoryName}
                    onUpdateBillingPeriod={onUpdateBillingPeriod}
                    onDelete={onDeleteCategory}
                    onMove={onMoveCategory}
                    isFirst={index === 0}
                    isLast={index === groupCategories.length - 1}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryList;