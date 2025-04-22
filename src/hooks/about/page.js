'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Users, PieChart, Shield, Briefcase, ThumbsUp } from 'lucide-react';

// アニメーションバリアントの定義
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

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
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

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* ヒーローセクション */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center">
        <Image
          src="/images/2.jpg"
          alt="企業情報"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">企業情報</h1>
          <p className="text-lg md:text-xl lg:text-2xl">
            次世代を担う人材育成とマッチングの革新
          </p>
        </motion.div>
      </section>

      {/* メインAboutセクション */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
              className="order-2 lg:order-1"
            >
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  即戦力人材との出会いを。<br className="hidden md:block" />
                  スキル育成から採用まで。
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  事前のスキルアップサポートとセミナー受講を通じて、即戦力となる人材を育成。
                  企業様は実際の働きぶりを見てスカウトできるため、より確実な採用が可能です。
                </p>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  目標が明確で意識の高い人材と企業のニーズを丁寧にマッチングすることで、
                  採用後のミスマッチを防ぎ、継続的な成長をサポートします。
                </p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
              className="order-1 lg:order-2"
            >
              <div className="relative h-[300px] md:h-[400px] w-full">
                <Image
                  src="/about/2.jpg"
                  alt="インターン採用の特徴"
                  fill
                  className="rounded-lg shadow-xl object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ミッションセクション */}
      <section className="py-12 md:py-20 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="container mx-auto px-4 md:px-6"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12"
          >
            ミッション
          </motion.h2>
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl font-medium mb-6 md:mb-8"
            >
              「企業と学生の可能性を最大限に引き出す」
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg leading-relaxed"
            >
              私たちは、企業と学生を"直接"繋ぐプラットフォームとして、<br className="hidden md:block" />
              双方の成長と発展に貢献します。<br className="hidden md:block" />
              実践的なスキル育成と、実際の働きぶりを通じた<br className="hidden md:block" />
              マッチングにより、確実な採用を実現します。
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ビジョンセクション */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="space-y-8 md:space-y-12"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">ビジョン</h2>
              <p className="text-lg md:text-xl leading-relaxed">
                すべての企業と学生が、<br className="hidden md:block" />
                最適なマッチングを実現できる社会を目指して
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    title: '実践的育成',
                    content: '実務経験を通じた成長支援により、即戦力となる人材を育成します',
                  },
                  {
                    title: '確実なマッチング',
                    content: '実際の働きぶりを通じて、企業と学生の相互理解を深めます',
                  },
                  {
                    title: '継続的成長',
                    content: '採用後も含めた長期的な視点で、双方の成長をサポートします',
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="p-6 md:p-8 bg-white rounded-lg shadow-lg"
                  >
                    <h3 className="text-lg md:text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-sm md:text-base text-gray-600">{item.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ロードマップセクション */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="space-y-8 md:space-y-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12"
            >
              ロードマップ
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-center">
                {[
                  {
                    phase: '1',
                    title: '基盤構築フェーズ',
                    content: 'マッチングプラットフォームの開発と、基本的な育成プログラムの確立',
                  },
                  {
                    phase: '2',
                    title: '拡大フェーズ',
                    content: '参加企業と学生の拡大、育成プログラムの多様化と強化',
                  },
                  {
                    phase: '3',
                    title: '発展フェーズ',
                    content: '全国展開とサービスの高度化、新たな価値創造の実現',
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="space-y-4"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-xl md:text-2xl font-bold text-orange-500">{item.phase}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                    <p className="text-sm md:text-base text-gray-600">{item.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}