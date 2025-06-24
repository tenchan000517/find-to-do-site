const axios = require('axios');
const cheerio = require('cheerio');

const CATEGORY_KEYWORDS = {
  'プログラミング': ['programming', 'typescript', 'javascript', 'react', 'nextjs', 'coding']
};

async function testFetchTrendingTopics() {
  console.log('=== Step 1: トレンドトピック取得テスト ===');
  
  try {
    const category = 'プログラミング';
    const categoryKeywords = CATEGORY_KEYWORDS[category];
    
    const keyword = categoryKeywords[Math.floor(Math.random() * categoryKeywords.length)];
    console.log('選択されたキーワード:', keyword);
    
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ja&gl=JP&ceid=JP:ja`;
    console.log('Google News URL:', url);
    
    const response = await axios.get(url, {
      timeout: 10000,
      responseType: 'text',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
      }
    });
    
    console.log('レスポンスステータス:', response.status);
    console.log('レスポンスサイズ:', response.data.length, '文字');
    
    const $ = cheerio.load(response.data, { xmlMode: true });
    
    const titles = [];
    $('item title').each((i, elem) => {
      const title = $(elem).text();
      if (title && titles.length < 5) {
        titles.push(title);
      }
    });
    
    console.log('取得できた記事数:', titles.length);
    console.log('取得された記事タイトル:');
    titles.forEach((title, index) => {
      console.log(`${index + 1}. ${title}`);
    });
    
    return titles;
  } catch (error) {
    console.error('エラー:', error.message);
    return [];
  }
}

// Step 2: 特定トピックでの関連ニュース取得テスト
async function testFetchRelatedNews(topic) {
  console.log('\n=== Step 2: 関連ニュース取得テスト ===');
  console.log('対象トピック:', topic);
  
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=ja&gl=JP&ceid=JP:ja`;
    console.log('検索URL:', url);
    
    const response = await axios.get(url, {
      timeout: 10000,
      responseType: 'text',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
      }
    });
    
    console.log('レスポンスステータス:', response.status);
    
    const $ = cheerio.load(response.data, { xmlMode: true });
    
    const items = [];
    $('item').slice(0, 3).each((i, elem) => {
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
    
    console.log('取得できたニュース数:', items.length);
    items.forEach((item, index) => {
      console.log(`\n${index + 1}. ${item.title}`);
      console.log(`   ソース: ${item.source}`);
      console.log(`   日付: ${item.pubDate}`);
      console.log(`   URL: ${item.link}`);
    });
    
    return items;
  } catch (error) {
    console.error('関連ニュース取得エラー:', error.message);
    return [];
  }
}

// 実行
(async () => {
  const topics = await testFetchTrendingTopics();
  
  if (topics.length > 0) {
    // 最初のトピックで関連ニュース取得をテスト
    await testFetchRelatedNews(topics[0]);
  } else {
    // フォールバック：固定トピックでテスト
    await testFetchRelatedNews('プログラミング 最新動向');
  }
})();