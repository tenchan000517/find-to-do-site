// src/lib/hybrid-generator.ts
// Phase 2: ハイブリッド生成システム
// アウトライン生成 → セクション別生成 → 統合

import { generateWithGemini } from './gemini';
import { createEnhancedArticlePrompt } from './prompt';

// 設定
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
const SECTION_TOKEN_LIMIT = 1500; // セクション別生成時のトークン制限

export interface HybridGenerationConfig {
  topic: string;
  category: string;
  trendData: any[];
  targetWordCount?: number;
  sectionCount?: number;
}

export interface ArticleOutline {
  title: string;
  introduction: string;
  sections: OutlineSection[];
  conclusion: string;
  totalEstimatedWords: number;
}

export interface OutlineSection {
  id: string;
  title: string;
  description: string;
  estimatedWords: number;
  keyPoints: string[];
  relatedTrends: any[];
}

export interface GeneratedArticle {
  title: string;
  content: string;
  sections: GeneratedSection[];
  wordCount: number;
  qualityScore: number;
  trendReflectionScore: number;
}

export interface GeneratedSection {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  qualityIndicators: {
    hasCodeExamples: boolean;
    hasActionableAdvice: boolean;
    citesTrends: boolean;
    structureScore: number;
  };
}

/**
 * ハイブリッド記事生成のメイン関数
 */
export async function generateHybridArticle(config: HybridGenerationConfig): Promise<GeneratedArticle> {
  console.log('🚀 ハイブリッド記事生成開始');
  console.log(`📝 トピック: ${config.topic}`);
  console.log(`📂 カテゴリ: ${config.category}`);
  console.log(`📊 トレンドデータ: ${config.trendData.length}件`);
  
  try {
    // Step 1: アウトライン生成
    console.log('\n📋 Step 1: アウトライン生成');
    const outline = await generateArticleOutline(config);
    
    // Step 2: セクション別生成
    console.log('\n✍️ Step 2: セクション別生成');
    const sections = await generateSectionsByOutline(outline, config);
    
    // Step 3: 統合と最終調整
    console.log('\n🔗 Step 3: 統合と最終調整');
    const finalArticle = await integrateAndFinalize(outline, sections, config);
    
    console.log('✅ ハイブリッド記事生成完了');
    console.log(`📊 最終文字数: ${finalArticle.wordCount}文字`);
    console.log(`⭐ 品質スコア: ${finalArticle.qualityScore}/100`);
    
    return finalArticle;
    
  } catch (error) {
    console.error('❌ ハイブリッド生成エラー:', error);
    throw error;
  }
}

/**
 * Step 1: 詳細なアウトラインを生成
 */
async function generateArticleOutline(config: HybridGenerationConfig): Promise<ArticleOutline> {
  const targetWords = config.targetWordCount || 4000;
  const sectionCount = config.sectionCount || 5;
  
  // トレンドデータのサマリー作成
  const trendSummary = config.trendData.slice(0, 10).map(trend => ({
    title: trend.title || '不明',
    source: trend.source || '不明',
    description: trend.description || 'トレンド記事'
  }));
  
  const outlinePrompt = `
あなたは経験豊富な技術ライターです。以下の情報を基に、高品質なブログ記事の詳細なアウトラインを作成してください。

## 記事情報
- **トピック**: ${config.topic}
- **カテゴリ**: ${config.category}
- **目標文字数**: ${targetWords}文字
- **セクション数**: ${sectionCount}個

## トレンド情報
${trendSummary.map((trend, i) => `
${i + 1}. **${trend.title}**
   ソース: ${trend.source}
   概要: ${trend.description}
`).join('')}

## 求めるアウトライン形式

必ず以下のJSON形式で回答してください：

\`\`\`json
{
  "title": "記事のメインタイトル",
  "introduction": "導入部の概要（200-300文字）",
  "sections": [
    {
      "id": "section1",
      "title": "セクション1のタイトル",
      "description": "このセクションで扱う内容の詳細説明",
      "estimatedWords": 800,
      "keyPoints": [
        "重要ポイント1",
        "重要ポイント2",
        "重要ポイント3"
      ],
      "relatedTrends": [0, 2, 5]
    }
  ],
  "conclusion": "まとめ部の概要（200-300文字）",
  "totalEstimatedWords": ${targetWords}
}
\`\`\`

## 要件
1. 各セクションは実践的で具体的な内容にする
2. トレンド情報を効果的に活用する（relatedTrendsで番号指定）
3. 読者にとって有用で実行可能なアドバイスを含む
4. SEOを意識したタイトル・見出し構成
5. 論理的な流れで構成する
`;

  let lastError = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`📋 アウトライン生成試行 ${attempt}/${MAX_RETRIES}`);
      
      const apiKey = process.env.GEMINI_API_KEY;
      const response = await generateWithGemini(outlinePrompt, { maxOutputTokens: 2000 }, apiKey);
      
      // JSON部分を抽出
      const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
      if (!jsonMatch) {
        throw new Error('JSON形式のアウトラインが見つかりません');
      }
      
      const outlineData = JSON.parse(jsonMatch[1]);
      
      // データ検証
      if (!outlineData.title || !outlineData.sections || !Array.isArray(outlineData.sections)) {
        throw new Error('無効なアウトライン形式');
      }
      
      // セクションIDの生成とデータ補完
      const processedSections: OutlineSection[] = outlineData.sections.map((section: any, index: number) => ({
        id: section.id || `section${index + 1}`,
        title: section.title || `セクション${index + 1}`,
        description: section.description || '',
        estimatedWords: section.estimatedWords || Math.floor(targetWords / sectionCount),
        keyPoints: section.keyPoints || [],
        relatedTrends: (section.relatedTrends || []).map((i: number) => config.trendData[i]).filter(Boolean)
      }));
      
      const outline: ArticleOutline = {
        title: outlineData.title,
        introduction: outlineData.introduction || '',
        sections: processedSections,
        conclusion: outlineData.conclusion || '',
        totalEstimatedWords: outlineData.totalEstimatedWords || targetWords
      };
      
      console.log(`✅ アウトライン生成成功 (セクション数: ${outline.sections.length})`);
      console.log(`📊 推定総文字数: ${outline.totalEstimatedWords}文字`);
      
      return outline;
      
    } catch (error: any) {
      lastError = error;
      console.error(`❌ アウトライン生成失敗 (試行 ${attempt}):`, error.message);
      
      if (attempt < MAX_RETRIES) {
        console.log(`⏳ ${RETRY_DELAY/1000}秒後に再試行...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  throw new Error(`アウトライン生成に失敗しました: ${lastError?.message}`);
}

/**
 * Step 2: アウトラインに基づいてセクション別に生成
 */
async function generateSectionsByOutline(
  outline: ArticleOutline, 
  config: HybridGenerationConfig
): Promise<GeneratedSection[]> {
  const sections: GeneratedSection[] = [];
  
  for (let i = 0; i < outline.sections.length; i++) {
    const sectionOutline = outline.sections[i];
    console.log(`✍️ セクション${i + 1}/${outline.sections.length}: "${sectionOutline.title}"`);
    
    try {
      const generatedSection = await generateSingleSection(sectionOutline, outline, config, i + 1);
      sections.push(generatedSection);
      
      console.log(`✅ セクション${i + 1}完了 (${generatedSection.wordCount}文字)`);
      
      // セクション間の待機（API制限対策）
      if (i < outline.sections.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      console.error(`❌ セクション${i + 1}生成失敗:`, error);
      
      // フォールバック: 簡易セクション生成
      const fallbackSection: GeneratedSection = {
        id: sectionOutline.id,
        title: sectionOutline.title,
        content: generateFallbackSection(sectionOutline),
        wordCount: 300,
        qualityIndicators: {
          hasCodeExamples: false,
          hasActionableAdvice: true,
          citesTrends: false,
          structureScore: 50
        }
      };
      
      sections.push(fallbackSection);
      console.log(`⚠️ セクション${i + 1}フォールバック使用`);
    }
  }
  
  return sections;
}

/**
 * 個別セクションを生成
 */
async function generateSingleSection(
  sectionOutline: OutlineSection, 
  articleOutline: ArticleOutline, 
  config: HybridGenerationConfig,
  sectionNumber: number
): Promise<GeneratedSection> {
  
  // セクション用トレンドデータの準備
  const sectionTrends = sectionOutline.relatedTrends.slice(0, 3);
  const trendContext = sectionTrends.map(trend => `
- **${trend.title}**
  ソース: ${trend.source}
  概要: ${trend.description || 'トレンド記事'}
`).join('');
  
  const sectionPrompt = `
あなたは${config.category}分野の専門ライターです。以下の情報に基づいて、記事の一部となるセクションを生成してください。

## 記事全体のコンテキスト
- **記事タイトル**: ${articleOutline.title}
- **セクション番号**: ${sectionNumber}/${articleOutline.sections.length}

## このセクションの要件
- **セクションタイトル**: ${sectionOutline.title}
- **目標文字数**: ${sectionOutline.estimatedWords}文字
- **内容概要**: ${sectionOutline.description}

## 重要ポイント
${sectionOutline.keyPoints.map(point => `- ${point}`).join('\n')}

## 関連トレンド情報
${trendContext || '※関連トレンド情報なし'}

## 生成要件
1. **実践的な内容**: 読者が実際に活用できる具体的な方法を提示
2. **構造化**: 小見出し（###）を適切に使用
3. **例やコード**: 可能な場合は具体例やコードサンプルを含む
4. **トレンド活用**: 上記のトレンド情報を自然に組み込む
5. **独立性**: このセクション単体でも理解できる内容

## 出力形式
セクションの内容のみを出力してください。タイトル（##）は含めないでください。

例：
この項目では、...について詳しく解説します。

### 基本的な概念
...

### 実践的な手法
...

### 注意すべきポイント
...
`;

  let lastError = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const response = await generateWithGemini(sectionPrompt, { maxOutputTokens: SECTION_TOKEN_LIMIT }, apiKey);
      
      // 品質指標の計算
      const qualityIndicators = {
        hasCodeExamples: response.includes('```') || response.includes('`'),
        hasActionableAdvice: response.includes('方法') || response.includes('手順') || response.includes('実践'),
        citesTrends: sectionTrends.some(trend => response.includes(trend.title.slice(0, 10))),
        structureScore: (response.match(/###/g) || []).length * 20 // 小見出しの数 × 20
      };
      
      const section: GeneratedSection = {
        id: sectionOutline.id,
        title: sectionOutline.title,
        content: response.trim(),
        wordCount: response.length,
        qualityIndicators
      };
      
      return section;
      
    } catch (error: any) {
      lastError = error;
      console.error(`セクション生成試行 ${attempt} 失敗:`, error.message);
      
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  throw new Error(`セクション生成失敗: ${lastError?.message}`);
}

/**
 * フォールバックセクション生成
 */
function generateFallbackSection(sectionOutline: OutlineSection): string {
  return `
この${sectionOutline.title}について、以下の重要なポイントを押さえておく必要があります。

### 概要
${sectionOutline.description}

### 主要なポイント
${sectionOutline.keyPoints.map(point => `- ${point}`).join('\n')}

### まとめ
これらのポイントを理解することで、効果的に活用することができます。詳細な実装方法については、公式ドキュメントや専門資料を参照することをお勧めします。
`;
}

/**
 * Step 3: セクションを統合して最終記事を生成
 */
async function integrateAndFinalize(
  outline: ArticleOutline, 
  sections: GeneratedSection[], 
  config: HybridGenerationConfig
): Promise<GeneratedArticle> {
  
  // 導入部と結論の生成
  const introduction = await generateIntroduction(outline, config);
  const conclusion = await generateConclusion(outline, sections, config);
  
  // 記事全体の組み立て
  const contentParts = [
    `# ${outline.title}`,
    '',
    introduction,
    '',
    ...sections.map(section => `## ${section.title}\n\n${section.content}\n`),
    `## まとめ`,
    '',
    conclusion
  ];
  
  const fullContent = contentParts.join('\n');
  const totalWordCount = fullContent.length;
  
  // 品質スコアの計算
  const qualityScore = calculateOverallQuality(outline, sections, totalWordCount, config.trendData);
  
  // トレンド反映スコアの計算
  const trendReflectionScore = calculateTrendReflection(fullContent, config.trendData);
  
  const finalArticle: GeneratedArticle = {
    title: outline.title,
    content: fullContent,
    sections,
    wordCount: totalWordCount,
    qualityScore,
    trendReflectionScore
  };
  
  return finalArticle;
}

/**
 * 導入部の生成
 */
async function generateIntroduction(outline: ArticleOutline, config: HybridGenerationConfig): Promise<string> {
  if (outline.introduction && outline.introduction.length > 50) {
    return outline.introduction;
  }
  
  const introPrompt = `
「${outline.title}」について、読者の興味を引く導入文を200-300文字で書いてください。

要件：
- ${config.category}分野の記事として適切
- 読者にとっての価値を明確に提示
- 記事で扱う内容の概要を含む
- 興味を引く書き出し

記事で扱うセクション：
${outline.sections.map(s => `- ${s.title}`).join('\n')}
`;
  
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const intro = await generateWithGemini(introPrompt, { maxOutputTokens: 500 }, apiKey);
    return intro.trim();
  } catch (error) {
    console.error('導入部生成エラー:', error);
    return `${config.category}分野において、${config.topic}は重要なテーマです。本記事では、最新の動向を踏まえながら、実践的な知識とノウハウをお伝えします。`;
  }
}

/**
 * 結論部の生成
 */
async function generateConclusion(
  outline: ArticleOutline, 
  sections: GeneratedSection[], 
  config: HybridGenerationConfig
): Promise<string> {
  if (outline.conclusion && outline.conclusion.length > 50) {
    return outline.conclusion;
  }
  
  const conclusionPrompt = `
「${outline.title}」の記事のまとめ・結論部分を300-400文字で書いてください。

記事で扱った内容：
${sections.map(s => `- ${s.title}`).join('\n')}

要件：
- 記事全体の要点をまとめる
- 読者への実践的なアドバイスを含む
- 今後の展望や継続学習への示唆
- 前向きで行動を促す結び
`;
  
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const conclusion = await generateWithGemini(conclusionPrompt, { maxOutputTokens: 600 }, apiKey);
    return conclusion.trim();
  } catch (error) {
    console.error('結論部生成エラー:', error);
    return `本記事では、${config.topic}について詳しく解説しました。これらの知識を実際のプロジェクトに活用し、継続的な学習を通じてスキルアップを図ることをお勧めします。`;
  }
}

/**
 * 全体品質スコアの計算
 */
function calculateOverallQuality(
  outline: ArticleOutline, 
  sections: GeneratedSection[], 
  wordCount: number, 
  trendData: any[]
): number {
  let score = 0;
  
  // 文字数評価（最大25点）
  if (wordCount >= 4000) score += 25;
  else if (wordCount >= 3000) score += 20;
  else if (wordCount >= 2000) score += 15;
  else if (wordCount >= 1000) score += 10;
  
  // 構造評価（最大25点）
  const structureScore = sections.reduce((sum, s) => sum + s.qualityIndicators.structureScore, 0) / sections.length;
  score += Math.min(structureScore, 25);
  
  // セクション品質評価（最大25点）
  const avgQuality = sections.reduce((sum, s) => {
    let sectionScore = 0;
    if (s.qualityIndicators.hasCodeExamples) sectionScore += 3;
    if (s.qualityIndicators.hasActionableAdvice) sectionScore += 4;
    if (s.qualityIndicators.citesTrends) sectionScore += 3;
    return sum + sectionScore;
  }, 0) / sections.length;
  score += Math.min(avgQuality * 2.5, 25);
  
  // トレンド活用評価（最大25点）
  const trendUtilization = (trendData.length > 0) ? Math.min(sections.filter(s => s.qualityIndicators.citesTrends).length / sections.length * 25, 25) : 0;
  score += trendUtilization;
  
  return Math.round(score);
}

/**
 * トレンド反映スコアの計算
 */
function calculateTrendReflection(content: string, trendData: any[]): number {
  if (trendData.length === 0) return 0;
  
  const reflectedTrends = trendData.filter(trend => {
    const title = trend.title || '';
    const source = trend.source || '';
    return title.length > 5 && (content.includes(title.slice(0, 10)) || content.includes(source));
  });
  
  return Math.round((reflectedTrends.length / Math.min(trendData.length, 10)) * 100);
}