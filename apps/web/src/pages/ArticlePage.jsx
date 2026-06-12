import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useCanonicalTag } from '@/hooks/useCanonicalTag.js';
import { getArticleBySlug } from '@/data/articles.js';
import GoogleAd from '@/components/GoogleAd.jsx';

export default function ArticlePage() {
  useCanonicalTag();
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">This article does not exist or has been moved.</p>
        <Button onClick={() => navigate('/blog')}>Back to Knowledge Base</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${article.title} - Sums Up`}</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-muted/30 border-b border-border/50 py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Knowledge Base
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <Tag className="h-3 w-3" />
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {article.date}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                {article.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Ad below title */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <GoogleAd />
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Intro */}
            <p className="text-lg leading-relaxed text-foreground/90 mb-8 font-medium border-l-4 border-primary pl-4">
              {article.intro}
            </p>

            {/* Sections */}
            {article.sections.map((section, i) => (
              <div key={i} className="mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 mt-8">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, j) => (
                  <p key={j} className="text-foreground/80 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            ))}

            {/* Conclusion */}
            <div className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <p className="text-foreground/90 leading-relaxed font-medium">
                {article.conclusion}
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 p-8 rounded-2xl bg-muted/50 border border-border text-center"
          >
            <h3 className="text-xl font-bold text-foreground mb-2">Ready to put this into practice?</h3>
            <p className="text-muted-foreground mb-6">Use the Sums Up calculator to build your budget right now — free, private, no account needed.</p>
            <Button size="lg" onClick={() => navigate('/')} className="rounded-full px-8">
              Open Budget Calculator
            </Button>
          </motion.div>

          {/* Back link */}
          <div className="mt-10 pt-8 border-t border-border">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Knowledge Base
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
