// components/sections/QualityAssuranceSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, CheckCircle, Clock, Users } from 'lucide-react';

export default function QualityAssuranceSection() {
  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            低コストでも<span className="text-orange-400">品質は妥協しない</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            FIND to DOの開発プロジェクトは、すべて業界経験豊富なプロフェッショナルが
            監修しています。コスト削減と品質保証を両立した独自のアプローチです。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/service/dx.png"
                alt="品質保証プロセス"
                fill
                className="object-cover"
              />
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent">
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
                  <Shield className="w-16 h-16 text-orange-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">品質保証</h3>
                  <p className="text-white/80">プロフェッショナル監修</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              3段階の品質管理プロセス
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  icon: CheckCircle,
                  title: "プロフェッショナル監修",
                  description: "業界経験5年以上のプロフェッショナルがプロジェクトを監修し、品質を担保します。"
                },
                {
                  icon: Users,
                  title: "メンターによるレビュー",
                  description: "すべての成果物は、経験豊富なメンターによる厳格なコードレビューを経て納品されます。"
                },
                {
                  icon: Clock,
                  title: "計画的な進行管理",
                  description: "プロジェクト計画、マイルストーン設定、進捗管理を徹底し、納期遅延リスクを最小化します。"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 bg-blue-600/30 p-4 rounded-lg border border-blue-500/50"
            >
              <Shield className="w-10 h-10 text-blue-400 flex-shrink-0" />
              <p className="text-gray-100">
                <span className="font-bold">品質保証付き:</span> 万が一の場合も、追加費用なしで修正対応いたします。安心してプロジェクトをお任せください。
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >

        </motion.div>
      </div>
    </section>
  );
}