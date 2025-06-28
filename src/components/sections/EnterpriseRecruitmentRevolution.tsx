'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Users, Target, TrendingUp, Clock, Star, Zap, Award } from 'lucide-react';

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

export default function EnterpriseRecruitmentRevolution() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* パラダイムシフトの説明 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        「選ぶ」から「選ばれる」への<span className="text-blue-600">パラダイムシフト</span>
                    </h2>
                    <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        従来の一方的な選考から、学生の成長支援を通じて築く信頼関係へ
                    </p>
                </motion.div>

                {/* 従来 vs FIND to DO */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
                >
                    {/* 従来の採用 */}
                    <div className="bg-red-50 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-red-600 mb-6">従来の採用</h3>
                        <div className="space-y-4">
                            {[
                                "面接では見えない実務能力が不明",
                                "書類選考・面接調整に大量の人事リソース",
                                "採用費用100-300万円 + 教育投資",
                                "入社後3年以内の離職率30%超"
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-red-100 rounded-lg">
                            <p className="text-red-700 text-sm font-medium">
                                結果：表面的な理解、ミスマッチ発生、投資の無駄
                            </p>
                        </div>
                    </div>

                    {/* FIND to DO方式 */}
                    <div className="bg-blue-50 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-blue-600 mb-6">FIND to DO方式</h3>
                        <div className="space-y-4">
                            {[
                                "実際の業務で能力を確認、相互理解が深まる",
                                "プロジェクト進行中に自然に面接・選考が進む",
                                "成果物への対価のみ",
                                "事前に適性確認済みでミスマッチ大幅減少"
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <span className="text-gray-700 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                            <p className="text-blue-700 text-sm font-medium">
                                結果：深い理解、低ミスマッチ、継続的関係
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* コスト比較 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg p-8 mb-12"
                >
                    <h3 className="text-2xl font-bold text-center mb-8">実際のコスト比較</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 従来の外注 */}
                        <div className="text-center">
                            <h4 className="text-lg font-semibold text-red-600 mb-4">従来の外注</h4>
                            <div className="space-y-3">
                                <div className="p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-600 font-bold text-2xl">500-1000万円</div>
                                    <div className="text-gray-600 text-sm">年間開発費用</div>
                                </div>
                                <div className="p-3 bg-red-50 rounded-lg">
                                    <div className="text-red-600 font-bold text-lg">成果物のみ</div>
                                    <div className="text-gray-600 text-sm">単発の関係</div>
                                </div>
                            </div>
                        </div>

                        {/* FIND to DO方式 */}
                        <div className="text-center">
                            <h4 className="text-lg font-semibold text-blue-600 mb-4">FIND to DO方式</h4>
                            <div className="space-y-3">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <div className="text-blue-600 font-bold text-2xl">50-100万円</div>
                                    <div className="text-gray-600 text-sm">成果物への対価</div>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <div className="text-green-600 font-bold text-lg">+未来の人材接点</div>
                                    <div className="text-gray-600 text-sm">長期的な関係構築</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* コスト効率の強調 */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <div className="bg-green-50 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-green-600 font-bold text-3xl mb-2">1/10のコスト</p>
                            <p className="text-gray-600 text-sm">同等以上の品質で圧倒的なコスト効率を実現</p>
                        </div>
                    </div>
                </motion.div>

                {/* FIND to DOの4層価値構造 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mb-12"
                >
                    <h3 className="text-2xl font-bold text-center mb-8">FIND to DOの価値階層</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                layer: "レイヤー1",
                                title: "コスト効率",
                                description: "従来の1/10のコストでの開発・DX支援",
                                icon: TrendingUp,
                                color: "blue"
                            },
                            {
                                layer: "レイヤー2", 
                                title: "成果物品質",
                                description: "プロメンター監修による高品質な成果物",
                                icon: Award,
                                color: "green"
                            },
                            {
                                layer: "レイヤー3",
                                title: "人材接点",
                                description: "未来の優秀な人材との早期関係構築",
                                icon: Users,
                                color: "orange"
                            },
                            {
                                layer: "レイヤー4",
                                title: "社会貢献",
                                description: "次世代育成を通じた社会課題解決への貢献",
                                icon: Star,
                                color: "purple"
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className={`bg-gradient-to-br from-${value.color}-100 to-${value.color}-200 rounded-lg p-6 text-center relative`}
                            >
                                <div className="absolute top-2 right-2 text-xs font-bold text-gray-500">{value.layer}</div>
                                <div className={`w-12 h-12 bg-${value.color}-500 text-white rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                                <p className="text-sm text-gray-600">{value.description}</p>
                                {index >= 2 && (
                                    <div className="mt-2 text-xs text-orange-600 font-semibold">★ 独自価値</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 核心メッセージ */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 text-center"
                >
                    <h3 className="text-2xl font-bold mb-4">FIND to DOの真の商品</h3>
                    <p className="text-lg mb-4">
                        「安い開発」ではなく<br/>
                        <span className="text-yellow-300 font-bold">「未来への投資としての関係性構築」</span>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div>
                            <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                            <h4 className="font-bold mb-1">確実な成果物</h4>
                            <p className="text-sm opacity-90">高品質な開発・DX支援</p>
                        </div>
                        <div>
                            <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                            <h4 className="font-bold mb-1">未来の人材</h4>
                            <p className="text-sm opacity-90">優秀な学生との早期接点</p>
                        </div>
                        <div>
                            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                            <h4 className="font-bold mb-1">企業価値向上</h4>
                            <p className="text-sm opacity-90">社会貢献による長期ブランド構築</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}