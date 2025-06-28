// 改良版: クリーンなdescription付きトレンドデータ取得
import { getAllTrends } from './src/lib/realtime-trends';
import * as cheerio from 'cheerio';

// HTMLタグを除去してクリーンなテキストを取得
function cleanDescription(rawDescription: string): string {
  if (!rawDescription) return '';
  
  // cheerioを使ってHTMLタグを除去
  const $ = cheerio.load(rawDescription);
  let cleanText = $.text();
  
  // 余分な空白を除去
  cleanText = cleanText.replace(/\s+/g, ' ').trim();
  
  // 長すぎる場合は200文字でカット
  if (cleanText.length > 200) {
    cleanText = cleanText.substring(0, 200) + '...';
  }
  
  return cleanText;
}

// 要約生成（タイトルから簡易要約を作成）
function generateSummaryFromTitle(title: string): string {
  // タイトルから重要な部分を抽出して要約を作成
  const cleanTitle = title.replace(/\s*-\s*[^-]*$/, ''); // 最後の「- サイト名」を除去
  
  if (cleanTitle.length <= 50) {
    return cleanTitle;
  }
  
  // 長いタイトルの場合、最初の50文字 + ...
  return cleanTitle.substring(0, 50) + '...';
}

// 改良されたトレンドアイテム
interface EnhancedTrendItem {
  id: string;
  title: string;
  url: string;
  source: string;
  score: number;
  likes: number;
  comments: number;
  publishedAt: string;
  topics: string[];
  category: string;
  description: string;        // クリーンなdescription
  summary: string;           // タイトルからの要約
  hasRichDescription: boolean; // 元のdescriptionがあったかどうか
}

async function improvedDescriptionTest() {
  console.log('🚀 改良版トレンドデータ取得テスト\n');
  
  try {
    const allTrends = await getAllTrends();
    console.log(`📊 総データ数: ${allTrends.length}件\n`);
    
    // データを改良版形式に変換
    const enhancedTrends: EnhancedTrendItem[] = allTrends.map(item => {
      const hasRichDescription = !!(item.description && item.description.trim().length > 0);
      const cleanDesc = hasRichDescription ? cleanDescription(item.description!) : '';
      const summary = generateSummaryFromTitle(item.title);
      
      return {
        id: item.id,
        title: item.title,
        url: item.url,
        source: item.source,
        score: item.score || 0,
        likes: item.likes || 0,
        comments: item.comments || 0,
        publishedAt: item.publishedAt,
        topics: item.topics || [],
        category: item.category || 'uncategorized',
        description: cleanDesc || summary, // descriptionがない場合はsummaryを使用
        summary: summary,
        hasRichDescription: hasRichDescription
      };
    });
    
    // 統計情報
    const withRichDesc = enhancedTrends.filter(item => item.hasRichDescription);
    console.log(`📈 リッチなdescription: ${withRichDesc.length}/${enhancedTrends.length}件\n`);
    
    // ソース別統計
    const sourceStats: Record<string, {total: number, withRich: number}> = {};
    enhancedTrends.forEach(item => {
      if (!sourceStats[item.source]) {
        sourceStats[item.source] = { total: 0, withRich: 0 };
      }
      sourceStats[item.source].total++;
      if (item.hasRichDescription) {
        sourceStats[item.source].withRich++;
      }
    });
    
    console.log('=== ソース別description統計 ===');
    Object.entries(sourceStats)
      .sort(([,a], [,b]) => b.withRich - a.withRich)
      .forEach(([source, stats]) => {
        const percentage = ((stats.withRich / stats.total) * 100).toFixed(1);
        console.log(`${source}: ${stats.withRich}/${stats.total}件 (${percentage}%)`);
      });
    
    console.log('\n=== リッチdescription付きサンプル ===');
    withRichDesc.slice(0, 5).forEach((item, index) => {
      console.log(`${index + 1}. [${item.source}] ${item.title}`);
      console.log(`   Description: ${item.description}`);
      console.log(`   Summary: ${item.summary}`);
      console.log('');
    });
    
    console.log('=== descriptionなしのサンプル（summary使用） ===');
    const withoutRichDesc = enhancedTrends.filter(item => !item.hasRichDescription);
    withoutRichDesc.slice(0, 5).forEach((item, index) => {
      console.log(`${index + 1}. [${item.source}] ${item.title}`);
      console.log(`   Generated Summary: ${item.summary}`);
      console.log(`   Description (fallback): ${item.description}`);
      console.log('');
    });
    
    // Python用完全サンプル（カテゴリ別）
    console.log('=== Python用改良データサンプル ===');
    const categoryData: Record<string, EnhancedTrendItem[]> = {};
    
    enhancedTrends.forEach(item => {
      if (!categoryData[item.category]) {
        categoryData[item.category] = [];
      }
      categoryData[item.category].push(item);
    });
    
    // 各カテゴリから2件ずつサンプル
    const pythonSample: Record<string, any[]> = {};
    Object.entries(categoryData).forEach(([category, items]) => {
      if (items.length > 0) {
        pythonSample[category] = items.slice(0, 2).map(item => ({
          id: item.id,
          title: item.title,
          url: item.url,
          source: item.source,
          score: item.score,
          likes: item.likes,
          comments: item.comments,
          publishedAt: item.publishedAt,
          topics: item.topics,
          category: item.category,
          description: item.description,
          summary: item.summary,
          hasRichDescription: item.hasRichDescription
        }));
      }
    });
    
    console.log(JSON.stringify(pythonSample, null, 2));
    
    // データ品質レポート
    console.log('\n=== データ品質レポート ===');
    const totalItems = enhancedTrends.length;
    const withDescription = enhancedTrends.filter(item => item.description.length > 0).length;
    const avgDescLength = enhancedTrends.reduce((sum, item) => sum + item.description.length, 0) / totalItems;
    
    console.log(`📊 総アイテム数: ${totalItems}`);
    console.log(`📝 Description付き: ${withDescription}件 (${((withDescription/totalItems)*100).toFixed(1)}%)`);
    console.log(`📏 平均Description長: ${avgDescLength.toFixed(1)}文字`);
    console.log(`🔍 リッチDescription: ${withRichDesc.length}件`);
    console.log(`🤖 自動生成Summary: ${totalItems - withRichDesc.length}件`);
    
  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

improvedDescriptionTest();