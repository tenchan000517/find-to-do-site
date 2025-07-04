// src/lib/prompt.ts
import { fetchRelatedNews } from './trends';
import { getDayOfWeekString } from './blog';

/**
 * 強化プロンプト生成（新トレンドデータ統合版）
 */
export async function createEnhancedArticlePrompt(
  topic: string, 
  category: string,
  trendData: any[]
): Promise<string> {
  // トレンドデータをコンテキストに変換
  const trendContext = trendData.length > 0 ? 
    `\n\n=== 最新トレンド情報 ===\n` + trendData.map((trend, index) => `
${index + 1}. 【${trend.source}】${trend.title}
   URL: ${trend.url}
   スコア: ${trend.score || trend.likes || 0}ポイント
   トピック: ${trend.topics?.join(', ') || 'なし'}
   説明: ${trend.description || '詳細なトレンド記事'}
  `).join('\n') + '\n=== ここまでトレンド情報 ===\n' : '';

  const dayOfWeek = getDayOfWeekString();

  const prompt = `今日は${dayOfWeek}です。以下の${category}関連の最新トレンド記事を基に、包括的なブログ記事を作成してください。

${trendContext}

あなたは${category}の専門家として、「${topic}」について詳細で実践的なブログ記事を作成してください。上記のトレンド情報を積極的に活用し、読者にとって価値の高い、具体的で実用的な情報を提供することを重視してください。

## トレンドデータ活用指示
- 上記のトレンド記事の具体的な情報を記事内で言及してください
- ソース名（Zenn API、Hacker News等）を記事の権威性向上に活用してください  
- 実際のURL情報を参考情報として活用してください
- スコアの高い記事の内容を重点的に扱ってください

記事は以下の構成でマークダウン形式で書いてください：

## 記事構成
1. **タイトル** (# で始まる見出し) - 読者にとって魅力的で分かりやすいタイトル
2. **自然な導入** (300-400文字) - 読者の関心を引く自然な導入文
3. **現状分析** (## 見出し、800-1000文字) - 上記トレンド情報を基にした現状分析
4. **詳細解説** (## 見出し、1000-1200文字) - 技術的詳細や実践手法の解説  
5. **実践的な活用法** (## 見出し、800-1000文字) - 読者が実際に活用できる具体的方法
6. **将来の展望** (## 見出し、600-800文字) - トレンドから見た今後の方向性
7. **まとめ** (## 見出し、400-500文字) - 要点の振り返りと今後の展望

## 内容の質向上要件
- **トレンド反映**: 提供されたトレンド情報を具体的に記事内で活用
- **具体例の豊富な提供**: 各セクションに実際の事例、数値、具体的な手順を含める
- **段階的な説明**: 初心者から上級者まで理解できるよう、基礎から応用まで段階的に解説
- **実践的な価値**: 読者がすぐに活用できる具体的なテクニック、ツール、方法論を提供
- **最新性の確保**: 2025年時点での最新トレンド、技術、市場動向を反映
- **専門性の向上**: 業界の専門用語を適切に使用し、深い洞察を提供

${getCategorySpecificInstructions(category)}

## 記事作成の詳細指示
- **文字数**: 3000〜5000文字を目標とし、各セクションに十分な内容を含める
- **マークダウン記法**: 見出し、リスト、強調、リンクを効果的に活用
- **読みやすさ**: 段落間の適切な改行、箇条書きの活用で読みやすさを向上
- **SEO対策**: 自然にキーワードを組み込み、検索エンジンに評価されやすい構成
- **トレンド活用**: 「Zenn APIの高品質記事によると...」「最新のGoogle Newsレポートでは...」等の表現を使用

## コードブロックに関する重要な制約
- コードブロックでは必ず以下の言語指定子のみを使用: tsx, ts, js, jsx, javascript, typescript, json, html, css
- その他の言語が必要な場合でも、これらの言語指定子のどれかを使用
- 特に vue, tsxx などの拡張子は使用禁止
- 言語指定子がわからない場合は tsx を使用

## 重要：マークダウン構文の注意事項
- **絶対に記事冒頭にコードブロック（\`\`\`）を挿入しないでください**
- **記事の開始は必ず「# タイトル」で始めてください（コードブロックではありません）**
- 記事全体をコードブロックで囲むことは絶対に禁止です

## 必須要件
- タイトルは必ず # で始まる形式で最初に記述
- 各セクションに具体的な数値、事例、手順を含める
- 読者が実際に行動に移せる具体的なアドバイスを提供
- 専門性と実用性のバランスを保つ
- 記事の最後に必ず「まとめ」セクションで終了（参考情報はシステムが自動追加）
- 提供されたトレンド情報を少なくとも3つ以上記事内で具体的に言及してください
`;

  return prompt;
}

/**
 * 記事生成用のプロンプトを作成（言語指定に関する制約を追加）
 */
export async function createArticlePrompt(topic: string, category: string): Promise<string> {
  // 関連ニュースを取得（最大3件に制限）
  const relatedNews = await fetchRelatedNews(topic, 3);
  
  // 関連ニュースの情報を文字列にまとめる（ソース情報付き）
  let newsContext = '';
  let sourceReferences = '';
  if (relatedNews.length > 0) {
    newsContext = `\n\n関連ニュース情報:\n` + relatedNews.map((news, index) => 
      `${index + 1}. 「${news.title}」(${new Date(news.pubDate).toLocaleDateString('ja-JP')}) - ${news.source}`
    ).join('\n');
    
    // ソース参照セクション用の情報
    sourceReferences = `\n\n参考情報源:\n` + relatedNews.map((news, index) => 
      `[${index + 1}] ${news.title} - ${news.source}${news.link ? `\n    URL: ${news.link}` : ''}`
    ).join('\n') + `\n[検索] Google News検索: ${relatedNews[0]?.searchUrl || 'https://news.google.com/'}`;
  }
  
  // カテゴリ別のプロンプト調整
  const categorySpecificInstructions = getCategorySpecificInstructions(category);
  
  // メインプロンプト（コードブロックの言語指定に関する厳格な制約を追加）
  const prompt = `
あなたは${category}の専門家として、「${topic}」について詳細で実践的なブログ記事を作成してください。読者にとって価値の高い、具体的で実用的な情報を提供することを重視してください。

${newsContext}

記事は以下の構成でマークダウン形式で書いてください：

## 記事構成
1. **タイトル** (# で始まる見出し) - 読者にとって魅力的で分かりやすいタイトル
2. **自然な導入** (300-400文字) - 読者の関心を引く自然な導入文
3. **本文セクション** (## 見出し、各800-1200文字) - トピックに応じた適切な見出しで3-4つのセクション
   - 見出しは内容に応じて自然に決める（「〇〇とは」「〇〇の方法」「〇〇のポイント」など）
   - 具体的な手法、実践例、ケーススタディを含める
4. **まとめ** (## 見出し、400-500文字) - 要点の振り返りと今後の展望
5. **参考情報** (## 見出し) - 必須：記事作成に使用した情報源

## 内容の質向上要件
- **具体例の豊富な提供**: 各セクションに実際の事例、数値、具体的な手順を含める
- **段階的な説明**: 初心者から上級者まで理解できるよう、基礎から応用まで段階的に解説
- **実践的な価値**: 読者がすぐに活用できる具体的なテクニック、ツール、方法論を提供
- **最新性の確保**: 2025年時点での最新トレンド、技術、市場動向を反映
- **専門性の向上**: 業界の専門用語を適切に使用し、深い洞察を提供

${categorySpecificInstructions}

## 記事作成の詳細指示
- **文字数**: 5000〜7000文字を目標とし、各セクションに十分な内容を含める
- **マークダウン記法**: 見出し、リスト、強調、リンクを効果的に活用
- **読みやすさ**: 段落間の適切な改行、箇条書きの活用で読みやすさを向上
- **SEO対策**: 自然にキーワードを組み込み、検索エンジンに評価されやすい構成
- **エンゲージメント**: 読者の興味を引く問いかけや、行動を促す表現を含める

## 記事品質要件
- **自然な文章**: 読みやすく自然な日本語で執筆
- **専門性**: 正確で実用的な情報を提供
- **具体性**: 実例、数値、具体的な手順を含める
- **最新性**: 2025年時点での最新情報を反映

## コードブロックに関する重要な制約
- コードブロックでは必ず以下の言語指定子のみを使用: tsx, ts, js, jsx, javascript, typescript, json, html, css
- その他の言語が必要な場合でも、これらの言語指定子のどれかを使用
- 特に vue, tsxx などの拡張子は使用禁止
- 言語指定子がわからない場合は tsx を使用
- コードブロック形式: \`\`\`tsx コード例 \`\`\`

## 重要：マークダウン構文の注意事項
- **絶対に記事冒頭にコードブロック（\`\`\`）を挿入しないでください**
- フロントマター（---）の直後は必ず空行を1行入れてからタイトル（#）を記述してください
- 記事全体をコードブロックで囲むことは絶対に禁止です
- コードブロックは技術的なコード例を示す場合のみ使用してください
- **記事の開始は必ず「# タイトル」で始めてください（コードブロックではありません）**

## 必須要件
- タイトルは必ず # で始まる形式で最初に記述
- 各セクションに具体的な数値、事例、手順を含める
- 読者が実際に行動に移せる具体的なアドバイスを提供
- 専門性と実用性のバランスを保つ
- 記事の最後に必ず「参考文献・情報源」セクションを含める

## 重要な注意事項
- 記事は「まとめ」セクションで終了し、参考情報セクションはシステムが自動追加します
- タイトルは魅力的で分かりやすく、過度なSEOを意識しすぎないようにしてください
- 文章は自然で読みやすく、実用的な内容にしてください
`;

  return prompt;
}

/**
 * カテゴリ別の特別な指示を取得
 */
function getCategorySpecificInstructions(category: string): string {
  const instructions: Record<string, string> = {
    'プログラミング': `
## プログラミング特化の追加要件
- **実装詳細**: 完全動作するコードサンプルを複数パターン提供（初級・中級・上級レベル）
- **言語指定**: tsx, ts, js, jsx, javascript, typescript, json, html, css のいずれかを使用
- **アーキテクチャ解説**: 設計パターン、ベストプラクティス、アンチパターンの具体例
- **パフォーマンス**: 実行速度、メモリ使用量、スケーラビリティの観点から分析
- **最新技術**: 2025年の最新ライブラリ、フレームワーク、言語機能を詳細解説
- **実践演習**: 読者が実際に試せるハンズオン形式の課題を含める`,

    'ウェブ開発': `
## ウェブ開発特化の追加要件
- **フルスタック視点**: フロントエンド、バックエンド、インフラの包括的解説
- **言語指定**: tsx, ts, js, jsx, javascript, typescript, json, html, css のいずれかを使用
- **レスポンシブ設計**: モバイル、タブレット、デスクトップ対応の具体的実装例
- **パフォーマンス最適化**: Core Web Vitals、読み込み速度、UX改善の具体的手法
- **セキュリティ**: HTTPS、CSP、XSS対策などの実装詳細
- **アクセシビリティ**: WCAG準拠の具体的実装とテスト方法`,

    'AI技術': `
## AI技術特化の追加要件
- **技術深掘り**: アルゴリズム、モデル構造、学習プロセスの詳細解説
- **コード例**: 必要に応じてAPI統合や実装例を含める（tsx, ts, js, jsx, javascript, typescript, jsonを使用）
- **ユースケース**: 業界別・用途別の具体的活用事例
- **効果測定**: ROI、精度、効率化効果の定量的評価手法
- **倫理・法的観点**: AI利用における責任、プライバシー、規制対応の解説`,

    'キャリア': `
## キャリア特化の追加要件
- **成功事例詳細**: 具体的な転職・昇進事例（年収、ポジション、スキル変遷）
- **スキルマップ**: 職種別・レベル別の必要スキルと習得ロードマップ
- **市場分析**: 求人動向、給与相場、将来性の定量的データ
- **面接対策**: 技術面接、行動面接の具体的質問例と回答戦略
- **ネットワーキング**: 業界人脈構築の具体的手法とイベント活用法
- **継続学習**: 最新技術キャッチアップの効率的な方法論
- **コード不要**: キャリア関連記事ではコード例は省略し、実用的なアドバイスに集中`,

    'ビジネス': `
## ビジネス特化の追加要件
- **事例分析**: 成功・失敗事例の詳細分析（数値、戦略、結果の因果関係）
- **データドリブン**: KPI、ROI、成長率等の具体的数値とその解釈
- **戦略フレームワーク**: SWOT、5Forces、バリューチェーン等の実践的活用法
- **市場動向**: 業界トレンド、競合分析、機会・脅威の詳細評価
- **実行計画**: 戦略を実際のアクションに落とし込む具体的ステップ
- **リスク管理**: 想定リスクと対策、コンティンジェンシープランの策定法
- **コード不要**: ビジネス関連記事ではコード例は省略し、実務的なソリューションに集中`,
  };
  
  return instructions[category] || instructions['プログラミング'];
}