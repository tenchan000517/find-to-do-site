// components/sections/SplitHero.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type TabType = 'student' | 'company';

const SplitHero: React.FC = () => {
  // モバイル表示時のタブ切り替え状態を管理（デフォルトは企業様向け）
  const [activeTab, setActiveTab] = useState<TabType>('company');
  const [isMobile, setIsMobile] = useState(false);
  
  // 画面サイズの変更を監視
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 初期チェック
    checkMobile();
    
    // リサイズイベントリスナー
    window.addEventListener('resize', checkMobile);
    
    // クリーンアップ
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 共通の背景画像（PCのみ表示） */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src="/images/1.png"
          alt="背景画像"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* モバイル用のタブ切り替えUI */}
      <div className="md:hidden w-full flex border-b border-gray-200 sticky top-0 z-20 bg-white">
        <button
          onClick={() => setActiveTab('company')}
          className={`w-1/2 py-4 text-center font-medium text-sm ${
            activeTab === 'company' 
              ? 'text-orange-500 border-b-2 border-orange-500' 
              : 'text-gray-500'
          }`}
        >
          企業様
        </button>
        <button
          onClick={() => setActiveTab('student')}
          className={`w-1/2 py-4 text-center font-medium text-sm ${
            activeTab === 'student' 
              ? 'text-blue-700 border-b-2 border-blue-700' 
              : 'text-gray-500'
          }`}
        >
          学生の方
        </button>
      </div>
      
      {/* デスクトップ表示とモバイル表示を切り替え */}
      <div className="flex flex-col md:flex-row relative z-10">
        {/* 企業向け側（左側に配置） */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            display: activeTab === 'company' || !isMobile ? 'flex' : 'none'
          }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2 h-[80vh] md:h-screen flex items-center justify-center"
        >
          {/* モバイル用の背景（PCでは共通背景を使用） */}
          <div className="md:hidden absolute inset-0 z-0">
            <Image
              src="/images/1.png"
              alt="高品質な開発を低コストで"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gray-900/50"></div>
          </div>
          
          {/* 企業向けコンテンツ */}
          <div className="relative z-10 text-center px-6 py-12 mx-4 md:px-8 md:mx-6 max-w-md md:max-w-xl bg-gray-900/70 backdrop-blur-sm rounded-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              従来の1/10以下の<br/>コストを実現
            </h2>
            <p className="text-white text-base md:text-lg mb-8">
              プロの品質保証付き<br/>インターン生とメンターの協働で低コスト高品質
            </p>
            <Link href="/service" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
              サービスを見る
            </Link>
          </div>
        </motion.div>
        
        {/* 学生向け側（右側に配置） */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            display: activeTab === 'student' || !isMobile ? 'flex' : 'none'
          }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2 h-[80vh] md:h-screen flex items-center justify-center"
        >
          {/* モバイル用の背景（PCでは共通背景を使用） */}
          <div className="md:hidden absolute inset-0 z-0">
            <Image
              src="/images/1.png"
              alt="プロと一緒に学ぶインターン"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-blue-900/50"></div>
          </div>
          
          {/* 学生向けコンテンツ */}
          <div className="relative z-10 text-center px-6 py-12 mx-4 md:px-8 md:mx-6 max-w-md md:max-w-xl bg-blue-900/70 backdrop-blur-sm rounded-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              実際に体験して<br/>スキルを身につける
            </h2>
            <p className="text-white text-base md:text-lg mb-8">
              インプットよりもアウトプットを優先した<br/>新時代のスキルアッププログラム
            </p>
            <Link href="/community" className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
              コミュニティに参加する
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* PC表示時の区切り線 */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-white/20 transform -translate-x-1/2 z-10"></div>
      
      {/* スクロールインジケーター - デスクトップ表示のみ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="w-2 h-2 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default SplitHero;