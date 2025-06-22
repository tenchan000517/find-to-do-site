// scripts/regenerate-rss.ts
import { saveRSSFeed } from '@/lib/rss';

/**
 * RSSフィードを再生成するスクリプト
 */
async function main() {
  try {
    console.log('RSSフィード再生成を開始...');
    console.log('既存のブログ記事をスキャンしています...');
    
    // RSSフィードを再生成
    saveRSSFeed();
    
    console.log('✅ RSSフィード再生成が完了しました');
    process.exit(0);
  } catch (error) {
    console.error('❌ RSSフィード再生成中にエラーが発生しました:', error);
    process.exit(1);
  }
}

// スクリプトを実行
main();