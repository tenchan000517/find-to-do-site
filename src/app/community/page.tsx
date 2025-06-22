'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    GraduationCap, Award, TrendingUp, Users,
    Smartphone, Monitor, Puzzle, Zap, Play,
    Code, Database, Globe, BarChart3
} from 'lucide-react';

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

type JoinStep = {
    number: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
};

const mobileSteps: JoinStep[] = [
    {
        number: 1,
        title: "アプリのインストール",
        description: "App StoreまたはGoogle Playで「Discord」を検索して、アプリをダウンロードしてください。",
        icon: <Smartphone className="w-8 h-8 text-white" />
    },
    {
        number: 2,
        title: "QRコードをスキャン",
        description: "右のQRコードをスマートフォンのカメラでスキャンして、FIND to DOのDiscordサーバーに参加できます。",
    },
    {
        number: 3,
        title: "自己紹介しよう",
        description: "#自己紹介チャンネルで簡単な自己紹介をして、コミュニティの仲間と交流を始めましょう！",
    }
];

const pcSteps: JoinStep[] = [
    {
        number: 1,
        title: "Discordをインストール",
        description: "パソコンで「discord.com」にアクセスして、Discordアプリをダウンロードしてください。",
        icon: <Monitor className="w-8 h-8 text-white" />
    },
    {
        number: 2,
        title: "招待リンクを使う",
        description: "QRコードの下に表示されているURLをブラウザに入力してください。",
    },
    {
        number: 3,
        title: "サーバーに参加",
        description: "「サーバーに参加」ボタンをクリックして、#自己紹介チャンネルで自己紹介をしましょう！",
    }
];

export default function CommunityPage() {
    const [selectedTab, setSelectedTab] = useState<'general' | 'teams' | 'events' | 'resources'>('general');

    return (
        <div className="min-h-screen pt-20">
            {/* ヒーローセクション */}
            {/* <section className="bg-gradient-to-r from-blue-600 to-indigo-800 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-center text-white max-w-4xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">コミュニティに参加する</h1>
                        <p className="text-xl mb-8">
                            FIND to DOのコミュニティに参加して、プロと一緒に学び、実践的なスキルを身につけましょう。
                            「インターン→メンター」の成長パスで自分のキャリアを築く第一歩を踏み出してください。
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="#join-discord"
                                className="px-8 py-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                            >
                                すぐに参加する
                            </a>
                            <a
                                href="#growth-path"
                                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                            >
                                成長パスを見る
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section> */}

            {/* ヒーローセクション */}
            <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 py-16 md:py-24">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/community/cover-background.png"
                        alt="Community FIND to DO"
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
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">コミュニティに参加する</h1>
                        <p className="text-xl mb-8">
                            FIND to DOのコミュニティに参加して、プロと一緒に学び、実践的なスキルを身につけましょう。
                            「インターン→メンター」の成長パスで自分のキャリアを築く第一歩を踏み出してください。
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="https://discord.gg/xQM6NgmwPk"
                                className="px-8 py-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                                target="_blank" // 別タブで開く
                                rel="noopener noreferrer" // セキュリティのために追加
                            >
                                すぐに参加する
                            </a>
                            <a
                                href="#growth-path"
                                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                            >
                                成長パスを見る
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Discord参加セクション */}
            <section id="join-discord" className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">3ステップでコミュニティに参加</h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            FIND to DOのDiscordコミュニティに参加して、メンバーや企業との交流、案件情報、イベント情報を入手しましょう
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8 items-start">
                        {/* スマートフォンでの参加方法 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div
                                variants={fadeInUp}
                                className="flex items-center justify-center gap-4 mb-8"
                            >
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                                    <Smartphone className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold">スマートフォンでの参加方法</h3>
                            </motion.div>

                            <div className="space-y-8">
                                {mobileSteps.map((step) => (
                                    <motion.div
                                        key={step.number}
                                        variants={fadeInUp}
                                        className="flex gap-6"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                                {step.number}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* パソコンでの参加方法 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div
                                variants={fadeInUp}
                                className="flex items-center justify-center gap-4 mb-8"
                            >
                                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                                    <Monitor className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold">パソコンでの参加方法</h3>
                            </motion.div>

                            <div className="space-y-8">
                                {pcSteps.map((step) => (
                                    <motion.div
                                        key={step.number}
                                        variants={fadeInUp}
                                        className="flex gap-6"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                                {step.number}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* QRコードとアプリダウンロードリンク */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mt-16 text-center"
                    >
                        {/* アプリストアボタン */}
                        <div className="flex flex-row justify-center items-center gap-2 mb-8">
                            <a
                                href="https://apps.apple.com/app/discord-talk-chat-hang-out/id985746746"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <Image
                                    src="/community/appstore.svg"
                                    alt="App Storeからダウンロード"
                                    width={135}
                                    height={40}
                                    className="h-20 w-auto"
                                />
                            </a>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.discord"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <Image
                                    src="/community/google.png"
                                    alt="Google Playからダウンロード"
                                    width={160}
                                    height={40}
                                    className="h-20 w-auto"
                                />
                            </a>
                        </div>


                        <div className="inline-block p-0 bg-white rounded-lg shadow-md">
                            <Image
                                src="images/qr-code.png"
                                alt="Discord QRコード"
                                width={200}
                                height={200}
                                className="mx-auto"
                            />
                        </div>
                        <div className="p-20">
                            <a
                                href="https://discord.gg/xQM6NgmwPk"
                                className="px-12 py-8 bg-orange-500 text-white rounded-lg text-2xl hover:bg-orange-600 transition-colors"
                                target="_blank" // 別タブで開く
                                rel="noopener noreferrer" // セキュリティのために追加
                            >
                                すぐに参加する
                            </a>
                        </div>
                        <p className="mt-4 text-gray-600">
                            スマホでQRコードをスキャンするか、上記のURLにアクセスしてください
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* コミュニティ情報タブ */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">コミュニティの魅力</h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            FIND to DOのコミュニティでは、多様な活動や機会を通じて成長できる環境を提供しています
                        </p>
                    </motion.div>

                    {/* タブナビゲーション */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        <button
                            onClick={() => setSelectedTab('general')}
                            className={`px-4 py-2 rounded-full transition-colors ${selectedTab === 'general'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            特徴と魅力
                        </button>
                        <button
                            onClick={() => setSelectedTab('teams')}
                            className={`px-4 py-2 rounded-full transition-colors ${selectedTab === 'teams'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            チーム活動
                        </button>
                        <button
                            onClick={() => setSelectedTab('events')}
                            className={`px-4 py-2 rounded-full transition-colors ${selectedTab === 'events'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            イベント情報
                        </button>
                        <button
                            onClick={() => setSelectedTab('resources')}
                            className={`px-4 py-2 rounded-full transition-colors ${selectedTab === 'resources'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            学習リソース
                        </button>
                    </div>

                    {/* タブコンテンツ */}
                    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                        {selectedTab === 'general' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                {[
                                    {
                                        icon: Users,
                                        title: "多様な仲間との出会い",
                                        description: "様々なバックグラウンドを持つ学生やメンターとの交流を通じて、視野が広がります。"
                                    },
                                    {
                                        icon: Puzzle,
                                        title: "実践的な案件参加",
                                        description: "実際のビジネス課題に取り組むことで、座学だけでは得られない経験を積むことができます。"
                                    },
                                    {
                                        icon: Zap,
                                        title: "成長のスピードアップ",
                                        description: "メンターの指導と実践的なフィードバックにより、成長のスピードが格段に上がります。"
                                    },
                                    {
                                        icon: Play,
                                        title: "オリジナルコンテンツ",
                                        description: "技術セミナーや業界動向など、キャリアに役立つコンテンツを定期的に配信しています。"
                                    },
                                    {
                                        icon: Award,
                                        title: "実績の構築",
                                        description: "実際のプロジェクト参加を通じて、就職活動で活かせる具体的な実績を作れます。"
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: "明確なキャリアパス",
                                        description: "インターンからメンターへの成長パスが明確で、長期的なキャリア形成をサポートします。"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center text-center p-4">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                            <item.icon className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {selectedTab === 'teams' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-4">チーム活動について</h3>
                                    <p className="text-gray-700 mb-4">
                                        FIND to DOでは、様々な専門分野ごとにチームを形成し、実際のプロジェクトに取り組んでいます。
                                        各チームはメンターのリードのもと、実践的なスキルを身につけながら成果を出しています。
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            title: "WEB開発チーム",
                                            description: "React/Next.jsなどを使用したWEBアプリケーション開発を行うチームです。企業の実際の課題に取り組みます。",
                                            technologies: ["React", "Next.js", "TypeScript", "Node.js", "Firebase"]
                                        },
                                        {
                                            title: "DX支援チーム",
                                            description: "企業のデジタルトランスフォーメーションを支援するチームです。業務効率化システムの開発などを行います。",
                                            technologies: ["業務分析", "システム設計", "プロトタイピング", "UX設計"]
                                        },
                                        {
                                            title: "動画・WEBサイト制作チーム",
                                            description: "企業紹介や職種紹介などの動画制作、ブランディングやマーケティング用のWEBサイト制作を行います。",
                                            technologies: ["動画編集", "グラフィックデザイン", "HTML/CSS", "WordPress"]
                                        },
                                        {
                                            title: "イベント企画チーム",
                                            description: "キャリアイベントや業界研究セミナーなどの企画・運営を行うチームです。企業と学生の接点を創出します。",
                                            technologies: ["イベント企画", "マーケティング", "司会進行", "集客"]
                                        }
                                    ].map((team, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                            <h4 className="text-xl font-bold mb-2">{team.title}</h4>
                                            <p className="text-gray-700 mb-4">{team.description}</p>
                                            <div>
                                                <h5 className="font-medium text-gray-800 mb-2">主な使用技術/スキル:</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {team.technologies.map((tech, i) => (
                                                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {selectedTab === 'events' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-4">イベント情報</h3>
                                    <p className="text-gray-700 mb-4">
                                        FIND to DOでは、スキルアップやキャリア形成に役立つ様々なイベントを定期的に開催しています。
                                        コミュニティメンバーは優先的に参加できます。
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        {
                                            title: "技術勉強会（毎週水曜日）",
                                            description: "React、TypeScript、Node.jsなどの最新技術を学ぶ勉強会です。初心者から上級者まで参加できます。",
                                            date: "毎週水曜日 19:00-21:00",
                                            location: "Discord / オフライン（名古屋）"
                                        },
                                        {
                                            title: "キャリア相談会（月2回）",
                                            description: "IT業界で働くプロフェッショナルに直接キャリアについて相談できる機会です。個別相談も可能です。",
                                            date: "第2・第4金曜日 18:30-20:30",
                                            location: "Discord / オフライン（名古屋）"
                                        },
                                        {
                                            title: "ハッカソン（季節ごと）",
                                            description: "チームでアイデアを形にする集中開発イベントです。企業からの課題に取り組むことも。",
                                            date: "春・夏・秋・冬（年4回）",
                                            location: "オフライン（名古屋）"
                                        },
                                        {
                                            title: "業界研究セミナー（不定期）",
                                            description: "様々な業界の企業を招いて行う業界研究セミナーです。仕事内容や必要なスキルについて学べます。",
                                            date: "不定期（月1-2回程度）",
                                            location: "Discord / オフライン（名古屋）"
                                        }
                                    ].map((event, index) => (
                                        <div key={index} className="flex flex-col md:flex-row gap-4 pb-6 border-b border-gray-200">
                                            <div className="w-full md:w-1/3">
                                                <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                                                <div className="text-sm text-gray-500">
                                                    <p className="mb-1"><span className="font-medium">日時:</span> {event.date}</p>
                                                    <p><span className="font-medium">場所:</span> {event.location}</p>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-2/3">
                                                <p className="text-gray-700">{event.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-blue-600 font-medium">
                                        イベント情報は随時Discordで更新されます。最新情報はDiscordでご確認ください。
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {selectedTab === 'resources' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-4">学習リソース</h3>
                                    <p className="text-gray-700 mb-4">
                                        コミュニティメンバー向けに、様々な学習リソースを用意しています。
                                        Discordの専用チャンネルでアクセス方法を確認してください。
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        {
                                            icon: Code,
                                            title: "フロントエンド開発",
                                            resources: ["React入門コース", "TypeScript実践ガイド", "Next.jsチュートリアル", "CSS/UIフレームワーク集"]
                                        },
                                        {
                                            icon: Database,
                                            title: "バックエンド開発",
                                            resources: ["Node.js基礎講座", "データベース設計入門", "API設計ガイド", "サーバーレスアーキテクチャ"]
                                        },
                                        {
                                            icon: Globe,
                                            title: "Web3/ブロックチェーン",
                                            resources: ["ブロックチェーン基礎", "Solidityプログラミング", "NFT開発入門", "DApps開発ガイド"]
                                        },
                                        {
                                            icon: BarChart3,
                                            title: "ビジネススキル",
                                            resources: ["プロジェクト管理入門", "ビジネスコミュニケーション", "提案書作成ガイド", "クライアント対応術"]
                                        },
                                        {
                                            icon: Puzzle,
                                            title: "ポートフォリオ作成",
                                            resources: ["効果的なポートフォリオの作り方", "GitHubの活用法", "プロジェクト紹介の書き方", "デモの見せ方"]
                                        },
                                        {
                                            icon: Users,
                                            title: "キャリア支援",
                                            resources: ["IT業界キャリアパス", "効果的な履歴書の書き方", "技術面接対策", "フリーランスガイド"]
                                        }
                                    ].map((category, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                                <category.icon className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <h4 className="text-xl font-bold mb-3">{category.title}</h4>
                                            <ul className="space-y-2">
                                                {category.resources.map((resource, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="text-blue-500 mr-2">•</span>
                                                        <span className="text-gray-700">{resource}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* 成長パスセクション */}
            <section id="growth-path" className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">「インターン→メンター」の成長パス</h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            FIND to DOでは、段階的なスキルアップと明確なキャリアパスで、あなたの成長をサポートします
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* PC 表示時の接続線 */}
                        <div className="absolute top-1/2 left-8 right-8 h-2 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 rounded-full -translate-y-1/2 z-0 hidden lg:block"></div>

                        {/* 成長ステージ */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            {[
                                {
                                    title: 'ビギナー',
                                    icon: GraduationCap,
                                    skills: '基礎スキル習得',
                                    experience: '基礎トレーニング参加',
                                    earnings: '3万円/件～',
                                    gradient: 'from-blue-100 to-blue-200',
                                    iconGradient: 'from-blue-400 to-blue-600',
                                    borderColor: 'border-blue-300'
                                },
                                {
                                    title: 'レギュラー',
                                    icon: Code,
                                    skills: '実務スキル習得',
                                    experience: '実案件への参加',
                                    earnings: '5万円/件～',
                                    gradient: 'from-blue-200 to-blue-300',
                                    iconGradient: 'from-blue-500 to-blue-700',
                                    borderColor: 'border-blue-400'
                                },
                                {
                                    title: 'アドバンスト',
                                    icon: Users,
                                    skills: 'チーム開発スキル',
                                    experience: 'プロジェクトリード',
                                    earnings: '10万円/件～',
                                    gradient: 'from-blue-300 to-blue-400',
                                    iconGradient: 'from-blue-600 to-blue-800',
                                    borderColor: 'border-blue-500'
                                },
                                {
                                    title: 'メンター',
                                    icon: Award,
                                    skills: '指導・管理スキル',
                                    experience: 'インターン指導',
                                    earnings: '2万円/人～',
                                    gradient: 'from-blue-400 to-blue-500',
                                    iconGradient: 'from-blue-700 to-blue-900',
                                    borderColor: 'border-blue-600'
                                }
                            ].map((stage, index) => (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    className={`bg-gradient-to-br ${stage.gradient} rounded-2xl shadow-xl p-6 border ${stage.borderColor} relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
                                >
                                    {/* 装飾背景サークル */}
                                    <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white opacity-10"></div>

                                    {/* PC 表示時のステージ番号 */}
                                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center font-bold text-blue-800 shadow-sm hidden lg:flex">
                                        {index + 1}
                                    </div>

                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stage.iconGradient} p-1 flex items-center justify-center mx-auto mb-5 shadow-lg transform transition-transform group-hover:rotate-3`}>
                                        <stage.icon className="w-10 h-10 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-center mb-5 text-blue-900">{stage.title}</h3>

                                    <div className="space-y-4">
                                        <div className="flex flex-col bg-white bg-opacity-60 p-3 rounded-lg">
                                            <span className="text-sm text-blue-800 font-semibold mb-1">習得スキル</span>
                                            <span className="text-gray-800 font-medium">{stage.skills}</span>
                                        </div>

                                        <div className="flex flex-col bg-white bg-opacity-60 p-3 rounded-lg">
                                            <span className="text-sm text-blue-800 font-semibold mb-1">主な経験</span>
                                            <span className="text-gray-800 font-medium">{stage.experience}</span>
                                        </div>

                                        <div className="flex flex-col bg-white bg-opacity-60 p-3 rounded-lg">
                                            <span className="text-sm text-blue-800 font-semibold mb-1">平均収入</span>
                                            <span className="text-gray-800 font-medium">{stage.earnings}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mt-16 text-center"
                    >
                        <div className="max-w-3xl mx-auto">
                            <p className="text-lg text-gray-700 mb-8">
                                FIND to DOのコミュニティでは、未経験からでもステップバイステップで成長できる環境を用意しています。
                                実践的なプロジェクト参加を通じてスキルを磨き、将来はメンターとして後進の指導も行えるようになります。
                                スキルアップに応じて報酬も増加するため、学びながら収入も得られます。
                            </p>
                            <div className="p-20">
                                <a
                                    href="https://discord.gg/xQM6NgmwPk"
                                    className="px-12 py-8 bg-orange-500 text-white rounded-lg text-2xl hover:bg-orange-600 transition-colors"
                                    target="_blank" // 別タブで開く
                                    rel="noopener noreferrer" // セキュリティのために追加
                                >
                                    すぐに参加する
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ セクション */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">よくある質問</h2>
                        <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                    </motion.div>

                    <div className="space-y-6">
                        {[
                            {
                                question: "参加費用はかかりますか？",
                                answer: "いいえ、コミュニティへの参加は完全無料です。むしろ、案件に参加することで報酬を得ることができます。"
                            },
                            {
                                question: "未経験でも参加できますか？",
                                answer: "はい、未経験の方も大歓迎です。基礎から学べるコンテンツも用意しており、メンターがサポートします。"
                            },
                            {
                                question: "どのくらいの時間を確保すべきですか？",
                                answer: "自分のペースで参加できます。週に数時間から、より集中的に取り組むことも可能です。プロジェクト参加時は事前に必要な時間をお伝えします。"
                            },
                            {
                                question: "プログラミングだけですか？他の分野も学べますか？",
                                answer: "プログラミング以外にも、デザイン、マーケティング、イベント企画など様々な分野のプロジェクトがあります。"
                            },
                            {
                                question: "地方に住んでいますが参加できますか？",
                                answer: "はい、リモートでの参加も可能です。オンラインでのミーティングやイベントも定期的に開催しています。"
                            },
                            {
                                question: "就職や転職のサポートはありますか？",
                                answer: "キャリア相談会や履歴書添削、模擬面接などのサポートを提供しています。また、企業とのコネクションを活かした就職支援も行っています。"
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="bg-white rounded-lg shadow-md p-6"
                            >
                                <h3 className="text-xl font-bold mb-3 text-blue-800">{faq.question}</h3>
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
                        <p className="text-lg text-gray-700 mb-6">
                            他にも質問がありましたら、お気軽にDiscordでお問い合わせください。
                        </p>
                        <div className="p-20">
                            <a
                                href="https://discord.gg/xQM6NgmwPk"
                                className="px-12 py-8 bg-blue-600 text-white rounded-lg text-2xl hover:bg-orange-600 transition-colors"
                                target="_blank" // 別タブで開く
                                rel="noopener noreferrer" // セキュリティのために追加
                            >
                                Discordに参加する
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}