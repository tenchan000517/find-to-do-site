'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, ArrowRight, TrendingUp, Lightbulb, Zap } from 'lucide-react';

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
            staggerChildren: 0.2
        }
    }
};

interface StoryData {
    student: string;
    background: string;
    challenge: string;
    discovery: string;
    impact: string;
    current: string;
    quote: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const experienceStories: StoryData[] = [
    {
        student: "文系3年生 田中さん",
        background: "文学部・プログラミング未経験", 
        challenge: "企業の業務効率化システム開発",
        discovery: "「理系じゃないから無理」の固定概念を破る体験",
        impact: "論理的思考力がIT業界で活かせることを発見",
        current: "現在はフロントエンド開発のメンターとして活躍",
        quote: "専攻は文学部でしたが、プログラミングは言語を構築することと同じ。文系でも全然できることがわかりました！",
        icon: Lightbulb,
        color: "blue"
    },
    {
        student: "理系2年生 山田さん",
        background: "工学部・技術志向",
        challenge: "企業のマーケティング戦略立案",
        discovery: "技術とビジネスを繋ぐ面白さを発見", 
        impact: "「理系だから技術職」の思い込みから解放",
        current: "プロダクトマネージャーを目指して活動中",
        quote: "技術だけじゃなく、ビジネス視点も必要なことがわかって、自分の可能性が広がりました。",
        icon: TrendingUp,
        color: "green"
    },
    {
        student: "文系4年生 佐藤さん",
        background: "経済学部・クリエイティブ未経験",
        challenge: "企業PR動画の企画・制作",
        discovery: "企業成長に直結する仕事の責任と醍醐味",
        impact: "クリエイティブ×ビジネスの可能性を実感",
        current: "映像ディレクターとして就職決定",
        quote: "実際の企業の課題に取り組むことで、仕事の面白さと責任の重さを同時に学べました。",
        icon: Zap,
        color: "orange"
    }
];

export default function RealExperienceStories() {
    return (
        <section id="real-experience" className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        リアル体験ストーリー
                    </h2>
                    <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        専攻や経験に関係なく、実際の仕事に挑戦して新たな可能性を発見した学生たちの声
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {experienceStories.map((story, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* ヘッダー */}
                            <div className={`bg-gradient-to-r from-${story.color}-500 to-${story.color}-600 p-6 text-white`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <story.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{story.student}</h3>
                                        <p className="text-sm opacity-90">{story.background}</p>
                                    </div>
                                </div>
                            </div>

                            {/* コンテンツ */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">挑戦した仕事</h4>
                                        <p className={`font-medium text-${story.color}-700`}>{story.challenge}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">発見したこと</h4>
                                        <p className="text-gray-700">{story.discovery}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">得られた影響</h4>
                                        <p className="text-gray-700">{story.impact}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">現在の状況</h4>
                                        <p className={`font-medium text-${story.color}-600`}>{story.current}</p>
                                    </div>
                                </div>

                                {/* 引用 */}
                                <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                                    <div className="flex items-start gap-2">
                                        <Star className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700 italic text-sm leading-relaxed">
                                            "{story.quote}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-16 text-center"
                >
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">あなたも新しい可能性を発見してみませんか？</h3>
                        <p className="text-gray-600 mb-6">
                            専攻に関係なく、様々な職種・業界の実際の仕事に挑戦できる環境があります。
                        </p>
                        <a
                            href="https://discord.gg/xQM6NgmwPk"
                            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            今すぐ挑戦を始める
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}