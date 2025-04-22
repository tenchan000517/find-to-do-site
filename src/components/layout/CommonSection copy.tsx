'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, MessageCircle, Briefcase } from 'lucide-react';

type Feature = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
};

const features: Feature[] = [
  {
    id: 'service',
    icon: Briefcase,
    title: 'サービスを見る',
    description: '3つの主要サービスラインで通常の1/10以下のコストで価値を提供',
    href: '/service'
  },
  {
    id: 'document',
    icon: FileText,
    title: '詳しい資料を見る',
    description: '「インターン→メンター」の成長パスを活用した独自ビジネスモデルの詳細資料',
    href: '/documents'
  },
  {
    id: 'contact',
    icon: MessageCircle,
    title: 'お問い合わせ',
    description: '貴社の課題に合わせた最適なソリューションをご提案いたします',
    href: '/contact'
  }
];

export function CommonSection() {
  return (
    <section className="relative py-20">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg/1.png"
          alt="Background"
          fill
          className="object-cover"
          quality={90}
        />
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 md:max-w-6xl relative z-10">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl font-bold mb-16"
        >
          <span className="text-white">人材育成と価値創出が</span>
          <span className="text-cyan-400">循環する</span>
          <span className="text-white">新しいビジネスモデル</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:max-w-5xl mx-auto">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: feature.id === 'service' ? 0 : feature.id === 'document' ? 0.2 : 0.4 }}
              className="h-full"
            >
              <Link href={feature.href} className="block h-full">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 md:p-10 h-full hover:transform hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center text-center md:min-h-[320px]">
                  <feature.icon className="w-8 h-8 md:w-12 md:h-12 mb-4 md:mb-6 text-indigo-600" />
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-blue-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-xl">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}