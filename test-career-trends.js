#!/usr/bin/env node

/**
 * キャリア・就活・ガクチカ向けトレンド取得テスト
 * 技術系と同じアプローチでキャリア系トレンドを取得・分析
 */

const https = require('https');
const { parse } = require('node-html-parser');

// テスト結果格納
const testResults = {
  sources: {},
  totalItems: 0,
  categories: {
    'キャリア': [],
    '就活': [],
    'ガクチカ': [],
    '転職': [],
    'スキルアップ': [],
    'その他': []
  },
  summary: {}
};

/**
 * HTTPSリクエスト関数
 */
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
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
 * はてなブックマーク(キャリア・仕事)から取得
 */
async function getHatebuCareer() {
  console.log('📊 はてなブックマーク(キャリア・仕事)からトレンド取得中...');
  
  try {
    // ライフ・ワークバランス、キャリア関連
    const workUrl = 'https://b.hatena.ne.jp/hotentry/life';
    const socialUrl = 'https://b.hatena.ne.jp/hotentry/social';
    
    const results = [];
    
    // ライフカテゴリ取得
    try {
      const workData = await fetchData(workUrl);
      const workRoot = parse(workData);
      const workItems = workRoot.querySelectorAll('.entrylist-item');
      
      workItems.slice(0, 20).forEach(item => {
        const titleElement = item.querySelector('.entrylist-contents-title a');
        const urlElement = item.querySelector('.entrylist-contents-title a');
        const metaElement = item.querySelector('.entrylist-contents-meta');
        const descElement = item.querySelector('.entrylist-contents-description');
        
        if (titleElement && urlElement) {
          const title = titleElement.text.trim();
          const url = urlElement.getAttribute('href');
          const description = descElement ? descElement.text.trim() : '';
          
          // キャリア関連キーワードでフィルタリング
          const careerKeywords = ['転職', 'キャリア', '就職', '仕事', '働き方', 'スキル', '面接', '給与', '昇進', '副業', 'フリーランス'];
          const isCareerRelated = careerKeywords.some(keyword => 
            title.includes(keyword) || description.includes(keyword)
          );
          
          if (isCareerRelated) {
            results.push({
              title,
              url,
              description,
              source: 'はてブ(ライフ)',
              category: 'キャリア',
              timestamp: new Date().toISOString()
            });
          }
        }
      });
    } catch (err) {
      console.log(`ライフカテゴリ取得エラー: ${err.message}`);
    }
    
    // ソーシャルカテゴリ取得
    try {
      const socialData = await fetchData(socialUrl);
      const socialRoot = parse(socialData);
      const socialItems = socialRoot.querySelectorAll('.entrylist-item');
      
      socialItems.slice(0, 20).forEach(item => {
        const titleElement = item.querySelector('.entrylist-contents-title a');
        const urlElement = item.querySelector('.entrylist-contents-title a');
        const descElement = item.querySelector('.entrylist-contents-description');
        
        if (titleElement && urlElement) {
          const title = titleElement.text.trim();
          const url = urlElement.getAttribute('href');
          const description = descElement ? descElement.text.trim() : '';
          
          // 就活・ガクチカ関連キーワード
          const studentKeywords = ['就活', '学生', '新卒', 'インターン', '就職活動', 'ガクチカ', '大学', '学習', '研究'];
          const isStudentRelated = studentKeywords.some(keyword => 
            title.includes(keyword) || description.includes(keyword)
          );
          
          if (isStudentRelated) {
            results.push({
              title,
              url,
              description,
              source: 'はてブ(ソーシャル)',
              category: '就活',
              timestamp: new Date().toISOString()
            });
          }
        }
      });
    } catch (err) {
      console.log(`ソーシャルカテゴリ取得エラー: ${err.message}`);
    }
    
    console.log(`✅ はてなブックマーク: ${results.length}件取得`);
    return results;
    
  } catch (error) {
    console.log(`❌ はてなブックマーク取得失敗: ${error.message}`);
    return [];
  }
}

/**
 * note(キャリア関連)から取得
 */
async function getNoteCareer() {
  console.log('📝 note(キャリア関連)からトレンド取得中...');
  
  try {
    // noteの人気記事から取得
    const url = 'https://note.com/topics/career';
    const data = await fetchData(url);
    const root = parse(data);
    
    const results = [];
    const articles = root.querySelectorAll('.m-cardContainer__item, .o-noteCard, [data-testid="note-card"]');
    
    articles.slice(0, 30).forEach(article => {
      const titleElement = article.querySelector('h3, .o-noteCard__title, [data-testid="note-title"]');
      const linkElement = article.querySelector('a');
      const authorElement = article.querySelector('.o-noteCard__author, [data-testid="note-author"]');
      
      if (titleElement && linkElement) {
        const title = titleElement.text.trim();
        const url = linkElement.getAttribute('href');
        const author = authorElement ? authorElement.text.trim() : '';
        
        // 基本的なフィルタリング
        if (title.length > 10 && !title.includes('広告')) {
          results.push({
            title,
            url: url.startsWith('http') ? url : `https://note.com${url}`,
            author,
            source: 'note',
            category: 'キャリア',
            timestamp: new Date().toISOString()
          });
        }
      }
    });
    
    console.log(`✅ note: ${results.length}件取得`);
    return results;
    
  } catch (error) {
    console.log(`❌ note取得失敗: ${error.message}`);
    return [];
  }
}

/**
 * Wantedly記事から取得
 */
async function getWantedlyCareer() {
  console.log('💼 Wantedly記事からトレンド取得中...');
  
  try {
    const url = 'https://www.wantedly.com/projects';
    const data = await fetchData(url);
    const root = parse(data);
    
    const results = [];
    const projects = root.querySelectorAll('.project-card, .project-item');
    
    projects.slice(0, 20).forEach(project => {
      const titleElement = project.querySelector('.project-title, h3, .title');
      const companyElement = project.querySelector('.company-name, .company');
      const linkElement = project.querySelector('a');
      
      if (titleElement && linkElement) {
        const title = titleElement.text.trim();
        const company = companyElement ? companyElement.text.trim() : '';
        const url = linkElement.getAttribute('href');
        
        if (title.length > 5) {
          results.push({
            title,
            company,
            url: url.startsWith('http') ? url : `https://www.wantedly.com${url}`,
            source: 'Wantedly',
            category: 'キャリア',
            timestamp: new Date().toISOString()
          });
        }
      }
    });
    
    console.log(`✅ Wantedly: ${results.length}件取得`);
    return results;
    
  } catch (error) {
    console.log(`❌ Wantedly取得失敗: ${error.message}`);
    return [];
  }
}

/**
 * カテゴリ自動分類
 */
function categorizeCareerTrends(trends) {
  console.log('🔄 キャリア系トレンド自動分類中...');
  
  const categories = {
    'キャリア': [],
    '就活': [],
    'ガクチカ': [],
    '転職': [],
    'スキルアップ': [],
    'その他': []
  };
  
  const categoryKeywords = {
    '転職': ['転職', '転職活動', '転職エージェント', '転職サイト', 'キャリアチェンジ', '中途採用'],
    '就活': ['就活', '就職活動', '新卒', '就職', '面接', 'ES', 'エントリーシート', '内定', '採用'],
    'ガクチカ': ['ガクチカ', '学生時代', '大学', '学習', '研究', 'インターン', '学生', 'サークル', 'アルバイト'],
    'スキルアップ': ['スキル', '学習', '勉強', '資格', '成長', '能力', 'アップ', '向上', '習得'],
    'キャリア': ['キャリア', '働き方', '仕事', '職場', '昇進', '昇格', '給与', '年収', '副業', 'フリーランス']
  };
  
  trends.forEach(trend => {
    const text = `${trend.title} ${trend.description || ''}`.toLowerCase();
    let assigned = false;
    
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        categories[category].push(trend);
        assigned = true;
        break;
      }
    }
    
    if (!assigned) {
      categories['その他'].push(trend);
    }
  });
  
  return categories;
}

/**
 * メイン実行関数
 */
async function main() {
  console.log('🚀 キャリア・就活・ガクチカ向けトレンド取得テスト開始');
  console.log('=' * 60);
  
  // 各ソースから並列取得
  const promises = [
    getHatebuCareer(),
    getNoteCareer(),
    getWantedlyCareer()
  ];
  
  const results = await Promise.all(promises);
  const allTrends = results.flat();
  
  // 結果をまとめる
  testResults.sources = {
    'はてなブックマーク': results[0].length,
    'note': results[1].length,
    'Wantedly': results[2].length
  };
  
  testResults.totalItems = allTrends.length;
  
  // カテゴリ分類
  const categorizedTrends = categorizeCareerTrends(allTrends);
  testResults.categories = categorizedTrends;
  
  // 結果表示
  console.log('\n📊 取得結果サマリー');
  console.log('=' * 40);
  
  Object.entries(testResults.sources).forEach(([source, count]) => {
    console.log(`${source}: ${count}件`);
  });
  
  console.log(`\n総取得件数: ${testResults.totalItems}件`);
  
  console.log('\n📂 カテゴリ別分類結果');
  console.log('=' * 40);
  
  Object.entries(categorizedTrends).forEach(([category, items]) => {
    console.log(`${category}: ${items.length}件`);
    if (items.length > 0) {
      console.log(`  サンプル: "${items[0].title.substring(0, 50)}..."`);
    }
  });
  
  // 詳細サンプル表示
  console.log('\n🔍 カテゴリ別サンプル記事');
  console.log('=' * 50);
  
  Object.entries(categorizedTrends).forEach(([category, items]) => {
    if (items.length > 0) {
      console.log(`\n【${category}カテゴリ】`);
      items.slice(0, 3).forEach((item, index) => {
        console.log(`${index + 1}. ${item.title}`);
        console.log(`   ソース: ${item.source}`);
        if (item.description) {
          console.log(`   概要: ${item.description.substring(0, 100)}...`);
        }
        console.log('');
      });
    }
  });
  
  // 成功基準評価
  console.log('\n✅ 成功基準評価');
  console.log('=' * 40);
  
  const evaluation = {
    '取得件数': testResults.totalItems >= 20 ? '✅ 合格' : '❌ 不合格',
    'ソース多様性': Object.keys(testResults.sources).length >= 2 ? '✅ 合格' : '❌ 不合格',
    'カテゴリ分類': Object.values(categorizedTrends).filter(items => items.length > 0).length >= 3 ? '✅ 合格' : '❌ 不合格',
    '記事品質': allTrends.filter(t => t.title.length >= 10).length >= testResults.totalItems * 0.8 ? '✅ 合格' : '❌ 不合格'
  };
  
  Object.entries(evaluation).forEach(([criteria, result]) => {
    console.log(`${criteria}: ${result}`);
  });
  
  // 最終判定
  const passCount = Object.values(evaluation).filter(v => v.includes('✅')).length;
  const totalCriteria = Object.keys(evaluation).length;
  
  console.log(`\n🎯 最終判定: ${passCount}/${totalCriteria} 項目合格`);
  
  if (passCount >= totalCriteria * 0.75) {
    console.log('🎉 総合評価: 合格 - キャリア系トレンド取得システム実装可能');
  } else {
    console.log('⚠️ 総合評価: 要改善 - より多くのソース・改善が必要');
  }
  
  // トレンドワード抽出
  console.log('\n🔥 抽出されたトレンドワード');
  console.log('=' * 40);
  
  const trendWords = {};
  allTrends.forEach(trend => {
    const words = trend.title.split(/[\s、。！？]/);
    words.forEach(word => {
      if (word.length >= 3 && !word.match(/^[a-zA-Z0-9]+$/)) {
        trendWords[word] = (trendWords[word] || 0) + 1;
      }
    });
  });
  
  const sortedTrendWords = Object.entries(trendWords)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
  
  sortedTrendWords.forEach(([word, count], index) => {
    console.log(`${index + 1}. "${word}" (${count}回出現)`);
  });
  
  console.log('\n🔚 テスト完了');
}

// 実行
main().catch(console.error);