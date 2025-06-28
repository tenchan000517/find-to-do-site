// components/sections/PipelineValueSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DESIGN_SYSTEM } from '@/styles/design-system';
import { ArrowRight, CheckCircle, TrendingUp, Users, Target, Award, Zap, Building2 } from 'lucide-react';

const PipelineValueSection: React.FC = () => {
  const [count, setCount] = useState(0);
  
  // 90%のカウントアップアニメーション
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 1;
        });
      }, 20);
      return interval;
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const flowSteps = [
    {
      icon: Target,
      title: '成果物提供',
      description: '猫の手も借りたい業務を学生がしっかりと完遂',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Users,
      title: '関係構築',
      description: '業務を通じて企業と学生の間に自然な信頼関係が構築',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: Award,
      title: '採用検討',
      description: '相互理解の上で、90%の高確率で採用に繋がる',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: Building2,
      title: 'パイプライン',
      description: '継続的な人材確保システムが完成',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const comparisonData = [
    {
      metric: '採用成功率',
      traditional: '10-30%',
      findToDo: '90%',
      improvement: '3-9倍向上'
    },
    {
      metric: '初期教育コスト',
      traditional: '6ヶ月',
      findToDo: '1ヶ月',
      improvement: '6倍短縮'
    },
    {
      metric: '離職リスク',
      traditional: '高い',
      findToDo: '極めて低い',
      improvement: '大幅改善'
    }
  ];

  return (
    <section className={`${DESIGN_SYSTEM.spacing.section.padding} relative overflow-hidden`}>
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-green-50"></div>
      
      <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding} relative z-10`}>
        
        {/* メインタイトルと90%の強調 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className={`${DESIGN_SYSTEM.typography.enterprise.headline.medium} text-slate-800 mb-8`}
          >
            成果物を得ながら、<br className="md:hidden" />優秀な人材パイプラインを構築
          </motion.h2>
          
          {/* 90%成功率の大きな表示 */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white max-w-2xl mx-auto mb-8"
          >
            <div className="flex items-center justify-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-6xl md:text-8xl font-bold"
              >
                {count}%
              </motion.div>
              <div className="text-left">
                <div className={`${DESIGN_SYSTEM.typography.enterprise.subheading.medium}`}>
                  採用成功率
                </div>
                <div className={`${DESIGN_SYSTEM.typography.enterprise.body.small} opacity-90`}>
                  従来手法では実現不可能
                </div>
              </div>
            </div>
          </motion.div>

          <p className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-slate-600 max-w-3xl mx-auto`}>
            新しい対価モデル：<span className="font-bold text-slate-800">採用コストを支払うのではなく成果物に対してのみ支払う</span>
          </p>
        </motion.div>

        {/* フロー図：成果物→関係構築→採用→パイプライン */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`${DESIGN_SYSTEM.typography.enterprise.subheading.medium} text-center text-slate-800 mb-12`}
          >
            戦略的フロー
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`
                  ${step.bgColor} ${step.borderColor} border-2 rounded-2xl p-6 text-center
                  hover:shadow-lg transition-all duration-300 hover:-translate-y-1
                  relative
                `}
              >
                {/* ステップ番号 */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">
                  {index + 1}
                </div>
                
                <div className={`${step.color} mb-4 flex justify-center`}>
                  <step.icon size={40} />
                </div>
                
                <h4 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.small} text-slate-800 mb-3`}>
                  {step.title}
                </h4>
                
                <p className={`${DESIGN_SYSTEM.typography.enterprise.body.small} text-slate-600`}>
                  {step.description}
                </p>
                
                {/* 矢印（最後以外） */}
                {index < flowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="text-slate-400" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 数値比較表 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-16"
        >
          <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.medium} text-center text-slate-800 mb-8`}>
            従来手法との圧倒的な違い
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-left py-4 text-slate-800`}>
                    指標
                  </th>
                  <th className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-center py-4 text-slate-600`}>
                    従来手法
                  </th>
                  <th className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-center py-4 text-blue-600`}>
                    FIND to DO
                  </th>
                  <th className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-center py-4 text-green-600`}>
                    改善効果
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="border-b border-slate-100"
                  >
                    <td className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} py-4 font-semibold text-slate-800`}>
                      {row.metric}
                    </td>
                    <td className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-center py-4 text-slate-600`}>
                      {row.traditional}
                    </td>
                    <td className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-center py-4 font-bold text-blue-600`}>
                      {row.findToDo}
                    </td>
                    <td className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-center py-4 font-bold text-green-600`}>
                      {row.improvement}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 戦略性・効率性のまとめ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-blue-600 mr-3" size={32} />
              <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.medium} text-blue-800`}>
                戦略的投資効果
              </h3>
            </div>
            <p className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-blue-700`}>
              成果物の対価として支払った費用が、そのまま採用ブランディングと人材パイプライン構築に投資される効率的なモデル
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
            <div className="flex items-center mb-4">
              <Zap className="text-green-600 mr-3" size={32} />
              <h3 className={`${DESIGN_SYSTEM.typography.enterprise.subheading.medium} text-green-800`}>
                質重視アプローチ
              </h3>
            </div>
            <p className={`${DESIGN_SYSTEM.typography.enterprise.body.medium} text-green-700`}>
              量より質を重視する企業のための厳選サービス。確実な成果と長期的な価値創出を両立
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PipelineValueSection;