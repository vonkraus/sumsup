import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LanguageSelector } from '@/components/LanguageSelector.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { cn } from '@/lib/utils.js';
import { Menu, X, Sun, Moon, ExternalLink } from 'lucide-react';
import { isNativeApp } from '@/lib/platform.js';

export function Header() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const handleDownloadClick = () => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#downloads');
    }
  };

  const navLinks = [
    { to: '/', label: 'Calculator' },
    { to: '/about', label: 'About' },
    { to: '/faq', label: 'FAQ' },
    { to: '/blog', label: 'Knowledge Base' },
  ];

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
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === to ? "text-primary" : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            ))}
            {!isNativeApp() && (
              <button
                onClick={handleDownloadClick}
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
              >
                Download
              </button>
            )}
            {isNativeApp() && (
              <a
                href="https://sumsupbudgetcalc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground inline-flex items-center gap-1"
              >
                Visit our website <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-foreground",
                  location.pathname === to ? "text-primary bg-accent/50" : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            ))}
            {!isNativeApp() && (
              <button
                onClick={handleDownloadClick}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground text-left"
              >
                Download
              </button>
            )}
            {isNativeApp() && (
              <a
                href="https://sumsupbudgetcalc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground inline-flex items-center gap-1"
              >
                Visit our website <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}