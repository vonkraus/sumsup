import React, { useEffect, useRef } from 'react';
import { isNativeApp } from '@/lib/platform.js';

export default function GoogleAd({ className = '' }) {
  const adRef = useRef(null);

  useEffect(() => {
    if (isNativeApp()) return;
    try {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {}
  }, []);

  if (isNativeApp()) return null;

  return (
    <div className={`my-6 overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7028532923491589"
        data-ad-slot="1042352024"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
