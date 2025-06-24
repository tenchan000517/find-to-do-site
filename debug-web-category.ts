// ウェブ開発カテゴリの分類問題を詳細調査
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

async function debugWebCategory() {
  console.log('🔍 ウェブ開発カテゴリの分類問題調査開始\n');
  
  try {
    // 全トレンドを取得
    const allTrends = await getAllTrends();
    console.log(`📊 総トレンド件数: ${allTrends.length}件\n`);
    
    // ウェブ開発に関連しそうな記事を手動検索
    console.log('🔍 ウェブ開発関連キーワードで記事を検索:');
    const webKeywords = [
      'web', 'frontend', 'フロントエンド', 'react', 'vue', 'angular',
      'javascript', 'typescript', 'css', 'html', 'responsive',
      'ui', 'ux', 'design', 'website', 'webサイト', 'ウェブサイト'
    ];
    
    const potentialWebItems = allTrends.filter(item => {
      const text = `${item.title} ${item.topics?.join(' ') || ''}`.toLowerCase();
      return webKeywords.some(keyword => text.includes(keyword.toLowerCase()));
    });
    
    console.log(`🎯 ウェブ関連の可能性がある記事: ${potentialWebItems.length}件`);
    
    // 上位10件の詳細を表示
    potentialWebItems.slice(0, 10).forEach((item, index) => {
      const score = item.score || item.likes || 0;
      console.log(`\n${index + 1}. ${item.title}`);
      console.log(`   📍 ソース: ${item.source}`);
      console.log(`   📊 スコア: ${score}`);
      console.log(`   🏷️  トピック: ${item.topics?.join(', ') || 'なし'}`);
      
      // どのキーワードにマッチしたかチェック
      const text = `${item.title} ${item.topics?.join(' ') || ''}`.toLowerCase();
      const matchedKeywords = webKeywords.filter(keyword => 
        text.includes(keyword.toLowerCase())
      );
      console.log(`   🔑 マッチしたキーワード: ${matchedKeywords.join(', ')}`);
    });
    
    // 自動分類の結果
    console.log('\n📂 自動分類の結果:');
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    Object.entries(categorizedTrends).forEach(([category, items]) => {
      console.log(`\n📁 ${category}: ${items.length}件`);
      
      if (category === 'ウェブ開発' || category === 'プログラミング') {
        items.slice(0, 5).forEach((item, index) => {
          const score = item.score || item.likes || 0;
          console.log(`   ${index + 1}. ${item.title} (${score}点)`);
        });
      }
    });
    
    // プログラミングカテゴリの中でウェブ関連を探す
    console.log('\n🔍 プログラミングカテゴリ内のウェブ関連記事:');
    const programmingItems = categorizedTrends['プログラミング'] || [];
    const webInProgramming = programmingItems.filter(item => {
      const text = `${item.title} ${item.topics?.join(' ') || ''}`.toLowerCase();
      return webKeywords.some(keyword => text.includes(keyword.toLowerCase()));
    });
    
    console.log(`📊 プログラミング内のウェブ関連: ${webInProgramming.length}件`);
    webInProgramming.slice(0, 5).forEach((item, index) => {
      const score = item.score || item.likes || 0;
      console.log(`   ${index + 1}. ${item.title} (${score}点)`);
    });
    
    // キーワード辞書の分析
    console.log('\n📖 現在のキーワード辞書分析:');
    
    // trend-categorizer.tsから実際のキーワードを取得
    const CATEGORY_KEYWORDS = {
      'プログラミング': [
        'programming', 'code', 'coding', 'developer', 'development',
        'typescript', 'javascript', 'python', 'rust', 'go', 'java', 'c++',
        'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt'
      ],
      'ウェブ開発': [
        'frontend', 'web development', 'html', 'css', 'sass', 'tailwind', 'bootstrap',
        'responsive', 'mobile-first', 'pwa', 'spa', 'ssr', 'ssg', 'jamstack',
        'フロントエンド', 'ウェブ開発', 'レスポンシブ', 'ウェブサイト制作'
      ]
    };
    
    console.log('🔑 プログラミングキーワード数:', CATEGORY_KEYWORDS['プログラミング'].length);
    console.log('🔑 ウェブ開発キーワード数:', CATEGORY_KEYWORDS['ウェブ開発'].length);
    
    // 重複キーワードをチェック
    const programmingKeywords = CATEGORY_KEYWORDS['プログラミング'];
    const webKeywords2 = CATEGORY_KEYWORDS['ウェブ開発'];
    const duplicates = programmingKeywords.filter(keyword => 
      webKeywords2.includes(keyword)
    );
    
    console.log('⚠️  重複キーワード:', duplicates);
    
    // 分類ロジックをテスト
    console.log('\n🧪 分類ロジックテスト:');
    
    const testItems = potentialWebItems.slice(0, 5);
    testItems.forEach((item, index) => {
      console.log(`\n--- テストアイテム ${index + 1} ---`);
      console.log(`タイトル: ${item.title}`);
      
      const text = `${item.title} ${item.topics?.join(' ') || ''}`.toLowerCase();
      
      // 各カテゴリでのスコア計算
      const scores = {
        'プログラミング': 0,
        'ウェブ開発': 0
      };
      
      Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
        if (category in scores) {
          keywords.forEach(keyword => {
            if (text.includes(keyword.toLowerCase())) {
              const matchScore = text.includes(` ${keyword.toLowerCase()} `) ? 2 : 1;
              scores[category as keyof typeof scores] += matchScore;
            }
          });
        }
      });
      
      console.log(`スコア - プログラミング: ${scores['プログラミング']}, ウェブ開発: ${scores['ウェブ開発']}`);
      
      const winner = scores['プログラミング'] > scores['ウェブ開発'] ? 'プログラミング' : 
                     scores['ウェブ開発'] > scores['プログラミング'] ? 'ウェブ開発' : '引き分け';
      console.log(`判定: ${winner}`);
    });
    
  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

debugWebCategory().catch(console.error);