import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCanonicalTag } from '@/hooks/useCanonicalTag.js';
import { articles, categories } from '@/data/articles.js';
import GoogleAd from '@/components/GoogleAd.jsx';

function ArticleCard({ article }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/blog/${article.slug}`}
        className="group block h-full rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 overflow-hidden"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
              <Tag className="h-2.5 w-2.5" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="h-2.5 w-2.5" />
              {article.readTime}
            </span>
          </div>
          <h3 className="font-bold text-foreground text-lg leading-snug mb-3 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-4">
            {article.excerpt}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            Read article <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  useCanonicalTag();
  const [activeCategory, setActiveCategory] = useState('All');
  const allCategories = ['All', ...categories];
  const filtered = activeCategory === 'All' ? articles : articles.filter(a => a.category === activeCategory);

  return (
    <main className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{`Knowledge Base - Sums Up`}</title>
        <meta name="description" content="Original budgeting guides and financial literacy articles to help you master your money and build better financial habits." />
      </Helmet>

      {/* Hero */}
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
              Budgeting Guides
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Original articles to help you understand budgeting, build better money habits, and take control of your financial future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter + Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <GoogleAd />
      </div>
    </main>
  );
}
