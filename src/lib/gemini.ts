// src/lib/gemini.ts
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// 安全性設定
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Gemini APIのモデル設定
export const GEMINI_MODELS = {
  PRO: 'gemini-1.5-pro',
  FLASH: 'gemini-2.0-flash',
  FLASH_LITE: 'gemini-2.0-flash-lite'
};

// 生成設定 - トークン数を調整
const defaultGenerationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 6000, // 4096から2048に削減
};

// タイムアウト設定
const API_TIMEOUT = 60000; // 30秒

/**
 * Gemini APIを使用してコンテンツを生成（エラー処理強化版）
 */
export async function generateWithGemini(
  prompt: string,
  options = {},
  apiKey?: string,
  modelOverride?: string // モデルを明示的に指定するためのパラメータを追加
): Promise<string> {
  // APIキーの取得
  const key = apiKey || process.env.GEMINI_API_KEY;
  
  if (!key) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  // APIクライアントを初期化
  const genAI = new GoogleGenerativeAI(key);

  // 生成設定を準備
  const generationConfig = { ...defaultGenerationConfig, ...options };
  
  // 使用するモデルを決定（優先順位: 引数 > 環境変数 > デフォルト）
  const modelName = modelOverride || process.env.GEMINI_MODEL || GEMINI_MODELS.FLASH;
  console.log(`使用モデル: ${modelName}`);

  // モデルを初期化
  const model = genAI.getGenerativeModel({
    model: modelName,
    safetySettings,
    generationConfig,
  });

  try {
    // タイムアウト付きでAPI呼び出し
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('API_TIMEOUT')), API_TIMEOUT);
    });
    
    const contentPromise = model.generateContent(prompt);
    
    // Promise.raceでタイムアウト処理を追加
    const result = await Promise.race([contentPromise, timeoutPromise]) as any;
    const response = result.response;
    return response.text();
  } catch (error: any) {
    // エラーの詳細分析
    if (error.message === 'API_TIMEOUT') {
      console.error('Gemini API timeout:', error);
      throw new Error('Gemini APIがタイムアウトしました。プロンプトを短くするか、再試行してください。');
    } else if (error.status === 429) {
      console.error('Gemini API rate limit exceeded:', error);
      throw new Error('API制限に達しました。しばらく待ってから再試行してください。');
    } else if (error.status === 400) {
      console.error('Gemini API bad request:', error);
      throw new Error('リクエストが不正です。プロンプトを確認してください。');
    } else if (error.status === 503) {
      console.error('Gemini API service unavailable:', error);
      
      // モデルが過負荷状態の場合、別のモデルを試す
      if (!modelOverride && modelName === GEMINI_MODELS.PRO) {
        console.log(`${modelName}が過負荷状態です。${GEMINI_MODELS.FLASH}にフォールバックします...`);
        try {
          // FLASHモデルで再試行
          return await generateWithGemini(prompt, options, apiKey, GEMINI_MODELS.FLASH);
        } catch (flashError: any) {
          // FLASHモデルもエラーの場合はFLASH_LITEを試す
          if (flashError.status === 503) {
            console.log(`${GEMINI_MODELS.FLASH}も過負荷状態です。${GEMINI_MODELS.FLASH_LITE}にフォールバックします...`);
            return await generateWithGemini(prompt, options, apiKey, GEMINI_MODELS.FLASH_LITE);
          }
          throw flashError;
        }
      } else if (!modelOverride && modelName === GEMINI_MODELS.FLASH) {
        console.log(`${modelName}が過負荷状態です。${GEMINI_MODELS.FLASH_LITE}にフォールバックします...`);
        // FLASH_LITEモデルで再試行
        return await generateWithGemini(prompt, options, apiKey, GEMINI_MODELS.FLASH_LITE);
      }
      
      throw new Error('Gemini APIのサーバーが過負荷状態です。しばらく待ってから再試行してください。');
    } else if (error.message && error.message.includes('fetch')) {
      console.error('Gemini API network error:', error);
      throw new Error('ネットワークエラーが発生しました。インターネット接続を確認してください。');
    } else {
      console.error('Gemini API unexpected error:', error);
      throw error;
    }
  }
}

/**
 * Gemini APIの接続テスト
 */
export async function testGeminiConnection(modelName?: string): Promise<{ success: boolean, message: string, model?: string }> {
  try {
    // テスト用の短いプロンプト
    const result = await generateWithGemini('こんにちは', { maxOutputTokens: 10 }, undefined, modelName);
    return {
      success: true,
      message: `Gemini API接続テスト成功: "${result}"`,
      model: modelName || process.env.GEMINI_MODEL || GEMINI_MODELS.FLASH
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Gemini API接続テスト失敗: ${error.message}`,
      model: modelName || process.env.GEMINI_MODEL || GEMINI_MODELS.FLASH
    };
  }
}