// scripts/generate-blog.ts
import fs from 'fs';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { generateWithGemini } from '@/lib/gemini';
import { CATEGORIES, getTrendingTopics, getExistingSlugs, generateSlug } from '@/lib/blog';
import * as dotenv from 'dotenv';
import { createArticlePrompt } from '@/lib/prompt';
import { generateArticle, saveArticle } from '@/lib/article';

// .env.localファイルを明示的に読み込む
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
console.log('環境変数読み込み完了。GEMINI_API_KEY存在:', !!process.env.GEMINI_API_KEY);


// /**
//  * AIを使用して記事を生成
//  */
// async function generateArticle(topic: string, category: string): Promise<{ title: string, content: string }> {
//     // 高度なプロンプトを生成
//     const prompt = await createArticlePrompt(topic, category);

//     // 環境変数からAPIキーを取得
//     const apiKey = process.env.GEMINI_API_KEY;
//     console.log('generateArticle内でのGEMINI_API_KEY存在:', !!apiKey);

//     // Gemini APIで記事を生成（APIキーを直接渡す）
//     const content = await generateWithGemini(prompt, {}, apiKey);

//     // タイトルを抽出（最初の# で始まる行）
//     const titleMatch = content.match(/^# (.+)$/m);
//     const title = titleMatch ? titleMatch[1] : topic;

//     return { title, content };
// }

/**
 * 生成した記事をファイルに保存
 */
// async function saveArticle(title: string, content: string, category: string): Promise<string> {
//     // スラグ生成
//     let slug = generateSlug(title);

//     // 既存のスラグとの衝突をチェック
//     const existingSlugs = getExistingSlugs();
//     if (existingSlugs.includes(slug)) {
//         // スラグが既に存在する場合、日付を追加して一意にする
//         const timestamp = Date.now();
//         slug = `${slug}-${timestamp}`;
//     }

//     // ファイル名に日付を追加
//     const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
//     const fileName = `${date}-${slug}.md`;

//     // フロントマターを追加
//     const frontMatter = `---
// title: "${title}"
// date: "${new Date().toISOString()}"
// category: "${category}"
// slug: "${slug}"
// excerpt: "${content.split('\n\n')[1]?.slice(0, 150)?.trim()}..."
// ---

// `;

//     const contentWithFrontMatter = frontMatter + content;

//     // カテゴリのディレクトリを作成
//     const contentDir = path.join(process.cwd(), 'content');
//     const blogDir = path.join(contentDir, 'blog');
//     const categoryDir = path.join(blogDir, category.toLowerCase());

//     // ディレクトリが存在しない場合は作成
//     await mkdir(contentDir, { recursive: true });
//     await mkdir(blogDir, { recursive: true });
//     await mkdir(categoryDir, { recursive: true });

//     // ファイルに保存
//     const filePath = path.join(categoryDir, fileName);
//     await writeFile(filePath, contentWithFrontMatter, 'utf8');

//     return filePath;
// }

/**
 * メイン実行関数
 */
async function main() {
    try {
      // 今日の日付を取得
      const today = new Date();
      console.log(`${today.toISOString()} - ブログ記事生成開始`);
      
      // ランダムにカテゴリを選択
      const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      console.log(`カテゴリ「${category}」の記事を生成します`);
      
      // カテゴリに関連するトピックを取得
      const topics = await getTrendingTopics(category);
      console.log(`トレンドトピックを取得しました: ${topics.join(', ')}`);
      
      // ランダムにトピックを選択
      const topic = topics[Math.floor(Math.random() * topics.length)];
      console.log(`選択されたトピック: ${topic}`);
      
      // 記事を生成
      console.log('AI記事を生成中...');
      const { title, content } = await generateArticle(topic, category);
      console.log(`記事タイトル: ${title}`);
      
      // 記事を保存
      const filePath = await saveArticle(title, content, category);
      console.log(`記事を保存しました: ${filePath}`);
      
      console.log('ブログ記事生成が完了しました');
      process.exit(0);
    } catch (error) {
      console.error('記事生成中にエラーが発生しました:', error);
      process.exit(1);
    }
  }
  

// スクリプトを実行
main();