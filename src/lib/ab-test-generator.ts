// src/lib/ab-test-generator.ts
// Phase 3: A/Bテスト機能
// 複数生成手法の自動比較・最適化システム

import { generateWithGemini } from './gemini';
import { generateHybridArticle, HybridGenerationConfig, GeneratedArticle } from './hybrid-generator';
import { validateArticleQuality, QualityMetrics, formatQualityReport } from './quality-validator';

// A/Bテスト設定
export interface ABTestConfig {
  topic: string;
  category: string;
  trendData: any[];
  targetWordCount?: number;
  methods: GenerationMethod[];
  qualityThreshold?: number;
  maxRetries?: number;
}

export type GenerationMethod = 'hybrid' | 'enhanced' | 'basic' | 'optimized';

export interface ABTestResult {
  winner: GenerationMethod;
  results: GenerationTestResult[];
  bestArticle: GeneratedArticle;
  comparisonReport: string;
  executionTime: number;
  recommendations: string[];
}

export interface GenerationTestResult {
  method: GenerationMethod;
  article: GeneratedArticle | null;
  qualityMetrics: QualityMetrics | null;
  executionTime: number;
  success: boolean;
  errorMessage?: string;
  score: number;
}

// 重み付けスコア計算の設定
const SCORING_WEIGHTS = {
  qualityScore: 0.4,        // 総合品質スコア
  wordCount: 0.15,          // 文字数適合度
  structureScore: 0.15,     // 構造品質
  trendReflection: 0.15,    // トレンド反映度
  executionTime: 0.10,      // 実行効率
  reliability: 0.05         // 成功率
};

/**
 * A/Bテスト実行
 * 複数の生成手法を並行実行して最適な結果を選択
 */
export async function runABTest(config: ABTestConfig): Promise<ABTestResult> {
  const startTime = Date.now();
  console.log(`🧪 A/Bテスト開始: ${config.methods.length}手法を比較`);
  
  const results: GenerationTestResult[] = [];
  
  // 各手法を並行実行
  const promises = config.methods.map(method => 
    testGenerationMethod(method, config)
  );
  
  const testResults = await Promise.allSettled(promises);
  
  // 結果の整理
  testResults.forEach((result, index) => {
    const method = config.methods[index];
    if (result.status === 'fulfilled') {
      results.push(result.value);
    } else {
      results.push({
        method,
        article: null,
        qualityMetrics: null,
        executionTime: 0,
        success: false,
        errorMessage: result.reason?.message || 'Unknown error',
        score: 0
      });
    }
  });
  
  // 勝者の決定
  const winner = selectWinner(results, config);
  const bestResult = results.find(r => r.method === winner);
  
  if (!bestResult?.article) {
    throw new Error('すべての生成手法が失敗しました');
  }
  
  const comparisonReport = generateComparisonReport(results);
  const recommendations = generateRecommendations(results);
  
  console.log(`🏆 勝者: ${winner} (スコア: ${bestResult.score.toFixed(2)})`);
  
  return {
    winner,
    results,
    bestArticle: bestResult.article,
    comparisonReport,
    executionTime: Date.now() - startTime,
    recommendations
  };
}

/**
 * 単一生成手法のテスト実行
 */
async function testGenerationMethod(
  method: GenerationMethod, 
  config: ABTestConfig
): Promise<GenerationTestResult> {
  const startTime = Date.now();
  console.log(`⚡ ${method}手法でテスト実行中...`);
  
  try {
    let article: GeneratedArticle | null = null;
    
    switch (method) {
      case 'hybrid':
        article = await generateHybridArticle({
          topic: config.topic,
          category: config.category,
          trendData: config.trendData,
          targetWordCount: config.targetWordCount
        });
        break;
      
      case 'enhanced':
        const enhancedContent = await generateEnhancedArticle(config);
        article = enhancedContent;
        break;
      
      case 'basic':
        article = await generateBasicArticle(config);
        break;
        
      case 'optimized':
        article = await generateOptimizedArticle(config);
        break;
      
      default:
        throw new Error(`未知の生成手法: ${method}`);
    }
    
    if (!article) {
      throw new Error('記事生成が失敗しました');
    }
    
    const executionTime = Date.now() - startTime;
    
    // 品質評価
    const qualityMetrics = validateArticleQuality(
      article.content,
      article.title,
      config.category,
      config.trendData
    );
    
    // 総合スコア計算
    const score = calculateCompositeScore(article, qualityMetrics, executionTime);
    
    console.log(`✅ ${method}: スコア ${score.toFixed(2)} (${executionTime}ms)`);
    
    return {
      method,
      article,
      qualityMetrics,
      executionTime,
      success: true,
      score
    };
    
  } catch (error) {
    const executionTime = Date.now() - startTime;
    console.log(`❌ ${method}: 失敗 - ${error.message}`);
    
    return {
      method,
      article: null,
      qualityMetrics: null,
      executionTime,
      success: false,
      errorMessage: error.message,
      score: 0
    };
  }
}

/**
 * 強化生成（Phase 1の強化プロンプト使用）
 */
async function generateEnhancedArticle(config: ABTestConfig): Promise<GeneratedArticle> {
  const trendContext = config.trendData.slice(0, 5).map(trend => 
    `- ${trend.title || trend.content} (${trend.source || ''})`
  ).join('\n');

  const prompt = `以下のトピックについて、${config.category}分野の専門的で実践的な記事を作成してください。

トピック: ${config.topic}
カテゴリ: ${config.category}
目標文字数: ${config.targetWordCount || 3500}文字

最新トレンド情報:
${trendContext}

要件:
- ${config.category}分野の専門知識を活用
- 実践的で具体的な内容
- 最新トレンドとの関連性を明示
- 読者が実際に活用できる情報
- 明確な構造と見出し
- 具体例やコード例（該当する場合）

記事を作成してください:`;

  const result = await generateWithGemini(prompt);
  
  return {
    title: `【${config.category}】${config.topic}`,
    content: result,
    sections: [],
    wordCount: result.length,
    qualityScore: 0,
    trendReflectionScore: 0
  };
}

/**
 * 基本生成（シンプルな1回生成）
 */
async function generateBasicArticle(config: ABTestConfig): Promise<GeneratedArticle> {
  const prompt = `以下のトピックについて、日本語で詳細な記事を書いてください。

トピック: ${config.topic}
カテゴリ: ${config.category}
目標文字数: ${config.targetWordCount || 3000}文字

要件:
- 実践的で具体的な内容
- 明確な見出し構造
- 読みやすい文章
- 有益な情報の提供

記事を書いてください:`;

  const result = await generateWithGemini(prompt);
  
  return {
    title: `${config.topic}の完全ガイド`,
    content: result,
    sections: [],
    wordCount: result.length,
    qualityScore: 0,
    trendReflectionScore: 0
  };
}

/**
 * 最適化生成（カテゴリ特化プロンプト使用）
 */
async function generateOptimizedArticle(config: ABTestConfig): Promise<GeneratedArticle> {
  const categoryPrompts = {
    '生成AI': 'AI技術の実装と活用に焦点を当てた技術的で実践的な',
    'ウェブ開発': 'モダンなWeb技術とベストプラクティスを重視した開発者向けの',
    'ビジネス': 'ビジネス価値と実装可能性を重視した戦略的な',
    'キャリア': 'スキル向上とキャリア発展に直結する実践的な'
  };
  
  const categoryFocus = categoryPrompts[config.category] || '専門的で実用的な';
  
  const prompt = `${categoryFocus}記事を作成してください。

【記事仕様】
トピック: ${config.topic}
カテゴリ: ${config.category}
目標文字数: ${config.targetWordCount || 3000}文字

【トレンド情報】
${config.trendData.slice(0, 3).map(trend => 
  `- ${trend.title || trend.content} (${trend.source || '情報源不明'})`
).join('\n')}

【品質要件】
- ${config.category}領域の専門性を重視
- 具体的な実装例やケーススタディ
- 実際に活用できるアクションアイテム
- SEOを意識した見出し構造
- 読者エンゲージメントを高める構成

記事を作成してください:`;

  const result = await generateWithGemini(prompt);
  
  return {
    title: `【${config.category}】${config.topic}の実践ガイド`,
    content: result,
    sections: [],
    wordCount: result.length,
    qualityScore: 0,
    trendReflectionScore: 0
  };
}

/**
 * 総合スコア計算
 */
function calculateCompositeScore(
  article: GeneratedArticle,
  qualityMetrics: QualityMetrics,
  executionTime: number
): number {
  const targetWordCount = 3000;
  const maxExecutionTime = 300000; // 5分
  
  // 各要素のスコア計算（0-100）
  const qualityScore = qualityMetrics.overall;
  
  const wordCountScore = Math.min(100, 
    100 - Math.abs(article.wordCount - targetWordCount) / targetWordCount * 100
  );
  
  const structureScore = qualityMetrics.structure.score;
  const trendReflectionScore = qualityMetrics.trends.score;
  
  const executionScore = Math.max(0, 
    100 - (executionTime / maxExecutionTime) * 100
  );
  
  const reliabilityScore = 100; // 成功時は100%
  
  // 重み付け合計
  const compositeScore = 
    qualityScore * SCORING_WEIGHTS.qualityScore +
    wordCountScore * SCORING_WEIGHTS.wordCount +
    structureScore * SCORING_WEIGHTS.structureScore +
    trendReflectionScore * SCORING_WEIGHTS.trendReflection +
    executionScore * SCORING_WEIGHTS.executionTime +
    reliabilityScore * SCORING_WEIGHTS.reliability;
  
  return Math.round(compositeScore * 100) / 100;
}

/**
 * 勝者選択ロジック
 */
function selectWinner(results: GenerationTestResult[], config: ABTestConfig): GenerationMethod {
  const successfulResults = results.filter(r => r.success && r.article);
  
  if (successfulResults.length === 0) {
    throw new Error('すべての生成手法が失敗しました');
  }
  
  // 品質閾値をクリアした結果の中から最高スコアを選択
  const qualityThreshold = config.qualityThreshold || 60;
  const qualifiedResults = successfulResults.filter(r => 
    r.qualityMetrics && r.qualityMetrics.overall >= qualityThreshold
  );
  
  const candidateResults = qualifiedResults.length > 0 ? qualifiedResults : successfulResults;
  
  // 最高スコアの手法を勝者に
  const winner = candidateResults.reduce((best, current) => 
    current.score > best.score ? current : best
  );
  
  return winner.method;
}

/**
 * 比較レポート生成
 */
function generateComparisonReport(results: GenerationTestResult[]): string {
  const report = [`🧪 A/Bテスト結果レポート\n${'='.repeat(50)}\n`];
  
  results.forEach(result => {
    const status = result.success ? '✅ 成功' : '❌ 失敗';
    const score = result.success ? `スコア: ${result.score.toFixed(2)}` : '';
    const time = `実行時間: ${result.executionTime}ms`;
    
    report.push(`📊 ${result.method.toUpperCase()}`);
    report.push(`   ${status} ${score} ${time}`);
    
    if (result.success && result.qualityMetrics) {
      report.push(`   品質: ${result.qualityMetrics.overall.toFixed(1)}/100`);
      report.push(`   文字数: ${result.article?.wordCount || 0}`);
    }
    
    if (!result.success) {
      report.push(`   エラー: ${result.errorMessage}`);
    }
    
    report.push('');
  });
  
  return report.join('\n');
}

/**
 * 改善提案生成
 */
function generateRecommendations(results: GenerationTestResult[]): string[] {
  const recommendations: string[] = [];
  const successfulResults = results.filter(r => r.success);
  
  if (successfulResults.length === 0) {
    recommendations.push('すべての手法が失敗しました。API設定やネットワーク接続を確認してください。');
    return recommendations;
  }
  
  // 実行時間分析
  const avgExecutionTime = successfulResults.reduce((sum, r) => sum + r.executionTime, 0) / successfulResults.length;
  if (avgExecutionTime > 120000) {
    recommendations.push('平均実行時間が長いです。並行処理の最適化を検討してください。');
  }
  
  // 品質分析
  const avgQuality = successfulResults.reduce((sum, r) => 
    sum + (r.qualityMetrics?.overall || 0), 0) / successfulResults.length;
  if (avgQuality < 70) {
    recommendations.push('全体的な品質スコアが低いです。プロンプトの改善やトレンドデータの質向上を検討してください。');
  }
  
  // 成功率分析
  const successRate = successfulResults.length / results.length;
  if (successRate < 0.8) {
    recommendations.push('生成成功率が低いです。エラーハンドリングやリトライ機能の強化を検討してください。');
  }
  
  // ベスト手法の推奨
  const bestResult = successfulResults.reduce((best, current) => 
    current.score > best.score ? current : best
  );
  recommendations.push(`今回のテストでは「${bestResult.method}」が最も優秀でした。この手法を主力として使用することを推奨します。`);
  
  return recommendations;
}

/**
 * A/Bテスト結果の詳細フォーマット
 */
export function formatABTestReport(result: ABTestResult): string {
  const lines = [
    `🏆 A/Bテスト完了レポート`,
    `${'='.repeat(60)}`,
    ``,
    `🥇 勝者: ${result.winner.toUpperCase()}`,
    `⏱️  総実行時間: ${result.executionTime}ms`,
    `📊 テスト結果数: ${result.results.length}`,
    ``,
    result.comparisonReport,
    `💡 改善提案:`,
    ...result.recommendations.map(rec => `   • ${rec}`),
    ``,
    `📋 勝者記事情報:`,
    `   タイトル: ${result.bestArticle.title}`,
    `   文字数: ${result.bestArticle.wordCount}`,
    `   品質スコア: ${result.bestArticle.qualityScore}/100`,
    ``
  ];
  
  return lines.join('\n');
}