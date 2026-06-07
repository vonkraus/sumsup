import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import ResourceCard from '@/components/ResourceCard.jsx';
import { useCanonicalTag } from '@/hooks/useCanonicalTag.js';

export default function BlogPage() {
  useCanonicalTag();
  const resources = {
    gettingStarted: [
      {
        title: "How to Budget: A Guide for Beginners",
        source: "NerdWallet",
        description: "A comprehensive breakdown of how to start budgeting, set goals, and stick to your financial plan.",
        link: "https://www.nerdwallet.com/article/finance/how-to-budget",
        showBadge: true
      },
      {
        title: "Budgeting 101: A Beginner's Guide",
        source: "Mid Penn Bank",
        description: "Actionable steps to track expenses, understand cash flow, and begin taking control of your personal finances.",
        link: "https://www.midpennbank.com/about/blog/budgeting-101-beginners-guide",
        showBadge: true
      },
      {
        title: "Creating a Budget",
        source: "Consumer.gov",
        description: "Official government resources covering the basics of budgeting and how to manage your monthly income effectively.",
        link: "https://consumer.gov/articles/0002-creating-budget",
        showBadge: true
      }
    ],
    budgetingMethods: [
      {
        title: "The 50/30/20 Budget Rule Explained",
        source: "Yahoo Finance",
        description: "Learn how to divide your after-tax income into needs, wants, and savings with this popular framework.",
        link: "https://finance.yahoo.com/news/50-30-20-budget-rule-explained-180000000.html",
        showBadge: true
      },
      {
        title: "How to use the 50/30/20 rule",
        source: "Fortune",
        description: "Deep dive into categorizing your expenses effectively to ensure you're saving for the future while enjoying the present.",
        link: "https://www.fortune.com/recommends/investing/50-30-20-budget",
        showBadge: true
      },
      {
        title: "The 50/30/20 Budget Rule",
        source: "Ramsey Solutions",
        description: "Alternative perspectives and foundational tips on implementing percentage-based budgeting rules into your life.",
        link: "https://www.ramseysolutions.com/budgeting/the-50-30-20-budget-rule",
        showBadge: true
      },
      {
        title: "The 60/30/10 Budget Rule",
        source: "NerdWallet",
        description: "An alternative to 50/30/20, designed for people who need to allocate more income toward essential living expenses.",
        link: "https://www.nerdwallet.com/article/finance/60-30-10-budget",
        showBadge: true
      }
    ],
    savingHealth: [
      {
        title: "Emergency Fund: Why You Need One",
        source: "CFPB",
        description: "The Consumer Financial Protection Bureau explains how a safety net protects you from financial shocks.",
        link: "https://www.consumerfinance.gov/about-us/blog/emergency-fund-why-you-need-one-and-how-build-it/",
        showBadge: true
      },
      {
        title: "How to Build an Emergency Fund",
        source: "CNBC Select",
        description: "Practical strategies for deciding how much to save and the best places to keep your emergency cash.",
        link: "https://www.cnbc.com/select/how-to-build-an-emergency-fund/",
        showBadge: true
      }
    ],
    literacy: [
      {
        title: "Personal Finance Basics",
        source: "Library of Congress",
        description: "A curated guide covering everything from banking essentials to credit management and long-term planning.",
        link: "https://www.loc.gov/collections/personal-finance-basics/",
        showBadge: false
      },
      {
        title: "Financial Literacy Guide",
        source: "Financer",
        description: "Educational tools to improve your understanding of interest rates, debt, and building long-term wealth.",
        link: "https://financer.com/us/financial-literacy/",
        showBadge: false
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{`Knowledge Base - Sums Up`}</title>
        <meta name="description" content="Curated educational resources on budgeting, saving, and financial literacy to pair perfectly with the Sums Up calculator." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-muted/30 border-b border-border/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">Knowledge Base</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6" style={{ letterSpacing: '-0.02em' }}>
              Knowledge Base
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              We've curated the best educational content from trusted financial experts to help you master your money. Learn the strategies, then put them into action with Sums Up.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Getting Started Section */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Getting Started</h2>
            <p className="text-muted-foreground text-lg">Beginner-friendly budgeting basics to lay your financial foundation.</p>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {resources.gettingStarted.map((resource, i) => (
              <motion.div key={i} variants={itemVariants}>
                <ResourceCard {...resource} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Budgeting Methods Section */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Budgeting Methods</h2>
            <p className="text-muted-foreground text-lg">Popular strategies and frameworks to structure your spending.</p>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {resources.budgetingMethods.map((resource, i) => (
              <motion.div key={i} variants={itemVariants} className="h-full">
                <ResourceCard {...resource} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Saving & Financial Health Section */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Saving & Financial Health</h2>
            <p className="text-muted-foreground text-lg">Building emergency funds and working toward long-term goals.</p>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {resources.savingHealth.map((resource, i) => (
              <motion.div key={i} variants={itemVariants}>
                <ResourceCard {...resource} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Financial Literacy Section */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Financial Literacy</h2>
            <p className="text-muted-foreground text-lg">Building deep knowledge and understanding of personal finance.</p>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {resources.literacy.map((resource, i) => (
              <motion.div key={i} variants={itemVariants}>
                <ResourceCard {...resource} />
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </main>
  );
}