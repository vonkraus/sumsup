import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DOWNLOAD_URLS } from '@/lib/release.js';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { ArrowRight, PieChart, Download, ShieldCheck, Calculator, Monitor, Laptop, Smartphone, Tablet } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCanonicalTag } from '@/hooks/useCanonicalTag.js';

const HomePage = () => {
  useCanonicalTag();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calculator className="h-8 w-8 text-primary" />,
      title: 'Intuitive Tracking',
      description: 'Easily log your income and expenses with our streamlined interface designed for speed and clarity.'
    },
    {
      icon: <PieChart className="h-8 w-8 text-primary" />,
      title: 'Visual Insights',
      description: 'Understand your spending habits instantly with beautiful, interactive charts and summaries.'
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: 'Export Anywhere',
      description: 'Take your data with you. Export seamlessly to Excel, Google Sheets, or Apple Numbers.'
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: 'Private by Design',
      description: 'Your financial data stays on your device. We don\'t store your personal numbers on our servers.'
    }
  ];

  return (
    <main className="min-h-[100dvh] bg-background flex flex-col">
      <Helmet>
        <title>{`Sums Up - Smart Budget Management`}</title>
        <meta name="description" content="Take control of your finances with ease. Track, visualize, and export your budget." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[80dvh] flex items-center justify-center overflow-hidden border-b">
        <div className="absolute inset-0 z-0 bg-slate-50 dark:bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight" style={{ letterSpacing: '-0.02em' }}>
                Master your money, <span className="text-primary">effortlessly.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Your quick and efficient way to a pointed budget where you control your finances.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/')}
                  className="h-14 px-8 text-lg rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
                >
                  Open Calculator
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl" />
              <Card className="relative border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden rounded-3xl">
                <div className="p-2 bg-muted/50 border-b flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="h-8 w-1/3 bg-muted rounded-md animate-pulse" />
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-background border shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <div className="w-5 h-5 rounded-full bg-primary/40" />
                            </div>
                            <div className="space-y-2">
                              <div className="h-4 w-24 bg-muted rounded" />
                              <div className="h-3 w-16 bg-muted/50 rounded" />
                            </div>
                          </div>
                          <div className="h-5 w-16 bg-muted rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
              Everything you need to stay on track
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to give you peace of mind and total control over your budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6 inline-flex p-3 rounded-2xl bg-primary/10">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button 
              size="lg"
              onClick={() => navigate('/')}
              className="h-12 px-8 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Start Budgeting Now
            </Button>
          </div>
        </div>
      </section>
      {/* Download Section */}
      <section className="py-24 bg-muted/30 border-t border-border/50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Desktop</p>
                <div className="flex gap-3 flex-wrap">
                  <a href="{DOWNLOAD_URLS.windows}" className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 w-24" title="Download for Windows"><Monitor className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" /><span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Windows</span></a>
                  <a href="{DOWNLOAD_URLS.macArm}" className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 w-24" title="Mac Apple Silicon"><Laptop className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" /><span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Mac (M1+)</span></a>
                  <a href="{DOWNLOAD_URLS.macX64}" className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 w-24" title="Mac Intel"><Laptop className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" /><span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Mac (Intel)</span></a>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Mobile</p>
                <div className="flex gap-3">
                  <div className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card opacity-60 w-24 cursor-not-allowed"><Smartphone className="h-8 w-8 text-muted-foreground" /><span className="text-xs text-muted-foreground">Android</span><span className="absolute -top-2 -right-2 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-medium">Soon</span></div>
                  <div className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/60 bg-card opacity-60 w-24 cursor-not-allowed"><Tablet className="h-8 w-8 text-muted-foreground" /><span className="text-xs text-muted-foreground">iOS</span><span className="absolute -top-2 -right-2 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-medium">Soon</span></div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ letterSpacing: '-0.02em' }}>Available for free on <span className="text-primary">all your devices</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">Budget smarter whether you are on desktop or mobile. No account needed, no data stored.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a href="{DOWNLOAD_URLS.windows}" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"><Download className="mr-2 h-4 w-4" />Download Now</a>
                <a href="https://github.com/vonkraus/sumsup/releases/latest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border bg-background text-foreground font-medium hover:border-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">All releases<ArrowRight className="ml-2 h-4 w-4" /></a>
              </div>
              <p className="text-xs text-muted-foreground">macOS users: If you see a security warning, right-click the app and click Open to launch.</p>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default HomePage;