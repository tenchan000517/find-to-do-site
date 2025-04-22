'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import Image from 'next/image';

export default function Hero() {
    return (
        <motion.section
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="relative min-h-[600px] h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-800 text-white overflow-hidden"
        >
            {/* 背景画像 */}
            <Image
                src="/images/1.png"
                alt="Hero background"
                fill
                className="object-cover"
                priority
                quality={100}
            />
            
            {/* オーバーレイ（透明度を調整して画像の上に重ねる黒い層） */}
            <div className="absolute inset-0 bg-black opacity-50 z-[1]" />

            {/* コンテンツ部分（z-indexを上げて最前面に表示） */}
            <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
                {/* 既存のコンテンツはそのまま */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
                >
                    企業と学生をつなぐ
                    <br />
                    キャリアプラットフォーム
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
                >
                    採用・イベント・
                    <br className="sm:hidden" />
                    インターンシップを通じて、
                    <br />
                    企業の成長と学生の未来をサポートします
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-row justify-center items-center gap-3 sm:gap-4 px-4"
                >
                    <button className="bg-white text-blue-600 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
                        サービスを見る
                    </button>
                    <button className="bg-transparent border-2 border-white text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-white/10 transition-colors whitespace-nowrap">
                        お問い合わせ
                    </button>
                </motion.div>
            </div>

            {/* スクロールインジケーター */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white rounded-full p-1">
                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                        className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </motion.section>
    );
}