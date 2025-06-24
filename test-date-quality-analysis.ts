// 日付範囲と品質保証条件の詳細分析
import { getAllTrends } from './src/lib/realtime-trends';

async function analyzeDateAndQuality() {
  console.log('📅 日付範囲と品質保証条件の分析開始');
  
  try {
    const allTrends = await getAllTrends();
    console.log(`📊 総トレンド数: ${allTrends.length}件`);
    
    // 1. 日付範囲の分析
    console.log('\n📅 日付範囲分析:');
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const dateRanges = {
      today: 0,
      yesterday: 0,
      thisWeek: 0,
      older: 0,
      noDate: 0
    };
    
    allTrends.forEach(trend => {
      if (!trend.publishedAt) {
        dateRanges.noDate++;
        return;
      }
      
      const trendDate = trend.publishedAt.split('T')[0];
      
      if (trendDate === today) {
        dateRanges.today++;
      } else if (trendDate === yesterday) {
        dateRanges.yesterday++;
      } else if (trendDate >= weekAgo) {
        dateRanges.thisWeek++;
      } else {
        dateRanges.older++;
      }
    });
    
    console.log(`今日 (${today}): ${dateRanges.today}件`);
    console.log(`昨日 (${yesterday}): ${dateRanges.yesterday}件`);
    console.log(`今週 (${weekAgo}以降): ${dateRanges.thisWeek}件`);
    console.log(`1週間以上前: ${dateRanges.older}件`);
    console.log(`日付不明: ${dateRanges.noDate}件`);
    
    // 2. ソース別の日付傾向と品質指標
    console.log('\n📊 ソース別分析:');
    
    const sourceAnalysis: Record<string, {
      count: number;
      hasLikes: number;
      hasScore: number;
      hasComments: number;
      avgLikes?: number;
      avgScore?: number;
      dateRange: string;
      sortable: boolean;
    }> = {};
    
    allTrends.forEach(trend => {
      const source = trend.source || 'Unknown';
      
      if (!sourceAnalysis[source]) {
        sourceAnalysis[source] = {
          count: 0,
          hasLikes: 0,
          hasScore: 0,
          hasComments: 0,
          dateRange: '',
          sortable: false
        };
      }
      
      const analysis = sourceAnalysis[source];
      analysis.count++;
      
      if (trend.likes !== undefined && trend.likes > 0) {
        analysis.hasLikes++;
        analysis.avgLikes = (analysis.avgLikes || 0) + trend.likes;
      }
      
      if (trend.score !== undefined && trend.score > 0) {
        analysis.hasScore++;
        analysis.avgScore = (analysis.avgScore || 0) + trend.score;
      }
      
      if (trend.comments !== undefined && trend.comments > 0) {
        analysis.hasComments++;
      }
    });
    
    // 平均値計算
    Object.keys(sourceAnalysis).forEach(source => {
      const analysis = sourceAnalysis[source];
      if (analysis.hasLikes > 0) {
        analysis.avgLikes = Math.round((analysis.avgLikes || 0) / analysis.hasLikes);
        analysis.sortable = true;
      }
      if (analysis.hasScore > 0) {
        analysis.avgScore = Math.round((analysis.avgScore || 0) / analysis.hasScore);
        analysis.sortable = true;
      }
    });
    
    // 詳細表示
    Object.keys(sourceAnalysis).sort((a, b) => sourceAnalysis[b].count - sourceAnalysis[a].count).forEach(source => {
      const analysis = sourceAnalysis[source];
      console.log(`\n🔍 ${source} (${analysis.count}件):`);
      console.log(`  ✅ いいね数あり: ${analysis.hasLikes}件 (平均: ${analysis.avgLikes || 0})`);
      console.log(`  ✅ スコアあり: ${analysis.hasScore}件 (平均: ${analysis.avgScore || 0})`);
      console.log(`  ✅ コメント数あり: ${analysis.hasComments}件`);
      console.log(`  📊 品質ソート可能: ${analysis.sortable ? 'YES' : 'NO'}`);
    });
    
    // 3. 各ソースの実際の品質フィルタ条件を確認
    console.log('\n🔍 ソース別品質フィルタ条件:');
    
    // Zenn APIの品質条件
    console.log('📚 Zenn API:');
    console.log('  ・日付範囲: API取得時点での最新');
    console.log('  ・品質条件: いいね50+ OR (いいね20+ AND コメント5+)');
    console.log('  ・ソート: liked_count → trending → latest の順');
    console.log('  ・取得数: 最大100件から品質フィルタで絞り込み');
    
    // Hacker News APIの品質条件
    console.log('\n🌐 Hacker News API:');
    console.log('  ・日付範囲: API取得時点での最新top stories');
    console.log('  ・品質条件: スコア10+');
    console.log('  ・ソート: スコア順（API側でソート済み）');
    console.log('  ・取得数: 上位30件から処理');
    
    // GitHub Trendingの品質条件
    console.log('\n💻 GitHub Trending:');
    console.log('  ・日付範囲: daily/weekly');
    console.log('  ・品質条件: GitHub側のトレンドアルゴリズム');
    console.log('  ・ソート: GitHub側でトレンド順ソート済み');
    console.log('  ・取得数: 言語別・期間別で複数取得');
    
    // 生成系の品質条件
    console.log('\n🤖 自動生成系 (キャリア・勉強):');
    console.log('  ・日付範囲: 実行時の現在日時');
    console.log('  ・品質条件: テンプレートベース品質保証');
    console.log('  ・ソート: 体系的構造による順序');
    console.log('  ・取得数: 固定件数（15件、33件など）');
    
    // AI専門検索の品質条件
    console.log('\n🧠 AI専門検索:');
    console.log('  ・日付範囲: Google News RSS（通常24-48時間以内）');
    console.log('  ・品質条件: 関連度スコア0.7+');
    console.log('  ・ソート: 時系列順（RSS配信順）');
    console.log('  ・取得数: キーワード毎に5件まで');
    
    // 4. 実際のデータサンプル表示
    console.log('\n📝 実際のデータサンプル（品質指標付き）:');
    
    const samplesBySource = allTrends.reduce((acc, trend) => {
      const source = trend.source || 'Unknown';
      if (!acc[source]) acc[source] = [];
      if (acc[source].length < 2) acc[source].push(trend);
      return acc;
    }, {} as Record<string, any[]>);
    
    Object.keys(samplesBySource).forEach(source => {
      console.log(`\n🔍 ${source} サンプル:`);
      samplesBySource[source].forEach((trend, index) => {
        console.log(`  ${index + 1}. "${trend.title}"`);
        console.log(`     日付: ${trend.publishedAt ? trend.publishedAt.split('T')[0] : '不明'}`);
        console.log(`     いいね: ${trend.likes || 0}, スコア: ${trend.score || 0}, コメント: ${trend.comments || 0}`);
        console.log(`     URL: ${trend.url}`);
      });
    });
    
    // 5. 結論
    console.log('\n📊 分析結果サマリー:');
    console.log(`✅ 品質ソート可能: ${Object.values(sourceAnalysis).filter(a => a.sortable).length}/${Object.keys(sourceAnalysis).length} ソース`);
    console.log(`📅 当日データ: ${dateRanges.today}件 (${((dateRanges.today / allTrends.length) * 100).toFixed(1)}%)`);
    console.log(`📅 1週間以内: ${dateRanges.today + dateRanges.yesterday + dateRanges.thisWeek}件 (${(((dateRanges.today + dateRanges.yesterday + dateRanges.thisWeek) / allTrends.length) * 100).toFixed(1)}%)`);
    
  } catch (error) {
    console.error('❌ 分析エラー:', error);
  }
}

// 実行
analyzeDateAndQuality();