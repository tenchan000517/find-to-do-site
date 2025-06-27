'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Code, CalendarDays, Users, ArrowRight, TrendingUp, Target, Clock } from 'lucide-react';
import { useEffect } from 'react';

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

export default function ServicePage() {
    // GA4 サービスページビュー追跡
    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'service_view', {
                event_category: 'service_engagement',
                service_type: 'general',
                event_label: window.location.pathname
            });
        }
    }, []);

    // Service schema for structured data
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://find-to-do.com/service#service',
        name: 'FIND to DO サービス',
        description: 'インターン生とメンターによる低コストなDX支援、イベント制作、学生紹介サービス。学生のキャリア支援と企業のデジタル変革を両立。',
        provider: {
            '@id': 'https://find-to-do.com/#organization'
        },
        serviceType: [
            'インターンシップ支援',
            'キャリア支援',
            'DX支援',
            '学生コミュニティ運営',
            'イベント制作',
            'WEBアプリ開発'
        ],
        areaServed: {
            '@type': 'Country',
            name: '日本'
        },
        audience: {
            '@type': 'Audience',
            audienceType: ['大学生', '企業', 'インターン生', '就活生']
        },
        offers: [
            {
                '@type': 'Offer',
                name: 'WEBアプリ・DX支援',
                description: '通常の1/10以下のコストでWEBアプリ開発やDXを実現。インターン生が実践的なスキルを身につけながら高品質な成果物を納品。',
                category: 'DX支援'
            },
            {
                '@type': 'Offer',
                name: 'イベント制作',
                description: '企業と学生のマッチングを促進するイベントを企画・運営。インターン生がヤングボードとして参加。',
                category: 'イベント制作'
            },
            {
                '@type': 'Offer',
                name: 'インターン生紹介',
                description: '実践を通じて育成されたインターン生を企業に紹介。学生広報員システムによる企業魅力発信。',
                category: 'インターン支援'
            }
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'FIND to DO サービスカタログ',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'WEBアプリケーション開発',
                        description: 'インターン生とメンターによる高品質なWEBアプリ開発'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: '企業DX化支援',
                        description: '業務プロセスのデジタル化とシステム導入支援'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: '学生イベント企画・運営',
                        description: '企業と学生の接点創出イベントの企画から運営まで'
                    }
                }
            ]
        },
        about: [
            {
                '@type': 'Thing',
                name: 'インターンシップ',
                description: '学生向け実践的インターンシップ機会の提供'
            },
            {
                '@type': 'Thing',
                name: 'キャリア支援',
                description: '大学生の就職活動とスキルアップサポート'
            },
            {
                '@type': 'Thing',
                name: 'DX推進',
                description: '企業のデジタルトランスフォーメーション支援'
            }
        ],
        keywords: [
            'インターン', '学生', '就活', 'DX', '学生広報',
            '学生アンバサダー', '学生団体', '学生コミュニティ', 
            'リクルート', '学生イベント', '大学生', 'キャリア',
            'キャリア支援', 'ガクチカ', '就職活動'
        ].join(','),
        inLanguage: 'ja'
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <div className="min-h-screen pt-0">
            {/* ヒーローセクション */}
            <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 py-16 md:py-24">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/service/cover-background.png"
                        alt="Service FIND to DO"
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
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">サービス</h1>
                        <p className="text-xl mb-8">
                            「インターン→メンター」の成長パスを活用した独自のビジネスモデルで、
                            コスト効率の高いサービスと人材育成の両立を実現します
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* サービス概要セクション */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">3つの主要サービスライン</h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            FIND to DOは、「WEBアプリ・DX支援」「イベント制作」「インターン生紹介」の3つの主要サービスラインを提供し、
                            企業の課題解決と若者の成長支援を両立します
                        </p>
                    </motion.div>

                    <div className="space-y-16 md:space-y-24">
                        {/* WEBアプリ・DX支援 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
                        >
                            <motion.div
                                variants={fadeInUp}
                                className="w-full md:w-5/12"
                            >
                                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg shadow-xl border-t-4 border-blue-500">
                                    <Image
                                        src="/service/dx.png"
                                        alt="WEBアプリ・DX支援"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-6">
                                        <Code className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                className="w-full md:w-7/12"
                            >
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600">
                                    WEBアプリ・DX支援
                                </h3>
                                <p className="text-gray-700 mb-6">
                                    通常の1/10以下のコストでWEBアプリ開発やDXを実現します。実際のビジネス課題を解決しながら、インターン生が実践的なスキルを身につけます。メンターの指導のもと高品質な成果物を納品します。
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        'WEBアプリケーション開発',
                                        '企業DX化支援',
                                        'ブロックチェーン技術活用',
                                        '動画編集サービス',
                                        'WEBサイト制作'
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/service/webdev"
                                    className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                                >
                                    詳細を見る
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* イベント制作 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center"
                        >
                            <motion.div
                                variants={fadeInUp}
                                className="w-full md:w-5/12"
                            >
                                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg shadow-xl border-t-4 border-orange-500">
                                    <Image
                                        src="/service/hero.png"
                                        alt="イベント制作"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-400/40 to-transparent flex items-end p-6">
                                        <CalendarDays className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                className="w-full md:w-7/12"
                            >
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-orange-600">
                                    イベント制作
                                </h3>
                                <p className="text-gray-700 mb-6">
                                    企業と学生のマッチングを促進するイベントを企画・運営します。インターン生がヤングボードとして参加し、イベント運営スキルを磨きます。企業の魅力を若者に効果的に伝えるイベントを実現します。
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        '業界研究セミナー',
                                        '職種体験ワークショップ',
                                        '企業と学生の交流会',
                                        'キャリア探索イベント',
                                        'スキル習得プログラム'
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-orange-500 mt-1">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/service/event"
                                    className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors"
                                >
                                    詳細を見る
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* インターン生紹介 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
                        >
                            <motion.div
                                variants={fadeInUp}
                                className="w-full md:w-5/12"
                            >
                                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg shadow-xl border-t-4 border-green-500">
                                    <Image
                                        src="/service/1.png"
                                        alt="インターン生紹介"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-200/20 to-transparent flex items-end p-6">
                                        <Users className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                className="w-full md:w-7/12"
                            >
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-green-600">
                                    インターン生紹介
                                </h3>
                                <p className="text-gray-700 mb-6">
                                    実践を通じて育成されたインターン生を企業に紹介します。学生広報員システムにより、企業の魅力を学生目線で発信します。採用直結に限らない多様な関わり方を通じて、企業と学生の接点を創出します。
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        'インターン求人情報のポータルサイト掲載',
                                        'インターン設計・運営コンサルティング',
                                        '適性を考慮したインターン生のマッチング',
                                        '学生広報員システム',
                                        'インターン→採用フロー設計'
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/service/intern"
                                    className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
                                >
                                    詳細を見る
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ROIセクション */}
            <section className="py-16 md:py-24 bg-blue-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            教育投資としての持続可能な価値創造
                        </h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            単なるコスト削減ではなく、社会的価値と経済的価値を両立する新しいビジネスモデル
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: TrendingUp,
                                title: "コスト効率",
                                value: "1/10以下",
                                description: "従来の外注コストと比較して異次元のコストパフォーマンスを実現",
                                color: "blue"
                            },
                            {
                                icon: Target,
                                title: "人材育成ROI",
                                value: "200%+",
                                description: "インターン生がメンターに成長、長期的な人材パイプラインを入手",
                                color: "green"
                            },
                            {
                                icon: Clock,
                                title: "ブランディング価値",
                                value: "永続的",
                                description: "次世代育成に貢献する企業としての長期的ブランディング効果",
                                color: "orange"
                            }
                        ].map((metric, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <metric.icon className={`w-12 h-12 text-${metric.color}-600 mb-4`} />
                                <h3 className="text-xl font-bold mb-2">{metric.title}</h3>
                                <div className={`text-2xl font-bold text-${metric.color}-600 mb-2`}>{metric.value}</div>
                                <p className="text-gray-600">{metric.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 共通価値セクション */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">すべてのサービスに共通する価値</h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            FIND to DOのサービスがもたらす価値は、単なるコスト削減にとどまりません
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "圧倒的なコスト効率",
                                description: "通常の1/10以下のコストで高品質なサービスを提供します。若手人材の活用と経験豊富なメンターの監修により、効率と品質を両立しています。",
                                color: "blue"
                            },
                            {
                                title: "社会貢献との両立",
                                description: "若者の成長機会を創出しながら、企業の課題解決を実現します。ビジネス価値と社会的価値の両立による持続可能なエコシステムを構築しています。",
                                color: "green"
                            },
                            {
                                title: "若者視点の活用",
                                description: "Z世代・ミレニアル世代の感性や視点を取り入れることで、新たな価値創造が可能になります。若者の「生の声」を企画段階から取り入れられます。",
                                color: "orange"
                            },
                            {
                                title: "中長期的な人材確保",
                                description: "インターンを通じて企業と学生の相互理解を深め、ミスマッチのない採用につなげます。長期的な関係構築が可能です。",
                                color: "indigo"
                            },
                            {
                                title: "柔軟な対応力",
                                description: "多様なスキルを持つインターン生とメンターの組み合わせにより、様々なニーズに対応できます。事業拡大とともにサービス範囲も拡大します。",
                                color: "purple"
                            },
                            {
                                title: "企業ブランディング強化",
                                description: "次世代育成に貢献する企業としてのブランディングが可能です。学生広報員による自然な情報発信で企業の魅力を若者に効果的に伝えます。",
                                color: "red"
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className={`bg-white rounded-lg shadow-md p-6 border-t-4 border-${value.color}-500 hover:shadow-lg transition-shadow`}
                            >
                                <h3 className={`text-xl font-bold mb-3 text-${value.color}-600`}>{value.title}</h3>
                                <p className="text-gray-700">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 従来採用との比較セクション */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            従来の採用 vs FIND to DO方式
                        </h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            今までの採用手法とは一線を画す新しいアプローチ
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="overflow-x-auto"
                    >
                        <table className="w-full bg-white rounded-lg shadow-lg">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-4 text-left">項目</th>
                                    <th className="p-4 text-left">従来の採用</th>
                                    <th className="p-4 text-left">FIND to DO方式</th>
                                    <th className="p-4 text-left">優位性</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        aspect: "コスト",
                                        traditional: "中途採用費100-300万円\n+ 人件費・面接費",
                                        findToDo: "プロジェクト型で成果連動\nコストは成果物代のみ",
                                        advantage: "最大90%コスト削減"
                                    },
                                    {
                                        aspect: "ミスマッチリスク",
                                        traditional: "面接では見えない\n実務能力が不明",
                                        findToDo: "実際の業務で能力を確認\n相互理解が深まる",
                                        advantage: "ミスマッチ発生率が低い"
                                    },
                                    {
                                        aspect: "時間コスト",
                                        traditional: "書類選考・面接調整\n大量の人事リソースが必要",
                                        findToDo: "プロジェクト進行中に\n自然に面接・選考が進む",
                                        advantage: "人事リソースを大幅節約"
                                    },
                                    {
                                        aspect: "企業ブランディング",
                                        traditional: "求人情報でのアピール\n一方的な情報発信",
                                        findToDo: "学生が体験した生の声\nリアルな企業魅力を伝達",
                                        advantage: "信頼性の高い情報発信"
                                    },
                                    {
                                        aspect: "成果物",
                                        traditional: "人材確保のみ",
                                        findToDo: "人材確保 + 実用的な\nシステム・成果物",
                                        advantage: "ダブルメリットを実現"
                                    }
                                ].map((row, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-4 font-medium text-gray-800">{row.aspect}</td>
                                        <td className="p-4 text-red-600 text-sm whitespace-pre-line">{row.traditional}</td>
                                        <td className="p-4 text-blue-600 text-sm whitespace-pre-line">{row.findToDo}</td>
                                        <td className="p-4 text-green-600 font-medium text-sm">{row.advantage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* CTA セクション */}
            <section className="py-16 md:py-24 bg-gradient-to-r from-blue-800/50 to-indigo-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            お気軽にお問い合わせください
                        </h2>
                        <p className="text-xl max-w-3xl mx-auto mb-10">
                            貴社のニーズに合わせた最適なサービスをご提案いたします。
                            まずは資料ダウンロードや個別のご相談から始めてみませんか？
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* <Link 
                href="/documents" 
                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                資料ダウンロード
              </Link> */}
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                            >
                                お問い合わせ
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            </div>
        </>
    );
}