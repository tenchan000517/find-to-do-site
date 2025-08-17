'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedCharacters from './AnimatedCharacters';

export default function Discord6Page() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* Hero Section */}
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
        <div className="relative z-30 min-h-screen flex items-end justify-center px-4 pb-40">
          <div className="text-center max-w-sm mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-10"
            >
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white drop-shadow-lg text-center">
                「自分には何もない」から<br />
                「<span className="text-amber-400">自分にはこれがある</span>」が<br />
                見つかるコミュニティ
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollY < 50 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* NEW: FIND to DO Overview - 30秒で理解 */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fdba74 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8">
              <Image
                src="/characters/iida_goodjob.png"
                alt="IIDA"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              FIND to DOとは？
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              30秒で分かる基本情報
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm" style={{
              border: '1px solid #e5e7eb'
            }}>
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Discordベースのオンラインコミュニティ
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  LINEやSlackのようなチャットアプリ「Discord」を使った、24時間365日アクセス可能なコミュニティです
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm" style={{
              border: '1px solid #e5e7eb'
            }}>
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Instagram編集部が運営
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  IIDAをはじめとする5人の専門家チームが、それぞれの経験と専門性を活かしてコミュニティを運営しています
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm" style={{
              border: '1px solid #e5e7eb'
            }}>
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  実際の仕事紹介システム
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  コミュニティ内で、実際のクライアント案件や仕事を紹介。学びながら報酬を得られる仕組みを提供しています
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement - AI時代の不安 */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #fdfbff 0%, #f3f0ff 50%, #ede9fe 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8">
              <Image
                src="/characters/misaki_worry.png"
                alt="MISAKI"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              AI時代だからこそ生まれる不安
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              技術が進歩しても解決されない課題
            </p>
          </div>

          <div className="space-y-8">
            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                これからの時代、AIによって社会がどんどん最適化されていきます。でも、社会が便利になっても「不安」は取り残されます。
              </p>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm mb-8" style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                border: '1px solid #e5e7eb'
              }}>
                <p className="text-lg text-gray-800 leading-relaxed font-medium">
                  やってみないとわからないことがわからない...<br />
                  自分が何を知らないのかを知らない...
                </p>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                そんな不安を解決するのが、コミュニティの存在。<br />
                そのためにFIND to DOは存在します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* コミュニティの価値 */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8">
              <Image
                src="/characters/king_point.png"
                alt="KING"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              FIND to DOの価値
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              人の夢と希望のブースターになる
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                挑戦と発見の循環サイクル
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                DO → FIND → DO → FIND の循環で、好きを見つけ、仕事をやってみて、得意を発見し、それを活かして行動する。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                学びながら報酬を得る仕組み
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                興味を持った仕事をやってみる。お金を払って学ぶのではなく、学びながらお金をもらう。やってみないと「何がわからないかわからない」を解決します。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                一生涯の仲間との成長
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                就職・起業・転職、あなたのキャリアに伴走する仲間がいる。サービスではなくコミュニティとして、長期的な関係を築きます。
              </p>
            </div>
            
            <div className="mt-12 p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
              <p className="text-lg text-green-800 font-medium text-center leading-relaxed">
                フォーマットのない最適化された時代に、<br />
                発見と行動の間にある、<br />
                あなただけのキャリアパスを共に創ります
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Flow - より具体化 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              FIND to DOの流れ
            </h2>
            <p className="text-lg text-gray-700">
              挑戦と発見の循環を、共に創る
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-xl font-bold text-blue-600">01</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  気軽にコミュニティに参加
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Discordコミュニティで成長したい人が集まる温かい場所。まずは挨拶から始めましょう。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-xl font-bold text-green-600">02</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  日々の会話や学びに参加
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  チャンネルでの情報交換や質問、他メンバーの経験談を聞く。見てるだけでも価値があります。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-xl font-bold text-purple-600">03</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  興味があれば実際の仕事に挑戦
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  全くの未経験からでもサポートを受けながら実践。具体的な仕事内容は参加後にご案内します。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-xl font-bold text-pink-600">04</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  スキルアップ＋実績＋収入
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  自分のペースで「得意」を発見。実践を通じてスキルアップと実績を積み重ねます。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-xl font-bold text-yellow-600">05</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  「自分にはこれがある！」
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  発見した「得意」を活かして、就職・転職・起業など理想のキャリアパスを実現します。
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
            <p className="text-lg text-blue-800 font-medium text-center leading-relaxed">
              FIND to DOはサービスではなくコミュニティです<br />
              就職・起業・転職、あなたのキャリアに伴走します
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Team - 文脈付きで紹介 */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              あなたをサポートする編集部メンバー
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Instagram運営で培った経験を活かし、<br />
              5人の専門家があなたのキャリアをサポート
            </p>
            <div className="text-base text-gray-600 leading-relaxed">
              ※各メンバーは実在の人物の実績・経験をベースにした<br />
              キャラクターで、コミュニティ内でサポートを行います
            </div>
          </div>

          <div className="space-y-12">
            {/* IIDA - CEO */}
            <div className="relative overflow-hidden rounded-3xl shadow-lg" style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
              minHeight: '500px'
            }}>
              {/* 都市風景背景の模擬 */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(45deg, #1f2937 25%, transparent 25%), linear-gradient(-45deg, #1f2937 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1f2937 75%), linear-gradient(-45deg, transparent 75%, #1f2937 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <Image
                    src="/characters/iida.png"
                    alt="IIDA"
                    width={80}
                    height={80}
                    className="rounded-full shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">IIDA</h3>
                    <p className="text-lg text-blue-700 font-bold">CEO</p>
                    <p className="text-lg text-gray-700 font-medium">人の可能性を信じてる</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-blue-800 mb-3">HISTORY</h4>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li>大学入学と同時に起業塾リーダーに就任</li>
                      <li>学生時代100人以上とキャリア面談実施</li>
                      <li>社会課題を解決したい想いが人一倍強い</li>
                      <li>FIND to DOのCEOとして活動中</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-blue-800 mb-3">EXPERIENCE</h4>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li>アドラー心理学・NLP</li>
                      <li>キャリアコンサルタント</li>
                      <li>パラダイムシフター</li>
                      <li>組織開発コンサルティング</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-blue-800 mb-3">CHARACTER</h4>
                    <p className="text-base text-gray-700 leading-relaxed">
                      真面目すぎるほどに真面目な性格、基本的にポジティブ思考、デートよりキャリア相談
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* MISAKI - CMO */}
            <div className="relative overflow-hidden rounded-3xl shadow-lg" style={{
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)',
              minHeight: '500px'
            }}>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(45deg, #1f2937 25%, transparent 25%), linear-gradient(-45deg, #1f2937 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1f2937 75%), linear-gradient(-45deg, transparent 75%, #1f2937 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <Image
                    src="/characters/misaki.png"
                    alt="MISAKI"
                    width={80}
                    height={80}
                    className="rounded-full shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">MISAKI</h3>
                    <p className="text-lg text-pink-700 font-bold">CMO</p>
                    <p className="text-lg text-gray-700 font-medium">楽しくなければ仕事じゃない</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-pink-800 mb-3">HISTORY</h4>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li>新卒で営業ベンチャーに入社</li>
                      <li>26歳で育児教育に従事</li>
                      <li>EC部門をゼロから1人で築き上げた</li>
                      <li>「楽しくなければ仕事じゃない」を実践</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-pink-800 mb-3">EXPERIENCE</h4>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li>マーケター・プロモーター</li>
                      <li>戦略企画プランナー</li>
                      <li>社内広報・HR活動</li>
                      <li>女性キャリア支援</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-pink-800 mb-3">CHARACTER</h4>
                    <p className="text-base text-gray-700 leading-relaxed">
                      他の幸せを自分のことのように喜ぶ、家族の時間を最優先できる強さを持つ人
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* KING - COO */}
            <div className="relative overflow-hidden rounded-3xl shadow-lg" style={{
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 50%, #86efac 100%)',
              minHeight: '500px'
            }}>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(45deg, #1f2937 25%, transparent 25%), linear-gradient(-45deg, #1f2937 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1f2937 75%), linear-gradient(-45deg, transparent 75%, #1f2937 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <Image
                    src="/characters/king.png"
                    alt="KING"
                    width={80}
                    height={80}
                    className="rounded-full shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">KING</h3>
                    <p className="text-lg text-green-700 font-bold">COO</p>
                    <p className="text-lg text-gray-700 font-medium">今は知らなくても大丈夫！君はすごいんだ！</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-green-800 mb-3">HISTORY</h4>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li>大学で経営学と心理学を学ぶ</li>
                      <li>筋トレに人生の充実感を見出す</li>
                      <li>天然すぎるほどの熱血漢として活動</li>
                      <li>IQ135のインテリでありながら筋トレオタク</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-green-800 mb-3">EXPERIENCE</h4>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li>POWERコーチ理論開始者</li>
                      <li>組織開発コンサルタント</li>
                      <li>人材育成プランナー</li>
                      <li>モチベーションコーチ</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-green-800 mb-3">CHARACTER</h4>
                    <p className="text-base text-gray-700 leading-relaxed">
                      人の可能性を心から信じ抜く熱血漢、IQ135のインテリなのに天然、本気で興奮する
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* KIKUYO - CIO */}
            <div className="relative overflow-hidden rounded-3xl shadow-lg" style={{
              background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 50%, #fde68a 100%)',
              minHeight: '500px'
            }}>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(45deg, #1f2937 25%, transparent 25%), linear-gradient(-45deg, #1f2937 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1f2937 75%), linear-gradient(-45deg, transparent 75%, #1f2937 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <Image
                    src="/characters/kikuyo.png"
                    alt="KIKUYO"
                    width={80}
                    height={80}
                    className="rounded-full shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">KIKUYO</h3>
                    <p className="text-lg text-yellow-700 font-bold">CIO</p>
                    <p className="text-lg text-gray-700 font-medium">人生で向き合うべき課題があって、初めてデータは生きるのです！</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-yellow-800 mb-3">HISTORY</h4>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li>幼少期から数学と統計に魅了される</li>
                      <li>データサイエンスの世界に心を奪われる</li>
                      <li>キャリアビジョンにおけるAIモデルを開発</li>
                      <li>データの力で人の可能性を引き出す</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-yellow-800 mb-3">EXPERIENCE</h4>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li>データサイエンティスト</li>
                      <li>AIモデルエンジニア</li>
                      <li>アナリティクスアーキテクト</li>
                      <li>スマートアナリティクス</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-yellow-800 mb-3">CHARACTER</h4>
                    <p className="text-base text-gray-700 leading-relaxed">
                      統計的に物事を判断する完璧主義者、計算は得意だけど雑談は苦手
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TEN - 最高血流責任者 */}
            <div className="relative overflow-hidden rounded-3xl shadow-lg" style={{
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 50%, #d8b4fe 100%)',
              minHeight: '500px'
            }}>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(45deg, #1f2937 25%, transparent 25%), linear-gradient(-45deg, #1f2937 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1f2937 75%), linear-gradient(-45deg, transparent 75%, #1f2937 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <Image
                    src="/characters/ten_point.png"
                    alt="TEN"
                    width={80}
                    height={80}
                    className="rounded-full shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">TEN</h3>
                    <p className="text-lg text-purple-700 font-bold">最高血流責任者</p>
                    <p className="text-lg text-gray-700 font-medium">痛みの乗り越え方は仲間が教えてくれる</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-purple-800 mb-3">HISTORY</h4>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li>大手ハウスメーカー住宅営業で新人賞獲得</li>
                      <li>フランチャイズ（FC）にて2年間で月次新規開拓</li>
                      <li>営業から飲食、IT、WEBプロジェクトまで幅広く活躍</li>
                      <li>様々な分野で結果を出し続けてきた</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-purple-800 mb-3">EXPERIENCE</h4>
                    <ul className="text-base text-gray-700 space-y-2">
                      <li>フルスタックエンジニア</li>
                      <li>ブロックチェーンエンジニア</li>
                      <li>プロダクトプログラマー</li>
                      <li>営業コンサルタント</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-purple-800 mb-3">CHARACTER</h4>
                    <p className="text-base text-gray-700 leading-relaxed">
                      営業が得意なのに極度の人見知り、「上には上がいる」が口癖の中二病者
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discord詳細 - 前提が理解された後で */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              なぜDiscordを使うのか？
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              コミュニティプラットフォームとしての<br />
              Discordの優位性
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                LINEやSlackと同じチャットツール
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                メッセージのやり取りができる、馴染みのあるコミュニケーションツールです。世界中で3億人以上が利用しています。
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                双方向のコミュニケーション
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                一方通行のメルマガではなく、質問したい時に答えてくれる誰かが身近にいる。リアルタイムでサポートを受けられます。
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                企業・教育機関での実績
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                多くの企業や大学でも正式に導入されている信頼性の高いツール。セキュリティも万全で安心して利用できます。
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                24時間365日アクセス可能
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                時間や場所を選ばず、スマホ1つでコミュニティにアクセス。あなたのペースで参加できる環境です。
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="mb-8">
              <Image
                src="/characters/iida_communication.png"
                alt="IIDA"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              使い慣れない方には、使い方から丁寧にサポートします。<br />
              技術的な不安は一切心配いりません。
            </p>
          </div>
        </div>
      </section>

      {/* 参加方法 */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              簡単3ステップで参加
            </h2>
            <p className="text-lg text-gray-700">
              今すぐ始められます
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Discordアプリをダウンロード</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                App Store / Google PlayまたはPCで「Discord」をダウンロード。無料で簡単にインストールできます。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">招待リンクをクリック</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                下のボタンからコミュニティに参加。最初は見学だけでも全く問題ありません。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">自己紹介で挨拶</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                #自己紹介チャンネルで簡単に挨拶。編集部メンバーが温かくお迎えします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              よくあるご質問
            </h2>
            <p className="text-lg text-gray-700">
              参加前の不安を解消
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. 参加に費用はかかりますか？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. いいえ、完全無料です。FIND to DOは講座ではなく、あなたのサードプレイスになりたいコミュニティです。
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. 初心者でも大丈夫ですか？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. もちろんです。Discordの使い方から仕事の進め方まで、先輩メンバーが丁寧にサポートします。
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. 毎日参加しないといけませんか？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. いいえ、自由です。気が向いた時だけ、週1回だけでも価値があります。自分のペースで大丈夫です。
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. どんな仕事ができますか？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. ライティング、デザイン、データ分析、企画など様々。あなたの興味に合わせて、未経験からでもサポートします。
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. 参加に資格や条件はありますか？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. ありません。誰でも歓迎です。学生も社会人も、年齢も経験も一切関係ありません。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 25%, #c026d3 50%, #e11d48 75%, #dc2626 100%)'
      }}>
        <div className="max-w-sm mx-auto text-center text-white">
          <div className="mb-10">
            <Image
              src="/characters/iida_fighting.png"
              alt="IIDA"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          
          <div className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold leading-tight">
              あなたが仲間になってくれることを<br />
              心から楽しみにしています
            </h2>
            
            <p className="text-xl leading-relaxed opacity-95">
              Discordコミュニティで、<br />
              一生続けられるサークルのような<br />
              サードプレイスを一緒に作りましょう
            </p>
            
            <div className="bg-white bg-opacity-20 p-8 rounded-2xl backdrop-blur-sm">
              <p className="text-lg font-medium leading-relaxed">
                「自分には何もない」から<br />
                「自分にはこれがある」が見つかる<br />
                コミュニティ
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <a
              href="https://discord.gg/xQM6NgmwPk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-white text-purple-700 font-bold py-4 px-6 rounded-2xl text-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              今すぐコミュニティに参加する
            </a>
            
            <div className="flex items-center justify-center space-x-6 text-lg opacity-95">
              <span>完全無料</span>
              <span>自分のペース</span>
              <span>いつでも退会OK</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Floating CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="max-w-sm mx-auto">
          <a
            href="https://discord.gg/xQM6NgmwPk"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center"
          >
            コミュニティに参加する
          </a>
        </div>
      </div>
    </div>
  );
}