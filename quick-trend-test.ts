// Quick trend test - Pythonプロジェクト用データ確認
import { getAllTrends, getZennTrending, getGitHubTrending } from './src/lib/realtime-trends';
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';

async function quickTrendTest() {
  console.log('🧪 トレンドデータ構造確認テスト\n');
  
  try {
    // 1. Zennの技術記事（小規模テスト）
    console.log('=== Zenn記事 (sample 5件) ===');
    const zennTrends = await getZennTrending();
    console.log(`Total: ${zennTrends.length}件`);
    
    zennTrends.slice(0, 5).forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
      console.log(`   Source: ${item.source}`);
      console.log(`   URL: ${item.url}`);
      console.log(`   Likes: ${item.likes || 0}`);
      console.log(`   Published: ${item.publishedAt}`);
      console.log(`   Topics: ${JSON.stringify(item.topics || [])}`);
      console.log(`   ID: ${item.id}`);
      console.log('');
    });
    
    // 2. データ構造のサンプル出力（Pythonでパースしやすい形式）
    console.log('=== JSON Sample for Python ===');
    const sampleData = zennTrends.slice(0, 3).map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      source: item.source,
      likes: item.likes || 0,
      comments: item.comments || 0,
      publishedAt: item.publishedAt,
      topics: item.topics || [],
      category: item.category || 'uncategorized'
    }));
    
    console.log(JSON.stringify(sampleData, null, 2));
    
  } catch (error) {
    console.error('エラー:', error);
  }
}

quickTrendTest();