// components/sections/DiscordJoinSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Smartphone, Monitor } from 'lucide-react';

type JoinStep = {
    number: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
};

const mobileSteps: JoinStep[] = [
    {
        number: 1,
        title: "アプリのインストール",
        description: "App StoreまたはGoogle Playで「Discord」を検索して、アプリをダウンロードしてください。",
        icon: <Smartphone className="w-8 h-8 text-white" />
    },
    {
        number: 2,
        title: "QRコードをスキャン",
        description: "右のQRコードをスマートフォンのカメラでスキャンして、FIND to DOのDiscordサーバーに参加できます。",
    },
    {
        number: 3,
        title: "自己紹介しよう",
        description: "#自己紹介チャンネルで簡単な自己紹介をして、コミュニティの仲間と交流を始めましょう！",
    }
];

const pcSteps: JoinStep[] = [
    {
        number: 1,
        title: "Discordをインストール",
        description: "パソコンで「discord.com」にアクセスして、Discordアプリをダウンロードしてください。",
        icon: <Monitor className="w-8 h-8 text-white" />
    },
    {
        number: 2,
        title: "招待リンクを使う",
        description: "QRコードの下に表示されているURLをブラウザに入力してください。",
    },
    {
        number: 3,
        title: "サーバーに参加",
        description: "「サーバーに参加」ボタンをクリックして、#自己紹介チャンネルで自己紹介をしましょう！",
    }
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
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

export function DiscordJoin() {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">3ステップでコミュニティに参加</h2>
                    <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        FIND to DOのDiscordコミュニティに参加して、メンバーや企業との交流、案件情報、イベント情報を入手しましょう
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8 items-start">
                    {/* スマートフォンでの参加方法 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center justify-center gap-4 mb-8"
                        >
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                                <Smartphone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold">スマートフォンでの参加方法</h3>
                        </motion.div>

                        <div className="space-y-8">
                            {mobileSteps.map((step) => (
                                <motion.div
                                    key={step.number}
                                    variants={fadeInUp}
                                    className="flex gap-6"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            {step.number}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* パソコンでの参加方法 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center justify-center gap-4 mb-8"
                        >
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                                <Monitor className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold">パソコンでの参加方法</h3>
                        </motion.div>

                        <div className="space-y-8">
                            {pcSteps.map((step) => (
                                <motion.div
                                    key={step.number}
                                    variants={fadeInUp}
                                    className="flex gap-6"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            {step.number}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* QRコードとアプリダウンロードリンク */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-16 text-center"
                >
                    {/* アプリストアボタン */}
                    <div className="flex flex-row justify-center items-center gap-2 mb-8">
                        <a
                            href="https://apps.apple.com/app/discord-talk-chat-hang-out/id985746746"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <Image
                                src="/community/appstore.svg"
                                alt="App Storeからダウンロード"
                                width={135}
                                height={40}
                                className="h-20 w-auto"
                            />
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.discord"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <Image
                                src="/community/google.png"
                                alt="Google Playからダウンロード"
                                width={160}
                                height={40}
                                className="h-20 w-auto"
                            />
                        </a>
                    </div>


                    <div className="inline-block p-0 bg-white rounded-lg shadow-md">
                        <Image
                            src="images/qr-code.png"
                            alt="Discord QRコード"
                            width={200}
                            height={200}
                            className="mx-auto"
                        />
                    </div>
                    <div className="p-20">
                        <a
                            href="https://discord.gg/xQM6NgmwPk"
                            className="px-12 py-6 bg-orange-500 text-white rounded-lg text-2xl hover:bg-orange-600 transition-colors"
                            target="_blank" // 別タブで開く
                            rel="noopener noreferrer" // セキュリティのために追加
                        >
                            すぐに参加する
                        </a>
                    </div>
                    <p className="mt-4 text-gray-600">
                        スマホでQRコードをスキャンするか、上記のURLにアクセスしてください
                    </p>
                </motion.div>
            </div>
        </section>
    );
}