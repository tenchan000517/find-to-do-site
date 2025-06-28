// app/page.tsx
'use client';

import { motion } from 'framer-motion';
import SplitHero from '@/components/sections/SplitHero';
import PriceComparisonSection from '@/components/sections/PriceComparisonSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ServicesSection from '@/components/sections/ServicesSection';
import QualityAssuranceSection from '@/components/sections/QualityAssuranceSection';
// 新しいコンポーネントのインポート
import { BusinessModel } from '@/components/sections/BusinessModel';
import StudentOpportunityHighlight from '@/components/sections/StudentOpportunityHighlight';
import EnterpriseValueHighlight from '@/components/sections/EnterpriseValueHighlight';
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
        {/* === 企業様向けセクション群 === */}
        
        {/* 2. 共感セクション - 企業の悩みに共感 */}
        <EmpathySection />
        
        {/* 3. 価値発見セクション - 一石二鳥の価値 */}
        <ValueDiscoverySection />
        
        {/* 4. パイプライン価値セクション - 成果物＋人材パイプライン */}
        <PipelineValueSection />
        
        {/* 5. 企業向け価値ハイライト - 総合的な価値提案 */}
        <EnterpriseValueHighlight />
        
        {/* セクション区切り */}
        <div className="py-8 bg-gradient-to-r from-slate-100 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto"></div>
          </div>
        </div>
        
        {/* === 学生の方向けセクション群 === */}
        
        {/* 6. 学生価値セクション - 3つの価値軸 */}
        <StudentOpportunityHighlight />
        
        {/* 7. エコシステム説明 - コミュニティと循環システム */}
        <BusinessModel />
        
        {/* 従来のセクション（必要に応じて） */}
        <ServicesSection />
        <QualityAssuranceSection />
        <TechStackSection />

      </motion.div>
    </motion.div>
  );
}