
// src/app/api/admin/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { generateArticle, saveArticle } from '@/lib/article';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, category } = body;
    
    if (!topic || !category) {
      return NextResponse.json(
        { success: false, error: 'トピックとカテゴリは必須です' },
        { status: 400 }
      );
    }
    
    // 記事生成
    const { title, content } = await generateArticle(topic, category);
    
    // 記事保存
    const filePath = await saveArticle(title, content, category);
    
    return NextResponse.json({
      success: true,
      title,
      path: filePath,
    });
  } catch (error: any) {
    console.error('記事生成エラー:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || '記事生成中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}