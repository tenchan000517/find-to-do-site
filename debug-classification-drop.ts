// プログラミングカテゴリが24件から2件に激減した原因を調査
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

async function debugClassificationDrop() {
  console.log('🔍 プログラミングカテゴリ激減問題の調査開始\n');
  
  try {
    // 全トレンドを取得
    const allTrends = await getAllTrends();
    console.log(`📊 取得した全トレンド数: ${allTrends.length}件\n`);
    
    // 分類処理を実行
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    console.log('📂 分類結果:');
    Object.entries(categorizedTrends).forEach(([category, items]) => {
      console.log(`  ${category}: ${items.length}件`);
    });
    
    console.log('\n🔍 プログラミングカテゴリの詳細分析:');
    const programmingItems = categorizedTrends['プログラミング'];
    console.log(`プログラミング分類件数: ${programmingItems.length}件`);
    
    if (programmingItems.length > 0) {
      console.log('\n📋 プログラミングカテゴリの全記事:');
      programmingItems.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.title} (Score: ${item.score || item.likes || 0})`);
      });
    }
    
    console.log('\n🔍 ウェブ開発カテゴリの詳細分析:');
    const webItems = categorizedTrends['ウェブ開発'];
    console.log(`ウェブ開発分類件数: ${webItems.length}件`);
    
    if (webItems.length > 0) {
      console.log('\n📋 ウェブ開発カテゴリの全記事:');
      webItems.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.title} (Score: ${item.score || item.likes || 0})`);
      });
    }
    
    // JavaScript/TypeScript/React関連記事を直接検索
    console.log('\n🔍 JavaScript/TypeScript/React関連記事の検索:');
    const jsRelated = allTrends.filter(item => {
      const title = item.title.toLowerCase();
      const desc = (item.description || '').toLowerCase();
      const combined = `${title} ${desc}`;
      
      return combined.includes('javascript') || 
             combined.includes('typescript') || 
             combined.includes('react') || 
             combined.includes('vue') || 
             combined.includes('web-dev') ||
             combined.includes('frontend') ||
             combined.includes('web development');
    });
    
    console.log(`JavaScript/TS/React関連記事: ${jsRelated.length}件`);
    jsRelated.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.title}`);
      console.log(`      Source: ${item.source}`);
      console.log(`      Score: ${item.score || item.likes || 0}`);
    });
    
    // プログラミング関連キーワードで検索
    console.log('\n🔍 プログラミング関連キーワードでの検索:');
    const programmingKeywords = ['python', 'rust', 'go', 'java', 'algorithm', 'programming', 'code', 'coding'];
    
    programmingKeywords.forEach(keyword => {
      const matching = allTrends.filter(item => {
        const title = item.title.toLowerCase();
        const desc = (item.description || '').toLowerCase();
        return title.includes(keyword) || desc.includes(keyword);
      });
      
      if (matching.length > 0) {
        console.log(`\n${keyword.toUpperCase()}関連記事 (${matching.length}件):`);
        matching.slice(0, 3).forEach((item, index) => {
          console.log(`  ${index + 1}. ${item.title}`);
        });
      }
    });
    
  } catch (error) {
    console.error('調査エラー:', error);
  }
}

debugClassificationDrop();