'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';
import { Target, Users, Briefcase, PieChart, Shield, ThumbsUp } from 'lucide-react';

const solutions = [
  {
    id: 'skill-up',
    icon: Target,
    title: '即戦力人材の育成',
    description: '事前のスキルアップとキャリア教育により、高い意識と実践力を持つ即戦力人材を育成します。'
  },
  {
    id: 'matching',
    icon: Users,
    title: '最適なマッチング',
    description: '目標が明確で意識の高い人材と、企業のニーズを丁寧にマッチング。採用後のミスマッチを防ぎます。'
  },
  {
    id: 'cost',
    icon: PieChart,
    title: '採用コストの最適化',
    description: 'ダイレクトマーケティングと柔軟な料金プランにより、効率的な採用活動を実現します。'
  },
  {
    id: 'support',
    icon: Shield,
    title: '手厚いサポート体制',
    description: 'インターン生と企業の双方に寄り添い、継続的なフォローアップで成長をサポートします。'
  },
  {
    id: 'semi-pro',
    icon: Briefcase,
    title: 'セミプロフェッショナル',
    description: '実務経験を積んだインターン生が、即戦力として企業の業務に貢献します。'
  },
  {
    id: 'follow',
    icon: ThumbsUp,
    title: '密接なフォローアップ',
    description: 'ユーザーとの距離の近さを活かし、きめ細やかなサポートで成長を促進します。'
  }
];

export function Solutions() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6"
          >
            FIND TO DOの強み
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            単なるインターンシップではない、<br />
            実践的な人材育成とマッチングを実現
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <solution.icon className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">{solution.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            私たちは、インターン生の成長と企業の発展を両立させる、
            新しい形のキャリアプラットフォームを提供しています。
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
            詳しく見る
          </button>
        </motion.div>
      </div>
    </section>
  );
}