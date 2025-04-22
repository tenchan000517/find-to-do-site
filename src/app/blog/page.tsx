// app/blog/page.tsx
import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';

export const revalidate = 3600; // 1時間ごとに再検証

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">ブログ記事一覧</h1>
      
      {posts.length === 0 ? (
        <p>まだ記事がありません。</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-2">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:underline text-blue-600"
                >
                  {post.title}
                </Link>
              </h2>
              <div className="text-gray-600 text-sm mb-2">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('ja-JP')}
                </time>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </div>
              {post.excerpt && (
                <p className="text-gray-700">{post.excerpt}</p>
              )}
              <div className="mt-2">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  続きを読む →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}