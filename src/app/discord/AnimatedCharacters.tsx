'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type PositionProps = {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
};

export default function AnimatedCharacters() {
    const [randomOrder, setRandomOrder] = useState<number[]>([]);
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const order = [0, 1, 2, 3, 4];
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        setRandomOrder(order);
    }, []);

    // Native Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const characters = [
        { id: '1', imgSrc: '/characters/iida.png', alt: 'IIDA', rotate: 0, zIndex: 15 },
        { id: '2', imgSrc: '/characters/misaki_point.png', alt: 'MISAKI', rotate: 0, zIndex: 20 },
        { id: '3', imgSrc: '/characters/king.png', alt: 'KING', rotate: 0, zIndex: 10 },
        { id: '4', imgSrc: '/characters/kikuyo_point.png', alt: 'KIKUYO', rotate: 0, zIndex: 20 },
        { id: '5', imgSrc: '/characters/ten_point.png', alt: 'TEN', rotate: 0, zIndex: 10 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const characterVariants = {
        hidden: { 
            opacity: 0, 
            y: 50, 
            scale: 0.7 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: { 
                type: "spring",
                stiffness: 400,
                damping: 20,
                mass: 0.8,
                velocity: 3
            } 
        },
    };

    const desktopPositions: { [key: string]: PositionProps } = {
        '1': { top: '40%', left: '50%' },
        '2': { top: '55%', left: '20%' },
        '3': { top: '5%', right: '5%' },
        '4': { top: '55%', right: '20%' },
        '5': { top: '5%', left: '5%' },
    };

    const mobilePositions: { [key: string]: PositionProps } = {
        '1': { top: '35%', left: '50%' },
        '2': { top: '45%', left: '-1%' },
        '3': { top: '2%', right: '-1%' },
        '4': { top: '45%', right: '-1%' },
        '5': { top: '2%', left: '-1%' },
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-20 pointer-events-none">
            <motion.div
                className="absolute inset-0 w-full h-full"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >
                {randomOrder.length > 0 && randomOrder.map((index) => {
                    const character = characters[index];
                    return (
                        <motion.div
                            key={character.id}
                            className="absolute w-56 h-56 md:w-80 md:h-80"
                            custom={index}
                            variants={characterVariants}
                            style={{
                                ...(isMobile ? mobilePositions[character.id] : desktopPositions[character.id]),
                                zIndex: character.zIndex,
                                ...(character.id === '1' ? { 
                                    marginTop: isMobile ? '-112px' : '-160px',  // 高さの半分 (224px/2, 320px/2)
                                    marginLeft: isMobile ? '-112px' : '-160px'  // 幅の半分
                                } : {})
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: '100%',
                                ...(character.id === '2' || character.id === '3' || character.id === '4' || character.id === '5' ? { 
                                    transform: 'scale(0.95)'  // MISAKI、KING、KIKUYO、TENを5%小さく
                                } : {})
                            }}>
                                <Image
                                    src={character.imgSrc}
                                    alt={character.alt}
                                    fill
                                    className="object-contain drop-shadow-xl"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}