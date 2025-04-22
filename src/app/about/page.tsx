// app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Target, Sparkles, BarChart, Award } from 'lucide-react';

// Import the BusinessModel component
import { BusinessModel } from '@/components/about/BusinessModel';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
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

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-0">
            {/* ヒーローセクション */}
            <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 py-16 md:py-24">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/about/hero.png"
                        alt="About FIND to DO"
                        fill
                        className="object-cover mix-blend-overlay opacity-70"
                        priority
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-center text-white max-w-4xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">企業情報</h1>
                        <p className="text-xl mb-8">
                            「人の夢と希望のブースターになる」というビジョンのもと、
                            私たちは一人ひとりの可能性を広げる挑戦を続けます。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 創業の想い */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="w-full lg:w-1/2"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">創業の想い</h2>
                            <div className="w-32 h-1 bg-orange-500 mb-8"></div>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                「もっと早くこういう場に出会いたかった」
                            </p>
                            <p className="text-gray-600 mb-6">
                                創業者は中学生の頃から、学校での勉強スタイルに違和感を抱いていました。ビジネスや経営に興味があったにもかかわらず、5教科中心の学校教育ではそういった分野に触れる機会はほとんどなく、やりたいことがあっても、それを学ぶための環境や情報に出会えませんでした。
                            </p>
                            <p className="text-gray-600 mb-6">
                                大学進学を機に三重から名古屋へ移り住み、ピッチコンテストや人材育成プログラム、起業家の講演イベントといった刺激的な環境に出会ったことで、「もっと早くこういう場に出会いたかった」という思いが生まれ、同じように「やりたいことを探している人」「選択肢に出会えていない人」にそういった学びの場や体験の機会を届けたいという使命感が強まりました。
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="w-full lg:w-1/2"
                        >
                            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
                                <Image
                                    src="/about/founder.jpg"
                                    alt="創業の想い"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                                    <div className="p-6 text-white">
                                        <p className="text-lg font-medium">
                                            すべての人に「やりたいことに出会えるチャンス」と「それを学べる環境」を
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 社会課題認識 */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">社会課題認識</h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            私たちが解決に取り組んでいる社会課題
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-white p-8 rounded-lg shadow-md"
                        >
                            <h3 className="text-xl font-bold mb-4 text-blue-700">学校教育と社会要求スキルのギャップ</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    <span>学校教育：知識の詰め込みが中心</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    <span>社会要求：コミュニケーション力、リーダーシップ、問題解決能力</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-white p-8 rounded-lg shadow-md"
                        >
                            <h3 className="text-xl font-bold mb-4 text-orange-600">進路選択のミスマッチ</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <span className="text-orange-500 mr-2">•</span>
                                    <span>「偏差値が高いから」「有名だから」という外形的理由での選択</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-orange-500 mr-2">•</span>
                                    <span>大学生の離職率の年々の増加</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-orange-500 mr-2">•</span>
                                    <span>就職後のミスマッチの増加</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-white p-8 rounded-lg shadow-md"
                        >
                            <h3 className="text-xl font-bold mb-4 text-green-600">体験機会の不足</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    <span>多様な分野に触れる機会の不足</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    <span>実際の体験から学べる環境の不足</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    <span>「選択肢に出会える仕組み」の欠如</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 経営理念・ビジョン */}
            <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">経営理念・ビジョン</h2>
                        <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
                        <p className="text-2xl md:text-3xl font-bold mb-8">
                            「人の夢と希望のブースターになる」
                        </p>
                        <p className="text-xl max-w-3xl mx-auto mb-12">
                            私たちは、すべての人に「やりたいことに出会えるチャンス」と「それを学べる環境」を提供することで、一人ひとりが自分らしい人生を歩めるよう支援します。ミスマッチのない社会を目指し、人々が自分の情熱を持って働ける未来の創造に貢献します。
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                                <Target className="w-12 h-12 text-white mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">明確な目標</h3>
                                <p className="text-sm text-white/90">学生と企業の最適なマッチングを実現し、両者の発展に貢献する</p>
                            </div>

                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                                <Users className="w-12 h-12 text-white mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">共創と成長</h3>
                                <p className="text-sm text-white/90">「インターン→メンター」の成長パスを通じた学びの循環を生み出す</p>
                            </div>

                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                                <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">無限の可能性</h3>
                                <p className="text-sm text-white/90">すべての人の可能性を広げ、一人ひとりが輝ける社会を創造する</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ビジネスモデル */}
            {/* <BusinessModel /> */}

            {/* 事業目的 */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">事業目的</h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            私たちの事業が目指す5つの目的
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: Users,
                                title: "多様な選択肢との出会いの場を提供",
                                description: "学生に多様な選択肢との出会いの場を提供し、将来の可能性を広げます。"
                            },
                            {
                                icon: Target,
                                title: "未来から逆算した学びの促進",
                                description: "「未来から逆算した学び」を促進する環境を構築し、実践的なスキル習得を支援します。"
                            },
                            {
                                icon: Award,
                                title: "最適なマッチングを実現",
                                description: "企業と学生の最適なマッチングを実現し、双方にとって価値ある関係を構築します。"
                            },
                            {
                                icon: Sparkles,
                                title: "キャリア観の醸成支援",
                                description: "キャリア観の醸成を支援し、意図しない離職を減少させることで社会的コストを削減します。"
                            },
                            {
                                icon: BarChart,
                                title: "価値ある接点の創出",
                                description: "学生と企業双方にとって価値ある接点を創出し、持続可能なエコシステムを構築します。"
                            }
                        ].map((purpose, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                            >
                                <purpose.icon className="w-12 h-12 text-blue-600 mb-4" />
                                <h3 className="text-xl font-bold mb-3">{purpose.title}</h3>
                                <p className="text-gray-600">{purpose.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 会社情報 */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">会社情報</h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                    </motion.div>

                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="text-gray-800 p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <Image
                                        src="images/logo.png"
                                        alt="FIND to DO ロゴ"
                                        width={180}
                                        height={60}
                                        className="mx-auto mb-4"
                                    />
                                    <p className="text-sm">「人の夢と希望のブースターになる」</p>
                                </div>
                            </div>
                            <div className="md:col-span-2 p-8">
                                <table className="w-full">
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 pr-4 font-medium text-gray-600 w-1/3">プロジェクト名</th>
                                            <td className="py-3">FIND to DO</td>
                                        </tr>
                                        {/* <tr className="border-b border-gray-200">
                      <th className="text-left py-3 pr-4 font-medium text-gray-600">設立</th>
                      <td className="py-3">2025年1月</td>
                    </tr> */}
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 pr-4 font-medium text-gray-600">代表者</th>
                                            <td className="py-3">飯田思遠</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 pr-4 font-medium text-gray-600">所在地</th>
                                            <td className="py-3">〒464-0806 愛知県名古屋市昭和区花見通2-3-17</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 pr-4 font-medium text-gray-600">事業内容</th>
                                            <td className="py-3">WEBアプリ・DX支援、イベント制作、インターン生紹介</td>
                                        </tr>
                                        <tr>
                                            <th className="text-left py-3 pr-4 font-medium text-gray-600">URL</th>
                                            <td className="py-3">https://find-to-do.com</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              私たちと一緒に未来を創りませんか？
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-10">
              「インターン→メンター」の成長パスを活用した独自のビジネスモデルで、
              人材育成と価値創出が循環する新しいエコシステムを構築しています。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/community" 
                className="px-8 py-4 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors"
              >
                コミュニティに参加する
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-orange-700 text-white rounded-lg font-medium hover:bg-orange-800 transition-colors border border-white"
              >
                お問い合わせ
              </Link>
            </div>
          </motion.div>
        </div>
      </section> */}
        </div>
    );
}