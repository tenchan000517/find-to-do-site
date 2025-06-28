// components/sections/ValueDiscoverySection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DESIGN_SYSTEM } from '@/styles/design-system';
import { ArrowRight, Eye, Heart, Lightbulb, Target, Users, Zap } from 'lucide-react';

const ValueDiscoverySection: React.FC = () => {
  const beforeAfterComparison = [
    {
      title: '従来の外注',
      items: [
        { icon: Target, text: '成果物のみ', color: 'text-gray-500' },
        { icon: Users, text: '関係は一時的', color: 'text-gray-500' },
        { icon: Eye, text: '企業の魅力は伝わらない', color: 'text-gray-500' },
        { icon: Zap, text: '採用には繋がらない', color: 'text-gray-500' }
      ],
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      title: 'FIND to DOアプローチ',
      items: [
        { icon: Target, text: '高品質な成果物', color: 'text-blue-600' },
        { icon: Heart, text: '信頼関係の構築', color: 'text-green-600' },
        { icon: Lightbulb, text: '企業の本当の魅力を発見・伝達', color: 'text-orange-600' },
        { icon: Users, text: '高い採用成功率', color: 'text-emerald-600' }
      ],
      bgColor: 'bg-gradient-to-br from-blue-50 to-green-50',
      borderColor: 'border-blue-200'
    }
  ];

  const valuePoints = [
    {
      icon: Lightbulb,
      title: '企業の本当の魅力発見',
      description: '日常業務を通じて、企業様も気づいていない自社の価値や魅力を学生が発見します',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Heart,
      title: '自然な採用ブランディング',
      description: '押し付けがましい PR ではなく、実際の体験を通じたリアルな企業文化の伝承',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: Target,
      title: '効率的な人材選別',
      description: '実際の業務適性を事前に確認できるため、採用ミスマッチのリスクを大幅に削減',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <section className={`${DESIGN_SYSTEM.spacing.section.padding} relative overflow-hidden`}>
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-green-50/30"></div>
      
      <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding} relative z-10`}>
        
        {/* 発見のメッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide">
              新発見！
            </div>
          </motion.div>
          
          <h2 className={`${DESIGN_SYSTEM.typography.enterprise.headline.medium} text-slate-800 mb-6`}>
            それが実は、企業の本当の魅力を<br className="md:hidden" />伝える最高の機会です
          </h2>
          
          <p className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-slate-600 max-w-4xl mx-auto`}>
            業務委託と採用ブランディングの二重価値
          </p>
        </motion.div>

        {/* Before/After比較 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {beforeAfterComparison.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, x: sectionIndex === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.2, duration: 0.8 }}
              className={`
                ${section.bgColor} ${section.borderColor} border-2 rounded-2xl p-8
                ${sectionIndex === 1 ? 'shadow-xl' : ''}
              `}
            >
              <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.medium} text-slate-800 mb-6 text-center`}>
                {section.title}
              </h3>
              
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (sectionIndex * 0.2) + (itemIndex * 0.1), duration: 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`${item.color} flex-shrink-0`}>
                      <item.icon size={20} />
                    </div>
                    <span className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} ${item.color}`}>
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 矢印 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center mb-16"
        >
          <div className="bg-white rounded-full p-4 shadow-lg border-2 border-blue-200">
            <ArrowRight className="text-blue-600" size={32} />
          </div>
        </motion.div>

        {/* 詳細な価値ポイント */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {valuePoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`
                ${point.bgColor} rounded-2xl p-6 border border-slate-200
                hover:shadow-lg transition-all duration-300 hover:-translate-y-1
              `}
            >
              <div className={`${point.color} mb-4`}>
                <point.icon size={32} />
              </div>
              
              <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-slate-800 mb-3`}>
                {point.title}
              </h3>
              
              <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-slate-600`}>
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 戦略的アプローチの強調 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.large} mb-6`}>
            相互成長による持続可能な関係構築
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} mb-3`}>
                短期的成果
              </h4>
              <p className={`${DESIGN_SYSTEM.typography.enterprise.body.medium}`}>
                今すぐ必要な成果物を<br />高品質で提供
              </p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} mb-3`}>
                長期的価値
              </h4>
              <p className={`${DESIGN_SYSTEM.typography.enterprise.body.medium}`}>
                優秀な人材パイプラインを<br />継続的に構築
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueDiscoverySection;