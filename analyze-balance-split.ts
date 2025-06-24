// バランスの良い分割を分析
import { categorizeAndExtractKeywords } from './src/lib/trend-categorizer';
import { getAllTrends } from './src/lib/realtime-trends';

async function analyzeBalanceSplit() {
  console.log('⚖️ バランスの良い分割案の分析開始\n');
  
  try {
    const allTrends = await getAllTrends();
    const categorizedTrends = categorizeAndExtractKeywords(allTrends);
    
    const webDevItems = categorizedTrends['ウェブ開発'] || [];
    const programmingItems = categorizedTrends['プログラミング'] || [];
    
    console.log(`📊 分析対象:`);
    console.log(`  ウェブ開発: ${webDevItems.length}件`);
    console.log(`  プログラミング: ${programmingItems.length}件\n`);
    
    // === ウェブ開発47件の分割分析 ===
    console.log('🔍 ウェブ開発47件の技術領域分析:');
    
    const frontendKeywords = [
      'react', 'vue', 'angular', 'svelte', 'frontend', 'html', 'css', 'javascript', 'typescript',
      'responsive', 'ui', 'ux', 'component', 'jsx', 'tsx', 'browser', 'dom',
      'webpack', 'vite', 'babel', 'sass', 'tailwind', 'bootstrap'
    ];
    
    const backendInfraKeywords = [
      'api', 'backend', 'server', 'database', 'node', 'express', 'nest', 'next', 'nuxt',
      'deployment', 'docker', 'devops', 'microservice', 'mongodb', 'postgresql', 'mysql',
      'redis', 'graphql', 'rest', 'authentication', 'cloud', 'aws', 'vercel'
    ];
    
    const webFrontendItems: typeof webDevItems = [];
    const webBackendItems: typeof webDevItems = [];
    const webAmbiguousItems: typeof webDevItems = [];
    
    webDevItems.forEach(item => {
      const text = `${item.title} ${item.description || ''}`.toLowerCase();
      
      const frontendScore = frontendKeywords.reduce((score, keyword) => 
        score + (text.includes(keyword) ? 1 : 0), 0);
      const backendScore = backendInfraKeywords.reduce((score, keyword) => 
        score + (text.includes(keyword) ? 1 : 0), 0);
      
      if (frontendScore > backendScore && frontendScore > 0) {
        webFrontendItems.push(item);
      } else if (backendScore > frontendScore && backendScore > 0) {
        webBackendItems.push(item);
      } else {
        webAmbiguousItems.push(item);
      }
    });
    
    console.log(`  🎨 フロントエンド: ${webFrontendItems.length}件`);
    console.log(`  🔧 バックエンド・インフラ: ${webBackendItems.length}件`);
    console.log(`  ❓ 分類困難: ${webAmbiguousItems.length}件\n`);
    
    // === プログラミング26件の分割分析 ===
    console.log('🔍 プログラミング26件の言語系分析:');
    
    const webLangKeywords = [
      'javascript', 'typescript', 'react', 'vue', 'angular', 'node', 'express', 'next',
      'frontend', 'backend', 'web', 'html', 'css'
    ];
    
    const systemLangKeywords = [
      'python', 'rust', 'go', 'java', 'c++', 'c#', 'kotlin', 'swift', 'ruby', 'php',
      'scala', 'dart', 'machine learning', 'data science', 'algorithm', 'system'
    ];
    
    const progWebItems: typeof programmingItems = [];
    const progSystemItems: typeof programmingItems = [];
    const progAmbiguousItems: typeof programmingItems = [];
    
    programmingItems.forEach(item => {
      const text = `${item.title} ${item.description || ''}`.toLowerCase();
      
      const webScore = webLangKeywords.reduce((score, keyword) => 
        score + (text.includes(keyword) ? 1 : 0), 0);
      const systemScore = systemLangKeywords.reduce((score, keyword) => 
        score + (text.includes(keyword) ? 1 : 0), 0);
      
      if (webScore > systemScore && webScore > 0) {
        progWebItems.push(item);
      } else if (systemScore > webScore && systemScore > 0) {
        progSystemItems.push(item);
      } else {
        progAmbiguousItems.push(item);
      }
    });
    
    console.log(`  🌐 Web系プログラミング: ${progWebItems.length}件`);
    console.log(`  ⚙️ システム系プログラミング: ${progSystemItems.length}件`);
    console.log(`  ❓ 分類困難: ${progAmbiguousItems.length}件\n`);
    
    // === 分割案の評価 ===
    console.log('⚖️ 分割案のバランス評価:\n');
    
    // 案1: ウェブ開発を技術領域で分割
    console.log('📋 案1: ウェブ開発を技術領域で分割');
    console.log(`  土曜: フロントエンド開発 (${webFrontendItems.length}件)`);
    console.log(`  日曜: バックエンド・インフラ (${webBackendItems.length}件)`);
    
    const web1Balance = Math.abs(webFrontendItems.length - webBackendItems.length);
    const web1Min = Math.min(webFrontendItems.length, webBackendItems.length);
    console.log(`  バランス: 差=${web1Balance}件, 最少=${web1Min}件 ${web1Min >= 15 ? '✅' : '⚠️'}\n`);
    
    // 案2: プログラミングを言語系で分割
    console.log('📋 案2: プログラミングを言語系で分割');
    console.log(`  木曜: Web系プログラミング (${progWebItems.length}件)`);
    console.log(`  土曜: システム系プログラミング (${progSystemItems.length}件)`);
    
    const prog1Balance = Math.abs(progWebItems.length - progSystemItems.length);
    const prog1Min = Math.min(progWebItems.length, progSystemItems.length);
    console.log(`  バランス: 差=${prog1Balance}件, 最少=${prog1Min}件 ${prog1Min >= 10 ? '✅' : '⚠️'}\n`);
    
    // 案3: 混合分割（最適化）
    console.log('📋 案3: 混合分割（最適化）');
    
    // より平等な分割を探す
    const totalWeb = webDevItems.length;
    const totalProg = programmingItems.length;
    
    // ウェブ関連を統合して分割
    const allWebRelated = [...webDevItems, ...progWebItems];
    const halfWeb = Math.floor(allWebRelated.length / 2);
    
    console.log(`  土曜: ウェブ・フロントエンド (約${halfWeb}件)`);
    console.log(`  日曜: ウェブ・バックエンド (約${allWebRelated.length - halfWeb}件)`);
    console.log(`  ※プログラミングは木曜で維持 (${progSystemItems.length}件)\n`);
    
    // === 推奨案の決定 ===
    console.log('🎯 推奨案の決定:\n');
    
    let bestOption = '';
    let reasoning = '';
    
    if (web1Min >= 15 && web1Balance <= 10) {
      bestOption = '案1: ウェブ開発の技術領域分割';
      reasoning = `両方とも15件以上確保でき、差が${web1Balance}件と小さい`;
    } else if (prog1Min >= 10 && prog1Balance <= 8) {
      bestOption = '案2: プログラミングの言語系分割';
      reasoning = `両方とも10件以上確保でき、差が${prog1Balance}件と小さい`;
    } else {
      bestOption = '案3: 既存カテゴリを維持して別のアプローチ';
      reasoning = '分割後のバランスが悪いため、別の解決策を検討';
    }
    
    console.log(`✅ 推奨: ${bestOption}`);
    console.log(`📝 理由: ${reasoning}\n`);
    
    // サンプル記事の表示
    if (bestOption.includes('案1')) {
      console.log('📋 推奨案のサンプル記事:');
      console.log('  土曜（フロントエンド）:');
      webFrontendItems.slice(0, 3).forEach((item, i) => {
        console.log(`    ${i+1}. ${item.title}`);
      });
      console.log('  日曜（バックエンド・インフラ）:');
      webBackendItems.slice(0, 3).forEach((item, i) => {
        console.log(`    ${i+1}. ${item.title}`);
      });
    } else if (bestOption.includes('案2')) {
      console.log('📋 推奨案のサンプル記事:');
      console.log('  木曜（Web系プログラミング）:');
      progWebItems.slice(0, 3).forEach((item, i) => {
        console.log(`    ${i+1}. ${item.title}`);
      });
      console.log('  土曜（システム系プログラミング）:');
      progSystemItems.slice(0, 3).forEach((item, i) => {
        console.log(`    ${i+1}. ${item.title}`);
      });
    }
    
  } catch (error) {
    console.error('分析エラー:', error);
  }
}

analyzeBalanceSplit();