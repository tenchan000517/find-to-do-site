// src/lib/trends.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import { 
  getAllTrends, 
  getZennTrending, 
  getHackerNewsTrending, 
  getCareerTrends,
  TrendItem 
} from './realtime-trends';
import { 
  categorizeAndExtractKeywords, 
  extractTodaysTrends, 
  getDayOfWeekCategory,
  CategoryResult 
} from './trend-categorizer';

/**
 * 各カテゴリに対応するトピックキーワード
 */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'プログラミング': ['programming', 'typescript', 'javascript', 'react', 'nextjs', 'coding'],
  'ウェブ開発': ['web development', 'frontend', 'フロントエンド', 'html', 'css', 'javascript', 'typescript', 'responsive design', 'レスポンシブデザイン', 'ウェブサイト制作'],
  '生成AI': ['chatgpt', 'claude', 'gemini', 'prompt engineering', 'ai automation'],
  'データサイエンス・AI開発': ['data science', 'machine learning', 'deep learning', 'pandas', 'numpy', 'tensorflow', 'pytorch', 'データサイエンス', '機械学習'],
  'キャリア': ['就活', 'インターン', 'ガクチカ', '面接', 'リクルート', 'マイナビ', 'career', 'job hunting'],
  'ビジネス': ['startups', 'tech business', 'saas', 'digital transformation', 'DX推進', 'デジタルトランスフォーメーション', 'マーケティング戦略', '働き方改革', 'リモートワーク', 'コンテンツマーケティング', 'SNSマーケティング', 'SEO対策'],
  '週間総合': ['weekly', 'trending', 'popular', 'viral'],
};

/**
 * 新しいリアルタイムトレンドトピック取得（改善版）
 */
export async function fetchTrendingTopics(category: string, count: number = 5): Promise<string[]> {
  try {
    console.log(`🔥 新リアルタイムトレンド取得開始: カテゴリ=${category}, 件数=${count}`);
    
    // 環境変数で新旧システム切り替え
    const useRealtimeTrends = process.env.USE_REALTIME_TRENDS !== 'false';
    
    if (useRealtimeTrends) {
      // 🆕 新システム: リアルタイムトレンド取得
      const allTrends = await getAllTrends();
      const categorizedTrends = categorizeAndExtractKeywords(allTrends);
      
      console.log(`📊 取得したトレンド総数: ${allTrends.length}件`);
      console.log(`📂 カテゴリ別分類結果:`, Object.entries(categorizedTrends).map(([cat, items]) => `${cat}: ${items.length}件`).join(', '));
      
      // 指定カテゴリのトレンドを取得
      const categoryTrends = categorizedTrends[category as keyof CategoryResult] || [];
      
      if (categoryTrends.length > 0) {
        // 高品質記事を優先して選択
        const selectedTrends = categoryTrends
          .sort((a, b) => {
            const scoreA = a.score || a.likes || 0;
            const scoreB = b.score || b.likes || 0;
            return scoreB - scoreA;
          })
          .slice(0, count)
          .map(trend => trend.title);
        
        console.log(`✅ 新システム成功: ${selectedTrends.length}件のトレンドを取得`);
        return selectedTrends;
      } else {
        console.log(`⚠️ カテゴリ "${category}" のトレンドが不足、フォールバック実行`);
      }
    }
    
    // 🔄 フォールバック: 既存システム（Google News RSS）
    return await fetchTrendingTopicsLegacy(category, count);
    
  } catch (error) {
    console.error('新リアルタイムトレンド取得エラー:', error);
    
    // エラー時は既存システムを使用
    return await fetchTrendingTopicsLegacy(category, count);
  }
}

/**
 * 既存システム（Google News RSS）- フォールバック用
 */
async function fetchTrendingTopicsLegacy(category: string, count: number = 5): Promise<string[]> {
  try {
    console.log(`📰 レガシーシステム（Google News RSS）実行: カテゴリ=${category}`);
    
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
    
    // ✅ 修正: enhanceTopicForCategory を呼び出さない（元タイトル保持）
    console.log(`📰 レガシーシステム成功: ${titles.length}件取得`);
    return titles;
    
  } catch (error) {
    console.error('レガシーシステムエラー:', error);
    
    // 最終フォールバック: 静的トピック生成
    const topics = [];
    for (let i = 0; i < count; i++) {
      topics.push(generateTopicForCategory(category));
    }
    
    console.log(`🔧 静的フォールバック: ${topics.length}件生成`);
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
      'フロントエンド開発の最新トレンドと実践',
      'レスポンシブデザインの基礎と応用テクニック',
      'CSS Grid/Flexboxを使ったモダンレイアウト',
      'JavaScript ES2024の新機能と活用法',
      'TypeScriptによる型安全なWeb開発',
      'Webパフォーマンス最適化の実践ガイド',
    ],
    'キャリア': [
      '就活面接でよく聞かれる質問と回答例',
      'ガクチカの書き方と効果的なエピソード作成法',
      'インターンシップの選び方と内定獲得術',
      '大手企業vs中小企業の選び方と特徴比較',
      '履歴書・ESの書き方完全ガイド',
      '就活イベント活用法と企業研究の進め方',
    ],
    'データサイエンス・AI開発': [
      'Pythonでデータ分析入門：pandas・numpyの基礎',
      '機械学習プロジェクトの始め方と実践手法',
      'TensorFlow/PyTorchによる深層学習実装',
      'データビジュアリゼーションの効果的な手法',
      'ビッグデータ処理とApache Sparkの活用',
      'Jupyter Notebookを使った効率的な分析フロー',
    ],
    'ビジネス': [
      'DX推進による企業変革の成功事例',
      'コンテンツマーケティングの戦略と実践',
      'リモートワーク時代の組織運営とマネジメント',
      'SNSマーケティングで顧客獲得を最大化する方法',
      'SEO対策による効果的なWeb集客術',
      '働き方改革で実現する生産性向上施策',
    ],
  };
  
  // カテゴリ名の変更に対応
  const adjustedCategory = category === 'ウェブ・アプリ開発' ? 'ウェブ開発' : category;
  const topics = topicsByCategory[adjustedCategory] || topicsByCategory['プログラミング'];
  return topics[Math.floor(Math.random() * topics.length)];
}

/**
 * カテゴリに合わせてトピックを拡張（修正版：元タイトル保持）
 */
function enhanceTopicForCategory(topic: string, category: string): string {
  // 元のトピックをそのまま返す（検索可能性を維持）
  // 長文化によってfetchRelatedNewsが失敗するのを防ぐ
  return topic;
}

/**
 * トピックに関連するニュース取得（改善版）
 */
export async function fetchRelatedNews(topic: string, count: number = 3): Promise<any[]> {
  try {
    console.log(`📰 関連ニュース取得開始: トピック="${topic}"`);
    
    // 🔍 検索クエリ最適化: 長すぎるトピックは短縮
    let searchQuery = topic;
    if (topic.length > 50) {
      // 長文の場合、最初の主要部分のみを使用
      searchQuery = topic.split(/[：:・を]/)[0].trim();
      console.log(`🔧 検索クエリ最適化: "${topic}" → "${searchQuery}"`);
    }
    
    // Google News検索URL
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=ja&gl=JP&ceid=JP:ja`;
    
    // RSSフィードを取得（タイムアウトとエンコーディング設定）
    const response = await axios.get(url, {
      timeout: 10000, // 10秒タイムアウト
      responseType: 'text',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
      }
    });
    
    const $ = cheerio.load(response.data, { 
      xmlMode: true
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
      
      // データ品質チェック
      if (title && title.length > 10 && link && link.startsWith('http')) {
        items.push({
          title: title,
          link: link,
          pubDate: pubDate,
          source: source || 'Google News',
          description: description,
          searchUrl: url,
          originalTopic: topic,
          optimizedQuery: searchQuery
        });
      }
    });
    
    console.log(`📰 関連ニュース取得完了: ${items.length}件 (クエリ: "${searchQuery}")`);
    return items;
  } catch (error) {
    console.error('関連ニュース取得エラー:', error);
    return [];
  }
}

/**
 * 🆕 新機能：リアルタイムトレンドから関連ニュースを取得
 */
export async function fetchRelatedNewsFromTrends(topic: string, count: number = 3): Promise<any[]> {
  try {
    console.log(`🔥 トレンドベース関連ニュース取得: トピック="${topic}"`);
    
    // リアルタイムトレンドから関連情報を取得
    const allTrends = await getAllTrends();
    
    // トピックに関連するトレンドアイテムを検索
    const relatedTrends = allTrends.filter(trend => {
      const topicLower = topic.toLowerCase();
      const titleLower = trend.title.toLowerCase();
      
      // タイトルの類似度チェック
      const commonWords = topicLower.split(' ').filter(word => 
        word.length > 2 && titleLower.includes(word)
      );
      
      return commonWords.length > 0 || 
             titleLower.includes(topicLower) ||
             (trend.topics && trend.topics.some(t => topicLower.includes(t.toLowerCase())));
    });
    
    if (relatedTrends.length > 0) {
      console.log(`🎯 トレンドから関連記事発見: ${relatedTrends.length}件`);
      
      // 高品質順にソートして選択
      const selectedTrends = relatedTrends
        .sort((a, b) => {
          const scoreA = a.score || a.likes || 0;
          const scoreB = b.score || b.likes || 0;
          return scoreB - scoreA;
        })
        .slice(0, count);
      
      // フォーマットを統一
      return selectedTrends.map(trend => ({
        title: trend.title,
        link: trend.url,
        pubDate: trend.publishedAt,
        source: trend.source,
        description: `${trend.source}からの高品質記事`,
        searchUrl: `trend-based-${trend.source}`,
        originalTopic: topic,
        trendScore: trend.score || trend.likes || 0
      }));
    }
    
    // トレンドから見つからない場合は通常の検索にフォールバック
    console.log(`🔄 トレンドに関連記事なし、Google News検索にフォールバック`);
    return await fetchRelatedNews(topic, count);
    
  } catch (error) {
    console.error('トレンドベース関連ニュース取得エラー:', error);
    // エラー時は通常の検索にフォールバック
    return await fetchRelatedNews(topic, count);
  }
}

/**
 * 🆕 今日のトレンド取得（曜日別）
 */
export async function getTodaysTrendsByCategory(): Promise<Record<string, string[]>> {
  try {
    console.log(`📅 今日のトレンド取得開始`);
    
    const allTrends = await getAllTrends();
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    const todaysTrends = extractTodaysTrends(categorizedTrends);
    
    console.log(`📊 今日のトレンド取得完了:`, Object.entries(todaysTrends).map(([cat, items]) => `${cat}: ${items.length}件`).join(', '));
    
    return todaysTrends;
  } catch (error) {
    console.error('今日のトレンド取得エラー:', error);
    return {};
  }
}