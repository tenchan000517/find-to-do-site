// scripts/generate-blog.ts
import fs from 'fs';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { generateWithGemini } from '@/lib/gemini';
import { CATEGORIES, getTrendingTopics, getExistingSlugs, generateSlug } from '@/lib/blog';
import * as dotenv from 'dotenv';
import { createArticlePrompt } from '@/lib/prompt';
import { generateArticle, saveArticle } from '@/lib/article';
import { addNewArticleToRSS } from '@/lib/rss';

// .env.localファイルを明示的に読み込む
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
console.log('環境変数読み込み完了。GEMINI_API_KEY存在:', !!process.env.GEMINI_API_KEY);


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
      const filePath = await saveArticle(title, content, category, topic);
      console.log(`記事を保存しました: ${filePath}`);
      
      // RSSフィードを更新
      console.log('RSSフィードを更新中...');
      const slug = generateSlug(title);
      const excerpt = content.split('\n\n').find(p => !p.startsWith('#') && p.trim().length > 0)?.slice(0, 150) + "..." || title;
      
      addNewArticleToRSS({
        title,
        slug,
        category,
        excerpt,
        publishedAt: new Date().toISOString()
      });
      
      console.log('ブログ記事生成が完了しました');
      process.exit(0);
    } catch (error) {
      console.error('記事生成中にエラーが発生しました:', error);
      process.exit(1);
    }
  }
  

// スクリプトを実行
main();