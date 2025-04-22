// src/app/blog/page.tsx
import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ブログ一覧',
  description: 'ブログ記事の一覧ページです。',
};

export const dynamic = 'force-static'; // この行を追加して静的ページとして扱われるようにする
export const revalidate = 3600; // 1時間ごとに再検証

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">ブログ記事一覧</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => {
          // 日付を整形
          const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          return (
            <article key={post.slug} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="p-4 h-full flex flex-col">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                  )}
                  <div className="text-gray-500 text-sm mt-auto">
                    <time dateTime={post.date}>{formattedDate}</time>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}