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

  return posts.map(post => ({
    slug: post.slug,
  }));
}

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
  
  return {
    title: post.metadata.title,
    description: post.metadata.excerpt || `${post.metadata.title}に関する記事`,
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

  return (
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
  );
}