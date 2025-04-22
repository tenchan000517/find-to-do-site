// app/page.tsx
'use client';

import { motion } from 'framer-motion';
import SplitHero from '@/components/sections/SplitHero';
import PriceComparisonSection from '@/components/sections/PriceComparisonSection';
import GrowthPathSection from '@/components/sections/GrowthPathSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StudentJoinProcessSection from '@/components/sections/StudentJoinProcessSection';
import QualityAssuranceSection from '@/components/sections/QualityAssuranceSection';
import { CommonSection } from '@/components/layout/CommonSection';

import { fadeInUp, staggerContainer } from '@/utils/animations';

export default function Home() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={staggerContainer}
      className="w-full overflow-x-hidden"
    >
      {/* ヒーローセクション - 分割デザイン */}
      <SplitHero />

      {/* メインコンテンツ */}
      <motion.div 
        variants={fadeInUp} 
        className="w-full"
      >
        {/* 企業向け価格比較セクション */}
        <PriceComparisonSection />
        
        {/* 開発サービス紹介セクション */}
        <ServicesSection />
        
        {/* 技術スタックセクション */}
        <TechStackSection />
        
        {/* 学生向け参加プロセスセクション */}
        <StudentJoinProcessSection />

                
        {/* 学生向け成長パスセクション */}
        <GrowthPathSection />
        
        {/* 企業向け品質保証セクション */}
        <QualityAssuranceSection />
      </motion.div>
    </motion.div>
  );
}