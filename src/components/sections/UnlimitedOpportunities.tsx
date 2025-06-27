'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, BarChart3, Palette, Lightbulb, Target, Zap, ArrowRight, CheckCircle } from 'lucide-react';

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

interface OpportunityData {
    icon: React.ComponentType<{ className?: string }>;
    challenges: string[];
    message: string;
    color: string;
    gradient: string;
}

interface FeatureData {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

const opportunityCategories: Record<string, OpportunityData> = {
    テクノロジー: {
        icon: Code,
        challenges: ["WEBアプリ開発", "AI・データ分析", "ブロックチェーン", "IoTシステム"],
        message: "文系・理系問わず、論理的思考力があれば挑戦可能",
        color: "blue",
        gradient: "from-blue-500 to-blue-600"
    },
    ビジネス企画: {
        icon: BarChart3,
        challenges: ["事業戦略立案", "マーケティング", "新規事業開発", "組織改善"],
        message: "専攻関係なく、課題発見力と創造力で勝負",
        color: "green",
        gradient: "from-green-500 to-green-600"
    },
    クリエイティブ: {
        icon: Palette,
        challenges: ["動画制作", "グラフィックデザイン", "WEBデザイン", "コンテンツ企画"],
        message: "美術系でなくても、感性と熱意があれば十分",
        color: "orange",
        gradient: "from-orange-500 to-orange-600"
    }
};

const keyFeatures: FeatureData[] = [
    {
        icon: Target,
        title: "実際の企業課題に挑戦",
        description: "教育用の模擬体験ではなく、本物のビジネス課題に取り組みます"
    },
    {
        icon: Lightbulb,
        title: "専攻の枠を超えた挑戦",
        description: "文系・理系に関係なく、興味のある分野に挑戦できる環境"
    },
    {
        icon: Zap,
        title: "メンターのサポート付き",
        description: "プロのメンターが丁寧にサポートするので、未経験でも安心"
    }
];

export default function UnlimitedOpportunities() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        制限のない挑戦機会
                    </h2>
                    <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        専攻や経験に関係なく、様々な職種・業界の実際の仕事に挑戦できる環境を提供しています
                    </p>
                </motion.div>

                {/* 主要特徴 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {keyFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="text-center p-6 bg-gray-50 rounded-lg"
                        >
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 挑戦分野 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {Object.entries(opportunityCategories).map(([category, data], index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* ヘッダー */}
                            <div className={`bg-gradient-to-r ${data.gradient} p-6 text-white`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <data.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold">{category}</h3>
                                </div>
                                <p className="text-sm opacity-90 leading-relaxed">
                                    {data.message}
                                </p>
                            </div>

                            {/* 挑戦可能な分野 */}
                            <div className="p-6">
                                <h4 className="text-lg font-semibold mb-4 text-gray-800">挑戦できる分野</h4>
                                <div className="space-y-3">
                                    {data.challenges.map((challenge, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle className={`w-5 h-5 text-${data.color}-500 flex-shrink-0`} />
                                            <span className="text-gray-700">{challenge}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* 実際の事例 */}
                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <h5 className="font-semibold text-gray-800 mb-2">実際の事例</h5>
                                    <p className="text-sm text-gray-600">
                                        {category === 'テクノロジー' && "文系学生がReactを学んでWEBアプリを開発、企業の業務効率化に貢献"}
                                        {category === 'ビジネス企画' && "理系学生が企業のマーケティング戦略を立案、SNS運用で売上向上に寄与"}
                                        {category === 'クリエイティブ' && "経済学部学生が企業PR動画を制作、採用活動の成功に大きく貢献"}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 底部メッセージとCTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            「自分には無理」という思い込みを
                            <br className="hidden md:block" />
                            <span className="text-orange-600">「やってみたい！」</span>に変える場所
                        </h3>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            専攻や経験は関係ありません。大切なのは挑戦する気持ちと、
                            新しいことを学ぶ意欲です。あなたの可能性を一緒に発見しましょう。
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://discord.gg/xQM6NgmwPk"
                                className="inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                今すぐ挑戦を始める
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                            <a
                                href="#real-experience"
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 border-2 border-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                            >
                                体験談を読む
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}