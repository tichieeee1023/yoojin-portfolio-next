'use client';

import dynamic from 'next/dynamic';

// Existing GSAP scenes, matchMedia state and portals require a browser.
// Keep this boundary while migrating the portfolio incrementally.
const Portfolio = dynamic(() => import('../App'), { ssr: false });

export default function PortfolioClient() {
  return <Portfolio />;
}
