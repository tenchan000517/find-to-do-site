// components/sections/BusinessModel.tsx
'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, TrendingUp, Users, BadgeCheck, Zap, ArrowRight, Building2, RefreshCw, Heart } from 'lucide-react';
import { DESIGN_SYSTEM } from '@/styles/design-system';
import AudienceBadge from '@/components/ui/AudienceBadge';

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
    <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-gradient-to-br from-slate-50 via-orange-50 to-green-50 overflow-hidden`}>
      <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <AudienceBadge type="student" size="medium" />
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className={`${DESIGN_SYSTEM.typography.enterprise.headline.medium} mb-6 text-slate-800`}
          >
            <span className="text-orange-600">学生主導のコミュニティ</span>で実践する成長エコシステム
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="w-32 h-1 bg-orange-500 mx-auto mb-6"
          />
          <motion.p 
            variants={fadeInUp}
            className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-slate-600 max-w-4xl mx-auto`}
          >
            学生主導のコミュニティが企業と学生をつなぎ、<br className="md:hidden" />誰もが成長し続ける持続可能なエコシステム
          </motion.p>
        </motion.div>

        {/* エコシステム全体の視覚化 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-orange-200"
        >
          <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} text-center mb-12 text-slate-800`}>
            FIND to DO エコシステム
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* 企業 */}
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 text-center">
              <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-blue-800 mb-3`}>
                企業
              </h4>
              <ul className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-blue-700 space-y-2`}>
                <li>• 実課題の提供</li>
                <li>• 成果物の評価</li>
                <li>• 人材発掘・採用</li>
                <li>• パイプライン構築</li>
              </ul>
            </div>
            
            {/* 学生コミュニティ */}
            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200 text-center">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-orange-800 mb-3`}>
                学生コミュニティ
              </h4>
              <ul className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-orange-700 space-y-2`}>
                <li>• 自主運営・意思決定</li>
                <li>• 企業交渉・マネジメント</li>
                <li>• 技術・ビジネス学習</li>
                <li>• 後輩指導・メンター</li>
              </ul>
            </div>
            
            {/* 社会 */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 text-center">
              <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-green-800 mb-3`}>
                社会
              </h4>
              <ul className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-green-700 space-y-2`}>
                <li>• 雇用ミスマッチ解消</li>
                <li>• 早期離職率削減</li>
                <li>• 若者成長機会創出</li>
                <li>• 地域活性化</li>
              </ul>
            </div>
          </div>
          
          {/* 循環の矢印 */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <ArrowRight className="text-blue-500" size={24} />
            <RefreshCw className="text-orange-500" size={32} />
            <ArrowRight className="text-green-500" size={24} />
          </div>
          
          <div className="text-center bg-gradient-to-r from-orange-100 to-green-100 rounded-xl p-6">
            <p className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-slate-800 font-bold`}>
              持続可能な価値創造サイクル
            </p>
          </div>
        </motion.div>
        
        {/* 循環システムの詳細説明 */}
        <div className="mb-20">
          <motion.h3 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} text-center mb-12 text-slate-800`}
          >
            学生が企業案件で実践体験を積み、ガクチカで差別化を実現
          </motion.h3>
          
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
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color === 'blue' ? 'from-blue-400 to-blue-600' : step.color === 'green' ? 'from-green-400 to-green-600' : step.color === 'orange' ? 'from-orange-400 to-orange-600' : 'from-purple-400 to-purple-600'} flex items-center justify-center mb-4 border-4 border-white shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} mb-2 text-center text-slate-800`}>{step.title}</h3>
                    <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-slate-600 text-center`}>{step.description}</p>
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

        {/* 学生主導コミュニティの強調 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="text-center mb-12"
        >
          <motion.h3 
            variants={fadeInUp}
            className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} mb-4 text-slate-800`}
          >
            学生が<span className="text-orange-600">自分たちで運営</span>するコミュニティ
          </motion.h3>
          <motion.p 
            variants={fadeInUp}
            className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-slate-600 max-w-4xl mx-auto`}
          >
            企業との交渉・マネジメント経験も積める、他では体験できない成長機会
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
              className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 ${feature.color === 'blue' ? 'border-blue-200 hover:border-blue-300' : feature.color === 'green' ? 'border-green-200 hover:border-green-300' : 'border-orange-200 hover:border-orange-300'} ${DESIGN_SYSTEM.animations.transition.medium} hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${feature.color === 'blue' ? 'from-blue-400 to-blue-600' : feature.color === 'green' ? 'from-green-400 to-green-600' : 'from-orange-400 to-orange-600'} flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} mb-3 text-slate-800`}>{feature.title}</h4>
              <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-slate-600`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 社会的インパクト */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-20 bg-gradient-to-r from-blue-700 via-purple-600 to-green-700 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl"
        >
          <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} mb-6 text-white`}>社会的意義</h3>
          <p className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} mb-8 max-w-4xl mx-auto text-white/90`}>
            雇用ミスマッチの解消、早期離職率の削減、若者の成長機会創出など、<br className="md:hidden" />社会課題の根本的解決に貢献する持続可能なエコシステム
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-white mb-3`}>雇用ミスマッチの解消</h4>
              <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-white/90`}>実際の業務体験による相互理解で適性マッチング向上</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-white mb-3`}>早期離職率の削減</h4>
              <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-white/90`}>事前の相互理解により入社後のギャップを最小化</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-white mb-3`}>若者の成長機会創出</h4>
              <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-white/90`}>実践的な学習機会と自信を持てる居場所の提供</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}