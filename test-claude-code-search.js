// Claude code バイブコーディング関連のトレンド検索テスト
async function testClaudeCodeTrends() {
  console.log('🔍 Claude code バイブコーディング関連トレンド検索開始');
  
  try {
    // 動的インポート
    const { getAllTrends } = await import('./src/lib/realtime-trends.js');
    
    // 全トレンドを取得
    const allTrends = await getAllTrends();
    console.log(`📊 総トレンド数: ${allTrends.length}件`);
    
    // Claude code関連のキーワード
    const claudeKeywords = [
      'claude code', 'claudecode', 'claude', 'anthropic',
      'バイブコーディング', 'vibe coding', 'vibecoding',
      'ai coding', 'ai assistant', 'code assistant',
      'claude ai', 'claude anthropic'
    ];
    
    let claudeRelated = [];
    
    allTrends.forEach(trend => {
      const searchText = (trend.title + ' ' + (trend.description || '') + ' ' + (trend.source || '')).toLowerCase();
      
      claudeKeywords.forEach(keyword => {
        if (searchText.includes(keyword.toLowerCase())) {
          claudeRelated.push({
            ...trend,
            matchedKeyword: keyword
          });
        }
      });
    });
    
    // 重複除去
    claudeRelated = claudeRelated.filter((trend, index, self) => 
      index === self.findIndex(t => t.id === trend.id)
    );
    
    console.log(`🎯 Claude code / バイブコーディング関連: ${claudeRelated.length}件`);
    
    if (claudeRelated.length > 0) {
      console.log('\n📝 関連トレンド一覧:');
      claudeRelated.forEach((trend, index) => {
        console.log(`${index + 1}. "${trend.title}"`);
        console.log(`   ソース: ${trend.source}`);
        console.log(`   マッチキーワード: ${trend.matchedKeyword}`);
        console.log(`   カテゴリ: ${trend.category || '未分類'}`);
        console.log(`   URL: ${trend.url}`);
        console.log('');
      });
    } else {
      console.log('❌ Claude code / バイブコーディング関連のトレンドは見つかりませんでした');
    }
    
    // より広範囲な関連キーワード検索
    console.log('\n🔍 関連キーワード別検索結果:');
    const relatedKeywords = {
      'claude': 0,
      'anthropic': 0,
      'ai coding': 0,
      'ai assistant': 0,
      'code assistant': 0,
      'ai development': 0,
      'vibe': 0,
      'バイブ': 0
    };
    
    Object.keys(relatedKeywords).forEach(keyword => {
      const matches = allTrends.filter(trend => 
        (trend.title + ' ' + (trend.description || '') + ' ' + (trend.source || '')).toLowerCase().includes(keyword.toLowerCase())
      );
      relatedKeywords[keyword] = matches.length;
      console.log(`"${keyword}": ${matches.length}件`);
      
      if (matches.length > 0 && matches.length <= 3) {
        matches.forEach(match => {
          console.log(`  - "${match.title}" (${match.source})`);
        });
      }
    });
    
    // Google News RSS でClaude code検索
    console.log('\n🌐 Google News RSS検索テスト:');
    const searchKeywords = ['claude code', 'バイブコーディング', 'claude ai', 'anthropic claude'];
    
    for (const keyword of searchKeywords) {
      try {
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ja&gl=JP&ceid=JP:ja`;
        console.log(`🔍 "${keyword}" で検索中...`);
        
        const response = await fetch(rssUrl, {
          headers: { 
            'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)' 
          },
          timeout: 10000
        });
        
        if (response.ok) {
          const rssText = await response.text();
          const itemMatches = rssText.match(/<item>[\s\S]*?<\/item>/g) || [];
          console.log(`📰 "${keyword}": ${itemMatches.length}件のニュース記事`);
          
          if (itemMatches.length > 0) {
            // 最初の3件のタイトルを表示
            itemMatches.slice(0, 3).forEach((itemXml, index) => {
              const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemXml.match(/<title>(.*?)<\/title>/);
              if (titleMatch) {
                console.log(`  ${index + 1}. "${titleMatch[1].trim()}"`);
              }
            });
          }
        } else {
          console.log(`❌ "${keyword}": 検索失敗`);
        }
        
        // レート制限対策
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.log(`❌ "${keyword}": エラー - ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ 検索エラー:', error);
  }
}

// 実行
testClaudeCodeTrends().catch(console.error);