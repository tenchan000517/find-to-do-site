// ウェブ開発記事の新実装をテスト
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';
import { getAllTrends, getWebDevTrends } from './src/lib/realtime-trends';

async function testWebDevArticles() {
  console.log('🧪 ウェブ開発記事の新実装テスト開始\n');
  
  try {
    // Step 1: ウェブ開発特化記事の直接テスト
    console.log('=== Step 1: ウェブ開発特化Zenn記事の直接取得 ===');
    const webDevArticles = await getWebDevTrends();
    
    console.log(`📊 取得結果: ${webDevArticles.length}件\n`);
    
    if (webDevArticles.length > 0) {
      console.log('📋 取得したウェブ開発記事:');
      webDevArticles.forEach((article, index) => {
        console.log(`  ${index + 1}. ${article.title}`);
        console.log(`     ソース: ${article.source} | いいね: ${article.likes} | URL: ${article.url}`);
        if (article.topics && article.topics.length > 0) {
          console.log(`     トピック: ${article.topics.join(', ')}`);
        }
        console.log('');
      });
    } else {
      console.log('⚠️ ウェブ開発記事が取得できませんでした');
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
    
    // Step 2: 統合システムでのテスト
    console.log('=== Step 2: 統合システムでのウェブ開発カテゴリテスト ===');
    const allTrends = await getAllTrends();
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    const webDevCategory = categorizedTrends['ウェブ開発'] || [];
    
    console.log(`📊 統合後のウェブ開発カテゴリ: ${webDevCategory.length}件\n`);
    
    // ソース別分析
    const sourceCounts: Record<string, number> = {};
    webDevCategory.forEach(item => {
      sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
    });
    
    console.log('📰 ソース別内訳:');
    Object.entries(sourceCounts).forEach(([source, count]) => {
      console.log(`  ${source}: ${count}件`);
    });
    
    // 記事品質分析
    const articleLikeItems = webDevCategory.filter(item => {
      const hasDescription = item.description && item.description.trim().length > 10;
      const hasScore = (item.score || item.likes || 0) > 0;
      const isNotGitHubRepo = !item.title.includes('/') || item.title.includes('：') || item.title.includes('の');
      
      return hasDescription || hasScore || isNotGitHubRepo;
    });
    
    const gitHubRepoItems = webDevCategory.filter(item => {
      return item.source === 'GitHub Trending' && item.title.includes('/');
    });
    
    console.log('\n📈 記事品質分析:');
    console.log(`  記事風コンテンツ: ${articleLikeItems.length}件`);
    console.log(`  GitHubリポジトリ: ${gitHubRepoItems.length}件`);
    
    const qualityRatio = webDevCategory.length > 0 ? (articleLikeItems.length / webDevCategory.length * 100).toFixed(1) : '0';
    const qualityLevel = parseFloat(qualityRatio) > 70 ? '✅ 高品質' : 
                        parseFloat(qualityRatio) > 30 ? '⚠️ 中品質' : 
                        '❌ 低品質';
    
    console.log(`  品質レベル: ${qualityRatio}% ${qualityLevel}\n`);
    
    // サンプル記事表示
    if (articleLikeItems.length > 0) {
      console.log('📋 高品質記事のサンプル:');
      articleLikeItems.slice(0, 5).forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.title}`);
        console.log(`     ソース: ${item.source} | スコア: ${item.likes || item.score || 0}`);
      });
    }
    
    // 改善効果の評価
    console.log('\n' + '='.repeat(80));
    console.log('📈 改善効果の評価:\n');
    
    if (articleLikeItems.length >= 10) {
      console.log('✅ 大成功: 10件以上の高品質ウェブ開発記事を確保');
      console.log('✅ GitHub Trendingからの脱却に成功');
      console.log('✅ 土曜・日曜の分割が可能');
    } else if (articleLikeItems.length >= 5) {
      console.log('⚠️ 部分成功: 5-9件の記事を確保、さらなる改善が必要');
      console.log('💡 提案: キーワード追加やAPI呼び出し増加を検討');
    } else {
      console.log('❌ 改善不足: 記事数が不足、別のアプローチが必要');
      console.log('💡 提案: Qiita APIやDev.to APIの追加を検討');
    }
    
    // 分割提案
    if (articleLikeItems.length >= 8) {
      const half = Math.ceil(articleLikeItems.length / 2);
      console.log('\n🔄 分割提案:');
      console.log(`  土曜: ウェブ開発 Part 1 (${half}件)`);
      console.log(`  日曜: ウェブ開発 Part 2 (${articleLikeItems.length - half}件)`);
      console.log('  ※フォールバック不要で安定運用可能');
    }
    
  } catch (error) {
    console.error('テストエラー:', error);
  }
}

testWebDevArticles();