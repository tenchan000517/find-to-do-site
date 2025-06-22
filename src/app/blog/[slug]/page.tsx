// src/app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './blog.module.css';

export const revalidate = 3600; // 1時間ごとに再検証

// 静的ページを生成するためのパスを定義
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  // ビルド時には最新の20記事のみ静的生成し、残りはオンデマンドで生成
  const recentPosts = posts.slice(0, 20);

  return recentPosts.map(post => ({
    slug: post.slug,
  }));
}

// 動的パラメータを許可（generateStaticParamsに含まれないページもオンデマンドで生成）
export const dynamicParams = true;

// メタデータを動的に生成
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  // paramsをawaitして使用
  const { slug } = await params;
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'ブログ記事が見つかりません',
    };
  }

  const baseUrl = 'https://find-to-do.com';
  const postUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = `${baseUrl}/blog-images/${slug}.jpg`;

  // インターン・学生関連キーワードを含むメタデータ最適化
  const enhancedDescription = post.metadata.excerpt || 
    `${post.metadata.title}について解説。FIND to DOは学生のインターン、就活、キャリア支援を行う学生コミュニティプラットフォームです。`;

  const keywords = [
    'インターン', '学生', '就活', 'DX', '学生広報',
    '学生アンバサダー', '学生団体', '学生コミュニティ', 'リクルート',
    '学生イベント', '大学生', 'キャリア', 'キャリア支援',
    'ガクチカ', '就職活動', post.metadata.category
  ].filter(Boolean).join(',');
  
  return {
    title: `${post.metadata.title} | FIND to DO`,
    description: enhancedDescription,
    keywords,
    
    // 基本的なメタデータ
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: postUrl,
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
      type: 'article',
      locale: 'ja_JP',
      url: postUrl,
      siteName: 'FIND to DO',
      title: post.metadata.title,
      description: enhancedDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
      publishedTime: post.metadata.date,
      modifiedTime: post.metadata.date,
      section: post.metadata.category,
      tags: ['インターン', '学生', '就活', 'キャリア支援'],
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: '@_FIND_TO_DO',
      creator: '@_FIND_TO_DO',
      title: post.metadata.title,
      description: enhancedDescription,
      images: [imageUrl],
    },
    
    // その他のメタデータ
    authors: [{ name: 'FIND to DO編集部' }],
    creator: 'FIND to DO',
    publisher: 'FIND to DO',
    category: post.metadata.category,
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // paramsをawaitして使用
  const { slug } = await params;
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // 日付を整形
  const formattedDate = new Date(post.metadata.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Article schema for structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://find-to-do.com/blog/${slug}#article`,
    headline: post.metadata.title,
    description: post.metadata.excerpt || `${post.metadata.title}について解説。学生のインターン、就活、キャリア支援に関する情報。`,
    datePublished: post.metadata.date,
    dateModified: post.metadata.date,
    author: {
      '@type': 'Organization',
      '@id': 'https://find-to-do.com/#organization',
      name: 'FIND to DO編集部',
      url: 'https://find-to-do.com'
    },
    publisher: {
      '@id': 'https://find-to-do.com/#organization'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://find-to-do.com/blog/${slug}`
    },
    image: {
      '@type': 'ImageObject',
      url: `https://find-to-do.com/blog-images/${slug}.jpg`,
      width: 1200,
      height: 630
    },
    articleSection: post.metadata.category,
    keywords: [
      'インターン', '学生', '就活', 'DX', '学生広報',
      '学生アンバサダー', '学生団体', '学生コミュニティ', 'リクルート',
      '学生イベント', '大学生', 'キャリア', 'キャリア支援',
      'ガクチカ', '就職活動', post.metadata.category
    ].join(','),
    about: [
      {
        '@type': 'Thing',
        name: 'インターンシップ',
        description: '学生向けインターンシップ機会とキャリア支援'
      },
      {
        '@type': 'Thing', 
        name: '学生支援',
        description: '大学生のスキルアップと就職活動サポート'
      },
      {
        '@type': 'Thing',
        name: 'DX推進',
        description: '企業のデジタルトランスフォーメーション支援'
      }
    ],
    mentions: [
      {
        '@type': 'Organization',
        name: 'FIND to DO',
        description: '学生と企業をつなぐキャリアプラットフォーム'
      }
    ],
    inLanguage: 'ja'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/news-blog" className="text-blue-underline hover:underline">
            ← ブログ一覧に戻る
          </Link>
        </div>

        <article>
          <header className="mb-8 pb-4 border-b border-gray-200">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                {post.metadata.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-3 text-gray-900">{post.metadata.title}</h1>
            <div className="text-gray-600">
              <time dateTime={post.metadata.date}>{formattedDate}</time>
            </div>
          </header>

          <div className={styles.blogContent}>
            {post.content}
          </div>
        </article>
      </div>
    </>
  );
}