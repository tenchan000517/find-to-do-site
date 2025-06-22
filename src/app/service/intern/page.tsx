'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Users, ListChecks, Medal, BarChart, Clock, Search, MessageSquare, Shield, UserPlus, Trophy, Check } from 'lucide-react';

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

type PlanType = {
  icon: React.ElementType;
  title: string;
  description: string;
  price: string;
  features: string[];
  color: string;
};

const plans = [
  {
    id: 'plan-listing',
    title: '掲載型',
    price: '800,000',
    priceUnit: '年額',
    icon: UserPlus,
    color: 'purple',
    features: [
      '専用企業ページの作成',
      'フォロー機能の利用',
      'メッセージ機能の利用',
      '内定・就職採用時の追加料金なし',
      'インターン採用時の追加料金なし',
    ],
    note: '競合比 100万～200万'
  },
  {
    id: 'plan-monthly',
    title: '月額制',
    price: '20,000',
    priceUnit: '月額',
    icon: Shield,
    color: 'blue',
    features: [
      'インターンが働いた月のみ料金が発生',
      '早期退職などのリスクがない',
      'インターン採用まで料金発生なし',
      '内定・就職採用時の追加料金なし',
      'インターン採用時の追加料金なし'
    ],
    note: '全く新しいプラン'
  },
  {
    id: 'plan-performance',
    title: '成果報酬型',
    price: '80,000',
    priceUnit: '採用時',
    icon: Trophy,
    color: 'green',
    features: [
      'インターン採用まで料金発生なし',
      '内定・就職採用時の追加料金なし'
    ],
    note: '競合比 10万～25万'
  }
];

const studentPRSystem = [
  {
    title: "実体験に基づく情報発信",
    description: "インターン生が実際に企業で体験した内容を自分の言葉でSNSなどに発信します。",
  },
  {
    title: "若者視点でのコンテンツ作成",
    description: "企業の魅力を同年代に響くような表現で伝えるコンテンツを作成します。",
  },
  {
    title: "社内の雰囲気を可視化",
    description: "外からは見えにくい社内の雰囲気や働き方を生き生きと伝えます。",
  },
  {
    title: "多様なチャネルでの発信",
    description: "Instagram、TikTok、Twitterなど若者に人気のプラットフォームで拡散します。",
  },
  {
    title: "同世代へのリーチ",
    description: "インターン生の友人・知人ネットワークを通じて自然な拡散が期待できます。",
  },
  {
    title: "共感を呼ぶストーリーテリング",
    description: "数値だけでは伝わらない企業の魅力をストーリーとして紹介します。",
  }
];

const benefits = [
  {
    title: "採用コスト削減",
    description: "採用広告費を大幅に削減しながら、質の高い採用活動が可能になります。",
  },
  {
    title: "ミスマッチ防止",
    description: "事前の相互理解を深めることで、入社後のミスマッチによる早期離職を防止します。",
  },
  {
    title: "社内活性化",
    description: "若い感性や新しい視点が入ることで、社内の活性化につながります。",
  },
  {
    title: "戦力化までの期間短縮",
    description: "インターン期間中に社風や業務を理解するため、入社後の立ち上がりが早くなります。",
  },
  {
    title: "企業ブランディング",
    description: "学生広報員が若者目線で企業の魅力を発信し、採用ブランディングを強化します。",
  },
  {
    title: "社会貢献",
    description: "次世代の育成に貢献する社会的意義のある活動として評価されます。",
  }
];

const cases = [
  {
    title: "IT企業のインターン紹介",
    description: "プログラミングスキルを持つ学生を短期インターンシップで受け入れ、実際のプロジェクトに参加してもらいました。",
    result: "インターン生10名中3名が新卒入社、うち2名が学生広報員として活躍",
    image: "/cases/intern1.jpg"
  },
  {
    title: "中小製造業の広報インターン",
    description: "地元の製造業の魅力を若者に伝えるためのSNS運用を担当するインターン生を紹介。企業の隠れた魅力を発掘しました。",
    result: "SNS閲覧数が3倍に増加、新卒応募者が前年比40%増加",
    image: "/cases/intern2.jpg"
  },
  {
    title: "ベンチャー企業の長期インターン",
    description: "新規事業の立ち上げに参加する長期インターン生を紹介。企画から実行までを担当し、責任ある仕事を経験してもらいました。",
    result: "インターン中に新規事業の売上に貢献、卒業後に正社員として入社",
    image: "/cases/intern3.jpg"
  }
];

export default function InternServicePage() {
  return (
    <div className="min-h-screen pt-0">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="w-full md:w-1/2 text-white mb-10 md:mb-0"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                インターン生紹介
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                貴社に最適な人材を<br />
                採用にも直結する効果的なインターン制度
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white text-green-700 text-2xl rounded-lg font-medium hover:bg-green-50 transition-colors text-center"
                >
                  お問い合わせ
                </Link>
                {/* <Link 
                  href="/documents" 
                  className="px-8 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition-colors text-center"
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
                  src="/service/1.png"
                  alt="インターン生紹介"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* プランセクション */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">安心の3つの料金体系</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              お客様のニーズに合わせて最適なプランをお選びいただけます。
              複数のプランを組み合わせることで、より効果的なインターン採用が可能です。
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className={`bg-${plan.color}-500 p-6 text-white text-center`}>
                  <plan.icon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                </div>

                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-lg text-gray-500 mb-2">{plan.priceUnit}</div>
                    <div className="flex items-end justify-center">
                      <span className="text-4xl font-bold">¥{plan.price}</span>
                      <span className="text-gray-500 ml-1">円</span>
                    </div>
                    {plan.note && (
                      <div className="text-lg text-gray-500 mt-2">{plan.note}</div>
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="space-y-4 w-full">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2">
                          <Check className={`w-5 h-5 text-${plan.color}-500 flex-shrink-0`} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 学生広報員システムセクション */}
      {/* <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">学生広報員システム</h2>
              <p className="text-lg text-gray-700 mb-6">
                インターン生が企業の「ファン」として活動する新しい広報モデル。
                採用に直結しなくても企業価値向上に貢献し、若者視点で企業の魅力を発信します。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {studentPRSystem.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-green-700 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-full lg:w-1/2"
            >
              <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/services/student-pr.jpg"
                  alt="学生広報員"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">学生ならではの視点で企業の魅力を発信</h3>
                    <p>同世代の興味関心を熟知した学生がSNSで情報発信</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}


      {/* 学生広報員システムセクション - 1カラムに変更 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">学生広報員システム</h2>
            <p className="text-lg text-gray-700 mb-10 text-center max-w-3xl mx-auto">
              インターン生が企業の「ファン」として活動する新しい広報モデル。
              採用に直結しなくても企業価値向上に貢献し、若者視点で企業の魅力を発信します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentPRSystem.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-xl text-green-700 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* マッチングプロセスセクション */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">マッチングプロセス</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              企業と学生の双方にとって最適なマッチングを実現するための丁寧なプロセス
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* 接続線 */}
              <div className="absolute top-1/4 left-8 bottom-1/4 w-1 bg-green-200 md:hidden"></div>
              <div className="absolute left-0 right-0 top-1/4 h-1 bg-green-200 hidden md:block"></div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {[
                  { number: 1, title: '企業ヒアリング', description: '求める人材像や業務内容を詳細に把握' },
                  { number: 2, title: '学生選考', description: 'スキルや適性を考慮した候補者選定' },
                  { number: 3, title: '相互面談', description: '期待値のすり合わせと相互理解' },
                  { number: 4, title: 'マッチング成立', description: '双方の合意によるマッチング' },
                  { number: 5, title: 'フォローアップ', description: 'インターン開始後の定期的な支援' }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative z-10 flex md:flex-col items-start md:items-center"
                  >
                    <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mr-4 md:mr-0 md:mb-4 z-10">
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
              インターン生紹介サービスがもたらす様々なメリット
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
                className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500"
              >
                <h3 className="text-xl font-bold mb-2 text-green-800">{benefit.title}</h3>
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
              インターン生紹介によって企業価値向上に貢献した事例をご紹介します
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
                  <div className="bg-green-100 p-3 rounded-lg">
                    <h4 className="font-bold text-green-800 text-sm mb-1">成果</h4>
                    <p className="text-sm text-gray-700">{caseItem.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* お問い合わせセクション */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-teal-600 text-white">
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
              貴社に最適なインターン採用プランをご提案いたします。
              学生広報員システムの詳細についてもお気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors text-center"
              >
                お問い合わせ
              </Link>
              {/* <Link 
                href="/documents" 
                className="px-8 py-4 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition-colors text-center border border-white"
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