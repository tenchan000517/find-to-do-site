'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

const pathNameMap: { [key: string]: string } = {
  '': 'ホーム',
  'about': '企業情報',
  'service': 'サービス',
  'intern': 'インターン紹介',
  'webdev': 'WEB開発・DX支援',
  'event': 'イベント制作',
  'community': 'コミュニティ',
  'blog': 'ブログ',
  'news-blog': 'ニュース・ブログ',
  'documents': 'ドキュメント',
  'contact': 'お問い合わせ',
  'privacy': 'プライバシーポリシー',
  'terms': '利用規約',
  'legal': '特定商取引法に基づく表記',
};

export function Breadcrumb() {
  const pathname = usePathname();

  // discord6ページではパンくずナビを非表示
  if (pathname === '/discord6') {
    return null;
  }
  
  // パスを分割してパンくずリストを生成
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'ホーム', href: '/' }
  ];
  
  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = pathNameMap[segment] || segment;
    breadcrumbItems.push({ name, href: currentPath });
  });
  
  // 構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://find-to-do.com${item.href}`
    }))
  };
  
  // ホームページでは表示しない
  if (pathname === '/') return null;
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="パンくずリスト" className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                )}
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-gray-600 font-medium">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}