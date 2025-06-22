'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, UserPlus, Trophy, Check } from 'lucide-react';

const plans = [
    {
        id: 'plan-monthly',
        title: '月額制',
        price: '20,000',
        priceUnit: '月額',
        icon: Shield,
        color: 'bg-blue-500',
        delay: 0,
        features: [
            'インターンが働いた月のみ料金が発生',
            '早期退職などのリスクがない',
            'インターン採用まで料金発生なし',
            '内定・就職採用時の追加料金なし',
            'インターン採用時の追加料金なし'
        ],
        note: '全く新しいプラン'
    },
    {
        id: 'plan-listing',
        title: '掲載型',
        price: '800,000',
        priceUnit: '年額',
        icon: UserPlus,
        color: 'bg-purple-500',
        delay: 0.2,
        features: [
            '専用企業ページの作成',
            'フォロー機能の利用',
            'メッセージ機能の利用',
            '内定・就職採用時の追加料金なし',
            'インターン採用時の追加料金なし',
        ],
        note: '競合比 100万～200万'
    },
    {
        id: 'plan-performance',
        title: '成果報酬型',
        price: '80,000',
        priceUnit: '採用時',
        icon: Trophy,
        color: 'bg-green-500',
        delay: 0.4,
        features: [
            'インターン採用まで料金発生なし',
            '内定・就職採用時の追加料金なし'
        ],
        note: '競合比 10万～25万'
    }
];

export function Features() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold mb-4">安心の3つの料金体系</h2>
                    <p className="text-xl text-gray-600">
                        お客様のニーズに合わせて最適なプランをお選びいただけます
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: plan.delay }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                        >
                            <div className={`${plan.color} p-6 text-white text-center`}>
                                <plan.icon className="w-12 h-12 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                            </div>

                            <div className="p-8">
                                <div className="text-center mb-8">
                                    <div className="text-lg text-gray-500 mb-2">{plan.priceUnit}</div>
                                    <div className="flex items-end justify-center">
                                        <span className="text-4xl font-bold">¥{plan.price}</span>
                                        <span className="text-gray-500 ml-1">円</span>
                                    </div>
                                    {plan.note && (
                                        <div className="text-lg text-gray-500 mt-2">{plan.note}</div>

                                    )}
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="space-y-4 w-80">
                                        {plan.features.map((feature, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-2">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-500 mb-6">
                        ※ 料金は全て税抜価格です。詳細は営業担当にお問い合わせください。
                    </p>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
                        お問い合わせ
                    </button>
                </motion.div>
            </div>
        </section>
    );
}