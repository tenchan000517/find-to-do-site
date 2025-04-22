'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Tag, Book, Newspaper } from 'lucide-react';

type PostType = 'news' | 'blog';

type Post = {
  id: number;
  type: PostType;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  slug: string;
};

// サンプルデータ - 実際の実装では API からデータを取得する
const posts: Post[] = [
  {
    id: 1,
    type: 'news',
    date: '2025.04.15',
    category: 'お知らせ',
    title: '事業拡大に伴うメンター募集のお知らせ',
    excerpt: 'FIND to DO では事業拡大に伴い、WEB開発・動画編集・DX支援などの分野でメンターとして活躍いただける方を募集しています。',
    slug: 'mentor-recruitment'
  },
  {
    id: 2,
    type: 'blog',
    date: '2025.04.10',
    category: '技術情報',
    title: 'ブロックチェーン技術を活用した学習履歴の可視化',
    excerpt: 'インターン生の学習履歴や経験値をブロックチェーン技術を用いて可視化・認証するシステムの開発について解説します。',
    slug: 'blockchain-learning-history'
  },
  {
    id: 3,
    type: 'news',
    date: '2025.04.05',
    category: 'イベント',
    title: '第3回キャリア探索ワークショップ開催のお知らせ',
    excerpt: '多様な職種に触れる機会を提供する「キャリア探索ワークショップ」の第3回を開催します。実際の現場で活躍するプロフェッショナルをお招きし、リアルな仕事の話を聞くことができます。',
    slug: 'career-workshop-3'
  },
  {
    id: 4,
    type: 'blog',
    date: '2025.03.28',
    category: '開発手法',
    title: 'インターン生と共に実現する効率的なDX推進手法',
    excerpt: '通常の1/10以下のコストでDX推進を実現する当社の独自メソッドについて、実際のプロジェクト事例を交えて解説します。',
    slug: 'dx-promotion-method'
  },
  {
    id: 5,
    type: 'news',
    date: '2025.03.20',
    category: 'サービス',
    title: '新サービス「学生広報員システム」の提供開始',
    excerpt: 'インターン生が企業の「ファン」として活動する新サービス「学生広報員システム」の提供を開始しました。採用に直結しなくても企業価値向上に貢献します。',
    slug: 'student-pr-system'
  },
  {
    id: 6,
    type: 'blog',
    date: '2025.03.15',
    category: '教育',
    title: '「インターン→メンター」成長パスの設計と効果',
    excerpt: '当社の核となる「インターン生→メンター」への成長パスについて、その設計思想と実際の効果について分析します。',
    slug: 'intern-to-mentor'
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function NewsBlogPage() {
  const [activeTab, setActiveTab] = useState<'all' | PostType>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // カテゴリーの重複を除去
  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];

  // 表示する投稿をフィルタリング
  const filteredPosts = posts.filter(post => 
    (activeTab === 'all' || post.type === activeTab) && 
    (activeCategory === 'all' || post.category === activeCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 py-16 md:py-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="container mx-auto px-4 text-center text-white"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">ニュース & ブログ</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            最新のお知らせと技術情報を発信しています
          </p>
        </motion.div>
      </section>

      {/* タブとフィルター */}
      <section className="py-8 md:py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* タブ切り替え */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => setActiveTab('all')}
                className={`flex items-center px-4 py-2 text-sm md:text-base ${
                  activeTab === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">すべて</span>
              </button>
              <button 
                onClick={() => setActiveTab('news')}
                className={`flex items-center px-4 py-2 text-sm md:text-base ${
                  activeTab === 'news' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Newspaper className="w-4 h-4 mr-2" />
                <span>ニュース</span>
              </button>
              <button 
                onClick={() => setActiveTab('blog')}
                className={`flex items-center px-4 py-2 text-sm md:text-base ${
                  activeTab === 'blog' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Book className="w-4 h-4 mr-2" />
                <span>ブログ</span>
              </button>
            </div>

            {/* カテゴリーフィルター */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    activeCategory === category
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-800'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category === 'all' ? 'すべてのカテゴリー' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 投稿リスト */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105"
                >
                  <Link href={`/news-blog/${post.type}/${post.slug}`}>
                    <div className={`h-2 ${post.type === 'news' ? 'bg-blue-600' : 'bg-green-600'}`}></div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          post.type === 'news' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {post.type === 'news' ? 'ニュース' : 'ブログ'}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800 ml-2">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 line-clamp-2 text-gray-800">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <time>{post.date}</time>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">該当する投稿がありません</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}