// components/sections/StudentJoinProcessSection.tsx
'use client';

import { motion } from 'framer-motion';
import { FileText, Users, BookOpen, Code, Award } from 'lucide-react';

export default function StudentJoinProcessSection() {
  const steps = [
    {
      icon: FileText,
      title: "簡単応募",
      description: "参加は完全無料。簡単なフォームから経験やスキルレベルを登録するだけ",
      color: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      icon: Users,
      title: "面談",
      description: "オンラインでの簡単な面談。未経験でも意欲があれば参加可能です",
      color: "bg-blue-200",
      iconColor: "text-blue-600"
    },
    {
      icon: BookOpen,
      title: "基礎学習",
      description: "メンターの指導のもと、必要な基礎スキルを身につけます",
      color: "bg-blue-300",
      iconColor: "text-blue-700"
    },
    {
      icon: Code,
      title: "プロジェクト参加",
      description: "実際のプロジェクトに参加し、実務経験とともに報酬を得られます",
      color: "bg-blue-400",
      iconColor: "text-blue-800"
    },
    {
      icon: Award,
      title: "成長とキャリアアップ",
      description: "スキルアップに応じて報酬アップ。メンターへのキャリアパスも",
      color: "bg-blue-500",
      iconColor: "text-white"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-blue-600">すべて無料</span>で始められる学習と成長
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            FIND to DOへの参加は完全無料。未経験からでも、プロのメンターとともに
            実践的なスキルを身につけながら報酬も得られます。
          </p>
        </motion.div>

        {/* PC表示: 横向きタイムライン */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* 接続線 */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gray-200 z-0"></div>
          
          {/* ステップ */}
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md`}>
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>
                <div className="text-center mt-4">
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* モバイル表示: 縦向きタイムライン */}
        <div className="md:hidden">
          <div className="relative pl-8">
            {/* 縦の接続線 */}
            <div className="absolute top-0 bottom-0 left-4 w-1 bg-gray-200 z-0"></div>
            
            {/* ステップ */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <div className={`absolute -left-12 ${step.color} w-10 h-10 rounded-full flex items-center justify-center shadow-md`}>
                    <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="/for-students#apply" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            無料で応募する
          </a>
        </motion.div>
      </div>
    </section>
  );
}