'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Target, ArrowRight, CheckCircle, Users, Award, Zap, Building2, Coins } from 'lucide-react';
import { DESIGN_SYSTEM } from '@/styles/design-system';
import AudienceBadge from '@/components/ui/AudienceBadge';

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
        <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100`}>
            <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
                {/* 価値提案セクション */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-8">
                        <AudienceBadge type="enterprise" size="medium" />
                    </div>
                    {/* 核心価値の表示 */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-white max-w-4xl mx-auto mb-12"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <div className="text-center">
                                <motion.div
                                    className={`${DESIGN_SYSTEM.typography.enterprise.stats.large} font-bold`}
                                >
育てて選ばれる新時代
                                </motion.div>
                                <div className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} opacity-90`}>
                                    採用戦略
                                </div>
                            </div>
                            <div className="h-px md:h-16 w-16 md:w-px bg-white/30"></div>
                            <div className="text-center md:text-left max-w-md">
                                <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.medium} mb-2`}>
                                    育てて選ばれる採用戦略
                                </h3>
                                <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} opacity-90`}>
                                    業務体験を通じた相互理解により、ミスマッチを根本から解決
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* 新しいアプローチの説明 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <h2 className={`${DESIGN_SYSTEM.typography.enterprise.headline.medium} mb-6 text-slate-800`}>
                            <span className="text-red-500">採用費で母数を稼ぐ</span>から、<br className="md:hidden" />
                            <span className="text-green-600">育てることで選ばれる</span>新時代へ
                        </h2>
                        <p className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-slate-600 max-w-4xl mx-auto`}>
                            新しい対価モデル：<span className="font-bold text-slate-800">採用コスト0円、成果物に対してのみ支払う</span>
                        </p>
                    </motion.div>
                </motion.div>

                {/* パイプライン価値を強調 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16 border border-blue-200"
                >
                    <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} text-center mb-8 text-slate-800`}>
                        新しい関係性で優秀な人材パイプラインを構築
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                            <div className="flex items-center mb-4">
                                <Target className="text-blue-600 mr-3" size={24} />
                                <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-blue-800`}>
                                    即座の価値
                                </h4>
                            </div>
                            <p className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-blue-700`}>
                                猫の手も借りたい業務を高品質で完遂。成果物という確実な価値を即座に獲得
                            </p>
                        </div>
                        
                        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                            <div className="flex items-center mb-4">
                                <Building2 className="text-green-600 mr-3" size={24} />
                                <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-green-800`}>
                                    長期的価値
                                </h4>
                            </div>
                            <p className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-green-700`}>
                                継続的な優秀人材パイプラインを構築。戦略的な人材確保システムを資産化
                            </p>
                        </div>
                    </div>
                    
                    <div className="text-center bg-gradient-to-r from-slate-100 to-blue-100 rounded-xl p-6">
                        <p className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-slate-800 font-bold`}>
相互成長による持続可能な関係構築
                        </p>
                    </div>
                </motion.div>
                
                {/* 質重視メッセージ */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {[
                        {
                            icon: Coins,
                            title: "新しい対価モデル",
                            value: "成果物への対価",
                            description: "成果物への対価として支払う革新的モデル",
                            color: "blue",
                            bgColor: "from-blue-500 to-blue-700"
                        },
                        {
                            icon: Target,
                            title: "採用成功率",
                            value: "採用成功率向上",
                            description: "業務体験による相互理解で採用成功率が向上",
                            color: "green",
                            bgColor: "from-green-500 to-green-700"
                        },
                        {
                            icon: TrendingUp,
                            title: "質重視アプローチ",
                            value: "質重視",
                            description: "量より質を重視する企業のためのアプローチ",
                            color: "orange",
                            bgColor: "from-orange-500 to-orange-700"
                        }
                    ].map((metric, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className={`bg-gradient-to-br ${metric.bgColor} text-white rounded-2xl p-8 shadow-lg hover:shadow-xl ${DESIGN_SYSTEM.animations.transition.medium} hover:-translate-y-1 text-center`}
                        >
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <metric.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} mb-3 text-white`}>{metric.title}</h3>
                            <div className={`${DESIGN_SYSTEM.typography.enterprise.stats.medium} text-white mb-4`}>{metric.value}</div>
                            <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-white/90`}>{metric.description}</p>
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
                    <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} text-center mb-8 text-slate-800`}>従来手法との圧倒的な違い</h3>
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
                                { label: "コスト削減", value: "大幅削減" },
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
                        <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} mb-4 text-slate-800`}>質重視企業のための戦略的採用手法</h3>
                        <p className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-slate-600 mb-6`}>
                            量より質を重視する企業のための厳選サービス。確実な成果と長期的な価値創出を両立します。
                        </p>
                        <div className="flex justify-center">
                            <Link
                                href="/contact"
                                className={`${DESIGN_SYSTEM.buttons.enterprise.primary} inline-flex items-center text-center`}
                            >
                                お問い合わせ
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}