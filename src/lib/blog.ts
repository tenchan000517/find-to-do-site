// lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fetchTrendingTopics as fetchTrends } from './trends';

// ブログカテゴリ定義
export const CATEGORIES = [
    'プログラミング',
    'ウェブ開発',
    'AI技術',
    'キャリア',
    'ビジネス',
];

/**
 * トレンドトピックの取得（変更済み）
 */
export async function getTrendingTopics(category: string): Promise<string[]> {
    try {
      // トレンドトピックをフェッチ
      const trendTopics = await fetchTrends(category, 5);
      return trendTopics;
    } catch (error) {
      console.error('トレンドトピック取得エラー:', error);
      
      // エラー時はフォールバックとして静的トピックを返す
      const topicsByCategory: Record<string, string[]> = {
            'プログラミング': [
                'TypeScriptの最新機能と実践的な使い方',
                'Next.js 15の新機能とパフォーマンス改善',
                'モダンなReactパターンとベストプラクティス',
                'Rustプログラミングの基礎と応用',
            ],
            'ウェブ開発': [
                'Web Componentsの実践的な使い方',
                'CSRとSSRの使い分けと最適化',
                'APIファーストアプローチによるバックエンド設計',
                'マイクロフロントエンドアーキテクチャ入門',
            ],
            'AI技術': [
                'Gemini APIを活用したアプリケーション開発',
                'LLMプロンプトエンジニアリングの基礎',
                'AIを使ったコンテンツ生成の実践手法',
                'RAGモデルの構築と応用事例',
            ],
            'キャリア': [
                'テックキャリアのスタート方法と成長戦略',
                'エンジニアからテックリードへのステップアップ',
                'リモートワークでのパフォーマンス最大化',
                'テック業界の面接対策と転職成功事例',
            ],
            'ビジネス': [
                'スタートアップでのMVP開発とプロダクト戦略',
                'サービス拡大のためのグロースハック手法',
                'テック業界のビジネスモデルトレンド',
                'SaaSビジネスの立ち上げと成長戦略',
            ],
        };

        // カテゴリのトピックを返す。カテゴリが見つからない場合はプログラミングのトピックを返す
        return topicsByCategory[category] || topicsByCategory['プログラミング'];
    }
}

/**
 * 既存ブログ記事のスラグをチェック（重複防止）
 */
export function getExistingSlugs(): string[] {
    const contentDir = path.join(process.cwd(), 'content', 'blog');

    // content/blogディレクトリが存在しなければ空配列を返す
    if (!fs.existsSync(contentDir)) {
        return [];
    }

    const categories = fs.readdirSync(contentDir);
    let slugs: string[] = [];

    for (const category of categories) {
        const categoryPath = path.join(contentDir, category);

        if (fs.statSync(categoryPath).isDirectory()) {
            const files = fs.readdirSync(categoryPath);

            for (const file of files) {
                if (file.endsWith('.md') || file.endsWith('.mdx')) {
                    // スラグを抽出（ファイル名からプレフィックスと拡張子を除去）
                    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '');
                    slugs.push(slug);
                }
            }
        }
    }

    return slugs;
}

/**
 * スラグを生成（タイトルから）
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
}