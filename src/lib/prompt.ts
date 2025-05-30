// src/lib/prompt.ts
import { fetchRelatedNews } from './trends';

/**
 * 記事生成用のプロンプトを作成（言語指定に関する制約を追加）
 */
export async function createArticlePrompt(topic: string, category: string): Promise<string> {
  // 関連ニュースを取得（最大2件に制限）
  const relatedNews = await fetchRelatedNews(topic, 2);
  
  // 関連ニュースの情報を文字列にまとめる
  let newsContext = '';
  if (relatedNews.length > 0) {
    newsContext = `\n\n関連ニュース情報:\n` + relatedNews.map((news, index) => 
      `${index + 1}. 「${news.title}」(${new Date(news.pubDate).toLocaleDateString('ja-JP')})`
    ).join('\n');
  }
  
  // カテゴリ別のプロンプト調整
  const categorySpecificInstructions = getCategorySpecificInstructions(category);
  
  // メインプロンプト（コードブロックの言語指定に関する厳格な制約を追加）
  const prompt = `
あなたは${category}の専門家です。「${topic}」について簡潔なブログ記事を作成してください。

${newsContext}

記事は以下の形式でマークダウン形式で書いてください：
1. タイトル (# で始まる見出し)
2. 導入部 (簡潔に)
3. 主要なポイント (## で始まる見出し、2-3つの重要なセクション)
4. まとめ

${categorySpecificInstructions}

追加の指示:
- マークダウン記法を使用
- 記事の長さは約3000〜4000文字にしてください
- 2025年4月時点の最新情報を反映

コードブロックに関する重要な制約:
- コードブロックでは必ず以下の言語指定子のみを使用してください: tsx, ts, js, jsx, javascript, typescript, json, html, css
- その他の言語が必要な場合でも、これらの言語指定子のどれかを使用してください
- 特に vue, tsxx などの拡張子は使用しないでください
- 言語指定子がわからない場合は tsx を使用してください
- 以下のような形式でコードブロックを記述してください:
  \`\`\`tsx
  // コード例
  \`\`\`

重要: タイトルは必ず # で始まる形式で最初に書いてください。
`;

  return prompt;
}

/**
 * カテゴリ別の特別な指示を取得
 */
function getCategorySpecificInstructions(category: string): string {
  const instructions: Record<string, string> = {
    'プログラミング': `
- コードサンプルは必ず tsx, ts, js, jsx, javascript, typescript, json, html, css のいずれかの言語指定子を使用してください
- コード例は簡潔に
- 主要な実装ポイントのみ説明
- 最新ライブラリのバージョンに言及`,

    'ウェブ開発': `
- コードサンプルは必ず tsx, ts, js, jsx, javascript, typescript, json, html, css のいずれかの言語指定子を使用してください
- 簡潔な実装例
- 重要なパフォーマンスポイントのみ言及
- モバイル対応の基本要素`,

    'AI技術': `
- コード例を含める場合は必ず tsx, ts, js, jsx, javascript, typescript, json のいずれかの言語指定子を使用してください
- 主要なユースケースに絞って説明
- AIモデル選択の重要点のみ
- Gemini APIの基本的な使用方法`,

    'キャリア': `
- 成功事例を簡潔に
- 主要なスキルアップ方法
- 現在の業界動向の要点`,

    'ビジネス': `
- 1-2の事例に絞る
- 重要なデータポイントのみ
- 主要な戦略の要点`,
  };
  
  return instructions[category] || instructions['プログラミング'];
}