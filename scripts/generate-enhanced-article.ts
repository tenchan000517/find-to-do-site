#!/usr/bin/env npx tsx
// scripts/generate-enhanced-article.ts
// Phase 2: 強化記事生成統合スクリプト
// ハイブリッド生成システム + 品質検証を使った自動記事生成

import * as dotenv from 'dotenv';
import path from 'path';

// 環境変数を読み込み
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
console.log('環境変数読み込み完了。GEMINI_API_KEY存在:', !!process.env.GEMINI_API_KEY);

import { getDayOfWeekCategory, getTrendingTopicsEnhanced } from '../src/lib/blog';
import { generateHybridArticle, HybridGenerationConfig } from '../src/lib/hybrid-generator';
import { generateEnhancedArticle } from '../src/lib/article';
import { validateArticleQuality, formatQualityReport } from '../src/lib/quality-validator';
import { saveArticle } from '../src/lib/article';

// 設定
const USE_HYBRID_GENERATION = true; // ハイブリッド生成の使用可否
const MIN_QUALITY_SCORE = 60; // 最低品質スコア
const MAX_GENERATION_ATTEMPTS = 2; // 最大生成試行回数

interface GenerationResult {
  success: boolean;
  title: string;
  content: string;
  filePath?: string;
  qualityScore: number;
  metrics: any;
  generationMethod: 'hybrid' | 'enhanced' | 'fallback';
  attempts: number;
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  console.log('🚀 強化記事生成システム開始');
  console.log(`📅 実行日時: ${new Date().toLocaleString('ja-JP')}`);
  console.log('='.repeat(60));
  
  try {
    // Step 1: 今日のカテゴリとトレンドデータ取得
    console.log('\n📋 Step 1: データ取得');
    const category = getDayOfWeekCategory();
    console.log(`📂 選択カテゴリ: ${category}`);
    
    const { topics, trendData, selectedCategory } = await getTrendingTopicsEnhanced(category);
    console.log(`📊 取得トピック数: ${topics.length}件`);
    console.log(`📈 トレンドデータ: ${trendData.length}件`);
    
    if (topics.length === 0) {
      throw new Error('記事トピックが取得できませんでした');
    }
    
    // Step 2: トピック選択（最初の高品質トピック）
    const selectedTopic = topics[0];
    console.log(`🎯 選択トピック: ${selectedTopic}`);
    
    // Step 3: 記事生成（複数手法の試行）
    console.log('\n✍️ Step 2: 記事生成');
    const result = await generateArticleWithFallback({
      topic: selectedTopic,
      category: selectedCategory,
      trendData: trendData.slice(0, 15) // 最大15件のトレンドデータ
    });
    
    if (!result.success) {
      throw new Error('記事生成に失敗しました');
    }
    
    // Step 4: ファイル保存
    console.log('\n💾 Step 3: ファイル保存');
    const { filePath, actualSlug } = await saveArticle(
      result.title, 
      result.content, 
      selectedCategory, 
      selectedTopic
    );
    
    // Step 5: 最終レポート
    console.log('\n📊 Step 4: 最終レポート');
    generateFinalReport({
      ...result,
      filePath,
      slug: actualSlug,
      category: selectedCategory,
      trendDataCount: trendData.length
    });
    
    console.log('\n🎉 強化記事生成完了！');
    
  } catch (error) {
    console.error('\n❌ 強化記事生成エラー:', error);
    process.exit(1);
  }
}

/**
 * フォールバック付き記事生成
 */
async function generateArticleWithFallback(config: HybridGenerationConfig): Promise<GenerationResult> {
  const methods: Array<{
    name: 'hybrid' | 'enhanced' | 'fallback';
    generator: () => Promise<{ title: string; content: string }>;
  }> = [];
  
  // Method 1: ハイブリッド生成（有効な場合）
  if (USE_HYBRID_GENERATION) {
    methods.push({
      name: 'hybrid',
      generator: () => generateHybridArticle(config).then(result => ({
        title: result.title,
        content: result.content
      }))
    });
  }
  
  // Method 2: 強化生成
  methods.push({
    name: 'enhanced',
    generator: () => generateEnhancedArticle(config.topic, config.category, config.trendData)
  });
  
  // Method 3: 基本生成（フォールバック）
  methods.push({
    name: 'fallback',
    generator: async () => {
      const { generateArticle } = await import('../src/lib/article');
      return generateArticle(config.topic, config.category);
    }
  });
  
  let lastError = null;
  let attempts = 0;
  
  for (const method of methods) {
    if (attempts >= MAX_GENERATION_ATTEMPTS) {
      console.log(`⚠️ 最大試行回数(${MAX_GENERATION_ATTEMPTS})に達しました`);
      break;
    }
    
    try {
      attempts++;
      console.log(`🔄 記事生成試行 ${attempts}: ${method.name}モード`);
      
      const startTime = Date.now();
      const { title, content } = await method.generator();
      const endTime = Date.now();
      
      console.log(`⏱️ 生成時間: ${(endTime - startTime) / 1000}秒`);
      console.log(`📝 生成文字数: ${content.length}文字`);
      
      // 品質検証
      console.log('📊 品質検証実行中...');
      const qualityReport = validateArticleQuality(content, title, config.category, config.trendData);
      
      console.log(`⭐ 品質スコア: ${qualityReport.metrics.overall}/100 (${qualityReport.grade})`);
      console.log(`✅ 最低要件: ${qualityReport.passesMinimumRequirements ? 'クリア' : '未達成'}`);
      
      // 品質基準チェック
      if (qualityReport.metrics.overall >= MIN_QUALITY_SCORE && qualityReport.passesMinimumRequirements) {
        console.log(`✅ ${method.name}モードで高品質記事生成成功`);
        console.log(formatQualityReport(qualityReport));
        
        return {
          success: true,
          title,
          content,
          qualityScore: qualityReport.metrics.overall,
          metrics: qualityReport.metrics,
          generationMethod: method.name,
          attempts
        };
      } else {
        console.log(`⚠️ 品質基準未達成 (${qualityReport.metrics.overall}/100 < ${MIN_QUALITY_SCORE})`);
        if (qualityReport.recommendations.length > 0) {
          console.log('💡 改善提案:');
          qualityReport.recommendations.forEach((rec, i) => {
            console.log(`  ${i + 1}. ${rec}`);
          });
        }
        
        // 最後の手法で基準未達成でも保存する場合
        if (method.name === 'fallback') {
          console.log('⚠️ フォールバック記事を使用します');
          return {
            success: true,
            title,
            content,
            qualityScore: qualityReport.metrics.overall,
            metrics: qualityReport.metrics,
            generationMethod: method.name,
            attempts
          };
        }
      }
      
    } catch (error: any) {
      lastError = error;
      console.error(`❌ ${method.name}モード失敗:`, error.message);
      
      // 次の手法を試す前に短時間待機
      if (attempts < methods.length) {
        console.log('⏳ 2秒後に次の手法を試行...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  // 全手法失敗
  return {
    success: false,
    title: '',
    content: '',
    qualityScore: 0,
    metrics: null,
    generationMethod: 'fallback',
    attempts
  };
}

/**
 * 最終レポート生成
 */
function generateFinalReport(data: {
  success: boolean;
  title: string;
  qualityScore: number;
  metrics: any;
  generationMethod: 'hybrid' | 'enhanced' | 'fallback';
  attempts: number;
  filePath?: string;
  slug?: string;
  category: string;
  trendDataCount: number;
}): void {
  console.log('\n' + '='.repeat(60));
  console.log('📈 強化記事生成 最終レポート');
  console.log('='.repeat(60));
  
  console.log(`\n📋 基本情報:`);
  console.log(`  タイトル: ${data.title}`);
  console.log(`  カテゴリ: ${data.category}`);
  console.log(`  スラッグ: ${data.slug || 'N/A'}`);
  console.log(`  ファイル: ${data.filePath || 'N/A'}`);
  
  console.log(`\n🔧 生成情報:`);
  console.log(`  生成手法: ${data.generationMethod}`);
  console.log(`  試行回数: ${data.attempts}`);
  console.log(`  使用トレンド: ${data.trendDataCount}件`);
  
  console.log(`\n⭐ 品質情報:`);
  console.log(`  総合スコア: ${data.qualityScore}/100`);
  
  if (data.metrics) {
    console.log(`  構造: ${data.metrics.structure.score}/100`);
    console.log(`  コンテンツ: ${data.metrics.content.score}/100`);
    console.log(`  トレンド反映: ${data.metrics.trends.score}/100`);
    console.log(`  読みやすさ: ${data.metrics.readability.score}/100`);
    console.log(`  SEO: ${data.metrics.seo.score}/100`);
    
    console.log(`\n📊 詳細メトリクス:`);
    console.log(`  文字数: ${data.metrics.content.wordCount}文字`);
    console.log(`  セクション数: ${data.metrics.structure.sectionCount}個`);
    console.log(`  トレンド参照数: ${data.metrics.trends.trendsReferenced}件`);
    console.log(`  ソース多様性: ${data.metrics.trends.sourceVariety}種類`);
  }
  
  const methodEmoji = {
    'hybrid': '🔄',
    'enhanced': '⚡',
    'fallback': '🛡️'
  };
  
  console.log(`\n🎯 結果: ${data.success ? '✅ 成功' : '❌ 失敗'} ${methodEmoji[data.generationMethod]} ${data.generationMethod}モード使用`);
  
  if (data.qualityScore >= 85) {
    console.log('🏆 優秀な品質の記事が生成されました！');
  } else if (data.qualityScore >= 70) {
    console.log('✅ 良好な品質の記事が生成されました。');
  } else if (data.qualityScore >= 55) {
    console.log('⚠️ 基準を満たした記事が生成されました。改善の余地があります。');
  } else {
    console.log('❌ 品質基準を下回る記事です。手動での確認・修正が必要です。');
  }
  
  console.log('\n' + '='.repeat(60));
}

/**
 * Phase 2実装成功指標の測定
 */
function measurePhase2Success(data: any): void {
  console.log('\n📈 Phase 2成功指標');
  console.log('-'.repeat(40));
  
  const targets = {
    qualityScore: 75,
    wordCount: 4000,
    trendReflection: 85,
    structureScore: 80
  };
  
  const actual = {
    qualityScore: data.qualityScore,
    wordCount: data.metrics?.content?.wordCount || 0,
    trendReflection: data.metrics?.trends?.trendReflectionRate || 0,
    structureScore: data.metrics?.structure?.score || 0
  };
  
  Object.entries(targets).forEach(([key, target]) => {
    const value = actual[key as keyof typeof actual];
    const status = value >= target ? '✅' : '❌';
    console.log(`  ${key}: ${value} / ${target} ${status}`);
  });
  
  const successCount = Object.entries(targets).filter(([key, target]) => 
    actual[key as keyof typeof actual] >= target
  ).length;
  
  console.log(`\n🎯 達成率: ${successCount}/${Object.keys(targets).length} (${Math.round(successCount / Object.keys(targets).length * 100)}%)`);
}

// コマンドライン引数の処理
const args = process.argv.slice(2);
const isDebugMode = args.includes('--debug');
const forceHybrid = args.includes('--hybrid');
const forceEnhanced = args.includes('--enhanced');

if (isDebugMode) {
  console.log('🐛 デバッグモード有効');
}

if (forceHybrid) {
  console.log('🔄 ハイブリッド生成強制使用');
  // USE_HYBRID_GENERATION = true; // 必要に応じて有効化
}

if (forceEnhanced) {
  console.log('⚡ 強化生成のみ使用');
  // USE_HYBRID_GENERATION = false; // 必要に応じて無効化
}

// スクリプト実行
if (require.main === module) {
  main().catch(error => {
    console.error('致命的エラー:', error);
    process.exit(1);
  });
}