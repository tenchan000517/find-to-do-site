// test-new-trend-system.ts
// 新しいトレンドシステムの動作確認用テストスクリプト

// 環境変数設定
process.env.USE_REALTIME_TRENDS = 'true';

import { fetchTrendingTopics, getTodaysTrendsByCategory } from './src/lib/trends';
import { getAllTrends } from './src/lib/realtime-trends';
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';

async function testNewTrendSystem() {
  console.log('🧪 新トレンドシステム動作確認開始\n');
  
  try {
    console.log('📚 モジュールインポート完了\n');
    
    // Test 1: リアルタイムトレンド取得テスト
    console.log('=== Test 1: リアルタイムトレンド取得 ===');
    const startTime = Date.now();
    
    try {
      const allTrends = await getAllTrends();
      const endTime = Date.now();
      
      console.log(`✅ 取得成功: ${allTrends.length}件のトレンドを取得`);
      console.log(`⏱️ 実行時間: ${endTime - startTime}ms`);
      
      // ソース別統計
      const sourceStats: Record<string, number> = {};
      allTrends.forEach(trend => {
        sourceStats[trend.source] = (sourceStats[trend.source] || 0) + 1;
      });
      
      console.log('📊 ソース別統計:');
      Object.entries(sourceStats).forEach(([source, count]) => {
        console.log(`   ${source}: ${count}件`);
      });
      
    } catch (error: any) {
      console.error('❌ リアルタイムトレンド取得エラー:', error.message);
    }
    
    console.log('\n');
    
    // Test 2: カテゴリ自動分類テスト
    console.log('=== Test 2: カテゴリ自動分類 ===');
    
    try {
      const allTrends = await getAllTrends();
      const categorizedTrends = categorizeAndExtractKeywords(allTrends);
      
      console.log('📂 カテゴリ別分類結果:');
      Object.entries(categorizedTrends).forEach(([category, items]) => {
        console.log(`   ${category}: ${items.length}件`);
        if (items.length > 0) {
          console.log(`      サンプル: "${items[0].title}"`);
        }
      });
      
    } catch (error: any) {
      console.error('❌ カテゴリ分類エラー:', error.message);
    }
    
    console.log('\n');
    
    // Test 3: 各カテゴリでのトレンドトピック取得テスト
    console.log('=== Test 3: カテゴリ別トレンドトピック取得 ===');
    
    const categories = ['プログラミング', 'AI技術', 'ウェブ開発', 'キャリア', 'ビジネス'];
    
    for (const category of categories) {
      try {
        console.log(`\n📂 カテゴリ: ${category}`);
        const topics = await fetchTrendingTopics(category, 3);
        
        console.log(`✅ 取得成功: ${topics.length}件`);
        topics.forEach((topic, index) => {
          console.log(`   ${index + 1}. "${topic}"`);
        });
        
      } catch (error: any) {
        console.error(`❌ ${category} トピック取得エラー:`, error.message);
      }
    }
    
    console.log('\n');
    
    // Test 4: 今日のトレンド取得テスト
    console.log('=== Test 4: 今日のトレンド取得 ===');
    
    try {
      const todaysTrends = await getTodaysTrendsByCategory();
      
      console.log('📅 今日のトレンド:');
      Object.entries(todaysTrends).forEach(([category, trends]) => {
        console.log(`\n📂 ${category} (${trends.length}件):`);
        trends.slice(0, 3).forEach((trend, index) => {
          console.log(`   ${index + 1}. "${trend}"`);
        });
      });
      
    } catch (error: any) {
      console.error('❌ 今日のトレンド取得エラー:', error.message);
    }
    
    console.log('\n');
    
    // Test 5: 新旧システム比較テスト
    console.log('=== Test 5: 新旧システム比較 ===');
    
    try {
      // 新システム
      process.env.USE_REALTIME_TRENDS = 'true';
      const newSystemTopics = await fetchTrendingTopics('プログラミング', 3);
      
      // 旧システム
      process.env.USE_REALTIME_TRENDS = 'false';
      const oldSystemTopics = await fetchTrendingTopics('プログラミング', 3);
      
      console.log('🆕 新システム結果:');
      newSystemTopics.forEach((topic, index) => {
        console.log(`   ${index + 1}. "${topic}"`);
      });
      
      console.log('\n📰 旧システム結果:');
      oldSystemTopics.forEach((topic, index) => {
        console.log(`   ${index + 1}. "${topic}"`);
      });
      
      // 新システムに戻す
      process.env.USE_REALTIME_TRENDS = 'true';
      
    } catch (error: any) {
      console.error('❌ システム比較エラー:', error.message);
    }
    
    console.log('\n🎉 テスト完了！');
    
  } catch (error: any) {
    console.error('💥 テスト実行エラー:', error);
  }
}

// パフォーマンス測定
async function performanceTest() {
  console.log('\n=== パフォーマンステスト ===');
  
  const iterations = 3;
  const times: number[] = [];
  
  for (let i = 0; i < iterations; i++) {
    console.log(`\n📊 実行 ${i + 1}/${iterations}`);
    
    const startTime = Date.now();
    
    try {
      const allTrends = await getAllTrends();
      
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      times.push(executionTime);
      
      console.log(`⏱️ 実行時間: ${executionTime}ms`);
      console.log(`📊 取得件数: ${allTrends.length}件`);
      
    } catch (error: any) {
      console.error(`❌ 実行 ${i + 1} エラー:`, error.message);
    }
  }
  
  if (times.length > 0) {
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    
    console.log('\n📈 パフォーマンス統計:');
    console.log(`   平均実行時間: ${Math.round(avgTime)}ms`);
    console.log(`   最短実行時間: ${minTime}ms`);
    console.log(`   最長実行時間: ${maxTime}ms`);
  }
}

// メイン実行
async function main() {
  console.log('🚀 新トレンドシステム 包括テスト開始');
  console.log('=====================================\n');
  
  await testNewTrendSystem();
  await performanceTest();
  
  console.log('\n=====================================');
  console.log('✨ 全テスト完了');
}

// エラーハンドリング付きで実行
main().catch(error => {
  console.error('💥 メインプロセスエラー:', error);
  process.exit(1);
});