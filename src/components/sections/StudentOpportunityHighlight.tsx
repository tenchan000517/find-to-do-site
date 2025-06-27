'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ArrowRight, Lightbulb, TrendingUp, Target, Code, BarChart3, Palette } from 'lucide-react';

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

export default function StudentOpportunityHighlight() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        教科書では学べない<span className="text-orange-600">「本物の仕事」</span>がここにある
                    </h2>
                    <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        理系・文系の枠を超えて、リアルな業務を体験し、自分の可能性を発見しよう
                    </p>
                </motion.div>

                {/* 実体験ハイライト */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {[
                        {
                            student: "文系3年生",
                            challenge: "企業システム開発",
                            discovery: "「理系じゃないから無理」の固定概念を破る体験",
                            icon: Lightbulb,
                            color: "blue"
                        },
                        {
                            student: "理系2年生", 
                            challenge: "マーケティング戦略立案",
                            discovery: "技術とビジネスを繋ぐ面白さを発見",
                            icon: TrendingUp,
                            color: "green"
                        },
                        {
                            student: "文系4年生",
                            challenge: "企業PR動画制作",
                            discovery: "クリエイティブ×ビジネスの可能性を実感",
                            icon: Target,
                            color: "orange"
                        }
                    ].map((story, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className={`w-12 h-12 bg-${story.color}-100 rounded-full flex items-center justify-center mb-4`}>
                                <story.icon className={`w-6 h-6 text-${story.color}-600`} />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{story.student}</h3>
                            <p className={`text-${story.color}-600 font-medium mb-3`}>{story.challenge}</p>
                            <p className="text-gray-600 text-sm">{story.discovery}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 挑戦分野 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg p-8 mb-12"
                >
                    <h3 className="text-2xl font-bold text-center mb-8">専攻に関係なく挑戦できる分野</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                category: "テクノロジー",
                                icon: Code,
                                examples: ["WEBアプリ開発", "AI・データ分析"],
                                message: "論理的思考力があれば挑戦可能",
                                color: "blue"
                            },
                            {
                                category: "ビジネス企画",
                                icon: BarChart3,
                                examples: ["事業戦略立案", "マーケティング"],
                                message: "課題発見力と創造力で勝負",
                                color: "green"
                            },
                            {
                                category: "クリエイティブ",
                                icon: Palette,
                                examples: ["動画制作", "WEBデザイン"],
                                message: "感性と熱意があれば十分",
                                color: "orange"
                            }
                        ].map((field, index) => (
                            <div key={index} className="text-center">
                                <div className={`w-16 h-16 bg-${field.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    <field.icon className={`w-8 h-8 text-${field.color}-600`} />
                                </div>
                                <h4 className="text-xl font-bold mb-2">{field.category}</h4>
                                <div className="space-y-1 mb-3">
                                    {field.examples.map((example, i) => (
                                        <p key={i} className={`text-${field.color}-600 text-sm`}>{example}</p>
                                    ))}
                                </div>
                                <p className="text-gray-600 text-xs">{field.message}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 特徴的な価値提案 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    {[
                        {
                            title: "教育用ではなく本物",
                            description: "企業の実際の課題解決に挑戦"
                        },
                        {
                            title: "発見と出会い",
                            description: "「こんなに面白い仕事があるんだ！」"
                        },
                        {
                            title: "制限のない環境",
                            description: "様々な職種・業界に挑戦可能"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg p-6 text-center"
                        >
                            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                            <p className="text-sm opacity-90">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center"
                >
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Star className="w-6 h-6 text-orange-500" />
                            <h3 className="text-2xl font-bold">本物の仕事に、本気で挑戦してみませんか？</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            あなたの専攻や経験は関係ありません。大切なのは挑戦する気持ちです。
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
                            <Link
                                href="/community"
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 border-2 border-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                            >
                                リアル体験談を見る
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}