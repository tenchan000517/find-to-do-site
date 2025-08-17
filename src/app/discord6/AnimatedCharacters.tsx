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
        { id: '1', imgSrc: '/hero/iida.png', alt: 'IIDA', rotate: 0 },
        { id: '2', imgSrc: '/hero/misaki.png', alt: 'MISAKI', rotate: 12 },
        { id: '3', imgSrc: '/hero/king.png', alt: 'KING', rotate: -10 },
        { id: '4', imgSrc: '/hero/kikuyo.png', alt: 'KIKUYO', rotate: 8 },
        { id: '5', imgSrc: '/hero/ten.png', alt: 'TEN', rotate: -12 },
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
        '1': { top: '15%', left: '10%' },
        '2': { top: '20%', right: '12%' },
        '3': { bottom: '25%', left: '8%' },
        '4': { bottom: '20%', right: '15%' },
        '5': { top: '40%', left: '25%', },
    };

    const mobilePositions: { [key: string]: PositionProps } = {
        '1': { top: '10%', left: '5%' },
        '2': { top: '15%', right: '5%' },
        '3': { bottom: '35%', left: '3%' },
        '4': { bottom: '30%', right: '8%' },
        '5': { top: '35%', left: '20%' },
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
                            className="absolute w-24 h-24 md:w-36 md:h-36"
                            custom={index}
                            variants={characterVariants}
                            style={isMobile ? mobilePositions[character.id] : desktopPositions[character.id]}
                        >
                            <div style={{
                                width: '100%',
                                height: '100%',
                                transform: `rotate(${character.rotate}deg)`
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