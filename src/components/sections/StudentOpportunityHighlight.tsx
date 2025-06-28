'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Users, Rocket, Home, School, Coffee, ArrowRight, Sparkles } from 'lucide-react';
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
            staggerChildren: 0.2
        }
    }
};

export default function StudentOpportunityHighlight() {
    return (
        <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-gradient-to-br from-orange-50 via-green-50 to-blue-50`}>
            <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
                {/* メインヘッダー */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <AudienceBadge type="student" size="medium" />
                    </div>
                    <h2 className={`${DESIGN_SYSTEM.typography.student.headline.medium} mb-6 text-slate-800`}>
                        <span className="text-gray-500">『自分には何もない』</span>から、<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-500">
                            『自分にはこれがある』へ
                        </span>
                    </h2>
                    <p className={`${DESIGN_SYSTEM.typography.student.subheading.small} text-slate-600 max-w-3xl mx-auto`}>
                        メンバー主導のコミュニティで、あなたの可能性を一緒に見つけませんか？
                    </p>
                </motion.div>

                {/* 3つの価値メッセージ */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
                >
                    {[
                        {
                            icon: Sparkles,
                            title: "可能性の発見",
                            message: "最初は誰でも初心者。ここで見つけた『得意』が、人生を変えるきっかけになる",
                            color: "orange",
                            bgColor: "from-orange-400 to-orange-600",
                            borderColor: "border-orange-200"
                        },
                        {
                            icon: Users,
                            title: "共に成長",
                            message: "一人で頑張るより、みんなで挑戦する方が圧倒的に早く成長できる",
                            color: "green",
                            bgColor: "from-green-400 to-green-600",
                            borderColor: "border-green-200"
                        },
                        {
                            icon: Rocket,
                            title: "挑戦の加速",
                            message: "個人の努力を、チームの力で何倍にも大きくできる場所",
                            color: "blue",
                            bgColor: "from-blue-400 to-blue-600",
                            borderColor: "border-blue-200"
                        }
                    ].map((value, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="relative"
                        >
                            <div className={`bg-white rounded-2xl shadow-lg p-8 h-full hover:shadow-xl ${DESIGN_SYSTEM.animations.transition.medium} border-2 ${value.borderColor} hover:-translate-y-1`}>
                                <div className={`w-16 h-16 bg-gradient-to-r ${value.bgColor} rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.small} text-center mb-4 text-slate-800`}>
                                    {value.title}
                                </h3>
                                <p className={`${DESIGN_SYSTEM.typography.student.body.small} text-slate-600 text-center leading-relaxed`}>
                                    {value.message}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* サードプレイス概念 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
                >
                    <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.large} text-center mb-8 text-slate-800`}>
                        あなたの<span className="text-orange-600">サードプレイス</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Home,
                                title: "家",
                                description: "家族の期待とプレッシャーの場",
                                color: "gray-400"
                            },
                            {
                                icon: School,
                                title: "学校",
                                description: "成績と競争の場",
                                color: "gray-400"
                            },
                            {
                                icon: Coffee,
                                title: "FIND to DO",
                                description: "ありのままの自分でいられる第3の居場所",
                                color: "orange-600",
                                highlight: true
                            }
                        ].map((place, index) => (
                            <div key={index} className={`text-center p-6 rounded-xl ${place.highlight ? 'bg-orange-50 border-2 border-orange-200' : 'bg-gray-50'}`}>
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${place.highlight ? 'bg-orange-100' : 'bg-gray-200'}`}>
                                    <place.icon className={`w-8 h-8 text-${place.color}`} />
                                </div>
                                <h4 className={`${DESIGN_SYSTEM.typography.student.subheading.small} mb-2 ${place.highlight ? 'text-orange-800' : 'text-gray-600'}`}>
                                    {place.title}
                                </h4>
                                <p className={`${DESIGN_SYSTEM.typography.student.body.small} ${place.highlight ? 'text-orange-600' : 'text-gray-500'}`}>
                                    {place.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* インクルーシブメッセージング */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
                >
                    {[
                        {
                            title: "本気じゃなくても大丈夫",
                            description: "「とりあえず覗いてみる」から始まる人がほとんど。気軽に参加してください。",
                            icon: Heart,
                            color: "green"
                        },
                        {
                            title: "経験がなくても大丈夫",
                            description: "「何もできない」と思っている人こそ歓迎。みんなで一緒に学んでいきます。",
                            icon: Users,
                            color: "blue"
                        }
                    ].map((message, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className={`bg-gradient-to-r ${index === 0 ? 'from-green-500 to-green-600' : 'from-orange-500 to-orange-600'} text-white rounded-xl p-8 shadow-lg hover:shadow-xl ${DESIGN_SYSTEM.animations.transition.medium} hover:-translate-y-1`}
                        >
                            <div className="flex items-center mb-4">
                                <message.icon className="w-8 h-8 mr-3" />
                                <h4 className={`${DESIGN_SYSTEM.typography.student.subheading.small} text-white`}>{message.title}</h4>
                            </div>
                            <p className={`${DESIGN_SYSTEM.typography.student.body.small} text-white/90 leading-relaxed`}>{message.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 成長ステージ */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8 md:p-12 mb-16"
                >
                    <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.large} text-center mb-8 text-slate-800`}>
                        誰でも自分のペースで成長できる
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                stage: "発見フェーズ",
                                subtitle: "誰でもOK",
                                description: "様々な分野をつまみ食い体験。「これ面白いかも」という発見を大切に。"
                            },
                            {
                                stage: "挑戦フェーズ", 
                                subtitle: "興味を持った人",
                                description: "具体的なプロジェクトに参加。小さな成功体験を積み重ねていきます。"
                            },
                            {
                                stage: "成長フェーズ",
                                subtitle: "本気になった人", 
                                description: "企業の実課題に挑戦。チームリーダーとして後輩を支える側になります。"
                            }
                        ].map((stage, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                    {index + 1}
                                </div>
                                <h4 className={`${DESIGN_SYSTEM.typography.student.subheading.small} mb-1 text-slate-800`}>{stage.stage}</h4>
                                <p className={`${DESIGN_SYSTEM.typography.student.body.small} text-orange-600 font-medium mb-3`}>（{stage.subtitle}）</p>
                                <p className={`${DESIGN_SYSTEM.typography.student.body.small} text-slate-600 leading-relaxed`}>{stage.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center"
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
                        <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.large} mb-4 text-slate-800`}>
                            一生付き合える仲間と出会いませんか？
                        </h3>
                        <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-slate-600 mb-8`}>
                            あなたの可能性を一緒に見つけて、個人の努力をチームの力で何倍にも大きくしませんか？
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://discord.gg/xQM6NgmwPk"
                                className={`${DESIGN_SYSTEM.buttons.student.primary} inline-flex items-center text-center`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                コミュニティに参加
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                            <Link
                                href="/community"
                                className={`${DESIGN_SYSTEM.buttons.student.secondary} inline-flex items-center text-center`}
                            >
                                コミュニティの詳細を見る
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}