// 新しい曜日配置のテスト
import { fetchTrendingTopics } from './src/lib/trends';
import { categorizeAndExtractKeywords, getDayOfWeekCategory } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

// 環境変数設定
process.env.USE_REALTIME_TRENDS = 'true';

async function testNewSchedule() {
  console.log('🗓️ 新しい曜日配置のテスト開始\n');

  const days = [
    { day: 1, name: '月曜', expected: 'キャリア' },
    { day: 2, name: '火曜', expected: '生成AI' },
    { day: 3, name: '水曜', expected: 'ビジネス' },
    { day: 4, name: '木曜', expected: 'プログラミング' },
    { day: 5, name: '金曜', expected: '勉強・自己啓発' },
    { day: 6, name: '土曜', expected: 'ウェブ開発' },
    { day: 0, name: '日曜', expected: 'ウェブ開発（週間総合）' }
  ];

  // 各曜日の設定確認
  console.log('📅 新しい曜日設定の確認:');
  days.forEach(({ day, name, expected }) => {
    const testDate = new Date();
    testDate.setDay = function(dayOfWeek: number) {
      const diff = dayOfWeek - this.getDay();
      this.setDate(this.getDate() + diff);
    };
    testDate.setDay(day);
    
    const category = getDayOfWeekCategory(testDate);
    console.log(`  ${name}: ${category} ${category === expected.split('（')[0] ? '✅' : '❌'}`);
  });

  console.log('\n🔥 実際のトレンド取得テスト...\n');

  try {
    // 全トレンドを取得して分類状況を確認
    const allTrends = await getAllTrends();
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    console.log('📊 カテゴリ別データ取得状況:');
    
    const categoryMapping = {
      'キャリア': '月曜',
      '生成AI': '火曜', 
      'ビジネス': '水曜',
      'プログラミング': '木曜',
      '勉強・自己啓発': '金曜',
      'ウェブ開発': '土曜・日曜（週間総合）'
    };

    Object.entries(categoryMapping).forEach(([category, dayInfo]) => {
      const items = categorizedTrends[category as keyof typeof categorizedTrends] || [];
      const hasData = items.length > 0;
      const quality = hasData ? '高品質データあり' : 'フォールバック予定';
      
      console.log(`  ${category} (${dayInfo}): ${items.length}件 ${hasData ? '✅' : '⚠️'} ${quality}`);
      
      if (hasData && items.length > 0) {
        console.log(`    📋 トップ3: ${items.slice(0, 3).map(item => item.title).join(' | ')}`);
      }
    });

    // 特に日曜日のウェブ開発（週間総合）をテスト
    console.log('\n🎯 日曜日（週間総合）の詳細テスト:');
    const webDevItems = categorizedTrends['ウェブ開発'] || [];
    if (webDevItems.length > 0) {
      console.log(`  ✅ ウェブ開発記事: ${webDevItems.length}件取得済み`);
      console.log(`  📈 週間総合として十分な量を確保`);
      console.log(`  🎯 予想プロンプトデータ品質: 高品質`);
      
      // 上位5件を表示
      const top5 = webDevItems.slice(0, 5);
      console.log(`\n  📋 日曜日に提供される予定の記事（上位5件）:`);
      top5.forEach((item, index) => {
        console.log(`    ${index + 1}. ${item.title}`);
      });
    } else {
      console.log(`  ❌ ウェブ開発記事が取得できていません`);
    }

  } catch (error) {
    console.error('テストエラー:', error);
  }
}

testNewSchedule();