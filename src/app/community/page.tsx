'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, Home, School, Coffee, Sparkles, Heart, 
  ArrowRight, Star, Target, Rocket, Award, Clock
} from 'lucide-react';
import { DESIGN_SYSTEM } from '@/styles/design-system';

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
      staggerChildren: 0.2
    }
  }
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50">
      {/* ヒーローセクション */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} relative overflow-hidden`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.student.headline.large} mb-6 text-slate-800`}
            >
              <span className="text-gray-500">『自分には何もない』</span>から、<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-500">
                『自分にはこれがある』へ
              </span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.student.subheading.medium} text-slate-600 mb-12`}
            >
              ここは、ありのままの自分でいられる第3の居場所。<br/>
              家でも学校でもない、あなたの可能性を見つける場所です。
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a
                href="https://discord.gg/xQM6NgmwPk"
                className={`${DESIGN_SYSTEM.buttons.student.primary} inline-flex items-center`}
                target="_blank"
                rel="noopener noreferrer"
              >
                コミュニティに参加
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* サードプレイス概念の説明 */}
      <section id="concept" className={`${DESIGN_SYSTEM.spacing.section.padding} bg-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.student.headline.medium} mb-6 text-slate-800`}
            >
              あなたには<span className="text-orange-500">第3の居場所</span>が必要です
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.student.body.large} text-slate-600 max-w-3xl mx-auto`}
            >
              家族の期待、学校の競争から離れて、等身大の自分でいられる場所。
              それがFIND to DOコミュニティです。
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Home,
                title: "家",
                subtitle: "家族の愛に包まれた安心の場",
                description: "「家族がいてくれるから安心」\n愛情あふれる安心できる場所。それに加えて",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                iconColor: "text-blue-600"
              },
              {
                icon: School,
                title: "学校",
                subtitle: "学びと成長の場",
                description: "「知識やスキルを身につけられる」\n学びと成長の場。それに加えて",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                iconColor: "text-green-600"
              },
              {
                icon: Coffee,
                title: "FIND to DO",
                subtitle: "ありのままの自分でいられる第3の居場所",
                description: "「今のあなたのままで大丈夫」\n失敗を恐れず、一緒に成長できる仲間がいる",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200",
                iconColor: "text-orange-600"
              }
            ].map((place, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`${place.bgColor} ${place.borderColor} border-2 rounded-xl p-8 text-center`}
              >
                <div className={`w-16 h-16 ${place.bgColor} ${place.iconColor} rounded-full flex items-center justify-center mx-auto mb-6 border-2 ${place.borderColor}`}>
                  <place.icon className="w-8 h-8" />
                </div>
                <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} mb-2 text-slate-800`}>
                  {place.title}
                </h3>
                <p className={`${DESIGN_SYSTEM.typography.student.body.small} ${place.iconColor} font-semibold mb-4`}>
                  {place.subtitle}
                </p>
                <p className={`${DESIGN_SYSTEM.typography.student.body.small} text-slate-600 leading-relaxed whitespace-pre-line`}>
                  {place.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3つの価値軸 */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-gradient-to-br from-orange-50 to-green-50`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.student.headline.medium} mb-6 text-slate-800`}
            >
              あなたの可能性を見つける<span className="text-orange-500">3つの価値</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Sparkles,
                title: "可能性の発見",
                description: "最初は誰でも初心者。ここで見つけた『得意』が、人生を変えるきっかけになる",
                color: "text-orange-600",
                bgColor: "bg-orange-100"
              },
              {
                icon: Users,
                title: "共に成長",
                description: "一人で頑張るより、みんなで挑戦する方が圧倒的に早く成長できる",
                color: "text-green-600",
                bgColor: "bg-green-100"
              },
              {
                icon: Rocket,
                title: "挑戦の加速",
                description: "個人の努力を、チームの力で何倍にも大きくできる場所",
                color: "text-blue-600",
                bgColor: "bg-blue-100"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 ${value.bgColor} ${value.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} mb-4 text-slate-800 text-center`}>
                  {value.title}
                </h3>
                <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-slate-600 leading-relaxed`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* インクルーシブメッセージ */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.student.headline.medium} mb-6 text-slate-800`}
            >
              <span className="text-orange-500">どんなあなたでも</span>歓迎します
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Heart,
                title: "本気じゃなくても大丈夫",
                description: "「とりあえず覗いてみる」から始まる人がほとんど。\n軽い気持ちで参加して、自分のペースで関わってください。"
              },
              {
                icon: Star,
                title: "経験がなくても大丈夫",
                description: "「何もできない」と思っている人こそ歓迎。\nみんなで一緒に「初めて」を体験するのが楽しいんです。"
              }
            ].map((message, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-orange-50 to-green-50 rounded-xl p-8 border border-orange-200"
              >
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <message.icon className="w-6 h-6" />
                </div>
                <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} mb-4 text-slate-800 text-center`}>
                  {message.title}
                </h3>
                <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-slate-600 leading-relaxed text-center whitespace-pre-line`}>
                  {message.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 成長ステージ */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-gradient-to-br from-blue-50 to-green-50`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.student.headline.medium} mb-6 text-slate-800`}
            >
              自分のペースで成長できる<span className="text-green-500">3つのステージ</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={`${DESIGN_SYSTEM.typography.student.body.large} text-slate-600 max-w-3xl mx-auto`}
            >
              無理をする必要はありません。今のあなたに合ったステージから始めて、
              自然と次のステップに進んでいけます。
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                stage: "発見フェーズ",
                subtitle: "誰でもOK",
                description: "様々な分野をつまみ食い体験。\n「これ面白いかも」という発見を大切に。",
                icon: Target,
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200"
              },
              {
                stage: "挑戦フェーズ",
                subtitle: "興味を持った人",
                description: "具体的なプロジェクトに参加。\n小さな成功体験を積み重ねていきます。",
                icon: Rocket,
                color: "text-green-600",
                bgColor: "bg-green-50",
                borderColor: "border-green-200"
              },
              {
                stage: "成長フェーズ",
                subtitle: "本気になった人",
                description: "企業の実課題に挑戦。\nチームリーダーとして後輩を支える側になります。",
                icon: Award,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200"
              }
            ].map((stage, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`bg-white rounded-xl p-8 border-2 ${stage.borderColor} hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-16 h-16 ${stage.bgColor} ${stage.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <stage.icon className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <h3 className={`${DESIGN_SYSTEM.typography.student.subheading.medium} mb-2 text-slate-800`}>
                    Stage {index + 1}
                  </h3>
                  <h4 className={`${DESIGN_SYSTEM.typography.student.subheading.small} mb-1 ${stage.color} font-bold`}>
                    {stage.stage}
                  </h4>
                  <p className={`${DESIGN_SYSTEM.typography.student.body.small} text-slate-500 mb-4`}>
                    （{stage.subtitle}）
                  </p>
                  <p className={`${DESIGN_SYSTEM.typography.student.body.medium} text-slate-600 leading-relaxed whitespace-pre-line`}>
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${DESIGN_SYSTEM.spacing.section.padding} bg-white`}>
        <div className={`${DESIGN_SYSTEM.spacing.container.maxWidth} ${DESIGN_SYSTEM.spacing.container.padding}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-r from-orange-500 to-green-500 rounded-2xl p-12 text-center max-w-4xl mx-auto shadow-xl"
          >
            <h3 className={`${DESIGN_SYSTEM.typography.student.headline.small} mb-4 text-white`}>
              一生付き合える仲間と出会いませんか？
            </h3>
            <p className={`${DESIGN_SYSTEM.typography.student.body.large} text-white/90 mb-8 max-w-2xl mx-auto`}>
              あなたの可能性を一緒に見つけて、個人の努力をチームの力で何倍にも大きくしませんか？
            </p>
            <div className="flex justify-center">
              <a
                href="https://discord.gg/xQM6NgmwPk"
                className="bg-white hover:bg-gray-100 text-orange-600 font-bold py-4 px-8 rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Users className="mr-2 w-5 h-5" />
                コミュニティに参加
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}