// components/sections/BusinessCycleSection.tsx
'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, TrendingUp, Users, BadgeCheck, Zap } from 'lucide-react';

type Step = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
};

const businessModelSteps: Step[] = [
  {
    icon: GraduationCap,
    title: "コミュニティ参加",
    description: "学生主導のコミュニティに参加し、ビジネス・技術・マネジメントを実践学習。",
    color: "blue"
  },
  {
    icon: Award,
    title: "企業案件で実践",
    description: "コミュニティが受注した企業案件で、営業・開発・マネジメントを実体験。",
    color: "green"
  },
  {
    icon: TrendingUp,
    title: "組織運営参画",
    description: "企業交渉、意思決定、後輩指導など、年次に関係なく実力でリーダーに。",
    color: "orange"
  },
  {
    icon: Users,
    title: "マネジメント経験",
    description: "大学生で企業交渉・組織運営の希少な実体験を積み、就活で圧倒的差別化。",
    color: "purple"
  }
];

const features: Step[] = [
  {
    icon: Users,
    title: "コミュニティメンバー主導運営",
    description: "年次に関係なく実力でリーダーになれる組織運営・意思決定の希少体験。",
    color: "blue"
  },
  {
    icon: BadgeCheck,
    title: "企業交渉経験",
    description: "大学生で企業との交渉や関係構築を実体験できる唯一無二の機会。",
    color: "green"
  },
  {
    icon: Zap,
    title: "サードプレイス",
    description: "学校・バイトとは違う、実践的成長と仲間との出会いがある居場所。",
    color: "orange"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function BusinessModel() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            メンバー主導の<span className="text-blue-600">コミュニティ運営</span>システム
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="w-32 h-1 bg-orange-500 mx-auto mb-6"
          />
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            コミュニティメンバーが自分たちで運営し、企業交渉・組織運営・意思決定を実践する
            新しい形のコミュニティ型ビジネスモデル
          </motion.p>
        </motion.div>

        {/* ビジネスモデルの説明 */}
        <div className="mb-20">
          <div className="relative">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {businessModelSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative z-10"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full bg-${step.color}-100 flex items-center justify-center mb-4 border-4 border-white`}>
                      <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center">{step.title}</h3>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </div>
                  {index < businessModelSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 right-0 w-full h-1 transform translate-x-1/2">
                      <svg className="w-6 h-6 text-gray-300 absolute right-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 特徴 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="text-center mb-12"
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            独自のビジネスモデルの特徴
          </motion.h3>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            FIND to DOならではの価値提供を支える3つの特徴
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`bg-${feature.color}-50 border border-${feature.color}-200 rounded-lg p-6 md:p-8`}
            >
              <div className={`w-14 h-14 rounded-full bg-${feature.color}-100 flex items-center justify-center mb-6`}>
                <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 社会的インパクト */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">社会的インパクト</h3>
          <p className="mb-8 max-w-3xl mx-auto">
            キャリア選択ミスマッチの減少、産学連携の新しいモデル構築、実践型人材育成の仕組み確立、
            DX人材不足への対応、若者の地域定着促進など、社会課題の解決に貢献します。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">学生へ</h4>
              <p className="text-sm">実践を通じた確かなスキル習得とキャリアの選択肢拡大</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">企業へ</h4>
              <p className="text-sm">低コストでのDX推進と優秀な人材との接点創出</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">社会へ</h4>
              <p className="text-sm">意図しない離職の減少と若者の地域定着促進</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}