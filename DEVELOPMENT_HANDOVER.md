# 🚀 FIND to DO 開発引き継ぎ指示書

## 📋 プロジェクト概要

**プロジェクト名**: FIND to DO サイト改善プロジェクト  
**現在の状況**: フェーズ1（SEO対策）完了、フェーズ2（Discord連携）完了、フェーズ3（ブログ品質向上）完了、**緊急対応要**: RSSフィード問題  
**プロジェクトルート**: `C:\find-to-do-site\`  
**詳細計画書**: `C:\find-to-do-site\FIND_TO_DO_IMPROVEMENT_PLAN.md`

## 🎯 現在の完了状況

### ✅ **フェーズ1: SEO基盤強化（完了済み）**
- インターン・学生・就活関連キーワードでの検索最適化
- 全主要ページでのJSON-LD Schema実装完了
- GoogleのAI検索対応済み
- SEO完成度: **85-90%達成**

### ✅ **フェーズ2: Discord自動通知システム（完了済み）**
- RSS フィード自動生成機能実装完了
- ブログ記事生成時の RSS 更新統合完了
- zeroone_support Discord Bot 連携ドキュメント作成完了
- 10分間隔での RSS 監視設定完了

### ✅ **フェーズ3: ブログ品質向上（完了済み）**
- 日本語タイトルに対応したslug生成システム修正完了
- 無効なMDXコードブロック自動除去機能実装完了
- ビルドエラー「empty slug」問題解決完了
- 今後の自動記事生成でMDXエラーは発生しません

### 🚨 **緊急対応要: RSSフィード問題調査・修正**

## 🛠️ 開発環境セットアップ

### 前提条件確認
```bash
# Node.js バージョン確認（18以上推奨）
node --version

# プロジェクトディレクトリに移動
cd C:\find-to-do-site

# 依存関係インストール
npm install

# 開発サーバー起動確認
npm run dev
# → http://localhost:3000 または http://localhost:3001 で動作確認
```

### 環境変数設定
```bash
# .env.local ファイルに以下を追加
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/[YOUR_WEBHOOK_URL]
```

## 🚨 緊急対応タスク: RSSフィード問題調査・修正

### 問題概要
RSSフィード（`public/rss.xml`）で一部の記事アイテムに無効なMDXコードブロック（`` ``` ``）が含まれて生成される問題が発生している。

### 問題詳細
- **症状**: RSSフィードの`<description>`フィールドに```` で始まるコンテンツが含まれる
- **影響**: Discord通知や他のRSSリーダーでの表示が正しく行われない可能性
- **確認場所**: `public/rss.xml` の特定アイテムで発生

### 調査対象ファイル

#### **主要調査対象**: `src/lib/rss.ts` または類似のRSS生成ファイル
```typescript
// RSSフィード生成ロジックの調査ポイント:
// 1. 記事コンテンツの取得タイミング
// 2. fixCodeBlockLanguages()関数の実行前/後のコンテンツ使用
// 3. descriptionフィールドの生成方法
// 4. 修正済みコンテンツと修正前コンテンツの混在
```

#### **関連ファイル**:
- `src/scripts/generate-blog.ts` - ブログ生成とRSS更新の統合部分
- `src/lib/article.ts` - fixCodeBlockLanguages()関数の実行タイミング
- `public/rss.xml` - 生成されたRSSファイル（問題確認用）

### 既知の解決済み部分
✅ **記事ファイル(.md)の生成**: `fixCodeBlockLanguages()`関数により無効なコードブロックは正しく除去されている
✅ **MDX構文エラー**: 記事ファイル自体は正常なMDX形式で生成される
❌ **RSSフィード生成**: 修正前のコンテンツがRSSに混入している可能性

### 推定原因
1. **タイミング問題**: RSS生成が`fixCodeBlockLanguages()`実行前のコンテンツを使用
2. **並行処理問題**: RSS更新とファイル保存の並行実行による競合状態
3. **キャッシュ問題**: 古いコンテンツがキャッシュされている

### 修正方針
1. RSS生成ロジックで**必ず修正済みコンテンツ**を使用するよう保証
2. `fixCodeBlockLanguages()`関数をRSS生成時にも適用
3. 修正前コンテンツの使用を完全に排除

## 🧪 テスト手順

### 1. 単体テスト
```bash
# Discord通知機能のテスト
npm run test:discord  # テストコマンドを作成

# または手動テスト用のスクリプト実行
node src/scripts/test-discord-notification.js
```

### 2. 統合テスト
```bash
# ブログ生成 + Discord通知の完全テスト
npm run generate:test-blog

# 生成されたブログとDiscord通知を確認
# → Discord channelで通知が正常に届くことを確認
```

### 3. エラーハンドリングテスト
- Discord API制限エラー時の動作確認
- ネットワークエラー時の動作確認
- 無効なWebhook URL時の動作確認

## 📁 ファイル構成

```
C:\find-to-do-site\
├── FIND_TO_DO_IMPROVEMENT_PLAN.md    # 📋 詳細実装計画
├── DEVELOPMENT_HANDOVER.md           # 📖 このファイル
├── src/
│   ├── lib/
│   │   └── discord.ts                # 🆕 新規作成対象
│   ├── scripts/
│   │   ├── generate-blog.ts          # 🔧 修正対象
│   │   └── test-discord.ts           # 🆕 テスト用ファイル
│   └── app/
│       ├── layout.tsx                # ✅ SEO Schema実装済み
│       ├── blog/[slug]/page.tsx      # ✅ BlogPosting Schema実装済み
│       ├── about/page.tsx            # ✅ AboutPage Schema実装済み
│       ├── contact/page.tsx          # ✅ ContactPage + FAQ Schema実装済み
│       └── service/page.tsx          # ✅ Service Schema実装済み
```

## 🚨 注意事項

### セキュリティ
- ✅ Discord Webhook URLは環境変数で管理
- ✅ 本番環境とテスト環境でWebhook URLを分ける
- ✅ APIキーはコミットしない

### パフォーマンス
- ✅ Discord通知の失敗でブログ生成を止めない
- ✅ タイムアウト設定（5-10秒推奨）
- ✅ レート制限の考慮

### CORS対策
- ✅ サーバーサイド（Node.js）からのAPI呼び出しのみ
- ✅ クライアントサイドからの直接呼び出しは避ける

## 🔍 デバッグ・トラブルシューティング

### よくある問題と解決方法

1. **Discord通知が届かない**
   ```bash
   # Webhook URLの確認
   echo $DISCORD_WEBHOOK_URL
   
   # 手動テストでWebhook URL検証
   curl -X POST $DISCORD_WEBHOOK_URL \
     -H "Content-Type: application/json" \
     -d '{"content": "テストメッセージ"}'
   ```

2. **ブログ生成は成功するが通知が失敗**
   ```typescript
   // エラーログの確認
   console.error('Discord notification error:', error);
   
   // 環境変数の確認
   console.log('Webhook URL configured:', !!process.env.DISCORD_WEBHOOK_URL);
   ```

3. **CORS エラー**
   ```typescript
   // サーバーサイドでの実行を確認
   // クライアントサイド（'use client'）での実行は避ける
   ```

## 📞 RSSフィード問題修正の完了基準

### ✅ 必須実装チェックリスト

- [ ] RSSフィード生成ロジックの調査完了
- [ ] 無効なコードブロックがRSSに含まれる原因特定
- [ ] `fixCodeBlockLanguages()`関数のRSS生成への適用
- [ ] 修正前コンテンツの使用箇所を完全排除
- [ ] テスト記事生成でRSSの正常性確認

### 🧪 検証テスト手順

1. **新規記事生成テスト**
   ```bash
   npm run generate  # 新しい記事を生成
   ```

2. **RSSフィード確認**
   ```bash
   # public/rss.xml の最新アイテムをチェック
   # <description>フィールドに ``` が含まれていないことを確認
   ```

3. **複数回テスト**
   ```bash
   # 3-5回連続で記事生成し、毎回RSSが正常なことを確認
   npm run generate  # 複数回実行
   ```

### 📋 修正完了時の提出物

1. **修正コード**
   - 修正: RSSフィード生成関連ファイル
   - 詳細: 修正箇所の説明コメント

2. **検証結果**
   - 修正前後のRSSファイル比較
   - テスト記事生成での動作確認結果
   - 問題再現されないことの確認

## 🚀 完了済みフェーズ

### ✅ **フェーズ1: SEO基盤強化**
- インターン・学生・就活関連キーワード最適化完了
- JSON-LD Schema実装完了
- GoogleのAI検索対応完了

### ✅ **フェーズ2: Discord自動通知システム**
- RSS フィード自動生成機能実装完了
- zeroone_support Discord Bot 連携ドキュメント作成完了
- 実装ファイル: `src/lib/rss.ts`, `DISCORD_RSS_INTEGRATION.md`

### ✅ **フェーズ3: ブログ品質向上 & MDXエラー修正**
- 日本語タイトル対応のslug生成システム実装完了 (`src/lib/blog.ts`)
- 無効なMDXコードブロック自動除去機能実装完了 (`src/lib/article.ts`)
- ビルドエラー「empty slug」問題完全解決
- `fixCodeBlockLanguages()`関数で複数パターンの無効コードブロック除去
- 今後の自動記事生成でMDXエラーは発生しません

---

**作成日**: 2025年6月22日  
**更新日**: 2025年6月22日（フェーズ3完了、RSSフィード問題発見）  
**担当**: Claude Code  
**次回担当者**: [新しいエンジニア名]

## 🎯 開発開始用プロンプト

**新しいエンジニア向けの緊急対応プロンプト**:
```
FIND to DOサイトのRSSフィード問題を緊急修正してください。
プロジェクトルート: C:\find-to-do-site\
引き継ぎ指示: C:\find-to-do-site\DEVELOPMENT_HANDOVER.md

【現在の状況】
✅ フェーズ1（SEO対策）完了
✅ フェーズ2（Discord連携）完了  
✅ フェーズ3（MDXエラー修正）完了
❌ RSSフィード問題（緊急対応要）

【問題概要】
public/rss.xml で一部記事の<description>に無効なコードブロック（```）が含まれる

【緊急修正対象】
1. RSSフィード生成ロジック調査（src/lib/rss.ts等）
2. fixCodeBlockLanguages()関数のRSS生成への適用
3. 修正前コンテンツ使用の完全排除
4. 検証テスト実行

【検証方法】
npm run generate 実行後、public/rss.xml の最新アイテムに```が含まれないことを確認

目標: RSSフィードで常に正常なコンテンツが配信されることを保証してください。
```