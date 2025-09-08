'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedCharacters from '../discord/AnimatedCharacters';
import EventApplicationForm from './components/EventApplicationForm';

export default function EventForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFormSuccess = () => {
    setShowSuccess(true);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // フォームの可視性を監視
  useEffect(() => {
    console.log('フォーム監視を開始');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          console.log('フォーム観測:', {
            id: entry.target.id,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio
          });
          
          if (entry.target.id === 'application-form') {
            setIsFormVisible(entry.isIntersecting);
            console.log('フォーム表示状態を更新:', entry.isIntersecting);
          }
        });
      },
      { 
        threshold: [0, 0.1, 0.5],
        rootMargin: '50px 0px'
      }
    );

    // 1秒後にフォーム要素を探す（確実に読み込まれるまで待つ）
    const timer = setTimeout(() => {
      const formElement = document.getElementById('application-form');
      console.log('フォーム要素:', formElement);
      
      if (formElement) {
        observer.observe(formElement);
        console.log('フォーム監視開始');
      } else {
        console.error('フォーム要素が見つかりません');
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      console.log('フォーム監視終了');
    };
  }, []);

  return (
    <>
      {/* event-formページ専用スタイル：ヘッダー分の余白を除去 */}
      <style jsx global>{`
        main { 
          padding-top: 0 !important; 
        }
      `}</style>
      <div className="min-h-screen bg-white overflow-x-hidden" style={{
        WebkitOverflowScrolling: 'touch',
        willChange: 'scroll-position'
      }}>
      

      {/* Success Message */}
      {showSuccess && (
        <section className="py-16 bg-white relative">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12">
              <div className="mb-6">
                <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                お申込みありがとうございます
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  イベントへのお申込みを受け付けました。
                </p>
                <p>
                  ご不明な点がございましたら、お気軽にお問い合わせください。
                </p>
              </div>
              <div className="mt-8">
                {/* <button
                  onClick={() => setShowSuccess(false)}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  新規申込
                </button> */}
              </div>
            </div>
          </div>
        </section>
      )}

      {!showSuccess && (
        <>
          {/* Hero Section - Discord完全コピー */}
          <section className="relative min-h-screen overflow-hidden">
            {/* Background Images */}
            <div className="absolute inset-0">
              {/* PC Background */}
              <div className="hidden md:block absolute inset-0">
                <Image
                  src="/hero/pc_bg.png"
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Mobile Background */}
              <div className="md:hidden absolute inset-0">
                <Image
                  src="/hero/sp_bg.png"
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-600/10 to-blue-900/20" />
            </div>

            {/* Animated Characters */}
            <AnimatedCharacters />

            {/* Content */}
            <div className="relative z-50 min-h-screen flex items-end justify-center px-1 pb-28">
              <div className="text-center max-w-sm md:max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-10"
                >
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight text-white drop-shadow-lg text-center">
                    27卒必見！<br />
                    ゲームで企業の方と繋がれる<br />
                    【完全無料・限定10名】<br />
                    就活イベント！
                  </h1>
                </motion.div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: scrollY < 50 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30"
            >
              <div className="animate-bounce">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30 shadow-lg">
                  <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </section>


          {/* 対象者セクション - 2番目に移動 */}
          <section className="py-20" style={{
            background: 'linear-gradient(135deg, #f8faff 0%, #f1f5ff 50%, #e8f2ff 100%)'
          }}>
            <div className="max-w-sm mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  こんな<span className="text-orange-600">27卒の方</span>必見
                </h2>
                <p className="text-lg text-gray-600">１つでも当てはまったら、このイベントはあなたのためのものです</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">普段の説明会ではしっくりこない方</h3>
                  <p className="text-gray-700 leading-relaxed">決まりきった説明と質疑応答にうんざりしていませんか？</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">企業の方と直接お話したい方</h3>
                  <p className="text-gray-700 leading-relaxed">本当の職場の雰囲気や働く人の人柄を知りたいですよね？</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">ヒトガラを重視したい方</h3>
                  <p className="text-gray-700 leading-relaxed">給料や福利厚生だけでなく、人間関係を大切にしたい方へ。</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">就活が近づいているものの決めきれていない方</h3>
                  <p className="text-gray-700 leading-relaxed">まだ志望業界や企業が定まっていない方も大歓迎です。</p>
                </div>
              </div>
            </div>
          </section>

          {/* イベント基本情報セクション */}
          <section className="py-20 px-6 bg-white" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
            <div className="max-w-sm mx-auto text-center">
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">イベント基本情報</h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">開催日時</h3>
                    <p className="text-lg text-gray-700">10/11(土) 13:00-17:00</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">会場</h3>
                    <p className="text-lg text-gray-700">ウインクあいち<br />（名古屋駅徒歩7分）</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">定員</h3>
                    <p className="text-lg text-gray-700">先着10名限定</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl shadow-sm border-2 border-purple-200">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">参加費</h3>
                    <p className="text-2xl font-bold text-purple-800">無料イベントです</p>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* 3つの特徴セクション */}
          <section className="py-20" style={{
            background: 'linear-gradient(135deg, #f8faff 0%, #f1f5ff 50%, #e8f2ff 100%)'
          }}>
            <div className="max-w-sm mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  ヒトガラmeetの<br />
                  <span className="text-blue-600">3つの特徴</span>
                </h2>
                <p className="text-lg text-gray-600">他にはない新しいスタイルの就活イベント</p>
              </div>

              <div className="space-y-8">
                {/* POINT1 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
                  <div className="text-center mb-4">
                    <span className="bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-full">POINT1</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 text-center mb-4">ゲームで自然に繋がる</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    普通のイベントとは一風変わった、ゲームを通じた出会いを楽しむことができます。<br />
                    緊張せずに本来の自分を表現できます。
                  </p>
                </div>

                {/* POINT2 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg">
                  <div className="text-center mb-4">
                    <span className="bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-full">POINT2</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 text-center mb-4">ヒトガラを感じられる</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    企業の概要だけでなく、ゲームを通じて企業の方の「ヒトガラ」を感じてもらいます。<br />
                    本当の職場の雰囲気が分かります。
                  </p>
                </div>

                {/* POINT3 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg">
                  <div className="text-center mb-4">
                    <span className="bg-purple-500 text-white text-sm font-bold py-2 px-4 rounded-full">POINT3</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-800 text-center mb-4">アフターフォローも</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    イベントの後も、インターンシップまでの支援など、手厚いサポートがあります。<br />
                    就活成功まで徹底サポート。
                  </p>
                </div>
              </div>
            </div>
          </section>


          {/* 申込フォーム */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            <EventApplicationForm onSuccess={handleFormSuccess} />
          </div>

          {/* 価値提案セクション - フォーム後に移動 */}
          <section className="py-20 px-6 bg-white" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
            <div className="max-w-sm mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  なぜ従来の就活イベントでは<br />
                  <span className="text-red-600">しっくりこない</span>のか？
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  堅苦しい説明会、一方的な企業説明、緊張する面接形式...<br />
                  本当のあなたを知ってもらう機会はありましたか？
                </p>
              </div>

              {/* 従来の問題点 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">従来の就活イベントの問題点</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-gray-700">一方的な企業説明で質問しづらい</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-gray-700">緊張して本来の自分を出せない</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-gray-700">企業の人柄が見えてこない</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-gray-700">表面的な情報しか得られない</p>
                  </div>
                </div>
              </div>

              {/* ヒトガラmeetの解決策 */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">ヒトガラmeetなら...</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-gray-700">ゲームを通じて自然な会話が生まれる</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-gray-700">リラックスした雰囲気で本来の自分を表現</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-gray-700">企業の方の人柄も見える</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-gray-700">深いコミュニケーションが可能</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 注意事項セクション */}
          <section className="py-20" style={{
            background: 'linear-gradient(135deg, #f8faff 0%, #f1f5ff 50%, #e8f2ff 100%)'
          }}>
            <div className="max-w-sm mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">重要な注意事項</h2>
              </div>

              <div className="space-y-6 mb-12">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-sm border border-yellow-200">
                  <p className="text-gray-700 font-medium">日時をしっかり押さえていただくようお願いします。</p>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-2xl shadow-sm border border-red-200">
                  <p className="text-gray-700 font-medium">当日来れなくなった方はお早めに連絡をお願いいたします。</p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl shadow-sm border border-orange-200">
                  <p className="text-gray-700 font-medium">申込は先着10名までとなります</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">連絡先</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800 mb-1">メール</p>
                    <p className="text-gray-700">findtodo.iida@gmail.com</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">電話</p>
                    <p className="text-gray-700">090-4264-9939</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12 text-sm text-gray-600">
                <p>ご不明な点がございましたら、お気軽にお問い合わせください</p>
                <p className="mt-2">© 2025 FIND to DO - Special Event</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Fixed Floating CTA Button - Discordと同じスタイル */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-opacity duration-300 ${isFormVisible || showSuccess ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-sm mx-auto">
          <button
            onClick={scrollToForm}
            className="block w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] text-center"
          >
            今すぐ参加
          </button>
        </div>
      </div>

    </div>
    </>
  );
}