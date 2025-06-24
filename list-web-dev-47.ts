// ウェブ開発47件の全リストアップ
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

async function listWebDev47() {
  console.log('📋 ウェブ開発47件の全リストアップ\n');
  
  try {
    const allTrends = await getAllTrends();
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    const webDevItems = categorizedTrends['ウェブ開発'] || [];
    
    console.log(`📊 ウェブ開発記事総数: ${webDevItems.length}件\n`);
    
    console.log('📝 全47件のリスト:');
    console.log('='.repeat(80));
    
    webDevItems.forEach((item, index) => {
      const number = (index + 1).toString().padStart(2, ' ');
      const score = item.score || item.likes || 0;
      const source = item.source;
      
      console.log(`${number}. ${item.title}`);
      console.log(`    ソース: ${source} | スコア: ${score}`);
      if (item.description && item.description.trim()) {
        const desc = item.description.length > 100 
          ? item.description.substring(0, 100) + '...'
          : item.description;
        console.log(`    説明: ${desc}`);
      }
      console.log(''); // 空行
    });
    
    console.log('='.repeat(80));
    console.log(`\n📊 統計情報:`);
    console.log(`総件数: ${webDevItems.length}件`);
    
    // ソース別集計
    const sourceCounts: Record<string, number> = {};
    webDevItems.forEach(item => {
      sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
    });
    
    console.log('\nソース別内訳:');
    Object.entries(sourceCounts).forEach(([source, count]) => {
      console.log(`  ${source}: ${count}件`);
    });
    
    // スコア分布
    const withScore = webDevItems.filter(item => (item.score || item.likes || 0) > 0);
    const withoutScore = webDevItems.filter(item => (item.score || item.likes || 0) === 0);
    
    console.log('\nスコア分布:');
    console.log(`  スコアあり: ${withScore.length}件`);
    console.log(`  スコアなし: ${withoutScore.length}件`);
    
    if (withScore.length > 0) {
      const scores = withScore.map(item => item.score || item.likes || 0);
      const maxScore = Math.max(...scores);
      const minScore = Math.min(...scores);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      console.log(`  最高スコア: ${maxScore}`);
      console.log(`  最低スコア: ${minScore}`);
      console.log(`  平均スコア: ${avgScore.toFixed(1)}`);
    }
    
  } catch (error) {
    console.error('エラー:', error);
  }
}

listWebDev47();