
// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { AnimatePresence } from 'framer-motion';
import { CommonSection } from '@/components/layout/CommonSection';

const inter = Inter({ subsets: ['latin'] });

// 静的メタデータを Next.js のネイティブ方法で定義
export const metadata: Metadata = {
  title: 'FIND to DO | 企業と学生をつなぐキャリアプラットフォーム',
  description: 'FIND to DOは、企業のDX推進を支援し、学生に実践的なスキルアップと収入機会を提供する革新的なプラットフォームです。',
  keywords: 'インターン,DX,開発,学生,採用,キャリア,プログラミング,メンター,スキルアップ',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://findtodo.jp',
    siteName: 'FIND to DO',
    title: 'FIND to DO | 企業と学生をつなぐキャリアプラットフォーム',
    description: 'FIND to DOは、企業のDX推進を支援し、学生に実践的なスキルアップと収入機会を提供する革新的なプラットフォームです。',
    images: [
      {
        url: 'https://findtodo.jp/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FIND to DO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@findtodo',
    creator: '@findtodo',
  },
};

export default function RootLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className={`${inter.className} overflow-x-hidden w-full`}>
        <div className="relative w-full overflow-x-hidden">
          <Header />
          <AnimatePresence mode="wait">
            <div key="page-content"> {/* 単一のラッパー要素を追加 */}
              <main className="min-h-screen pt-16 w-full overflow-x-hidden">
                <div className="w-full overflow-x-hidden">
                  {children}
                </div>
              </main>
              <CommonSection />
            </div>
          </AnimatePresence>
          <Footer />
        </div>
      </body>
    </html>
  );
}