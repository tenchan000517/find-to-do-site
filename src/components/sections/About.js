'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Users, PieChart, Shield, Briefcase, ThumbsUp } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 bg-gray-50">
      {/* セクション1: ABOUT US */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold mb-6">
                即戦力人材との出会いを。<br />
                スキル育成から採用まで。
              </h2>
              <p className="text-gray-600 leading-relaxed">
                事前のスキルアップサポートとセミナー受講を通じて、即戦力となる人材を育成。
                企業様は実際の働きぶりを見てスカウトできるため、より確実な採用が可能です。
              </p>
              <p className="text-gray-600 leading-relaxed">
                目標が明確で意識の高い人材と企業のニーズを丁寧にマッチングすることで、
                採用後のミスマッチを防ぎ、継続的な成長をサポートします。
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg mt-6 hover:bg-orange-600 transition-colors"
              >
                詳しく見る
              </motion.button>
            </motion.div>
          </div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative h-[400px] w-full">
              <Image
                src="/about/1.jpg"
                alt="インターン採用の特徴"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* セクション2: 特徴 */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] w-full"
          >
            <Image
              src="/about/2.jpg"
              alt="人材育成とマッチング"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-xl"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold mb-6">
              スキルアップから採用まで、<br />
              トータルサポート。
            </h2>
            <p className="text-gray-600 leading-relaxed">
              私たちは、インターン生の育成から企業とのマッチングまで一貫してサポートします。
              事前のキャリア教育とスキルアップにより、高い意識と実践力を持つ即戦力人材を育成。
              企業様は実際の働きぶりを見た上でスカウトできるため、より確実な採用が可能です。
            </p>
            <p className="text-gray-600 leading-relaxed">
              また、ダイレクトマーケティングと柔軟な料金プランにより、採用コストを最適化。
              インターン生と企業の双方に寄り添い、継続的なフォローアップで成長をサポートしています。
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg mt-6 hover:bg-orange-600 transition-colors"
            >
              サービスの詳細へ
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}