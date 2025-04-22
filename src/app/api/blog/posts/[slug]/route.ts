import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

// ブログ記事ディレクトリ
const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    // contentディレクトリが存在しなければエラー
    if (!fs.existsSync(contentDirectory)) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 });
    }
    
    const categories = fs.readdirSync(contentDirectory);
    let filePath: string | null = null;
    let foundCategory: string | null = null;
    
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
        foundCategory = category;
        break;
      }
    }
    
    if (!filePath || !foundCategory) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 });
    }
    
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
    
    return NextResponse.json({
      post: {
        metadata: {
          ...data,
          category: data.category || foundCategory,
          slug,
        },
        content: mdxSource.content,
      }
    });
  } catch (error) {
    return NextResponse.json({ error: '記事の取得に失敗しました' }, { status: 500 });
  }
}