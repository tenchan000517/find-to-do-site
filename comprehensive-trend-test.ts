// 全ソースからのトレンドデータサンプル - Pythonプロジェクト用
import { getAllTrends } from './src/lib/realtime-trends';
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';

async function comprehensiveTrendTest() {
  console.log('🌐 全ソーストレンドデータテスト\n');
  
  try {
    const allTrends = await getAllTrends();
    console.log(`📊 Total trends: ${allTrends.length}件\n`);
    
    // ソース別統計
    const sourceStats: Record<string, number> = {};
    allTrends.forEach(trend => {
      sourceStats[trend.source] = (sourceStats[trend.source] || 0) + 1;
    });
    
    console.log('=== Source Statistics ===');
    Object.entries(sourceStats)
      .sort(([,a], [,b]) => b - a)
      .forEach(([source, count]) => {
        console.log(`${source}: ${count}件`);
      });
    
    console.log('\n=== Sample Data from Each Source ===');
    
    // 各ソースから1件ずつサンプル
    const sourcesSeen = new Set();
    const samples = allTrends.filter(trend => {
      if (!sourcesSeen.has(trend.source)) {
        sourcesSeen.add(trend.source);
        return true;
      }
      return false;
    });
    
    samples.forEach((item, index) => {
      console.log(`${index + 1}. [${item.source}] ${item.title}`);
      console.log(`   URL: ${item.url}`);
      console.log(`   Score/Likes: ${item.score || item.likes || 0}`);
      console.log(`   Published: ${item.publishedAt}`);
      console.log('');
    });
    
    // カテゴリ分類結果
    console.log('=== Category Classification ===');
    const categorized = categorizeAndExtractKeywords(allTrends);
    
    Object.entries(categorized).forEach(([category, items]) => {
      console.log(`${category}: ${items.length}件`);
      if (items.length > 0) {
        console.log(`   例: ${items[0].title}`);
      }
    });
    
    // Python用完全データサンプル（小規模）
    console.log('\n=== Complete JSON Sample (first 3 from each category) ===');
    const pythonSample: any = {};
    
    Object.entries(categorized).forEach(([category, items]) => {
      pythonSample[category] = items.slice(0, 3).map((item: any) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        source: item.source,
        score: item.score || 0,
        likes: item.likes || 0,
        comments: item.comments || 0,
        publishedAt: item.publishedAt,
        topics: item.topics || [],
        category: category
      }));
    });
    
    console.log(JSON.stringify(pythonSample, null, 2));
    
  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

comprehensiveTrendTest();