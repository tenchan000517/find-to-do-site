// lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

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
        category: category,
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
      file.endsWith('.md') || file.endsWith('.mdx') && 
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
  
  // マークダウンをHTMLにコンパイル
  const mdxSource = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
      parseFrontmatter: true,
    },
  });
  
  return {
    metadata: {
      ...data,
      category: post.category,
    } as PostMetadata,
    content: mdxSource.content,
  };
}