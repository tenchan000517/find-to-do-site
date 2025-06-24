// src/lib/quality-validator.ts
// Phase 2: 品質検証システム
// 多次元品質評価（文字数、構造、トレンド反映度）

export interface QualityMetrics {
  overall: number;
  structure: StructureMetrics;
  content: ContentMetrics;
  trends: TrendMetrics;
  readability: ReadabilityMetrics;
  seo: SEOMetrics;
}

export interface StructureMetrics {
  score: number;
  hasTitle: boolean;
  hasIntroduction: boolean;
  hasConclusion: boolean;
  sectionCount: number;
  hierarchyScore: number;
  tocCompatible: boolean;
}

export interface ContentMetrics {
  score: number;
  wordCount: number;
  wordCountScore: number;
  hasCodeExamples: boolean;
  hasActionableAdvice: boolean;
  hasSpecificExamples: boolean;
  informationDensity: number;
}

export interface TrendMetrics {
  score: number;
  trendsReferenced: number;
  trendReflectionRate: number;
  sourceVariety: number;
  recentnessScore: number;
}

export interface ReadabilityMetrics {
  score: number;
  averageSentenceLength: number;
  paragraphCount: number;
  listUsage: number;
  visualElementsScore: number;
}

export interface SEOMetrics {
  score: number;
  titleOptimization: number;
  headingStructure: number;
  keywordDensity: number;
  internalLinkPotential: number;
}

export interface QualityThresholds {
  excellent: number;
  good: number;
  acceptable: number;
  needsImprovement: number;
}

export interface QualityReport {
  metrics: QualityMetrics;
  grade: 'excellent' | 'good' | 'acceptable' | 'poor';
  recommendations: string[];
  passesMinimumRequirements: boolean;
  estimatedReadingTime: number;
}

// 品質評価の閾値
const QUALITY_THRESHOLDS: QualityThresholds = {
  excellent: 85,
  good: 70,
  acceptable: 55,
  needsImprovement: 40
};

// 文字数評価の基準
const WORD_COUNT_TARGETS = {
  minimum: 2000,
  good: 3000,
  excellent: 4000,
  maximum: 6000
};

/**
 * 記事品質の包括的評価
 */
export function validateArticleQuality(
  content: string, 
  title: string, 
  category: string,
  trendData: any[] = []
): QualityReport {
  console.log('📊 記事品質検証開始');
  console.log(`📝 タイトル: ${title}`);
  console.log(`📂 カテゴリ: ${category}`);
  console.log(`📊 トレンドデータ: ${trendData.length}件`);
  
  // 各次元の評価実行
  const structure = evaluateStructure(content, title);
  const contentMetrics = evaluateContent(content, category);
  const trends = evaluateTrendReflection(content, trendData);
  const readability = evaluateReadability(content);
  const seo = evaluateSEO(content, title, category);
  
  // 総合スコア計算（重み付き平均）
  const overall = calculateOverallScore({
    structure: structure.score,
    content: contentMetrics.score,
    trends: trends.score,
    readability: readability.score,
    seo: seo.score
  });
  
  const metrics: QualityMetrics = {
    overall,
    structure,
    content: contentMetrics,
    trends,
    readability,
    seo
  };
  
  // グレード判定
  const grade = determineGrade(overall);
  
  // 改善提案生成
  const recommendations = generateRecommendations(metrics);
  
  // 最低要件チェック
  const passesMinimumRequirements = checkMinimumRequirements(metrics);
  
  // 読了時間推定（日本語：600文字/分）
  const estimatedReadingTime = Math.ceil(contentMetrics.wordCount / 600);
  
  const report: QualityReport = {
    metrics,
    grade,
    recommendations,
    passesMinimumRequirements,
    estimatedReadingTime
  };
  
  console.log(`✅ 品質検証完了 - 総合スコア: ${overall}/100 (${grade})`);
  
  return report;
}

/**
 * 構造品質の評価
 */
function evaluateStructure(content: string, title: string): StructureMetrics {
  let score = 0;
  
  // タイトル存在チェック
  const hasTitle = content.includes(`# ${title}`) || content.startsWith(`# `);
  if (hasTitle) score += 15;
  
  // 導入部存在チェック（最初のセクション前の内容）
  const firstSectionIndex = content.indexOf('\n## ');
  const introductionText = firstSectionIndex > 0 ? content.substring(0, firstSectionIndex) : '';
  const hasIntroduction = introductionText.replace(/^# .+\n/, '').trim().length > 100;
  if (hasIntroduction) score += 15;
  
  // 結論部存在チェック（「まとめ」「結論」セクション）
  const hasConclusion = /## (まとめ|結論|おわりに|Conclusion)/i.test(content);
  if (hasConclusion) score += 15;
  
  // セクション数カウント
  const sections = content.match(/^## [^\n]+/gm) || [];
  const sectionCount = sections.length;
  let sectionScore = 0;
  if (sectionCount >= 5) sectionScore = 20;
  else if (sectionCount >= 3) sectionScore = 15;
  else if (sectionCount >= 2) sectionScore = 10;
  else if (sectionCount >= 1) sectionScore = 5;
  score += sectionScore;
  
  // 階層構造評価（h2, h3の適切な使用）
  const h2Count = (content.match(/^## /gm) || []).length;
  const h3Count = (content.match(/^### /gm) || []).length;
  const h4Count = (content.match(/^#### /gm) || []).length;
  
  let hierarchyScore = 0;
  if (h2Count >= 2) hierarchyScore += 10; // 基本構造
  if (h3Count > 0) hierarchyScore += 10; // 詳細構造
  if (h4Count === 0) hierarchyScore += 5; // 深すぎない階層
  score += hierarchyScore;
  
  // 目次互換性（remarkToc対応）
  const tocCompatible = h2Count >= 2 && h3Count <= h2Count * 3; // 適度な階層バランス
  if (tocCompatible) score += 10;
  
  return {
    score: Math.min(score, 100),
    hasTitle,
    hasIntroduction,
    hasConclusion,
    sectionCount,
    hierarchyScore,
    tocCompatible
  };
}

/**
 * コンテンツ品質の評価
 */
function evaluateContent(content: string, category: string): ContentMetrics {
  let score = 0;
  
  // 文字数評価
  const wordCount = content.length;
  let wordCountScore = 0;
  if (wordCount >= WORD_COUNT_TARGETS.excellent) wordCountScore = 25;
  else if (wordCount >= WORD_COUNT_TARGETS.good) wordCountScore = 20;
  else if (wordCount >= WORD_COUNT_TARGETS.minimum) wordCountScore = 15;
  else if (wordCount >= 1000) wordCountScore = 10;
  else wordCountScore = 5;
  score += wordCountScore;
  
  // コード例の有無（技術カテゴリで重要）
  const hasCodeExamples = content.includes('```') || content.includes('`');
  if (hasCodeExamples && ['プログラミング', 'ウェブ開発', 'AI技術', 'データサイエンス・AI開発'].includes(category)) {
    score += 15;
  } else if (hasCodeExamples) {
    score += 10;
  }
  
  // 実践的アドバイスの有無
  const actionableKeywords = ['方法', '手順', 'ステップ', '実装', '活用', '実践', 'やり方', 'コツ', 'ポイント'];
  const hasActionableAdvice = actionableKeywords.some(keyword => content.includes(keyword));
  if (hasActionableAdvice) score += 15;
  
  // 具体例の有無
  const exampleKeywords = ['例えば', '具体的に', 'サンプル', '実例', 'ケース', '事例'];
  const hasSpecificExamples = exampleKeywords.some(keyword => content.includes(keyword));
  if (hasSpecificExamples) score += 10;
  
  // 情報密度（文章中の専門用語・キーワード密度）
  const categoryKeywords = getCategoryKeywords(category);
  const keywordMatches = categoryKeywords.filter(keyword => content.includes(keyword)).length;
  const informationDensity = Math.min((keywordMatches / categoryKeywords.length) * 100, 25);
  score += informationDensity;
  
  return {
    score: Math.min(score, 100),
    wordCount,
    wordCountScore,
    hasCodeExamples,
    hasActionableAdvice,
    hasSpecificExamples,
    informationDensity
  };
}

/**
 * トレンド反映度の評価
 */
function evaluateTrendReflection(content: string, trendData: any[]): TrendMetrics {
  let score = 0;
  
  if (trendData.length === 0) {
    return {
      score: 0,
      trendsReferenced: 0,
      trendReflectionRate: 0,
      sourceVariety: 0,
      recentnessScore: 0
    };
  }
  
  // 参照されたトレンド数カウント
  const referencedTrends = trendData.filter(trend => {
    const title = trend.title || '';
    const source = trend.source || '';
    if (title.length < 5) return false;
    
    // タイトルの一部または全体が含まれているかチェック
    const titleWords = title.split(/[\s\-\[\]【】（）()]+/).filter((word: string) => word.length > 2);
    return titleWords.some((word: string) => content.includes(word)) || content.includes(source);
  });
  
  const trendsReferenced = referencedTrends.length;
  const trendReflectionRate = (trendsReferenced / Math.min(trendData.length, 10)) * 100;
  
  // トレンド参照度に基づくスコア
  if (trendReflectionRate >= 50) score += 30;
  else if (trendReflectionRate >= 30) score += 25;
  else if (trendReflectionRate >= 15) score += 20;
  else if (trendReflectionRate >= 5) score += 15;
  
  // ソース多様性評価
  const sources = new Set(referencedTrends.map(t => t.source));
  const sourceVariety = sources.size;
  if (sourceVariety >= 3) score += 20;
  else if (sourceVariety >= 2) score += 15;
  else if (sourceVariety >= 1) score += 10;
  
  // 最新性評価（公開日ベース）
  const recentTrends = trendData.filter(trend => {
    if (!trend.publishedAt) return false;
    const publishDate = new Date(trend.publishedAt);
    const now = new Date();
    const daysDiff = (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 7; // 1週間以内
  });
  
  const recentnessScore = Math.min((recentTrends.length / trendData.length) * 50, 50);
  score += recentnessScore;
  
  return {
    score: Math.min(score, 100),
    trendsReferenced,
    trendReflectionRate,
    sourceVariety,
    recentnessScore
  };
}

/**
 * 読みやすさの評価
 */
function evaluateReadability(content: string): ReadabilityMetrics {
  let score = 0;
  
  // 文の長さ評価
  const sentences = content.split(/[。！？]/).filter(s => s.trim().length > 0);
  const totalLength = sentences.reduce((sum, s) => sum + s.length, 0);
  const averageSentenceLength = sentences.length > 0 ? totalLength / sentences.length : 0;
  
  if (averageSentenceLength <= 50) score += 20;
  else if (averageSentenceLength <= 80) score += 15;
  else if (averageSentenceLength <= 120) score += 10;
  else score += 5;
  
  // 段落数評価
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
  const paragraphCount = paragraphs.length;
  
  if (paragraphCount >= 10) score += 20;
  else if (paragraphCount >= 6) score += 15;
  else if (paragraphCount >= 4) score += 10;
  else score += 5;
  
  // リスト使用評価
  const listItems = (content.match(/^[\s]*[-*+]\s/gm) || []).length;
  const numberedLists = (content.match(/^[\s]*\d+\.\s/gm) || []).length;
  const listUsage = listItems + numberedLists;
  
  if (listUsage >= 10) score += 20;
  else if (listUsage >= 5) score += 15;
  else if (listUsage >= 2) score += 10;
  
  // 視覚的要素スコア（コードブロック、表、引用等）
  const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;
  const tables = (content.match(/\|.*\|/g) || []).length;
  const quotes = (content.match(/^>/gm) || []).length;
  const visualElementsScore = Math.min((codeBlocks * 5 + tables * 8 + quotes * 3), 40);
  score += visualElementsScore;
  
  return {
    score: Math.min(score, 100),
    averageSentenceLength,
    paragraphCount,
    listUsage,
    visualElementsScore
  };
}

/**
 * SEO品質の評価
 */
function evaluateSEO(content: string, title: string, category: string): SEOMetrics {
  let score = 0;
  
  // タイトル最適化
  let titleOptimization = 0;
  if (title.length >= 20 && title.length <= 60) titleOptimization += 15;
  if (title.includes(category) || getCategoryKeywords(category).some(k => title.includes(k))) titleOptimization += 10;
  score += titleOptimization;
  
  // 見出し構造
  const h2Count = (content.match(/^## /gm) || []).length;
  const h3Count = (content.match(/^### /gm) || []).length;
  let headingStructure = 0;
  if (h2Count >= 3) headingStructure += 15;
  if (h3Count > 0 && h3Count <= h2Count * 2) headingStructure += 10;
  score += headingStructure;
  
  // キーワード密度
  const categoryKeywords = getCategoryKeywords(category);
  const keywordCount = categoryKeywords.reduce((count, keyword) => {
    return count + (content.match(new RegExp(keyword, 'gi')) || []).length;
  }, 0);
  const keywordDensity = Math.min((keywordCount / (content.length / 100)) * 10, 25);
  score += keywordDensity;
  
  // 内部リンク可能性（関連記事への言及）
  const internalLinkKeywords = ['詳しく', '詳細', '参考', '関連', '前回', '以前', 'については'];
  const internalLinkPotential = Math.min(internalLinkKeywords.filter(k => content.includes(k)).length * 5, 25);
  score += internalLinkPotential;
  
  return {
    score: Math.min(score, 100),
    titleOptimization,
    headingStructure,
    keywordDensity,
    internalLinkPotential
  };
}

/**
 * カテゴリ別キーワード取得
 */
function getCategoryKeywords(category: string): string[] {
  const keywords: Record<string, string[]> = {
    'プログラミング': ['プログラミング', 'コード', '開発', 'アルゴリズム', 'データ構造', 'デバッグ', 'リファクタリング'],
    'ウェブ開発': ['ウェブ', 'HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'フロントエンド', 'バックエンド'],
    'AI技術': ['AI', '人工知能', '機械学習', 'ディープラーニング', 'ニューラルネットワーク', 'モデル', 'アルゴリズム'],
    'データサイエンス・AI開発': ['データサイエンス', 'データ分析', 'Python', 'pandas', '統計', '可視化', '予測'],
    'キャリア': ['キャリア', '転職', 'スキル', '年収', '面接', '履歴書', '成長'],
    'ビジネス': ['ビジネス', '戦略', 'マーケティング', '売上', '成長', 'ROI', 'KPI'],
    '勉強・自己啓発': ['学習', '勉強', 'スキルアップ', '成長', '習慣', '効率', '継続']
  };
  
  return keywords[category] || keywords['プログラミング'];
}

/**
 * 総合スコア計算（重み付き平均）
 */
function calculateOverallScore(scores: {
  structure: number;
  content: number;
  trends: number;
  readability: number;
  seo: number;
}): number {
  // 重み設定
  const weights = {
    structure: 0.25,  // 構造: 25%
    content: 0.30,    // コンテンツ: 30%
    trends: 0.20,     // トレンド反映: 20%
    readability: 0.15, // 読みやすさ: 15%
    seo: 0.10         // SEO: 10%
  };
  
  const weighted = 
    scores.structure * weights.structure +
    scores.content * weights.content +
    scores.trends * weights.trends +
    scores.readability * weights.readability +
    scores.seo * weights.seo;
  
  return Math.round(weighted);
}

/**
 * グレード判定
 */
function determineGrade(score: number): 'excellent' | 'good' | 'acceptable' | 'poor' {
  if (score >= QUALITY_THRESHOLDS.excellent) return 'excellent';
  if (score >= QUALITY_THRESHOLDS.good) return 'good';
  if (score >= QUALITY_THRESHOLDS.acceptable) return 'acceptable';
  return 'poor';
}

/**
 * 改善提案生成
 */
function generateRecommendations(metrics: QualityMetrics): string[] {
  const recommendations: string[] = [];
  
  // 構造改善提案
  if (metrics.structure.score < 70) {
    if (!metrics.structure.hasIntroduction) {
      recommendations.push('導入部を追加して、記事の概要と読者への価値を明確に示してください');
    }
    if (!metrics.structure.hasConclusion) {
      recommendations.push('まとめセクションを追加して、重要なポイントを要約してください');
    }
    if (metrics.structure.sectionCount < 3) {
      recommendations.push('記事をより多くのセクションに分割して、読みやすい構造にしてください');
    }
  }
  
  // コンテンツ改善提案
  if (metrics.content.score < 70) {
    if (metrics.content.wordCount < WORD_COUNT_TARGETS.minimum) {
      recommendations.push(`文字数を${WORD_COUNT_TARGETS.minimum}文字以上に増やしてください（現在: ${metrics.content.wordCount}文字）`);
    }
    if (!metrics.content.hasCodeExamples) {
      recommendations.push('具体的なコード例やサンプルを追加してください');
    }
    if (!metrics.content.hasActionableAdvice) {
      recommendations.push('読者が実際に活用できる実践的なアドバイスを含めてください');
    }
  }
  
  // トレンド改善提案
  if (metrics.trends.score < 50) {
    if (metrics.trends.trendsReferenced === 0) {
      recommendations.push('最新のトレンド情報を記事に組み込んでください');
    }
    if (metrics.trends.sourceVariety < 2) {
      recommendations.push('複数の信頼できる情報源からの情報を活用してください');
    }
  }
  
  // 読みやすさ改善提案
  if (metrics.readability.score < 70) {
    if (metrics.readability.averageSentenceLength > 80) {
      recommendations.push('文をより短く、読みやすくしてください');
    }
    if (metrics.readability.listUsage < 3) {
      recommendations.push('箇条書きや番号付きリストを活用して、情報を整理してください');
    }
  }
  
  // SEO改善提案
  if (metrics.seo.score < 60) {
    recommendations.push('関連キーワードをより効果的に使用してください');
    recommendations.push('見出し構造を改善してSEOフレンドリーにしてください');
  }
  
  return recommendations;
}

/**
 * 最低要件チェック
 */
function checkMinimumRequirements(metrics: QualityMetrics): boolean {
  return (
    metrics.content.wordCount >= 1000 &&
    metrics.structure.hasTitle &&
    metrics.structure.sectionCount >= 2 &&
    metrics.overall >= 40
  );
}

/**
 * 品質レポートの表示用フォーマット
 */
export function formatQualityReport(report: QualityReport): string {
  const gradeEmoji = {
    'excellent': '🏆',
    'good': '✅',
    'acceptable': '⚠️',
    'poor': '❌'
  };
  
  let output = `\n📊 記事品質レポート ${gradeEmoji[report.grade]}\n`;
  output += `${'='.repeat(50)}\n\n`;
  
  output += `🎯 総合評価: ${report.metrics.overall}/100 (${report.grade})\n`;
  output += `⏱️ 推定読了時間: ${report.estimatedReadingTime}分\n`;
  output += `✅ 最低要件: ${report.passesMinimumRequirements ? 'クリア' : '未達成'}\n\n`;
  
  output += `📋 詳細スコア:\n`;
  output += `  構造: ${report.metrics.structure.score}/100\n`;
  output += `  コンテンツ: ${report.metrics.content.score}/100\n`;
  output += `  トレンド反映: ${report.metrics.trends.score}/100\n`;
  output += `  読みやすさ: ${report.metrics.readability.score}/100\n`;
  output += `  SEO: ${report.metrics.seo.score}/100\n\n`;
  
  if (report.recommendations.length > 0) {
    output += `💡 改善提案:\n`;
    report.recommendations.forEach((rec, i) => {
      output += `  ${i + 1}. ${rec}\n`;
    });
  }
  
  return output;
}