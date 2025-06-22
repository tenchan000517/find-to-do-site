# FIND to DO サイト改善実装計画

## 📋 プロジェクト概要

**目的**: インターン・学生・就活関連キーワードでの検索上位表示とサイト機能強化  
**対象キーワード**: インターン、学生、就活、DX、学生広報、学生アンバサダー、学生団体、学生コミュニティ、リクルート、学生イベント、大学生、キャリア、キャリア支援、ガクチカ、就職活動

## 🎯 実装フェーズ

### ✅ **フェーズ1: SEO基盤強化（完了）**

#### 1.1 ブログ記事Schema実装
- **ファイル**: `src/app/blog/[slug]/page.tsx`
- **実装内容**:
  - BlogPosting schemaの追加
  - インターン・学生関連キーワード最適化
  - GoogleのAI検索対応のabout/mentions要素
  - 強化されたメタデータ（title、description、keywords）
  - Open Graph・Twitter Cards対応

#### 1.2 主要ページSchema実装
- **サービスページ** (`src/app/service/page.tsx`):
  - Service schemaの実装
  - 3つの主要サービス（DX支援、イベント制作、インターン紹介）
  - OfferCatalogでサービス詳細構造化

- **企業情報ページ** (`src/app/about/page.tsx`):
  - AboutPage + Person schemaの実装
  - 代表者情報、企業ビジョン、事業内容
  - 学生支援・キャリア支援の専門性強調

- **お問い合わせページ** (`src/app/contact/page.tsx`):
  - ContactPage + FAQ schemaの実装
  - リッチスニペット対応のFAQ
  - 充実したQ&A（10項目）

#### 1.3 Organization Schema強化
- **ファイル**: `src/app/layout.tsx`
- **実装内容**:
  - インターン・学生支援関連キーワード大幅追加
  - 代表者、所在地、サービス内容の詳細化
  - audience要素で対象者明確化（大学生・企業・就活生）
  - hasOfferCatalog、knowsAbout要素追加

### 🔄 **フェーズ2: Discord自動通知システム（次段階）**

#### 2.1 Webhook通知機能
- **新規ファイル**: `src/lib/discord.ts`
- **実装予定**:
  ```typescript
  export async function sendDiscordNotification(article: {
    title: string;
    slug: string;
    category: string;
    publishedAt: string;
  }) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🆕 新しいブログ記事が公開されました！\n📝 **${article.title}**\n🏷️ カテゴリ: ${article.category}\n🔗 https://find-to-do.com/news-blog/${article.category}/${article.slug}`
      })
    });
  }
  ```

#### 2.2 ブログ生成プロセス統合
- **修正ファイル**: `src/scripts/generate-blog.ts`
- **実装予定**:
  - ブログ生成完了時の自動Discord投稿
  - 環境変数`DISCORD_WEBHOOK_URL`での管理
  - エラーハンドリング強化

#### 2.3 通知フォーマット設計
```
🆕 新しいブログ記事が公開されました！
📝 タイトル: [記事タイトル]
🏷️ カテゴリ: [カテゴリ名]
🔗 URL: https://find-to-do.com/blog/[slug]
📅 公開日時: [日時]
```

### 📈 **フェーズ3: ブログ品質向上（次段階）**

#### 3.1 文字数拡張
- **修正ファイル**: `src/lib/prompt.ts`
- **実装予定**:
  - 現在3000-4000文字 → 5000-7000文字に拡張
  - 段階的トークン増加（6000→8000→10000）
  - セクション構成の詳細化

#### 3.2 プロンプト改善
```typescript
const enhancedPrompt = `
記事構成:
1. 導入部 (500-800文字)
2. 背景・現状分析 (1000-1200文字)
3. 主要ポイント1 (1200-1500文字)
4. 主要ポイント2 (1200-1500文字)
5. 実践的なアドバイス (800-1000文字)
6. 今後の展望 (500-700文字)
7. まとめ (300-500文字)

総文字数目標: 5500-7200文字
`;
```

#### 3.3 コンテンツ構造改善
- より詳細なサブセクション追加
- コード例の充実化
- FAQ形式のセクション追加
- 関連ニュース数を2→3件に増加

## 🔧 技術実装詳細

### Discord Webhook実装例
```typescript
// src/lib/discord.ts
export async function sendDiscordNotification(article: ArticleData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: "新しいブログ記事が公開されました！",
          description: article.title,
          color: 0x0099ff,
          fields: [
            { name: "カテゴリ", value: article.category, inline: true },
            { name: "公開日", value: article.publishedAt, inline: true }
          ],
          url: `https://find-to-do.com/blog/${article.slug}`
        }]
      })
    });
  } catch (error) {
    console.error('Discord notification failed:', error);
  }
}
```

### Article Schema実装例
```typescript
const articleSchema = {
  "@type": "BlogPosting",
  "headline": frontmatter.title,
  "datePublished": frontmatter.date,
  "author": { "@type": "Organization", "name": "FIND to DO編集部" },
  "publisher": { "@id": "https://find-to-do.com/#organization" },
  "keywords": "インターン,学生,就活,キャリア支援",
  "about": [
    { "@type": "Thing", "name": "インターンシップ" },
    { "@type": "Thing", "name": "学生支援" },
    { "@type": "Thing", "name": "DX推進" }
  ]
};
```

## 📊 期待される効果

### SEO効果
- **検索順位向上**: 関連キーワードでの表示順位改善
- **クリック率向上**: リッチスニペットによる視認性向上（20-30%向上予想）
- **AI検索対応**: GoogleのAI検索結果での露出増加
- **ユーザー体験向上**: 構造化された情報提供

### コミュニティ効果
- **エンゲージメント向上**: Discord自動通知によるコミュニティ活性化
- **情報共有促進**: 新記事の即座な共有
- **ユーザー定着率向上**: タイムリーな情報提供

### コンテンツ品質効果
- **検索エンジン評価向上**: 文字数増加による情報量向上
- **専門性強化**: より詳細な情報提供
- **ユーザー滞在時間延長**: 充実したコンテンツによる満足度向上

## 🚀 実装ロードマップ

### Week 1: SEO Schema実装（✅ 完了）
- [x] ブログArticle schema追加
- [x] 主要ページSchema実装
- [x] Google構造化データテストでの検証

### Week 2: Discord連携実装（次段階）
- [ ] Webhook通知システム構築
- [ ] ブログ生成プロセスに統合
- [ ] テスト・デバッグ

### Week 3: ブログ品質向上（次段階）
- [ ] プロンプト改善・文字数拡張
- [ ] コンテンツ構造の詳細化
- [ ] 生成テスト・調整

### Week 4: 最終調整・最適化（次段階）
- [ ] パフォーマンス最適化
- [ ] エラーハンドリング強化
- [ ] 監視・ログ機能追加

## 📋 今後の改善点（将来的）

### 個別ページメタデータ強化
- service/about/contactページの`<title>`タグ最適化
- 各ページ固有のdescription設定
- ページ別Open Graph実装

### サイトマップ・技術SEO
- sitemap.xml自動生成
- robots.txt最適化
- Core Web Vitals改善

### アナリティクス強化
- Google Search Console連携
- SEOパフォーマンス監視
- コンバージョン追跡

---

**作成日**: 2025年6月22日  
**最終更新**: 2025年6月22日  
**ステータス**: フェーズ1完了、フェーズ2準備中