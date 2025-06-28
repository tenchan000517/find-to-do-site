// components/sections/SplitHero.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { DESIGN_SYSTEM } from '@/styles/design-system';

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
          className={`w-1/2 py-4 text-center font-medium text-sm transition-all duration-300 ${
            activeTab === 'company' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          企業様
        </button>
        <button
          onClick={() => setActiveTab('student')}
          className={`w-1/2 py-4 text-center font-medium text-sm transition-all duration-300 ${
            activeTab === 'student' 
              ? 'text-orange-500 border-b-2 border-orange-500' 
              : 'text-gray-500 hover:text-gray-700'
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
          <div className="relative z-10 text-center px-6 py-12 mx-4 md:px-8 md:mx-6 max-w-md md:max-w-xl bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50">
            {/* 衝撃的なヘッドライン */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              採用費で母数を稼ぐ時代は<span className="text-red-400">終わった</span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-400 mb-8"
            >
              育てて選ばれる新時代へ
            </motion.h2>
            
            {/* 共感ポイント */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-base md:text-lg text-slate-200 mb-8"
            >
              猫の手も借りたい業務を、<br className="md:hidden" />優秀な学生に任せませんか？
            </motion.p>
            
            {/* 90%成功率を強調 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mb-8 p-4 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-lg border border-blue-400/30"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
                90%
              </div>
              <div className="text-sm text-slate-300">
                採用成功率
              </div>
            </motion.div>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <Link 
                href="/service" 
                className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-emerald-400"
              >
                新しい採用戦略を見る
              </Link>
            </motion.div>
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
          <div className="relative z-10 text-center px-6 py-12 mx-4 md:px-8 md:mx-6 max-w-md md:max-w-xl bg-gradient-to-br from-orange-900/80 to-green-900/80 backdrop-blur-sm rounded-xl border border-orange-400/30">
            {/* 変革のコンセプト */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8"
            >
              <span className="text-gray-300">『自分には何もない』</span>
              <br className="md:hidden" />から、
              <br />
              <span className="text-orange-400">『自分にはこれがある』</span>
              <br className="md:hidden" />へ
            </motion.h1>
            
            {/* 3つの価値メッセージ */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-4 mb-8"
            >
              <div className="p-3 bg-orange-600/20 rounded-lg border border-orange-400/30">
                <p className="text-sm md:text-base text-orange-100">
                  最初は誰でも初心者。ここで見つけた『得意』が、人生を変えるきっかけになる
                </p>
              </div>
              
              <div className="p-3 bg-green-600/20 rounded-lg border border-green-400/30">
                <p className="text-sm md:text-base text-green-100">
                  一人で頑張るより、みんなで挑戦する方が圧倒的に早く成長できる
                </p>
              </div>
              
              <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-400/30">
                <p className="text-sm md:text-base text-blue-100">
                  個人の努力を、チームの力で何倍にも大きくできる場所
                </p>
              </div>
            </motion.div>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Link 
                href="/community" 
                className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-green-400"
              >
                そんなコミュニティに今なら誰でも参加できます
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* PC表示時の区切り線 - より目立つデザイン */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-2 bg-gradient-to-b from-transparent via-white/40 to-transparent transform -translate-x-1/2 z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
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