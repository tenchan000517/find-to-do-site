// 曜日ごとの実際のプロンプト用データを出力
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

async function testWeeklyDataOutput() {
  console.log('📅 曜日ごとのプロンプト用データ生成テスト\n');
  
  try {
    const allTrends = await getAllTrends();
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    // 週間ローテーション定義
    const weeklyRotation: Record<number, { category: keyof typeof categorizedTrends, displayName: string }> = {
      1: { category: 'キャリア', displayName: '月曜日: キャリア' },
      2: { category: '生成AI', displayName: '火曜日: 生成AI' },
      3: { category: 'ビジネス', displayName: '水曜日: ビジネス' },
      4: { category: 'プログラミング', displayName: '木曜日: プログラミング' },
      5: { category: '勉強・自己啓発', displayName: '金曜日: 勉強・自己啓発' },
      6: { category: 'データサイエンス・AI開発', displayName: '土曜日: データサイエンス・AI開発' },
      0: { category: 'ウェブ開発', displayName: '日曜日: ウェブ開発（週間総合）' }
    };
    
    console.log('='.repeat(100));
    console.log('📊 全カテゴリの記事数サマリー');
    console.log('='.repeat(100));
    
    Object.entries(categorizedTrends).forEach(([category, items]) => {
      const dayInfo = Object.values(weeklyRotation).find(r => r.category === category);
      const dayStr = dayInfo ? ` (${dayInfo.displayName})` : '';
      console.log(`${category}${dayStr}: ${items.length}件`);
    });
    
    console.log('\n');
    
    // 各曜日のデータを順番に出力
    for (const [dayNum, dayInfo] of Object.entries(weeklyRotation)) {
      const items = categorizedTrends[dayInfo.category] || [];
      
      console.log('='.repeat(100));
      console.log(`${dayInfo.displayName}`);
      console.log('='.repeat(100));
      console.log(`記事数: ${items.length}件\n`);
      
      if (items.length === 0) {
        console.log('⚠️ この曜日には記事がありません\n');
        continue;
      }
      
      console.log('📝 プロンプト用生データ:');
      console.log('-'.repeat(80));
      
      items.forEach((item, index) => {
        console.log(`[記事${index + 1}]`);
        console.log(`タイトル: ${item.title}`);
        console.log(`URL: ${item.url}`);
        console.log(`ソース: ${item.source}`);
        console.log(`公開日: ${item.publishedAt}`);
        
        if (item.score || item.likes) {
          console.log(`スコア: ${item.score || item.likes}`);
        }
        
        if (item.comments) {
          console.log(`コメント数: ${item.comments}`);
        }
        
        if (item.topics && item.topics.length > 0) {
          console.log(`トピック: ${item.topics.join(', ')}`);
        }
        
        if (item.description && item.description.trim()) {
          const description = item.description.length > 200 
            ? item.description.substring(0, 200) + '...'
            : item.description;
          console.log(`説明: ${description}`);
        }
        
        console.log(''); // 空行
      });
      
      console.log('-'.repeat(80));
      console.log(`📊 ${dayInfo.displayName}の統計:`);
      
      // ソース別集計
      const sourceCounts: Record<string, number> = {};
      items.forEach(item => {
        sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
      });
      
      console.log('ソース別内訳:');
      Object.entries(sourceCounts).forEach(([source, count]) => {
        console.log(`  ${source}: ${count}件`);
      });
      
      // スコア統計
      const withScore = items.filter(item => (item.score || item.likes || 0) > 0);
      if (withScore.length > 0) {
        const scores = withScore.map(item => item.score || item.likes || 0);
        const maxScore = Math.max(...scores);
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        
        console.log(`スコア統計: 最高${maxScore}, 平均${avgScore.toFixed(1)} (${withScore.length}/${items.length}件にスコアあり)`);
      }
      
      // 記事品質評価
      const articleLikeItems = items.filter(item => {
        const hasDescription = item.description && item.description.trim().length > 10;
        const hasScore = (item.score || item.likes || 0) > 0;
        const isNotGitHubRepo = !item.title.includes('/') || item.title.includes('：') || item.title.includes('の');
        
        return hasDescription || hasScore || isNotGitHubRepo;
      });
      
      const qualityRatio = items.length > 0 ? (articleLikeItems.length / items.length * 100).toFixed(1) : '0';
      const qualityLevel = parseFloat(qualityRatio) > 70 ? '✅ 高品質' : 
                          parseFloat(qualityRatio) > 30 ? '⚠️ 中品質' : 
                          '❌ 低品質';
      
      console.log(`記事品質: ${qualityRatio}% ${qualityLevel} (${articleLikeItems.length}/${items.length}件が記事風)`);
      
      console.log('\n\n');
    }
    
    // 全体のサマリー
    console.log('='.repeat(100));
    console.log('📈 週間データの全体サマリー');
    console.log('='.repeat(100));
    
    const totalArticles = Object.values(categorizedTrends).reduce((sum, items) => sum + items.length, 0);
    console.log(`総記事数: ${totalArticles}件`);
    
    console.log('\n曜日別記事数:');
    Object.entries(weeklyRotation).forEach(([dayNum, dayInfo]) => {
      const count = (categorizedTrends[dayInfo.category] || []).length;
      const status = count > 15 ? '✅' : count > 5 ? '⚠️' : '❌';
      console.log(`  ${dayInfo.displayName}: ${count}件 ${status}`);
    });
    
    // データ品質レポート
    console.log('\n📊 データ品質レポート:');
    Object.entries(weeklyRotation).forEach(([dayNum, dayInfo]) => {
      const items = categorizedTrends[dayInfo.category] || [];
      if (items.length === 0) return;
      
      const articleLikeItems = items.filter(item => {
        const hasDescription = item.description && item.description.trim().length > 10;
        const hasScore = (item.score || item.likes || 0) > 0;
        const isNotGitHubRepo = !item.title.includes('/') || item.title.includes('：') || item.title.includes('の');
        return hasDescription || hasScore || isNotGitHubRepo;
      });
      
      const qualityRatio = (articleLikeItems.length / items.length * 100).toFixed(1);
      const qualityLevel = parseFloat(qualityRatio) > 70 ? '✅' : 
                          parseFloat(qualityRatio) > 30 ? '⚠️' : '❌';
      
      console.log(`  ${dayInfo.category}: ${qualityRatio}% ${qualityLevel}`);
    });
    
  } catch (error) {
    console.error('エラー:', error);
  }
}

testWeeklyDataOutput();