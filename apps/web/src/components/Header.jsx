import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from '@/components/LanguageSelector.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { cn } from '@/lib/utils.js';

export function Header() {
  const { t } = useLanguage();
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            aria-label={t('nav.logo') || "Home"}
          >
            <div className="bg-primary/10 p-2 rounded-xl flex items-center justify-center transition-transform hover:scale-105">
              <img 
                src="/sumsup-icon.png" 
                alt="Calculator Logo" 
                className="h-8 w-8 md:h-9 md:w-9 object-contain drop-shadow-sm"
              />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">Sums Up</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Calculator
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/about" ? "text-primary" : "text-muted-foreground"
              )}
            >
              About
            </Link>
            <Link 
              to="/faq" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/faq" ? "text-primary" : "text-muted-foreground"
              )}
            >
              FAQ
            </Link>
            <Link 
              to="/blog" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/blog" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Knowledge Base
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}