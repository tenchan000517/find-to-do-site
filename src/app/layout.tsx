
// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { AnimatePresence } from 'framer-motion';
import { CommonSection } from '@/components/layout/CommonSection';
import { Breadcrumb } from '@/components/seo/Breadcrumb';

const inter = Inter({ subsets: ['latin'] });

// 静的メタデータを Next.js のネイティブ方法で定義
export const metadata: Metadata = {
  title: 'FIND to DO | 企業と学生をつなぐキャリアプラットフォーム',
  description: 'FIND to DOは、企業のDX推進を支援し、学生に実践的なスキルアップと収入機会を提供する革新的なプラットフォームです。',
  keywords: 'インターン,DX,開発,学生,採用,キャリア,プログラミング,メンター,スキルアップ',
  
  // 基本的なメタデータ
  metadataBase: new URL('https://find-to-do.com'),
  alternates: {
    canonical: '/',
  },
  
  // 検証タグ
  verification: {
    google: 'b4xCasGm2kFCUINzi64xjZ8Zd8riV7WOvWk0OLFAqns'
  },
  
  // ロボットの指示
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://find-to-do.com',
    siteName: 'FIND to DO',
    title: 'FIND to DO | 企業と学生をつなぐキャリアプラットフォーム',
    description: 'FIND to DOは、企業のDX推進を支援し、学生に実践的なスキルアップと収入機会を提供する革新的なプラットフォームです。',
    images: [
      {
        url: 'https://find-to-do.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FIND to DO',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@_FIND_TO_DO',
    creator: '@_FIND_TO_DO',
    images: ['https://find-to-do.com/images/og-image.png'],
  },
  
  // その他のメタデータ
  authors: [{ name: 'FIND to DO' }],
  creator: 'FIND to DO',
  publisher: 'FIND to DO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// 構造化データの定義
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://find-to-do.com/#website',
      url: 'https://find-to-do.com',
      name: 'FIND to DO',
      description: 'FIND to DOは、企業のDX推進を支援し、学生に実践的なスキルアップと収入機会を提供する革新的なプラットフォームです。',
      publisher: {
        '@id': 'https://find-to-do.com/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://find-to-do.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: 'ja'
    },
    {
      '@type': 'Organization',
      '@id': 'https://find-to-do.com/#organization',
      name: 'FIND to DO',
      url: 'https://find-to-do.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://find-to-do.com/#logo',
        url: 'https://find-to-do.com/images/logo.png',
        width: 300,
        height: 60,
        caption: 'FIND to DO'
      },
      sameAs: [
        'https://twitter.com/_FIND_TO_DO',
        'https://www.facebook.com/findtodo',
        'https://www.linkedin.com/company/find-to-do'
      ],
      description: 'FIND to DOは、企業のDX推進を支援し、学生に実践的なスキルアップと収入機会を提供する革新的なプラットフォームです。'
    }
  ]
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
        <link rel="canonical" href="https://find-to-do.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden w-full`}>
        <div className="relative w-full overflow-x-hidden">
          <Header />
          <Breadcrumb />
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