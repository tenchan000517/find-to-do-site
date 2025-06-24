# ブログ生成システム実装ロードマップ

## 🗓️ 全体スケジュール

```
6月24日 ──────────── 9月30日
   │                    │
   ├─ Phase 1 (1週間)   │
   ├─ Phase 2 (3週間)   │  
   ├─ Phase 3 (5週間)   │
   └─ Phase 4 (4週間) ──┘

緊急修正 → システム改善 → 最適化 → 運用安定化
```

---

## 🚨 Phase 1: 緊急修正 (6/24-6/30)

### Day 1-2: 目次生成機能修復

#### ✅ 作業チェックリスト
- [ ] **現状確認**: `src/mdx.ts`のremarkToc設定調査
- [ ] **設定変更**: 日本語→英語見出し対応
- [ ] **プロンプト更新**: "## Table of Contents"強制挿入
- [ ] **テスト実行**: 5記事での動作確認
- [ ] **本番反映**: 設定変更のデプロイ

#### 📝 具体的実装手順

```typescript
// Step 1: src/mdx.ts の設定確認・変更
// 現在
[remarkToc, { heading: '目次', tight: true }]

// 変更後 (Option A)
[remarkToc, { heading: 'Table of Contents', tight: true }]

// 変更後 (Option B - より確実)
[remarkToc, { 
  heading: '(table[ -]of[ -])?contents?|目次',
  tight: true,
  ordered: false 
}]
```

```typescript
// Step 2: src/lib/prompt.ts の更新
const prompt = `
## 記事構成
1. **タイトル** (# で始まる見出し)
2. **導入部** (300-400文字)

**重要**: 導入部の直後に必ず以下を挿入してください：
## Table of Contents

3. **メインセクション** (以下同様...)
`;
```

```bash
# Step 3: テスト実行
npm run generate-blog
# 生成された記事で目次表示確認

# Step 4: 複数記事でのテスト
for i in {1..5}; do
  npm run generate-blog
  echo "Test $i completed"
done
```

#### 🎯 期待される結果
- 目次生成率: 0% → 90%以上
- 全記事で統一された目次フォーマット
- ユーザビリティの即座改善

### Day 3-4: 参考情報生成安定化

#### ✅ 作業チェックリスト
- [ ] **エラー分析**: `generateSourceReferences`のログ調査
- [ ] **リトライ機能**: 指数バックオフ実装
- [ ] **フォールバック強化**: カテゴリ別デフォルト参考情報
- [ ] **品質向上**: 参考情報フォーマット統一
- [ ] **テスト**: 20記事での安定性確認

#### 📝 具体的実装手順

```typescript
// Step 1: src/lib/article.ts の generateSourceReferences 修正
async function generateSourceReferences(topic: string, category: string): Promise<string> {
  const maxRetries = 3;
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`参考情報生成 試行 ${attempt}/${maxRetries}: ${topic}`);
      
      const relatedNews = await fetchRelatedNews(topic, 3);
      
      if (relatedNews.length === 0) {
        console.log(`ニュース取得失敗、フォールバック使用: ${topic}`);
        return generateCategoryFallbackReferences(topic, category);
      }
      
      console.log(`ニュース取得成功: ${relatedNews.length}件`);
      return formatHighQualityReferences(relatedNews, topic);
      
    } catch (error) {
      lastError = error as Error;
      console.error(`参考情報生成エラー 試行${attempt}: ${error.message}`);
      
      if (attempt < maxRetries) {
        const delay = Math.min(2000 * Math.pow(2, attempt-1), 10000); // 指数バックオフ
        console.log(`${delay}ms後に再試行...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.log(`全試行失敗、カテゴリフォールバック使用: ${topic}`);
  return generateCategoryFallbackReferences(topic, category);
}

// Step 2: カテゴリ別フォールバック実装
function generateCategoryFallbackReferences(topic: string, category: string): string {
  const categoryReferences: Record<string, Array<{title: string, url: string, description: string}>> = {
    'プログラミング': [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', description: 'Web技術の包括的なドキュメント' },
      { title: 'Stack Overflow', url: 'https://stackoverflow.com/', description: 'プログラミング問題解決コミュニティ' },
      { title: 'GitHub', url: 'https://github.com/', description: 'オープンソースコードリポジトリ' }
    ],
    'AI技術': [
      { title: 'Papers with Code', url: 'https://paperswithcode.com/', description: '最新AI研究論文とコード' },
      { title: 'Hugging Face', url: 'https://huggingface.co/', description: 'AI/MLモデルハブ' },
      { title: 'Google AI Blog', url: 'https://ai.googleblog.com/', description: 'Google AI研究ブログ' }
    ],
    'ウェブ開発': [
      { title: 'Can I Use', url: 'https://caniuse.com/', description: 'ブラウザ機能サポート状況' },
      { title: 'CSS-Tricks', url: 'https://css-tricks.com/', description: 'CSS・フロントエンド技術情報' },
      { title: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/', description: 'ウェブ開発・デザイン情報' }
    ],
    'キャリア': [
      { title: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/', description: 'キャリア開発コース' },
      { title: 'Glassdoor', url: 'https://www.glassdoor.com/', description: '企業情報・給与データ' },
      { title: 'Harvard Business Review', url: 'https://hbr.org/', description: 'ビジネス・キャリア戦略' }
    ],
    'ビジネス': [
      { title: 'TechCrunch', url: 'https://techcrunch.com/', description: 'テクノロジービジネスニュース' },
      { title: 'Crunchbase', url: 'https://www.crunchbase.com/', description: '企業・投資情報データベース' },
      { title: 'Y Combinator', url: 'https://www.ycombinator.com/', description: 'スタートアップ情報・リソース' }
    ]
  };
  
  const references = categoryReferences[category] || categoryReferences['プログラミング'];
  
  let result = `本記事「${topic}」の作成にあたり、以下の信頼できる情報源を参考にしました：\n\n`;
  
  references.forEach((ref, index) => {
    result += `${index + 1}. **${ref.title}**\n`;
    result += `   説明: ${ref.description}\n`;
    result += `   URL: ${ref.url}\n\n`;
  });
  
  result += `\n**注意事項**:\n`;
  result += `- 本記事の情報は${new Date().toLocaleDateString('ja-JP')}時点のものです\n`;
  result += `- 最新の情報については各公式サイトをご確認ください\n`;
  result += `- 技術的な詳細は公式ドキュメントを参照することを推奨します`;
  
  return result;
}

// Step 3: 高品質フォーマット関数
function formatHighQualityReferences(relatedNews: NewsItem[], topic: string): string {
  let result = `本記事「${topic}」の作成にあたり、以下の最新情報を参考にしました：\n\n`;
  
  relatedNews.forEach((news, index) => {
    const title = (news.title || 'タイトル不明').trim();
    const source = (news.source || 'ソース不明').trim();
    const pubDate = news.pubDate 
      ? new Date(news.pubDate).toLocaleDateString('ja-JP') 
      : '日付不明';
    const link = (news.link || '').trim();
    
    result += `### ${index + 1}. ${title}\n`;
    result += `- **情報源**: ${source}\n`;
    result += `- **公開日**: ${pubDate}\n`;
    
    if (link && link.startsWith('http')) {
      result += `- **URL**: ${link}\n`;
    }
    
    result += '\n';
  });
  
  result += `\n**追加リソース**:\n`;
  result += `- 最新動向: [Google News検索](https://news.google.com/search?q=${encodeURIComponent(topic)})\n`;
  result += `- 関連技術: 各技術の公式ドキュメントを参照\n\n`;
  
  result += `**免責事項**: 本記事の情報は執筆時点でのものであり、最新情報については各公式サイトをご確認ください。`;
  
  return result;
}
```

#### 🎯 期待される結果
- 参考情報生成率: 6% → 80%以上
- エラー時も品質の高いフォールバック情報
- 一貫したフォーマットでの参考情報表示

### Day 5-7: プロンプト構造復元

#### ✅ 作業チェックリスト
- [ ] **2fda20b分析**: 優秀だった部分の特定
- [ ] **段階的統合**: 現在版との互換性確保
- [ ] **文字数調整**: 現実的な範囲に設定
- [ ] **品質テスト**: 10記事での比較検証
- [ ] **最終調整**: フィードバック反映

#### 📝 具体的実装手順

```typescript
// Step 1: src/lib/prompt.ts の全面改修
export async function createArticlePrompt(topic: string, category: string): Promise<string> {
  // 関連ニュースを取得（最大3件に制限）
  const relatedNews = await fetchRelatedNews(topic, 3);
  
  // 関連ニュースの情報を文字列にまとめる（ソース情報付き）
  let newsContext = '';
  if (relatedNews.length > 0) {
    newsContext = `\n\n関連ニュース情報:\n` + relatedNews.map((news, index) => 
      `${index + 1}. 「${news.title}」(${new Date(news.pubDate).toLocaleDateString('ja-JP')}) - ${news.source}`
    ).join('\n');
  }
  
  // カテゴリ別のプロンプト調整
  const categorySpecificInstructions = getCategorySpecificInstructions(category);
  
  // メインプロンプト（2fda20bベース + 現在版の改善点）
  const prompt = `
あなたは${category}の専門家として、「${topic}」について詳細で実践的なブログ記事を作成してください。読者にとって価値の高い、具体的で実用的な情報を提供することを重視してください。

${newsContext}

記事は以下の7段階構成でマークダウン形式で書いてください：

## 記事構成 (必須7段階)
1. **タイトル** (# で始まる見出し) - 魅力的で分かりやすいタイトル
2. **導入部** (300-400文字) - 読者の関心を引く自然な導入文
3. **Table of Contents** - 必須項目: ## Table of Contents (システムが自動生成)
4. **背景・概要** (## 見出し、600-800文字) - トピックの重要性と現状
5. **主要ポイント1** (## 見出し、800-1200文字) - 具体的な手法・アプローチ
6. **主要ポイント2** (## 見出し、800-1200文字) - 実践例・ケーススタディ  
7. **実践的アドバイス** (## 見出し、600-800文字) - 読者への具体的な行動指針
8. **まとめ** (## 見出し、400-500文字) - 要点の振り返りと今後の展望

## 内容の質向上要件 (必須)
- **具体例の豊富な提供**: 各セクションに実際の事例、数値、具体的な手順を最低2つ含める
- **段階的な説明**: 初心者から上級者まで理解できるよう、基礎から応用まで段階的に解説
- **実践的な価値**: 読者がすぐに活用できる具体的なテクニック、ツール、方法論を提供
- **最新性の確保**: 2025年時点での最新トレンド、技術、市場動向を反映
- **専門性の向上**: 業界の専門用語を適切に使用し、深い洞察を提供

${categorySpecificInstructions}

## 記事作成の詳細指示 (品質重視)
- **文字数**: 4000〜5500文字を目標とし、各セクションに十分な内容を含める
- **マークダウン記法**: 見出し、リスト、強調、リンクを効果的に活用
- **読みやすさ**: 段落間の適切な改行、箇条書きの活用で読みやすさを向上
- **エンゲージメント**: 読者の興味を引く問いかけや、行動を促す表現を含める

## 必須フォーマット要件
- 記事は必ず「# タイトル」で始める
- 導入部の直後に「## Table of Contents」を配置
- 各セクションに具体的な数値、事例、手順を含める
- 読者が実際に行動に移せる具体的なアドバイスを提供
- まとめセクションで終了（参考情報はシステムが自動追加）

## コードブロックに関する重要な制約
- コードブロックでは必ず以下の言語指定子のみを使用: tsx, ts, js, jsx, javascript, typescript, json, html, css
- その他の言語が必要な場合でも、これらの言語指定子のどれかを使用
- 特に vue, tsxx などの拡張子は使用禁止
- 言語指定子がわからない場合は tsx を使用
- コードブロック形式: \`\`\`tsx コード例 \`\`\`

## 重要な注意事項
- タイトルは魅力的で分かりやすく、SEOを意識しつつも読者ファーストで作成
- 文章は自然で読みやすく、実用的な内容を心がける
- 各セクションの文字数目標を意識し、内容の充実を図る
- 具体例は実在するツールやサービス、数値データを使用する
`;

  return prompt;
}
```

#### 🎯 期待される結果
- 記事品質スコア: 50% → 70%
- 構造一貫性の大幅改善
- 文字数達成率: 40% → 70%

---

## 🔧 Phase 2: システム改善 (7/1-7/21)

### Week 1-2: ハイブリッド生成システム設計・実装

#### ✅ 作業チェックリスト
- [ ] **アーキテクチャ設計**: インターフェース定義
- [ ] **アウトライン生成エンジン**: JSON形式での構造化生成
- [ ] **セクション生成エンジン**: 並列処理対応
- [ ] **統合エンジン**: 品質チェック機能
- [ ] **テスト実装**: 単体・結合テスト

#### 📝 実装優先順位

```typescript
// 1日目-3日目: 基本アーキテクチャ
interface ArticleOutline { ... }           // 型定義
interface GenerationContext { ... }        // コンテキスト管理
interface QualityMetrics { ... }           // 品質指標

// 4日目-7日目: コア機能実装  
generateArticleOutline()                   // アウトライン生成
generateSection()                          // セクション生成
finalizeArticle()                          // 統合・品質保証

// 8日目-10日目: 並列処理実装
generateArticleParallel()                  // 並列実行制御
performQualityCheck()                      // 品質検証

// 11日目-14日目: 統合・テスト
src/lib/hybrid-generator.ts               // メインファイル
テスト実装・デバッグ・調整
```

### Week 3: 品質検証・並列処理システム

#### ✅ 作業チェックリスト  
- [ ] **品質指標定義**: 構造・内容・技術・読みやすさ
- [ ] **自動検証実装**: スコア算出アルゴリズム
- [ ] **並列処理最適化**: セクション同時生成
- [ ] **パフォーマンステスト**: 生成時間・品質トレードオフ
- [ ] **エラーハンドリング**: 堅牢性確保

---

## 🚀 Phase 3: 最適化・拡張 (7/22-8/25)

### Week 1-2: A/Bテスト・カテゴリ最適化

#### ✅ 作業チェックリスト
- [ ] **A/Bテストフレームワーク**: 複数パターン自動テスト
- [ ] **カテゴリ別プロンプト**: 専門性向上
- [ ] **成果測定**: 品質指標による客観評価
- [ ] **最適パターン特定**: データドリブンな改善

### Week 3-4: パフォーマンス・監視システム

#### ✅ 作業チェックリスト
- [ ] **キャッシュ機能**: よく使われるトピックの最適化
- [ ] **アラートシステム**: 品質低下の自動検知
- [ ] **ダッシュボード**: リアルタイム品質監視
- [ ] **自動修復**: 異常検知時の対応

---

## 📊 Phase 4: 運用安定化 (8/26-9/22)

### Week 1-2: 運用マニュアル・体制整備

#### ✅ 作業チェックリスト
- [ ] **運用マニュアル作成**: トラブルシューティング手順
- [ ] **定期メンテナンス**: 週次・月次の品質チェック
- [ ] **担当者研修**: システム理解・操作方法
- [ ] **エスカレーション体制**: 問題発生時の対応フロー

### Week 3-4: 継続改善プロセス

#### ✅ 作業チェックリスト  
- [ ] **KPI監視体制**: 月次レポート自動生成
- [ ] **フィードバックループ**: ユーザー意見の反映体制
- [ ] **技術的負債管理**: 定期的なコード品質チェック
- [ ] **スケールアップ準備**: 記事数増加への対応

---

## 📋 日次・週次タスク管理

### 毎日のタスク
```bash
# 1. 当日の品質確認
npm run generate-blog
npm run quality-check

# 2. ログ確認
tail -f logs/blog-generation.log

# 3. エラーチェック  
grep "ERROR" logs/*.log
```

### 毎週のタスク
```bash
# 1. 週次品質レポート生成
npm run weekly-quality-report

# 2. パフォーマンス分析
npm run performance-analysis

# 3. バックアップ・メンテナンス
npm run weekly-maintenance
```

---

## 🎯 成功基準・検証方法

### 品質指標の測定方法
```typescript
// 自動品質測定スクリプト
interface WeeklyQualityReport {
  totalArticles: number;
  qualityScoreAverage: number;
  tocGenerationRate: number;
  referenceQualityRate: number;
  structureConsistencyRate: number;
  wordCountAchievementRate: number;
  generationSuccessRate: number;
}

async function generateWeeklyReport(): Promise<WeeklyQualityReport> {
  // 過去1週間の記事を分析
  // 各指標を自動計算
  // レポート生成・保存
}
```

### マイルストーン検証
- **Phase 1完了**: 目次90%、参考情報80%生成率達成
- **Phase 2完了**: ハイブリッドシステム稼働、品質75%達成  
- **Phase 3完了**: 最適化完了、品質85%達成
- **Phase 4完了**: 運用体制確立、継続改善開始

---

## 🚨 緊急時対応手順

### 品質大幅低下時
1. **即座停止**: 自動生成の一時停止
2. **原因調査**: ログ分析・API状況確認
3. **フォールバック**: 前回正常動作時の設定に復帰
4. **再開判断**: 品質確認後の段階的再開

### システム障害時  
1. **影響範囲確認**: RSS、ファイル生成状況
2. **代替手段**: 手動記事生成への切り替え
3. **復旧作業**: 原因特定・修正・テスト
4. **再発防止**: 監視強化・冗長化検討

---

**ロードマップ作成日**: 2025年6月24日  
**責任者**: 開発チームリーダー  
**次回更新**: Phase 1完了時 (2025年6月30日)