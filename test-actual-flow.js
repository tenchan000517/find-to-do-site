const axios = require('axios');
const cheerio = require('cheerio');

// 実際のシステムと全く同じカテゴリとキーワード
const CATEGORY_KEYWORDS = {
  'プログラミング': ['programming', 'typescript', 'javascript', 'react', 'nextjs', 'coding'],
  'ウェブ開発': ['web development', 'frontend', 'backend', 'full stack', 'web design'],
  'AI技術': ['ai', 'artificial intelligence', 'machine learning', 'llm', 'nlp'],
  'キャリア': ['tech career', 'software engineer', 'it jobs', 'developer skills'],
  'ビジネス': ['startups', 'tech business', 'saas', 'digital transformation'],
};

// 実際のenhanceTopicForCategory関数と同じロジック
function enhanceTopicForCategory(topic, category) {
  const templates = {
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

  const categoryTemplates = templates[category] || templates['プログラミング'];
  const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
  
  return template;
}

// 実際のfetchTrendingTopics関数と全く同じロジック
async function fetchTrendingTopics(category, count = 5) {
  try {
    console.log(`\n=== 実際のシステム：fetchTrendingTopics("${category}", ${count}) ===`);
    
    const categoryKeywords = CATEGORY_KEYWORDS[category] || CATEGORY_KEYWORDS['プログラミング'];
    
    // ランダムにキーワードを選択（実際のシステムと同じ）
    const keyword = categoryKeywords[Math.floor(Math.random() * categoryKeywords.length)];
    console.log(`1. 選択されたキーワード: "${keyword}"`);
    
    // Google NewsのRSSフィード取得（実際のシステムと同じURL）
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ja&gl=JP&ceid=JP:ja`;
    console.log(`2. Google News URL: ${url}`);
    
    const response = await axios.get(url);
    const $ = cheerio.load(response.data, { xmlMode: true });
    
    // 記事タイトルを抽出（実際のシステムと同じロジック）
    const titles = [];
    $('item title').each((i, elem) => {
      const title = $(elem).text();
      if (title && titles.length < count) {
        titles.push(title);
      }
    });
    
    console.log(`3. Google Newsから取得した生タイトル (${titles.length}件):`);
    titles.forEach((title, index) => {
      console.log(`   ${index + 1}. "${title}"`);
    });
    
    // 十分なトピックが取得できなかった場合の処理（実際のシステムと同じ）
    while (titles.length < count) {
      titles.push(generateTopicForCategory(category));
    }
    
    // カテゴリに合わせてトピックを拡張（実際のシステムと同じ）
    const enhancedTopics = titles.map(title => 
      enhanceTopicForCategory(title, category)
    );
    
    console.log(`4. 拡張後のトピック (AIが実際に使用):`);
    enhancedTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. "${topic}" (${topic.length}文字)`);
    });
    
    return enhancedTopics;
  } catch (error) {
    console.error('エラー:', error.message);
    return [];
  }
}

function generateTopicForCategory(category) {
  const topicsByCategory = {
    'プログラミング': [
      'TypeScriptの最新機能と実践的な使い方',
      'Next.js 15の新機能とパフォーマンス改善',
      'モダンなReactパターンとベストプラクティス',
    ],
    'AI技術': [
      'Gemini APIを活用したアプリケーション開発',
      'LLMプロンプトエンジニアリングの基礎',
    ],
    // 他は省略
  };
  
  const topics = topicsByCategory[category] || topicsByCategory['プログラミング'];
  return topics[Math.floor(Math.random() * topics.length)];
}

// 実際のfetchRelatedNews関数と全く同じロジック
async function fetchRelatedNews(topic, count = 3) {
  console.log(`\n=== fetchRelatedNews("${topic}", ${count}) ===`);
  console.log(`トピック長: ${topic.length}文字`);
  
  try {
    // Google News検索URL（実際のシステムと同じ）
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=ja&gl=JP&ceid=JP:ja`;
    console.log(`検索URL: ${url}`);
    
    // RSSフィード取得（実際のシステムと同じ設定）
    const response = await axios.get(url, {
      timeout: 10000,
      responseType: 'text',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
      }
    });
    
    const $ = cheerio.load(response.data, { xmlMode: true });
    
    // ニュース記事を抽出（実際のシステムと同じロジック）
    const items = [];
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
        searchUrl: url
      });
    });
    
    console.log(`結果: ${items.length}件のニュースを取得`);
    if (items.length > 0) {
      console.log(`✅ 成功 - AIは以下のデータを参考情報生成に使用:`);
      items.forEach((item, index) => {
        console.log(`   ${index + 1}. タイトル: "${item.title}"`);
        console.log(`      ソース: ${item.source}`);
        console.log(`      日付: ${item.pubDate}`);
        console.log(`      URL: ${item.link}`);
      });
      return items;
    } else {
      console.log(`❌ 失敗 - 空配列返却 → AIはフォールバック情報を使用`);
      return [];
    }
  } catch (error) {
    console.error(`❌ エラー: ${error.message} → AIはフォールバック情報を使用`);
    return [];
  }
}

// 実際のフロー再現：複数カテゴリでテスト
async function testActualFlow() {
  const categories = ['プログラミング', 'AI技術', 'キャリア'];
  
  for (const category of categories) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`カテゴリ: ${category}`);
    console.log(`${'='.repeat(60)}`);
    
    // Step 1: getTrendingTopics (実際のシステムと同じ)
    const topics = await fetchTrendingTopics(category, 5);
    
    if (topics.length > 0) {
      // Step 2: ランダム選択 (実際のシステムと同じ)
      const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
      console.log(`\n5. ランダム選択されたトピック: "${selectedTopic}"`);
      
      // Step 3: fetchRelatedNews (実際のシステムと同じ)
      const relatedNews = await fetchRelatedNews(selectedTopic, 3);
      
      // Step 4: AIへの影響分析
      console.log(`\n6. AIへの影響:`);
      if (relatedNews.length > 0) {
        console.log(`   ✅ 高品質参考情報が生成される`);
        console.log(`   ✅ 記事の信頼性向上`);
      } else {
        console.log(`   ❌ フォールバック情報のみ`);
        console.log(`   ❌ 参考情報セクションが貧弱になる`);
      }
    }
    
    // 次のテストまで少し待機
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// 実行
testActualFlow();