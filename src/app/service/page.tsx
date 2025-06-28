'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Building2, Target, Users, ArrowRight, CheckCircle, 
  TrendingUp, Clock, DollarSign, Award, Zap, Heart,
  FileText, Phone, Mail
} from 'lucide-react';
import { DESIGN_SYSTEM } from '@/styles/design-system';

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

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* ヒーローセクション */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} relative overflow-hidden`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.enterprise.headline.large} mb-6 text-slate-800`}
            >
              <span className="text-gray-500">採用費で母数を稼ぐ時代</span>から、<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                育てて選ばれる新時代へ
              </span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.enterprise.subheading.medium} text-slate-600 mb-12`}
            >
              猫の手も借りたい業務を、優秀な学生に任せませんか？<br/>
              それが企業の本当の魅力を伝える最高の機会です。
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link
                href="#contact"
                className={`${DESIGN_SYSTEM.buttons.enterprise.primary} inline-flex items-center`}
              >
                お問い合わせ
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="#concept"
                className={`${DESIGN_SYSTEM.buttons.enterprise.secondary} inline-flex items-center`}
              >
                詳しく知る
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 共感セクション - 企業の悩み */}
      <section id="concept" className={`${DESIGN_SYSTEM.spacing.section.padding} bg-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.enterprise.headline.medium} mb-6 text-slate-800`}
            >
              <span className="text-blue-600">猫の手も借りたい業務</span>、ありませんか？
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.enterprise.body.large} text-slate-600 max-w-3xl mx-auto`}
            >
              多くの企業が抱える現実的な課題に、共感を込めてお応えします。
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Clock,
                title: "時間が足りない",
                description: "重要な業務に集中したいのに、雑務で時間が埋まってしまう",
                bgColor: "bg-red-50",
                borderColor: "border-red-200",
                iconColor: "text-red-600"
              },
              {
                icon: Users,
                title: "人手が足りない",
                description: "正社員を雇うほどではないが、確実に人手が必要な業務がある",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200",
                iconColor: "text-orange-600"
              },
              {
                icon: DollarSign,
                title: "コストを抑えたい",
                description: "外注するには高すぎる、でも内製化するにはスキルが足りない",
                bgColor: "bg-yellow-50",
                borderColor: "border-yellow-200",
                iconColor: "text-yellow-600"
              },
              {
                icon: Zap,
                title: "即戦力が欲しい",
                description: "研修期間を短くして、すぐに戦力になってくれる人材が必要",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                iconColor: "text-green-600"
              }
            ].map((pain, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`${pain.bgColor} ${pain.borderColor} border-2 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-12 h-12 ${pain.bgColor} ${pain.iconColor} rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${pain.borderColor}`}>
                  <pain.icon className="w-6 h-6" />
                </div>
                <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} mb-3 text-slate-800`}>
                  {pain.title}
                </h3>
                <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-slate-600 leading-relaxed`}>
                  {pain.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white max-w-3xl mx-auto">
              <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} mb-4`}>
                そんな状況を変える新しいアプローチがあります
              </h3>
              <p className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} opacity-90`}>
                業務委託で成果物を得ながら、同時に優秀な人材パイプラインを構築する戦略的手法
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 価値発見セクション - 一石二鳥の価値 */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-gradient-to-br from-blue-50 to-green-50`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.enterprise.headline.medium} mb-6 text-slate-800`}
            >
              それが実は、企業の本当の魅力を伝える<br/>
              <span className="text-blue-600">最高の機会</span>です
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.enterprise.body.large} text-slate-600 max-w-3xl mx-auto`}
            >
              業務委託と採用ブランディングの二重価値を実現する戦略的アプローチ
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} mb-6 text-slate-800`}>
                  従来の外注 vs FIND to DO
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      aspect: "成果物の品質",
                      traditional: "要件定義が曖昧で、期待と違う結果",
                      findToDo: "業務体験を通じた相互理解で高品質",
                      improvement: "満足度向上"
                    },
                    {
                      aspect: "コスト効率",
                      traditional: "一時的な解決で継続性なし",
                      findToDo: "人材パイプライン構築で長期価値",
                      improvement: "戦略的投資"
                    },
                    {
                      aspect: "採用ブランディング",
                      traditional: "効果測定困難な広告費",
                      findToDo: "実体験に基づく口コミ効果",
                      improvement: "信頼性向上"
                    }
                  ].map((comparison, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} font-bold text-slate-800 mb-2`}>
                        {comparison.aspect}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-slate-600">
                          <span className="font-medium text-red-600">従来:</span> {comparison.traditional}
                        </div>
                        <div className="text-slate-600">
                          <span className="font-medium text-blue-600">FIND to DO:</span> {comparison.findToDo}
                        </div>
                        <div className="text-green-600 font-medium">
                          → {comparison.improvement}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 text-white">
                <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} mb-6`}>
                  一石二鳥の戦略的アプローチ
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Target,
                      title: "成果物の獲得",
                      description: "即座に必要な業務を高品質で完了"
                    },
                    {
                      icon: Building2,
                      title: "採用ブランディング",
                      description: "実際の職場体験で企業の魅力を自然に伝達"
                    },
                    {
                      icon: Users,
                      title: "人材パイプライン",
                      description: "継続的な優秀人材確保システムを構築"
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} font-bold mb-1`}>
                          {benefit.title}
                        </h4>
                        <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} opacity-90`}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* パイプライン価値セクション */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.enterprise.headline.medium} mb-6 text-slate-800`}
            >
              成果物を得ながら、<br/>
              <span className="text-green-600">優秀な人材パイプライン構築</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.enterprise.body.large} text-slate-600 max-w-3xl mx-auto`}
            >
              新しい対価モデル：採用コストを支払うのではなく成果物に対してのみ支払う革新的手法
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                step: "1",
                icon: Target,
                title: "成果物提供",
                description: "猫の手も借りたい業務を学生がしっかりと完遂",
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200"
              },
              {
                step: "2",
                icon: Users,
                title: "関係構築",
                description: "業務を通じて企業と学生の間に自然な信頼関係が構築",
                color: "text-green-600",
                bgColor: "bg-green-50",
                borderColor: "border-green-200"
              },
              {
                step: "3",
                icon: Award,
                title: "採用検討",
                description: "相互理解の上で、高い確率で採用に繋がる",
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200"
              },
              {
                step: "4",
                icon: Building2,
                title: "パイプライン",
                description: "継続的な人材確保システムが完成",
                color: "text-purple-600",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200"
              }
            ].map((flow, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`${flow.bgColor} ${flow.borderColor} border-2 rounded-xl p-6 text-center relative`}
              >
                <div className={`absolute -top-3 -left-3 w-8 h-8 ${flow.color} bg-white rounded-full flex items-center justify-center border-2 ${flow.borderColor} font-bold text-sm`}>
                  {flow.step}
                </div>
                <div className={`w-12 h-12 ${flow.bgColor} ${flow.color} rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${flow.borderColor}`}>
                  <flow.icon className="w-6 h-6" />
                </div>
                <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} mb-3 text-slate-800`}>
                  {flow.title}
                </h3>
                <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-slate-600 leading-relaxed`}>
                  {flow.description}
                </p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-300 transform -translate-y-1/2">
                    <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-slate-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 新しい対価モデル */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-gradient-to-br from-slate-50 to-blue-50`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.enterprise.headline.medium} mb-6 text-slate-800`}
            >
              <span className="text-blue-600">育てて選ばれる</span>採用戦略
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeInUp}>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
                <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} mb-6 text-red-700`}>
                  Before: 採用費で母数を稼ぐ
                </h3>
                <ul className="space-y-4">
                  {[
                    "大量の応募者を集めるための広告費",
                    "面接で判断できる情報は限定的",
                    "入社後のミスマッチが頻発",
                    "早期離職による採用コストの無駄"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 text-sm">×</span>
                      </div>
                      <span className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-slate-700`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
                <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} mb-6 text-green-700`}>
                  After: 育てることで選ばれる
                </h3>
                <ul className="space-y-4">
                  {[
                    "実際の業務体験で相互理解",
                    "スキルと人柄を実践で確認",
                    "学生側も企業文化を十分理解",
                    "高い定着率と即戦力人材の確保"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-slate-700`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* お問い合わせ */}
      <section id="contact" className={`${DESIGN_SYSTEM.spacing.section.padding} bg-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-12 text-center max-w-4xl mx-auto"
          >
            <h3 className={`${DESIGN_SYSTEM.typography.enterprise.headline.small} mb-4 text-slate-800`}>
              新しい採用戦略を始めませんか？
            </h3>
            <p className={`${DESIGN_SYSTEM.typography.enterprise.body.large} text-slate-600 mb-8 max-w-2xl mx-auto`}>
              猫の手も借りたい業務から始まる、革新的な人材確保システムをご提案します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@find-to-do.com"
                className={`${DESIGN_SYSTEM.buttons.enterprise.primary} inline-flex items-center`}
              >
                <Mail className="mr-2 w-5 h-5" />
                メールでお問い合わせ
              </a>
              <Link
                href="/"
                className={`${DESIGN_SYSTEM.buttons.enterprise.secondary} inline-flex items-center`}
              >
                トップページに戻る
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}