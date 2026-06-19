import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { DOWNLOAD_URLS } from '@/lib/release.js';
import { Link, useLocation } from 'react-router-dom';
import IncomeInput from '@/components/IncomeInput.jsx';
import AddCategoryForm from '@/components/AddCategoryForm.jsx';
import CategoryList from '@/components/CategoryList.jsx';
import BudgetSummaryCard from '@/components/BudgetSummaryCard.jsx';
import SpreadsheetNameInput from '@/components/SpreadsheetNameInput.jsx';
import FloatingSummaryPanel from '@/components/FloatingSummaryPanel.jsx';
import ExcelExporter from '@/components/ExcelExporter.jsx';
import GoogleSheetsExporter from '@/components/GoogleSheetsExporter.jsx';
import AppleNumbersExporter from '@/components/AppleNumbersExporter.jsx';
import JsonExporter from '@/components/JsonExporter.jsx';
import FileImporter from '@/components/FileImporter.jsx';
import ImportPreview from '@/components/ImportPreview.jsx';
import ResourceCard from '@/components/ResourceCard.jsx';
import { Monitor, Laptop, Smartphone, Tablet, Calculator, List, Plus, DownloadCloud, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import GoogleAd from '@/components/GoogleAd.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { useCanonicalTag } from '@/hooks/useCanonicalTag.js';
import { isNativeApp } from '@/lib/platform.js';
import { saveSnapshot, getAllSnapshots, currentMonthKey } from '@/lib/budgetHistory.js';

const INITIAL_CATEGORIES = [
  { id: 'housing', name: 'Housing', amount: 0, group: 'NEEDS', billingPeriod: 'monthly' },
  { id: 'utilities', name: 'Utilities', amount: 0, group: 'NEEDS', billingPeriod: 'monthly' },
  { id: 'groceries', name: 'Groceries', amount: 0, group: 'NEEDS', billingPeriod: 'monthly' },
  { id: 'transportation', name: 'Transportation', amount: 0, group: 'NEEDS', billingPeriod: 'monthly' },
  { id: 'entertainment', name: 'Entertainment', amount: 0, group: 'WANTS', billingPeriod: 'monthly' },
  { id: 'emergency', name: 'Emergency Fund', amount: 0, group: 'SAVINGS', billingPeriod: 'monthly' }
];

function BudgetCalculator() {
  useCanonicalTag();
  const { t } = useLanguage();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#downloads') {
      const raf = requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' });
        }, 700);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [hash]);

  const [income, setIncome] = useState(0);
  const [incomePeriod, setIncomePeriod] = useState('monthly');
  const [incomeType, setIncomeType] = useState('Salary');
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [spreadsheetName, setSpreadsheetName] = useState('');
  const [incomeResetKey, setIncomeResetKey] = useState(0);
  const [snapshots, setSnapshots] = useState(() => getAllSnapshots());

  // Auto-save snapshot whenever there's a name
  useEffect(() => {
    if (!spreadsheetName.trim()) return;
    const timer = setTimeout(() => {
      saveSnapshot(currentMonthKey(), { income, incomePeriod, incomeType, categories, spreadsheetName });
      setSnapshots(getAllSnapshots());
    }, 800);
    return () => clearTimeout(timer);
  }, [income, incomePeriod, incomeType, categories, spreadsheetName]);

  const handleNewBudgetName = (name) => {
    setSpreadsheetName(name);
    setIncome(0);
    setIncomePeriod('monthly');
    setIncomeType('Salary');
    setCategories(INITIAL_CATEGORIES);
    setIncomeResetKey(k => k + 1);
  };

  const handleLoadSnapshot = (snapshot) => {
    setIncome(snapshot.income ?? 0);
    setIncomePeriod(snapshot.incomePeriod ?? 'monthly');
    setIncomeType(snapshot.incomeType ?? 'Salary');
    setCategories(snapshot.categories ?? INITIAL_CATEGORIES);
    setSpreadsheetName(snapshot.spreadsheetName ?? '');
    setIncomeResetKey(k => k + 1);
    toast.success(`Loaded "${snapshot.spreadsheetName || snapshot.monthKey}"`);
  };

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isImportPreviewOpen, setIsImportPreviewOpen] = useState(false);
  const [pendingImportData, setPendingImportData] = useState(null);



  const monthlyIncome = incomePeriod === 'yearly' ? income / 12 : income;

  const handleSetIncome = (amount, period, type = 'Salary') => {
    setIncome(amount);
    setIncomePeriod(period);
    if (type) setIncomeType(type);
  };

  const handleAddCategory = (category) => {
    setCategories([...categories, category]);
  };

  const handleUpdateCategoryAmount = (id, newAmount) => {
    setCategories(prevCategories => 
      prevCategories.map(cat => 
        cat.id === id ? { ...cat, amount: newAmount } : cat
      )
    );
  };

  const handleUpdateCategoryName = (id, newName) => {
    setCategories(prevCategories => 
      prevCategories.map(cat => 
        cat.id === id ? { ...cat, name: newName } : cat
      )
    );
  };

  const handleUpdateBillingPeriod = (id, newPeriod) => {
    setCategories(prevCategories => 
      prevCategories.map(cat => 
        cat.id === id ? { ...cat, billingPeriod: newPeriod } : cat
      )
    );
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleMoveCategory = (id, direction) => {
    setCategories(prev => {
      const index = prev.findIndex(c => c.id === id);
      if (index < 0) return prev;

      const category = prev[index];
      const groupCategories = prev.filter(c => c.group === category.group);
      const groupIndex = groupCategories.findIndex(c => c.id === id);

      if (direction === 'up' && groupIndex > 0) {
        const swapWith = groupCategories[groupIndex - 1];
        const swapIndex = prev.findIndex(c => c.id === swapWith.id);
        const newCategories = [...prev];
        newCategories[index] = swapWith;
        newCategories[swapIndex] = category;
        return newCategories;
      } else if (direction === 'down' && groupIndex < groupCategories.length - 1) {
        const swapWith = groupCategories[groupIndex + 1];
        const swapIndex = prev.findIndex(c => c.id === swapWith.id);
        const newCategories = [...prev];
        newCategories[index] = swapWith;
        newCategories[swapIndex] = category;
        return newCategories;
      }
      return prev;
    });
  };

  const handleDataReadyForImport = (mappedData) => {
    setPendingImportData(mappedData);
    setIsImportPreviewOpen(true);
  };

  const confirmImport = () => {
    if (pendingImportData) {
      if (pendingImportData.income > 0) {
        setIncome(pendingImportData.income);
        setIncomePeriod('monthly');
      }
      if (pendingImportData.categories && pendingImportData.categories.length > 0) {
        setCategories(pendingImportData.categories);
      }
      if (pendingImportData.suggestedName) {
        setSpreadsheetName(pendingImportData.suggestedName);
      }
      toast.success('Budget imported successfully!');
    }
    setIsImportPreviewOpen(false);
    setPendingImportData(null);
  };

  const normalizedMonthlyCategories = categories.map(cat => ({
    ...cat,
    name: cat.name,
    amount: cat.billingPeriod === 'yearly' 
              ? cat.amount / 12 
              : cat.billingPeriod === '6-months'
                ? cat.amount / 6
                : cat.amount
  }));

  const totalMonthlyExpenses = normalizedMonthlyCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const remainingBalance = monthlyIncome - totalMonthlyExpenses;

  const featuredResources = [
    {
      title: "How to Create a Budget in 5 Steps",
      source: "NerdWallet",
      description: "A simple, actionable guide to help you get your budget set up quickly.",
      link: "https://www.nerdwallet.com/article/finance/how-to-budget",
      showBadge: true
    },
    {
      title: "The 50/30/20 Budget Rule Explained",
      source: "Yahoo Finance",
      description: "Learn how to divide your income into needs, wants, and savings effectively.",
      link: "https://finance.yahoo.com/news/50-30-20-budget-rule-explained-180000000.html",
      showBadge: true
    },
    {
      title: "Emergency Fund: Why You Need One",
      source: "CFPB",
      description: "Discover how to protect yourself from financial shocks with an emergency fund.",
      link: "https://www.consumerfinance.gov/about-us/blog/emergency-fund-why-you-need-one-and-how-build-it/",
      showBadge: true
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.features.track')} />
      </Helmet>

      <div className="min-h-screen bg-background pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pr-[18rem]">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="rounded-2xl bg-card border shadow-sm p-3">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" style={{ letterSpacing: '-0.02em' }}>
              {t('app.title')}
            </h1>
            <ul className="budget-features-list text-muted-foreground">
              <li>
                <span className="hidden sm:inline">{t('app.features.track')}</span>
                <span className="sm:hidden">{t('app.features.track.mobile')}</span>
              </li>
              <li>
                <span className="hidden sm:inline">{t('app.features.visualize')}</span>
                <span className="sm:hidden">{t('app.features.visualize.mobile')}</span>
              </li>
              <li>
                <span className="hidden sm:inline">{t('app.features.export')}</span>
                <span className="sm:hidden">{t('app.features.export.mobile')}</span>
              </li>
            </ul>
          </motion.header>

          <div className="space-y-8">
            <SpreadsheetNameInput
              name={spreadsheetName}
              onNewBudget={handleNewBudgetName}
              snapshots={snapshots}
              onLoadSnapshot={handleLoadSnapshot}
              onDeleted={() => setSnapshots(getAllSnapshots())}
            />

            <IncomeInput 
              income={income} 
              incomePeriod={incomePeriod} 
              onSetIncome={handleSetIncome} 
            />

            {(income > 0 || categories.some(c => c.amount > 0)) && (
              <BudgetSummaryCard 
                income={income} 
                monthlyIncome={monthlyIncome}
                incomePeriod={incomePeriod}
                categories={normalizedMonthlyCategories} 
              />
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="shadow-lg bg-card border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <List className="h-5 w-5 text-secondary" />
                    {t('category.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('category.desc')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CategoryList 
                    categories={categories} 
                    onDeleteCategory={handleDeleteCategory}
                    onUpdateCategoryAmount={handleUpdateCategoryAmount}
                    onUpdateCategoryName={handleUpdateCategoryName}
                    onUpdateBillingPeriod={handleUpdateBillingPeriod}
                    onMoveCategory={handleMoveCategory}
                  />
                  
                  <div className="pt-8 mt-4 border-t border-border/60">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-card-foreground">
                      <Plus className="h-4 w-4 text-secondary" />
                      {t('category.add_custom')}
                    </h3>
                    <AddCategoryForm onAddCategory={handleAddCategory} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>



            {categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl bg-card shadow-lg p-6 space-y-4 border border-border/60"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-card-foreground mb-2">
                    {t('export.title')}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t('export.desc')}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <ExcelExporter
                    income={monthlyIncome}
                    categories={normalizedMonthlyCategories}
                    spreadsheetName={spreadsheetName}
                  />
                  <GoogleSheetsExporter
                    income={monthlyIncome}
                    categories={normalizedMonthlyCategories}
                    spreadsheetName={spreadsheetName}
                  />
                  <AppleNumbersExporter
                    income={monthlyIncome}
                    categories={normalizedMonthlyCategories}
                    spreadsheetName={spreadsheetName}
                  />
                  <JsonExporter
                    income={monthlyIncome}
                    incomePeriod={incomePeriod}
                    categories={normalizedMonthlyCategories}
                    spreadsheetName={spreadsheetName}
                  />
                </div>
                <div className="border-t border-border/60 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsImportModalOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    <DownloadCloud className="w-4 h-4 mr-2" />
                    Import Budget
                  </Button>
                </div>
              </motion.div>
            )}

            <GoogleAd />

            {/* Featured Resources Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 rounded-2xl bg-muted/30 border border-border p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">Knowledge Base</h2>
                  </div>
                  <p className="text-muted-foreground">Level up your financial literacy with expert guides.</p>
                </div>
                <Button variant="outline" className="shrink-0 group" asChild>
                  <Link to="/blog">
                    View all resources
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredResources.map((resource, i) => (
                  <ResourceCard key={i} {...resource} />
                ))}
              </div>
            </motion.div>


            {!isNativeApp() && (
            <motion.div
                id="downloads"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12 rounded-2xl bg-muted/30 border border-border p-6 md:p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Desktop</p>
                      <div className="flex gap-3 flex-wrap">
                        <a href={DOWNLOAD_URLS.windows} className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 w-24" title="Windows"><Monitor className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" /><span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Windows</span></a>
                        <a href={DOWNLOAD_URLS.macArm} className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 w-24" title="Mac M1+"><Laptop className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" /><span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Mac (M1+)</span></a>
                        <a href={DOWNLOAD_URLS.macX64} className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 w-24" title="Mac Intel"><Laptop className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" /><span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Mac (Intel)</span></a>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Mobile</p>
                      <div className="flex gap-3">
                        <a href={DOWNLOAD_URLS.android} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 w-24" title="Get it on Google Play"><Smartphone className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" /><span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Android</span></a>
                        <a href={DOWNLOAD_URLS.ios} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 w-24" title="Download on the App Store"><Tablet className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" /><span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">iOS</span></a>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-center lg:text-left">
                    <h2 className="text-2xl font-semibold text-foreground">Available for free on <span className="text-primary">all your devices</span></h2>
                    <p className="text-muted-foreground">Budget smarter on desktop or mobile. No account needed, no data stored.</p>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      <a href="https://github.com/vonkraus/sumsup/releases/latest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-primary text-primary-foreground font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md whitespace-nowrap">All releases<ArrowRight className="ml-2 h-4 w-4" /></a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <FloatingSummaryPanel 
        incomeType={incomeType}
        monthlyIncome={monthlyIncome}
        totalMonthlyExpenses={totalMonthlyExpenses}
        remainingBalance={remainingBalance}
      />

      <FileImporter 
        isOpen={isImportModalOpen} 
        onOpenChange={setIsImportModalOpen} 
        onDataReady={handleDataReadyForImport} 
      />

      <ImportPreview
        isOpen={isImportPreviewOpen}
        onOpenChange={setIsImportPreviewOpen}
        data={pendingImportData}
        onConfirm={confirmImport}
      />


</>
  );
}

export default BudgetCalculator;