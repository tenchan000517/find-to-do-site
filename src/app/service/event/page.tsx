'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, Lightbulb, Play, Briefcase, Sparkles } from 'lucide-react';

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

type EventType = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const eventTypes: EventType[] = [
  {
    icon: Briefcase,
    title: "業界研究セミナー",
    description: "特定業界の最新動向や職種解説など、キャリア探索に役立つセミナー"
  },
  {
    icon: Lightbulb,
    title: "職種体験ワークショップ",
    description: "実際の業務を体験できる参加型ワークショップで職種理解を深める"
  },
  {
    icon: Users,
    title: "企業と学生の交流会",
    description: "カジュアルな雰囲気で企業と学生が対話できる交流イベント"
  },
  {
    icon: Calendar,
    title: "キャリア探索イベント",
    description: "多様な選択肢に触れる機会を提供する総合的なキャリアイベント"
  },
  {
    icon: Play,
    title: "模擬面接・ES対策会",
    description: "選考対策や就活スキルアップのための実践的なワークショップ"
  },
  {
    icon: Sparkles,
    title: "年末特別イベント",
    description: "1年の集大成として開催する大規模な総合キャリアイベント"
  }
];

const benefits = [
  {
    title: "採用ブランディング",
    description: "自社の魅力を学生に直接伝え、採用ブランディングを強化できます。",
  },
  {
    title: "優秀人材との接点",
    description: "積極的に参加する意欲の高い学生との接点を持つことができます。",
  },
  {
    title: "若者視点の獲得",
    description: "若い世代のニーズや考え方を直接聞ける貴重な機会となります。",
  },
  {
    title: "社会貢献活動",
    description: "次世代育成に貢献する社会的意義のある活動として発信できます。",
  },
  {
    title: "既存社員の成長",
    description: "登壇者として参加する社員のコミュニケーション能力向上につながります。",
  },
  {
    title: "低コスト高効果",
    description: "通常の採用広告よりも低コストで直接的な接点を創出できます。",
  }
];

const cases = [
  {
    title: "IT業界研究セミナー",
    description: "IT企業5社合同の業界研究セミナー。各社の特色や求める人材像を紹介。",
    participants: "大学生30名",
    results: "インターン応募15名、最終採用3名",
    image: "/cases/event1.jpg"
  },
  {
    title: "デザイン職種体験ワークショップ",
    description: "実際のクライアント課題に取り組むワークショップ。プロからのフィードバックあり。",
    participants: "デザイン専攻学生20名",
    results: "インターン応募12名、継続的な交流8名",
    image: "/cases/event2.jpg"
  },
  {
    title: "地元企業合同説明会",
    description: "地域の優良企業10社による合同説明会。UIターン就職希望者向け情報も提供。",
    participants: "大学3-4年生40名",
    results: "企業訪問22名、選考参加15名",
    image: "/cases/event3.jpg"
  }
];

export default function EventServicePage() {
  return (
    <div className="min-h-screen pt-0">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="w-full md:w-1/2 text-white mb-10 md:mb-0"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                イベント制作
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-orange-100">
                学生と企業の意味ある出会いを創出<br />
                効果的なキャリアイベントを低コストで
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="px-8 py-3 bg-white text-orange-600 text-2xl rounded-lg font-medium hover:bg-orange-50 transition-colors text-center"
                >
                  お問い合わせ
                </Link>
                {/* <Link 
                  href="/documents" 
                  className="px-8 py-3 bg-orange-700 text-white rounded-lg font-medium hover:bg-orange-800 transition-colors text-center"
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
                  src="/service/hero.png"
                  alt="イベント制作"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* イベント種類セクション */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">イベント種類</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              貴社のニーズや目的に合わせた多様なイベントをご提案いたします。
              すべてのイベントは学生インターン生が「ヤングボード」として企画から参加します。
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {eventTypes.map((event, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <event.icon className="w-8 h-8 text-orange-600" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* イベント制作プロセスセクション */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">イベント制作プロセス</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              企画から実施、振り返りまで、一貫したサポートを提供します
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* 接続線 */}
              <div className="absolute top-1/4 left-8 bottom-1/4 w-1 bg-orange-200 md:hidden"></div>
              <div className="absolute left-0 right-0 top-1/4 h-1 bg-orange-200 hidden md:block"></div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                {[
                  { number: 1, title: 'ヒアリング', description: '目的とターゲット設定' },
                  { number: 2, title: '企画立案', description: 'ヤングボードと共に企画' },
                  { number: 3, title: '告知集客', description: 'SNSなどでの広報活動' },
                  { number: 4, title: '準備', description: '資料や会場の準備' },
                  { number: 5, title: '当日運営', description: 'スムーズな進行管理' },
                  { number: 6, title: '振り返り', description: 'データ分析と改善提案' }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative z-10 flex md:flex-col items-start md:items-center"
                  >
                    <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mr-4 md:mr-0 md:mb-4 z-10">
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

      {/* ヤングボードセクション - 1カラムに変更 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ヤングボード制度</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              イベント企画にインターン生が「ヤングボード」として参加するユニークな制度です。
              学生視点を取り入れることで、より魅力的で効果的なイベントを実現します。
            </p>
            <div className="max-w-2xl mx-auto">
              <ul className="space-y-4 text-left">
                <li className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2">•</span>
                  <span>学生の生の声を企画段階から反映</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2">•</span>
                  <span>若者向けトレンドやコミュニケーション方法を活用</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2">•</span>
                  <span>SNSなどを通じた効果的な情報拡散</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2">•</span>
                  <span>イベント当日の運営サポート</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2">•</span>
                  <span>参加学生との心理的距離を縮める架け橋の役割</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 導入メリットセクション */}
      <section className="py-16 md:py-24 bg-gray-50">
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
              イベント制作を通じて得られる様々なメリット
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
                className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500"
              >
                <h3 className="text-xl font-bold mb-2 text-orange-800">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 導入事例セクション */}
      {/* <section className="py-16 md:py-24 bg-white">
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
              様々な企業様とのイベント共催実績がございます
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
                      <span className="text-gray-500">参加者:</span>
                      <span className="font-medium">{caseItem.participants}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">成果:</span>
                      <span className="font-medium">{caseItem.results}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* お問い合わせセクション */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-red-600 text-white">
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
              貴社の目的に合わせたイベント企画をご提案いたします。
              詳細はお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors text-center"
              >
                お問い合わせ
              </Link>
              {/* <Link 
                href="/documents" 
                className="px-8 py-4 bg-orange-700 text-white rounded-lg font-medium hover:bg-orange-800 transition-colors text-center"
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