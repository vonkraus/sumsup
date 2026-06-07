import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { useCanonicalTag } from '@/hooks/useCanonicalTag.js';

const PrivacyPolicy = () => {
  useCanonicalTag();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-[100dvh] bg-background py-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{`Privacy Policy - Sums Up`}</title>
        <meta name="description" content="Privacy Policy for Sums Up Budget Calculator. Learn how we collect, use, and protect your data." />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
            Privacy Policy
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
              <CardTitle className="text-2xl">Our Commitment to Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-base text-muted-foreground leading-relaxed">
                At Sums Up, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our budget calculator application. Please read this privacy policy carefully.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold">1. Data Collection & Cookies</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>We collect information in the following ways:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Local Storage:</strong> Your financial data, budget categories, and preferences are stored locally on your device using localStorage. We do not transmit this personal financial data to our servers.</li>
                      <li><strong>Essential Cookies:</strong> Used to remember your consent preferences and basic site functionality.</li>
                      <li><strong>Analytics Cookies:</strong> We use Google Analytics to understand how visitors interact with our website. This helps us improve our service.</li>
                      <li><strong>Advertising Cookies:</strong> We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold">2. Third-Party Services & Google AdSense</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>We use third-party services that may collect information used to identify you:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google AdSense:</strong> Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                      <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Ads Settings</a>.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold">3. GDPR and CCPA Compliance</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>Depending on your location, you may have certain rights regarding your personal data:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Right to Access:</strong> You can request copies of your personal data.</li>
                      <li><strong>Right to Rectification:</strong> You can request that we correct any information you believe is inaccurate.</li>
                      <li><strong>Right to Erasure:</strong> You can request that we erase your personal data, under certain conditions.</li>
                      <li><strong>Right to Restrict Processing:</strong> You can request that we restrict the processing of your personal data.</li>
                      <li><strong>Right to Object:</strong> You can object to our processing of your personal data.</li>
                      <li><strong>Right to Data Portability:</strong> You can request that we transfer the data that we have collected to another organization, or directly to you.</li>
                    </ul>
                    <p>To exercise any of these rights, please contact us using the information provided below.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-semibold">4. Data Retention</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>
                      Because your financial data is stored locally on your device, you have complete control over its retention. You can clear this data at any time by clearing your browser's local storage or using the reset features within the application.
                    </p>
                    <p>
                      For analytics and advertising data collected by third parties, retention periods are governed by their respective privacy policies.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-semibold">5. Contact Information</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
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

export default PrivacyPolicy;