// src/lib/article.ts
import fs from 'fs';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { generateWithGemini } from './gemini';
import { getExistingSlugs, generateSlug } from './blog';
import { createArticlePrompt } from './prompt';

// 最大試行回数
const MAX_RETRIES = 3;
// 再試行間の待機時間（ミリ秒）
const RETRY_DELAY = 5000;
// トークン量の調整用
const TOKEN_SIZES = [1500, 2000, 2500];

/**
 * AIを使用して記事を生成（エラー処理と再試行機能強化版）
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
      const content = await Promise.race([apiPromise, timeoutPromise]) as string;
      const endTime = Date.now();
      
      console.log(`API呼び出し時間: ${endTime - startTime}ms`);
      
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
export async function saveArticle(title: string, content: string, category: string): Promise<string> {
  // スラグ生成
  let slug = generateSlug(title);
  
  // 既存のスラグとの衝突をチェック
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
    if (!paragraphs[i].startsWith('#') && paragraphs[i].trim().length > 0) {
      excerpt = paragraphs[i].slice(0, 150).trim();
      if (excerpt.length >= 150) excerpt += "...";
      break;
    }
  }
  
  // フロントマターを追加
  const frontMatter = `---
title: "${title}"
date: "${new Date().toISOString()}"
category: "${category}"
slug: "${slug}"
excerpt: "${excerpt}"
---

`;

  const contentWithFrontMatter = frontMatter + content;
  
  // カテゴリのディレクトリを作成
  const contentDir = path.join(process.cwd(), 'content');
  const blogDir = path.join(contentDir, 'blog');
  const categoryDir = path.join(blogDir, category.toLowerCase());
  
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
  
  return filePath;
}