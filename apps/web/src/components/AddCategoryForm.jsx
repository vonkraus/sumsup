import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

function AddCategoryForm({ onAddCategory }) {
  const { t } = useLanguage();
  const [categoryName, setCategoryName] = useState('');
  const [amount, setAmount] = useState('');
  const [group, setGroup] = useState('NEEDS');
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [errors, setErrors] = useState({ name: '', amount: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ name: '', amount: '' });

    let hasError = false;
    const newErrors = { name: '', amount: '' };

    if (!categoryName.trim()) {
      newErrors.name = t('category.error_required');
      hasError = true;
    }

    const amountValue = amount === '' ? 0 : parseFloat(amount);
    if (isNaN(amountValue) || amountValue < 0) {
      newErrors.amount = t('category.error_invalid_amount');
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    onAddCategory({
      id: `custom-${Date.now()}`,
      name: categoryName.trim(),
      amount: amountValue,
      group: group,
      billingPeriod: billingPeriod
    });

    setCategoryName('');
    setAmount('');
    setBillingPeriod('monthly');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="categoryName">{t('category.name')}</Label>
          <Input
            id="categoryName"
            type="text"
            placeholder={t('category.name_placeholder')}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="text-foreground placeholder:text-muted-foreground bg-background"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="categoryGroup">{t('category.group')}</Label>
          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger id="categoryGroup" className="text-foreground bg-background">
              <SelectValue placeholder={t('category.select_group')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEEDS">{t('group.needs')}</SelectItem>
              <SelectItem value="WANTS">{t('group.wants')}</SelectItem>
              <SelectItem value="SAVINGS">{t('group.savings')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="billingPeriod">{t('category.period')}</Label>
          <Select value={billingPeriod} onValueChange={setBillingPeriod}>
            <SelectTrigger id="billingPeriod" className="text-foreground bg-background">
              <SelectValue placeholder={t('category.select_period')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">{t('period.monthly')}</SelectItem>
              <SelectItem value="6-months">{t('period.6months')}</SelectItem>
              <SelectItem value="yearly">{t('period.yearly')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">{t('category.amount')}</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-foreground placeholder:text-muted-foreground bg-background"
          />
          {errors.amount && (
            <p className="text-sm text-destructive">{errors.amount}</p>
          )}
        </div>
      </div>
      
      <Button 
        type="submit"
        className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        <Plus className="mr-2 h-4 w-4" />
        {t('category.add_btn')}
      </Button>
    </form>
  );
}

export default AddCategoryForm;