// ウェブ開発47件の詳細分析 - トレンド性とフロント/フルスタック分割可能性
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

async function analyzeWebDevTrends() {
  console.log('🔍 ウェブ開発トレンド詳細分析開始\n');
  
  try {
    // 全トレンドを取得
    const allTrends = await getAllTrends();
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    const webDevItems = categorizedTrends['ウェブ開発'] || [];
    
    console.log(`📊 ウェブ開発記事総数: ${webDevItems.length}件\n`);
    
    // 1. 日付・鮮度分析
    console.log('📅 日付・鮮度分析:');
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    
    let recentCount = 0;
    let weeklyCount = 0;
    let olderCount = 0;
    let noDateCount = 0;
    
    webDevItems.forEach(item => {
      if (item.publishedAt) {
        const publishDate = new Date(item.publishedAt);
        const age = now.getTime() - publishDate.getTime();
        
        if (age <= oneDay) recentCount++;
        else if (age <= oneWeek) weeklyCount++;
        else olderCount++;
      } else {
        noDateCount++;
      }
    });
    
    console.log(`  📈 24時間以内: ${recentCount}件`);
    console.log(`  📊 1週間以内: ${weeklyCount}件`);
    console.log(`  📜 1週間超: ${olderCount}件`);
    console.log(`  ❓ 日付なし: ${noDateCount}件`);
    
    const trendRatio = ((recentCount + weeklyCount) / webDevItems.length * 100).toFixed(1);
    console.log(`  🎯 トレンド性: ${trendRatio}% (1週間以内の記事)\n`);
    
    // 2. ソース別分析
    console.log('📰 ソース別分析:');
    const sourceCounts: Record<string, number> = {};
    webDevItems.forEach(item => {
      sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
    });
    
    Object.entries(sourceCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([source, count]) => {
        console.log(`  ${source}: ${count}件`);
      });
    console.log();
    
    // 3. フロントエンド vs フルスタック分類
    console.log('🎯 フロントエンド vs フルスタック分析:');
    
    const frontendKeywords = [
      'react', 'vue', 'angular', 'svelte', 'frontend', 'html', 'css', 'javascript', 'typescript',
      'responsive', 'ui', 'ux', 'design', 'component', 'jsx', 'tsx', 'dom', 'browser',
      'webpack', 'vite', 'babel', 'sass', 'less', 'tailwind', 'bootstrap'
    ];
    
    const fullstackKeywords = [
      'api', 'backend', 'fullstack', 'full-stack', 'database', 'server', 'node', 'express',
      'nest', 'next', 'nuxt', 'gatsby', 'deployment', 'docker', 'devops', 'microservice',
      'mongodb', 'postgresql', 'mysql', 'redis', 'graphql', 'rest', 'authentication'
    ];
    
    const frontendItems: typeof webDevItems = [];
    const fullstackItems: typeof webDevItems = [];
    const ambiguousItems: typeof webDevItems = [];
    
    webDevItems.forEach(item => {
      const text = `${item.title} ${item.description || ''}`.toLowerCase();
      
      const frontendScore = frontendKeywords.reduce((score, keyword) => 
        score + (text.includes(keyword) ? 1 : 0), 0);
      const fullstackScore = fullstackKeywords.reduce((score, keyword) => 
        score + (text.includes(keyword) ? 1 : 0), 0);
      
      if (frontendScore > fullstackScore && frontendScore > 0) {
        frontendItems.push(item);
      } else if (fullstackScore > frontendScore && fullstackScore > 0) {
        fullstackItems.push(item);
      } else {
        ambiguousItems.push(item);
      }
    });
    
    console.log(`  🎨 フロントエンド特化: ${frontendItems.length}件`);
    console.log(`  🔧 フルスタック・バックエンド: ${fullstackItems.length}件`);
    console.log(`  ❓ 分類困難: ${ambiguousItems.length}件\n`);
    
    // 4. 分割後の各カテゴリのトレンド性チェック
    console.log('📈 分割後のトレンド性チェック:');
    
    const analyzeCategory = (items: typeof webDevItems, name: string) => {
      if (items.length === 0) {
        console.log(`  ${name}: 0件 ❌ データ不足`);
        return false;
      }
      
      let categoryRecentCount = 0;
      let categoryWeeklyCount = 0;
      
      items.forEach(item => {
        if (item.publishedAt) {
          const publishDate = new Date(item.publishedAt);
          const age = now.getTime() - publishDate.getTime();
          
          if (age <= oneDay) categoryRecentCount++;
          else if (age <= oneWeek) categoryWeeklyCount++;
        }
      });
      
      const categoryTrendRatio = ((categoryRecentCount + categoryWeeklyCount) / items.length * 100).toFixed(1);
      const hasGoodTrends = (categoryRecentCount + categoryWeeklyCount) >= 3; // 最低3件のトレンド記事
      
      console.log(`  ${name}: ${items.length}件 ${hasGoodTrends ? '✅' : '⚠️'} (トレンド性: ${categoryTrendRatio}%)`);
      
      if (items.length > 0) {
        console.log(`    📋 サンプル: ${items.slice(0, 3).map(item => item.title.substring(0, 50)).join(' | ')}`);
      }
      
      return hasGoodTrends;
    };
    
    const frontendViable = analyzeCategory(frontendItems, 'フロントエンド特化');
    const fullstackViable = analyzeCategory(fullstackItems, 'フルスタック・バックエンド');
    
    console.log();
    
    // 5. 結論と推奨
    console.log('🎯 分析結果と推奨:');
    
    if (frontendViable && fullstackViable) {
      console.log('  ✅ フロントエンド/フルスタック分割 推奨');
      console.log('  ✅ 両カテゴリとも十分なトレンド記事を確保可能');
      console.log('  ✅ 土曜・日曜で分けても枯渇リスク低');
      
      console.log('\n📅 推奨配置:');
      console.log('  土曜: フロントエンド特化 (React, Vue, CSS等)');
      console.log('  日曜: フルスタック・バックエンド (API, DB, デプロイ等)');
      
    } else if (frontendItems.length + fullstackItems.length >= 10) {
      console.log('  ⚠️ 分割可能だが一方が弱い');
      console.log('  💡 代替案: 新着/人気でのランキング分割を推奨');
      
    } else {
      console.log('  ❌ 分割非推奨 - トレンド性確保困難');
      console.log('  💡 代替案: 1つのカテゴリとして維持し、別カテゴリを土曜に配置');
    }
    
  } catch (error) {
    console.error('分析エラー:', error);
  }
}

analyzeWebDevTrends();