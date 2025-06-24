// test-actual-generation.ts
// 実際の記事生成フローのテスト（モックなし）

import { generateHybridArticle } from './src/lib/hybrid-generator';
import { validateArticleQuality, formatQualityReport } from './src/lib/quality-validator';
import { fetchTrendingTopics } from './src/lib/trends';
import { getDayOfWeekCategory } from './src/lib/blog';

async function testActualGeneration() {
  console.log('🚀 実際の記事生成フロー開始\n');
  
  try {
    // 1. 今日のカテゴリ取得
    const category = getDayOfWeekCategory();
    console.log(`📂 今日のカテゴリ: ${category}`);
    
    // 2. 実際のトレンドデータ取得
    console.log('\n📊 リアルタイムトレンド取得中...');
    const trendTopics = await fetchTrendingTopics(category, 8);
    console.log(`✅ ${trendTopics.length}件のトレンドを取得`);
    
    // トレンドをオブジェクト形式に変換
    const trendData = trendTopics.map((topic, index) => ({
      title: topic,
      content: topic,
      source: `trend-source-${index}`,
      category: category
    }));
    
    // 3. トピック選択（最初のトレンドを使用）
    const mainTopic = trendTopics[0] || 'モダンウェブ開発の最新動向';
    console.log(`💡 選択トピック: ${mainTopic}`);
    
    // 4. ハイブリッド生成実行
    console.log('\n⚡ ハイブリッド生成開始...');
    const startTime = Date.now();
    
    const hybridConfig = {
      topic: mainTopic,
      category: category,
      trendData: trendData,
      targetWordCount: 3000,
      sectionCount: 4
    };
    
    const result = await generateHybridArticle(hybridConfig);
    const executionTime = Date.now() - startTime;
    
    console.log(`✅ 生成完了! (${(executionTime / 1000).toFixed(1)}秒)`);
    console.log(`📝 タイトル: ${result.title}`);
    console.log(`📊 文字数: ${result.wordCount}文字`);
    console.log(`🔧 セクション数: ${result.sections.length}`);
    
    // 5. 品質検証
    console.log('\n📈 品質検証実行中...');
    const qualityMetrics = validateArticleQuality(
      result.content,
      result.title,
      category,
      trendData
    );
    
    console.log(`🏆 総合品質スコア: ${qualityMetrics.overall.toFixed(1)}/100`);
    
    // 6. 詳細品質レポート
    const report = formatQualityReport(qualityMetrics);
    console.log('\n📋 詳細品質レポート:');
    console.log(report);
    
    // 7. 記事プレビュー（最初の500文字）
    console.log('\n📖 記事プレビュー (最初の500文字):');
    console.log('-'.repeat(60));
    console.log(result.content.substring(0, 500) + '...');
    console.log('-'.repeat(60));
    
    // 8. セクション情報表示
    if (result.sections && result.sections.length > 0) {
      console.log('\n📑 セクション構成:');
      result.sections.forEach((section, index) => {
        console.log(`${index + 1}. ${section.title} (${section.content.length}文字)`);
      });
    }
    
    // 9. 保存確認
    console.log('\n💾 記事を保存しますか？');
    console.log('実際のコンテンツフォルダには保存せず、ここでプレビューのみ表示しています。');
    
    return {
      success: true,
      title: result.title,
      wordCount: result.wordCount,
      qualityScore: qualityMetrics.overall,
      executionTime,
      category,
      sectionsCount: result.sections.length
    };
    
  } catch (error) {
    console.error('\n❌ 生成エラー:', error.message);
    console.error('詳細:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 実行
if (require.main === module) {
  testActualGeneration()
    .then(result => {
      if (result.success) {
        console.log('\n🎉 実際の記事生成フロー成功!');
        console.log(`✨ 品質スコア: ${result.qualityScore}/100`);
        console.log(`⏱️  実行時間: ${(result.executionTime / 1000).toFixed(1)}秒`);
        process.exit(0);
      } else {
        console.log('\n❌ 生成フロー失敗');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 予期しないエラー:', error);
      process.exit(1);
    });
}

export { testActualGeneration };