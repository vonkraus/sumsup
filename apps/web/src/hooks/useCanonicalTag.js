import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useCanonicalTag(overridePath) {
  const location = useLocation();

  useEffect(() => {
    const domain = 'https://sumsupbudgetcalc.com';
    const path = overridePath !== undefined ? overridePath : location.pathname;
    const canonicalUrl = `${domain}${path}`;

    let link = document.querySelector("link[rel='canonical']");
    
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);

    return () => {
      // Clean up the tag on unmount
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [location.pathname, overridePath]);
}