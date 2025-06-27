'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Target, Clock, ArrowRight, CheckCircle, Users, Award, Zap } from 'lucide-react';

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

export default function EnterpriseValueHighlight() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        単なるコスト削減ではない、<span className="text-blue-600">持続可能な価値創造</span>
                    </h2>
                    <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        教育投資としての社会的価値と圧倒的なコスト効率を両立する新しいビジネスモデル
                    </p>
                </motion.div>

                {/* ROI指標 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {[
                        {
                            icon: TrendingUp,
                            title: "コスト効率",
                            value: "1/10以下",
                            description: "従来の外注コストと比較して異次元のパフォーマンスを実現",
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
                            variants={fadeInUp}
                            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                        >
                            <div className={`w-16 h-16 bg-${metric.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <metric.icon className={`w-8 h-8 text-${metric.color}-600`} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{metric.title}</h3>
                            <div className={`text-3xl font-bold text-${metric.color}-600 mb-3`}>{metric.value}</div>
                            <p className="text-gray-600 text-sm">{metric.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 従来採用との比較（重要ポイントのみ） */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg p-8 mb-12"
                >
                    <h3 className="text-2xl font-bold text-center mb-8">従来の採用 vs FIND to DO方式</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 従来の採用 */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                従来の採用
                            </h4>
                            <div className="space-y-3">
                                {[
                                    "中途採用費100-300万円 + 人件費・面接費",
                                    "面接では見えない実務能力が不明",
                                    "書類選考・面接調整に大量の人事リソース",
                                    "求人情報での一方的な情報発信"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FIND to DO方式 */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                FIND to DO方式
                            </h4>
                            <div className="space-y-3">
                                {[
                                    "プロジェクト型で成果連動、成果物代のみ",
                                    "実際の業務で能力を確認、相互理解が深まる",
                                    "プロジェクト進行中に自然に面接・選考が進む",
                                    "学生が体験した生の声でリアルな企業魅力を伝達"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 優位性ハイライト */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { label: "コスト削減", value: "最大90%" },
                                { label: "ミスマッチ", value: "大幅減少" },
                                { label: "人事リソース", value: "大幅節約" },
                                { label: "成果物", value: "ダブルメリット" }
                            ].map((advantage, i) => (
                                <div key={i} className="text-center p-3 bg-green-50 rounded-lg">
                                    <div className="text-green-600 font-bold text-lg">{advantage.value}</div>
                                    <div className="text-gray-600 text-sm">{advantage.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 教育投資価値 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    {[
                        {
                            icon: Award,
                            title: "教育投資価値",
                            description: "優秀な人材発掘・育成への長期投資として機能"
                        },
                        {
                            icon: Users,
                            title: "社会的インパクト",
                            description: "学生の成長支援を通じて企業ブランディングと社会貢献を同時実現"
                        },
                        {
                            icon: Zap,
                            title: "リスク分散",
                            description: "複数の学生による並行開発でリスクを分散、プロメンターが品質を保証"
                        }
                    ].map((value, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg p-6 text-center"
                        >
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <value.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                            <p className="text-sm opacity-90">{value.description}</p>
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
                        <h3 className="text-2xl font-bold mb-4">コスト削減と社会貢献を両立する新しいアプローチ</h3>
                        <p className="text-gray-600 mb-6">
                            従来の採用手法とは一線を画す、持続可能で価値創造型のソリューションをご提案します。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                詳細資料を請求する
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="/service"
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 border-2 border-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                            >
                                事例・比較を見る
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}