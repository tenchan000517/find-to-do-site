// components/sections/EmpathySection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DESIGN_SYSTEM } from '@/styles/design-system';
import { Clock, Users, TrendingUp, Zap } from 'lucide-react';
import AudienceBadge from '@/components/ui/AudienceBadge';

const EmpathySection: React.FC = () => {
  const painPoints = [
    {
      icon: Clock,
      title: '時間がない',
      description: '本来の業務に集中したいのに、雑務に追われている',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-400/30',
      iconColor: 'text-red-400'
    },
    {
      icon: Users,
      title: '人手不足',
      description: '優秀な人材を採用したいけど、良い人材に出会えない',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-400/30',
      iconColor: 'text-orange-400'
    },
    {
      icon: TrendingUp,
      title: '採用コスト高騰',
      description: '採用費をかけても期待する人材に出会えない',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-400/30',
      iconColor: 'text-yellow-400'
    },
    {
      icon: Zap,
      title: '即戦力が欲しい',
      description: '研修期間を短縮して、すぐに活躍してくれる人材が欲しい',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400/30',
      iconColor: 'text-blue-400'
    }
  ];

  return (
    <section className={`${DESIGN_SYSTEM.spacing.section.padding} relative overflow-hidden`}>
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100"></div>
      
      <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding} relative z-10`}>
        {/* メインタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <AudienceBadge type="enterprise" size="medium" />
          </div>
          <h2 className={`${DESIGN_SYSTEM.typography.enterprise.headline.medium} text-slate-800 mb-6`}>
            猫の手も借りたい業務、<br className="md:hidden" />ありませんか？
          </h2>
          
          <p className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-slate-600 max-w-3xl mx-auto`}>
            多くの企業が抱える現実的な課題
          </p>
        </motion.div>

        {/* 具体例グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`
                ${point.bgColor} ${point.borderColor} border rounded-xl p-6
                hover:shadow-lg transition-all duration-300 hover:-translate-y-1
              `}
            >
              <div className="flex items-start space-x-4">
                <div className={`
                  ${point.iconColor} p-3 bg-white rounded-lg shadow-sm
                  flex-shrink-0
                `}>
                  <point.icon size={24} />
                </div>
                
                <div className="flex-grow">
                  <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-slate-800 mb-2`}>
                    {point.title}
                  </h3>
                  <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-slate-600`}>
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 共感メッセージとソリューションへの導線 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.medium} text-slate-800 mb-6`}>
              これらの課題、多くの企業様が経験されているのではないでしょうか？
            </h3>
            
            <p className={`${DESIGN_SYSTEM.typography.enterprise.body.large} text-slate-600 mb-8`}>
              従来の外注や派遣では解決が難しい、これらのリアルな経営課題。<br />
              <span className="font-semibold text-slate-800">実は、これらすべてを同時に解決する新しいアプローチがあります。</span>
            </p>

            {/* 次セクションへの期待を高める */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200/50">
              <p className={`${DESIGN_SYSTEM.typography.enterprise.body.large} text-slate-700 font-medium`}>
                従来の課題を根本から解決する革新的な手法があります
              </p>
              
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4"
              >
                <div className="w-6 h-6 mx-auto border-2 border-blue-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmpathySection;