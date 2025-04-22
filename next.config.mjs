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
  
  // 実験的機能
  experimental: {
    // 動的なルートの静的生成設定
    serverActions: {
      bodySizeLimit: '2mb', // サーバーアクションのボディサイズ制限
    }
  },
  
  // 静的ページ生成を無効化（Vercelのデプロイでは不要）
  // output: 'export', // 問題がある場合はこの行をコメントアウト
};

export default nextConfig;