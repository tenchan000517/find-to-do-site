// Claude code バイブコーディング関連検索の簡易版
import { getAllTrends } from './src/lib/realtime-trends';

async function searchClaudeCodeTrends() {
  console.log('🔍 Claude code バイブコーディング関連検索開始');
  
  try {
    // 1. 現在のトレンドシステムでの検索
    console.log('📊 リアルタイムトレンドシステムから検索...');
    const allTrends = await getAllTrends();
    console.log(`総トレンド数: ${allTrends.length}件`);
    
    // Claude関連キーワード
    const claudeKeywords = [
      'claude', 'claude code', 'claudecode', 'anthropic',
      'バイブコーディング', 'vibe coding', 'vibecoding',
      'ai coding', 'ai assistant', 'code assistant'
    ];
    
    console.log('\n🎯 キーワード別マッチング結果:');
    
    let totalMatches = 0;
    const matchedTrends: any[] = [];
    
    claudeKeywords.forEach(keyword => {
      const matches = allTrends.filter(trend => {
        const searchText = (trend.title + ' ' + (trend.description || '') + ' ' + (trend.source || '')).toLowerCase();
        return searchText.includes(keyword.toLowerCase());
      });
      
      console.log(`"${keyword}": ${matches.length}件`);
      
      if (matches.length > 0) {
        matches.forEach(match => {
          if (!matchedTrends.find(t => t.id === match.id)) {
            matchedTrends.push({ ...match, matchedKeyword: keyword });
          }
        });
      }
      
      totalMatches += matches.length;
    });
    
    console.log(`\n📈 重複除去後の総マッチ数: ${matchedTrends.length}件`);
    
    if (matchedTrends.length > 0) {
      console.log('\n📝 マッチしたトレンド:');
      matchedTrends.forEach((trend, index) => {
        console.log(`${index + 1}. "${trend.title}"`);
        console.log(`   ソース: ${trend.source}`);
        console.log(`   マッチキーワード: ${trend.matchedKeyword}`);
        console.log('');
      });
    } else {
      console.log('\n❌ Claude code / バイブコーディング関連のトレンドは現在のシステムでは見つかりませんでした');
    }
    
    // 2. Google News RSS での直接検索
    console.log('\n🌐 Google News RSS 直接検索テスト:');
    
    const searchTerms = [
      'claude code',
      'クロード・コード', 
      'バイブコーディング',
      'anthropic claude',
      'claude ai プログラミング'
    ];
    
    for (const term of searchTerms) {
      try {
        console.log(`🔍 "${term}" を検索中...`);
        
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(term)}&hl=ja&gl=JP&ceid=JP:ja`;
        
        const response = await fetch(rssUrl, {
          headers: { 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
          }
        });
        
        if (response.ok) {
          const rssText = await response.text();
          
          // シンプルなRSS解析
          const itemMatches = rssText.match(/<item>[\s\S]*?<\/item>/g) || [];
          console.log(`📰 "${term}": ${itemMatches.length}件のニュース記事が見つかりました`);
          
          if (itemMatches.length > 0) {
            console.log('   最新の記事:');
            itemMatches.slice(0, 3).forEach((itemXml, index) => {
              const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemXml.match(/<title>(.*?)<\/title>/);
              if (titleMatch) {
                console.log(`   ${index + 1}. "${titleMatch[1].trim()}"`);
              }
            });
          }
        } else {
          console.log(`❌ "${term}": HTTP ${response.status} - 検索に失敗しました`);
        }
        
        // レート制限対策
        await new Promise(resolve => setTimeout(resolve, 1500));
        
      } catch (error) {
        console.log(`❌ "${term}": 検索エラー - ${error.message}`);
      }
    }
    
    // 3. まとめ
    console.log('\n📊 検索結果サマリー:');
    console.log(`・リアルタイムトレンド: ${matchedTrends.length}件マッチ`);
    console.log('・Google News: 各キーワードの結果は上記参照');
    console.log('\n💡 結論:');
    if (matchedTrends.length === 0) {
      console.log('現在のトレンドシステムでは「Claude code」「バイブコーディング」関連の情報は取得されていません。');
      console.log('Google News RSS検索を活用することで、より多くの関連情報を取得できる可能性があります。');
    } else {
      console.log(`現在のシステムで${matchedTrends.length}件の関連情報が取得されています。`);
    }
    
  } catch (error) {
    console.error('❌ 検索実行エラー:', error);
  }
}

// 実行
searchClaudeCodeTrends();