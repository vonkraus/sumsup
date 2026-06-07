import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCanonicalTag } from '@/hooks/useCanonicalTag.js';

const faqs = [
  {
    q: "How does the real-time summary work?",
    a: "Sums Up updates your budget summary instantly as you type—no need to submit forms or click buttons. Every change to your income or expenses appears immediately in the summary panel, giving you real-time visibility into your financial picture. This live-update experience makes budgeting feel responsive and interactive.",
    isFeature: true
  },
  {
    q: "Can I track multiple income sources and expenses?",
    a: "Yes! Sums Up makes it easy to add as many income sources and expense categories as you need. Simply enter your income, then add expense categories with amounts. You can add or remove items with a single click, making it flexible enough for simple budgets or complex multi-source finances without overwhelming complexity.",
    isFeature: true
  },
  {
    q: "How do I export my budget?",
    a: "Sums Up supports multiple export formats including Excel, Google Sheets, and Apple Numbers. Once you've built your budget, use the export buttons to download your data in your preferred format. This lets you integrate your budget into your existing spreadsheets, share with others, or keep a backup of your financial plan.",
    isFeature: true
  },
  {
    q: "Where is my data stored?",
    a: "Your data stays entirely in your browser—we never store it on our servers. You don't need to create an account or log in. This privacy-first approach means your financial information remains completely under your control, and you can use Sums Up with confidence knowing your data never leaves your device.",
    isFeature: true
  },
  {
    q: "What is the 50/30/20 budgeting rule?",
    a: "The 50/30/20 rule is a simple budgeting framework: allocate 50% of your income to needs (housing, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. This rule provides a balanced approach to financial planning and helps ensure you're saving while still enjoying life. Sums Up makes it easy to track these categories and see if you're on target.",
    isFeature: false
  },
  {
    q: "What's the difference between a budget calculator and a budgeting app?",
    a: "A budget calculator like Sums Up is lightweight and straightforward—you input your numbers and instantly see your budget breakdown. Full budgeting apps like Mint or YNAB offer more features like transaction tracking, bill reminders, and account syncing, but require sign-ups and ongoing management. Sums Up is perfect if you want simplicity and quick insights without the complexity.",
    isFeature: false
  },
  {
    q: "How often should I review my budget?",
    a: "Financial experts recommend reviewing your budget monthly to track progress, identify spending patterns, and adjust for changes in income or expenses. Some people review weekly for tighter control, while others do quarterly reviews. Regular reviews help you stay accountable and make informed adjustments to reach your financial goals.",
    isFeature: false
  },
  {
    q: "Do I need to create an account to use Sums Up?",
    a: "No! Sums Up requires no sign-up, login, or account creation. You can start budgeting immediately when you visit the site. Your data stays in your browser, so there's no need for accounts or passwords. Just open Sums Up and begin.",
    isFeature: false
  },
  {
    q: "Is Sums Up really free?",
    a: "Yes, Sums Up is completely free with no hidden costs, premium tiers, or paywalls. All features—income tracking, expense categories, real-time summaries, and exports—are available to everyone at no charge. We believe budgeting tools should be accessible to everyone.",
    isFeature: false
  },
  {
    q: "Can I use Sums Up on my phone?",
    a: "Absolutely! Sums Up is browser-based, so it works on any device with a web browser—phones, tablets, laptops, and desktops. The interface is fully responsive and mobile-friendly, so you can manage your budget on the go.",
    isFeature: false
  }
];

export default function FAQPage() {
  useCanonicalTag();
  return (
    <>
      <Helmet>
        <title>{`FAQ - Sums Up Budget Calculator`}</title>
        <meta 
          name="description" 
          content="Frequently asked questions about Sums Up Budget Calculator, budgeting rules, and how to manage your finances effectively." 
        />
      </Helmet>

      <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4 text-primary">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Everything you need to know about the Sums Up Budget Calculator and general budgeting best practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl shadow-sm p-6 md:p-8"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-4 bg-background data-[state=open]:shadow-sm transition-all"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 font-medium text-foreground hover:text-primary transition-colors">
                    <span className="flex items-center flex-wrap gap-2">
                      {faq.q}
                      {faq.isFeature && (
                        <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                          Sums Up
                        </span>
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </main>
    </>
  );
}