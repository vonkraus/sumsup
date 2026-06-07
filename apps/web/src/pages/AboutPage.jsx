import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Shield, Download, Globe, Gift, Lightbulb, Lock, ArrowRight } from 'lucide-react';
import { useCanonicalTag } from '@/hooks/useCanonicalTag.js';

export default function AboutPage() {
  useCanonicalTag();
  const navigate = useNavigate();

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
    <>
      <Helmet>
        <title>{`About Sums Up`}</title>
        <meta 
          name="description" 
          content="Sums Up was built for anyone who wants financial clarity without the complexity. No spreadsheets. No subscriptions. No stress." 
        />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative px-4 pt-24 pb-16 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
          <motion.div 
            className="relative z-10 max-w-3xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-balance" style={{ letterSpacing: '-0.02em' }}>
              Financial clarity, <span className="text-primary">without the complexity.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              Your simple, smart way to manage budgets and take control of your finances. Sums Up was built for anyone who wants financial clarity without the complexity. No spreadsheets. No subscriptions. No stress.
            </p>
          </motion.div>
        </section>

        {/* Mission / Context Section (Side-by-side) */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Why We Built This</h2>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Managing money shouldn't require a finance degree. Most budgeting tools are either too complicated, too expensive, or push you toward paid plans the moment you try to do anything useful. We wanted something different — a free, fast, and honest tool that just helps you understand where your money goes and how to make it work harder for you.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">What Sums Up Does</h2>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Sums Up is a free browser-based budget calculator. Add your income sources, list your expenses, and get an instant, real-time breakdown of your financial picture. Export your data, plan ahead, and make smarter decisions — all without creating an account or handing over your personal information.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section (2x2 Grid) */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-muted/30 rounded-[2.5rem] my-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to plan your budget, with none of the bloat.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { title: "Instant results", desc: "Real-time summaries update as you type. No waiting, no page reloads.", icon: Zap },
              { title: "Private by design", desc: "Your data stays in your browser. We don't collect or store your financial details.", icon: Shield },
              { title: "Easy export", desc: "Download your budget summary whenever you need it, in a format you can use.", icon: Download },
              { title: "Works anywhere", desc: "No app to install. Open it in any browser on any device and get started.", icon: Globe }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full bg-card hover:shadow-lg transition-shadow duration-300 border-none shadow-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Our Values Section (Vertical Stack to avoid 3-column AI trope) */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide how we build Sums Up.
            </p>
          </motion.div>

          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { title: "Free, always", desc: "Core budgeting tools should be accessible to everyone, regardless of income.", icon: Gift },
              { title: "Simple over clever", desc: "We cut features that add friction, not value. If it doesn't help you budget better, it's not here.", icon: Lightbulb },
              { title: "Respect your data", desc: "Your financial information is yours. We don't sell it, store it, or share it.", icon: Lock }
            ].map((value, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="overflow-hidden border bg-card hover:border-primary/50 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center p-6 sm:p-8 gap-6">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-foreground flex-shrink-0">
                      <value.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-24 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            className="bg-secondary text-secondary-foreground rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Ready to take control?
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-10">
                Start budgeting in seconds — no sign-up required.
              </p>
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98] transition-all duration-200 rounded-full px-8 py-6 text-lg font-semibold"
                onClick={() => navigate('/')}
              >
                Start Budgeting Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}