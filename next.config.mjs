/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Modeを有効化
  reactStrictMode: true,
  
  // ESLintのパースエラーを無視
  eslint: {
    ignoreDuringBuilds: true, // ビルド中にESLintを無視
  },
  
  // 画像最適化の設定
  images: {
    unoptimized: true  // 静的エクスポートに必要
  },
  
  // 静的生成のタイムアウトを延長
  staticPageGenerationTimeout: 180, // 3分に延長
  
  // 実験的機能
  experimental: {
    // 動的なルートの静的生成設定
    serverActions: {
      bodySizeLimit: '2mb', // サーバーアクションのボディサイズ制限
    },
    // 並列生成の最適化
    workerThreads: false,
    cpus: 1,
  },
  
  // 静的ページ生成を無効化（Vercelのデプロイでは不要）
  // output: 'export', // 問題がある場合はこの行をコメントアウト
};

export default nextConfig;