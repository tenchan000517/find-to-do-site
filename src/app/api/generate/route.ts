// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateWithGemini } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを取得
    const body = await request.json();
    const { prompt, parameters } = body;

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'プロンプトが指定されていません' },
        { status: 400 }
      );
    }

    // 開始時間を記録
    const startTime = Date.now();

    // Gemini APIでコンテンツ生成
    const text = await generateWithGemini(prompt, parameters);

    // 実行時間を計算
    const generationTime = Date.now() - startTime;

    // レスポンスを返却
    return NextResponse.json({
      success: true,
      content: text,
      metadata: {
        generatedAt: new Date().toISOString(),
        generationTime,
      },
    });
  } catch (error: any) {
    console.error('AI生成エラー:', error);
    
    // エラーレスポンスの返却
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'コンテンツ生成中にエラーが発生しました',
        metadata: {
          generatedAt: new Date().toISOString(),
        },
      },
      { status: error.status || 500 }
    );
  }
}