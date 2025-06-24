// ウェブ・アプリ開発、ビジネス、週間総合のテスト
import { getAllTrends } from './src/lib/realtime-trends';
import { categorizeAndExtractKeywords, extractTodaysTrends } from './src/lib/trend-categorizer';
import { fetchTrendingTopics } from './src/lib/trends';

async function testSpecificCategories() {
  console.log('🎯 特定カテゴリテスト開始');
  console.log('=====================================\n');

  try {
    // 1. 全トレンド取得
    console.log('=== Step 1: 全トレンド取得 ===');
    const allTrends = await getAllTrends();
    console.log(`📊 取得総数: ${allTrends.length}件\n`);

    // 2. カテゴリ分類
    console.log('=== Step 2: カテゴリ自動分類 ===');
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    console.log('📂 カテゴリ別分類結果:');
    Object.entries(categorizedTrends).forEach(([category, items]) => {
      console.log(`   ${category}: ${items.length}件`);
      if (items.length > 0) {
        console.log(`      サンプル: "${items[0].title}"`);
      }
    });
    console.log('');

    // 3. 対象カテゴリの詳細テスト
    const targetCategories = ['ウェブ・アプリ開発', 'ビジネス', '週間総合'];
    
    for (const category of targetCategories) {
      console.log(`=== Test: ${category}カテゴリ ===`);
      
      // 分類されたアイテム数
      const categoryItems = categorizedTrends[category as keyof typeof categorizedTrends] || [];
      console.log(`📊 自動分類結果: ${categoryItems.length}件`);
      
      if (categoryItems.length > 0) {
        console.log('📋 分類されたアイテム:');
        categoryItems.slice(0, 3).forEach((item, index) => {
          console.log(`   ${index + 1}. "${item.title}"`);
          console.log(`      ソース: ${item.source}`);
          if (item.score || item.likes) {
            console.log(`      スコア: ${item.score || item.likes || 0}`);
          }
        });
      }

      // fetchTrendingTopicsでの取得テスト
      console.log(`\n🔥 fetchTrendingTopics("${category}")テスト:`);
      try {
        const topics = await fetchTrendingTopics(category, 3);
        console.log(`✅ 取得成功: ${topics.length}件`);
        topics.forEach((topic, index) => {
          console.log(`   ${index + 1}. "${topic}"`);
        });
      } catch (error) {
        console.log(`❌ エラー: ${error}`);
      }
      
      console.log('');
    }

    // 4. 週間総合の特別ロジックテスト
    console.log('=== Test: 週間総合特別ロジック ===');
    
    // 全カテゴリから高品質アイテムを抽出
    const allItems = Object.values(categorizedTrends).flat();
    const highQualityItems = allItems
      .filter(item => {
        const score = item.score || item.likes || 0;
        return score > 20; // 高品質の閾値
      })
      .sort((a, b) => {
        const scoreA = a.score || a.likes || 0;
        const scoreB = b.score || b.likes || 0;
        return scoreB - scoreA;
      })
      .slice(0, 10);

    console.log(`📈 高品質アイテム (スコア20+): ${highQualityItems.length}件`);
    if (highQualityItems.length > 0) {
      console.log('🏆 トップ5:');
      highQualityItems.slice(0, 5).forEach((item, index) => {
        const score = item.score || item.likes || 0;
        console.log(`   ${index + 1}. "${item.title}" (${score})`);
        console.log(`      ソース: ${item.source}`);
      });
    }

    // 5. キーワードマッチング詳細分析
    console.log('\n=== キーワードマッチング分析 ===');
    
    const webAppKeywords = ['web development', 'frontend', 'backend', 'mobile app', 'android', 'ios', 'flutter', 'unity', 'game development'];
    const businessKeywords = ['startup', 'business', 'saas', 'entrepreneur', 'funding'];
    
    console.log('🔍 ウェブ・アプリ開発キーワードマッチング:');
    const webMatches = allTrends.filter(item => {
      const text = `${item.title} ${item.topics?.join(' ') || ''}`.toLowerCase();
      return webAppKeywords.some(keyword => text.includes(keyword.toLowerCase()));
    });
    console.log(`   マッチ数: ${webMatches.length}件`);
    if (webMatches.length > 0) {
      webMatches.slice(0, 3).forEach((item, index) => {
        console.log(`   ${index + 1}. "${item.title}"`);
      });
    }

    console.log('\n🔍 ビジネスキーワードマッチング:');
    const businessMatches = allTrends.filter(item => {
      const text = `${item.title} ${item.topics?.join(' ') || ''}`.toLowerCase();
      return businessKeywords.some(keyword => text.includes(keyword.toLowerCase()));
    });
    console.log(`   マッチ数: ${businessMatches.length}件`);
    if (businessMatches.length > 0) {
      businessMatches.slice(0, 3).forEach((item, index) => {
        console.log(`   ${index + 1}. "${item.title}"`);
      });
    }

  } catch (error) {
    console.error('❌ テストエラー:', error);
  }
}

// 実行
testSpecificCategories().then(() => {
  console.log('\n🎉 特定カテゴリテスト完了！');
});