// src/lib/trend-categorizer.ts
import { TrendItem } from './realtime-trends';

/**
 * カテゴリ分類結果
 */
export interface CategoryResult {
  プログラミング: TrendItem[];
  'ウェブ開発': TrendItem[];
  '生成AI': TrendItem[];
  'データサイエンス・AI開発': TrendItem[];
  'キャリア': TrendItem[];
  'ビジネス': TrendItem[];
  '勉強・自己啓発': TrendItem[];
  '週間総合': TrendItem[];
}

/**
 * カテゴリ別キーワード辞書（拡充版）
 */
const CATEGORY_KEYWORDS = {
  'プログラミング': [
    // 基本プログラミング概念
    'programming', 'code', 'coding', 'algorithm', 'data structure', 
    'clean code', 'refactoring', 'software engineering', 'design pattern',
    'プログラミング', 'アルゴリズム', 'データ構造', 'ソフトウェア工学',
    // システム系言語
    'python', 'rust', 'go', 'java', 'c++', 'c#', 'kotlin', 'swift',
    'ruby', 'php', 'scala', 'dart',
    // バックエンド技術
    'node.js', 'express', 'fastify', 'nest.js', 'spring', 'django',
    'flask', 'laravel', 'rails'
  ],
  
  'ウェブ開発': [
    // ウェブ開発言語・技術
    'javascript', 'typescript', 'es6', 'es2024', 'vanilla js',
    'frontend', 'web development', 'html', 'css', 'sass', 'tailwind', 'bootstrap',
    'フロントエンド', 'ウェブ開発', 'フロントエンド開発', 'ウェブサイト制作',
    // ウェブフレームワーク（ウェブ開発の主要技術）
    'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'gatsby',
    'react native', 'vue3', 'react hooks', 'vue composition',
    // CSS・スタイリング
    'css grid', 'flexbox', 'css modules', 'styled components',
    'responsive', 'mobile-first', 'レスポンシブ', 'レスポンシブデザイン',
    // ウェブ技術・機能
    'pwa', 'spa', 'ssr', 'ssg', 'jamstack',
    'web components', 'web assembly', 'service worker', 'websocket',
    // パフォーマンス・最適化
    'web performance', 'lighthouse', 'core web vitals', 'optimization',
    'lazy loading', 'code splitting', 'bundle size', 'web vitals',
    // アクセシビリティ・UX
    'accessibility', 'a11y', 'wcag', 'user experience', 'ui design',
    // フロントエンドテスト
    'web testing', 'e2e testing', 'cypress', 'playwright', 'jest', 'vitest'
  ],

  '生成AI': [
    // 生成AIツール・サービス
    'chatgpt', 'claude', 'gemini', 'copilot', 'stable diffusion', 'midjourney',
    'dall-e', 'openai', 'anthropic', 'google ai', 'microsoft copilot',
    // 実用・活用
    'prompt engineering', 'prompt design', 'ai writing', 'ai art',
    'プロンプト', 'プロンプトエンジニアリング', 'AI活用', 'AI利用',
    // ビジネス活用
    'ai automation', 'ai workflow', 'ai productivity', 'ai assistant',
    'AI自動化', 'AI効率化', 'AIアシスタント', 'AI導入',
    // 生成AI特有機能
    'text generation', 'image generation', 'code generation', 'ai chat',
    'rag', 'retrieval augmented generation', 'few-shot', 'zero-shot',
    // 倫理・社会的側面
    'ai ethics', 'ai safety', 'ai bias', 'responsible ai'
  ],
  
  'キャリア': [
    // 就活基本
    '就活', '就職活動', '新卒', '新卒採用', '中途採用', '転職', 'キャリア',
    'job hunting', 'career', 'job search', 'employment',
    // 面接・選考プロセス
    '面接', '面接対策', '面接練習', 'ガクチカ', 'ガクチカ 例文',
    '自己PR', '志望動機', '履歴書', 'ES', 'エントリーシート',
    'interview', 'resume', 'cover letter', 'self-introduction',
    // インターン・体験
    'インターン', 'インターンシップ', '職場体験', 'OB訪問', 'OG訪問',
    '企業研究', '業界研究', 'internship', 'work experience',
    // 就活サービス・プラットフォーム
    'リクルート', 'マイナビ', 'リクナビ', 'ワンキャリア', 'OpenWork',
    'キャリタス', 'あさがくナビ', '就活サイト', '転職サイト',
    // イベント・説明会
    '合同企業説明会', '就活フェア', '企業説明会', '採用イベント',
    '就活イベント', 'セミナー', '説明会', 'job fair',
    // 業界・職種（幅広く）
    '営業', 'マーケティング', '事務', '総合職', '一般職', 'コンサル',
    '公務員', '教員', '看護師', '薬剤師', '金融', '商社', 'メーカー',
    // 学生向け
    '大学生', '学生', '就活生', '内定', '内々定', '就活支援',
    'キャリアセンター', '就職課', '進路相談', 'university student',
    // 資格・スキル
    'TOEIC', '簿記', 'FP', 'MOS', '宅建', '公認会計士', 'USCPA',
    // 働き方・労働条件
    '年収', '給料', '福利厚生', '有給', 'ワークライフバランス',
    'リモートワーク', '在宅勤務', '残業', '働き方改革'
  ],
  
  'ビジネス': [
    // DX・デジタル化
    'digital transformation', 'dx', 'DX推進', 'デジタルトランスフォーメーション',
    'デジタル化', 'IT化', 'システム導入', '業務効率化',
    // マーケティング戦略
    'marketing', 'マーケティング戦略', 'コンテンツマーケティング',
    'snsマーケティング', 'SNSマーケティング', 'デジタルマーケティング',
    'seo対策', 'SEO対策', '検索エンジン最適化', 'Web集客',
    // 働き方・組織改革
    '働き方改革', 'リモートワーク', '在宅勤務', 'ハイブリッドワーク',
    'ワークライフバランス', '組織管理', 'チームマネジメント',
    // 事業戦略・成長
    'growth hack', 'グロースハック', '事業成長', '売上向上',
    '顧客獲得', '顧客満足', 'カスタマーサクセス', 'CX向上',
    // スタートアップ・起業
    'startup', 'スタートアップ', '起業', '新事業', 'ビジネスモデル',
    'saas', 'b2b', 'b2c', 'サブスクリプション', '定額サービス'
  ],
  
  '勉強・自己啓発': [
    // 自己啓発書籍
    '7つの習慣', 'アドラー心理学', 'バレットジャーナル', 'ライフハック',
    'productivity', 'habit', 'goal setting', 'time management',
    '生産性', '習慣', '目標設定', 'タスク管理',
    // 学習・成長
    'learning', 'study', 'education', 'training', 'self-improvement',
    '学習', '勉強', '教育', '研修', '自己啓発', '成長',
    // ビジネススキル
    'communication', 'presentation', 'negotiation', 'leadership',
    'コミュニケーション', 'プレゼンテーション', '交渉', 'リーダーシップ',
    // 思考法・戦略
    'critical thinking', 'problem solving', 'decision making',
    '論理的思考', '問題解決', '意思決定', 'システム思考'
  ],

  'データサイエンス・AI開発': [
    // データサイエンス・分析
    'data science', 'data analysis', 'analytics', 'statistics', 'pandas', 'numpy',
    'データサイエンス', 'データ分析', '統計', 'アナリティクス',
    // 機械学習・深層学習
    'machine learning', 'ml', 'deep learning', 'neural network', 'tensorflow', 'pytorch',
    'scikit-learn', 'keras', 'xgboost', 'lightgbm',
    '機械学習', '深層学習', 'ニューラルネットワーク', 'AI開発',
    // ビッグデータ・データエンジニアリング
    'big data', 'data engineering', 'etl', 'data pipeline', 'spark', 'hadoop',
    'airflow', 'kafka', 'elasticsearch', 'data warehouse',
    'ビッグデータ', 'データエンジニアリング', 'データパイプライン',
    // ビジュアリゼーション・ダッシュボード
    'visualization', 'dashboard', 'tableau', 'power bi', 'matplotlib', 'seaborn',
    'plotly', 'bokeh', 'd3.js', 'jupyter', 'notebook',
    '可視化', 'ダッシュボード', 'グラフ', 'チャート'
  ],

  '週間総合': [
    // このカテゴリは自動分類されない（特別カテゴリ）
    // 週間で最も注目されたトピックを全カテゴリから集約
    'weekly', 'trending', 'popular', 'hot topic', 'viral',
    '週間', 'トレンド', '人気', '注目', 'バズ'
  ]
};

/**
 * トレンドアイテムのカテゴリ自動分類
 */
export function categorizeAndExtractKeywords(trends: TrendItem[]): CategoryResult {
  const result: CategoryResult = {
    'プログラミング': [],
    'ウェブ開発': [],
    '生成AI': [],
    'データサイエンス・AI開発': [],
    'キャリア': [],
    'ビジネス': [],
    '勉強・自己啓発': [],
    '週間総合': []
  };

  trends.forEach((item: any) => {
    const category = classifyItem(item);
    if (category && result[category]) {
      result[category].push(item);
    }
  });

  return result;
}

/**
 * 単一アイテムのカテゴリ分類
 */
function classifyItem(item: TrendItem): keyof CategoryResult | null {
  const text = `${item.title} ${item.topics?.join(' ') || ''}`.toLowerCase();
  
  // 既にカテゴリが設定されている場合はそれを優先
  if (item.category && item.category in CATEGORY_KEYWORDS) {
    return item.category as keyof CategoryResult;
  }

  // 各カテゴリでのマッチ度を計算
  const scores: Record<string, number> = {};
  
  Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
    let score = 0;
    keywords.forEach(keyword => {
      if (text.includes(keyword.toLowerCase())) {
        // 完全一致は高スコア、部分一致は低スコア
        const matchScore = text.includes(` ${keyword.toLowerCase()} `) ? 2 : 1;
        score += matchScore;
      }
    });
    scores[category] = score;
  });

  // 最高スコアのカテゴリを選択（閾値: 1以上）
  let bestCategory = null;
  let bestScore = 1; // 最低閾値
  
  Object.entries(scores).forEach(([category, score]) => {
    if (score > bestScore) {
      bestCategory = category;
      bestScore = score;
    }
  });

  return bestCategory as keyof CategoryResult | null;
}

/**
 * カテゴリ別の今日のトップトピックを抽出
 */
export function extractTodaysTrends(categorizedTrends: CategoryResult): Record<string, string[]> {
  const todaysTrends: Record<string, string[]> = {};
  
  Object.entries(categorizedTrends).forEach(([category, items]) => {
    // 各カテゴリから上位5件のタイトルを抽出
    const topTitles = items
      .sort((a: TrendItem, b: TrendItem) => {
        // スコア順、いいね順、コメント順でソート
        const scoreA = a.score || a.likes || 0;
        const scoreB = b.score || b.likes || 0;
        return scoreB - scoreA;
      })
      .slice(0, 5)
      .map((item: TrendItem) => item.title);
    
    if (topTitles.length > 0) {
      todaysTrends[category] = topTitles;
    }
  });
  
  return todaysTrends;
}

/**
 * カテゴリからキーワードを抽出
 */
export function extractKeywordFromTitle(title: string): string[] {
  const keywords: string[] = [];
  const titleLower = title.toLowerCase();
  
  // 全カテゴリのキーワードから一致するものを抽出
  Object.values(CATEGORY_KEYWORDS).flat().forEach(keyword => {
    if (titleLower.includes(keyword.toLowerCase())) {
      keywords.push(keyword);
    }
  });
  
  // 重複除去して返す
  return Array.from(new Set(keywords));
}

/**
 * 曜日別カテゴリマッピング
 */
export function getDayOfWeekCategory(date: Date = new Date()): keyof CategoryResult {
  const dayOfWeek = date.getDay(); // 0: 日曜, 1: 月曜, ...
  
  const weeklyRotation: Record<number, keyof CategoryResult> = {
    1: 'キャリア',                // 月曜
    2: '生成AI',                  // 火曜
    3: 'ビジネス',                // 水曜
    4: 'プログラミング',           // 木曜
    5: '勉強・自己啓発',          // 金曜
    6: 'データサイエンス・AI開発', // 土曜
    0: 'ウェブ開発'               // 日曜日（週間総合として）
  };
  
  return weeklyRotation[dayOfWeek] || 'プログラミング';
}

/**
 * 品質スコア計算
 */
export function calculateQualityScore(item: TrendItem): number {
  let score = 0;
  
  // ソース別基礎点
  const sourceScores: Record<string, number> = {
    'Zenn API': 40,
    'Hacker News': 35,
    'GitHub Trending': 25,
    'キャリアトレンド生成': 15,
    '勉強・自己啓発生成': 15
  };
  
  score += sourceScores[item.source] || 10;
  
  // エンゲージメント指標
  if (item.likes && item.likes > 50) score += 20;
  if (item.likes && item.likes > 20) score += 10;
  if (item.score && item.score > 100) score += 20;
  if (item.score && item.score > 50) score += 10;
  if (item.comments && item.comments > 10) score += 15;
  if (item.comments && item.comments > 5) score += 5;
  
  // タイトル品質
  if (item.title.length > 20 && item.title.length < 100) score += 10;
  if (item.topics && item.topics.length > 0) score += 5;
  
  return Math.min(score, 100); // 最大100点
}

/**
 * カテゴリ別統計情報
 */
export function getCategoryStats(categorizedTrends: CategoryResult): Record<string, any> {
  const stats: Record<string, any> = {};
  
  Object.entries(categorizedTrends).forEach(([category, items]) => {
    const totalItems = items.length;
    const avgQuality = totalItems > 0 ? 
      items.reduce((sum: number, item: TrendItem) => sum + calculateQualityScore(item), 0) / totalItems : 0;
    
    const highQualityCount = items.filter((item: TrendItem) => calculateQualityScore(item) > 70).length;
    
    stats[category] = {
      totalItems,
      avgQuality: Math.round(avgQuality),
      highQualityCount,
      highQualityRatio: totalItems > 0 ? Math.round((highQualityCount / totalItems) * 100) : 0,
      sources: Array.from(new Set(items.map((item: TrendItem) => item.source)))
    };
  });
  
  return stats;
}