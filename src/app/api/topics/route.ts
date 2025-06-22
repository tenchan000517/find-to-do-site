// src/app/api/topics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getTrendingTopics } from '@/lib/blog';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'プログラミング';
    
    const topics = await getTrendingTopics(category);
    
    return NextResponse.json({
      success: true,
      topics,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'トピック取得中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}
