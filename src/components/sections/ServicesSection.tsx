// components/sections/ServicesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Code, BarChart3, Database, Globe, Palette, Cpu } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "Webアプリケーション開発",
      description: "React/Next.jsを使用した高パフォーマンスなWebアプリ開発",
      normalPrice: "800万円〜",
      ourPrice: "80万円〜"
    },
    {
      icon: Database,
      title: "バックエンド開発",
      description: "Node.js、Python、Firebase等を活用した堅牢なバックエンド構築",
      normalPrice: "600万円〜",
      ourPrice: "60万円〜"
    },
    {
      icon: Globe,
      title: "Web3開発",
      description: "ブロックチェーン技術を活用したDApps、NFTプラットフォーム開発",
      normalPrice: "1,000万円〜",
      ourPrice: "100万円〜"
    },
    {
      icon: Palette,
      title: "UI/UXデザイン",
      description: "ユーザー体験を最適化する直感的でモダンなインターフェースデザイン",
      normalPrice: "300万円〜",
      ourPrice: "30万円〜"
    },
    {
      icon: BarChart3,
      title: "DX支援",
      description: "業務プロセスのデジタル化による効率向上と競争力強化",
      normalPrice: "500万円〜",
      ourPrice: "50万円〜"
    },
    {
      icon: Cpu,
      title: "システム連携・API開発",
      description: "既存システムとの連携や効率的なAPI設計・開発",
      normalPrice: "400万円〜",
      ourPrice: "40万円〜"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            低コストで<span className="text-orange-500">質の高い</span>開発サービス
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            FIND to DOでは、フルスタック開発からデザイン、Web3まで幅広い領域の開発サービスを
            通常の1/10のコストで提供しています。すべてのプロジェクトはプロフェッショナルが監修します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <service.icon className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">通常価格:</span>
                  <span className="text-base font-medium text-gray-700 line-through">
                    {service.normalPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">当社価格:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {service.ourPrice}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="/service" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
            サービス詳細を見る
          </a>
        </motion.div>
      </div>
    </section>
  );
}