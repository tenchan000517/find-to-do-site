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
import EmpathySection from '@/components/sections/EmpathySection';
import ValueDiscoverySection from '@/components/sections/ValueDiscoverySection';
import PipelineValueSection from '@/components/sections/PipelineValueSection';

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

      {/* メインコンテンツ - 新しい最適化された情報フロー */}
      <motion.div 
        variants={fadeInUp} 
        className="w-full"
      >
        {/* 2. 共感セクション - 企業の悩みに共感 */}
        <EmpathySection />
        
        {/* 3. 価値発見セクション - 一石二鳥の価値 */}
        <ValueDiscoverySection />
        
        {/* 4. パイプライン価値セクション - 90%成功率 */}
        <PipelineValueSection />
        
        {/* 5. 学生価値セクション - 3つの価値軸 */}
        <StudentOpportunityHighlight />
        
        {/* 6. エコシステム説明 - 循環システム */}
        <BusinessModel />
        
        {/* 7. 企業向け価値ハイライト - 総合的な価値提案 */}
        <EnterpriseValueHighlight />
        
        {/* 従来のセクション（必要に応じて） */}
        <ServicesSection />
        <QualityAssuranceSection />
        <TechStackSection />

      </motion.div>
    </motion.div>
  );
}