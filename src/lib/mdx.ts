// lib/mdx.ts - Updated version
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus'; // Make sure to install this package
import remarkToc from 'remark-toc'; // Make sure to install this package
import rehypeSlug from 'rehype-slug'; // 新たにインポート

// ブログ記事ディレクトリ
const contentDirectory = path.join(process.cwd(), 'content', 'blog');

// ブログ記事のメタデータ型定義
export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  category: string;
  excerpt?: string;
  tags?: string[];
}

/**
 * すべてのブログ記事のメタデータを取得
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
  // contentディレクトリが存在しなければ空配列を返す
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const categories = fs.readdirSync(contentDirectory);
  let posts: PostMetadata[] = [];

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category);
    
    // ディレクトリでない場合はスキップ
    if (!fs.statSync(categoryPath).isDirectory()) continue;
    
    const files = fs.readdirSync(categoryPath);
    
    for (const file of files) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      posts.push({
        ...data,
        category: data.category || category,
        slug: data.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, ''),
        date: data.date || new Date().toISOString(),
      } as PostMetadata);
    }
  }
  
  // 日付順に並べ替え（新しい順）
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * カテゴリ別の記事一覧を取得
 */
export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

/**
 * 特定のスラグの記事を取得
 */
export async function getPostBySlug(slug: string) {
  try {
    // 特定の問題のあるスラグの場合はnullを返す
    const problematicSlugs = ['nextjs-15react-1819-20254', 'vite-webpack-web-hackernoon'];
    if (problematicSlugs.includes(slug)) {
      console.log(`Skipping problematic post: ${slug}`);
      return null;
    }
    
    const posts = await getAllPosts();
    const post = posts.find(post => post.slug === slug);
    
    if (!post) return null;
    
    // 記事のファイルパス候補を構築（カテゴリごとに検索）
    const categories = fs.readdirSync(contentDirectory);
    let filePath: string | null = null;
    
    // 全カテゴリをチェックして記事を探す
    for (const category of categories) {
      const categoryPath = path.join(contentDirectory, category);
      if (!fs.statSync(categoryPath).isDirectory()) continue;
      
      const files = fs.readdirSync(categoryPath);
      const matchingFile = files.find(file => 
        (file.endsWith('.md') || file.endsWith('.mdx')) && 
        file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '') === slug
      );
      
      if (matchingFile) {
        filePath = path.join(categoryPath, matchingFile);
        break;
      }
    }
    
    if (!filePath) return null;
    
    // ファイル内容を読み込み
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // front matterとコンテンツを分離
    const { content, data } = matter(fileContents);
    
    // コンテンツの前処理: コードブロックの改善
    const enhancedContent = enhanceMarkdownContent(content);
    
    // マークダウンをHTMLにコンパイル
    try {
      const mdxSource = await compileMDX({
        source: enhancedContent,
        options: {
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              [remarkToc, { heading: 'Table of Contents', tight: true }]
            ],
            rehypePlugins: [
              rehypeHighlight,
              rehypeSlug, // これを追加
              [rehypePrism, { showLineNumbers: true }]
            ],
          },
          parseFrontmatter: true,
        },
      });
      
      return {
        metadata: {
          ...data,
          category: data.category || post.category,
        } as PostMetadata,
        content: mdxSource.content,
      };
    } catch (error) {
      console.error(`Error compiling MDX for post ${slug}:`, error);
      return null;
    }
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error);
    return null;
  }
}

/**
 * マークダウンコンテンツの前処理
 */
function enhanceMarkdownContent(content: string): string {
    // 無効な言語指定子（tsxx、vueなど）をより広く捕捉して修正
    let enhanced = content.replace(/```(typescript|ts|javascript|js|jsx|tsx|tsxx|typescriptx|javascriptx|ts-x|js-x|vue)/g, '```tsx');
    
    // 言語未指定のコードブロックをtsx指定に修正
    enhanced = enhanced.replace(/```(?!\w)/g, '```tsx');
    
    // 他の既知の無効な言語指定子を直接修正
    enhanced = enhanced.replace(/```tsxx/g, '```tsx');
    enhanced = enhanced.replace(/```vue/g, '```tsx');
    
    // コードブロック終了タグについた言語指定子を削除
    enhanced = enhanced.replace(/```(\w+)$/gm, '```');
    
    // 目次用のマーカーを追加（まだなければ）
    if (!enhanced.includes('## Table of Contents') && !enhanced.includes('## 目次')) {
      const titleEndIndex = enhanced.indexOf('\n\n');
      if (titleEndIndex !== -1) {
        enhanced = enhanced.slice(0, titleEndIndex + 2) + '## Table of Contents\n\n' + enhanced.slice(titleEndIndex + 2);
      }
    }
    
    // 見出しレベルの調整（# が不足している場合）
    if (!enhanced.startsWith('# ')) {
      const firstLineEnd = enhanced.indexOf('\n');
      if (firstLineEnd !== -1 && !enhanced.startsWith('##')) {
        const firstLine = enhanced.substring(0, firstLineEnd);
        enhanced = '# ' + firstLine + enhanced.substring(firstLineEnd);
      }
    }
    
    return enhanced;
  }