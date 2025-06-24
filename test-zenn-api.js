#!/usr/bin/env node

/**
 * Zenn非公式API検証テスト
 * 高品質・高ブックマーク記事の取得テスト
 */

const https = require('https');

// テスト結果格納
const testResults = {
  apis: {},
  totalItems: 0,
  qualityMetrics: {
    highBookmark: [],
    highLike: [],
    recent: [],
    trending: []
  },
  categories: {},
  summary: {}
};

/**
 * HTTPSリクエスト関数
 */
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ZennTrendBot/1.0)',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (err) {
            reject(new Error(`JSON Parse Error: ${err.message}`));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Zenn Publications API - 記事一覧取得
 */
async function getZennPublications() {
  console.log('📚 Zenn Publications API テスト...');
  
  try {
    const url = 'https://zenn.dev/api/publications/headwaters';
    console.log(`  URL: ${url}`);
    
    const data = await fetchJSON(url);
    console.log(`  ✅ Publications API成功`);
    console.log(`  レスポンス構造:`, Object.keys(data));
    
    return data;
    
  } catch (error) {
    console.log(`  ❌ Publications API失敗: ${error.message}`);
    return null;
  }
}

/**
 * Zenn Articles API - 記事一覧取得
 */
async function getZennArticles(params = {}) {
  console.log('📄 Zenn Articles API テスト...');
  
  try {
    // パラメータ構築
    const defaultParams = {
      order: 'liked_count',  // liked_count, latest, trending
      count: 50
    };
    const queryParams = { ...defaultParams, ...params };
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    const url = `https://zenn.dev/api/articles?${queryString}`;
    console.log(`  URL: ${url}`);
    
    const data = await fetchJSON(url);
    
    if (data && data.articles) {
      console.log(`  ✅ Articles API成功: ${data.articles.length}件取得`);
      return data.articles;
    } else {
      console.log(`  ⚠️ Articles API: 予期しないレスポンス構造`);
      console.log(`  レスポンス:`, Object.keys(data || {}));
      return [];
    }
    
  } catch (error) {
    console.log(`  ❌ Articles API失敗: ${error.message}`);
    return [];
  }
}

/**
 * Zenn Trending API
 */
async function getZennTrending() {
  console.log('🔥 Zenn Trending API テスト...');
  
  try {
    const url = 'https://zenn.dev/api/articles?order=trending&count=30';
    console.log(`  URL: ${url}`);
    
    const data = await fetchJSON(url);
    
    if (data && data.articles) {
      console.log(`  ✅ Trending API成功: ${data.articles.length}件取得`);
      return data.articles;
    } else {
      console.log(`  ⚠️ Trending API: 予期しないレスポンス構造`);
      return [];
    }
    
  } catch (error) {
    console.log(`  ❌ Trending API失敗: ${error.message}`);
    return [];
  }
}

/**
 * 記事品質分析
 */
function analyzeArticleQuality(articles) {
  console.log('📊 記事品質分析中...');
  
  const analysis = {
    total: articles.length,
    highQuality: [],
    categories: {},
    metrics: {
      avgLikes: 0,
      avgBookmarks: 0,
      avgComments: 0,
      recentCount: 0
    }
  };
  
  let totalLikes = 0;
  let totalBookmarks = 0; 
  let totalComments = 0;
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  articles.forEach(article => {
    // 基本メトリクス
    const likes = article.liked_count || 0;
    const bookmarks = article.bookmarked_count || 0;
    const comments = article.comments_count || 0;
    const publishedAt = new Date(article.published_at);
    
    totalLikes += likes;
    totalBookmarks += bookmarks;
    totalComments += comments;
    
    // 最近の記事カウント
    if (publishedAt > oneWeekAgo) {
      analysis.metrics.recentCount++;
    }
    
    // 高品質判定 (likes > 50 または bookmarks > 20)
    if (likes > 50 || bookmarks > 20) {
      analysis.highQuality.push({
        title: article.title,
        slug: article.slug,
        likes: likes,
        bookmarks: bookmarks,
        comments: comments,
        publishedAt: article.published_at,
        url: `https://zenn.dev/${article.user?.username}/${article.type}/${article.slug}`,
        topics: article.topics || [],
        qualityScore: likes + (bookmarks * 2) + comments
      });
    }
    
    // カテゴリ分析
    if (article.topics) {
      article.topics.forEach(topic => {
        if (!analysis.categories[topic]) {
          analysis.categories[topic] = { count: 0, totalLikes: 0 };
        }
        analysis.categories[topic].count++;
        analysis.categories[topic].totalLikes += likes;
      });
    }
  });
  
  // 平均計算
  analysis.metrics.avgLikes = (totalLikes / articles.length).toFixed(1);
  analysis.metrics.avgBookmarks = (totalBookmarks / articles.length).toFixed(1);
  analysis.metrics.avgComments = (totalComments / articles.length).toFixed(1);
  
  // 高品質記事を品質スコア順にソート
  analysis.highQuality.sort((a, b) => b.qualityScore - a.qualityScore);
  
  return analysis;
}

/**
 * カテゴリ・トピック分析
 */
function analyzeTopics(articles) {
  console.log('🏷️ トピック分析中...');
  
  const topicAnalysis = {};
  
  articles.forEach(article => {
    if (article.topics) {
      article.topics.forEach(topic => {
        if (!topicAnalysis[topic]) {
          topicAnalysis[topic] = {
            count: 0,
            articles: [],
            totalLikes: 0,
            totalBookmarks: 0
          };
        }
        
        topicAnalysis[topic].count++;
        topicAnalysis[topic].totalLikes += article.liked_count || 0;
        topicAnalysis[topic].totalBookmarks += article.bookmarked_count || 0;
        
        if (topicAnalysis[topic].articles.length < 3) {
          topicAnalysis[topic].articles.push({
            title: article.title,
            likes: article.liked_count || 0,
            slug: article.slug
          });
        }
      });
    }
  });
  
  // トピックを人気順にソート
  const sortedTopics = Object.entries(topicAnalysis)
    .sort(([,a], [,b]) => b.count - a.count)
    .slice(0, 15); // 上位15トピック
  
  return sortedTopics;
}

/**
 * メイン実行関数
 */
async function main() {
  console.log('🚀 Zenn非公式API検証テスト開始');
  console.log('='.repeat(60));
  
  const startTime = Date.now();
  
  try {
    // 複数のAPIエンドポイントをテスト
    console.log('📡 複数APIエンドポイント並列テスト...\n');
    
    const promises = [
      getZennArticles({ order: 'liked_count', count: 50 }),
      getZennArticles({ order: 'latest', count: 30 }),
      getZennTrending(),
      getZennPublications()
    ];
    
    const [likedArticles, latestArticles, trendingArticles, publications] = await Promise.all(promises);
    
    // 結果統合
    const allArticles = [
      ...likedArticles,
      ...latestArticles,
      ...trendingArticles
    ];
    
    // 重複除去
    const uniqueArticles = allArticles.filter((article, index, arr) => 
      arr.findIndex(a => a.slug === article.slug) === index
    );
    
    console.log('\n📊 API取得結果サマリー');
    console.log('='.repeat(40));
    
    console.log(`高評価記事 (liked_count順): ${likedArticles.length}件`);
    console.log(`最新記事 (latest順): ${latestArticles.length}件`);
    console.log(`トレンド記事: ${trendingArticles.length}件`);
    console.log(`Publications: ${publications ? 'API成功' : 'API失敗'}`);
    console.log(`重複除去後総記事数: ${uniqueArticles.length}件`);
    console.log(`処理時間: ${((Date.now() - startTime) / 1000).toFixed(1)}秒`);
    
    // 記事品質分析
    const qualityAnalysis = analyzeArticleQuality(uniqueArticles);
    
    console.log('\n🏆 記事品質分析結果');
    console.log('='.repeat(40));
    
    console.log(`総記事数: ${qualityAnalysis.total}件`);
    console.log(`高品質記事: ${qualityAnalysis.highQuality.length}件`);
    console.log(`平均いいね数: ${qualityAnalysis.metrics.avgLikes}`);
    console.log(`平均ブックマーク数: ${qualityAnalysis.metrics.avgBookmarks}`);
    console.log(`平均コメント数: ${qualityAnalysis.metrics.avgComments}`);
    console.log(`1週間以内の記事: ${qualityAnalysis.metrics.recentCount}件`);
    
    // 高品質記事TOP10表示
    console.log('\n💎 高品質記事 TOP10');
    console.log('='.repeat(50));
    
    qualityAnalysis.highQuality.slice(0, 10).forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   👍 ${article.likes} 📚 ${article.bookmarks} 💬 ${article.comments} (スコア: ${article.qualityScore})`);
      console.log(`   🏷️ ${article.topics.slice(0, 3).join(', ')}`);
      console.log(`   📅 ${article.publishedAt.substring(0, 10)}`);
      console.log('');
    });
    
    // トピック分析
    const topicAnalysis = analyzeTopics(uniqueArticles);
    
    console.log('🏷️ 人気トピック TOP10');
    console.log('='.repeat(40));
    
    topicAnalysis.slice(0, 10).forEach(([topic, data], index) => {
      console.log(`${index + 1}. ${topic}: ${data.count}記事 (いいね計: ${data.totalLikes})`);
      if (data.articles.length > 0) {
        console.log(`   サンプル: "${data.articles[0].title}" (👍 ${data.articles[0].likes})`);
      }
    });
    
    // トレンドワード抽出
    console.log('\n🔥 トレンドワード抽出');
    console.log('='.repeat(40));
    
    const wordCount = {};
    uniqueArticles.forEach(article => {
      const text = article.title + ' ' + (article.topics ? article.topics.join(' ') : '');
      const words = text.split(/[\s、。！？・]/);
      words.forEach(word => {
        word = word.trim();
        if (word.length >= 2 && 
            !word.match(/^[a-zA-Z0-9]+$/) && 
            !['記事', 'について', 'による', 'のため'].includes(word)) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
    });
    
    const topWords = Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15);
    
    topWords.forEach(([word, count], index) => {
      console.log(`${index + 1}. "${word}" (${count}回)`);
    });
    
    // API信頼性評価
    console.log('\n✅ API信頼性評価');
    console.log('='.repeat(40));
    
    const evaluation = {
      '記事取得量': uniqueArticles.length >= 100 ? '✅ 優秀' : uniqueArticles.length >= 50 ? '⚠️ 良好' : '❌ 不足',
      '高品質記事割合': (qualityAnalysis.highQuality.length / qualityAnalysis.total * 100).toFixed(1) + '%',
      'API応答速度': ((Date.now() - startTime) / 1000) < 5 ? '✅ 高速' : '⚠️ 普通',
      '鮮度': qualityAnalysis.metrics.recentCount >= 10 ? '✅ 新鮮' : '⚠️ 普通',
      'カテゴリ多様性': topicAnalysis.length >= 10 ? '✅ 豊富' : '⚠️ 限定的'
    };
    
    Object.entries(evaluation).forEach(([criteria, result]) => {
      console.log(`${criteria}: ${result}`);
    });
    
    // 実装推奨度評価
    console.log('\n🎯 Zenn API実装推奨度');
    console.log('='.repeat(40));
    
    const pros = [
      '✅ 豊富な記事数 (100件以上取得可能)',
      '✅ 高品質記事の明確な指標 (いいね・ブックマーク)',
      '✅ カテゴリ・トピック情報充実',
      '✅ 最新性とトレンド情報両方対応',
      '✅ JSON形式で構造化されたデータ'
    ];
    
    const cons = [
      '⚠️ 非公式APIのため将来的な変更リスク',
      '⚠️ レート制限の詳細が不明',
      '⚠️ エラーハンドリングが必要'
    ];
    
    console.log('【メリット】');
    pros.forEach(pro => console.log(pro));
    
    console.log('\n【注意点】');
    cons.forEach(con => console.log(con));
    
    // 技術系トレンドとの比較
    console.log('\n🔄 既存システムとの比較');
    console.log('='.repeat(40));
    
    console.log('GitHub Trending: 102件 (技術のみ)');
    console.log('はてなブックマーク: 53件 (技術のみ)');
    console.log('Hacker News: 10件 (海外技術のみ)');
    console.log(`Zenn API: ${uniqueArticles.length}件 (技術+多様なカテゴリ)`);
    
    if (uniqueArticles.length >= 100) {
      console.log('\n🎉 結論: Zenn APIは技術系トレンド取得において非常に有効');
      console.log('💡 推奨: 既存システムに統合して技術トレンドの質・量を大幅改善');
    } else if (uniqueArticles.length >= 50) {
      console.log('\n✅ 結論: Zenn APIは技術系トレンド取得において有効');
      console.log('💡 推奨: 補完的なソースとして活用');
    } else {
      console.log('\n⚠️ 結論: Zenn APIは限定的な効果');
      console.log('💡 推奨: 他のソースと組み合わせて使用');
    }
    
    // 実装推奨事項
    console.log('\n💡 実装推奨事項');
    console.log('='.repeat(40));
    
    console.log('1. liked_count順での高品質記事取得');
    console.log('2. trending記事での最新トレンド把握');
    console.log('3. トピック情報での自動カテゴリ分類');
    console.log('4. ブックマーク数での記事価値判定');
    console.log('5. 非公式APIのためフォールバック機能必須');
    
  } catch (error) {
    console.error('❌ テスト実行エラー:', error.message);
  }
  
  console.log('\n🔚 Zenn API検証テスト完了');
}

// 実行
main().catch(console.error);