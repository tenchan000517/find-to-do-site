// 改善されたトレンドシステムのテスト
import { fetchTrendingTopics } from './src/lib/trends';
import { categorizeAndExtractKeywords, getDayOfWeekCategory } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

// 環境変数設定
process.env.USE_REALTIME_TRENDS = 'true';

async function testTrendImprovements() {
  console.log('🔥 改善されたトレンドシステムのテスト開始\n');
  
  // 曜日別テスト
  const weekdays = [
    { day: '月曜', date: new Date('2024-06-24') }, // 月曜
    { day: '火曜', date: new Date('2024-06-25') }, // 火曜 (改善対象)
    { day: '水曜', date: new Date('2024-06-26') }, // 水曜
    { day: '木曜', date: new Date('2024-06-27') }, // 木曜
    { day: '金曜', date: new Date('2024-06-28') }, // 金曜 (改善対象)
    { day: '土曜', date: new Date('2024-06-29') }, // 土曜
    { day: '日曜', date: new Date('2024-06-30') }  // 日曜
  ];
  
  for (const { day, date } of weekdays) {
    console.log(`\n=== 📅 ${day}のテスト ===`);
    
    // 該当曜日のカテゴリを取得
    const category = getDayOfWeekCategory(date);
    console.log(`🎯 対象カテゴリ: ${category}`);
    
    try {
      // トレンドトピック取得
      console.log('📊 トレンドトピック取得中...');
      const topics = await fetchTrendingTopics(category, 5);
      
      console.log(`✅ 取得成功: ${topics.length}件`);
      topics.forEach((topic, index) => {
        console.log(`  ${index + 1}. ${topic}`);
      });
      
      // プロンプト用データを模擬
      console.log('\n📝 プロンプトに渡されるデータ:');
      const promptData = {
        category: category,
        topics: topics,
        date: date.toISOString().split('T')[0],
        dayOfWeek: day
      };
      console.log(JSON.stringify(promptData, null, 2));
      
    } catch (error) {
      console.error(`❌ エラー: ${error.message}`);
    }
    
    console.log('\n' + '─'.repeat(50));
  }
  
  // 改善前後の比較テスト
  console.log('\n🔄 改善前後の比較テスト');
  
  try {
    console.log('\n📊 全トレンドデータの分析...');
    const allTrends = await getAllTrends();
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    console.log('📈 カテゴリ別取得状況:');
    Object.entries(categorizedTrends).forEach(([category, items]) => {
      const highQualityCount = items.filter(item => {
        const score = item.score || item.likes || 0;
        return score > 50;
      }).length;
      
      console.log(`  ${category}: ${items.length}件 (高品質: ${highQualityCount}件)`);
      
      if (category === 'ウェブ開発' || category === 'ビジネス') {
        console.log('    📋 サンプル記事:');
        items.slice(0, 3).forEach((item, index) => {
          const score = item.score || item.likes || 0;
          console.log(`      ${index + 1}. ${item.title} (${score}点) - ${item.source}`);
        });
      }
    });
    
  } catch (error) {
    console.error(`❌ 分析エラー: ${error.message}`);
  }
}

// テスト実行
testTrendImprovements().catch(console.error);