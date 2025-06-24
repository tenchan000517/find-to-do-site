// src/lib/realtime-trends.ts
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * トレンドアイテムの統一データ構造
 */
export interface TrendItem {
  id: string;
  title: string;
  url: string;
  score?: number;
  likes?: number;
  comments?: number;
  source: string;
  publishedAt: string;
  topics?: string[];
  category?: string;
}

/**
 * Zenn API - 最優秀ソース（80件取得、高品質記事20%）
 */
export async function getZennTrending(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    const endpoints = [
      'https://zenn.dev/api/articles?order=liked_count&count=100',
      'https://zenn.dev/api/articles?order=trending&count=50',
      'https://zenn.dev/api/articles?order=latest&count=30'
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`Zenn API取得中: ${endpoint}`);
        
        const response = await axios.get(endpoint, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; TrendBot/1.0)',
            'Accept': 'application/json'
          }
        });

        if (response.data && response.data.articles) {
          response.data.articles.forEach((article: any) => {
            // 品質フィルタを緩和: いいね20+またはいいね10+ AND コメント3+
            const isHighQuality = article.liked_count > 20 || 
                                 (article.liked_count > 10 && article.comments_count > 3);
            
            if (isHighQuality) {
              results.push({
                id: `zenn-${article.id}`,
                title: article.title,
                url: `https://zenn.dev${article.path}`,
                likes: article.liked_count,
                comments: article.comments_count,
                source: 'Zenn API',
                publishedAt: article.published_at,
                topics: article.topics ? article.topics.map((t: any) => t.name) : []
              });
            }
          });
        }

        // レート制限対策: 500ms待機
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (endpointError) {
        console.error(`Zenn API エンドポイントエラー: ${endpoint}`, endpointError);
      }
    }

    console.log(`Zenn API取得完了: ${results.length}件`);
    return results;
  } catch (error) {
    console.error('Zenn API取得エラー:', error);
    return [];
  }
}

/**
 * Hacker News API - 高品質（30件取得、海外技術情報）
 */
export async function getHackerNewsTrending(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    console.log('Hacker News API取得開始');
    
    // Step 1: トップストーリーIDを取得
    const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    const topStoriesResponse = await axios.get(topStoriesUrl, { timeout: 10000 });
    const topStories = topStoriesResponse.data;

    if (!Array.isArray(topStories)) {
      throw new Error('Invalid top stories format');
    }

    // Step 2: 上位30件の個別記事を取得
    const itemsToFetch = Math.min(30, topStories.length);
    
    for (let i = 0; i < itemsToFetch; i++) {
      try {
        const itemId = topStories[i];
        const itemUrl = `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`;
        
        const itemResponse = await axios.get(itemUrl, { timeout: 10000 });
        const item = itemResponse.data;

        // フィルタ条件: type='story' AND score>10
        if (item && item.type === 'story' && item.title && item.score > 10) {
          results.push({
            id: `hn-${item.id}`,
            title: item.title,
            url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
            score: item.score,
            comments: item.descendants || 0,
            source: 'Hacker News',
            publishedAt: new Date(item.time * 1000).toISOString(),
            topics: extractTopicsFromTitle(item.title)
          });
        }

        // レート制限対策: 100ms待機
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (itemError) {
        console.error(`Hacker News アイテム取得エラー: ${topStories[i]}`, itemError);
      }
    }

    console.log(`Hacker News取得完了: ${results.length}件`);
    return results;
  } catch (error) {
    console.error('Hacker News API取得エラー:', error);
    return [];
  }
}

/**
 * GitHub Trending - HTML解析（件数多いが改良必要）
 */
export async function getGitHubTrending(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    const languages = ['javascript', 'typescript', 'python', 'any'];
    const periods = ['daily', 'weekly'];

    for (const language of languages) {
      for (const period of periods) {
        try {
          const url = `https://github.com/trending/${language}?since=${period}`;
          console.log(`GitHub Trending取得中: ${url}`);
          
          const response = await axios.get(url, {
            timeout: 15000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });

          const $ = cheerio.load(response.data);
          
          $('h2.h3 a').each((i, elem) => {
            const href = $(elem).attr('href');
            const title = $(elem).text().trim();
            
            if (href && title && !href.includes('/login?return_to=')) {
              const repoUrl = `https://github.com${href}`;
              
              // 有効URLチェック
              if (isValidRepoUrl(repoUrl)) {
                results.push({
                  id: `github-${href.replace('/', '-')}`,
                  title: title,
                  url: repoUrl,
                  source: 'GitHub Trending',
                  publishedAt: new Date().toISOString(),
                  topics: [language, period]
                });
              }
            }
          });

          // レート制限対策: 1秒待機
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (langError) {
          console.error(`GitHub Trending エラー: ${language}-${period}`, langError);
        }
      }
    }

    console.log(`GitHub Trending取得完了: ${results.length}件`);
    return results;
  } catch (error) {
    console.error('GitHub Trending取得エラー:', error);
    return [];
  }
}

/**
 * 有効なリポジトリURLかチェック
 */
function isValidRepoUrl(url: string): boolean {
  return !url.includes('/login?return_to=') && 
         !url.includes('/sponsors/') &&
         url.includes('/') && 
         url.split('/').length >= 5;
}

/**
 * タイトルからトピックを抽出（簡易版）
 */
function extractTopicsFromTitle(title: string): string[] {
  const techKeywords = [
    'AI', 'ML', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Python', 
    'Rust', 'Go', 'API', 'Docker', 'Kubernetes', 'AWS', 'GitHub'
  ];
  
  const topics: string[] = [];
  const titleLower = title.toLowerCase();
  
  techKeywords.forEach(keyword => {
    if (titleLower.includes(keyword.toLowerCase())) {
      topics.push(keyword);
    }
  });
  
  return topics;
}

/**
 * キャリア系トレンド生成（週次ローテーション対応）
 */
export async function getCareerTrends(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    console.log('キャリア系トレンド生成開始');
    
    // 拡張キーワード戦略（15個以上）
    const expandedCareerKeywords = [
      // 基本キーワード
      '転職', 'キャリア', '就活', '働き方', 'スキルアップ', '副業', 'フリーランス',
      // 学生・新卒
      '新卒', 'インターン', '面接', '履歴書', 'ガクチカ', '就職活動',
      // 2025年トレンド
      'AI活用', 'DX人材', 'リスキリング', 'ジョブ型雇用', 'Z世代', 'ウェルビーイング'
    ];

    // 季節性キーワード自動調整
    const currentMonth = new Date().getMonth() + 1;
    const seasonalKeywords = getSeasonalKeywords(currentMonth);
    
    // キーワードベースでトレンドトピック生成
    const selectedKeywords = [...expandedCareerKeywords, ...seasonalKeywords].slice(0, 15);
    
    selectedKeywords.forEach((keyword, index) => {
      results.push({
        id: `career-trend-${index}`,
        title: generateCareerTopic(keyword, currentMonth),
        url: `https://example.com/career/${keyword}`,
        source: 'キャリアトレンド生成',
        publishedAt: new Date().toISOString(),
        topics: [keyword, 'キャリア'],
        category: 'キャリア'
      });
    });

    console.log(`キャリア系トレンド生成完了: ${results.length}件`);
    return results;
  } catch (error) {
    console.error('キャリア系トレンド生成エラー:', error);
    return [];
  }
}

/**
 * 季節性キーワード取得
 */
function getSeasonalKeywords(month: number): string[] {
  if (month >= 3 && month <= 5) return ['新卒採用', '入社式', '新人研修'];
  if (month >= 6 && month <= 8) return ['夏ボーナス', 'インターンシップ'];
  if (month >= 9 && month <= 11) return ['昇進', 'キャリアアップ', '転職シーズン'];
  return ['年収', '冬ボーナス', '来年度計画'];
}

/**
 * キャリアトピック生成
 */
function generateCareerTopic(keyword: string, month: number): string {
  const templates = [
    `2025年の${keyword}トレンドと最新動向`,
    `${keyword}で成功するための実践ガイド`,
    `プロが教える${keyword}の極意`,
    `${keyword}初心者から上級者への道のり`,
    `${keyword}市場の現状と将来性分析`
  ];
  
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template;
}

/**
 * ビジネス記事専門取得
 */
export async function getBusinessTrends(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    console.log('ビジネス記事専門取得開始');
    
    const businessKeywords = [
      'DX推進', 'デジタル変革', 'ビジネス戦略', 'マーケティング戦略',
      '働き方改革', 'スタートアップ', '事業成長', 'イノベーション',
      '経営戦略', '新規事業', 'ビジネスモデル', 'カスタマーサクセス'
    ];
    
    for (const keyword of businessKeywords.slice(0, 8)) {
      try {
        console.log(`ビジネス記事検索中: ${keyword}`);
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ja&gl=JP&ceid=JP:ja`;
        
        const response = await axios.get(rssUrl, {
          timeout: 8000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; TrendBot/1.0)'
          }
        });
        
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        $('item').slice(0, 3).each((index, element) => {
          const title = $(element).find('title').text();
          const link = $(element).find('link').text();
          const pubDate = $(element).find('pubDate').text();
          const description = $(element).find('description').text();
          
          if (title && link) {
            results.push({
              id: `business-${Date.now()}-${index}`,
              title: title,
              url: link,
              source: 'Google News (ビジネス)',
              publishedAt: pubDate || new Date().toISOString(),
              description: description,
              topics: [keyword]
            });
          }
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`ビジネス記事検索エラー (${keyword}):`, error);
      }
    }
    
    console.log(`ビジネス記事取得完了: ${results.length}件`);
    return results;
  } catch (error) {
    console.error('ビジネス記事取得エラー:', error);
    return [];
  }
}

/**
 * プログラミング記事専門取得
 */
export async function getProgrammingTrends(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    console.log('プログラミング記事専門取得開始');
    
    const programmingKeywords = [
      'Python プログラミング',
      'Java 開発',
      'Go言語',
      'Rust プログラミング',
      'アルゴリズム 実装',
      'データ構造',
      '設計パターン',
      'クリーンコード'
    ];
    
    for (const keyword of programmingKeywords) {
      try {
        console.log(`プログラミング記事検索中: ${keyword}`);
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ja&gl=JP&ceid=JP:ja`;
        
        const response = await axios.get(rssUrl, {
          timeout: 8000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; TrendBot/1.0)'
          }
        });
        
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        $('item').slice(0, 2).each((index, element) => {
          const title = $(element).find('title').text();
          const link = $(element).find('link').text();
          const pubDate = $(element).find('pubDate').text();
          const description = $(element).find('description').text();
          
          if (title && link) {
            results.push({
              id: `programming-${Date.now()}-${index}`,
              title: title,
              url: link,
              source: 'Google News (プログラミング)',
              publishedAt: pubDate || new Date().toISOString(),
              description: description,
              topics: [keyword]
            });
          }
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`プログラミング記事検索エラー (${keyword}):`, error);
      }
    }
    
    console.log(`プログラミング記事取得完了: ${results.length}件`);
    return results;
  } catch (error) {
    console.error('プログラミング記事取得エラー:', error);
    return [];
  }
}

/**
 * データサイエンス・AI開発記事専門取得
 */
export async function getDataScienceTrends(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    console.log('データサイエンス・AI開発記事専門取得開始');
    
    const dataScienceKeywords = [
      'データサイエンス',
      '機械学習 実装',
      'Python データ分析',
      'pandas 活用',
      '統計分析',
      'ビッグデータ',
      'データ可視化',
      'MLOps'
    ];
    
    for (const keyword of dataScienceKeywords) {
      try {
        console.log(`データサイエンス記事検索中: ${keyword}`);
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ja&gl=JP&ceid=JP:ja`;
        
        const response = await axios.get(rssUrl, {
          timeout: 8000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; TrendBot/1.0)'
          }
        });
        
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        $('item').slice(0, 2).each((index, element) => {
          const title = $(element).find('title').text();
          const link = $(element).find('link').text();
          const pubDate = $(element).find('pubDate').text();
          const description = $(element).find('description').text();
          
          if (title && link) {
            results.push({
              id: `datascience-${Date.now()}-${index}`,
              title: title,
              url: link,
              source: 'Google News (データサイエンス)',
              publishedAt: pubDate || new Date().toISOString(),
              description: description,
              topics: [keyword]
            });
          }
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`データサイエンス記事検索エラー (${keyword}):`, error);
      }
    }
    
    console.log(`データサイエンス記事取得完了: ${results.length}件`);
    return results;
  } catch (error) {
    console.error('データサイエンス記事取得エラー:', error);
    return [];
  }
}

/**
 * AI技術専門情報の追加取得（関連度計算は削除して簡素化）
 */
export async function getAITechTrends(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    console.log('AI技術専門情報取得開始');
    
    const aiTechKeywords = [
      'machine learning 論文',
      'deep learning 研究',
      'AI アルゴリズム',
      'neural network'
    ];
    
    for (const keyword of aiTechKeywords.slice(0, 4)) {
      try {
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ja&gl=JP&ceid=JP:ja`;
        const response = await axios.get(rssUrl, {
          timeout: 8000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; TrendBot/1.0)'
          }
        });
        
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        $('item').slice(0, 2).each((index, element) => {
          const title = $(element).find('title').text();
          const link = $(element).find('link').text();
          const pubDate = $(element).find('pubDate').text();
          const description = $(element).find('description').text();
          
          if (title && link) {
            results.push({
              id: `ai-tech-${Date.now()}-${index}`,
              title: title,
              url: link,
              source: 'Google News (AI技術)',
              publishedAt: pubDate || new Date().toISOString(),
              description: description,
              topics: [keyword]
            });
          }
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`AI技術記事検索エラー (${keyword}):`, error);
      }
    }
    
    console.log(`AI技術専門情報: ${results.length}件取得`);
    return results;
    
  } catch (error) {
    console.error('AI技術専門情報取得エラー:', error);
    return [];
  }
}

/**
 * AI技術関連度計算
 */
function calculateAITechRelevance(title: string, description: string): number {
  const text = (title + ' ' + description).toLowerCase();
  
  const techKeywords = [
    'algorithm', 'model', 'dataset', 'training', 'inference',
    'accuracy', 'performance', 'optimization', 'research', 'paper',
    'framework', 'library', 'implementation', 'architecture',
    'アルゴリズム', 'モデル', 'データセット', '学習', '推論',
    '精度', '性能', '最適化', '研究', '論文', '実装', 'アーキテクチャ'
  ];
  
  const businessKeywords = [
    'chatgpt', 'claude', 'gemini', 'prompt', 'automation',
    'productivity', 'workflow', 'assistant', 'chat',
    'プロンプト', '自動化', '効率化', 'アシスタント'
  ];
  
  let techScore = 0;
  let businessScore = 0;
  
  techKeywords.forEach(keyword => {
    if (text.includes(keyword)) techScore++;
  });
  
  businessKeywords.forEach(keyword => {
    if (text.includes(keyword)) businessScore++;
  });
  
  // 技術スコアが高く、ビジネススコアが低い場合に高い関連度
  return techScore > businessScore ? (techScore / (techScore + businessScore + 1)) : 0.3;
}

/**
 * 生成AI専門情報の追加取得
 */
export async function getGenerativeAITrends(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    console.log('生成AI専門情報取得開始');
    
    // 生成AI専門キーワード（Claude Code & バイブコーディング強化版）
    const genAIKeywords = [
      'claude code', 'バイブコーディング', 'vibe coding', // 追加
      'chatgpt', 'claude', 'gemini', 'copilot', 'prompt engineering',
      'ai automation', 'ai productivity', 'generative ai',
      'ChatGPT活用', 'AI導入', 'プロンプトエンジニアリング', 
      'claude anthropic', 'anthropic claude', 'claude ai' // 追加
    ];
    
    // 各キーワードでGoogle NewsのRSS検索（拡張版: 8キーワード）
    for (const keyword of genAIKeywords.slice(0, 8)) {
      try {
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ja&gl=JP&ceid=JP:ja`;
        const response = await fetch(rssUrl, {
          headers: { 
            'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)' 
          },
          timeout: 10000
        });
        
        if (response.ok) {
          const rssText = await response.text();
          const items = parseRSSFeed(rssText);
          
          // 生成AI関連度の高い記事のみ抽出（Claude code/バイブコーディングは関連度を緩める）
          const isClaudeOrVibeCoding = keyword.toLowerCase().includes('claude code') || 
                                      keyword.toLowerCase().includes('バイブコーディング') || 
                                      keyword.toLowerCase().includes('vibe coding');
          
          const relevanceThreshold = isClaudeOrVibeCoding ? 0.3 : 0.7; // Claude code系は閾値を下げる
          const maxItems = isClaudeOrVibeCoding ? 8 : 5; // Claude code系は多めに取得
          
          const relevantItems = items
            .filter(item => calculateGenAIRelevance(item.title, item.description || '') > relevanceThreshold)
            .slice(0, maxItems);
          
          results.push(...relevantItems.map(item => ({
            id: `gen-ai-${Date.now()}-${Math.random()}`,
            title: item.title,
            url: item.link || '#',
            publishedAt: new Date().toISOString(),
            source: `生成AI専門検索 (${keyword})`,
            topics: [keyword],
            category: '生成AI'
          })));
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.log(`生成AIキーワード「${keyword}」の取得失敗:`, error);
      }
    }
    
    console.log(`生成AI専門情報: ${results.length}件取得`);
    
  } catch (error) {
    console.error('生成AI専門情報取得エラー:', error);
  }
  
  return results;
}

/**
 * 生成AI関連度計算
 */
function calculateGenAIRelevance(title: string, description: string): number {
  const text = (title + ' ' + description).toLowerCase();
  
  const genAIKeywords = [
    'prompt', 'chat', 'assistant', 'automation', 'productivity',
    'workflow', 'integration', 'api', 'use case', 'application',
    'business', 'enterprise', 'solution', 'tool', 'service',
    'プロンプト', 'チャット', 'アシスタント', '自動化', '効率化',
    'ワークフロー', '活用', '導入', 'ビジネス', 'ツール', 'サービス',
    // Claude Code & バイブコーディング専用キーワード追加
    'claude code', 'claudecode', 'バイブコーディング', 'vibe coding', 'vibecoding',
    'anthropic', 'claude', 'ai coding', 'code generation', 'ai development',
    'コード生成', 'AI開発', 'プログラミング支援'
  ];
  
  let score = 0;
  genAIKeywords.forEach(keyword => {
    if (text.includes(keyword)) score++;
  });
  
  return Math.min(score / 5, 1.0); // 最大1.0に正規化
}

/**
 * RSS フィード解析（簡易版）
 */
function parseRSSFeed(rssText: string): Array<{ title: string; link?: string; description?: string }> {
  const items: Array<{ title: string; link?: string; description?: string }> = [];
  
  // 簡易的なRSS解析（実際のプロジェクトではxml2jsなどを使用推奨）
  const itemMatches = rssText.match(/<item>[\s\S]*?<\/item>/g) || [];
  
  itemMatches.forEach(itemXml => {
    const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemXml.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
    const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || itemXml.match(/<description>(.*?)<\/description>/);
    
    if (titleMatch) {
      items.push({
        title: titleMatch[1].trim(),
        link: linkMatch ? linkMatch[1].trim() : undefined,
        description: descMatch ? descMatch[1].trim() : undefined
      });
    }
  });
  
  return items;
}

/**
 * 勉強・自己啓発系コンテンツ生成
 */
export async function getStudyContentTrends(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    console.log('勉強・自己啓発系コンテンツ生成開始');
    
    const studyContentStructure = {
      'ビジネス書・自己啓発': {
        books: ['7つの習慣', 'アドラー心理学', 'ISSUE DRIVEN', 'バレットジャーナル'],
        count: 10
      },
      '営業・マーケティング': {
        books: ['営業力向上', 'コトラーのマーケティング', 'デジタルマーケティング'],
        count: 7
      },
      '戦略・思考法': {
        books: ['失敗の本質', '孫氏の兵法', 'ロジカルシンキング', 'システム思考'],
        count: 7
      }
    };

    Object.entries(studyContentStructure).forEach(([category, config]) => {
      config.books.forEach((book, bookIndex) => {
        for (let level = 1; level <= 3; level++) {
          const levelName = ['入門', '初級', '中級'][level - 1];
          results.push({
            id: `study-${category}-${bookIndex}-${level}`,
            title: `${book} #${level} ${levelName}編からアプローチ`,
            url: `https://example.com/study/${book}/${level}`,
            source: '勉強・自己啓発生成',
            publishedAt: new Date().toISOString(),
            topics: [book, category, levelName],
            category: '勉強・自己啓発'
          });
        }
      });
    });

    console.log(`勉強・自己啓発系生成完了: ${results.length}件`);
    return results;
  } catch (error) {
    console.error('勉強・自己啓発系生成エラー:', error);
    return [];
  }
}

/**
 * ウェブ開発特化の記事取得（Zennフィルタリング + Google News RSS）
 */
export async function getWebDevTrends(): Promise<TrendItem[]> {
  const results: TrendItem[] = [];
  
  try {
    const webDevKeywords = [
      'frontend', 'react', 'vue', 'angular', 'javascript', 'typescript', 
      'css', 'html', 'next.js', 'nuxt', 'svelte', 'tailwind', 'web開発',
      'フロントエンド', 'ウェブ開発', 'レスポンシブ', 'webpack', 'vite'
    ];
    
    console.log('ウェブ開発記事取得開始');
    
    // 1. 既存のZenn記事からウェブ開発関連をフィルタリング
    try {
      const zennArticles = await getZennTrending();
      const webDevZenn = zennArticles.filter(article => {
        const text = `${article.title} ${article.topics?.join(' ') || ''}`.toLowerCase();
        return webDevKeywords.some(keyword => text.includes(keyword.toLowerCase()));
      });
      
      console.log(`Zenn記事フィルタリング: ${webDevZenn.length}件のウェブ開発記事を抽出`);
      results.push(...webDevZenn.map(article => ({
        ...article,
        source: 'Zenn API (ウェブ開発)'
      })));
    } catch (zennError) {
      console.error('Zennフィルタリングエラー:', zennError);
    }
    
    // 2. Google News RSSでウェブ開発記事を補完
    const webDevSearchTerms = [
      'React 開発',
      'Vue.js フロントエンド',
      'JavaScript フレームワーク',
      'ウェブ開発 最新',
      'CSS フレームワーク'
    ];
    
    for (const searchTerm of webDevSearchTerms) {
      try {
        console.log(`Google News検索中: ${searchTerm}`);
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(searchTerm)}&hl=ja&gl=JP&ceid=JP:ja`;
        
        const response = await axios.get(rssUrl, {
          timeout: 8000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; TrendBot/1.0)'
          }
        });
        
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        $('item').slice(0, 3).each((index, element) => {
          const title = $(element).find('title').text();
          const link = $(element).find('link').text();
          const pubDate = $(element).find('pubDate').text();
          
          if (title && link) {
            results.push({
              id: `google-webdev-${Date.now()}-${index}`,
              title: title,
              url: link,
              source: 'Google News (ウェブ開発)',
              publishedAt: pubDate || new Date().toISOString(),
              score: 0,
              topics: [searchTerm]
            });
          }
        });
        
        // レート制限対策
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (rssError) {
        console.error(`Google News検索エラー (${searchTerm}):`, rssError);
      }
    }
    
    // 重複除去
    const uniqueResults = results.filter((item, index, self) => 
      index === self.findIndex(t => t.url === item.url)
    );
    
    console.log(`ウェブ開発記事取得完了: ${uniqueResults.length}件`);
    return uniqueResults;
  } catch (error) {
    console.error('ウェブ開発記事取得エラー:', error);
    return [];
  }
}

/**
 * 統合トレンド取得（全ソース）
 */
export async function getAllTrends(): Promise<TrendItem[]> {
  console.log('統合トレンド取得開始');
  
  const allResults: TrendItem[] = [];
  
  try {
    // 並列実行で高速化（新しい専門記事取得追加、GitHub Trending除外）
    const [zennTrends, hackerNewsTrends, webDevTrends, businessTrends, programmingTrends, dataScienceTrends, careerTrends, studyTrends, genAITrends] = await Promise.allSettled([
      getZennTrending(),
      getHackerNewsTrending(), 
      getWebDevTrends(),
      getBusinessTrends(), // 新規: ビジネス記事専門取得
      getProgrammingTrends(), // 新規: プログラミング記事専門取得
      getDataScienceTrends(), // 新規: データサイエンス記事専門取得
      getCareerTrends(),
      getStudyContentTrends(),
      getGenerativeAITrends()
    ]);

    // 結果をマージ
    if (zennTrends.status === 'fulfilled') allResults.push(...zennTrends.value);
    if (hackerNewsTrends.status === 'fulfilled') allResults.push(...hackerNewsTrends.value);
    if (webDevTrends.status === 'fulfilled') allResults.push(...webDevTrends.value);
    if (businessTrends.status === 'fulfilled') allResults.push(...businessTrends.value);
    if (programmingTrends.status === 'fulfilled') allResults.push(...programmingTrends.value);
    if (dataScienceTrends.status === 'fulfilled') allResults.push(...dataScienceTrends.value);
    if (careerTrends.status === 'fulfilled') allResults.push(...careerTrends.value);
    if (studyTrends.status === 'fulfilled') allResults.push(...studyTrends.value);
    if (genAITrends.status === 'fulfilled') allResults.push(...genAITrends.value);

    // 重複除去（URL基準）
    const uniqueResults = removeDuplicates(allResults);
    
    console.log(`統合トレンド取得完了: ${uniqueResults.length}件（重複除去前: ${allResults.length}件）`);
    console.log(`📈 新専門ソース: ビジネス=${businessTrends.status === 'fulfilled' ? businessTrends.value.length : 0}件, プログラミング=${programmingTrends.status === 'fulfilled' ? programmingTrends.value.length : 0}件, データサイエンス=${dataScienceTrends.status === 'fulfilled' ? dataScienceTrends.value.length : 0}件, 生成AI=${genAITrends.status === 'fulfilled' ? genAITrends.value.length : 0}件`);
    return uniqueResults;
  } catch (error) {
    console.error('統合トレンド取得エラー:', error);
    return allResults;
  }
}

/**
 * 重複除去システム
 */
function removeDuplicates(items: TrendItem[]): TrendItem[] {
  const seen = new Set<string>();
  const uniqueItems: TrendItem[] = [];
  
  items.forEach(item => {
    // URL基準で重複チェック
    if (!seen.has(item.url)) {
      seen.add(item.url);
      uniqueItems.push(item);
    }
  });
  
  return uniqueItems;
}