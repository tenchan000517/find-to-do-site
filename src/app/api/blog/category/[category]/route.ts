import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ブログ記事ディレクトリ
const contentDirectory = path.join(process.cwd(), 'content', 'blog');

// 正しい型定義
type Params = { params: { category: string } };

export async function GET(
  request: NextRequest,
  context: Params
) {
  try {
    const category = context.params.category;
    
    // contentディレクトリが存在しなければ空配列を返す
    if (!fs.existsSync(contentDirectory)) {
      return NextResponse.json({ posts: [] });
    }
    
    const categoryPath = path.join(contentDirectory, category);
    
    // カテゴリディレクトリが存在しなければ空配列を返す
    if (!fs.existsSync(categoryPath) || !fs.statSync(categoryPath).isDirectory()) {
      return NextResponse.json({ posts: [] });
    }
    
    const files = fs.readdirSync(categoryPath);
    let posts = [];
    
    for (const file of files) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      posts.push({
        ...data,
        category,
        slug: data.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, ''),
        date: data.date || new Date().toISOString(),
      });
    }
    
    // 日付順に並べ替え（新しい順）
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'カテゴリ別記事の取得に失敗しました' }, { status: 500 });
  }
}