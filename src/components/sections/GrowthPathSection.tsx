// components/sections/GrowthPathSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Book, Code, Users, Trophy, DollarSign, ChevronRight } from 'lucide-react';

export default function GrowthPathSection() {
  const stages = [
    { 
      title: 'ビギナー',
      icon: Book,
      skills: '基礎スキル習得',
      experience: '基礎トレーニング参加',
      earnings: '3万円/件～', 
      gradient: 'from-blue-100 to-blue-200',
      iconGradient: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-300'
    },
    { 
      title: 'レギュラー',
      icon: Code,
      skills: '実務スキル習得',
      experience: '実案件への参加',
      earnings: '5万円/件～', 
      gradient: 'from-blue-200 to-blue-300',
      iconGradient: 'from-blue-500 to-blue-700',
      borderColor: 'border-blue-400'
    },
    { 
      title: 'アドバンスト',
      icon: Users,
      skills: 'チーム開発スキル',
      experience: 'プロジェクトリード',
      earnings: '10万円/件～', 
      gradient: 'from-blue-300 to-blue-400',
      iconGradient: 'from-blue-600 to-blue-800',
      borderColor: 'border-blue-500'
    },
    { 
      title: 'メンター',
      icon: Trophy,
      skills: '指導・管理スキル',
      experience: 'インターン指導',
      earnings: '2万円/人～', 
      gradient: 'from-blue-400 to-blue-500',
      iconGradient: 'from-blue-700 to-blue-900',
      borderColor: 'border-blue-600'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            明確な<span className="text-orange-500 relative">
              成長パス
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-300 opacity-50 rounded-full"></span>
            </span>で着実にスキルアップ
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            未経験から始めても、段階的に成長できる仕組みを用意。
            スキルアップに応じて報酬も増加し、将来はメンターとして後進の指導も可能になります。
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* PC 表示時の接続線 */}
          <div className="absolute top-1/2 left-8 right-8 h-2 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 rounded-full -translate-y-1/2 z-0 hidden lg:block"></div>
          
          {/* 成長ステージ */}
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`bg-gradient-to-br ${stage.gradient} rounded-2xl shadow-xl p-6 border ${stage.borderColor} relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
              >
                {/* 装飾背景サークル */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white opacity-10"></div>
                
                {/* PC 表示時のステージ番号 */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center font-bold text-blue-800 shadow-sm hidden lg:flex">
                  {index + 1}
                </div>
                
                {/* ステージ間の矢印（モバイル表示） */}
                {index < stages.length - 1 && (
                  <div className="flex justify-center my-4 lg:hidden">
                    <ChevronRight className="w-6 h-6 text-blue-400 transform rotate-90" />
                  </div>
                )}
                
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stage.iconGradient} p-1 flex items-center justify-center mx-auto mb-5 shadow-lg transform transition-transform group-hover:rotate-3`}>
                  <stage.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-center mb-5 text-blue-900">{stage.title}</h3>
                
                <div className="space-y-4">
                  <div className="flex flex-col bg-white bg-opacity-60 p-3 rounded-lg">
                    <span className="text-sm text-blue-800 font-semibold mb-1">習得スキル</span>
                    <span className="text-gray-800 font-medium">{stage.skills}</span>
                  </div>
                  
                  <div className="flex flex-col bg-white bg-opacity-60 p-3 rounded-lg">
                    <span className="text-sm text-blue-800 font-semibold mb-1">主な経験</span>
                    <span className="text-gray-800 font-medium">{stage.experience}</span>
                  </div>
                  
                  <div className="flex flex-col bg-white bg-opacity-60 p-3 rounded-lg">
                    <span className="text-sm text-blue-800 font-semibold mb-1">平均収入</span>
                    <span className="text-gray-800 font-medium flex items-center">
                      {stage.earnings}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="/for-students" 
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            参加方法を見る
          </a>
        </motion.div>
      </div>
    </section>
  );
}