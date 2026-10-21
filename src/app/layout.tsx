import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import PortfolioChatbot from '../components/PortfolioChatbot/PortfolioChatbot';
import './globals.css';

export const metadata: Metadata = {
  title: '이유진 — Frontend Developer Portfolio',
  description: '화면이 반응하는 순간을 좋아하는 프론트엔드 개발자 이유진의 포트폴리오',
  icons: { icon: '/brand/yj-favicon.png' },
};

export const viewport: Viewport = { themeColor: '#eee7dc' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet" />
      </head>
      <body>
        <div id="root">{children}</div>
        <PortfolioChatbot />
      </body>
    </html>
  );
}
