# トレンドシステム連携ガイド

## 概要
このドキュメントは、改善されたトレンドシステムと記事生成プロンプトの連携について説明します。

---

## 📊 トレンドシステムからの出力データ形式

### 曜日ごとのデータ構造
```typescript
interface TrendItem {
  id: string;                    // 一意識別子
  title: string;                 // 記事タイトル（必須）
  url: string;                   // 記事URL（必須）
  source: string;                // データソース名（必須）
  publishedAt: string;           // 公開日時（必須）
  description?: string;          // 記事の説明・要約（推奨）
  score?: number;                // スコア（Hacker News等）
  likes?: number;                // いいね数（Zenn等）
  comments?: number;             // コメント数
  topics?: string[];             // 関連トピック
}
```

### 各曜日のデータ提供形式
```
[記事1]
タイトル: {title}
URL: {url}
ソース: {source}
公開日: {publishedAt}
スコア: {score || likes}
コメント数: {comments}
トピック: {topics.join(', ')}
説明: {description}

[記事2]
...
```

---

## 🤖 プロンプト側の受け取り方法

### 1. 基本的な受け取りフロー

```typescript
// 1. 曜日に基づいてカテゴリを決定
const today = new Date();
const dayOfWeek = today.getDay();
const categoryMap = {
  0: 'ウェブ開発',           // 日曜日
  1: 'キャリア',             // 月曜日
  2: '生成AI',               // 火曜日
  3: 'ビジネス',             // 水曜日
  4: 'プログラミング',       // 木曜日
  5: '勉強・自己啓発',       // 金曜日
  6: 'データサイエンス・AI開発' // 土曜日
};

// 2. 該当カテゴリの記事データを取得
const trendData = await getTodaysTrendsByCategory();
const todayArticles = trendData[categoryMap[dayOfWeek]];
```

### 2. プロンプトへの記事データ組み込み

**推奨アプローチ:**
```
今日は{曜日}です。以下の{カテゴリ}関連の最新トレンド記事を基に、包括的なブログ記事を作成してください。

=== 参考記事データ ===
{記事1のタイトル}
ソース: {ソース名}
概要: {説明文}
URL: {URL}

{記事2のタイトル}
ソース: {ソース名}  
概要: {説明文}
URL: {URL}

...（最大15-20件）

=== 記事作成指示 ===
上記のトレンド情報を踏まえ、以下の要件で記事を作成してください：
- 文字数: 3000-5000文字
- 構成: 導入→現状分析→詳細解説→実践的な活用法→まとめ
- SEO対応: 適切なキーワード配置
- 読者価値: 実践的で有用な情報提供
```

### 3. 記事品質を最大化する活用方法

#### **タイトル情報の活用**
```
✅ 良い例: "最新のReact開発トレンドと実践的な活用法"
❌ 悪い例: "Reactについて"

→ トレンド記事の具体的なタイトルから着想を得る
```

#### **説明文・概要の活用**
```
✅ 良い例: トレンド記事の説明文から具体的な技術ポイントを抽出
❌ 悪い例: タイトルのみで内容を推測

→ description フィールドを重視して詳細な内容を把握
```

#### **ソース情報の活用**
```
✅ 良い例: "Zenn APIからの高品質技術記事によると..."
✅ 良い例: "最新のGoogle Newsレポートでは..."
❌ 悪い例: ソース情報を無視

→ ソースの信頼性を記事の権威性向上に活用
```

---

## 📚 参考情報システムとの連携

### 1. 参考情報が期待するデータ品質

#### **必須要件**
- ✅ **実在する記事**: example.com等のダミーURLは不可
- ✅ **最新情報**: 公開日が直近のもの
- ✅ **説明文付き**: タイトルだけでなく内容の概要が必要
- ✅ **信頼できるソース**: Zenn、Google News、Hacker News等

#### **推奨要件**
- ⭐ **エンゲージメント指標**: いいね数、コメント数で人気度を把握
- ⭐ **関連トピック**: 記事の技術領域を明確化
- ⭐ **多様性**: 同一ソースに偏らない情報収集

### 2. 参考情報システムでの処理フロー

```typescript
// 1. データ検証
const validateArticleData = (article: TrendItem) => {
  return {
    hasRealURL: !article.url.includes('example.com'),
    hasDescription: !!article.description,
    isRecent: isWithinDays(article.publishedAt, 7),
    hasTrustedSource: TRUSTED_SOURCES.includes(article.source)
  };
};

// 2. 品質フィルタリング
const highQualityArticles = articles.filter(article => {
  const validation = validateArticleData(article);
  return validation.hasRealURL && 
         validation.hasDescription && 
         validation.isRecent;
});

// 3. 参考情報として活用
const referenceContext = highQualityArticles.map(article => ({
  title: article.title,
  summary: article.description,
  sourceCredibility: getSourceCredibility(article.source),
  relevanceScore: calculateRelevance(article, targetTopic)
}));
```

### 3. 失敗する連携パターン（回避すべき）

#### **❌ 避けるべきデータ**
```
// GitHub Trendingのリポジトリ情報（改善済み）
{
  title: "facebook/react",  // リポジトリ名のみ
  description: "",          // 説明なし
  url: "https://github.com/facebook/react"
}

// 生成されたダミーデータ（改善済み）
{
  title: "転職で成功するための実践ガイド",
  url: "https://example.com/career/転職",  // ダミーURL
  description: ""  // 説明なし
}
```

#### **✅ 推奨されるデータ**
```
// Zenn APIからの実記事
{
  title: "Claude Code 逆引きコマンド事典",
  url: "https://zenn.dev/ml_bear/articles/84e92429698177",
  description: "Claude Codeの実践的な使い方を体系的に解説...",
  source: "Zenn API",
  likes: 173,
  comments: 5
}

// Google Newsからの実記事
{
  title: "マーケティング戦略にAIを組み込む方法",
  url: "https://news.example.com/ai-marketing-strategy",
  description: "生成AIをマーケティング戦略に組み込む際の...",
  source: "Google News (ビジネス)",
  publishedAt: "2025-06-24T09:00:00Z"
}
```

---

## 🔄 データフロー全体図

```
[トレンドシステム] 
    ↓ (196件の記事データ)
[カテゴリ分類システム]
    ↓ (曜日別15-20件)
[プロンプトシステム] ← この部分の連携指針
    ↓ (構造化された指示)
[記事生成AI]
    ↓ (3000-5000文字記事)
[参考情報システム] ← この部分の連携指針
    ↓ (品質検証・補強)
[最終記事出力]
```

---

## 🎯 連携成功の指標

### プロンプト側の成功指標
- ✅ 15件以上の記事データを活用
- ✅ 実際のトレンド情報を反映した内容
- ✅ 多様なソースからの情報統合
- ✅ タイムリーで価値ある記事生成

### 参考情報側の成功指標  
- ✅ 90%以上が実在URL
- ✅ 80%以上が説明文付き
- ✅ 複数ソースからの情報収集
- ✅ 信頼できる情報源の確保

---

## ⚙️ 実装チェックリスト

### プロンプト側実装
- [ ] 曜日ベースのカテゴリ選択実装
- [ ] トレンドデータの構造化取得
- [ ] 記事データの効果的なプロンプト組み込み
- [ ] ソース情報の権威性活用

### 参考情報側実装
- [ ] データ品質検証ロジック
- [ ] 実URL vs ダミーURLの判定
- [ ] 説明文の存在確認
- [ ] ソース信頼性の評価

### 統合テスト
- [ ] 全曜日での記事生成テスト
- [ ] 生成記事の品質評価
- [ ] トレンド反映度の確認
- [ ] 参考情報の適切な活用確認

---

## 📝 注意事項

1. **データ更新頻度**: トレンドデータは日次更新を推奨
2. **エラーハンドリング**: API失敗時のフォールバック準備
3. **レート制限対応**: 各APIの制限に注意した実装
4. **品質監視**: 定期的な記事品質の監視と改善

---

このガイドに従って実装することで、トレンドシステムから記事生成まで一貫した高品質な連携が実現できます。