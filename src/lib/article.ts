// src/lib/article.ts
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { generateWithGemini } from './gemini';
import { getExistingSlugs, generateSlug } from './blog';
import { createArticlePrompt } from './prompt';
import { fetchRelatedNews, fetchRelatedNewsFromTrends } from './trends';

// 最大試行回数
const MAX_RETRIES = 3;
// 再試行間の待機時間（ミリ秒）
const RETRY_DELAY = 5000;
// トークン量の調整用
const TOKEN_SIZES = [3500, 4000, 4500, 6000];

/**
 * カテゴリ名を英語ディレクトリ名にマッピング
 */
function getCategoryDirectoryName(category: string): string {
  const categoryMapping: Record<string, string> = {
    'プログラミング': 'programming',
    'ウェブ開発': 'web-development', 
    'AI技術': 'ai-technology',
    'キャリア': 'career',
    'ビジネス': 'business'
  };
  
  return categoryMapping[category] || category.toLowerCase().replace(/[\s　]+/g, '-');
}

/**
 * 参考情報セクションを生成する（改善版）
 */
async function generateSourceReferences(topic: string, category: string): Promise<string> {
  const MAX_RETRIES = 3;
  let lastError = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`🔗 参考情報セクション生成開始 (試行 ${attempt}/${MAX_RETRIES}):`, topic);
      
      // 🆕 新システム: トレンドベースの関連ニュース取得を優先
      let relatedNews = await fetchRelatedNewsFromTrends(topic, 5);
      
      // フォールバック1: 通常のニュース検索
      if (relatedNews.length === 0) {
        console.log('🔄 トレンドベース取得失敗、従来方式にフォールバック');
        relatedNews = await fetchRelatedNews(topic, 5);
      }
      
      // フォールバック2: 短縮されたトピックで再試行
      if (relatedNews.length === 0 && topic.length > 20) {
        const shortTopic = topic.split(/[：:・を]/)[0].trim();
        console.log(`🔄 短縮トピック再試行: "${shortTopic}"`);
        relatedNews = await fetchRelatedNews(shortTopic, 5);
      }
      
      // 品質フィルタリング: 実在URLのみ選択
      const qualityNews = relatedNews.filter(news => {
        const link = (news.link || '').trim();
        return link && 
               link.startsWith('http') && 
               !link.includes('example.com') &&
               !link.includes('localhost') &&
               news.title && 
               news.title.length > 10;
      });
      
      console.log(`✅ 品質フィルタ後: ${qualityNews.length}件 (元: ${relatedNews.length}件)`);
      
      // 最低3件確保できた場合のみ続行
      if (qualityNews.length >= 3) {
        let references = '本記事の作成にあたり、以下の情報源を参考にしました：\n\n';
        
        qualityNews.slice(0, 5).forEach((news, index) => {
          try {
            // 各フィールドを安全に処理
            const title = news.title.trim();
            const source = (news.source || 'Google News').trim();
            const pubDate = news.pubDate ? new Date(news.pubDate).toLocaleDateString('ja-JP') : '日付不明';
            const link = news.link.trim();
            
            references += `${index + 1}. **${title}**\n`;
            references += `   ソース: ${source}\n`;
            references += `   日付: ${pubDate}\n`;
            references += `   URL: ${link}\n`;
            
            // トレンドスコアがある場合は表示
            if (news.trendScore) {
              references += `   評価: ${news.trendScore}ポイント\n`;
            }
            
            references += '\n';
          } catch (newsError) {
            console.error('ニュースアイテム処理エラー:', newsError);
            references += `${index + 1}. 情報源処理エラー\n\n`;
          }
        });
        
        references += '\n*※ 本記事の情報は執筆時点でのものであり、最新の情報については各公式サイトをご確認ください。*';
        
        console.log('🔗 参考情報セクション生成完了');
        return references;
      }
      
      // 品質基準を満たさない場合はリトライ
      if (attempt < MAX_RETRIES) {
        console.log(`⚠️ 品質基準未達成 (${qualityNews.length}件)、${2000}ms後に再試行...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      lastError = error;
      console.error(`参考情報取得エラー (試行 ${attempt}):`, error);
      
      if (attempt < MAX_RETRIES) {
        console.log(`${1000 * attempt}ms後に再試行...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  
  // 全ての試行が失敗した場合はフォールバック
  console.log('📝 全試行失敗、カテゴリ別フォールバックを使用');
  console.error('最終エラー:', lastError);
  return generateCategorySpecificFallback(category);
}

/**
 * カテゴリ別フォールバック情報生成
 */
function generateCategorySpecificFallback(category: string): string {
  const categoryFallbacks: Record<string, string> = {
    'プログラミング': `本記事は最新のプログラミング技術動向と一般的な開発知識に基づいて作成しています。

参考となる情報源：
1. **MDN Web Docs** - Mozilla Developer Network
   URL: https://developer.mozilla.org/
2. **Stack Overflow** - 開発者コミュニティ
   URL: https://stackoverflow.com/
3. **GitHub** - オープンソースプロジェクト
   URL: https://github.com/

*※本記事の情報は執筆時点でのものであり、最新の情報については各公式ドキュメントをご確認ください。*`,

    'AI技術': `本記事は最新のAI・機械学習技術動向と研究情報に基づいて作成しています。

参考となる情報源：
1. **OpenAI Research** - AI研究の最前線
   URL: https://openai.com/research/
2. **Hugging Face** - AI/MLコミュニティ
   URL: https://huggingface.co/
3. **Papers with Code** - 論文と実装
   URL: https://paperswithcode.com/

*※本記事の情報は執筆時点でのものであり、最新の研究動向については各機関の公式発表をご確認ください。*`,

    'ウェブ開発': `本記事は最新のウェブ開発技術動向と業界標準に基づいて作成しています。

参考となる情報源：
1. **Web.dev** - Google Web Fundamentals
   URL: https://web.dev/
2. **Can I Use** - ブラウザ対応状況
   URL: https://caniuse.com/
3. **W3C Standards** - Web標準仕様
   URL: https://www.w3.org/standards/

*※本記事の情報は執筆時点でのものであり、最新のブラウザ対応状況については各仕様書をご確認ください。*`,

    'キャリア': `本記事は最新の転職・キャリア市場動向と業界情報に基づいて作成しています。

参考となる情報源：
1. **厚生労働省** - 雇用統計・労働市場データ
   URL: https://www.mhlw.go.jp/
2. **リクルート キャリア総研** - 転職市場レポート
   URL: https://www.recruit-career.co.jp/
3. **経済産業省** - IT人材需給予測
   URL: https://www.meti.go.jp/

*※本記事の情報は執筆時点でのものであり、最新の市場動向については各機関の公式発表をご確認ください。*`,

    'ビジネス': `本記事は最新のビジネス動向と市場分析に基づいて作成しています。

参考となる情報源：
1. **日本経済新聞** - 経済・ビジネス情報
   URL: https://www.nikkei.com/
2. **東洋経済オンライン** - ビジネス分析
   URL: https://toyokeizai.net/
3. **総務省統計局** - 経済統計データ
   URL: https://www.stat.go.jp/

*※本記事の情報は執筆時点でのものであり、最新の市場情報については各機関の公式発表をご確認ください。*`
  };

  return categoryFallbacks[category] || categoryFallbacks['プログラミング'];
}

/**
 * SEO用のキーワードを抽出する
 */
function extractKeywords(title: string, _content: string, category: string): string[] {
  const keywords: string[] = [];
  
  // カテゴリベースのキーワード
  const categoryKeywords: Record<string, string[]> = {
    'プログラミング': ['プログラミング', 'コード', '開発', 'エンジニア', 'ソフトウェア'],
    'ウェブ開発': ['ウェブ開発', 'フロントエンド', 'バックエンド', 'レスポンシブ', 'HTML', 'CSS', 'JavaScript'],
    'AI技術': ['AI', '人工知能', '機械学習', 'ディープラーニング', 'データサイエンス'],
    'キャリア': ['キャリア', '転職', 'スキルアップ', '年収', '面接'],
    'ビジネス': ['ビジネス', 'スタートアップ', '戦略', 'マーケティング', 'ROI']
  };
  
  // カテゴリキーワードを追加
  if (categoryKeywords[category]) {
    keywords.push(...categoryKeywords[category]);
  }
  
  // タイトルから重要なキーワードを抽出（簡易版）
  const titleWords = title.split(/[\s\u3000\-\[\]【】（）()]+/).filter(word => 
    word.length > 2 && !['の', 'に', 'は', 'を', 'が', 'で', 'と', 'から', 'より'].includes(word)
  );
  
  keywords.push(...titleWords.slice(0, 5)); // 最大5個
  
  return Array.from(new Set(keywords)); // 重複を除去
}

/**
 * コードブロックの言語指定子を修正する
 * ビルドエラーの原因となる無効な言語指定子を検出して修正します
 */
function fixCodeBlockLanguages(content: string): string {
  // 修正処理
  let fixedContent = content;
  
  // 最重要：記事冒頭の無効なコードブロックを完全に除去
  // パターン1: ```\n# タイトル で始まる場合
  if (fixedContent.match(/^```\s*\n# /)) {
    fixedContent = fixedContent.replace(/^```\s*\n(# .*)/, '$1');
  }
  
  // パターン2: ```\n で始まって、最後に ``` で終わる場合（記事全体がコードブロック）
  if (fixedContent.match(/^```\s*\n/) && fixedContent.match(/\n```\s*$/)) {
    fixedContent = fixedContent.replace(/^```\s*\n([\s\S]*?)\n```\s*$/, '$1');
  }
  
  // パターン3: 単純に ```\n で始まる場合
  if (fixedContent.match(/^```\s*\n/)) {
    fixedContent = fixedContent.replace(/^```\s*\n/, '');
  }
  
  // パターン4: 末尾の ```\n を除去
  if (fixedContent.match(/\n```\s*$/)) {
    fixedContent = fixedContent.replace(/\n```\s*$/, '');
  }
  
  // 安全に使用できる言語指定子のリスト
  const safeLanguages = [
    'tsx', 'ts', 'jsx', 'js', 'javascript', 'typescript',
    'json', 'html', 'css', 'markdown', 'md', 'bash', 'sh'
  ];
  
  // 無効な言語指定子のリスト（問題を起こしやすいもの）
  const invalidLanguages = ['tsxx', 'vue', 'typescriptx', 'javascriptx', 'ts-x', 'js-x', 'python', 'py'];
  
  // 既知の無効な言語指定子を直接置換
  invalidLanguages.forEach(lang => {
    const regex = new RegExp("```" + lang + "\\b", "g");
    fixedContent = fixedContent.replace(regex, "```tsx");
  });
  
  // 言語未指定のコードブロックをtsxに変換
  fixedContent = fixedContent.replace(/```(?!\w)/g, "```tsx");
  
  // 安全でない可能性のある言語指定子をすべてtsxに置換
  const codeBlockRegex = /```(\w+)/g;
  let match;
  const contentCopy = fixedContent;
  
  while ((match = codeBlockRegex.exec(contentCopy)) !== null) {
    const [, language] = match;
    if (!safeLanguages.includes(language.toLowerCase())) {
      fixedContent = fixedContent.replace(
        new RegExp("```" + language + "\\b", "g"), 
        "```tsx"
      );
    }
  }
  
  // コードブロックの終了タグに付いた言語指定子を削除
  fixedContent = fixedContent.replace(/```(\w+)$/gm, '```');
  
  return fixedContent;
}

/**
 * AIを使用して記事を生成（エラー処理と再試行機能強化版）
 */
/**
 * 強化記事生成（新トレンドデータ対応版）
 */
export async function generateEnhancedArticle(
  topic: string, 
  category: string,
  trendData: any[] = []
): Promise<{ title: string, content: string }> {
  let lastError = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`強化記事生成試行 ${attempt}/${MAX_RETRIES} (トレンド: ${trendData.length}件)`);
      
      // 強化プロンプトを生成
      const { createEnhancedArticlePrompt } = await import('./prompt');
      const prompt = await createEnhancedArticlePrompt(topic, category, trendData);
      console.log(`強化プロンプト長: ${prompt.length}文字`);
      
      // 各試行でトークン数を調整
      const maxOutputTokens = TOKEN_SIZES[attempt - 1] || TOKEN_SIZES[TOKEN_SIZES.length - 1];
      console.log(`出力トークン上限: ${maxOutputTokens}`);
      
      // 環境変数からAPIキーを取得
      const apiKey = process.env.GEMINI_API_KEY;
      
      // タイムアウト設定付きでGemini API呼び出し
      const timeout = 45000; // 45秒
      
      // タイムアウトPromiseを作成
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('API_TIMEOUT')), timeout);
      });
      
      // API呼び出しPromise
      const apiPromise = generateWithGemini(prompt, { maxOutputTokens }, apiKey);
      
      // Promise.raceでタイムアウト処理
      const startTime = Date.now();
      const rawContent = await Promise.race([apiPromise, timeoutPromise]) as string;
      const endTime = Date.now();
      
      console.log(`API呼び出し時間: ${endTime - startTime}ms`);
      
      // コードブロックの言語指定子を修正
      const content = fixCodeBlockLanguages(rawContent);
      
      // タイトルを抽出（最初の# で始まる行）
      const titleMatch = content.match(/^# (.+)$/m);
      if (!titleMatch) {
        console.warn('タイトルが見つかりませんでした。トピックをタイトルとして使用します。');
      }
      const title = titleMatch ? titleMatch[1] : topic;
      
      console.log(`タイトル: ${title}`);
      console.log(`生成された記事の長さ: ${content.length}文字`);
      console.log(`トレンドデータ活用: ${trendData.length}件`);
      
      return { title, content };
    } catch (error: any) {
      lastError = error;
      
      // エラー処理（既存と同じ）
      let errorType = 'unknown';
      let errorMessage = error.message || '不明なエラー';
      
      if (errorMessage === 'API_TIMEOUT') {
        errorType = 'timeout';
        console.error(`[${errorType}] APIがタイムアウトしました。プロンプトが長すぎるか、サーバーが応答していません。`);
      } else if (error.status === 429 || errorMessage.includes('rate') || errorMessage.includes('quota')) {
        errorType = 'rate_limit';
        console.error(`[${errorType}] API制限に達しました。しばらく待ってから再試行してください。`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * 3));
      } else if (error.status === 401 || errorMessage.includes('auth') || errorMessage.includes('key')) {
        errorType = 'auth';
        console.error(`[${errorType}] 認証エラー: APIキーが無効または期限切れです。`);
        break;
      } else if (errorMessage.includes('fetch')) {
        errorType = 'network';
        console.error(`[${errorType}] ネットワークエラー: APIサーバーに接続できません。インターネット接続を確認してください。`);
      } else {
        console.error(`[${errorType}] エラー: ${errorMessage}`);
      }
      
      console.error(`詳細: ${JSON.stringify(error, null, 2)}`);
      
      if (attempt < MAX_RETRIES && errorType !== 'auth') {
        console.log(`${RETRY_DELAY/1000}秒後に再試行します (${attempt}/${MAX_RETRIES})...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  // すべての試行が失敗した場合
  throw new Error(`強化記事生成に失敗しました。${MAX_RETRIES}回試行しましたが成功しませんでした。最後のエラー: ${lastError?.message || '不明なエラー'}`);
}

/**
 * 既存の記事生成（フォールバック用）
 */
export async function generateArticle(topic: string, category: string): Promise<{ title: string, content: string }> {
  let lastError = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`記事生成試行 ${attempt}/${MAX_RETRIES}`);
      
      // 高度なプロンプトを生成
      const prompt = await createArticlePrompt(topic, category);
      console.log(`プロンプト長: ${prompt.length}文字`);
      
      // 各試行でトークン数を調整
      const maxOutputTokens = TOKEN_SIZES[attempt - 1] || TOKEN_SIZES[TOKEN_SIZES.length - 1];
      console.log(`出力トークン上限: ${maxOutputTokens}`);
      
      // 環境変数からAPIキーを取得
      const apiKey = process.env.GEMINI_API_KEY;
      
      // タイムアウト設定付きでGemini API呼び出し
      const timeout = 45000; // 45秒
      
      // タイムアウトPromiseを作成
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('API_TIMEOUT')), timeout);
      });
      
      // API呼び出しPromise
      const apiPromise = generateWithGemini(prompt, { maxOutputTokens }, apiKey);
      
      // Promise.raceでタイムアウト処理（型アサーションを追加）
      const startTime = Date.now();
      const rawContent = await Promise.race([apiPromise, timeoutPromise]) as string;
      const endTime = Date.now();
      
      console.log(`API呼び出し時間: ${endTime - startTime}ms`);
      
      // コードブロックの言語指定子を修正
      const content = fixCodeBlockLanguages(rawContent);
      
      // タイトルを抽出（最初の# で始まる行）
      const titleMatch = content.match(/^# (.+)$/m);
      if (!titleMatch) {
        console.warn('タイトルが見つかりませんでした。トピックをタイトルとして使用します。');
      }
      const title = titleMatch ? titleMatch[1] : topic;
      
      console.log(`タイトル: ${title}`);
      console.log(`生成された記事の長さ: ${content.length}文字`);
      
      return { title, content };
    } catch (error: any) {
      lastError = error;
      
      // エラーの種類を判別して適切なメッセージを表示
      let errorType = 'unknown';
      let errorMessage = error.message || '不明なエラー';
      
      if (errorMessage === 'API_TIMEOUT') {
        errorType = 'timeout';
        console.error(`[${errorType}] APIがタイムアウトしました。プロンプトが長すぎるか、サーバーが応答していません。`);
      } else if (error.status === 429 || errorMessage.includes('rate') || errorMessage.includes('quota')) {
        errorType = 'rate_limit';
        console.error(`[${errorType}] API制限に達しました。しばらく待ってから再試行してください。`);
        // API制限の場合は長めに待機
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * 3));
      } else if (error.status === 401 || errorMessage.includes('auth') || errorMessage.includes('key')) {
        errorType = 'auth';
        console.error(`[${errorType}] 認証エラー: APIキーが無効または期限切れです。`);
        // 認証エラーはリトライしても解決しないので終了
        break;
      } else if (errorMessage.includes('fetch')) {
        errorType = 'network';
        console.error(`[${errorType}] ネットワークエラー: APIサーバーに接続できません。インターネット接続を確認してください。`);
      } else {
        console.error(`[${errorType}] エラー: ${errorMessage}`);
      }
      
      // デバッグ情報
      console.error(`詳細: ${JSON.stringify(error, null, 2)}`);
      
      if (attempt < MAX_RETRIES && errorType !== 'auth') {
        console.log(`${RETRY_DELAY/1000}秒後に再試行します (${attempt}/${MAX_RETRIES})...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  // すべての試行が失敗した場合
  throw new Error(`記事生成に失敗しました。${MAX_RETRIES}回試行しましたが成功しませんでした。最後のエラー: ${lastError?.message || '不明なエラー'}`);
}

/**
 * 生成した記事をファイルに保存
 */
export async function saveArticle(title: string, content: string, category: string, topic?: string): Promise<{ filePath: string; actualSlug: string }> {
  // スラグ生成
  let slug = generateSlug(title);
  
  // 既存のスラグとの衝突をチェック - 必要なパラメータを渡す
  const existingSlugs = getExistingSlugs();
  if (existingSlugs.includes(slug)) {
    // スラグが既に存在する場合、日付を追加して一意にする
    const timestamp = Date.now();
    slug = `${slug}-${timestamp}`;
  }
    
  // ファイル名に日付を追加
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const fileName = `${date}-${slug}.md`;
  
  // 最初の段落を抽出してexcerptに使用
  let excerpt = "";
  const paragraphs = content.split('\n\n');
  // タイトル行をスキップして最初の実際の段落を取得
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();
    if (!paragraph.startsWith('#') && 
        !paragraph.startsWith('```') && 
        !paragraph.startsWith('**') &&
        paragraph.length > 20) {
      
      // マークダウン記法を除去してプレーンテキストにする
      excerpt = paragraph
        .replace(/```[\s\S]*?```/g, '') // コードブロック除去
        .replace(/`([^`]+)`/g, '$1') // インラインコード除去
        .replace(/\*\*([^*]+)\*\*/g, '$1') // 太字除去
        .replace(/\*([^*]+)\*/g, '$1') // 斜体除去
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // リンク除去
        .slice(0, 150).trim();
      if (excerpt.length >= 150) excerpt += "...";
      break;
    }
  }
  
  // コードブロックの言語指定子を最終確認（ファイル保存前の安全対策）
  let fixedContent = fixCodeBlockLanguages(content);
  
  // 参考情報セクションを自動追加（システム側で確実に生成）
  if (topic) {
    try {
      const sourceReferences = await generateSourceReferences(topic, category);
      if (sourceReferences && sourceReferences.trim() && !fixedContent.includes('## 参考情報')) {
        fixedContent += '\n\n## 参考情報\n\n' + sourceReferences;
        console.log('参考情報セクションを追加しました');
      }
    } catch (refError) {
      console.error('参考情報セクション追加エラー:', refError);
      // エラー時でもフォールバック情報を追加
      fixedContent += '\n\n## 参考情報\n\n本記事は最新の業界情報と一般的な知識に基づいて作成しています。';
    }
  }
  
  // SEO用のキーワード抽出（簡易版）
  const keywords = extractKeywords(title, content, category);
  
  // 文字数を計算
  const wordCount = fixedContent.length;
  
  // 読了時間を推定（日本語：600文字/分）
  const readingTime = Math.ceil(wordCount / 600);
  
  // フロントマターを追加（シンプル版）
  const frontMatter = `---
title: "${title}"
date: "${new Date().toISOString()}"
category: "${category}"
slug: "${slug}"
excerpt: "${excerpt}"
keywords: ${JSON.stringify(keywords)}
wordCount: ${wordCount}
readingTime: ${readingTime}
author: "FIND to DO編集部"
---

`;

  const contentWithFrontMatter = frontMatter + fixedContent;
  
  // カテゴリのディレクトリを作成（英語名を使用）
  const contentDir = path.join(process.cwd(), 'content');
  const blogDir = path.join(contentDir, 'blog');
  const categoryDirName = getCategoryDirectoryName(category);
  const categoryDir = path.join(blogDir, categoryDirName);
  
  // ディレクトリが存在しない場合は作成
  try {
    await mkdir(contentDir, { recursive: true });
    await mkdir(blogDir, { recursive: true });
    await mkdir(categoryDir, { recursive: true });
  } catch (error) {
    console.error('ディレクトリ作成中にエラーが発生しました:', error);
    // 既に存在する場合は問題なし
  }
  
  // ファイルに保存
  const filePath = path.join(categoryDir, fileName);
  await writeFile(filePath, contentWithFrontMatter, 'utf8');
  console.log(`ファイルを保存しました: ${filePath}`);
  
  return { filePath, actualSlug: slug };
}