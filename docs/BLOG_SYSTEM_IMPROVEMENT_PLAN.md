# ブログ生成システム改善計画書

## 📋 計画概要

**目的**: ブログ記事の品質向上と一貫性確保  
**期間**: 2025年6月24日 〜 2025年9月30日  
**責任者**: 開発チーム  
**優先度**: 高 (ブランド価値直結)

### 改善目標

| KPI | 現在 | 目標 | 期限 |
|-----|------|------|------|
| 記事品質スコア | 50% | 85% | 8月末 |
| 目次生成率 | 0% | 95% | 7月初旬 |
| 参考情報品質 | 6% | 90% | 7月末 |
| 構造一貫性 | 30% | 95% | 8月末 |
| 生成成功率 | 70% | 95% | 9月末 |

---

## 🎯 Phase 1: 緊急修正 (1週間: 6/24-6/30)

### 1.1 目次生成機能の修復
**期限**: 6/25  
**担当**: フロントエンド担当  
**作業時間**: 2時間

#### 現在の問題
```typescript
// src/mdx.ts - 現在の設定
[remarkToc, { heading: '目次', tight: true }]
// remarkTocが日本語「目次」を認識できない
```

#### 修正方法
```typescript
// Option 1: 英語設定に変更
[remarkToc, { heading: 'Table of Contents', tight: true }]

// Option 2: カスタム実装
[remarkToc, { 
  heading: 'contents|目次|table of contents', 
  tight: true,
  ordered: false
}]

// Option 3: プロンプト側で英語見出し強制
"## Table of Contents" を記事に含める指示追加
```

#### 検証方法
```bash
# テスト記事で目次生成確認
npm run build
# 生成された記事で目次表示を確認
```

### 1.2 参考情報生成の安定化
**期限**: 6/26  
**担当**: バックエンド担当  
**作業時間**: 4時間

#### 修正対象ファイル
- `src/lib/article.ts:34-85` (generateSourceReferences)
- `src/lib/trends.ts:17-63` (fetchRelatedNews)

#### 改善内容
```typescript
// 1. エラーハンドリング強化
async function generateSourceReferences(topic: string, category: string): Promise<string> {
  const maxRetries = 3;
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const relatedNews = await fetchRelatedNews(topic, 3);
      
      if (relatedNews.length === 0) {
        // より詳細なフォールバック
        return generateFallbackReferences(topic, category);
      }
      
      return formatReferences(relatedNews);
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        await delay(2000 * attempt); // 指数バックオフ
      }
    }
  }
  
  // 最終フォールバック
  return generateFallbackReferences(topic, category);
}

// 2. カテゴリ別フォールバック
function generateFallbackReferences(topic: string, category: string): string {
  const categoryReferences = {
    'プログラミング': [
      'MDN Web Docs',
      'Stack Overflow',
      '各技術の公式ドキュメント'
    ],
    'AI技術': [
      'Google AI Blog',
      'OpenAI Research',
      'Hugging Face Hub'
    ],
    // ...他のカテゴリ
  };
  
  return formatFallbackReferences(categoryReferences[category] || []);
}
```

### 1.3 プロンプト構造の部分復元
**期限**: 6/27  
**担当**: AI担当  
**作業時間**: 6時間

#### 修正方法
```typescript
// src/lib/prompt.ts の改善
// 2fda20bの優秀な部分を現在版に統合

const prompt = `
## 記事構成 (7段階に拡張)
1. **タイトル** (# で始まる見出し) - 魅力的で分かりやすいタイトル
2. **導入部** (300-400文字) - 読者の関心を引く導入
3. **背景・概要** (## 見出し、600-800文字) - トピックの重要性と現状
4. **主要ポイント1** (## 見出し、800-1200文字) - 具体的手法・アプローチ
5. **主要ポイント2** (## 見出し、800-1200文字) - 実践例・ケーススタディ
6. **実践的アドバイス** (## 見出し、600-800文字) - 具体的行動指針
7. **まとめ** (## 見出し、400-500文字) - 要点振り返りと展望

## 必須: 目次生成
記事の導入部の後に以下を必ず含めてください：
## Table of Contents
(この部分は自動生成されます)

## 品質要件
- **文字数**: 4000〜5500文字を目標 (現実的な範囲に調整)
- **具体例**: 各セクションに数値や事例を最低2つ含める
- **実践性**: 読者が実際に活用できる情報を提供
`;
```

---

## 🔧 Phase 2: システム改善 (3週間: 7/1-7/21)

### 2.1 ハイブリッド生成システムの実装
**期限**: 7/14  
**担当**: フルスタック担当  
**作業時間**: 40時間

#### アーキテクチャ設計

```typescript
// 新規ファイル: src/lib/hybrid-generator.ts

interface ArticleOutline {
  title: string;
  tableOfContents: string[];
  introduction: string;
  sections: OutlineSection[];
  conclusion: string;
  estimatedLength: number;
}

interface OutlineSection {
  heading: string;
  keyPoints: string[];
  targetLength: number;
  codeExamples?: boolean;
  references?: string[];
}

interface GenerationContext {
  topic: string;
  category: string;
  relatedNews: NewsItem[];
  outline: ArticleOutline;
}
```

#### Phase 2.1.1: アウトライン生成エンジン
```typescript
export async function generateArticleOutline(
  topic: string, 
  category: string
): Promise<ArticleOutline> {
  const prompt = `
あなたは${category}の専門家として、「${topic}」の記事アウトラインを作成してください。

# 出力形式 (JSON)
{
  "title": "魅力的で具体的なタイトル",
  "tableOfContents": ["見出し1", "見出し2", "見出し3"],
  "introduction": "400文字程度の導入文",
  "sections": [
    {
      "heading": "見出し名",
      "keyPoints": ["ポイント1", "ポイント2", "ポイント3"],
      "targetLength": 1000,
      "codeExamples": true,
      "references": ["参考1", "参考2"]
    }
  ],
  "conclusion": "400文字程度のまとめ",
  "estimatedLength": 4500
}

# 要件
- 合計4000-5500文字
- 実践的で具体的な内容
- コード例が適切な場所に配置
- 読者が行動に移せる構成
  `;
  
  const response = await generateWithGemini(prompt, { maxOutputTokens: 1000 });
  return JSON.parse(response);
}
```

#### Phase 2.1.2: セクション別生成エンジン
```typescript
export async function generateSection(
  context: GenerationContext,
  sectionIndex: number
): Promise<SectionContent> {
  const section = context.outline.sections[sectionIndex];
  
  const prompt = `
記事「${context.outline.title}」の「${section.heading}」セクションを書いてください。

# アウトライン情報
${JSON.stringify(section, null, 2)}

# 前後のコンテキスト
前のセクション: ${sectionIndex > 0 ? context.outline.sections[sectionIndex-1].heading : 'なし'}
次のセクション: ${context.outline.sections[sectionIndex+1]?.heading || 'なし'}

# 要件
- 目標文字数: ${section.targetLength}文字
- キーポイント: ${section.keyPoints.join(', ')}
- ${section.codeExamples ? 'コード例を含める' : 'コード例不要'}
- 具体的な数値や事例を含める
- 読者が実践できる内容にする

# 出力形式
## ${section.heading}

[セクション内容]
  `;
  
  const content = await generateWithGemini(prompt, { maxOutputTokens: 1500 });
  
  return {
    heading: section.heading,
    content: content,
    wordCount: content.length,
    hasCodeExamples: section.codeExamples || false
  };
}
```

#### Phase 2.1.3: 統合・品質保証エンジン
```typescript
export async function finalizeArticle(
  context: GenerationContext,
  sections: SectionContent[]
): Promise<FinalizedArticle> {
  
  // 1. 基本統合
  let article = buildArticleStructure(context.outline, sections);
  
  // 2. 品質チェック
  const qualityScore = await performQualityCheck(article);
  
  // 3. 必要に応じて修正
  if (qualityScore < 0.8) {
    article = await improveArticleQuality(article, context);
  }
  
  // 4. 最終フォーマット
  article = await applyFinalFormatting(article);
  
  return {
    content: article,
    qualityScore: qualityScore,
    metadata: generateMetadata(context, sections)
  };
}

async function performQualityCheck(article: string): Promise<number> {
  const checks = [
    checkStructureConsistency(article),    // 構造の一貫性
    checkContentFlow(article),             // 内容の流れ
    checkTableOfContentsPresence(article), // 目次の存在
    checkReferencesQuality(article),       // 参考情報の品質
    checkCodeExamplesFormat(article),      // コード例の形式
    checkWordCount(article)                // 文字数
  ];
  
  const scores = await Promise.all(checks);
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}
```

### 2.2 品質検証システムの実装
**期限**: 7/18  
**担当**: QA担当  
**作業時間**: 16時間

```typescript
// 新規ファイル: src/lib/quality-validator.ts

interface QualityMetrics {
  structureScore: number;      // 構造スコア (0-1)
  contentScore: number;        // 内容スコア (0-1)
  technicalScore: number;      // 技術的スコア (0-1)
  readabilityScore: number;    // 読みやすさスコア (0-1)
  overallScore: number;        // 総合スコア (0-1)
}

export async function validateArticleQuality(
  article: string,
  outline: ArticleOutline
): Promise<QualityMetrics> {
  
  const [
    structureScore,
    contentScore,
    technicalScore,
    readabilityScore
  ] = await Promise.all([
    validateStructure(article, outline),
    validateContent(article),
    validateTechnicalAspects(article),
    validateReadability(article)
  ]);
  
  const overallScore = (
    structureScore * 0.3 +
    contentScore * 0.4 +
    technicalScore * 0.2 +
    readabilityScore * 0.1
  );
  
  return {
    structureScore,
    contentScore,
    technicalScore,
    readabilityScore,
    overallScore
  };
}
```

### 2.3 並列処理システムの実装
**期限**: 7/21  
**担当**: パフォーマンス担当  
**作業時間**: 12時間

```typescript
// 修正ファイル: src/lib/hybrid-generator.ts

export async function generateArticleParallel(
  topic: string,
  category: string
): Promise<FinalizedArticle> {
  
  // Step 1: アウトライン生成 (シーケンシャル)
  const outline = await generateArticleOutline(topic, category);
  const relatedNews = await fetchRelatedNews(topic, 3);
  
  const context: GenerationContext = {
    topic,
    category,
    relatedNews,
    outline
  };
  
  // Step 2: セクション並列生成
  const sectionPromises = outline.sections.map((_, index) =>
    generateSection(context, index)
  );
  
  const [sections, references] = await Promise.all([
    Promise.all(sectionPromises),
    generateSourceReferences(topic, category)
  ]);
  
  // Step 3: 統合・品質保証
  const finalizedArticle = await finalizeArticle(context, sections);
  
  // Step 4: 参考情報追加
  finalizedArticle.content += `\n\n## 参考情報\n\n${references}`;
  
  return finalizedArticle;
}
```

---

## 🚀 Phase 3: 最適化・拡張 (5週間: 7/22-8/25)

### 3.1 A/Bテストシステム
**期限**: 8/5  
**実装内容**: 複数プロンプトパターンの自動テスト

### 3.2 カテゴリ別最適化
**期限**: 8/12  
**実装内容**: カテゴリごとの専用プロンプト

### 3.3 パフォーマンス最適化
**期限**: 8/19  
**実装内容**: キャッシュ機能、並列処理改善

### 3.4 監視・アラートシステム
**期限**: 8/25  
**実装内容**: 品質低下の自動検知

---

## 📊 Phase 4: 運用安定化 (4週間: 8/26-9/22)

### 4.1 運用マニュアル作成
### 4.2 モニタリングダッシュボード
### 4.3 定期メンテナンス体制
### 4.4 継続改善プロセス

---

## 💰 コスト・リソース見積もり

### 開発工数
| Phase | 工数 | 期間 | 担当者数 |
|-------|------|------|----------|
| Phase 1 | 12時間 | 1週間 | 2名 |
| Phase 2 | 68時間 | 3週間 | 3名 |
| Phase 3 | 80時間 | 5週間 | 4名 |
| Phase 4 | 40時間 | 4週間 | 2名 |
| **合計** | **200時間** | **13週間** | **平均3名** |

### API使用料金
```typescript
// 現在の使用量 (1日1記事)
現在: 約6,000トークン/日 × 30日 = 180,000トークン/月

// ハイブリッド生成後の想定使用量
- アウトライン: 1,000トークン
- セクション生成: 1,500トークン × 4 = 6,000トークン  
- 品質チェック: 500トークン
- 合計: 7,500トークン/日 × 30日 = 225,000トークン/月

増加率: 約25%増 (品質向上とのトレードオフで許容範囲)
```

---

## 🎯 成功指標とマイルストーン

### Week 1 (Phase 1完了)
- [ ] 目次生成率: 0% → 90%
- [ ] 参考情報生成率: 6% → 70%
- [ ] 記事構造の改善確認

### Week 4 (Phase 2完了) 
- [ ] ハイブリッド生成システム稼働
- [ ] 記事品質スコア: 50% → 75%
- [ ] 生成時間: 現在と同等維持

### Week 9 (Phase 3完了)
- [ ] 記事品質スコア: 75% → 85%
- [ ] A/Bテスト結果による最適化完了
- [ ] パフォーマンス目標達成

### Week 13 (Phase 4完了)
- [ ] 運用体制確立
- [ ] 品質維持の自動化
- [ ] 継続改善プロセス稼働

---

## ⚠️ リスクと対策

### 高リスク
1. **API使用量増加**: 段階的導入で制御
2. **生成時間増加**: 並列処理で対応
3. **品質の一時的低下**: フォールバック機能で対応

### 中リスク  
1. **実装複雑性**: 十分なテスト期間確保
2. **運用負荷増加**: 自動化で軽減

### 対策
- 各Phase完了時の品質検証
- ロールバック計画の準備
- 段階的リリースによるリスク軽減

---

## 📞 連絡先・責任者

**プロジェクトマネージャー**: 開発チームリーダー  
**技術責任者**: フルスタックエンジニア  
**品質責任者**: QAエンジニア

**進捗報告**: 毎週金曜日  
**緊急連絡**: 品質低下時は即座に報告

---

**計画書作成日**: 2025年6月24日  
**最終更新日**: 2025年6月24日  
**次回見直し**: Phase 1完了時 (2025年6月30日)