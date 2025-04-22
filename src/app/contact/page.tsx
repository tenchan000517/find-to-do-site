'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Code, CalendarDays, Users } from 'lucide-react';

// 既存のContactFormをインポート
import { ContactForm } from '@/components/contact/ContactForm';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-0">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">お問い合わせ</h1>
            <p className="text-xl mb-8">
              FIND to DOに関するご質問、サービスに関するお問い合わせなど、
              お気軽にご連絡ください。
            </p>
          </motion.div>
        </div>
      </section>

      {/* お問い合わせフォームと情報セクション */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* お問い合わせフォーム - 既存のContactFormコンポーネントを使用 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">お問い合わせフォーム</h2>
                <ContactForm />
              </div>
            </motion.div>

            {/* コンタクト情報
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-2 space-y-8"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-xl font-bold mb-4">お問い合わせ先</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">電話</p>
                      <p className="text-gray-600">052-xxx-xxxx</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">メール</p>
                      <p className="text-gray-600">info@findtodo.jp</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">所在地</p>
                      <p className="text-gray-600">
                        〒464-0806<br />
                        愛知県名古屋市昭和区花見通2-3-17
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">営業時間</p>
                      <p className="text-gray-600">平日 10:00 - 18:00</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-xl font-bold mb-4">サービス一覧</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Code className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">WEBアプリ・DX支援</p>
                      <p className="text-gray-600 text-sm">通常の1/10以下のコストで開発</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CalendarDays className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">イベント制作</p>
                      <p className="text-gray-600 text-sm">企業と学生のマッチング促進</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">インターン生紹介</p>
                      <p className="text-gray-600 text-sm">学生広報員システム</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href="/service"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    サービス詳細はこちら
                  </Link>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-md p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-4">資料ダウンロード</h3>
                <p className="mb-4">
                  FIND to DOのサービスやビジネスモデルについての詳細資料をご用意しています。
                </p>
                <Link
                  href="/documents"
                  className="inline-block px-4 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  資料をダウンロード
                </Link>
              </motion.div>
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* 充実したFAQ セクション */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">よくあるご質問</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "初回相談は無料ですか？",
                answer: "はい、初回のご相談・お見積りは無料です。お気軽にお問い合わせください。"
              },
              {
                question: "どのような企業が利用していますか？",
                answer: "IT企業、製造業、小売業、サービス業など、様々な業種・規模の企業にご利用いただいています。特に採用活動や企業ブランディングに力を入れている企業様に多くご利用いただいています。"
              },
              {
                question: "地方でも利用できますか？",
                answer: "はい、リモートでの対応も可能です。オンラインミーティングやリモートワークを活用して、全国どこからでもご利用いただけます。"
              },
              {
                question: "納期はどれくらいかかりますか？",
                answer: "案件の規模や内容によって異なりますが、一般的なWEBサイト制作で約1ヶ月、WEBアプリケーション開発で2～3ヶ月程度です。詳細はお問い合わせ時にご相談ください。"
              },
              {
                question: "インターン生の質は担保されていますか？",
                answer: "はい、すべてのインターン生は経験豊富なメンターの指導のもとで活動し、成果物は専門家によるレビューを受けています。品質管理プロセスを徹底しているため、安心してご利用いただけます。"
              },
              {
                question: "どのようにして通常の1/10以下のコストを実現しているのですか？",
                answer: "「インターン→メンター」の成長パスを活用した独自のビジネスモデルにより、若手人材の活用と経験豊富なメンターの監修を両立させています。これにより、高品質な成果物を低コストで提供することが可能になっています。"
              },
              {
                question: "学生広報員システムとは何ですか？",
                answer: "インターン生が企業の「ファン」として活動する新しい広報モデルです。採用に直結しなくても企業価値向上に貢献し、若者視点で企業の魅力をSNSなどで発信します。同世代への訴求力が高く、自然な情報拡散が期待できます。"
              },
              {
                question: "イベントはどのような形式で開催できますか？",
                answer: "オンライン、オフライン、ハイブリッドなど、ニーズに合わせた形式でイベントを開催できます。業界研究セミナー、職種体験ワークショップ、企業と学生の交流会など、目的に応じた企画をご提案いたします。"
              },
              {
                question: "支払い条件はどのようになっていますか？",
                answer: "案件の規模や内容によって異なりますが、基本的には着手金30%、中間金30%、納品時40%の分割払いが可能です。継続的なご契約の場合は月額払いなどの柔軟な対応も可能ですので、ご相談ください。"
              },
              {
                question: "キャンセルポリシーはありますか？",
                answer: "契約締結後のキャンセルについては、進行状況に応じたキャンセル料が発生する場合があります。詳細は契約時にご説明いたします。まずはお気軽にご相談ください。"
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-6">その他ご不明な点がございましたら、お気軽にお問い合わせください。</p>
            <a href="#" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              お問い合わせフォームへ
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}