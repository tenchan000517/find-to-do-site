// src/lib/prompt.ts
import { fetchRelatedNews } from './trends';

/**
 * 記事生成用のプロンプトを作成
 */
export async function createArticlePrompt(topic: string, category: string): Promise<string> {
  // 関連ニュースを取得（オプション）
  const relatedNews = await fetchRelatedNews(topic, 3);
  
  // 関連ニュースの情報を文字列にまとめる
  let newsContext = '';
  if (relatedNews.length > 0) {
    newsContext = `\n\n関連ニュース情報:\n` + relatedNews.map((news, index) => 
      `${index + 1}. 「${news.title}」(${new Date(news.pubDate).toLocaleDateString('ja-JP')})`
    ).join('\n');
  }
  
  // カテゴリ別のプロンプト調整
  const categorySpecificInstructions = getCategorySpecificInstructions(category);
  
  // メインプロンプト
  const prompt = `
あなたは${category}の専門家で、最新トレンドに精通したテックブロガーです。
「${topic}」についての情報価値の高いブログ記事を作成してください。

${newsContext}

記事は以下の形式でマークダウン形式で書いてください：
1. タイトル (# で始まる見出し、SEOに最適化された魅力的なタイトル)
2. 導入部 (なぜこのトピックが今重要か、読者の興味を引く書き出し)
3. 主要なポイント (## で始まる見出し、3-5つの重要なセクション)
4. 実用的な例やコード例 (### で始まる小見出し)
5. まとめと次のステップ

${categorySpecificInstructions}

追加の指示:
- マークダウン記法を使って読みやすく構造化してください
- 実践的で価値のある情報を含めてください
- 読者が実際に行動できる具体的なステップを含めてください
- SEO最適化されたコンテンツを作成してください
- 記事の長さは約2000〜3000文字にしてください
- 最新の情報（2025年4月時点）を反映させてください

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
- 具体的なコードサンプル（できればTypeScriptまたはNext.js）を含めてください
- コードの説明と実装のポイントを詳しく解説してください
- バグや一般的な問題の回避方法についても触れてください
- 最新のライブラリやフレームワークのバージョンを参照してください（Next.js 15、React 9など）`,

    'ウェブ開発': `
- 実践的なHTMLやCSS、JavaScript例を含めてください
- パフォーマンス最適化やアクセシビリティについても言及してください
- モバイルファーストの考え方を取り入れてください
- 最新のブラウザAPIやCSSプロパティを使用したテクニックを紹介してください`,

    'AI技術': `
- 実際の実装例やユースケースを詳しく説明してください
- AIモデルの選択基準や比較についても触れてください
- コスト効率や倫理的側面についても言及してください
- Gemini APIやその他のAIサービスの具体的な利用方法を含めてください`,

    'キャリア': `
- 具体的な成功事例や経験談を含めてください
- スキルアップのための具体的なステップを示してください
- 業界動向や求人市場の分析を含めてください
- 読者が明日から実践できるアドバイスを提供してください`,

    'ビジネス': `
- 成功企業の事例分析を含めてください
- 具体的な数字やデータで裏付けてください
- 実践的なビジネス戦略やフレームワークを紹介してください
- 市場分析と今後の展望についても触れてください`,
  };
  
  return instructions[category] || instructions['プログラミング'];
}