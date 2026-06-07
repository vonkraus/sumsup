import React from 'react';
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import BudgetCalculator from '@/pages/BudgetCalculator.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import PrivacyPolicy from '@/pages/PrivacyPolicy.jsx';
import TermsOfService from '@/pages/TermsOfService.jsx';
import FAQPage from '@/pages/FAQPage.jsx';
import BlogPage from '@/pages/BlogPage.jsx';
import HomePage from '@/pages/HomePage.jsx';
import { LanguageProvider } from '@/contexts/LanguageContext.jsx';
import { Header } from '@/components/Header.jsx';
import { CookieConsent } from '@/components/CookieConsent.jsx';

function SiteFooter() {
  return (
    <footer className="border-t bg-background py-12 mt-auto relative z-50 pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src="https://horizons-cdn.hostinger.com/a59b9d69-2102-4bc6-8e97-afe4424699ca/77aa4d3482ebf4de044dc68d9ea99aa1.png" 
                alt="Sums Up Logo" 
                className="h-6 w-6 object-contain"
              />
              <span className="font-bold text-lg">Sums Up</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your quick and efficient way to a pointed budget where you control your finances.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Budget Calculator</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">About Sums Up</Link></li>
              <li><Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Knowledge Base</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal & Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">This site uses Google AdSense</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Sums Up Budget Calculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<BudgetCalculator />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="*" element={
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-muted-foreground mb-6">Page not found</p>
                  <Link to="/" className="text-primary hover:underline">Back to home</Link>
                </div>
              } />
            </Routes>
          </div>
          <SiteFooter />
          <CookieConsent />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;