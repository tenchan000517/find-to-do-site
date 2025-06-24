// trend-categorizer.tsの詳細分析
const fs = require('fs');

function analyzeCategorizer() {
  try {
    console.log('=== trend-categorizer.ts の詳細分析 ===\n');
    
    const content = fs.readFileSync('src/lib/trend-categorizer.ts', 'utf8');
    
    // CATEGORY_KEYWORDSの全体を抽出
    const keywordMatch = content.match(/const CATEGORY_KEYWORDS = \{([\s\S]*?)\n\};/);
    if (keywordMatch) {
      const keywordSection = keywordMatch[1];
      
      console.log('📋 全カテゴリの設定状況:');
      
      // 各カテゴリを順番に解析
      const categories = [
        'プログラミング',
        'ウェブ・アプリ開発', 
        '生成AI',
        'キャリア',
        'ビジネス',
        '勉強・自己啓発',
        '週間総合'
      ];
      
      categories.forEach(category => {
        console.log(`\n🎯 ${category}:`);
        
        // カテゴリの開始位置を探す
        const categoryStart = keywordSection.indexOf(`'${category}': [`);
        if (categoryStart === -1) {
          console.log('  ❌ カテゴリ定義が見つかりません');
          return;
        }
        
        // カテゴリの終了位置を探す（次の],を見つける）
        let categoryEnd = categoryStart;
        let bracketCount = 0;
        let inArray = false;
        
        for (let i = categoryStart; i < keywordSection.length; i++) {
          const char = keywordSection[i];
          if (char === '[') {
            inArray = true;
            bracketCount++;
          } else if (char === ']') {
            bracketCount--;
            if (inArray && bracketCount === 0) {
              categoryEnd = i;
              break;
            }
          }
        }
        
        if (categoryEnd > categoryStart) {
          const categoryContent = keywordSection.substring(categoryStart, categoryEnd + 1);
          
          // キーワードを抽出（文字列内の配列要素を取得）
          const keywords = [];
          const lines = categoryContent.split('\n');
          
          lines.forEach(line => {
            const trimmed = line.trim();
            // コメント行やカテゴリ名行をスキップ
            if (trimmed && !trimmed.startsWith('//') && !trimmed.includes(`'${category}':`)) {
              // シングルクォートで囲まれた文字列を抽出
              const matches = trimmed.match(/'([^']+)'/g);
              if (matches) {
                matches.forEach(match => {
                  const keyword = match.replace(/'/g, '');
                  if (keyword && keyword !== category) {
                    keywords.push(keyword);
                  }
                });
              }
            }
          });
          
          console.log(`  キーワード数: ${keywords.length}個`);
          
          if (keywords.length > 0) {
            console.log(`  キーワード例: ${keywords.slice(0, 10).join(', ')}${keywords.length > 10 ? '...' : ''}`);
            
            // 対象3カテゴリの詳細分析
            if (category === 'ウェブ・アプリ開発') {
              const webDevKeywords = keywords.filter(k => 
                k.includes('web') || k.includes('frontend') || k.includes('backend') || 
                k.includes('html') || k.includes('css') || k.includes('javascript')
              );
              const mobileKeywords = keywords.filter(k => 
                k.includes('mobile') || k.includes('app') || k.includes('android') || 
                k.includes('ios') || k.includes('flutter') || k.includes('react native')
              );
              const gameKeywords = keywords.filter(k => 
                k.includes('game') || k.includes('unity') || k.includes('unreal')
              );
              
              console.log(`    📱 ウェブ開発: ${webDevKeywords.length}個`);
              console.log(`    📱 モバイル開発: ${mobileKeywords.length}個`);
              console.log(`    🎮 ゲーム開発: ${gameKeywords.length}個`);
              
              // 日本語キーワードの数
              const japaneseKeywords = keywords.filter(k => /[ひらがなカタカナ漢字]/.test(k));
              console.log(`    🇯🇵 日本語キーワード: ${japaneseKeywords.length}個`);
            }
            
            if (category === 'ビジネス') {
              const startupKeywords = keywords.filter(k => 
                k.includes('startup') || k.includes('スタートアップ') || k.includes('起業')
              );
              const marketingKeywords = keywords.filter(k => 
                k.includes('marketing') || k.includes('マーケティング') || k.includes('growth')
              );
              const managementKeywords = keywords.filter(k => 
                k.includes('management') || k.includes('経営') || k.includes('strategy')
              );
              
              console.log(`    🚀 スタートアップ: ${startupKeywords.length}個`);
              console.log(`    📈 マーケティング: ${marketingKeywords.length}個`);
              console.log(`    💼 経営・戦略: ${managementKeywords.length}個`);
              
              // 日本語キーワードの数
              const japaneseKeywords = keywords.filter(k => /[ひらがなカタカナ漢字]/.test(k));
              console.log(`    🇯🇵 日本語キーワード: ${japaneseKeywords.length}個`);
            }
            
            if (category === '週間総合') {
              console.log(`    ⚠️ 特別カテゴリ（自動分類対象外）`);
              console.log(`    📊 週間統計用のメタカテゴリ`);
            }
          } else {
            console.log('  ⚠️ キーワードが抽出できませんでした');
          }
        } else {
          console.log('  ❌ カテゴリ内容が見つかりません');
        }
      });
      
      console.log('\n=== 問題点と改善提案 ===');
      console.log('\n🔍 現在の問題:');
      console.log('1. ウェブ・アプリ開発: 範囲が広すぎて焦点が定まらない');
      console.log('2. ビジネス: キーワードが比較的少なく、マッチしにくい');
      console.log('3. 週間総合: 自動分類されないため、実質的に機能していない');
      
      console.log('\n💡 改善提案:');
      console.log('1. ウェブ・アプリ開発 → 「ウェブ開発」と「アプリ開発」に分離');
      console.log('2. ビジネス: より具体的なキーワードを追加（SaaS、DX、マーケティング施策等）');
      console.log('3. 週間総合: 曜日別ローテーションではなく、エンゲージメント上位記事を自動集約');
      
    } else {
      console.log('❌ CATEGORY_KEYWORDSの定義が見つかりませんでした');
    }
    
  } catch (error) {
    console.error('❌ 分析エラー:', error);
  }
}

analyzeCategorizer();