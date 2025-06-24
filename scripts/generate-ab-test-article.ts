// scripts/generate-ab-test-article.ts
// Phase 3: A/Bテスト統合スクリプト
// 複数生成手法を比較して最適な記事を生成

import { runABTest, formatABTestReport, ABTestConfig, GenerationMethod } from '../src/lib/ab-test-generator';
import { fetchTrendingTopics } from '../src/lib/trends';
import { categorizeContent } from '../src/lib/trend-categorizer';
import { getCategorySelector } from '../src/lib/blog';

async function generateABTestArticle() {
  try {
    console.log('🚀 A/Bテスト記事生成開始...\n');
    
    // 1. トレンドデータ取得
    console.log('📊 トレンドデータ取得中...');
    const trendData = await fetchTrendingTopics('プログラミング', 10);
    console.log(`✅ ${trendData.length}件のトレンドを取得\n`);
    
    // 2. カテゴリ選択
    const categorySelector = getCategorySelector();
    const category = categorySelector.selectCategory();
    console.log(`🏷️  選択されたカテゴリ: ${category}\n`);
    
    // 3. カテゴリ特化トレンド抽出
    const trendObjects = trendData.map((title, index) => ({
      title,
      content: title,
      source: 'trending-' + index,
      category: category
    }));
    
    const useTrends = trendObjects.slice(0, 10);
    
    // 4. トピック生成
    const topTrend = useTrends[0];
    const topic = generateTopicFromTrend(topTrend, category);
    console.log(`💡 生成トピック: ${topic}\n`);
    
    // 5. A/Bテスト設定
    const testMethods: GenerationMethod[] = ['hybrid', 'enhanced', 'optimized', 'basic'];
    
    const abConfig: ABTestConfig = {
      topic,
      category,
      trendData: useTrends,
      targetWordCount: 3500,
      methods: testMethods,
      qualityThreshold: 65,
      maxRetries: 2
    };
    
    console.log(`🧪 A/Bテスト設定:`);
    console.log(`   手法: ${testMethods.join(', ')}`);
    console.log(`   品質閾値: ${abConfig.qualityThreshold}`);
    console.log(`   目標文字数: ${abConfig.targetWordCount}\n`);
    
    // 6. A/Bテスト実行
    console.log('⚡ A/Bテスト実行中...\n');
    const abResult = await runABTest(abConfig);
    
    // 7. 結果レポート
    const report = formatABTestReport(abResult);
    console.log(report);
    
    // 8. 記事保存
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `content/blog/${category.toLowerCase().replace(/\s+/g, '-')}/${timestamp}-ab-test-${abResult.winner}.md`;
    
    const frontmatter = `---
title: "${abResult.bestArticle.title}"
date: "${new Date().toISOString()}"
category: "${category}"
tags: 
  - "${category}"
  - "A/Bテスト"
  - "${abResult.winner}"
description: "A/Bテスト機能により${testMethods.length}手法から選出された最適化記事"
generation_method: "${abResult.winner}"
ab_test_score: ${abResult.results.find(r => r.method === abResult.winner)?.score || 0}
quality_score: ${abResult.bestArticle.qualityScore}
word_count: ${abResult.bestArticle.wordCount}
execution_time: ${abResult.executionTime}
trend_sources: ${useTrends.length}
---

${abResult.bestArticle.content}

---

## 📊 A/Bテスト情報

この記事は複数の生成手法を比較検証するA/Bテストにより作成されました。

**テスト結果:**
- **勝者手法:** ${abResult.winner}
- **総合スコア:** ${abResult.results.find(r => r.method === abResult.winner)?.score.toFixed(2) || 'N/A'}
- **実行時間:** ${abResult.executionTime}ms
- **比較手法数:** ${testMethods.length}

**品質指標:**
- 文字数: ${abResult.bestArticle.wordCount}文字
- 品質スコア: ${abResult.bestArticle.qualityScore}/100
- トレンド反映度: ${abResult.bestArticle.trendReflectionScore}/100
`;
    
    // ディレクトリ作成
    const fs = require('fs');
    const path = require('path');
    const dir = path.dirname(filename);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filename, frontmatter);
    console.log(`\n📄 記事保存完了: ${filename}`);
    
    // 9. 結果サマリー
    console.log(`\n🎉 A/Bテスト記事生成完了!`);
    console.log(`   勝者: ${abResult.winner}`);
    console.log(`   ファイル: ${filename}`);
    console.log(`   文字数: ${abResult.bestArticle.wordCount}`);
    console.log(`   実行時間: ${(abResult.executionTime / 1000).toFixed(1)}秒`);
    
    // 10. 改善提案の表示
    if (abResult.recommendations.length > 0) {
      console.log(`\n💡 改善提案:`);
      abResult.recommendations.forEach(rec => console.log(`   • ${rec}`));
    }
    
    return {
      success: true,
      filename,
      winner: abResult.winner,
      score: abResult.results.find(r => r.method === abResult.winner)?.score || 0
    };
    
  } catch (error) {
    console.error('❌ A/Bテスト記事生成エラー:', error.message);
    console.error('詳細:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * トレンドからトピック生成
 */
function generateTopicFromTrend(trend: any, category: string): string {
  const trendTitle = trend.title || trend.content || '最新技術動向';
  
  const categoryTopicTemplates = {
    '生成AI': [
      `${trendTitle}を活用したAI開発の実践ガイド`,
      `${trendTitle}で変わるAI活用の最新手法`,
      `${trendTitle}時代のAI実装戦略`
    ],
    'ウェブ開発': [
      `${trendTitle}を使ったモダンWeb開発`,
      `${trendTitle}で実現する次世代Webアプリ`,
      `${trendTitle}による開発効率化テクニック`
    ],
    'ビジネス': [
      `${trendTitle}がもたらすビジネス変革`,
      `${trendTitle}を活用した事業戦略`,
      `${trendTitle}時代の新しいビジネスモデル`
    ],
    'キャリア': [
      `${trendTitle}時代に必要なスキルセット`,
      `${trendTitle}を学んでキャリアアップする方法`,
      `${trendTitle}分野での転職・昇進戦略`
    ]
  };
  
  const templates = categoryTopicTemplates[category] || [
    `${trendTitle}の実践的活用法`,
    `${trendTitle}完全ガイド`,
    `${trendTitle}で始める新しい取り組み`
  ];
  
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  return randomTemplate;
}

/**
 * メイン実行
 */
if (require.main === module) {
  generateABTestArticle()
    .then(result => {
      if (result.success) {
        console.log('\n✅ 処理完了');
        process.exit(0);
      } else {
        console.log('\n❌ 処理失敗');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ 予期しないエラー:', error);
      process.exit(1);
    });
}

export { generateABTestArticle };