// src/lib/trends.ts
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * 各カテゴリに対応するトピックキーワード
 */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'プログラミング': ['programming', 'typescript', 'javascript', 'react', 'nextjs', 'coding'],
  'ウェブ開発': ['web development', 'frontend', 'backend', 'full stack', 'web design'],
  'AI技術': ['ai', 'artificial intelligence', 'machine learning', 'llm', 'nlp'],
  'キャリア': ['tech career', 'software engineer', 'it jobs', 'developer skills'],
  'ビジネス': ['startups', 'tech business', 'saas', 'digital transformation'],
};

/**
 * Google News RSSフィードからトレンドトピックを取得
 */
export async function fetchTrendingTopics(category: string, count: number = 5): Promise<string[]> {
  try {
    const categoryKeywords = CATEGORY_KEYWORDS[category] || CATEGORY_KEYWORDS['プログラミング'];
    
    // ランダムにキーワードを選択
    const keyword = categoryKeywords[Math.floor(Math.random() * categoryKeywords.length)];
    
    // Google NewsのRSSフィードを取得
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ja&gl=JP&ceid=JP:ja`;
    
    const response = await axios.get(url);
    const $ = cheerio.load(response.data, { xmlMode: true });
    
    // 記事タイトルを抽出
    const titles: string[] = [];
    $('item title').each((i, elem) => {
      const title = $(elem).text();
      if (title && titles.length < count) {
        titles.push(title);
      }
    });
    
    // 十分なトピックが取得できなかった場合はカテゴリに合わせたトピックを生成
    while (titles.length < count) {
      titles.push(generateTopicForCategory(category));
    }
    
    // カテゴリに合わせてトピックを拡張
    const enhancedTopics = titles.map(title => 
      enhanceTopicForCategory(title, category)
    );
    
    return enhancedTopics;
  } catch (error) {
    console.error('トレンドトピック取得エラー:', error);
    
    // エラー時はフォールバックとして静的トピックを生成
    const topics = [];
    for (let i = 0; i < count; i++) {
      topics.push(generateTopicForCategory(category));
    }
    
    return topics;
  }
}

/**
 * カテゴリ別のトピックを生成
 */
function generateTopicForCategory(category: string): string {
  const topicsByCategory: Record<string, string[]> = {
    'プログラミング': [
      'TypeScriptの最新機能と実践的な使い方',
      'Next.js 15の新機能とパフォーマンス改善',
      'モダンなReactパターンとベストプラクティス',
      'Rustプログラミングの基礎と応用',
      'Pythonの最新トレンドと活用法',
      'JavaScriptのパフォーマンス最適化テクニック',
    ],
    'ウェブ開発': [
      'Web Componentsの実践的な使い方',
      'CSRとSSRの使い分けと最適化',
      'APIファーストアプローチによるバックエンド設計',
      'マイクロフロントエンドアーキテクチャ入門',
      'モバイルファーストデザインの現代的アプローチ',
      '最新CSSフレームワークの比較と選定ガイド',
    ],
    'AI技術': [
      'Gemini APIを活用したアプリケーション開発',
      'LLMプロンプトエンジニアリングの基礎',
      'AIを使ったコンテンツ生成の実践手法',
      'RAGモデルの構築と応用事例',
      '生成AIを活用した業務効率化の実例',
      'AIモデルの評価と最適化手法',
    ],
    'キャリア': [
      'テックキャリアのスタート方法と成長戦略',
      'エンジニアからテックリードへのステップアップ',
      'リモートワークでのパフォーマンス最大化',
      'テック業界の面接対策と転職成功事例',
      'テックスキルポートフォリオの構築方法',
      'エンジニアのためのキャリアパス設計',
    ],
    'ビジネス': [
      'スタートアップでのMVP開発とプロダクト戦略',
      'サービス拡大のためのグロースハック手法',
      'テック業界のビジネスモデルトレンド',
      'SaaSビジネスの立ち上げと成長戦略',
      'デジタルマーケティングの最新アプローチ',
      'テック企業の資金調達戦略',
    ],
  };
  
  const topics = topicsByCategory[category] || topicsByCategory['プログラミング'];
  return topics[Math.floor(Math.random() * topics.length)];
}

/**
 * カテゴリに合わせてトピックを拡張
 */
function enhanceTopicForCategory(topic: string, category: string): string {
  // カテゴリ別のトピック拡張テンプレート
  const templates: Record<string, string[]> = {
    'プログラミング': [
      `${topic}を活用した最新プログラミング手法`,
      `${topic}の基礎から応用まで`,
      `${topic}を使った効率的な開発テクニック`,
    ],
    'ウェブ開発': [
      `${topic}を取り入れたモダンウェブ開発`,
      `${topic}でウェブサイトのパフォーマンスを向上させる方法`,
      `${topic}を活用したレスポンシブデザイン戦略`,
    ],
    'AI技術': [
      `${topic}に活用できるAI技術の最前線`,
      `${topic}とAIの融合：実践的アプローチ`,
      `${topic}の課題をAIで解決する方法`,
    ],
    'キャリア': [
      `${topic}に関連するキャリアパスと成長戦略`,
      `${topic}の専門家になるためのスキルセット`,
      `${topic}業界での転職成功のポイント`,
    ],
    'ビジネス': [
      `${topic}を活用したビジネス成長戦略`,
      `${topic}から学ぶイノベーションの秘訣`,
      `${topic}市場の最新動向と事業機会`,
    ],
  };

  // カテゴリに対応するテンプレートをランダムに選択
  const categoryTemplates = templates[category] || templates['プログラミング'];
  const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
  
  return template;
}

/**
 * トピックに関連するニュースを取得
 */
export async function fetchRelatedNews(topic: string, count: number = 3): Promise<any[]> {
  try {
    // Google News検索URL
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=ja&gl=JP&ceid=JP:ja`;
    
    // RSSフィードを取得（タイムアウトとエンコーディング設定）
    const response = await axios.get(url, {
      timeout: 10000, // 10秒タイムアウト
      responseType: 'text',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
      }
    });
    
    const $ = cheerio.load(response.data, { 
      xmlMode: true,
      decodeEntities: true,
      normalizeWhitespace: true
    });
    
    // ニュース記事を抽出
    const items: any[] = [];
    $('item').slice(0, count).each((i, elem) => {
      const $elem = $(elem);
      const title = $elem.find('title').text();
      const link = $elem.find('link').text();
      const pubDate = $elem.find('pubDate').text();
      const source = $elem.find('source').text();
      const description = $elem.find('description').text();
      
      items.push({
        title: title,
        link: link,
        pubDate: pubDate,
        source: source || 'Google News',
        description: description,
        searchUrl: url // 検索に使用したURLも保存
      });
    });
    
    return items;
  } catch (error) {
    console.error('関連ニュース取得エラー:', error);
    return [];
  }
}