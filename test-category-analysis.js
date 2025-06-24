// カテゴリ分析テスト
const fs = require('fs');

async function analyzeCategorySettings() {
  try {
    console.log('=== 3つのカテゴリの詳細調査 ===\n');
    
    // trends.tsの設定を読み取り
    const trendsContent = fs.readFileSync('src/lib/trends.ts', 'utf8');
    const categorizerContent = fs.readFileSync('src/lib/trend-categorizer.ts', 'utf8');
    
    console.log('📋 trends.tsのCATEGORY_KEYWORDSから対象カテゴリを抽出:\n');
    
    // trends.tsからCATEGORY_KEYWORDSを抽出
    const keywordMatch = trendsContent.match(/const CATEGORY_KEYWORDS:.*?= {([\s\S]*?)};/);
    if (keywordMatch) {
      const keywordSection = keywordMatch[1];
      
      // 対象3カテゴリのキーワードを抽出
      const targetCategories = ['ウェブ・アプリ開発', 'ビジネス', '週間総合'];
      
      targetCategories.forEach(category => {
        console.log(`🎯 ${category}:`);
        
        const categoryRegex = new RegExp(`'${category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'\\s*:\\s*\\[([^\\]]+)\\]`, 'g');
        const match = categoryRegex.exec(keywordSection);
        
        if (match) {
          const keywords = match[1].split(',').map(k => k.trim().replace(/'/g, ''));
          console.log(`  キーワード数: ${keywords.length}個`);
          console.log(`  キーワード: ${keywords.slice(0, 10).join(', ')}${keywords.length > 10 ? '...' : ''}\n`);
        } else {
          console.log('  ❌ キーワードが見つかりません\n');
        }
      });
    }
    
    console.log('📋 trend-categorizer.tsのCATEGORY_KEYWORDSから対象カテゴリを抽出:\n');
    
    // trend-categorizer.tsからCATEGORY_KEYWORDSを抽出
    const categorizerKeywordMatch = categorizerContent.match(/const CATEGORY_KEYWORDS = {([\s\S]*?)};/);
    if (categorizerKeywordMatch) {
      const keywordSection = categorizerKeywordMatch[1];
      
      const targetCategories = ['ウェブ・アプリ開発', 'ビジネス', '週間総合'];
      
      targetCategories.forEach(category => {
        console.log(`🎯 ${category}:`);
        
        const categoryRegex = new RegExp(`'${category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'\\s*:\\s*\\[([\s\S]*?)\\]`, 'g');
        const match = categoryRegex.exec(keywordSection);
        
        if (match) {
          const keywordList = match[1];
          // 文字列を配列に変換（コメント行も考慮）
          const keywords = keywordList
            .split('\n')
            .map(line => line.trim())
            .filter(line => line && !line.startsWith('//'))
            .map(line => line.replace(/[',]/g, '').trim())
            .filter(k => k);
          
          console.log(`  キーワード数: ${keywords.length}個`);
          console.log(`  キーワード例: ${keywords.slice(0, 15).join(', ')}${keywords.length > 15 ? '...' : ''}`);
          
          // カテゴリの特徴分析
          if (category === 'ウェブ・アプリ開発') {
            const webKeywords = keywords.filter(k => k.includes('web') || k.includes('frontend') || k.includes('backend'));
            const mobileKeywords = keywords.filter(k => k.includes('mobile') || k.includes('app') || k.includes('android') || k.includes('ios'));
            console.log(`    - ウェブ開発関連: ${webKeywords.length}個`);
            console.log(`    - モバイル開発関連: ${mobileKeywords.length}個`);
          }
          
          if (category === 'ビジネス') {
            const startupKeywords = keywords.filter(k => k.includes('startup') || k.includes('business') || k.includes('saas'));
            const marketingKeywords = keywords.filter(k => k.includes('marketing') || k.includes('strategy'));
            console.log(`    - スタートアップ関連: ${startupKeywords.length}個`);
            console.log(`    - マーケティング関連: ${marketingKeywords.length}個`);
          }
          
          if (category === '週間総合') {
            console.log(`    - 特別カテゴリ（自動分類されない）`);
          }
          
        } else {
          console.log('  ❌ キーワードが見つかりません');
        }
        console.log('');
      });
    }
    
    console.log('🔍 検索キーワードの問題点分析:');
    console.log('1. ウェブ・アプリ開発: 範囲が広すぎる可能性（ウェブ、モバイル、ゲーム、デスクトップアプリを全て含む）');
    console.log('2. ビジネス: キーワードが少なく、特定性が低い');
    console.log('3. 週間総合: 自動分類されないため、週間で人気の記事が集まらない可能性');
    
  } catch (error) {
    console.error('❌ 分析エラー:', error);
  }
}

analyzeCategorySettings();