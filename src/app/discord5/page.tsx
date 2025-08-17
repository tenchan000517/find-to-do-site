'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Discord5Page() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #f8f9ff 0%, #ede9fe 25%, #ddd6fe 50%, #c4b5fd 75%, #a78bfa 100%)'
      }}>
        <div className="relative z-10 text-center px-6 py-8 max-w-sm mx-auto">
          <div className="mb-8">
            <Image
              src="/characters/iida.png"
              alt="IIDA"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          
          <div className="space-y-6 mb-8">
            <div className="text-lg text-gray-700 font-medium leading-relaxed">
              ありのままの自分で大丈夫
            </div>
            <h1 className="text-2xl font-bold leading-tight text-gray-800">
              「自分には何もない」から<br />
              「自分にはこれがある」が<br />
              見つかるコミュニティ
            </h1>
          </div>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            24時間365日開かれたコミュニティで、<br />
            実践しながら報酬を得て、<br />
            一生涯の仲間とキャリアを築く
          </p>
          
          <div className="space-y-4">
            <a
              href="https://discord.gg/xQM6NgmwPk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              コミュニティに参加する
            </a>
            
            <div className="flex items-center justify-center space-x-6 text-lg text-gray-600">
              <span>完全無料</span>
              <span>いつでも退会OK</span>
            </div>
          </div>
        </div>
      </section>

      {/* FIND to DO Understanding */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #fdfbff 0%, #f3f0ff 50%, #ede9fe 100%)'
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
              FIND to DOが大切にしていること
            </h2>
            <p className="text-xl text-gray-700 font-medium leading-relaxed">
              人の夢と希望のブースターになる
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

      {/* 有料コミュニティとの違い */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #fffbf3 0%, #fef7e7 50%, #fef3cd 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              よくある有料オンラインサロンとは<br />
              根本的に違います
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              FIND to DOは完全に新しいコミュニティの形です
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-red-800 mb-4">
                一般的な有料コミュニティ
              </h3>
              <ul className="text-lg text-red-700 space-y-3">
                <li>月額数千円〜数万円の費用</li>
                <li>限定情報の一方的な提供</li>
                <li>主催者と参加者の上下関係</li>
                <li>見るだけ・学ぶだけの受け身</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                FIND to DO コミュニティ
              </h3>
              <ul className="text-lg text-green-700 space-y-3">
                <li>参加・発言・全チャンネル完全無料</li>
                <li>実践しながら報酬を得られる</li>
                <li>対等な仲間として一緒に成長</li>
                <li>自分のペースで能動的に参加</li>
              </ul>
            </div>
            
            <div className="mt-12 p-8 bg-white rounded-2xl shadow-sm">
              <p className="text-lg text-gray-800 font-medium text-center leading-relaxed">
                お金を払って学ぶのではなく、<br />
                実践しながらお金をもらう。<br />
                これが FIND to DO です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Flow */}
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
                  成長したい人が集まる温かい場所
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
                  見てるだけでも、たまに発言でもOK
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
                  全くの未経験からでもサポートを受けながら実践
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
                  自分のペースで「得意」を発見
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
                  「得意」を活かして理想のキャリアを実現
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

      {/* Editorial Team - 雑誌風デザイン完全再現 */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Instagram編集部メンバー紹介
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
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

      {/* Discordって何？ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Discordって何？
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              「Discord」を初めて聞く方へ、<br />
              分かりやすくご説明します
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                LINEのようなチャットアプリです
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                メッセージのやり取りができる、LINEやSlackのようなコミュニケーションツールです。世界中で3億人以上が利用しています。
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                企業や大学でも活用されています
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                ゲーマー向けのイメージがあるかもしれませんが、実際には多くの企業、教育機関、コミュニティで正式に利用されている信頼性の高いツールです。
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                無料で安全に使えます
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                基本機能は完全無料。セキュリティも万全で、個人情報の管理も厳重に行われています。退会もいつでも簡単にできます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Discord */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #fdfbff 0%, #f3f0ff 50%, #ede9fe 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8">
              <Image
                src="/characters/iida_communication.png"
                alt="IIDA"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              私たちがDiscordにこだわる理由
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                双方向のコミュニケーション
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                LINEの公式アカウントやメルマガのような一方通行ではなく、質問したい時に答えてくれる誰かが身近にいると心強い、という私たちの経験から。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                初心者の方への配慮
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                使い慣れない方もいらっしゃることは重々承知しています。私たちは長く皆様をサポートし関わっていきたいと思っておりますので、使い方からサポートします。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                ビジネス利用の実績
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                世界中で3億人以上が利用し、多くの企業や教育機関でも正式に導入されている、信頼性の高いコミュニケーションツールです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Join */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              段階的参加方法
            </h2>
            <p className="text-lg text-gray-700">
              あなたのペースで無理なく参加できます
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">0</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">まず理解する</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                FIND to DOとは何か、Discordとは何かを理解。このページを読むだけでもOKです。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">アプリをインストール</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                スマホやPCにDiscordアプリをダウンロード。使い方が分からない方には個別にサポートします。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">コミュニティに参加</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                招待リンクからコミュニティに参加。最初は見るだけでも全く問題ありません。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-pink-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">発言してみる</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                自己紹介や質問から始めてみる。間違いを恐れる必要はありません。温かいコミュニティです。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-yellow-600">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">活用する</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                実際の仕事に挑戦したり、イベントに参加したり、あなたのペースでキャリアを築いていく。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support System */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8">
              <Image
                src="/characters/misaki_smile.png"
                alt="MISAKI"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              手厚いサポート体制
            </h2>
            <p className="text-lg text-gray-700">
              一人ひとりを大切にする、具体的なサポート
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                24時間以内の返信保証
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                質問や相談には必ず24時間以内に編集部メンバーが返信します。一人で悩む時間を最小限に。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                個別メンター制度
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                希望者には専任のメンターを割り当て。あなたの目標に合わせた個別のキャリア設計をサポートします。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                技術・設定サポート
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Discordの使い方が分からない、設定に困ったなど、技術的な問題も丁寧にサポートします。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                失敗OK環境
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                うまくいかなくても大丈夫。失敗から学ぶことを重視し、挑戦を応援するコミュニティです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Discord不安解消重視 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              よくあるご質問
            </h2>
            <p className="text-lg text-gray-700">
              Discord参加への不安を解消
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. Discordって安全ですか？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. はい、安全です。世界中で3億人以上が利用する信頼性の高いプラットフォームで、企業や教育機関でも正式に利用されています。
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. 参加に費用はかかりますか？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. いいえ、完全無料です。FIND to DOは講座や教材ではなく、あなたのサードプレイスになりたいコミュニティです。
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. スマホだけでも参加できますか？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. はい、スマホアプリで完全に参加可能です。PCがなくても全く問題ありません。
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. 毎日参加しないといけませんか？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. いいえ、自由です。週1回、5分だけでも価値があります。自分のペースで大丈夫です。
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. 使い方が分からなくても大丈夫？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. もちろんです。初心者向けの説明から個別サポートまで、使い方を一から丁寧にお教えします。
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Q. どんな仕事ができますか？
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A. ライティング、デザイン、分析、企画など様々。あなたの興味に合わせて、未経験からでもサポートします。
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
              24時間365日開かれたコミュニティで、<br />
              一生続けられるサークルのような<br />
              サードプレイスです
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
    </div>
  );
}