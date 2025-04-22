// app/page.tsx
'use client';

import { motion } from 'framer-motion';
import SplitHero from '@/components/sections/SplitHero';
import PriceComparisonSection from '@/components/sections/PriceComparisonSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ServicesSection from '@/components/sections/ServicesSection';
import QualityAssuranceSection from '@/components/sections/QualityAssuranceSection';
import { CommonSection } from '@/components/layout/CommonSection';

// 新しいコンポーネントのインポート
import { BusinessModel } from '@/components/sections/BusinessModel';
import { DiscordJoin } from '@/components/community/DiscordJoin';

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
        
        {/* 「インターン→メンター」の循環を説明する新セクション */}
        <BusinessModel />
        
        {/* 開発サービス紹介セクション（3サービスラインに更新） */}
        <ServicesSection />
        
        {/* 技術スタックセクション */}
        <TechStackSection />
        
        {/* Discord参加セクション（StudentJoinProcessSectionの代わり） */}
        {/* <DiscordJoin /> */}
        
        {/* 企業向け品質保証セクション */}
        <QualityAssuranceSection />

      </motion.div>
    </motion.div>
  );
}