// src/lib/rss.ts
import fs from 'fs';
import path from 'path';
import { getExistingSlugs } from './blog';

/**
 * コードブロックの言語指定子を修正する
 * article.tsから移行
 */
function fixCodeBlockLanguages(content: string): string {
  let fixedContent = content;
  
  // 最重要：記事冒頭の無効なコードブロックを完全に除去
  if (fixedContent.match(/^```\s*\n# /)) {
    fixedContent = fixedContent.replace(/^```\s*\n(# .*)/, '$1');
  }
  
  if (fixedContent.match(/^```\s*\n/) && fixedContent.match(/\n```\s*$/)) {
    fixedContent = fixedContent.replace(/^```\s*\n([\s\S]*?)\n```\s*$/, '$1');
  }
  
  if (fixedContent.match(/^```\s*\n/)) {
    fixedContent = fixedContent.replace(/^```\s*\n/, '');
  }
  
  if (fixedContent.match(/\n```\s*$/)) {
    fixedContent = fixedContent.replace(/\n```\s*$/, '');
  }
  
  return fixedContent;
}

export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  category: string;
}

/**
 * RSS 2.0フィードを生成
 */
export function generateRSSFeed(items: RSSItem[]): string {
  const now = new Date().toUTCString();
  
  const rssItems = items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
      <category><![CDATA[${item.category}]]></category>
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>FIND to DO - 学生向けプログラミング支援ブログ</title>
    <link>https://find-to-do.com</link>
    <description>プログラミング初心者の学生・インターン向けの技術情報やキャリアガイドを配信</description>
    <language>ja</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>FIND to DO Blog System</generator>
    <webMaster>contact@find-to-do.com</webMaster>
    <managingEditor>contact@find-to-do.com</managingEditor>
    <ttl>60</ttl>${rssItems}
  </channel>
</rss>`;
}

/**
 * 既存のブログ記事からRSSアイテムを生成
 */
export function generateRSSItemsFromExistingBlogs(): RSSItem[] {
  const contentDir = path.join(process.cwd(), 'content', 'blog');
  const items: RSSItem[] = [];
  
  if (!fs.existsSync(contentDir)) {
    console.warn('Blog content directory not found:', contentDir);
    return items;
  }

  try {
    // カテゴリディレクトリを取得
    const categories = fs.readdirSync(contentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const category of categories) {
      const categoryDir = path.join(contentDir, category);
      const files = fs.readdirSync(categoryDir)
        .filter(file => file.endsWith('.md'))
        .sort((a, b) => b.localeCompare(a)) // 新しい順
        .slice(0, 10); // 最新10件のみ

      for (const file of files) {
        const filePath = path.join(categoryDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // フロントマターから情報を抽出
        const titleMatch = content.match(/^title:\s*"(.+)"$/m);
        const dateMatch = content.match(/^date:\s*"(.+)"$/m);
        const slugMatch = content.match(/^slug:\s*"(.+)"$/m);
        const excerptMatch = content.match(/^excerpt:\s*"(.+)"$/m);

        if (titleMatch && dateMatch && slugMatch) {
          const title = titleMatch[1];
          const date = new Date(dateMatch[1]).toUTCString();
          const slug = slugMatch[1];
          let excerpt = excerptMatch ? excerptMatch[1] : title;
          
          // excerptからも無効なコードブロックを除去
          excerpt = fixCodeBlockLanguages(excerpt);
          
          items.push({
            title,
            link: `https://find-to-do.com/blog/${slug}`,
            description: excerpt,
            pubDate: date,
            guid: `https://find-to-do.com/blog/${slug}`,
            category
          });
        }
      }
    }

    // 日付順でソート（新しい順）
    items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    
    return items.slice(0, 20); // 最新20件まで
    
  } catch (error) {
    console.error('Error generating RSS items from existing blogs:', error);
    return items;
  }
}

/**
 * RSSフィードファイルを保存
 */
export function saveRSSFeed(): void {
  try {
    const items = generateRSSItemsFromExistingBlogs();
    const rssContent = generateRSSFeed(items);
    const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
    
    fs.writeFileSync(rssPath, rssContent, 'utf8');
    console.log(`✅ RSS feed generated: ${rssPath}`);
    console.log(`   記事数: ${items.length}件`);
    console.log(`   最新記事: ${items[0]?.title || 'なし'}`);
    
  } catch (error) {
    console.error('❌ RSS feed generation failed:', error);
  }
}

/**
 * 新しい記事をRSSフィードに追加
 */
export function addNewArticleToRSS(articleData: {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
}): void {
  try {
    // excerptからも無効なコードブロックを除去
    const cleanExcerpt = fixCodeBlockLanguages(articleData.excerpt);
    
    const newItem: RSSItem = {
      title: articleData.title,
      link: `https://find-to-do.com/blog/${articleData.slug}`,
      description: cleanExcerpt,
      pubDate: new Date(articleData.publishedAt).toUTCString(),
      guid: `https://find-to-do.com/blog/${articleData.slug}`,
      category: articleData.category
    };

    // 既存のアイテムを取得
    const existingItems = generateRSSItemsFromExistingBlogs();
    
    // 新しいアイテムを先頭に追加（重複チェック：GUIDとタイトルの両方をチェック）
    const allItems = [newItem, ...existingItems.filter((item: any) => 
      item.guid !== newItem.guid && item.title !== newItem.title
    )];
    
    // 最新20件まで
    const latestItems = allItems.slice(0, 20);
    
    // RSSフィードを生成・保存
    const rssContent = generateRSSFeed(latestItems);
    const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
    
    fs.writeFileSync(rssPath, rssContent, 'utf8');
    console.log(`✅ RSS feed updated with new article: ${articleData.title}`);
    
  } catch (error) {
    console.error('❌ Failed to add new article to RSS:', error);
  }
}