// src/lib/category-optimizer.ts
// Phase 3: カテゴリ最適化システム
// ウェブ開発・ビジネスカテゴリの特化強化

import { generateWithGemini } from './gemini';

// カテゴリ別最適化設定
export interface CategoryOptimizationConfig {
  category: string;
  topic: string;
  trendData: any[];
  targetAudience?: string;
  expertiseLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  contentFormat?: 'tutorial' | 'guide' | 'analysis' | 'howto' | 'comparison';
  targetWordCount?: number;
}

export interface OptimizedContent {
  title: string;
  content: string;
  specializations: CategorySpecialization[];
  targetKeywords: string[];
  practicalExamples: PracticalExample[];
  wordCount: number;
  optimizationScore: number;
}

export interface CategorySpecialization {
  type: string;
  content: string;
  relevanceScore: number;
}

export interface PracticalExample {
  title: string;
  code?: string;
  description: string;
  difficulty: string;
  useCase: string;
}

// カテゴリ別特化設定
const CATEGORY_CONFIGS = {
  'ウェブ開発': {
    keywords: [
      'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Vue.js',
      'HTML', 'CSS', 'Tailwind', 'API', 'REST', 'GraphQL', 'MongoDB',
      'フロントエンド', 'バックエンド', 'フルスタック', 'レスポンシブ',
      'パフォーマンス', 'SEO', 'アクセシビリティ', 'デプロイ', 'CI/CD'
    ],
    frameworks: [
      'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js',
      'Express.js', 'Nest.js', 'Fastify', 'Koa.js'
    ],
    tools: [
      'Webpack', 'Vite', 'ESLint', 'Prettier', 'Jest', 'Cypress',
      'Docker', 'GitHub Actions', 'Vercel', 'Netlify'
    ],
    techniques: [
      'レスポンシブデザイン', 'プログレッシブウェブアプリ', 'JAMstack',
      'マイクロフロントエンド', 'サーバーサイドレンダリング', 'モジュール分割',
      'コード分割', 'キャッシュ戦略', 'セキュリティ対策'
    ]
  },
  'ビジネス': {
    keywords: [
      'DX', 'デジタル変革', 'AI活用', '業務効率化', 'プロセス改善',
      'データ分析', 'KPI', 'ROI', 'マーケティング', 'セールス',
      'カスタマーサクセス', 'プロダクト管理', 'アジャイル', 'スクラム',
      'リーダーシップ', 'チームマネジメント', 'コスト削減', '収益向上'
    ],
    frameworks: [
      'OKR', 'KPI管理', 'PDCA', 'リーンスタートアップ', 'デザイン思考',
      'アジャイル開発', 'スクラム', 'カンバン', 'Six Sigma'
    ],
    tools: [
      'Slack', 'Microsoft Teams', 'Notion', 'Asana', 'Jira', 'Trello',
      'Google Analytics', 'Salesforce', 'HubSpot', 'Tableau', 'Power BI'
    ],
    techniques: [
      '業務プロセス最適化', 'データドリブン意思決定', 'アジャイル変革',
      'リモートワーク最適化', 'チーム生産性向上', 'カスタマージャーニー設計',
      'マーケティングオートメーション', 'セールスイネーブルメント'
    ]
  }
};

/**
 * カテゴリ最適化記事生成
 */
export async function generateOptimizedCategoryContent(
  config: CategoryOptimizationConfig
): Promise<OptimizedContent> {
  console.log(`🎯 ${config.category}カテゴリ最適化記事生成開始...`);
  
  const categoryConfig = CATEGORY_CONFIGS[config.category];
  if (!categoryConfig) {
    throw new Error(`サポートされていないカテゴリ: ${config.category}`);
  }
  
  // 1. 特化プロンプト生成
  const optimizedPrompt = buildOptimizedPrompt(config, categoryConfig);
  
  // 2. メインコンテンツ生成
  const mainContent = await generateWithGemini(optimizedPrompt);
  
  // 3. 実践例の生成
  const practicalExamples = await generatePracticalExamples(config, categoryConfig);
  
  // 4. SEOキーワード抽出
  const targetKeywords = extractTargetKeywords(config, categoryConfig);
  
  // 5. 特化要素の生成
  const specializations = await generateSpecializations(config, categoryConfig);
  
  // 6. タイトル最適化
  const optimizedTitle = await optimizeTitleForCategory(config, categoryConfig);
  
  // 7. コンテンツ統合
  const integratedContent = integrateOptimizedContent(
    mainContent,
    practicalExamples,
    specializations,
    config
  );
  
  // 8. 最適化スコア計算
  const optimizationScore = calculateOptimizationScore(
    integratedContent,
    config,
    categoryConfig
  );
  
  console.log(`✅ ${config.category}最適化完了 (スコア: ${optimizationScore})`);
  
  return {
    title: optimizedTitle,
    content: integratedContent,
    specializations,
    targetKeywords,
    practicalExamples,
    wordCount: integratedContent.length,
    optimizationScore
  };
}

/**
 * 最適化プロンプト構築
 */
function buildOptimizedPrompt(
  config: CategoryOptimizationConfig,
  categoryConfig: any
): string {
  const expertiseMap = {
    'beginner': '初心者向けで基礎から丁寧に',
    'intermediate': '中級者向けで実践的な',
    'advanced': '上級者向けで専門的な',
    'expert': 'エキスパート向けで最新技術を含む'
  };
  
  const formatMap = {
    'tutorial': 'ステップバイステップのチュートリアル形式',
    'guide': '包括的なガイド形式',
    'analysis': '詳細分析レポート形式',
    'howto': '実践的なハウツー形式',
    'comparison': '比較検討形式'
  };
  
  const expertiseLevel = expertiseMap[config.expertiseLevel || 'intermediate'];
  const contentFormat = formatMap[config.contentFormat || 'guide'];
  
  // トレンド情報の整理
  const trendContext = config.trendData.slice(0, 5).map(trend => 
    `- ${trend.title || trend.content} (${trend.source || ''})`
  ).join('\n');
  
  // カテゴリ特化キーワード
  const relevantKeywords = categoryConfig.keywords.slice(0, 10).join('、');
  const relevantFrameworks = categoryConfig.frameworks.slice(0, 5).join('、');
  const relevantTools = categoryConfig.tools.slice(0, 5).join('、');
  
  return `${config.category}分野の${expertiseLevel}記事を${contentFormat}で作成してください。

【記事仕様】
トピック: ${config.topic}
カテゴリ: ${config.category}
対象読者: ${config.targetAudience || config.expertiseLevel || '中級者'}
目標文字数: ${config.targetWordCount || 4000}文字
形式: ${contentFormat}

【最新トレンド情報】
${trendContext}

【${config.category}分野の重要キーワード】
${relevantKeywords}

【推奨技術・フレームワーク】
${relevantFrameworks}

【実用ツール】
${relevantTools}

【コンテンツ要件】
1. ${config.category}分野の専門性を重視
2. 実際に使える具体的な実装例
3. 現場で役立つ実践的なアドバイス
4. 最新トレンドとの関連性を明確化
5. ステップバイステップの説明
6. コード例やサンプル（該当する場合）
7. 注意点やベストプラクティス
8. 関連リソースや学習パス

【記事構成】
- 導入部（背景・重要性）
- 基礎知識・概念説明
- 実装・実践方法（具体例付き）
- 応用・発展的活用法
- 注意点・よくある問題と解決法
- まとめ・次のステップ

記事を作成してください:`;
}

/**
 * 実践例生成
 */
async function generatePracticalExamples(
  config: CategoryOptimizationConfig,
  categoryConfig: any
): Promise<PracticalExample[]> {
  const examplePrompt = `${config.category}分野の「${config.topic}」について、実践的な例を3つ生成してください。

各例には以下を含めてください：
1. 例のタイトル
2. 具体的な実装コード（該当する場合）
3. 詳細な説明
4. 難易度（初級/中級/上級）
5. 実際の使用場面

JSON形式で回答してください：
[
  {
    "title": "例のタイトル",
    "code": "コード例（該当する場合）",
    "description": "詳細説明",
    "difficulty": "初級/中級/上級",
    "useCase": "実際の使用場面"
  }
]`;

  try {
    const response = await generateWithGemini(examplePrompt);
    const examples = JSON.parse(response.replace(/```json|```/g, ''));
    return examples.slice(0, 3); // 最大3つ
  } catch (error) {
    console.log('実践例生成エラー、デフォルト例を使用:', error.message);
    return getDefaultExamples(config.category);
  }
}

/**
 * デフォルト実践例
 */
function getDefaultExamples(category: string): PracticalExample[] {
  const examples = {
    'ウェブ開発': [
      {
        title: 'レスポンシブナビゲーション実装',
        code: 'const [isOpen, setIsOpen] = useState(false);',
        description: 'モバイル対応のハンバーガーメニューを実装',
        difficulty: '初級',
        useCase: 'モバイルファーストのウェブサイト'
      }
    ],
    'ビジネス': [
      {
        title: 'KPI設計と監視システム',
        description: 'ビジネス目標に対応した測定可能な指標の設計',
        difficulty: '中級',
        useCase: 'プロダクト成長の定量的管理'
      }
    ]
  };
  
  return examples[category] || [];
}

/**
 * ターゲットキーワード抽出
 */
function extractTargetKeywords(
  config: CategoryOptimizationConfig,
  categoryConfig: any
): string[] {
  const topicKeywords = config.topic.split(/[\s\u3000]+/);
  const categoryKeywords = categoryConfig.keywords.slice(0, 8);
  
  // 関連性の高いキーワードを組み合わせ
  const combined = [
    ...topicKeywords,
    ...categoryKeywords,
    config.category
  ];
  
  // 重複削除して返す
  return [...new Set(combined)].slice(0, 12);
}

/**
 * 特化要素生成
 */
async function generateSpecializations(
  config: CategoryOptimizationConfig,
  categoryConfig: any
): Promise<CategorySpecialization[]> {
  const specializations: CategorySpecialization[] = [];
  
  // 技術特化セクション
  if (config.category === 'ウェブ開発') {
    specializations.push({
      type: '技術スタック',
      content: `最新の${categoryConfig.frameworks.slice(0, 3).join('、')}を活用した実装アプローチ`,
      relevanceScore: 95
    });
    
    specializations.push({
      type: 'パフォーマンス最適化',
      content: 'Core Web Vitals向上とSEO対策を含む包括的最適化手法',
      relevanceScore: 90
    });
  }
  
  // ビジネス特化セクション
  if (config.category === 'ビジネス') {
    specializations.push({
      type: 'ROI最大化',
      content: '定量的効果測定と継続的改善による投資対効果の最大化',
      relevanceScore: 95
    });
    
    specializations.push({
      type: 'チーム運営',
      content: 'アジャイル手法とリモートワークに対応した効率的なチーム管理',
      relevanceScore: 88
    });
  }
  
  return specializations;
}

/**
 * タイトル最適化
 */
async function optimizeTitleForCategory(
  config: CategoryOptimizationConfig,
  categoryConfig: any
): Promise<string> {
  const titlePrompt = `${config.category}分野の「${config.topic}」について、SEOと読者エンゲージメントを最適化したタイトルを5つ提案してください。

要件：
- ${config.category}分野の専門性を表現
- 検索されやすいキーワードを含む
- 具体的で魅力的な表現
- 32文字以内で簡潔に

5つのタイトル案をリスト形式で提案してください：`;

  try {
    const response = await generateWithGemini(titlePrompt);
    const titles = response.split('\n').filter(line => line.trim().startsWith('-') || line.trim().match(/^\d+\./));
    return titles[0]?.replace(/^[-\d.\s]+/, '').trim() || `【${config.category}】${config.topic}完全ガイド`;
  } catch (error) {
    return `【${config.category}】${config.topic}実践ガイド`;
  }
}

/**
 * コンテンツ統合
 */
function integrateOptimizedContent(
  mainContent: string,
  practicalExamples: PracticalExample[],
  specializations: CategorySpecialization[],
  config: CategoryOptimizationConfig
): string {
  const sections = [mainContent];
  
  // 実践例セクション追加
  if (practicalExamples.length > 0) {
    sections.push('\n## 💡 実践例\n');
    practicalExamples.forEach((example, index) => {
      sections.push(`### ${index + 1}. ${example.title} [${example.difficulty}]\n`);
      sections.push(`${example.description}\n`);
      if (example.code) {
        sections.push('```javascript');
        sections.push(example.code);
        sections.push('```\n');
      }
      sections.push(`**活用場面:** ${example.useCase}\n`);
    });
  }
  
  // 特化セクション追加
  if (specializations.length > 0) {
    sections.push('\n## 🎯 専門分野での活用\n');
    specializations.forEach(spec => {
      sections.push(`### ${spec.type}\n`);
      sections.push(`${spec.content}\n`);
    });
  }
  
  return sections.join('\n');
}

/**
 * 最適化スコア計算
 */
function calculateOptimizationScore(
  content: string,
  config: CategoryOptimizationConfig,
  categoryConfig: any
): number {
  let score = 0;
  
  // 1. 文字数評価 (25%)
  const targetLength = config.targetWordCount || 4000;
  const lengthScore = Math.min(100, (content.length / targetLength) * 100);
  score += lengthScore * 0.25;
  
  // 2. キーワード含有率 (25%)
  const keywordMatches = categoryConfig.keywords.filter(keyword => 
    content.toLowerCase().includes(keyword.toLowerCase())
  ).length;
  const keywordScore = Math.min(100, (keywordMatches / categoryConfig.keywords.length) * 200);
  score += keywordScore * 0.25;
  
  // 3. 実践的要素 (25%)
  const practicalElements = [
    content.includes('例'),
    content.includes('コード'),
    content.includes('手順'),
    content.includes('実装'),
    content.includes('方法')
  ].filter(Boolean).length;
  const practicalScore = (practicalElements / 5) * 100;
  score += practicalScore * 0.25;
  
  // 4. 構造評価 (25%)
  const structureElements = [
    content.includes('#'),
    content.includes('##'),
    content.includes('###'),
    content.includes('```'),
    content.includes('**')
  ].filter(Boolean).length;
  const structureScore = (structureElements / 5) * 100;
  score += structureScore * 0.25;
  
  return Math.round(score);
}

/**
 * カテゴリ別推奨設定取得
 */
export function getCategoryRecommendations(category: string): CategoryOptimizationConfig {
  const recommendations = {
    'ウェブ開発': {
      expertiseLevel: 'intermediate' as const,
      contentFormat: 'tutorial' as const,
      targetWordCount: 4500,
      targetAudience: 'フロントエンド・バックエンド開発者'
    },
    'ビジネス': {
      expertiseLevel: 'intermediate' as const,
      contentFormat: 'guide' as const,
      targetWordCount: 3500,
      targetAudience: 'プロダクトマネージャー・事業責任者'
    }
  };
  
  return recommendations[category] || {
    expertiseLevel: 'intermediate' as const,
    contentFormat: 'guide' as const,
    targetWordCount: 3000,
    targetAudience: '専門家・実務者'
  };
}