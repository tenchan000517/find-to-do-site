'use client';

import { DESIGN_SYSTEM } from '@/styles/design-system';
import { Search, Users, Rocket, Target, Heart, Zap, Smartphone, Link, UserCheck } from 'lucide-react';
import Image from 'next/image';

export default function DiscordPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Split Hero Style */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/1.png"
            alt="「自分にはこれがある」に変わる場所"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center px-6 py-12 mx-4 md:px-8 md:mx-6 max-w-lg md:max-w-3xl bg-slate-900/80 backdrop-blur-sm rounded-xl border border-orange-400/30">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              <div className="mb-2">
                <span className="text-gray-300">『自分には何もない』</span>から
              </div>
              <div className="mb-2">
                <span className="text-orange-400">『自分にはこれがある』</span>
              </div>
              <div>
                に変わる場所
              </div>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              「今のあなたのままで大丈夫」<br />
              経験がなくても、本気じゃなくても、まずは覗いてみませんか？<br />
              一生付き合える仲間と出会い、<strong className="text-orange-400">可能性を発見</strong>できる場所です。
            </p>
            
            {/* CTA Button */}
            <div>
              <a
                href="https://discord.gg/xQM6NgmwPk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-green-400 text-xl"
              >
                コミュニティに参加する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <h2 className={`${DESIGN_SYSTEM.typography.student.headline.medium} text-center ${DESIGN_SYSTEM.spacing.element.margin.large} text-[#1f2937]`}>
            ここで得られる<span className="text-[#f97316]">3つの価値</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`text-center ${DESIGN_SYSTEM.spacing.element.padding.medium} bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl`}>
              <div className={`${DESIGN_SYSTEM.spacing.element.margin.small} flex justify-center`}>
                <Search className="w-24 h-24 text-[#f97316]" />
              </div>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#f97316]`}>
                可能性の発見
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151]`}>
                最初は誰でも初心者。<br />
                ここで見つけた「得意」が、<br />
                人生を変えるきっかけになる。
              </p>
            </div>

            <div className={`text-center ${DESIGN_SYSTEM.spacing.element.padding.medium} bg-gradient-to-br from-green-50 to-green-100 rounded-xl`}>
              <div className={`${DESIGN_SYSTEM.spacing.element.margin.small} flex justify-center`}>
                <Users className="w-24 h-24 text-[#16a34a]" />
              </div>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#16a34a]`}>
                共に成長
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151]`}>
                一人で頑張るより、<br />
                みんなで挑戦する方が<br />
                圧倒的に早く成長できる。
              </p>
            </div>

            <div className={`text-center ${DESIGN_SYSTEM.spacing.element.padding.medium} bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl`}>
              <div className={`${DESIGN_SYSTEM.spacing.element.margin.small} flex justify-center`}>
                <Rocket className="w-24 h-24 text-[#3b82f6]" />
              </div>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#3b82f6]`}>
                挑戦の加速
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151]`}>
                個人の努力を、<br />
                チームの力で何倍にも<br />
                大きくできる場所。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-gradient-to-br from-orange-50 to-orange-100`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <h2 className={`${DESIGN_SYSTEM.typography.student.headline.medium} text-center ${DESIGN_SYSTEM.spacing.element.margin.large} text-[#1f2937]`}>
            どんな人でも<span className="text-[#f97316]">大歓迎</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`${DESIGN_SYSTEM.spacing.element.padding.medium} bg-white rounded-xl shadow-lg`}>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#f97316]`}>
                まだ将来が見えない方
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151] ${DESIGN_SYSTEM.spacing.element.margin.small}`}>
                楽しみながら自然と可能性が見つかる環境。<br />
                プレッシャーなしで様々な分野を体験できます。
              </p>
              <div className="text-sm text-[#6b7280] italic">
                「就活？まだ全然考えてない...」→ 大丈夫です！
              </div>
            </div>

            <div className={`${DESIGN_SYSTEM.spacing.element.padding.medium} bg-white rounded-xl shadow-lg`}>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#f97316]`}>
                就活準備を始めたい方
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151] ${DESIGN_SYSTEM.spacing.element.margin.small}`}>
                実践を通じた自分の適性発見。<br />
                面接で語れる具体的な経験と成果を積めます。
              </p>
              <div className="text-sm text-[#6b7280] italic">
                「ガクチカがない...」→ ここで作れます！
              </div>
            </div>

            <div className={`${DESIGN_SYSTEM.spacing.element.padding.medium} bg-white rounded-xl shadow-lg`}>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#f97316]`}>
                楽しく稼ぎたい方
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151] ${DESIGN_SYSTEM.spacing.element.margin.small}`}>
                プロジェクト参加による報酬。<br />
                やりがいと収入を両立できます。
              </p>
              <div className="text-sm text-[#6b7280] italic">
                「バイトより成長したい」→ 理想的です！
              </div>
            </div>

            <div className={`${DESIGN_SYSTEM.spacing.element.padding.medium} bg-white rounded-xl shadow-lg`}>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#f97316]`}>
                本気で挑戦したい方
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151] ${DESIGN_SYSTEM.spacing.element.margin.small}`}>
                企業の本物の課題に挑戦する機会。<br />
                切磋琢磨できる仲間との出会いがあります。
              </p>
              <div className="text-sm text-[#6b7280] italic">
                「もっと高いレベルで勝負したい」→ 最高です！
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Stages Section */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <h2 className={`${DESIGN_SYSTEM.typography.student.headline.medium} text-center ${DESIGN_SYSTEM.spacing.element.margin.large} text-[#1f2937]`}>
            あなたのペースで<span className="text-[#f97316]">成長</span>
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className={`${DESIGN_SYSTEM.typography.student.steps.large} text-[#f97316] min-w-[80px]`}>
                Stage 1
              </div>
              <div className="flex-1">
                <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#1f2937]`}>
                  発見フェーズ（誰でもOK）
                </h3>
                <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151]`}>
                  まずは観察から。チャットを眺めて、イベントに参加して、「なんか面白そう」を見つけてください。
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className={`${DESIGN_SYSTEM.typography.student.steps.large} text-[#16a34a] min-w-[80px]`}>
                Stage 2
              </div>
              <div className="flex-1">
                <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#1f2937]`}>
                  挑戦フェーズ（興味を持った人）
                </h3>
                <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151]`}>
                  小さなプロジェクトから参加。失敗しても大丈夫、みんなでサポートします。
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className={`${DESIGN_SYSTEM.typography.student.steps.large} text-[#3b82f6] min-w-[80px]`}>
                Stage 3
              </div>
              <div className="flex-1">
                <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#1f2937]`}>
                  成長フェーズ（本気になった人）
                </h3>
                <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151]`}>
                  企業案件に挑戦し、リーダーシップを発揮。一生続くキャリアネットワークを構築。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Benefits Section */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-gradient-to-br from-blue-50 to-blue-100`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <h2 className={`${DESIGN_SYSTEM.typography.student.headline.medium} text-center ${DESIGN_SYSTEM.spacing.element.margin.large} text-[#1f2937]`}>
            コミュニティで得られる<span className="text-[#3b82f6]">永続的価値</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`${DESIGN_SYSTEM.spacing.element.padding.medium} bg-white rounded-xl shadow-lg`}>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#3b82f6]`}>
                学生期の価値
              </h3>
              <ul className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151] space-y-2`}>
                <li>実践体験による自己発見</li>
                <li>企業との直接的な関係構築</li>
                <li>面接で語れる具体的な成果</li>
                <li>明確な就職活動の軸</li>
              </ul>
            </div>

            <div className={`${DESIGN_SYSTEM.spacing.element.padding.medium} bg-white rounded-xl shadow-lg`}>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#3b82f6]`}>
                社会人期の価値
              </h3>
              <ul className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151] space-y-2`}>
                <li>転職支援ネットワーク</li>
                <li>継続的なスキルアップ</li>
                <li>業界横断的な人脈</li>
                <li>新事業パートナー発見</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className={`${DESIGN_SYSTEM.typography.student.body.large} text-[#374151] font-semibold`}>
              <span className="text-[#f97316]">4年間で40年分</span>のキャリアネットワークを構築する、<br />
              <span className="text-[#3b82f6]">最後のチャンス</span>です。
            </p>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <h2 className={`${DESIGN_SYSTEM.typography.student.headline.medium} text-center ${DESIGN_SYSTEM.spacing.element.margin.large} text-[#1f2937]`}>
            <span className="text-[#f97316]">簡単3ステップ</span>で参加
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className={`${DESIGN_SYSTEM.spacing.element.margin.small} flex justify-center`}>
                <Smartphone className="w-16 h-16 text-[#f97316]" />
              </div>
              <div className={`${DESIGN_SYSTEM.typography.student.steps.large} text-[#f97316] ${DESIGN_SYSTEM.spacing.element.margin.small}`}>
                STEP 1
              </div>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#1f2937]`}>
                Discordアプリをダウンロード
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151]`}>
                App Store / Google PlayまたはPCで<br />
                「Discord」をダウンロードしてください。
              </p>
            </div>

            <div className="text-center">
              <div className={`${DESIGN_SYSTEM.spacing.element.margin.small} flex justify-center`}>
                <Link className="w-16 h-16 text-[#16a34a]" />
              </div>
              <div className={`${DESIGN_SYSTEM.typography.student.steps.large} text-[#16a34a] ${DESIGN_SYSTEM.spacing.element.margin.small}`}>
                STEP 2
              </div>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#1f2937]`}>
                招待リンクをクリック
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151]`}>
                下のボタンをクリックして<br />
                コミュニティに参加してください。
              </p>
            </div>

            <div className="text-center">
              <div className={`${DESIGN_SYSTEM.spacing.element.margin.small} flex justify-center`}>
                <UserCheck className="w-16 h-16 text-[#3b82f6]" />
              </div>
              <div className={`${DESIGN_SYSTEM.typography.student.steps.large} text-[#3b82f6] ${DESIGN_SYSTEM.spacing.element.margin.small}`}>
                STEP 3
              </div>
              <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} ${DESIGN_SYSTEM.spacing.element.margin.small} text-[#1f2937]`}>
                自己紹介をする
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-[#374151]`}>
                #自己紹介チャンネルで<br />
                簡単に自己紹介をしてください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-gradient-to-br from-orange-400 to-orange-600 text-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <div className="text-center">
            <h2 className={`${DESIGN_SYSTEM.typography.student.headline.large} ${DESIGN_SYSTEM.spacing.element.margin.medium}`}>
              今すぐ始めよう！
            </h2>
            <p className={`${DESIGN_SYSTEM.typography.student.body.large} ${DESIGN_SYSTEM.spacing.element.margin.large} max-w-3xl mx-auto`}>
              迷っている時間がもったいない。<br />
              <strong>今のあなたのままで大丈夫</strong>だから、<br />
              まずは一歩踏み出してみませんか？
            </p>
            
            <div className="space-y-4">
              <a
                href="https://discord.gg/xQM6NgmwPk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#f97316] font-bold py-6 px-12 rounded-full text-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                コミュニティに参加する
              </a>
              <div className="text-sm opacity-90">
                ※ 完全無料・いつでも退会可能
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${DESIGN_SYSTEM.spacing.section.paddingSmall} bg-gray-900 text-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <div className="text-center">
            <p className={`${DESIGN_SYSTEM.typography.student.body.small} text-gray-300`}>
              © 2024 FIND to DO. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}