// 各曜日の記事数が少ない原因を詳細調査
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';
import { getAllTrends, getZennTrending, getHackerNewsTrending } from './src/lib/realtime-trends';

async function debugLowArticleCount() {
  console.log('🔍 記事数が少ない原因の詳細調査\n');
  
  try {
    // Step 1: 各ソースからのデータ取得状況を確認
    console.log('=== Step 1: 各ソースのデータ取得状況 ===');
    
    const zennArticles = await getZennTrending();
    console.log(`Zenn API: ${zennArticles.length}件取得`);
    
    const hackerNewsArticles = await getHackerNewsTrending();
    console.log(`Hacker News: ${hackerNewsArticles.length}件取得`);
    
    const allTrends = await getAllTrends();
    console.log(`全ソース統合: ${allTrends.length}件\n`);
    
    // Step 2: 分類前の全記事を詳細確認
    console.log('=== Step 2: 分類前の全記事の詳細確認 ===');
    
    const sourceCounts: Record<string, any[]> = {};
    allTrends.forEach(item => {
      if (!sourceCounts[item.source]) {
        sourceCounts[item.source] = [];
      }
      sourceCounts[item.source].push(item);
    });
    
    console.log('ソース別記事数:');
    Object.entries(sourceCounts).forEach(([source, items]) => {
      console.log(`  ${source}: ${items.length}件`);
      
      // 各ソースのサンプル記事タイトルを表示
      console.log('    サンプルタイトル:');
      items.slice(0, 3).forEach((item, index) => {
        const shortTitle = item.title.length > 60 ? item.title.substring(0, 60) + '...' : item.title;
        console.log(`      ${index + 1}. ${shortTitle}`);
      });
      console.log('');
    });
    
    // Step 3: 分類システムの詳細分析
    console.log('=== Step 3: 分類システムの詳細分析 ===');
    
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    console.log('分類後のカテゴリ別記事数:');
    Object.entries(categorizedTrends).forEach(([category, items]) => {
      console.log(`  ${category}: ${items.length}件`);
    });
    
    // 分類されなかった記事を確認
    const categorizedCount = Object.values(categorizedTrends).reduce((sum, items) => sum + items.length, 0);
    const uncategorizedCount = allTrends.length - categorizedCount;
    console.log(`\n⚠️ 分類されなかった記事: ${uncategorizedCount}件`);
    
    // Step 4: 問題のあるカテゴリの詳細調査
    console.log('\n=== Step 4: 問題カテゴリの詳細調査 ===');
    
    const problemCategories = ['ビジネス', 'プログラミング', 'データサイエンス・AI開発'];
    
    for (const category of problemCategories) {
      console.log(`\n📊 ${category}カテゴリの詳細分析:`);
      const items = categorizedTrends[category] || [];
      console.log(`  分類された記事数: ${items.length}件`);
      
      if (items.length === 0) {
        console.log('  ❌ 記事が0件の理由を調査中...');
        
        // このカテゴリのキーワードに部分的にマッチする記事を探す
        console.log('  🔍 関連キーワードを含む記事を検索:');
        
        const categoryKeywords = getCategoryKeywords(category);
        console.log(`  キーワード: ${categoryKeywords.join(', ')}`);
        
        const partialMatches = allTrends.filter(item => {
          const text = `${item.title} ${item.description || ''}`.toLowerCase();
          return categoryKeywords.some(keyword => text.includes(keyword.toLowerCase()));
        });
        
        console.log(`  部分マッチ記事: ${partialMatches.length}件`);
        
        if (partialMatches.length > 0) {
          console.log('  部分マッチ記事のサンプル:');
          partialMatches.slice(0, 3).forEach((item, index) => {
            console.log(`    ${index + 1}. ${item.title}`);
            console.log(`       ソース: ${item.source}`);
          });
        } else {
          console.log('  ❌ 関連キーワードを含む記事も見つかりませんでした');
        }
      } else {
        console.log(`  ✅ ${items.length}件が正常に分類されています`);
        items.forEach((item, index) => {
          console.log(`    ${index + 1}. ${item.title}`);
        });
      }
    }
    
    // Step 5: データソースの品質評価
    console.log('\n=== Step 5: データソースの品質評価 ===');
    
    console.log('各ソースの記事品質:');
    Object.entries(sourceCounts).forEach(([source, items]) => {
      const realArticles = items.filter(item => {
        const hasDescription = item.description && item.description.trim().length > 10;
        const hasScore = (item.score || item.likes || 0) > 0;
        const isNotGitHubRepo = !item.title.includes('/') || item.title.includes('：');
        return hasDescription || hasScore || isNotGitHubRepo;
      });
      
      const qualityRatio = items.length > 0 ? (realArticles.length / items.length * 100).toFixed(1) : '0';
      console.log(`  ${source}: ${realArticles.length}/${items.length}件 (${qualityRatio}%)`);
    });
    
    // Step 6: 改善提案
    console.log('\n=== Step 6: 問題の根本原因と改善提案 ===');
    
    console.log('🔍 根本原因分析:');
    
    if (categorizedTrends['ビジネス']?.length === 0) {
      console.log('  ❌ ビジネスカテゴリ: キーワードマッチングが機能していない可能性');
      console.log('     → ビジネス関連キーワードの見直しが必要');
      console.log('     → Google News RSS でビジネス記事を直接取得する必要');
    }
    
    if (categorizedTrends['プログラミング']?.length < 10) {
      console.log('  ❌ プログラミングカテゴリ: 取得件数が極端に少ない');
      console.log('     → Zenn/Qiita/Dev.to からの直接取得が必要');
      console.log('     → GitHub Trending は記事ではなくリポジトリのため除外すべき');
    }
    
    if (categorizedTrends['データサイエンス・AI開発']?.length === 0) {
      console.log('  ❌ データサイエンス・AI開発: 新設カテゴリのため記事が存在しない');
      console.log('     → AI技術専門記事とデータサイエンス記事の取得機能が必要');
      console.log('     → Kaggle/arXiv/Papers with Code からの取得を検討');
    }
    
    console.log('\n💡 緊急改善案:');
    console.log('  1. ビジネス: Google News RSS でビジネス記事を直接取得');
    console.log('  2. プログラミング: Qiita API、Zenn検索機能を追加');
    console.log('  3. データサイエンス: Kaggle Competition、論文RSS追加');
    console.log('  4. 全体: GitHub Trending からの記事風フィルタリング強化');
    
  } catch (error) {
    console.error('調査エラー:', error);
  }
}

// カテゴリ別キーワード取得関数
function getCategoryKeywords(category: string): string[] {
  const keywordMap: Record<string, string[]> = {
    'ビジネス': [
      'ビジネス', '経営', '企業', '戦略', 'マーケティング', '営業', '投資', 
      '起業', 'スタートアップ', '資金調達', 'IPO', 'M&A', 'デジタル変革',
      'business', 'marketing', 'startup', 'investment'
    ],
    'プログラミング': [
      'プログラミング', 'コーディング', 'アルゴリズム', 'データ構造',
      'Python', 'JavaScript', 'Java', 'C++', 'Rust', 'Go', 'TypeScript',
      'programming', 'coding', 'algorithm', 'software development'
    ],
    'データサイエンス・AI開発': [
      'データサイエンス', '機械学習', 'AI開発', '人工知能', 'ML', 'MLOps',
      'データ分析', 'ビッグデータ', '統計', 'pandas', 'scikit-learn',
      'machine learning', 'data science', 'artificial intelligence', 'deep learning'
    ]
  };
  
  return keywordMap[category] || [];
}

debugLowArticleCount();