'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Code, Database, Globe, BarChart3, MonitorSmartphone, Palette } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  normalPrice: string;
  ourPrice: string;
};

const services: Service[] = [
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
    icon: MonitorSmartphone,
    title: "動画・WEBサイト制作",
    description: "企業紹介、職種紹介、インターン体験等の動画制作とWEBサイト構築",
    normalPrice: "200万円〜",
    ourPrice: "20万円〜"
  }
];

const benefits = [
  {
    title: "コスト削減",
    description: "通常の1/10以下のコストで専門性の高い開発を実現します。",
  },
  {
    title: "品質保証",
    description: "すべてのプロジェクトは経験豊富なプロフェッショナルが監修します。",
  },
  {
    title: "若者視点",
    description: "若いインターン生の視点を取り入れた新鮮なアイデアを提供します。",
  },
  {
    title: "柔軟な対応",
    description: "仕様変更や追加要件にも柔軟に対応します。",
  },
  {
    title: "社会貢献",
    description: "若い人材の育成・成長に貢献しながらビジネス課題を解決します。",
  },
  {
    title: "人材発掘",
    description: "将来の採用候補との接点として活用いただけます。",
  }
];

const cases = [
  {
    title: "オンライン予約システム",
    description: "飲食店向けの予約・顧客管理システム構築",
    normalPrice: "700万円",
    ourPrice: "70万円",
    period: "3ヶ月",
    image: "/cases/case1.jpg"
  },
  {
    title: "社内DX推進ツール",
    description: "紙ベースの業務プロセスをデジタル化するシステム開発",
    normalPrice: "500万円",
    ourPrice: "50万円",
    period: "2ヶ月",
    image: "/cases/case2.jpg"
  },
  {
    title: "マーケティングサイト",
    description: "製品紹介と顧客データ収集のためのランディングページ制作",
    normalPrice: "300万円",
    ourPrice: "30万円",
    period: "1.5ヶ月",
    image: "/cases/case3.jpg"
  }
];

export default function WebDevServicePage() {
  return (
    <div className="min-h-screen pt-0">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="w-full md:w-1/2 text-white mb-10 md:mb-0"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                WEBアプリ・DX支援
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                通常の1/10以下のコストで<br />
                高品質なWEB開発とDX推進を実現
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="px-8 py-3 bg-orange-500 text-white text-2xl rounded-lg font-medium hover:bg-orange-600 transition-colors text-center"
                >
                  お問い合わせ
                </Link>
                {/* <Link 
                  href="/documents" 
                  className="px-8 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
                >
                  資料ダウンロード
                </Link> */}
              </div>
            </motion.div>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="w-full md:w-1/2"
            >
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/service/dx.png"
                  alt="WEBアプリ・DX支援"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* サービス紹介セクション */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">提供サービス</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              インターン生とメンターの協働により、高品質なサービスを低コストで提供します。
              すべてのプロジェクトはプロフェッショナルが監修します。
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    {/* <span className="text-sm text-gray-500">通常価格:</span>
                    <span className="text-base font-medium text-gray-700 line-through">
                      {service.normalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">当社価格:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {service.ourPrice}
                    </span> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 開発プロセスセクション */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">開発プロセス</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              透明性の高いプロセスで、お客様の要望を確実に形にします
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* 接続線 */}
              <div className="absolute top-1/4 left-8 bottom-1/4 w-1 bg-blue-200 md:hidden"></div>
              <div className="absolute left-0 right-0 top-1/4 h-1 bg-blue-200 hidden md:block"></div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {[
                  { number: 1, title: 'ヒアリング', description: '要件定義とゴール設定' },
                  { number: 2, title: '企画・設計', description: '仕様とデザイン決定' },
                  { number: 3, title: '開発', description: 'メンター監修のもと実装' },
                  { number: 4, title: 'テスト・品質確認', description: '厳格な品質チェック' },
                  { number: 5, title: 'リリース・サポート', description: '継続的な改善対応' }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative z-10 flex md:flex-col items-start md:items-center"
                  >
                    <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mr-4 md:mr-0 md:mb-4 z-10">
                      {step.number}
                    </div>
                    <div className="md:text-center">
                      <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 導入メリットセクション */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">導入メリット</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              コスト削減以外にも、FIND to DOならではの多くのメリットがあります
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-bold mb-2 text-blue-800">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 導入事例セクション
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">導入事例</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              多くの企業様にご利用いただき、業務効率化やビジネス拡大に貢献しています
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cases.map((caseItem, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div className="relative h-48">
                  <Image
                    src={caseItem.image}
                    alt={caseItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{caseItem.title}</h3>
                  <p className="text-gray-600 mb-4">{caseItem.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">通常価格:</span>
                      <span className="font-medium line-through">{caseItem.normalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">当社価格:</span>
                      <span className="font-bold text-blue-600">{caseItem.ourPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">開発期間:</span>
                      <span>{caseItem.period}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* お問い合わせセクション */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              お気軽にお問い合わせください
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-10">
              通常の1/10以下のコストで、貴社のDX推進やシステム開発をサポートします。
              詳しい資料のダウンロードや個別のご相談も承っております。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-center"
              >
                お問い合わせ
              </Link>
              {/* <Link 
                href="/documents" 
                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
              >
                資料ダウンロード
              </Link> */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}