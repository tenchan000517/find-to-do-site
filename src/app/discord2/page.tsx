'use client';

import { DESIGN_SYSTEM } from '@/styles/design-system';
import { Heart, Users, Smartphone, Link, UserCheck, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Discord2Page() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Hook within 3 seconds */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-purple-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-300 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-orange-300 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 py-8 max-w-md mx-auto">
          <div className="mb-8">
            <Image
              src="/characters/iida.png"
              alt="IIDA"
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
            <span className="text-gray-500">「自分には何もない」</span>から<br />
            <span className="text-orange-500">「自分にはこれがある！」</span><br />
            が見つかるコミュニティ
          </h1>
          
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            あなたには可能性がある。<br />
            それを一緒に見つけませんか？
          </p>
          
          <a
            href="https://discord.gg/xQM6NgmwPk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full max-w-xs px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            今すぐ参加する
          </a>
          
          <p className="text-xs text-gray-500 mt-3">
            完全無料・いつでも退会可能
          </p>
        </div>
      </section>

      {/* Pain Point Section - Empathy */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <Image
              src="/characters/misaki_worry.png"
              alt="心配するMISAKI"
              width={100}
              height={100}
              className="mx-auto"
            />
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            こんな気持ちありませんか？
          </h2>
          
          <div className="space-y-4 text-left">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">「自分には特技がない...」</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">「将来が見えない...」</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">「何から始めればいいかわからない...」</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-800 font-medium">
              大丈夫です。みんなそこからスタートします。
            </p>
          </div>
        </div>
      </section>

      {/* What is FIND to DO - Understanding */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              FIND to DOってなに？
            </h2>
            <div className="mb-4">
              <Image
                src="/characters/iida_goodjob.png"
                alt="説明するIIDA"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 text-purple-600 rounded-full p-2 text-sm font-bold min-w-[32px] h-8 flex items-center justify-center">
                  01
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">気軽にコミュニティに参加</h3>
                  <p className="text-sm text-gray-600">成長したい人が集まる温かい場所</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 text-purple-600 rounded-full p-2 text-sm font-bold min-w-[32px] h-8 flex items-center justify-center">
                  02
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">日々の会話や学びに参加</h3>
                  <p className="text-sm text-gray-600">見てるだけでも、たまに発言でもOK</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 text-purple-600 rounded-full p-2 text-sm font-bold min-w-[32px] h-8 flex items-center justify-center">
                  03
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">興味があれば実際の仕事に挑戦</h3>
                  <p className="text-sm text-gray-600">全くの未経験からでもサポートを受けながら実践</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 text-orange-600 rounded-full p-2 text-sm font-bold min-w-[32px] h-8 flex items-center justify-center">
                  04
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">スキルアップ＋実績＋収入</h3>
                  <p className="text-sm text-gray-600">自分のペースで「得意」を発見</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 text-orange-600 rounded-full p-2 text-sm font-bold min-w-[32px] h-8 flex items-center justify-center">
                  05
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">「自分にはこれがある！」</h3>
                  <p className="text-sm text-gray-600">「得意」を活かして理想のキャリアを実現</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Doubt Resolution */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              よくあるご質問
            </h2>
            <div className="mb-4">
              <Image
                src="/characters/kikuyo_point.png"
                alt="説明するKIKUYO"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-purple-50 p-5 rounded-xl">
              <h3 className="font-bold text-purple-800 mb-2">Q. 参加に費用はかかりますか？</h3>
              <p className="text-purple-700">A. いいえ、かかりません</p>
              <p className="text-sm text-purple-600 mt-1">
                FIND to DOは講座や教材ではなく、あなたのサードプレイスになりたいコミュニティです。
              </p>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-xl">
              <h3 className="font-bold text-blue-800 mb-2">Q. 初心者でも大丈夫ですか？</h3>
              <p className="text-blue-700">A. もちろんです！</p>
              <p className="text-sm text-blue-600 mt-1">
                コミュニティの使い方から仕事の進め方まで、先輩たちが優しくサポートしてくれます。
              </p>
            </div>
            
            <div className="bg-green-50 p-5 rounded-xl">
              <h3 className="font-bold text-green-800 mb-2">Q. 毎日参加しないといけませんか？</h3>
              <p className="text-green-700">A. いいえ、自由です</p>
              <p className="text-sm text-green-600 mt-1">
                気が向いた時だけでOK。ちょっとのぞくだけでも、なんとなくつぶやくだけでも大丈夫です。
              </p>
            </div>
            
            <div className="bg-orange-50 p-5 rounded-xl">
              <h3 className="font-bold text-orange-800 mb-2">Q. 何か目的がないとダメですか？</h3>
              <p className="text-orange-700">A. なくても全然大丈夫！</p>
              <p className="text-sm text-orange-600 mt-1">
                なんとなく興味がある、それだけで十分。参加しながら見つけていく人もたくさんいます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Team Section - Trust Building */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              5人の編集部があなたをサポート
            </h2>
            <p className="text-sm text-gray-600">
              それぞれの専門性を活かして、あなたの成長を全力で応援します
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-3">
              <Image
                src="/characters/iida.png"
                alt="IIDA"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-gray-800">IIDA（CEO）</h3>
                <p className="text-xs text-gray-600">人の可能性を信じてる</p>
                <p className="text-xs text-gray-500">キャリアコンサルタント・アドラー心理学</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-3">
              <Image
                src="/characters/kikuyo.png"
                alt="KIKUYO"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-gray-800">KIKUYO（CIO）</h3>
                <p className="text-xs text-gray-600">データで人生をより良く</p>
                <p className="text-xs text-gray-500">データサイエンティスト・AIエンジニア</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-3">
              <Image
                src="/characters/king.png"
                alt="KING"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-gray-800">KING（COO）</h3>
                <p className="text-xs text-gray-600">君はすごいんだ！</p>
                <p className="text-xs text-gray-500">組織開発・モチベーションコーチ</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-3">
              <Image
                src="/characters/misaki.png"
                alt="MISAKI"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-gray-800">MISAKI（CMO）</h3>
                <p className="text-xs text-gray-600">楽しくなければ仕事じゃない</p>
                <p className="text-xs text-gray-500">マーケター・女性キャリア支援</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-3">
              <Image
                src="/characters/ten_point.png"
                alt="TEN"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-gray-800">TEN（CTO）</h3>
                <p className="text-xs text-gray-600">楽しくなければ人生じゃない</p>
                <p className="text-xs text-gray-500">フルスタックエンジニア・営業コンサル</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Discord Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              私たちがDiscordにこだわる理由
            </h2>
            <div className="mb-4">
              <Heart className="w-12 h-12 text-purple-500 mx-auto" />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 p-5 rounded-xl">
              <h3 className="font-bold text-purple-800 mb-3">双方向のコミュニケーション</h3>
              <p className="text-sm text-purple-700 leading-relaxed">
                LINEの公式アカウントやメルマガのような一方通行ではなく、質問したい時に答えてくれる誰かが身近にいると心強い、という私たちの経験から、オンラインでも距離が縮められるDiscordにこだわっています。
              </p>
            </div>
            
            <div className="bg-orange-50 p-5 rounded-xl">
              <h3 className="font-bold text-orange-800 mb-3">初心者の方への配慮</h3>
              <p className="text-sm text-orange-700 leading-relaxed">
                使い慣れない方もいらっしゃることは重々承知しています。私たちは長く皆様をサポートし関わっていきたいと思っておりますので、今まで使ったことのない方に寄り添って使い方からサポートします。
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8 p-4 bg-gradient-to-r from-purple-100 to-orange-100 rounded-xl">
            <p className="text-gray-800 font-medium">
              よろしければ仲間になってくださると幸いです
            </p>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              簡単3ステップで参加
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 rounded-full p-3">
                  <Smartphone className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="text-orange-600 font-bold text-sm mb-1">STEP 1</div>
                  <h3 className="font-bold text-gray-800 mb-2">Discordアプリをダウンロード</h3>
                  <p className="text-sm text-gray-600">
                    App Store / Google PlayまたはPCで「Discord」をダウンロードしてください。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Link className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-green-600 font-bold text-sm mb-1">STEP 2</div>
                  <h3 className="font-bold text-gray-800 mb-2">招待リンクをクリック</h3>
                  <p className="text-sm text-gray-600">
                    下のボタンをクリックしてコミュニティに参加してください。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-blue-600 font-bold text-sm mb-1">STEP 3</div>
                  <h3 className="font-bold text-gray-800 mb-2">自己紹介をする</h3>
                  <p className="text-sm text-gray-600">
                    #自己紹介チャンネルで簡単に自己紹介をしてください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              参加するとこんな良いことが
            </h2>
            <div className="mb-4">
              <Image
                src="/characters/misaki_smile.png"
                alt="笑顔のMISAKI"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-800">お金をもらいながら学べる</h3>
                <p className="text-sm text-green-600">お金を払って学ぶのではなく、学びながらお金をもらえます</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-800">自分のペースで参加できる</h3>
                <p className="text-sm text-blue-600">24時間365日開かれたコミュニティです</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-purple-800">一生涯の仲間ができる</h3>
                <p className="text-sm text-purple-600">オンラインでどこにいてもスマホ1つで繋がれます</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <Image
              src="/characters/king_point.png"
              alt="指差すKING"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            こんな人におすすめです
          </h2>
          
          <div className="space-y-3 text-left">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">✓ 仕事や暮らしの話ができる仲間がほしい</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">✓ 起業や副業など自分の可能性を探りたい</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">✓ ガクチカのリアルな実績を積みたい</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Decision */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-400 to-orange-600 text-white">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <Image
              src="/characters/iida_fighting.png"
              alt="やる気のIIDA"
              width={100}
              height={100}
              className="mx-auto"
            />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">
            今すぐ始めよう！
          </h2>
          
          <p className="text-lg mb-8 leading-relaxed">
            迷っている時間がもったいない。<br />
            <strong>今のあなたのままで大丈夫</strong>だから、<br />
            まずは一歩踏み出してみませんか？
          </p>
          
          <div className="space-y-4">
            <a
              href="https://discord.gg/xQM6NgmwPk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full max-w-xs bg-white text-orange-500 font-bold py-5 px-8 rounded-full text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              コミュニティに参加する
            </a>
            
            <div className="flex items-center justify-center space-x-2 text-orange-100">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">完全無料・いつでも退会可能</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-orange-100">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">使い方が分からなくても丁寧にサポート</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-orange-100">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">見学だけでもOK</span>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <p className="text-sm">
              あなたが仲間になってくれることを<br />
              心から楽しみにしています！
            </p>
          </div>
        </div>
      </section>

      {/* Secondary CTA for uncertain users */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            まだ迷っている方へ
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            参加に不安がある方は、まずは覗いてみるだけでも構いません。<br />
            みんな最初は同じ気持ちでした。
          </p>
          
          <a
            href="https://discord.gg/xQM6NgmwPk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            とりあえず覗いてみる
          </a>
        </div>
      </section>
    </div>
  );
}