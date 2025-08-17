'use client';

export function DiscordFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-sm mx-auto px-4 text-center">

        {/* 法的リンク */}
        <div className="mb-6">
          <div className="flex justify-center space-x-2 text-xs text-gray-400">
            <a 
              href="/terms" 
              className="hover:text-gray-300 transition-colors"
            >
              利用規約
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href="/privacy" 
              className="hover:text-gray-300 transition-colors"
            >
              プライバシーポリシー
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href="/legal" 
              className="hover:text-gray-300 transition-colors"
            >
              特定商取引法に基づく表記
            </a>
          </div>
        </div>

        {/* 企業情報 */}
        <div className="text-xs text-gray-500 space-y-2 border-t border-gray-700 pt-6">
          <p>〒466-0831</p>
          <p>愛知県名古屋市昭和区花見通2-3-17</p>
          <p className="mt-4">
            © {currentYear} FIND to DO Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}