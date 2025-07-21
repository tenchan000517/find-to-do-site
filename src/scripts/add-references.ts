// scripts/add-references.ts - 既存記事に参考文献を追加するスクリプト
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

/**
 * カテゴリ別フォールバック情報生成
 */
function generateCategorySpecificFallback(category: string): string {
  const categoryFallbacks: Record<string, string> = {
    'プログラミング': `本記事は最新のプログラミング技術動向と一般的な開発知識に基づいて作成しています。

参考となる情報源：
1. **MDN Web Docs** - Mozilla Developer Network
   URL: https://developer.mozilla.org/
2. **Stack Overflow** - 開発者コミュニティ
   URL: https://stackoverflow.com/
3. **GitHub** - オープンソースプロジェクト
   URL: https://github.com/

*※本記事の情報は執筆時点でのものであり、最新の情報については各公式ドキュメントをご確認ください。*`,

    'AI技術': `本記事は最新のAI・機械学習技術動向と研究情報に基づいて作成しています。

参考となる情報源：
1. **OpenAI Research** - AI研究の最前線
   URL: https://openai.com/research/
2. **Hugging Face** - AI/MLコミュニティ
   URL: https://huggingface.co/
3. **Papers with Code** - 論文と実装
   URL: https://paperswithcode.com/

*※本記事の情報は執筆時点でのものであり、最新の研究動向については各機関の公式発表をご確認ください。*`,

    'ウェブ開発': `本記事は最新のウェブ開発技術動向と業界標準に基づいて作成しています。

参考となる情報源：
1. **Web.dev** - Google Web Fundamentals
   URL: https://web.dev/
2. **Can I Use** - ブラウザ対応状況
   URL: https://caniuse.com/
3. **W3C Standards** - Web標準仕様
   URL: https://www.w3.org/standards/

*※本記事の情報は執筆時点でのものであり、最新のブラウザ対応状況については各仕様書をご確認ください。*`,

    'キャリア': `本記事は最新の転職・キャリア市場動向と業界情報に基づいて作成しています。

参考となる情報源：
1. **厚生労働省** - 雇用統計・労働市場データ
   URL: https://www.mhlw.go.jp/
2. **リクルート キャリア総研** - 転職市場レポート
   URL: https://www.recruit-career.co.jp/
3. **経済産業省** - IT人材需給予測
   URL: https://www.meti.go.jp/

*※本記事の情報は執筆時点でのものであり、最新の市場動向については各機関の公式発表をご確認ください。*`,

    'ビジネス': `本記事は最新のビジネス動向と市場分析に基づいて作成しています。

参考となる情報源：
1. **日本経済新聞** - 経済・ビジネス情報
   URL: https://www.nikkei.com/
2. **東洋経済オンライン** - ビジネス分析
   URL: https://toyokeizai.net/
3. **総務省統計局** - 経済統計データ
   URL: https://www.stat.go.jp/

*※本記事の情報は執筆時点でのものであり、最新の市場情報については各機関の公式発表をご確認ください。*`,

    '生成AI': `本記事は最新の生成AI技術動向と研究情報に基づいて作成しています。

参考となる情報源：
1. **OpenAI** - GPTシリーズの開発元
   URL: https://openai.com/
2. **Anthropic** - Claude AI研究・開発
   URL: https://www.anthropic.com/
3. **Google AI** - Gemini等の生成AI技術
   URL: https://ai.google/

*※本記事の情報は執筆時点でのものであり、最新のAI技術動向については各機関の公式発表をご確認ください。*`
  };

  return categoryFallbacks[category] || categoryFallbacks['プログラミング'];
}

/**
 * カテゴリ名を正規化
 */
function normalizeCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'programming': 'プログラミング',
    'web-development': 'ウェブ開発',
    'ai-technology': 'AI技術',
    'career': 'キャリア',
    'business': 'ビジネス',
    '生成ai': '生成AI'
  };
  
  return categoryMap[category.toLowerCase()] || category;
}

/**
 * 既存記事に参考文献を追加
 */
async function addReferencesToExistingArticles() {
  console.log('既存記事への参考文献追加を開始します...');
  
  if (!fs.existsSync(contentDirectory)) {
    console.error('ブログディレクトリが存在しません:', contentDirectory);
    return;
  }
  
  const categories = fs.readdirSync(contentDirectory);
  let processedCount = 0;
  let skippedCount = 0;
  
  for (const categoryDir of categories) {
    const categoryPath = path.join(contentDirectory, categoryDir);
    
    if (!fs.statSync(categoryPath).isDirectory()) continue;
    
    const files = fs.readdirSync(categoryPath);
    const category = normalizeCategory(categoryDir);
    
    console.log(`\n処理中のカテゴリ: ${category} (${categoryDir})`);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(categoryPath, file);
      
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { content, data } = matter(fileContents);
        
        // 既に適切な参考情報セクションがある場合はスキップ
        // ただし、「システムにより自動追加」のような不完全なものは修正対象とする
        if ((content.includes('## 参考情報') || 
            content.includes('## 参考文献') || 
            content.includes('参考となる情報源：')) &&
            !content.includes('システムにより自動追加') &&
            !content.includes('(システムにより自動追加)')) {
          console.log(`  ⏭️  スキップ: ${file} (既に参考情報あり)`);
          skippedCount++;
          continue;
        }
        
        // 既存の不完全な参考情報をクリーンアップ
        let cleanedContent = content;
        
        // 「システムにより自動追加」のようなテキストを削除
        cleanedContent = cleanedContent.replace(/\(システムにより自動追加\)/g, '');
        cleanedContent = cleanedContent.replace(/システムにより自動追加/g, '');
        
        // 空の参考文献セクションを削除
        cleanedContent = cleanedContent.replace(/## 参考文献・情報源\s*\n\s*\n/g, '');
        cleanedContent = cleanedContent.replace(/## 参考文献\s*\n\s*\n/g, '');
        
        // 参考情報セクションを生成
        const references = generateCategorySpecificFallback(category);
        let updatedContent;
        
        if (cleanedContent.includes('## 参考情報')) {
          // 既存の参考情報セクションがある場合は置換
          updatedContent = cleanedContent.replace(
            /## 参考情報[\s\S]*$/,
            '## 参考情報\n\n' + references
          );
        } else {
          // 参考情報セクションがない場合は追加
          updatedContent = cleanedContent + '\n\n## 参考情報\n\n' + references;
        }
        
        // フロントマターと合成
        const updatedFile = matter.stringify(updatedContent, data);
        
        // ファイルを更新
        fs.writeFileSync(filePath, updatedFile, 'utf8');
        console.log(`  ✅ 更新完了: ${file}`);
        processedCount++;
        
      } catch (error) {
        console.error(`  ❌ エラー: ${file}`, error);
      }
    }
  }
  
  console.log(`\n処理完了:`);
  console.log(`  更新された記事: ${processedCount}件`);
  console.log(`  スキップされた記事: ${skippedCount}件`);
}

// スクリプトを実行
addReferencesToExistingArticles().then(() => {
  console.log('参考文献追加処理が完了しました');
  process.exit(0);
}).catch(error => {
  console.error('処理中にエラーが発生しました:', error);
  process.exit(1);
});