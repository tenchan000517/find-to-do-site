// test-simple-ab.ts
// 簡単なA/Bテスト動作確認

import { generateWithGemini } from './src/lib/gemini';

async function testSimpleAB() {
  console.log('🧪 簡単なA/Bテスト開始\n');
  
  try {
    // テスト用のモックデータ
    const mockTrendData = [
      { 
        title: 'Next.js 15の新機能', 
        content: 'React Server Components対応強化',
        source: 'tech-news',
        category: 'ウェブ開発'
      },
      { 
        title: 'TypeScript 5.5の型安全性向上', 
        content: '新しい型推論機能',
        source: 'dev-updates',
        category: 'ウェブ開発'
      }
    ];

    const topic = 'Next.js 15新機能活用ガイド';
    const category = 'ウェブ開発';

    // 手法1: 基本生成
    console.log('🔄 手法1: 基本生成テスト中...');
    const basicPrompt = `${topic}について、${category}分野の記事を1500文字程度で書いてください。

要件:
- 実践的な内容
- 具体的な例
- 初心者にも理解しやすい説明

記事を作成してください:`;

    const basicResult = await generateWithGemini(basicPrompt);
    console.log(`✅ 基本生成完了: ${basicResult.length}文字`);

    // 手法2: 強化生成
    console.log('\n🔄 手法2: 強化生成テスト中...');
    const enhancedPrompt = `${topic}について、${category}分野の専門的で実践的な記事を作成してください。

トレンド情報:
${mockTrendData.map(trend => `- ${trend.title}: ${trend.content}`).join('\n')}

要件:
- ${category}分野の専門知識を活用
- 最新トレンドとの関連性を明示
- 実際に使えるコード例やステップ
- 1500文字程度の詳細な内容

記事を作成してください:`;

    const enhancedResult = await generateWithGemini(enhancedPrompt);
    console.log(`✅ 強化生成完了: ${enhancedResult.length}文字`);

    // 結果比較
    console.log('\n📊 生成結果比較:');
    console.log(`基本生成: ${basicResult.length}文字`);
    console.log(`強化生成: ${enhancedResult.length}文字`);
    
    console.log('\n📝 基本生成サンプル (最初の200文字):');
    console.log(basicResult.substring(0, 200) + '...');
    
    console.log('\n📝 強化生成サンプル (最初の200文字):');
    console.log(enhancedResult.substring(0, 200) + '...');

    console.log('\n🎉 簡単なA/Bテスト完了!');
    console.log('両方の手法で記事生成が成功しました。');

    return {
      success: true,
      basicLength: basicResult.length,
      enhancedLength: enhancedResult.length
    };

  } catch (error) {
    console.error('❌ テストエラー:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// テスト実行
if (require.main === module) {
  testSimpleAB()
    .then(result => {
      if (result.success) {
        console.log('\n✅ テスト成功');
        process.exit(0);
      } else {
        console.log('\n❌ テスト失敗');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 予期しないエラー:', error);
      process.exit(1);
    });
}

export { testSimpleAB };