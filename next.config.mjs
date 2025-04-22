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
  
  // 問題のあるページを静的生成から除外
  excludePathsInExport: [
    '/blog/nextjs-15react-1819-20254'
  ],
  
  // 実験的機能
  experimental: {
    // 動的なルートの静的生成設定
    serverActions: {
      bodySizeLimit: '2mb', // サーバーアクションのボディサイズ制限
    },
  }
};

export default nextConfig;