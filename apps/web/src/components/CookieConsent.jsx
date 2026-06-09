import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { isNativeApp } from '@/lib/platform.js';

export const CookieConsent = () => {
  if (isNativeApp()) return null;
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem('cookieConsent');
        if (!stored) {
          setIsVisible(true);
          return;
        }

        const parsed = JSON.parse(stored);
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        const now = new Date().getTime();

        if (now - new Date(parsed.timestamp).getTime() > thirtyDays) {
          setIsVisible(true);
        }
      } catch (e) {
        setIsVisible(true);
      }
    };

    checkConsent();
  }, []);

  const saveConsent = (prefs) => {
    const consentData = {
      ...prefs,
      essential: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, advertising: true });
  };

  const handleRejectAll = () => {
    saveConsent({ essential: true, analytics: false, advertising: false });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && !showCustomize && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
            role="dialog"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-desc"
          >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center lg:text-left">
                <h2 id="cookie-consent-title" className="text-lg font-semibold mb-2">We value your privacy</h2>
                <p id="cookie-consent-desc" className="text-sm text-muted-foreground max-w-3xl">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies. Read our{' '}
                  <Link to="/privacy-policy" className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>{' '}
                  to learn more.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0 justify-center lg:justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCustomize(true)}
                >
                  Customize
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleRejectAll}
                >
                  Reject All
                </Button>
                <Button 
                  onClick={handleAcceptAll}
                >
                  Accept All
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. Essential cookies are required for the site to function properly.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex items-start justify-between space-x-4">
              <div className="space-y-1">
                <Label className="text-base">Essential Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Required for basic site functionality. Cannot be disabled.
                </p>
              </div>
              <Switch checked={true} disabled />
            </div>
            
            <div className="flex items-start justify-between space-x-4">
              <div className="space-y-1">
                <Label className="text-base">Analytics Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Help us understand how visitors interact with our website (e.g., Google Analytics).
                </p>
              </div>
              <Switch 
                checked={preferences.analytics} 
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))} 
              />
            </div>

            <div className="flex items-start justify-between space-x-4">
              <div className="space-y-1">
                <Label className="text-base">Advertising Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Used to deliver personalized advertisements (e.g., Google AdSense).
                </p>
              </div>
              <Switch 
                checked={preferences.advertising} 
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, advertising: checked }))} 
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleRejectAll} className="w-full sm:w-auto">
              Reject All
            </Button>
            <Button onClick={handleSavePreferences} className="w-full sm:w-auto">
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};