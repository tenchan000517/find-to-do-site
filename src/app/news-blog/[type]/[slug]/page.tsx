// /src/app/news-blog/[type]/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar } from 'lucide-react';

// 既存の記事データ（本来はAPIから取得するべき）
const existingPosts = [
  {
    id: 1,
    type: 'news',
    date: '2025.04.15',
    category: 'お知らせ',
    title: '事業拡大に伴うメンター募集のお知らせ',
    excerpt: 'FIND to DO では事業拡大に伴い、WEB開発・動画編集・DX支援などの分野でメンターとして活躍いただける方を募集しています。',
    slug: 'mentor-recruitment',
    content: `
      <h1>事業拡大に伴うメンター募集のお知らせ</h1>
      <p>FIND to DO では事業拡大に伴い、WEB開発・動画編集・DX支援などの分野でメンターとして活躍いただける方を募集しています。</p>
      <h2>募集職種</h2>
      <ul>
        <li>WEB開発メンター</li>
        <li>動画編集メンター</li>
        <li>DX支援メンター</li>
      </ul>
      <h2>応募条件</h2>
      <p>各分野での実務経験3年以上、指導経験があれば尚可。フルリモートでの勤務も可能です。</p>
      <h2>待遇・福利厚生</h2>
      <p>業界水準以上の給与体系、フレックスタイム制、各種社会保険完備など。</p>
      <h2>応募方法</h2>
      <p>当社採用ページよりエントリーください。書類選考後、面接を実施いたします。</p>
    `
  },
  // 他の記事データ...
  {
    id: 2,
    type: 'blog',
    date: '2025.04.10',
    category: '技術情報',
    title: 'ブロックチェーン技術を活用した学習履歴の可視化',
    excerpt: 'インターン生の学習履歴や経験値をブロックチェーン技術を用いて可視化・認証するシステムの開発について解説します。',
    slug: 'blockchain-learning-history',
    content: `
      <h1>ブロックチェーン技術を活用した学習履歴の可視化</h1>
      <p>インターン生の学習履歴や経験値をブロックチェーン技術を用いて可視化・認証するシステムの開発について解説します。</p>
      <h2>背景と課題</h2>
      <p>従来の学習管理システムでは、データの改ざんリスクや信頼性の問題がありました。</p>
      <h2>ブロックチェーン技術の導入</h2>
      <p>分散型台帳技術を活用することで、改ざん不可能な学習履歴を記録できるようになりました。</p>
      <h2>システム構成</h2>
      <p>Ethereumネットワークとスマートコントラクトを用いて、学習進捗や経験値を記録しています。</p>
      <h2>導入効果</h2>
      <p>インターン生のモチベーション向上と、企業側からの信頼性確保に大きく貢献しています。</p>
    `
  },
  // 残りの記事データ...
];

export default function PostDetailPage() {
  const params = useParams();
  const { type, slug } = params;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 記事データを検索（実際のアプリではAPIから取得）
    const foundPost = existingPosts.find(
      p => p.type === type && p.slug === slug
    );
    
    setPost(foundPost || null);
    setLoading(false);
  }, [type, slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-4">
          <Link href="/news-blog" className="text-blue-600 hover:underline">
            ← ニュース＆ブログ一覧に戻る
          </Link>
        </div>
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">記事が見つかりません</h1>
          <p>お探しの記事は存在しないか、移動した可能性があります。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-4">
        <Link href="/news-blog" className="text-blue-600 hover:underline">
          ← ニュース＆ブログ一覧に戻る
        </Link>
      </div>
      
      <article>
        <header className="mb-8">
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded ${
              post.type === 'news' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {post.type === 'news' ? 'ニュース' : 'ブログ'}
            </span>
            <span className="inline-block px-3 py-1 rounded bg-gray-100 text-gray-800 ml-2">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          
          <div className="text-gray-600 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <time dateTime={post.date.replace(/\./g, '-')}>
              {post.date}
            </time>
          </div>
        </header>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}