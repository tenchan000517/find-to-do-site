// どのソースから実際の記事が取得できているかチェック
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

async function checkArticleSources() {
  console.log('🔍 記事ソースの詳細チェック\n');
  
  try {
    const allTrends = await getAllTrends();
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    console.log('📊 全カテゴリのソース別分析:\n');
    
    // 全カテゴリを調査
    Object.entries(categorizedTrends).forEach(([category, items]) => {
      console.log(`=== ${category} (${items.length}件) ===`);
      
      // ソース別集計
      const sourceCounts: Record<string, any[]> = {};
      items.forEach(item => {
        if (!sourceCounts[item.source]) {
          sourceCounts[item.source] = [];
        }
        sourceCounts[item.source].push(item);
      });
      
      Object.entries(sourceCounts).forEach(([source, sourceItems]) => {
        console.log(`\n📰 ${source}: ${sourceItems.length}件`);
        
        // 各ソースのサンプル記事を表示
        sourceItems.slice(0, 3).forEach((item, index) => {
          const title = item.title.length > 80 ? item.title.substring(0, 80) + '...' : item.title;
          const hasDescription = item.description && item.description.trim().length > 0;
          const hasScore = (item.score || item.likes || 0) > 0;
          
          console.log(`  ${index + 1}. ${title}`);
          console.log(`     スコア: ${item.score || item.likes || 0} | 説明: ${hasDescription ? 'あり' : 'なし'}`);
          
          if (hasDescription && item.description.length > 0) {
            const desc = item.description.length > 100 
              ? item.description.substring(0, 100) + '...'
              : item.description;
            console.log(`     内容: ${desc}`);
          }
        });
      });
      
      console.log('\n' + '-'.repeat(60) + '\n');
    });
    
    // 記事品質の評価
    console.log('📈 記事品質評価:\n');
    
    const qualityAnalysis = Object.entries(categorizedTrends).map(([category, items]) => {
      const articleLikeItems = items.filter(item => {
        // 記事らしい特徴を持つもの
        const hasDescription = item.description && item.description.trim().length > 10;
        const hasScore = (item.score || item.likes || 0) > 0;
        const isNotGitHubRepo = !item.title.includes('/') || item.title.includes('：') || item.title.includes('の') || item.title.includes('を');
        
        return hasDescription || hasScore || isNotGitHubRepo;
      });
      
      const gitHubRepoItems = items.filter(item => {
        return item.source === 'GitHub Trending' && item.title.includes('/') && !(item.title.includes('：') || item.title.includes('の'));
      });
      
      return {
        category,
        total: items.length,
        articleLike: articleLikeItems.length,
        gitHubRepos: gitHubRepoItems.length,
        quality: articleLikeItems.length / items.length
      };
    });
    
    qualityAnalysis.forEach(analysis => {
      const qualityLevel = analysis.quality > 0.7 ? '✅ 高品質' : 
                          analysis.quality > 0.3 ? '⚠️ 中品質' : 
                          '❌ 低品質';
      
      console.log(`${analysis.category}:`);
      console.log(`  総数: ${analysis.total}件`);
      console.log(`  記事風: ${analysis.articleLike}件`);
      console.log(`  GitHubリポジトリ: ${analysis.gitHubRepos}件`);
      console.log(`  品質: ${(analysis.quality * 100).toFixed(1)}% ${qualityLevel}\n`);
    });
    
    // 推奨ソースの特定
    console.log('🎯 記事取得に適したソース:\n');
    
    const allItems = Object.values(categorizedTrends).flat();
    const sourceQuality: Record<string, {total: number, articleLike: number}> = {};
    
    allItems.forEach(item => {
      if (!sourceQuality[item.source]) {
        sourceQuality[item.source] = { total: 0, articleLike: 0 };
      }
      sourceQuality[item.source].total++;
      
      const isArticleLike = (item.description && item.description.trim().length > 10) ||
                           (item.score || item.likes || 0) > 0 ||
                           (!item.title.includes('/') || item.title.includes('：') || item.title.includes('の'));
      
      if (isArticleLike) {
        sourceQuality[item.source].articleLike++;
      }
    });
    
    Object.entries(sourceQuality)
      .sort(([,a], [,b]) => (b.articleLike / b.total) - (a.articleLike / a.total))
      .forEach(([source, data]) => {
        const quality = data.articleLike / data.total;
        const qualityLevel = quality > 0.7 ? '✅' : quality > 0.3 ? '⚠️' : '❌';
        
        console.log(`${source}: ${data.articleLike}/${data.total}件 (${(quality * 100).toFixed(1)}%) ${qualityLevel}`);
      });
    
  } catch (error) {
    console.error('エラー:', error);
  }
}

checkArticleSources();