'use client';

import { DESIGN_SYSTEM } from '@/styles/design-system';
import { Heart, Users, Smartphone, Link, UserCheck, ArrowRight, CheckCircle, Star, MessageCircle, Zap, Target, Award, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Discord3Page() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* Hero Section - 3秒以内の心理的フック */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* 背景グラデーション - 未来への可能性を暗示 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/60"></div>
        </div>
        
        {/* 都市風景のような背景エフェクト */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-64 bg-blue-400 rounded-lg transform rotate-12"></div>
          <div className="absolute top-40 right-8 w-24 h-48 bg-purple-400 rounded-lg transform -rotate-6"></div>
          <div className="absolute bottom-32 left-20 w-20 h-40 bg-orange-400 rounded-lg transform rotate-3"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 py-8 max-w-sm mx-auto">
          {/* キャラクター - 希望の象徴として配置 */}
          <div className="mb-6 relative">
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-orange-400 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
            <Image
              src="/characters/iida.png"
              alt="IIDA - あなたの可能性を信じています"
              width={110}
              height={110}
              className="mx-auto drop-shadow-lg"
            />
          </div>
          
          {/* メインメッセージ - 痛みから希望への転換点 */}
          <div className="space-y-3 mb-8">
            <div className="text-sm text-gray-500 font-medium tracking-wide">
              ありのままの自分で大丈夫
            </div>
            <h1 className="text-2xl font-bold leading-tight">
              <div className="text-gray-600 mb-1">「自分には何もない」</div>
              <div className="text-gray-800 mb-1">そんなあなたにこそ</div>
              <div className="text-orange-500 text-2xl">無限の可能性がある</div>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-purple-400 mx-auto rounded-full"></div>
          </div>
          
          {/* 感情的な共感メッセージ */}
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            <span className="font-medium text-gray-700">今のモヤモヤ、不安、迷い...</span><br />
            それ全部、<span className="text-orange-500 font-medium">成長の種</span>なんです。
          </p>
          
          {/* 緊急性とリスク排除を組み合わせたCTA */}
          <div className="space-y-4">
            <a
              href="https://discord.gg/xQM6NgmwPk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-orange-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>今すぐ仲間に出会う</span>
              </div>
            </a>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>完全無料</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>30秒で参加</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>いつでも退会OK</span>
              </div>
            </div>
          </div>
          
          {/* スクロール誘導 */}
          <div className="mt-12 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400 mx-auto" />
            <div className="text-xs text-gray-400 mt-1">なぜ可能性があるのか？</div>
          </div>
        </div>
      </section>

      {/* Problem Identification - 共感による心理的接続 */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Image
                src="/characters/misaki_worry.png"
                alt="同じ気持ちを経験したMISAKI"
                width={80}
                height={80}
                className="mx-auto opacity-90"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mt-4 mb-2">
              こんなモヤモヤ、ありませんか？
            </h2>
            <div className="text-sm text-gray-500">
              （実は、みんな同じことで悩んでます）
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { text: "やりたいことが見つからない...", color: "bg-red-50 border-red-100" },
              { text: "自分の強みがわからない...", color: "bg-orange-50 border-orange-100" },
              { text: "将来への漠然とした不安...", color: "bg-yellow-50 border-yellow-100" },
              { text: "周りと比べて焦ってしまう...", color: "bg-blue-50 border-blue-100" }
            ].map((item, index) => (
              <div key={index} className={`${item.color} border p-4 rounded-xl transform transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <p className="text-gray-700 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Heart className="w-6 h-6 text-purple-500" />
              </div>
              <p className="text-purple-800 font-medium text-sm">
                大丈夫。それ、<span className="font-bold">みんな通る道</span>です。<br />
                そして、<span className="text-orange-500 font-bold">ここで変われます</span>。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Introduction - FIND to DOの本質的価値 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block relative">
              <Image
                src="/characters/iida_goodjob.png"
                alt="解決策を示すIIDA"
                width={90}
                height={90}
                className="mx-auto"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
              FIND to DOって何？
            </h2>
            <p className="text-sm text-gray-600">
              「お金をもらいながら学べる」新しい成長の場
            </p>
          </div>
          
          {/* 5ステップフロー - 視覚的にわかりやすく */}
          <div className="space-y-4">
            {[
              { 
                num: "01", 
                title: "気軽にコミュニティ参加", 
                desc: "まずはのぞいてみるだけでOK",
                color: "from-purple-100 to-purple-200",
                textColor: "text-purple-700",
                icon: Users
              },
              { 
                num: "02", 
                title: "日々の学びに参加", 
                desc: "見てるだけ、たまに発言、自由なスタイル",
                color: "from-blue-100 to-blue-200",
                textColor: "text-blue-700",
                icon: MessageCircle
              },
              { 
                num: "03", 
                title: "実際の仕事に挑戦", 
                desc: "未経験OK！サポート付きで安心",
                color: "from-green-100 to-green-200",
                textColor: "text-green-700",
                icon: Target
              },
              { 
                num: "04", 
                title: "スキル＋実績＋収入", 
                desc: "成長しながらお金ももらえる",
                color: "from-orange-100 to-orange-200",
                textColor: "text-orange-700",
                icon: Award
              },
              { 
                num: "05", 
                title: "「これが私の得意！」", 
                desc: "理想のキャリアへの確信",
                color: "from-pink-100 to-pink-200",
                textColor: "text-pink-700",
                icon: Star
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className={`bg-gradient-to-r ${step.color} p-5 rounded-2xl border border-white shadow-sm`}>
                  <div className="flex items-start space-x-4">
                    <div className={`${step.textColor} bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-sm`}>
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${step.textColor} mb-1 text-sm`}>{step.title}</h3>
                      <p className="text-xs text-gray-600">{step.desc}</p>
                    </div>
                    <step.icon className={`w-5 h-5 ${step.textColor} opacity-60`} />
                  </div>
                </div>
                {index < 4 && (
                  <div className="flex justify-center my-2">
                    <ArrowRight className="w-4 h-4 text-gray-300 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-100">
            <div className="text-center">
              <Zap className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <p className="text-orange-800 font-medium text-sm">
                <span className="font-bold">普通の学習との違い：</span><br />
                お金を<span className="text-red-500 line-through">払って</span>学ぶ → お金を<span className="text-green-600 font-bold">もらいながら</span>学ぶ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - 不安解消による信頼構築 */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-10">
            <Image
              src="/characters/kikuyo_point.png"
              alt="親切に説明するKIKUYO"
              width={85}
              height={85}
              className="mx-auto"
            />
            <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
              よくある質問
            </h2>
            <p className="text-sm text-gray-600">
              不安や疑問、すべてお答えします
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "本当に無料ですか？",
                a: "はい、完全無料です",
                detail: "講座や教材ではなく、あなたのサードプレイスとして運営しています。",
                color: "purple"
              },
              {
                q: "初心者でも大丈夫？",
                a: "むしろ初心者歓迎です！",
                detail: "みんな初心者からスタート。使い方から丁寧にサポートします。",
                color: "blue"
              },
              {
                q: "毎日参加必須？",
                a: "全く必要ありません",
                detail: "月1回でも、見るだけでも、あなたのペースで大丈夫です。",
                color: "green"
              },
              {
                q: "目的がなくても？",
                a: "むしろその方が良い！",
                detail: "なんとなく参加→興味発見→得意発見が理想的な流れです。",
                color: "orange"
              }
            ].map((faq, index) => (
              <div key={index} className={`bg-${faq.color}-50 border border-${faq.color}-100 rounded-2xl p-5 transform transition-all duration-300 hover:scale-[1.02]`}>
                <div className="space-y-2">
                  <div className={`text-${faq.color}-800 font-bold text-sm`}>Q. {faq.q}</div>
                  <div className={`text-${faq.color}-700 font-medium text-sm`}>A. {faq.a}</div>
                  <div className={`text-${faq.color}-600 text-xs leading-relaxed`}>{faq.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Team - 信頼と専門性の証明 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              5人の編集部が全力サポート
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              それぞれの専門分野で、あなたの成長を<br />
              <span className="font-bold text-orange-500">本気で</span>応援します
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                name: "IIDA",
                role: "CEO",
                catchphrase: "人の可能性を信じてる",
                specialty: "キャリアコンサルタント・心理学",
                bgColor: "from-blue-400 to-blue-600",
                image: "/characters/iida.png",
                message: "あなたの中に眠る可能性、一緒に見つけましょう"
              },
              {
                name: "KIKUYO",
                role: "CIO",
                catchphrase: "データで人生をより良く",
                specialty: "データサイエンティスト・AI",
                bgColor: "from-yellow-400 to-yellow-600",
                image: "/characters/kikuyo.png",
                message: "客観的な分析で、あなたの成長をサポート"
              },
              {
                name: "KING",
                role: "COO",
                catchphrase: "君はすごいんだ！",
                specialty: "組織開発・モチベーション",
                bgColor: "from-green-400 to-green-600",
                image: "/characters/king.png",
                message: "あなたの可能性は無限大！一緒に挑戦しよう"
              },
              {
                name: "MISAKI",
                role: "CMO",
                catchphrase: "楽しくなければ仕事じゃない",
                specialty: "マーケティング・女性支援",
                bgColor: "from-pink-400 to-pink-600",
                image: "/characters/misaki.png",
                message: "楽しみながら成長できる環境を作ります"
              },
              {
                name: "TEN",
                role: "CTO",
                catchphrase: "楽しくなければ人生じゃない",
                specialty: "エンジニアリング・営業",
                bgColor: "from-purple-400 to-purple-600",
                image: "/characters/ten_point.png",
                message: "技術も営業も、楽しく学べる方法教えます"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className={`bg-gradient-to-r ${member.bgColor} px-5 py-4 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <div className="text-sm opacity-90">{member.role}</div>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-sm font-medium opacity-95">
                      「{member.catchphrase}」
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">SPECIALTY</div>
                      <div className="text-sm text-gray-700">{member.specialty}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">MESSAGE</div>
                      <div className="text-sm text-gray-700 italic">"{member.message}"</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl border border-purple-100">
            <div className="text-center">
              <Users className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <p className="text-gray-800 font-medium text-sm">
                <span className="font-bold">5人の専門家</span>が、あなた一人ひとりの<br />
                成長を<span className="text-orange-500 font-bold">本気で</span>サポートします
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Discord - プラットフォーム選択の理由 */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-10">
            <div className="relative inline-block">
              <Heart className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Discordにこだわる理由
            </h2>
            <p className="text-sm text-gray-600">
              なぜLINEやメールではダメなのか？
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-800 mb-2">双方向のリアルタイムコミュニケーション</h3>
                  <p className="text-sm text-purple-700 leading-relaxed">
                    LINEの一方通行配信ではなく、質問したい時にすぐ答えてくれる人がいる。この「距離の近さ」がDiscordならではの価値です。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-orange-800 mb-2">初心者への徹底サポート</h3>
                  <p className="text-sm text-orange-700 leading-relaxed">
                    「使い方がわからない」という方こそ大歓迎。私たちが長期的にサポートしたいからこそ、使い方から丁寧にお教えします。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-orange-100 rounded-2xl border border-purple-200">
            <div className="text-center">
              <p className="text-gray-800 font-medium text-sm">
                あなたが快適に過ごせるまで、<br />
                <span className="font-bold text-purple-600">とことん寄り添います</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join - 行動への具体的ステップ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              参加は簡単3ステップ
            </h2>
            <p className="text-sm text-gray-600">
              30秒で完了！今すぐ始められます
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                step: "STEP 1",
                title: "Discordアプリをダウンロード",
                desc: "App Store・Google Play・PCで「Discord」をダウンロード",
                icon: Smartphone,
                color: "orange"
              },
              {
                step: "STEP 2", 
                title: "招待リンクをクリック",
                desc: "下のボタンを押すだけで、コミュニティに参加完了",
                icon: Link,
                color: "green"
              },
              {
                step: "STEP 3",
                title: "自己紹介（任意）",
                desc: "#自己紹介で簡単な挨拶。なしでも全然OK！",
                icon: UserCheck,
                color: "blue"
              }
            ].map((item, index) => (
              <div key={index} className={`bg-${item.color}-50 border border-${item.color}-100 rounded-2xl p-6`}>
                <div className="flex items-start space-x-4">
                  <div className={`bg-${item.color}-100 rounded-full p-3 flex-shrink-0`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-${item.color}-600 text-xs font-bold uppercase tracking-wide mb-1`}>
                      {item.step}
                    </div>
                    <h3 className={`font-bold text-${item.color}-800 mb-2`}>{item.title}</h3>
                    <p className={`text-sm text-${item.color}-700`}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-center text-xs text-gray-600">
              💡 <span className="font-medium">困ったら？</span><br />
              参加後、#質問チャンネルで何でも聞いてください！
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Showcase - 参加後の具体的メリット */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-10">
            <Image
              src="/characters/misaki_smile.png"
              alt="幸せそうなMISAKI"
              width={85}
              height={85}
              className="mx-auto"
            />
            <h2 className="text-xl font-bold text-gray-800 mt-4 mb-3">
              参加するとこんな良いことが
            </h2>
            <p className="text-sm text-gray-600">
              実際に体験できる具体的なメリット
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                icon: "💰",
                title: "学びながらお金がもらえる",
                desc: "普通は「お金を払って学ぶ」。ここでは「学びながらお金をもらう」",
                color: "green"
              },
              {
                icon: "⏰",
                title: "24時間365日つながれる",
                desc: "深夜でも早朝でも、誰かがいる安心感",
                color: "blue"
              },
              {
                icon: "👥",
                title: "一生涯の仲間ができる",
                desc: "オンラインでも、リアルでも、ずっと続く関係性",
                color: "purple"
              },
              {
                icon: "🎯",
                title: "自分だけの「得意」が見つかる",
                desc: "やってみないとわからない、あなただけの才能",
                color: "orange"
              },
              {
                icon: "📈",
                title: "具体的な実績が積める",
                desc: "面接で語れる、履歴書に書ける、リアルな経験",
                color: "pink"
              }
            ].map((benefit, index) => (
              <div key={index} className={`bg-${benefit.color}-50 border border-${benefit.color}-100 rounded-2xl p-5 transform transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{benefit.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-${benefit.color}-800 mb-1 text-sm`}>{benefit.title}</h3>
                    <p className={`text-${benefit.color}-700 text-xs leading-relaxed`}>{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - 決断への最後の一押し */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white relative overflow-hidden">
        {/* 背景エフェクト */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-8 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-sm mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="relative inline-block">
              <Image
                src="/characters/iida_fighting.png"
                alt="やる気に満ちたIIDA"
                width={100}
                height={100}
                className="mx-auto filter drop-shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-bold leading-tight">
              迷っている時間が<br />
              <span className="text-yellow-300">もったいない</span>！
            </h2>
            <p className="text-lg leading-relaxed opacity-95">
              <span className="font-bold text-yellow-300">今のあなたのまま</span>で大丈夫。<br />
              完璧になってから参加する必要はありません。
            </p>
            <div className="w-20 h-1 bg-yellow-300 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-6">
            <a
              href="https://discord.gg/xQM6NgmwPk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-white text-orange-600 font-bold py-5 px-8 rounded-2xl text-xl hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] shadow-2xl"
            >
              <div className="flex items-center justify-center space-x-3">
                <MessageCircle className="w-6 h-6" />
                <span>今すぐコミュニティに参加</span>
                <ArrowRight className="w-6 h-6" />
              </div>
            </a>
            
            <div className="space-y-2">
              {[
                "完全無料・いつでも退会可能", 
                "使い方がわからなくても丁寧にサポート", 
                "見学だけでもOK・発言は自由"
              ].map((text, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 text-orange-100">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-10 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <p className="text-sm leading-relaxed">
              <span className="font-bold text-yellow-300">あなたが仲間になってくれること</span>を<br />
              心から楽しみにしています！
            </p>
          </div>
        </div>
      </section>

      {/* Hesitation Handler - 迷っている人への配慮 */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-sm mx-auto text-center">
          <div className="mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              まだ迷っている方へ
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              参加に不安がある方は、まずは覗いてみるだけでも構いません。<br />
              <span className="font-medium">みんな最初は同じ気持ち</span>でした。
            </p>
          </div>
          
          <a
            href="https://discord.gg/xQM6NgmwPk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-colors"
          >
            とりあえず覗いてみる
          </a>
          
          <div className="mt-4 text-xs text-gray-500">
            気に入らなければ、いつでも退会できます
          </div>
        </div>
      </section>
    </div>
  );
}