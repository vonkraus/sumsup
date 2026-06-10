import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DollarSign, CalendarDays, Calculator, ArrowRight, Wallet, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const STATE_TAX_RATES = {
  "AL": { name: "Alabama", rate: 0.05 },
  "AK": { name: "Alaska", rate: 0 },
  "AZ": { name: "Arizona", rate: 0.025 },
  "AR": { name: "Arkansas", rate: 0.044 },
  "CA": { name: "California", rate: 0.093 },
  "CO": { name: "Colorado", rate: 0.0463 },
  "CT": { name: "Connecticut", rate: 0.0699 },
  "DE": { name: "Delaware", rate: 0.066 },
  "FL": { name: "Florida", rate: 0 },
  "GA": { name: "Georgia", rate: 0.0549 },
  "HI": { name: "Hawaii", rate: 0.085 },
  "ID": { name: "Idaho", rate: 0.058 },
  "IL": { name: "Illinois", rate: 0.0495 },
  "IN": { name: "Indiana", rate: 0.0315 },
  "IA": { name: "Iowa", rate: 0.057 },
  "KS": { name: "Kansas", rate: 0.057 },
  "KY": { name: "Kentucky", rate: 0.05 },
  "LA": { name: "Louisiana", rate: 0.0425 },
  "ME": { name: "Maine", rate: 0.0715 },
  "MD": { name: "Maryland", rate: 0.0575 },
  "MA": { name: "Massachusetts", rate: 0.05 },
  "MI": { name: "Michigan", rate: 0.0425 },
  "MN": { name: "Minnesota", rate: 0.0985 },
  "MS": { name: "Mississippi", rate: 0.05 },
  "MO": { name: "Missouri", rate: 0.053 },
  "MT": { name: "Montana", rate: 0.0684 },
  "NE": { name: "Nebraska", rate: 0.0584 },
  "NV": { name: "Nevada", rate: 0 },
  "NH": { name: "New Hampshire", rate: 0 },
  "NJ": { name: "New Jersey", rate: 0.0897 },
  "NM": { name: "New Mexico", rate: 0.059 },
  "NY": { name: "New York", rate: 0.0685 },
  "NC": { name: "North Carolina", rate: 0.0499 },
  "ND": { name: "North Dakota", rate: 0.025 },
  "OH": { name: "Ohio", rate: 0.035 },
  "OK": { name: "Oklahoma", rate: 0.0475 },
  "OR": { name: "Oregon", rate: 0.099 },
  "PA": { name: "Pennsylvania", rate: 0.0307 },
  "RI": { name: "Rhode Island", rate: 0.0375 },
  "SC": { name: "South Carolina", rate: 0.064 },
  "SD": { name: "South Dakota", rate: 0 },
  "TN": { name: "Tennessee", rate: 0 },
  "TX": { name: "Texas", rate: 0 },
  "UT": { name: "Utah", rate: 0.0465 },
  "VT": { name: "Vermont", rate: 0.0875 },
  "VA": { name: "Virginia", rate: 0.0575 },
  "WA": { name: "Washington", rate: 0 },
  "WV": { name: "West Virginia", rate: 0.0512 },
  "WI": { name: "Wisconsin", rate: 0.0765 },
  "WY": { name: "Wyoming", rate: 0 }
};

const FED_BRACKETS = [
  { limit: 11600, rate: 0.10 },
  { limit: 47150, rate: 0.12 },
  { limit: 100525, rate: 0.22 },
  { limit: 191950, rate: 0.24 },
  { limit: 243725, rate: 0.32 },
  { limit: 609350, rate: 0.35 },
  { limit: Infinity, rate: 0.37 }
];

const STANDARD_DEDUCTION = 14600;

const FREQUENCY_OPTIONS = [
  { value: 'weekly', labelKey: 'freq.weekly', factor: 1 / 4.33 },
  { value: 'bi-weekly', labelKey: 'freq.bi-weekly', factor: 1 / 2.167 },
  { value: 'semi-monthly', labelKey: 'freq.semi-monthly', factor: 1 / 2 },
  { value: 'monthly', labelKey: 'freq.monthly', factor: 1 },
  { value: 'quarterly', labelKey: 'freq.quarterly', factor: 3 },
  { value: 'annually', labelKey: 'freq.annually', factor: 12 }
];

function IncomeInput({ income, incomePeriod = 'monthly', onSetIncome }) {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState(income > 0 ? String(income) : '');
  const [period, setPeriod] = useState(incomePeriod || 'monthly');
  const [selectedState, setSelectedState] = useState('');
  const [payFrequency, setPayFrequency] = useState('monthly');
  const [error, setError] = useState('');

  const calculateFederalTax = (grossIncome) => {
    const taxableIncome = Math.max(0, grossIncome - STANDARD_DEDUCTION);
    let tax = 0;
    let prevLimit = 0;
    
    for (const bracket of FED_BRACKETS) {
      if (taxableIncome > prevLimit) {
        const taxableInThisBracket = Math.min(taxableIncome - prevLimit, bracket.limit - prevLimit);
        tax += taxableInThisBracket * bracket.rate;
        prevLimit = bracket.limit;
      } else {
        break;
      }
    }
    return tax;
  };

  const currentGross = parseFloat(inputValue) || 0;
  
  const taxBreakdown = useMemo(() => {
    if (period !== 'yearly' || currentGross <= 0 || !selectedState) return null;
    
    const fedTax = calculateFederalTax(currentGross);
    const stateTaxRate = STATE_TAX_RATES[selectedState]?.rate || 0;
    const stateTax = currentGross * stateTaxRate;
    const totalTax = fedTax + stateTax;
    const netYearly = currentGross - totalTax;
    
    return {
      gross: currentGross,
      fedTax,
      stateTax,
      totalTax,
      netYearly,
      netMonthly: netYearly / 12
    };
  }, [currentGross, period, selectedState]);

  const baseMonthlyIncome = useMemo(() => {
    if (period === 'yearly' && taxBreakdown) {
      return taxBreakdown.netMonthly;
    }
    return currentGross;
  }, [period, taxBreakdown, currentGross]);

  const frequencyAmount = useMemo(() => {
    if (baseMonthlyIncome <= 0) return 0;
    const option = FREQUENCY_OPTIONS.find(opt => opt.value === payFrequency);
    return baseMonthlyIncome * (option?.factor || 1);
  }, [baseMonthlyIncome, payFrequency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (currentGross <= 0) {
      setError(t('income.positive_error'));
      return;
    }

    if (period === 'yearly' && !selectedState) {
      setError(t('income.state_error'));
      return;
    }

    const submittedAmount = period === 'yearly' && taxBreakdown 
      ? taxBreakdown.netYearly 
      : currentGross;

    onSetIncome(submittedAmount, period);
  };

  const handlePeriodToggle = (newPeriod) => {
    setPeriod(newPeriod);
    setInputValue('');
    setError('');
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg border-t-4 border-t-primary">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            {t('income.title')}
          </CardTitle>
          <CardDescription>
            {t('income.desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex bg-muted p-1 rounded-lg w-fit">
              <Button
                type="button"
                variant={period === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handlePeriodToggle('monthly')}
                className="w-24 transition-all duration-200 rounded-md"
              >
                {t('income.monthly')}
              </Button>
              <Button
                type="button"
                variant={period === 'yearly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handlePeriodToggle('yearly')}
                className="w-24 transition-all duration-200 rounded-md"
              >
                {t('income.yearly')}
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="income" className="block text-sm font-medium">
                    {period === 'monthly' ? t('income.gross.monthly') : t('income.gross.yearly')}
                  </Label>
                  <Input
                    id="income"
                    type="number"
                    step="0.01"
                    placeholder={t('income.placeholder')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="text-foreground placeholder:text-muted-foreground h-11"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="frequency-select" className="block text-sm font-medium">
                    {t('income.freq')}
                  </Label>
                  <Select value={payFrequency} onValueChange={setPayFrequency}>
                    <SelectTrigger id="frequency-select" className="h-11 text-foreground">
                      <SelectValue placeholder={t('income.select_freq')} />
                    </SelectTrigger>
                    <SelectContent>
                      {FREQUENCY_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {t(opt.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {period === 'yearly' && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3"
                    >
                      <Label htmlFor="state-select" className="block text-sm font-medium">
                        {t('income.state')}
                      </Label>
                      <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger id="state-select" className="h-11 text-foreground">
                          <SelectValue placeholder={t('income.select_state')} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(STATE_TAX_RATES).map(([code, stateInfo]) => (
                            <SelectItem key={code} value={code}>
                              {stateInfo.name} ({code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                </AnimatePresence>

                {period === 'yearly' && currentGross > 0 && selectedState && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert className="bg-muted/50 border-muted-foreground/20">
                      <Info className="h-4 w-4 text-primary" />
                      <AlertTitle className="text-sm font-semibold">Tax Rate Information</AlertTitle>
                      <AlertDescription className="text-xs text-muted-foreground mt-1">
                        Using 2024 tax rates (for tax calculation). The state tax rate for {STATE_TAX_RATES[selectedState].name} is {(STATE_TAX_RATES[selectedState].rate * 100).toFixed(2)}%.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {baseMonthlyIncome > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-accent/10 border border-accent/20 flex items-start gap-3"
                  >
                    <Wallet className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-accent-foreground/80">
                        {t('income.est_paycheck')}
                      </p>
                      <p className="text-lg font-bold text-accent-foreground">
                        ${formatCurrency(frequencyAmount)} <span className="text-sm font-normal opacity-80">{t('income.per')} {t(`freq.${payFrequency}`)} {t('income.paycheck')}</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-sm text-destructive mt-2"
              >
                {error}
              </motion.p>
            )}

            {period === 'yearly' && taxBreakdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <div className="mt-6 rounded-xl border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-card-foreground">
                    <Calculator className="w-5 h-5" />
                    <h4 className="font-semibold text-lg">{t('income.tax_breakdown')}</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{t('income.gross_yearly')}</span>
                        <span className="font-medium text-[hsl(var(--income-gross))]">
                          ${formatCurrency(taxBreakdown.gross)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{t('income.fed_tax')}</span>
                        <span className="font-medium text-[hsl(var(--income-tax))]">
                          -${formatCurrency(taxBreakdown.fedTax)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{t('income.state_tax')}</span>
                        <span className="font-medium text-[hsl(var(--income-tax))]">
                          -${formatCurrency(taxBreakdown.stateTax)}
                        </span>
                      </div>
                      <div className="pt-2 border-t flex justify-between items-center text-sm">
                        <span className="font-medium text-foreground">{t('income.total_tax')}</span>
                        <span className="font-semibold text-[hsl(var(--income-tax))]">
                          -${formatCurrency(taxBreakdown.totalTax)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-4 rounded-lg bg-[hsl(var(--income-takehome))]/10 p-4 border border-[hsl(var(--income-takehome))]/20">
                      <div>
                        <p className="text-xs font-medium text-[hsl(var(--income-takehome))]/80 uppercase tracking-wider mb-1">
                          {t('income.net_yearly')}
                        </p>
                        <p className="text-xl font-bold text-[hsl(var(--income-takehome))]">
                          ${formatCurrency(taxBreakdown.netYearly)}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[hsl(var(--income-takehome))]/20">
                        <p className="text-xs font-medium text-[hsl(var(--income-takehome))]/80 uppercase tracking-wider mb-1">
                          {t('income.net_monthly')}
                        </p>
                        <p className="text-3xl font-extrabold text-[hsl(var(--income-takehome))]">
                          ${formatCurrency(taxBreakdown.netMonthly)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {period === 'monthly' && currentGross > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 rounded-lg bg-[hsl(var(--income-takehome))]/10 border border-[hsl(var(--income-takehome))]/20 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-[hsl(var(--income-takehome))]" />
                  <span className="font-medium text-[hsl(var(--income-takehome))]">{t('income.monthly_input')}</span>
                </div>
                <span className="text-2xl font-bold text-[hsl(var(--income-takehome))]">
                  ${formatCurrency(currentGross)}
                </span>
              </motion.div>
            )}

            <div className="pt-4 flex justify-end">
              <Button 
                type="submit"
                size="lg"
                className="w-full sm:w-auto transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
              >
                {t('income.apply')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default IncomeInput;