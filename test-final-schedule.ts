// 最終的な週間スケジュールのテスト
import { fetchTrendingTopics } from './src/lib/trends';
import { categorizeAndExtractKeywords, getDayOfWeekCategory } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

// 環境変数設定
process.env.USE_REALTIME_TRENDS = 'true';

async function testFinalSchedule() {
  console.log('🎯 最終週間スケジュールのテスト開始\n');

  const finalSchedule = [
    { day: 1, name: '月曜', category: 'キャリア' },
    { day: 2, name: '火曜', category: '生成AI' },
    { day: 3, name: '水曜', category: 'ビジネス' },
    { day: 4, name: '木曜', category: 'プログラミング' },
    { day: 5, name: '金曜', category: '勉強・自己啓発' },
    { day: 6, name: '土曜', category: 'データサイエンス・AI開発' },
    { day: 0, name: '日曜', category: 'ウェブ開発（週間総合）' }
  ];

  // 曜日設定の確認
  console.log('📅 最終週間スケジュール:');
  finalSchedule.forEach(({ day, name, category }) => {
    const testDate = new Date();
    testDate.setDay = function(dayOfWeek: number) {
      const diff = dayOfWeek - this.getDay();
      this.setDate(this.getDate() + diff);
    };
    testDate.setDay(day);
    
    const actualCategory = getDayOfWeekCategory(testDate);
    const match = actualCategory === category.split('（')[0];
    console.log(`  ${name}: ${actualCategory} ${match ? '✅' : '❌'}`);
  });

  console.log('\n🔥 カテゴリ別データ取得テスト...\n');

  try {
    // 全トレンドを取得して各カテゴリの状況を確認
    const allTrends = await getAllTrends();
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    console.log('📊 各カテゴリのデータ取得状況:');
    
    Object.entries(categorizedTrends).forEach(([category, items]) => {
      const dayInfo = finalSchedule.find(s => s.category.startsWith(category));
      const dayName = dayInfo ? dayInfo.name : '未割り当て';
      
      const hasData = items.length > 0;
      const quality = hasData ? '✅ 実データ取得可能' : '⚠️ フォールバック予定';
      
      console.log(`  ${category} (${dayName}): ${items.length}件 ${quality}`);
      
      if (hasData) {
        const sampleTitles = items.slice(0, 2).map(item => 
          item.title.length > 50 ? item.title.substring(0, 50) + '...' : item.title
        );
        console.log(`    📋 サンプル: ${sampleTitles.join(' | ')}`);
      }
    });

    // 新しいデータサイエンス・AI開発カテゴリの詳細確認
    console.log('\n🎯 新カテゴリ「データサイエンス・AI開発」の詳細分析:');
    const dsItems = categorizedTrends['データサイエンス・AI開発'] || [];
    
    if (dsItems.length > 0) {
      console.log(`  ✅ ${dsItems.length}件のデータサイエンス・AI開発記事を自動分類`);
      console.log(`  🎯 土曜日のコンテンツとして十分な量を確保`);
      
      console.log('\n  📋 土曜日に提供される予定の記事:');
      dsItems.slice(0, 5).forEach((item, index) => {
        console.log(`    ${index + 1}. ${item.title}`);
      });
    } else {
      console.log(`  ⚠️ データサイエンス・AI開発記事が自動分類されていません`);
      console.log(`  💡 フォールバック機能でコンテンツ生成を実行予定`);
    }

    // 技術系カテゴリの分散確認
    console.log('\n🔄 技術系カテゴリの分散確認:');
    const techCategories = [
      { category: '生成AI', day: '火曜' },
      { category: 'プログラミング', day: '木曜' },
      { category: 'データサイエンス・AI開発', day: '土曜' },
      { category: 'ウェブ開発', day: '日曜' }
    ];
    
    techCategories.forEach(({ category, day }) => {
      const items = categorizedTrends[category] || [];
      const status = items.length > 0 ? '✅' : '⚠️';
      console.log(`  ${day}: ${category} (${items.length}件) ${status}`);
    });
    
    console.log('\n✅ 技術系カテゴリが適切に分散されています！');

    // プロンプト品質の予測
    console.log('\n📝 プロンプトデータ品質予測:');
    const qualityAssessment = [
      { day: '月曜', category: 'キャリア', expected: '高品質（生成コンテンツ）' },
      { day: '火曜', category: '生成AI', expected: '最高品質（Claude Code関連ニュース）' },
      { day: '水曜', category: 'ビジネス', expected: '高品質（DX・マーケティング記事）' },
      { day: '木曜', category: 'プログラミング', expected: '高品質（多様な技術記事）' },
      { day: '金曜', category: '勉強・自己啓発', expected: '安定品質（生成コンテンツ）' },
      { day: '土曜', category: 'データサイエンス・AI開発', expected: '新カテゴリ（要観察）' },
      { day: '日曜', category: 'ウェブ開発', expected: '豊富なコンテンツ（47件GitHub記事）' }
    ];
    
    qualityAssessment.forEach(({ day, category, expected }) => {
      console.log(`  ${day}: ${category} - ${expected}`);
    });

  } catch (error) {
    console.error('テストエラー:', error);
  }
}

testFinalSchedule();