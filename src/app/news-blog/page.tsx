'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Tag, Book, Newspaper } from 'lucide-react';
import { getAllPosts, PostMetadata } from '@/lib/mdx';
import Image from 'next/image';

type PostType = 'news' | 'blog' | 'ai-blog';

// Existing news/blog types
interface ExistingPost {
    id: number;
    type: 'news' | 'blog';
    date: string;
    category: string;
    title: string;
    excerpt: string;
    slug: string;
}

// Combined post type that works with both existing and AI-generated content
interface CombinedPost {
    id: string | number;
    type: PostType;
    date: string;
    category: string;
    title: string;
    excerpt: string;
    slug: string;
    isAiGenerated?: boolean;
}

// APIから返ってくるデータの型定義
interface ApiResponse {
    posts: PostMetadata[];
}

// サンプルデータ - 実際の実装では API からデータを取得する
const existingPosts: ExistingPost[] = [
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
        title: 'インターン→メンター」成長パスの設計と効果',
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

// マークダウン記法を除去する関数
function stripMarkdown(text: string): string {
    // 見出し記号（#）を削除
    let result = text.replace(/^#+\s+/gm, '');
    
    // 太字とイタリック記号を削除
    result = result.replace(/\*\*(.+?)\*\*/g, '$1');
    result = result.replace(/\*(.+?)\*/g, '$1');
    result = result.replace(/__(.+?)__/g, '$1');
    result = result.replace(/_(.+?)_/g, '$1');
    
    // コードブロックを削除
    result = result.replace(/```[\s\S]*?```/g, '');
    result = result.replace(/`(.+?)`/g, '$1');
    
    // リンクからテキスト部分のみ抽出
    result = result.replace(/\[(.+?)\]\(.+?\)/g, '$1');
    
    return result;
  }

export default function NewsBlogPage() {
    const [activeTab, setActiveTab] = useState<'all' | PostType>('all');
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [combinedPosts, setCombinedPosts] = useState<CombinedPost[]>([]);
    const [categories, setCategories] = useState<string[]>(['all']);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // AIブログ記事を取得する関数
    useEffect(() => {
        async function fetchAiBlogPosts() {
            try {
                setIsLoading(true);

                // APIからAIブログ記事を取得
                const response = await fetch('/api/blog/posts');
                const data = await response.json() as ApiResponse;
                const posts = data.posts || [];

                // AI生成記事を変換
                const aiPosts: CombinedPost[] = posts.map((post: PostMetadata) => ({
                    id: post.slug,
                    type: 'ai-blog',
                    date: new Date(post.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).replace(/\//g, '.'),
                    category: post.category,
                    title: stripMarkdown(post.title), // マークダウン記法を除去
                    excerpt: post.excerpt ? stripMarkdown(post.excerpt) : '', // 抜粋からもマークダウン記法を除去
                    slug: post.slug,
                    isAiGenerated: true
                }));

                // 既存の投稿とAI投稿を結合
                const existingAsTyped: CombinedPost[] = existingPosts.map(post => ({
                    ...post,
                    isAiGenerated: false
                }));

                const allPosts = [...existingAsTyped, ...aiPosts];

                // 日付順に並べ替え（新しい順）
                allPosts.sort((a, b) => {
                    return new Date(b.date.replace(/\./g, '-')).getTime() -
                        new Date(a.date.replace(/\./g, '-')).getTime();
                });

                setCombinedPosts(allPosts);

                // カテゴリの重複を除去して設定
                const allCategories = ['all', ...Array.from(new Set(allPosts.map(post => post.category)))];
                setCategories(allCategories);
            } catch (error) {
                console.error('ブログ記事取得エラー:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAiBlogPosts();
    }, []);

    // 表示する投稿をフィルタリング
    const filteredPosts = combinedPosts.filter(post =>
        (activeTab === 'all' || post.type === activeTab) &&
        (activeCategory === 'all' || post.category === activeCategory)
    );

    return (
        <div className="min-h-screen pt-0">
            {/* ヒーローセクション */}
            <section className="relative bg-gradient-to-r from-blue-200 to-indigo-900 py-16 md:py-24">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/news/4.jpg"
                        alt="News FIND to DO"
                        fill
                        className="object-cover mix-blend-overlay opacity-5"
                        priority
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-center text-white max-w-4xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">ニュース & ブログ</h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            最新のお知らせと技術情報を発信しています
                        </p>


                    </motion.div>
                </div>
            </section>

            {/* タブとフィルター */}
            <section className="py-8 md:py-12 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        {/* タブ切り替え */}
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`flex items-center px-4 py-2 text-sm md:text-base ${activeTab === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <span className="mr-2">すべて</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('news')}
                                className={`flex items-center px-4 py-2 text-sm md:text-base ${activeTab === 'news'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Newspaper className="w-4 h-4 mr-2" />
                                <span>ニュース</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('blog')}
                                className={`flex items-center px-4 py-2 text-sm md:text-base ${activeTab === 'blog'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Book className="w-4 h-4 mr-2" />
                                <span>オリジナルブログ</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('ai-blog')}
                                className={`flex items-center px-4 py-2 text-sm md:text-base ${activeTab === 'ai-blog'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Book className="w-4 h-4 mr-2" />
                                <span>AIブログ</span>
                            </button>
                        </div>

                        {/* カテゴリーフィルター */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-3 py-1 text-sm rounded-full border ${activeCategory === category
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
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerChildren}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <motion.article
                                        key={`${post.type}-${post.id}`}
                                        variants={fadeInUp}
                                        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105"
                                    >
                                        <Link href={post.isAiGenerated ? `/blog/${post.slug}` : `/news-blog/${post.type}/${post.slug}`}>
                                            <div className={`h-2 ${post.type === 'news'
                                                ? 'bg-blue-600'
                                                : post.type === 'blog'
                                                    ? 'bg-green-600'
                                                    : 'bg-purple-600'
                                                }`}></div>
                                            <div className="p-6">
                                                <div className="flex items-center mb-3">
                                                    <span className={`text-xs px-2 py-1 rounded ${post.type === 'news'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : post.type === 'blog'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-purple-100 text-purple-800'
                                                        }`}>
                                                        {post.type === 'news'
                                                            ? 'ニュース'
                                                            : post.type === 'blog'
                                                                ? 'ブログ'
                                                                : 'AIブログ'}
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
                    )}
                </div>
            </section>
        </div>
    );
}