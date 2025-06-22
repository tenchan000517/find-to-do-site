
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

// 構造化データの定義（学生支援・インターン関連情報を強化）
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://find-to-do.com/#website',
      url: 'https://find-to-do.com',
      name: 'FIND to DO',
      description: 'FIND to DOは、学生のインターンシップ支援、キャリア開発、企業のDX推進を通じて、ミスマッチのない社会を創造する革新的なプラットフォームです。',
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
      about: [
        {
          '@type': 'Thing',
          name: 'インターンシップ',
          description: '学生向けインターンシップ機会の提供とキャリア支援'
        },
        {
          '@type': 'Thing',
          name: '学生コミュニティ',
          description: '大学生の成長とネットワーク構築を支援するコミュニティ運営'
        },
        {
          '@type': 'Thing',
          name: 'キャリア支援',
          description: '就職活動、ガクチカ作成、スキルアップの総合的な支援'
        }
      ],
      keywords: [
        'インターン', '学生', '就活', 'DX', '学生広報', '学生アンバサダー',
        '学生団体', '学生コミュニティ', 'リクルート', '学生イベント',
        '大学生', 'キャリア', 'キャリア支援', 'ガクチカ', '就職活動'
      ].join(','),
      inLanguage: 'ja'
    },
    {
      '@type': 'Organization',
      '@id': 'https://find-to-do.com/#organization',
      name: 'FIND to DO',
      alternateName: 'ファインドトゥードゥー',
      url: 'https://find-to-do.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://find-to-do.com/#logo',
        url: 'https://find-to-do.com/images/logo.png',
        width: 300,
        height: 60,
        caption: 'FIND to DO'
      },
      slogan: '人の夢と希望のブースターになる',
      foundingDate: '2025',
      founder: {
        '@type': 'Person',
        name: '飯田思遠',
        jobTitle: '代表者'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '花見通2-3-17',
        addressLocality: '名古屋市昭和区',
        addressRegion: '愛知県',
        postalCode: '464-0806',
        addressCountry: 'JP'
      },
      sameAs: [
        'https://twitter.com/_FIND_TO_DO',
        'https://www.facebook.com/findtodo',
        'https://www.linkedin.com/company/find-to-do',
        'https://discord.gg/xQM6NgmwPk'
      ],
      description: 'FIND to DOは、学生のインターンシップ支援、キャリア開発、企業のDX推進を通じて、人々が自分らしい人生を歩める社会の実現を目指しています。',
      knowsAbout: [
        'インターンシップ',
        '学生支援', 
        'キャリア開発',
        'DX推進',
        'WEBアプリ開発',
        'イベント制作',
        '学生コミュニティ運営',
        '人材育成',
        '就職活動支援'
      ],
      serviceArea: {
        '@type': 'Country',
        name: '日本'
      },
      areaServed: {
        '@type': 'Country',
        name: '日本'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'FIND to DO サービス',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'インターンシップ支援',
              description: '学生向けインターンシップ機会の紹介と企業とのマッチング支援'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'キャリア支援',
              description: '就職活動、ガクチカ作成、スキルアップの総合的なサポート'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'DX支援',
              description: '企業のデジタルトランスフォーメーション推進とWEBアプリ開発'
            }
          }
        ]
      },
      audience: [
        {
          '@type': 'Audience',
          audienceType: '大学生',
          description: 'インターンシップや就職活動を行う大学生'
        },
        {
          '@type': 'Audience',
          audienceType: '企業',
          description: 'インターン生の受け入れやDX推進を検討している企業'
        },
        {
          '@type': 'Audience',
          audienceType: '就活生',
          description: 'キャリア開発と就職活動に取り組む学生'
        }
      ]
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