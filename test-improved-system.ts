// 改善されたトレンドシステムのテスト
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

async function testImprovedSystem() {
  console.log('🧪 改善されたトレンドシステムのテスト開始\n');
  
  try {
    const startTime = Date.now();
    const allTrends = await getAllTrends();
    const endTime = Date.now();
    
    console.log(`✅ 全体取得完了: ${allTrends.length}件 (実行時間: ${endTime - startTime}ms)\n`);
    
    // ソース別統計
    const sourceCounts: Record<string, number> = {};
    allTrends.forEach(trend => {
      sourceCounts[trend.source] = (sourceCounts[trend.source] || 0) + 1;
    });
    
    console.log('📊 ソース別統計:');
    Object.entries(sourceCounts).forEach(([source, count]) => {
      console.log(`   ${source}: ${count}件`);
    });
    console.log('');
    
    // カテゴリ別分類
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    console.log('📂 カテゴリ別分類結果:');
    const weeklyRotation = [
      { day: '日曜日', category: 'ウェブ開発' },
      { day: '月曜日', category: 'キャリア' },
      { day: '火曜日', category: '生成AI' },
      { day: '水曜日', category: 'ビジネス' },
      { day: '木曜日', category: 'プログラミング' },
      { day: '金曜日', category: '勉強・自己啓発' },
      { day: '土曜日', category: 'データサイエンス・AI開発' }
    ];
    
    weeklyRotation.forEach(({ day, category }) => {
      const items = categorizedTrends[category as keyof typeof categorizedTrends] || [];
      const status = items.length >= 15 ? '✅' : items.length >= 10 ? '⚠️' : '❌';
      console.log(`   ${day}: ${category} = ${items.length}件 ${status}`);
    });
    
    const totalCategorized = Object.values(categorizedTrends).reduce((sum, items) => sum + items.length, 0);
    const uncategorized = allTrends.length - totalCategorized;
    console.log(`\n📊 分類統計: ${totalCategorized}件分類済み, ${uncategorized}件未分類 (分類率: ${(totalCategorized/allTrends.length*100).toFixed(1)}%)\n`);
    
    // 各曜日の詳細サンプル
    console.log('🔍 各曜日のサンプル記事:');
    weeklyRotation.forEach(({ day, category }) => {
      const items = categorizedTrends[category as keyof typeof categorizedTrends] || [];
      console.log(`\n${day}: ${category} (${items.length}件)`);
      
      if (items.length > 0) {
        items.slice(0, 3).forEach((item, index) => {
          const title = item.title.length > 80 ? item.title.substring(0, 80) + '...' : item.title;
          console.log(`   ${index + 1}. ${title}`);
          console.log(`      ソース: ${item.source}`);
          if (item.description && item.description.trim()) {
            const desc = item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description;
            console.log(`      内容: ${desc}`);
          }
        });
      } else {
        console.log('   ❌ 記事なし - 要改善');
      }
    });
    
    // 記事品質評価
    console.log('\n📈 記事品質評価:');
    Object.entries(categorizedTrends).forEach(([category, items]) => {
      if (items.length === 0) return;
      
      const realArticles = items.filter(item => {
        const hasDescription = item.description && item.description.trim().length > 10;
        const hasScore = (item.score || item.likes || 0) > 0;
        const isNotDummy = !item.url.includes('example.com');
        return hasDescription || hasScore || isNotDummy;
      });
      
      const qualityRatio = (realArticles.length / items.length * 100).toFixed(1);
      const qualityLevel = parseFloat(qualityRatio) > 70 ? '✅ 高品質' : 
                          parseFloat(qualityRatio) > 30 ? '⚠️ 中品質' : 
                          '❌ 低品質';
      
      console.log(`   ${category}: ${qualityRatio}% ${qualityLevel} (${realArticles.length}/${items.length}件)`);
    });
    
    // 改善効果評価
    console.log('\n🎯 改善効果評価:');
    const problemCategories = ['ビジネス', 'プログラミング', 'データサイエンス・AI開発'];
    let improvedCount = 0;
    
    problemCategories.forEach(category => {
      const items = categorizedTrends[category as keyof typeof categorizedTrends] || [];
      const isImproved = items.length > 0;
      console.log(`   ${category}: ${items.length}件 ${isImproved ? '✅ 改善' : '❌ 要継続改善'}`);
      if (isImproved) improvedCount++;
    });
    
    console.log(`\n📊 総合評価: ${improvedCount}/${problemCategories.length}カテゴリが改善`);
    
    if (improvedCount === problemCategories.length) {
      console.log('🎉 すべての問題カテゴリが改善されました！');
    } else {
      console.log('⚠️ 一部カテゴリの追加改善が必要です');
    }
    
    // 記事生成可能性評価
    console.log('\n📝 記事生成可能性評価:');
    const generateableCategories = weeklyRotation.filter(({ category }) => {
      const items = categorizedTrends[category as keyof typeof categorizedTrends] || [];
      return items.length >= 10;
    });
    
    console.log(`   記事生成可能: ${generateableCategories.length}/${weeklyRotation.length}曜日`);
    
    if (generateableCategories.length >= 5) {
      console.log('✅ 週間ブログ生成が可能です');
    } else {
      console.log('⚠️ 追加のソース拡充が必要です');
    }
    
  } catch (error) {
    console.error('テストエラー:', error);
  }
}

testImprovedSystem();