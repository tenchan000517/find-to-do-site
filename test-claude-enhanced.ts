// Claude Code & バイブコーディング強化後のテスト
import { getGenerativeAITrends } from './src/lib/realtime-trends';

async function testClaudeEnhanced() {
  console.log('🚀 Claude Code & バイブコーディング強化版テスト開始');
  
  try {
    console.log('📊 生成AI専門検索（強化版）実行中...');
    const results = await getGenerativeAITrends();
    
    console.log(`\n📈 総取得数: ${results.length}件`);
    
    // Claude Code & バイブコーディング関連を特に確認
    const claudeRelated = results.filter(item => {
      const text = (item.title + ' ' + (item.source || '')).toLowerCase();
      return text.includes('claude code') || 
             text.includes('バイブコーディング') || 
             text.includes('vibe coding') ||
             text.includes('claude') ||
             text.includes('anthropic');
    });
    
    console.log(`🎯 Claude関連: ${claudeRelated.length}件`);
    
    // ソース別集計
    const sourceCount: Record<string, number> = {};
    results.forEach(item => {
      const source = item.source || 'Unknown';
      sourceCount[source] = (sourceCount[source] || 0) + 1;
    });
    
    console.log('\n📊 ソース別取得数:');
    Object.keys(sourceCount).sort((a, b) => sourceCount[b] - sourceCount[a]).forEach(source => {
      console.log(`  ${source}: ${sourceCount[source]}件`);
    });
    
    if (claudeRelated.length > 0) {
      console.log('\n🎯 Claude関連記事:');
      claudeRelated.forEach((item, index) => {
        console.log(`${index + 1}. "${item.title}"`);
        console.log(`   ソース: ${item.source}`);
        console.log('');
      });
    } else {
      console.log('\n❌ Claude関連記事は見つかりませんでした');
    }
    
    // 改善前後の比較推定
    console.log('\n📈 改善効果推定:');
    console.log('改善前: 4件の生成AI情報');
    console.log(`改善後: ${results.length}件の生成AI情報`);
    console.log(`増加率: ${results.length > 4 ? '+' : ''}${((results.length - 4) / 4 * 100).toFixed(1)}%`);
    console.log(`Claude関連: ${claudeRelated.length}件 (全体の${(claudeRelated.length / results.length * 100).toFixed(1)}%)`);
    
  } catch (error) {
    console.error('❌ テストエラー:', error);
  }
}

// 実行
testClaudeEnhanced();