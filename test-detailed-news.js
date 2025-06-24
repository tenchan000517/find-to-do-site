const axios = require('axios');
const cheerio = require('cheerio');

// 実際のシステムで使用されるような長いトピックをテスト
const problematicTopics = [
  "仙台グローバルスタートアップ・キャンパス（SGSＣ）第３期参加者募集開始！PR TIMES活用によるビジネス成長戦略徹底解説",
  "京セラみらいエンビジョンのAIサーバー提供開始をPR TIMESから読み解く！ウェブ開発者が注目すべきレスポンシブデザイン戦略",
  "TypeScriptの最新機能と実践的な使い方",
  "React",
  "プログラミング"
];

async function testVariousTopics() {
  console.log('=== 様々なトピックでの情報源取得テスト ===');
  
  for (let i = 0; i < problematicTopics.length; i++) {
    const topic = problematicTopics[i];
    console.log(`\n--- Test ${i + 1}: ${topic.substring(0, 50)}... ---`);
    console.log(`トピック長: ${topic.length}文字`);
    
    try {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=ja&gl=JP&ceid=JP:ja`;
      console.log(`検索URL長: ${url.length}文字`);
      
      const startTime = Date.now();
      const response = await axios.get(url, {
        timeout: 10000,
        responseType: 'text',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
        }
      });
      const endTime = Date.now();
      
      console.log(`レスポンス時間: ${endTime - startTime}ms`);
      console.log(`レスポンスサイズ: ${response.data.length}文字`);
      
      const $ = cheerio.load(response.data, { xmlMode: true });
      
      const items = [];
      $('item').each((i, elem) => {
        const $elem = $(elem);
        const title = $elem.find('title').text();
        const link = $elem.find('link').text();
        const pubDate = $elem.find('pubDate').text();
        const source = $elem.find('source').text();
        
        items.push({
          title: title,
          link: link,
          pubDate: pubDate,
          source: source || 'Google News'
        });
      });
      
      console.log(`取得記事数: ${items.length}件`);
      
      if (items.length > 0) {
        console.log('✅ 成功: 記事が見つかりました');
        items.slice(0, 2).forEach((item, index) => {
          console.log(`  ${index + 1}. ${item.title}`);
          console.log(`     ソース: ${item.source}`);
        });
      } else {
        console.log('❌ 失敗: 記事が見つかりませんでした');
        
        // XMLの構造を確認
        const channelTitle = $('channel title').text();
        const totalItems = $('item').length;
        console.log(`チャンネルタイトル: ${channelTitle}`);
        console.log(`XML内のitem数: ${totalItems}`);
        
        // 生のXMLの一部を確認
        const xmlSnippet = response.data.substring(0, 500);
        console.log(`XML先頭: ${xmlSnippet}...`);
      }
      
    } catch (error) {
      console.log(`❌ エラー: ${error.message}`);
      if (error.code === 'ECONNABORTED') {
        console.log('  → タイムアウト発生');
      } else if (error.response) {
        console.log(`  → HTTPエラー: ${error.response.status}`);
      } else {
        console.log(`  → ネットワークエラー: ${error.code}`);
      }
    }
    
    // 次のテストまで少し待機
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// エラーハンドリングのテスト
async function testErrorHandling() {
  console.log('\n=== エラーハンドリングテスト ===');
  
  // 1. 無効なURL
  try {
    console.log('\n1. 無効なURLテスト');
    await axios.get('https://invalid-url-test.com/rss', { timeout: 5000 });
  } catch (error) {
    console.log(`❌ 予想通りエラー: ${error.message}`);
  }
  
  // 2. 短いタイムアウト
  try {
    console.log('\n2. 短いタイムアウトテスト');
    const url = 'https://news.google.com/rss/search?q=programming&hl=ja&gl=JP&ceid=JP:ja';
    await axios.get(url, { timeout: 1 }); // 1msタイムアウト
  } catch (error) {
    console.log(`❌ 予想通りタイムアウト: ${error.message}`);
  }
}

// 実行
(async () => {
  await testVariousTopics();
  await testErrorHandling();
})();