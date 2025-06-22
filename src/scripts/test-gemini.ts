// scripts/test-gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import path from 'path';

// .env.localファイルを読み込む
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// 非常にシンプルなテストプロンプト
const TEST_PROMPT = "1+1=?";

async function testGeminiAPI() {
  console.log('Gemini API簡易テスト開始...');
  console.log('API_KEY存在:', !!process.env.GEMINI_API_KEY);
  
  try {
    // 開始時間を記録
    const startTime = Date.now();
    
    // Gemini APIクライアントを初期化
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    
    // モデルを設定（最小限の設定）
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
        maxOutputTokens: 10, // 出力を最小限に
        temperature: 0.0, // 決定的な応答
      }
    });
    
    console.log('リクエスト送信中...');
    
    // APIリクエスト送信
    const result = await model.generateContent(TEST_PROMPT);
    const responseText = result.response.text();
    
    // 完了時間を記録
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    
    console.log('テスト成功！');
    console.log('応答:', responseText);
    console.log('実行時間:', executionTime, 'ms');
    console.log('ステータス: OK');
    
  } catch (error: any) {
    console.error('テスト失敗:', error.message);
    
    // エラーの詳細情報を表示
    if (error.status) {
      console.error('HTTPステータス:', error.status, error.statusText);
    }
    
    if (error.message.includes('overloaded')) {
      console.error('エラータイプ: サーバー過負荷');
      console.error('対処法: しばらく時間をおいて再試行してください（数時間〜1日程度）');
    } else if (error.message.includes('rate') || error.message.includes('quota')) {
      console.error('エラータイプ: API制限');
      console.error('対処法: 利用制限に達しました。翌日以降に再試行するか、APIクォータの増加を検討してください');
    } else if (error.message.includes('auth') || error.status === 401) {
      console.error('エラータイプ: 認証エラー');
      console.error('対処法: APIキーを確認し、必要に応じて再生成してください');
    } else if (error.message.includes('fetch')) {
      console.error('エラータイプ: ネットワークエラー');
      console.error('対処法: インターネット接続とファイアウォール設定を確認してください');
    }
  }
}

// テスト実行
testGeminiAPI();