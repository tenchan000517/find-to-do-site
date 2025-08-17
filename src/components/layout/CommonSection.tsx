'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Code, Briefcase } from 'lucide-react';
import { usePathname } from 'next/navigation';

type Service = {
    id: string;
    icon: React.ElementType;
    title: string;
    description: string;
    href: string;
    color: string;
};

const services: Service[] = [
    {
        id: 'webdev',
        icon: Code,
        title: 'WEBアプリ・DX支援',
        description: '通常の1/10以下のコストで高品質なWEB開発とDX推進を実現',
        href: '/service/webdev',
        color: 'blue'
    },
    {
        id: 'events',
        icon: Calendar,
        title: 'イベント制作',
        description: '学生と企業の意味ある出会いを創出する効果的なキャリアイベント',
        href: '/service/event',
        color: 'orange'
    },
    {
        id: 'intern',
        icon: Briefcase,
        title: 'インターン生紹介',
        description: '貴社に最適な人材を提供する採用にも直結する効果的なインターン制度',
        href: '/service/intern',
        color: 'green'
    },

];

export function CommonSection() {
    const pathname = usePathname();

    // discordページではコモンセクションを非表示
    if (pathname === '/discord') {
        return null;
    }
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
                    <span className="text-white">3つの主要サービスで</span>
                    <span className="text-cyan-400">価値を提供</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="h-full"
                        >
                            <Link href={service.href} className="block h-full">
                                <div className={`bg-white/90 backdrop-blur-sm rounded-lg p-8 md:p-10 h-full hover:transform hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center text-center md:min-h-[320px] border-t-4 border-${service.color}-500`}>
                                    <service.icon className={`w-8 h-8 md:w-12 md:h-12 mb-4 md:mb-6 text-${service.color}-600`} />
                                    <h3 className={`text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-${service.color}-800`}>
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        {service.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* 共通のCTA */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-4 bg-red-500 text-white text-3xl rounded-lg font-medium hover:bg-red-600 transition-colors text-center mx-2"
                    >
                        お問い合わせ
                    </Link>
                    {/* <Link 
            href="/documents" 
            className="inline-block px-8 py-4 bg-indigo-700 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors text-center mx-2"
          >
            資料ダウンロード
          </Link> */}
                </motion.div>
            </div>
        </section>
    );
}