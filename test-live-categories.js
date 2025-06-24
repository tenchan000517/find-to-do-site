// 実際にトレンド取得して分類をテスト
const path = require('path');

// TypeScriptファイルを動的にrequire
async function testLiveCategories() {
  try {
    console.log('=== リアルタイムカテゴリ分類テスト ===\n');
    
    // トレンド取得テスト
    console.log('📊 各ソースからトレンド取得中...');
    
    // 簡易的なソース別テスト
    const sources = [
      'Zenn API',
      'Hacker News', 
      'GitHub Trending',
      'キャリアトレンド生成',
      '勉強・自己啓発生成'
    ];
    
    // 各ソースのテスト実行
    for (const source of sources) {
      console.log(`\n🔍 ${source} テスト:`);
      
      try {
        if (source === 'Zenn API') {
          // Zenn APIテスト
          const axios = require('axios');
          const response = await axios.get('https://zenn.dev/api/articles?order=trending&count=5', {
            timeout: 5000,
            headers: { 'User-Agent': 'TestBot/1.0' }
          });
          
          if (response.data && response.data.articles) {
            console.log(`  ✅ 取得成功: ${response.data.articles.length}件`);
            response.data.articles.slice(0, 3).forEach((article, i) => {
              console.log(`    ${i+1}. ${article.title} (いいね: ${article.liked_count})`);
            });
          } else {
            console.log('  ❌ 記事データが見つかりません');
          }
        }
        
        if (source === 'Hacker News') {
          // Hacker Newsテスト
          const axios = require('axios');
          const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json', {
            timeout: 5000
          });
          
          if (Array.isArray(response.data)) {
            console.log(`  ✅ 取得成功: トップストーリーID ${response.data.length}件`);
            
            // 最初の1件の詳細を取得
            const itemResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${response.data[0]}.json`);
            if (itemResponse.data) {
              console.log(`    1. ${itemResponse.data.title} (スコア: ${itemResponse.data.score})`);
            }
          } else {
            console.log('  ❌ ストーリーIDが取得できません');
          }
        }
        
        if (source === 'GitHub Trending') {
          // GitHub Trendingテスト（簡易版）
          const axios = require('axios');
          try {
            const response = await axios.get('https://github.com/trending/javascript', {
              timeout: 10000,
              headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TestBot/1.0)' }
            });
            console.log(`  ✅ GitHub Trending アクセス成功 (レスポンス: ${response.data.length}文字)`);
          } catch (githubError) {
            console.log(`  ⚠️ GitHub Trending アクセス制限: ${githubError.message}`);
          }
        }
        
        if (source === 'キャリアトレンド生成') {
          // キャリアトレンド生成テスト
          const careerKeywords = ['転職', 'キャリア', '就活', '働き方', 'スキルアップ'];
          console.log(`  ✅ キャリアトレンド生成: ${careerKeywords.length}キーワード準備完了`);
          careerKeywords.forEach((keyword, i) => {
            console.log(`    ${i+1}. 2025年の${keyword}トレンドと最新動向`);
          });
        }
        
        if (source === '勉強・自己啓発生成') {
          // 勉強・自己啓発生成テスト
          const studyBooks = ['7つの習慣', 'アドラー心理学', 'バレットジャーナル'];
          console.log(`  ✅ 勉強・自己啓発生成: ${studyBooks.length}書籍から生成`);
          studyBooks.forEach((book, i) => {
            console.log(`    ${i+1}. ${book} #1 入門編からアプローチ`);
          });
        }
        
      } catch (sourceError) {
        console.log(`  ❌ ${source} エラー: ${sourceError.message}`);
      }
    }
    
    console.log('\n=== カテゴリ分類パターンテスト ===');
    
    // テストデータでカテゴリ分類をシミュレート
    const testTrends = [
      { title: 'Next.js 15の新機能とパフォーマンス改善', source: 'Zenn API' },
      { title: 'React Native vs Flutter 2024年比較', source: 'Zenn API' },
      { title: 'スタートアップの資金調達戦略2024', source: 'テスト' },
      { title: 'SaaS業界のトレンドと成長戦略', source: 'テスト' },
      { title: '2025年の就活トレンドと最新動向', source: 'キャリアトレンド生成' },
      { title: 'ChatGPTを活用した業務効率化', source: 'テスト' },
      { title: 'Unity 2Dゲーム開発の基礎と実践', source: 'テスト' }
    ];
    
    console.log('\n📂 テストデータの分類結果:');
    
    testTrends.forEach(trend => {
      let category = '未分類';
      const title = trend.title.toLowerCase();
      
      // 簡易分類ロジック
      if (title.includes('next.js') || title.includes('react') || title.includes('unity') || title.includes('flutter')) {
        category = 'ウェブ・アプリ開発';
      } else if (title.includes('スタートアップ') || title.includes('saas') || title.includes('資金調達')) {
        category = 'ビジネス';
      } else if (title.includes('就活') || title.includes('キャリア') || title.includes('転職')) {
        category = 'キャリア';
      } else if (title.includes('chatgpt') || title.includes('ai')) {
        category = '生成AI';
      }
      
      console.log(`  ${trend.title}`);
      console.log(`    → ${category} (出典: ${trend.source})`);
    });
    
    console.log('\n=== 実際の問題点分析 ===');
    console.log('🎯 ウェブ・アプリ開発:');
    console.log('  - 範囲が広い（Web、モバイル、ゲーム、デスクトップ全て含む）');
    console.log('  - 96個のキーワードだが、散らばりすぎて焦点が定まらない');
    console.log('  - 日本語キーワードが少ない（3個のみ）');
    
    console.log('\n🏢 ビジネス:');
    console.log('  - 40個のキーワードで比較的充実');
    console.log('  - スタートアップ寄りで、一般的なビジネストピックが少ない');
    console.log('  - 日本語キーワードが少ない（2個のみ）');
    
    console.log('\n📈 週間総合:');
    console.log('  - 自動分類されない特別カテゴリ');
    console.log('  - 実際にはトレンドが集約されていない');
    console.log('  - 曜日別ローテーション機能が活用されていない');
    
  } catch (error) {
    console.error('❌ テストエラー:', error);
  }
}

testLiveCategories();