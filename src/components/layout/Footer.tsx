'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';

const footerLinks = [
  {
    title: 'サービス',
    links: [
      { label: 'WEBアプリ・DX支援', href: '/service/webdev' },
      { label: 'イベント制作', href: '/service/event' },
      { label: 'インターン生紹介', href: '/service/intern' },
      { label: 'サービス一覧', href: '/service' }
    ]
  },
  {
    title: '企業情報',
    links: [
      { label: '会社概要', href: '/about' },
      { label: 'ニュース＆ブログ', href: '/news-blog' },
      // { label: '資料ダウンロード', href: '/documents' }, // 未実装のためコメントアウト
      { label: 'お問い合わせ', href: '/contact' }
    ]
  },
  {
    title: '学生の方へ',
    links: [
      { label: 'コミュニティに参加', href: '/community' },
      { label: '成長パス', href: '/community#growth-path' },
      { label: 'Discord', href: 'https://discord.gg/xQM6NgmwPk' }
    ]
  },
  {
    title: '規約・ポリシー',
    links: [
      { label: '利用規約', href: '/terms' },
      { label: 'プライバシーポリシー', href: '/privacy' },
      { label: '特定商取引法に基づく表記', href: '/legal' }
    ]
  }
];

const socialLinks = [
  { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  
  // Discordページとevent-formページでは非表示
  if (pathname === '/discord' || pathname === '/event-form') {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* メインフッターコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* 企業情報 */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/images/logo.png" 
                alt="FIND to DO" 
                width={150} 
                height={40} 
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              FIND to DOは、「インターン→メンター」の成長パスを活用した独自のビジネスモデルで、
              人材育成と価値創出が循環する新しいエコシステムを構築しています。
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div> */}

          {/* フッターリンク */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* お問い合わせボタン */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-12"
        >
          <Link
            href="/contact"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            お問い合わせ
          </Link>
        </motion.div> */}

        {/* 企業情報 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-gray-400 text-sm border-t border-gray-800 pt-8"
        >
          <p className="mb-4">
            〒466-0831 愛知県名古屋市昭和区花見通2-3-17
          </p>
          <p>
            © {currentYear} FIND to DO Inc. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}