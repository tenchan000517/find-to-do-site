import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

export async function GET() {
  try {
    // contentディレクトリが存在しなければ空配列を返す
    if (!fs.existsSync(contentDirectory)) {
      return NextResponse.json({ posts: [] });
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
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'ブログ記事の取得に失敗しました' }, { status: 500 });
  }
}