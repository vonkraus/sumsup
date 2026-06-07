import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { useCanonicalTag } from '@/hooks/useCanonicalTag.js';

const TermsOfService = () => {
  useCanonicalTag();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-[100dvh] bg-background py-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{`Terms of Service - Sums Up`}</title>
        <meta name="description" content="Terms of Service for Sums Up Budget Calculator. Read our usage guidelines and policies." />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-base text-muted-foreground leading-relaxed">
                By accessing and using the Sums Up Budget Calculator, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold">1. Use License & Responsibilities</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>Permission is granted to temporarily use the Sums Up Budget Calculator for personal, non-commercial transitory viewing only. Under this license you may not:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Modify or copy the materials;</li>
                      <li>Use the materials for any commercial purpose;</li>
                      <li>Attempt to decompile or reverse engineer any software contained on the site;</li>
                      <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                    <p>You are responsible for maintaining the confidentiality of your data and for all activities that occur under your usage of the application.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold">2. Third-Party Advertising (Google AdSense)</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>Our application uses Google AdSense to display advertisements. By using our service, you acknowledge and agree that:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites.</li>
                      <li>We do not control the content of the advertisements served by Google AdSense.</li>
                      <li>We are not responsible for any claims or representations made by advertisers.</li>
                      <li>Any interactions or transactions you have with advertisers found on our application are solely between you and the advertiser.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold">3. Disclaimer</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>
                      The materials on Sums Up Budget Calculator are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                    <p>
                      <strong>Financial Disclaimer:</strong> The application is a tool for personal finance management and does not constitute professional financial, tax, or legal advice. Always consult with a qualified professional before making significant financial decisions.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-semibold">4. Limitations of Liability</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>
                      In no event shall Sums Up or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the application, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-semibold">5. Modifications to Terms</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>
                      We reserve the right to revise these terms of service at any time. When we do, we will revise the "Last Updated" date at the top of this page. We encourage users to frequently check this page for any changes. By using this application you are agreeing to be bound by the then current version of these terms of service.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-lg font-semibold">6. Contact Information</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <p className="font-medium text-foreground">Email: support@automatedtek.com</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default TermsOfService;