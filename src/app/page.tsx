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
import StudentOpportunityHighlight from '@/components/sections/StudentOpportunityHighlight';
import EnterpriseValueHighlight from '@/components/sections/EnterpriseValueHighlight';
import EnterpriseRecruitmentRevolution from '@/components/sections/EnterpriseRecruitmentRevolution';

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
        {/* 採用パラダイムシフト説明セクション */}
        <EnterpriseRecruitmentRevolution />
        
        {/* 企業向け価値ハイライト - 独自価値の強調 */}
        <EnterpriseValueHighlight />
        
        {/* 企業向け価格比較セクション - 具体的コスト比較 */}
        <PriceComparisonSection />
        
        {/* 学生向け機会ハイライト - リアル体験・挑戦機会 */}
        <StudentOpportunityHighlight />
        
        {/* 「インターン→メンター」の循環を説明する新セクション - 社会的意義 */}
        <BusinessModel />
        
        {/* 開発サービス紹介セクション - 具体的な進め方 */}
        <ServicesSection />
        
        {/* 企業向け品質保証セクション - CTA・信頼性 */}
        <QualityAssuranceSection />
        
        {/* 技術スタックセクション */}
        <TechStackSection />

      </motion.div>
    </motion.div>
  );
}