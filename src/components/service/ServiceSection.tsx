// components/sections/ServicesSection.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Code, CalendarDays, Users } from 'lucide-react';

type Service = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  href: string;
  color: string;
};

const services: Service[] = [
  {
    id: 'webdev',
    icon: Code,
    title: 'WEBアプリ・DX支援',
    description: '通常の1/10以下のコストでWEBアプリ開発やDXを実現します。実際のビジネス課題を解決しながら、インターン生が実践的なスキルを身につけます。',
    features: [
      'WEBアプリケーション開発',
      '企業DX化支援',
      'ブロックチェーン技術活用',
      '動画編集サービス',
      'WEBサイト制作'
    ],
    href: '/service/webdev',
    color: 'blue'
  },
  {
    id: 'event',
    icon: CalendarDays,
    title: 'イベント制作',
    description: '企業と学生のマッチングを促進するイベントを企画・運営します。インターン生がヤングボードとして参加し、イベント運営スキルを磨きます。',
    features: [
      '業界研究セミナー',
      '職種体験ワークショップ',
      '企業と学生の交流会',
      'キャリア探索イベント',
      'スキル習得プログラム'
    ],
    href: '/service/event',
    color: 'orange'
  },
  {
    id: 'intern',
    icon: Users,
    title: 'インターン生紹介',
    description: '実践を通じて育成されたインターン生を企業に紹介します。学生広報員システムにより、企業の魅力を学生目線で発信します。',
    features: [
      'インターン求人情報のポータルサイト掲載',
      'インターン設計・運営コンサルティング',
      '適性を考慮したインターン生のマッチング',
      '学生広報員システム',
      'インターン→採用フロー設計'
    ],
    href: '/service/intern',
    color: 'green'
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

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            サービス内容
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="w-32 h-1 bg-orange-500 mx-auto mb-6"
          />
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            「インターン→メンター」の成長パスを活用した独自のビジネスモデルで、
            コスト効率の高いサービスと人材育成の両立を実現します
          </motion.p>
        </motion.div>

        <div className="space-y-12 md:space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 md:gap-12 items-center`}
            >
              {/* イメージ部分 */}
              <motion.div 
                variants={fadeInUp}
                className="w-full md:w-5/12"
              >
                <div className={`relative h-64 md:h-80 overflow-hidden rounded-lg shadow-xl border-t-4 border-${service.color}-500`}>
                  <Image
                    src={`/services/${service.id}.jpg`}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${service.color}-900/80 to-transparent flex items-end p-6`}>
                    <service.icon className="w-12 h-12 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* コンテンツ部分 */}
              <motion.div 
                variants={fadeInUp}
                className="w-full md:w-7/12"
              >
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 text-${service.color}-600`}>
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`text-${service.color}-500 mt-1`}>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href={service.href}
                  className={`inline-flex items-center px-6 py-3 rounded-lg bg-${service.color}-600 hover:bg-${service.color}-700 text-white font-medium transition-colors`}
                >
                  詳細を見る
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}