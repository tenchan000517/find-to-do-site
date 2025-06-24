#!/usr/bin/env node

/**
 * キャリア・就活・ガクチカ向けトレンド取得テスト (依存関係なし)
 * 組み込みモジュールのみ使用
 */

const https = require('https');

// テスト結果格納
const testResults = {
  sources: {},
  totalItems: 0,
  samples: [],
  evaluation: {}
};

/**
 * HTTPSリクエスト関数
 */
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TrendBot/1.0)'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * HTML簡易パース（タイトル抽出）
 */
function extractTitles(html, source) {
  const results = [];
  
  try {
    // はてブのエントリータイトル抽出
    if (source === 'hatena') {
      const titleRegex = /<a[^>]*class="[^"]*entrylist-contents-title-link[^"]*"[^>]*>([^<]+)<\/a>/g;
      let match;
      while ((match = titleRegex.exec(html)) !== null) {
        const title = match[1].trim();
        if (title.length > 5) {
          results.push({
            title,
            source: 'はてなブックマーク',
            category: determineCategory(title),
            timestamp: new Date().toISOString()
          });
        }
      }
      
      // より広範囲なタイトル抽出
      const generalTitleRegex = /<h3[^>]*>.*?<a[^>]*>([^<]+)<\/a>.*?<\/h3>/g;
      while ((match = generalTitleRegex.exec(html)) !== null) {
        const title = match[1].trim();
        if (title.length > 5 && !results.some(r => r.title === title)) {
          results.push({
            title,
            source: 'はてなブックマーク',
            category: determineCategory(title),
            timestamp: new Date().toISOString()
          });
        }
      }
    }
    
    // note記事タイトル抽出
    if (source === 'note') {
      const noteRegex = /<h[1-6][^>]*>([^<]+)<\/h[1-6]>/g;
      let match;
      while ((match = noteRegex.exec(html)) !== null) {
        const title = match[1].trim();
        if (title.length > 10 && isCareerRelated(title)) {
          results.push({
            title,
            source: 'note',
            category: determineCategory(title),
            timestamp: new Date().toISOString()
          });
        }
      }
    }
    
  } catch (error) {
    console.log(`HTML解析エラー: ${error.message}`);
  }
  
  return results;
}

/**
 * キャリア関連判定
 */
function isCareerRelated(text) {
  const careerKeywords = [
    'キャリア', '転職', '就職', '就活', '仕事', '働き方', 'スキル', 
    '面接', '給与', '昇進', '副業', 'フリーランス', '新卒', 'インターン',
    'ガクチカ', '学生時代', '大学', '研究', '学習', '成長'
  ];
  
  return careerKeywords.some(keyword => text.includes(keyword));
}

/**
 * カテゴリ自動判定
 */
function determineCategory(title) {
  const categoryRules = {
    '転職': ['転職', '転職活動', 'キャリアチェンジ', '中途採用'],
    '就活': ['就活', '就職活動', '新卒', '面接', 'ES', '内定'],
    'ガクチカ': ['ガクチカ', '学生時代', '大学', 'インターン', '学生'],
    'スキルアップ': ['スキル', '学習', '勉強', '資格', '成長'],
    'キャリア': ['キャリア', '働き方', '仕事', '職場', '副業']
  };
  
  for (const [category, keywords] of Object.entries(categoryRules)) {
    if (keywords.some(keyword => title.includes(keyword))) {
      return category;
    }
  }
  
  return 'その他';
}

/**
 * はてなブックマーク取得テスト
 */
async function testHatenaBookmarks() {
  console.log('📊 はてなブックマーク取得テスト開始...');
  
  const results = [];
  const urls = [
    { url: 'https://b.hatena.ne.jp/hotentry/life', name: 'ライフ' },
    { url: 'https://b.hatena.ne.jp/hotentry/social', name: 'ソーシャル' },
    { url: 'https://b.hatena.ne.jp/hotentry', name: '総合' }
  ];
  
  for (const {url, name} of urls) {
    try {
      console.log(`  ${name}カテゴリ取得中...`);
      const data = await fetchData(url);
      const extracted = extractTitles(data, 'hatena');
      const careerRelated = extracted.filter(item => isCareerRelated(item.title));
      
      results.push(...careerRelated);
      console.log(`  ✅ ${name}: ${careerRelated.length}件のキャリア関連記事`);
      
      // 1秒待機
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.log(`  ❌ ${name}取得失敗: ${error.message}`);
    }
  }
  
  return results;
}

/**
 * 各種ニュースサイトRSS取得テスト
 */
async function testCareerNewsFeeds() {
  console.log('📰 キャリア系ニュースフィード取得テスト...');
  
  const feedUrls = [
    'https://diamond.jp/list/feed/rss.xml',
    'https://toyokeizai.net/list/feed/rss.xml',
    'https://www.businessinsider.jp/rss.xml'
  ];
  
  const results = [];
  
  for (const url of feedUrls) {
    try {
      console.log(`  RSS取得中: ${url}`);
      const data = await fetchData(url);
      
      // RSS内のタイトル抽出（簡易）
      const titleRegex = /<title><!\[CDATA\[([^\]]+)\]\]><\/title>/g;
      const simpleTitleRegex = /<title>([^<]+)<\/title>/g;
      
      let match;
      let count = 0;
      
      // CDATA形式のタイトル
      while ((match = titleRegex.exec(data)) !== null && count < 20) {
        const title = match[1].trim();
        if (title.length > 10 && isCareerRelated(title)) {
          results.push({
            title,
            source: url.includes('diamond') ? 'ダイヤモンド' : 
                   url.includes('toyokeizai') ? '東洋経済' : 'Business Insider',
            category: determineCategory(title),
            timestamp: new Date().toISOString()
          });
          count++;
        }
      }
      
      // 通常形式のタイトル
      while ((match = simpleTitleRegex.exec(data)) !== null && count < 20) {
        const title = match[1].trim();
        if (title.length > 10 && isCareerRelated(title) && 
            !results.some(r => r.title === title)) {
          results.push({
            title,
            source: url.includes('diamond') ? 'ダイヤモンド' : 
                   url.includes('toyokeizai') ? '東洋経済' : 'Business Insider',
            category: determineCategory(title),
            timestamp: new Date().toISOString()
          });
          count++;
        }
      }
      
      console.log(`  ✅ RSS: ${count}件のキャリア関連記事`);
      
      // 1秒待機
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.log(`  ❌ RSS取得失敗: ${error.message}`);
    }
  }
  
  return results;
}

/**
 * メイン実行関数
 */
async function main() {
  console.log('🚀 キャリア・就活・ガクチカ向けトレンド取得テスト開始');
  console.log('='.repeat(60));
  
  const startTime = Date.now();
  
  try {
    // 各ソーステスト実行
    const hatebuResults = await testHatenaBookmarks();
    const rssResults = await testCareerNewsFeeds();
    
    // 結果統合
    const allResults = [...hatebuResults, ...rssResults];
    
    // 重複除去
    const uniqueResults = allResults.filter((item, index, arr) => 
      arr.findIndex(t => t.title === item.title) === index
    );
    
    // カテゴリ別集計
    const categories = {};
    uniqueResults.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    
    // 結果表示
    console.log('\n📊 取得結果サマリー');
    console.log('='.repeat(40));
    
    const sourceCount = {};
    uniqueResults.forEach(item => {
      sourceCount[item.source] = (sourceCount[item.source] || 0) + 1;
    });
    
    Object.entries(sourceCount).forEach(([source, count]) => {
      console.log(`${source}: ${count}件`);
    });
    
    console.log(`\n総取得件数: ${uniqueResults.length}件`);
    console.log(`処理時間: ${((Date.now() - startTime) / 1000).toFixed(1)}秒`);
    
    console.log('\n📂 カテゴリ別分類結果');
    console.log('='.repeat(40));
    
    Object.entries(categories).forEach(([category, items]) => {
      console.log(`${category}: ${items.length}件`);
    });
    
    // サンプル記事表示
    console.log('\n🔍 カテゴリ別サンプル記事');
    console.log('='.repeat(50));
    
    Object.entries(categories).forEach(([category, items]) => {
      if (items.length > 0) {
        console.log(`\n【${category}】`);
        items.slice(0, 3).forEach((item, index) => {
          console.log(`${index + 1}. ${item.title}`);
          console.log(`   ソース: ${item.source}`);
        });
      }
    });
    
    // トレンドワード抽出
    console.log('\n🔥 抽出されたトレンドワード');
    console.log('='.repeat(40));
    
    const wordCount = {};
    uniqueResults.forEach(item => {
      const words = item.title.split(/[\s、。！？・]/);
      words.forEach(word => {
        word = word.trim();
        if (word.length >= 2 && !word.match(/^[a-zA-Z0-9]+$/)) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
    });
    
    const topWords = Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15);
    
    topWords.forEach(([word, count], index) => {
      console.log(`${index + 1}. "${word}" (${count}回)`);
    });
    
    // 成功基準評価
    console.log('\n✅ 成功基準評価');
    console.log('='.repeat(40));
    
    const evaluation = {
      '取得件数': uniqueResults.length >= 10 ? '✅ 合格' : '❌ 不合格',
      'ソース多様性': Object.keys(sourceCount).length >= 2 ? '✅ 合格' : '❌ 不合格',
      'カテゴリ分類': Object.keys(categories).length >= 3 ? '✅ 合格' : '❌ 不合格',
      '記事品質': uniqueResults.filter(r => r.title.length >= 10).length >= uniqueResults.length * 0.8 ? '✅ 合格' : '❌ 不合格',
      'キャリア関連度': uniqueResults.length >= 10 ? '✅ 合格' : '❌ 不合格'
    };
    
    Object.entries(evaluation).forEach(([criteria, result]) => {
      console.log(`${criteria}: ${result}`);
    });
    
    // 最終判定
    const passCount = Object.values(evaluation).filter(v => v.includes('✅')).length;
    const totalCriteria = Object.keys(evaluation).length;
    
    console.log(`\n🎯 最終判定: ${passCount}/${totalCriteria} 項目合格`);
    
    if (passCount >= totalCriteria * 0.8) {
      console.log('🎉 総合評価: 合格 - キャリア系トレンド取得システム実装可能');
      console.log('💡 推奨: はてなブックマーク + RSS フィードの組み合わせ');
    } else {
      console.log('⚠️ 総合評価: 要改善 - より多くのソース・改善が必要');
    }
    
    // 技術系との比較
    console.log('\n🔄 技術系トレンドとの比較');
    console.log('='.repeat(40));
    
    console.log('技術系: GitHub (102件) + はてブ (53件) + Hacker News (10件) = 165件');
    console.log(`キャリア系: ${uniqueResults.length}件取得`);
    
    if (uniqueResults.length >= 30) {
      console.log('✅ 技術系と同等の豊富なトレンド情報取得可能');
    } else if (uniqueResults.length >= 15) {
      console.log('⚠️ 技術系より少ないが実用的なレベル');
    } else {
      console.log('❌ 技術系と比べて情報量不足');
    }
    
  } catch (error) {
    console.error('❌ テスト実行エラー:', error.message);
  }
  
  console.log('\n🔚 テスト完了');
}

// 実行
main().catch(console.error);