'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const pathname = usePathname();

  // discord6ページではヘッダーを非表示
  if (pathname === '/discord6') {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleServiceDropdown = () => {
    setServiceDropdownOpen(!serviceDropdownOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setServiceDropdownOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-2'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* ロゴ */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image 
            src="/images/logo.png" 
            alt="FIND to DO" 
            width={180} 
            height={48} 
            className="h-12 w-auto" 
          />
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/about" 
            className="font-medium text-gray-800 hover:text-blue-600 transition-colors"
          >
            FIND to DOについて
          </Link>

          {/* サービスドロップダウン */}
          <div className="relative group">
            <button 
              className="flex items-center font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={toggleServiceDropdown}
            >
              サービス
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <div className="py-1">
                <Link 
                  href="/service" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-l-2 border-transparent hover:border-blue-500"
                >
                  サービス詳細
                </Link>
                <Link 
                  href="/service/event" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-l-2 border-transparent hover:border-orange-500"
                >
                  イベント制作
                </Link>
                <Link 
                  href="/service/intern" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-l-2 border-transparent hover:border-green-500"
                >
                  インターン生紹介
                </Link>
              </div>
            </div>
          </div>

          <Link 
            href="/news-blog" 
            className="font-medium text-gray-800 hover:text-blue-600 transition-colors"
          >
            ニュース＆ブログ
          </Link>

          <Link 
            href="/community" 
            className="font-medium text-gray-800 hover:text-blue-600 transition-colors"
          >
            コミュニティ
          </Link>

          <Link 
            href="/community" 
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-2"
          >
            コミュニティに参加
          </Link>

          <Link 
            href="/contact" 
            className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            お問い合わせ
          </Link>
        </nav>

        {/* モバイルメニューボタン */}
        <button 
          className="md:hidden text-gray-800" 
          onClick={toggleMenu}
          aria-label="メニュー"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* モバイルメニュー */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
          <Link 
            href="/about" 
            className="py-1.5 text-gray-800 font-medium border-b border-gray-200"
            onClick={closeMenu}
          >
            FIND to DOについて
          </Link>

          {/* モバイルサービスドロップダウン */}
          <div>
            <button 
              className="flex items-center justify-between w-full py-1.5 text-gray-800 font-medium border-b border-gray-200"
              onClick={toggleServiceDropdown}
            >
              サービス
              <ChevronDown className={`w-4 h-4 transition-transform ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: serviceDropdownOpen ? 1 : 0,
                height: serviceDropdownOpen ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pl-4"
            >
              <Link 
                href="/service" 
                className="block py-1.5 text-gray-700 border-l-2 border-blue-500 pl-2 my-1.5"
                onClick={closeMenu}
              >
                サービス詳細
              </Link>
              <Link 
                href="/service/event" 
                className="block py-1.5 text-gray-700 border-l-2 border-orange-500 pl-2 my-1.5"
                onClick={closeMenu}
              >
                イベント制作
              </Link>
              <Link 
                href="/service/intern" 
                className="block py-1.5 text-gray-700 border-l-2 border-green-500 pl-2 my-1.5"
                onClick={closeMenu}
              >
                インターン生紹介
              </Link>
            </motion.div>
          </div>

          <Link 
            href="/news-blog" 
            className="py-1.5 text-gray-800 font-medium border-b border-gray-200"
            onClick={closeMenu}
          >
            ニュース＆ブログ
          </Link>

          <Link 
            href="/community" 
            className="py-1.5 text-gray-800 font-medium border-b border-gray-200"
            onClick={closeMenu}
          >
            コミュニティ
          </Link>

          <div className="flex flex-col space-y-2 pt-1.5">
            <Link 
              href="/community" 
              className="py-1.5 px-4 bg-blue-600 text-white text-center rounded-lg"
              onClick={closeMenu}
            >
              コミュニティに参加
            </Link>
            <Link 
              href="/contact" 
              className="py-1.5 px-4 bg-orange-500 text-white text-center rounded-lg mb-2"
              onClick={closeMenu}
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;