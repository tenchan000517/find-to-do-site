// components/layout/PageWrapper.js
'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { CommonSection } from '@/components/layout/CommonSection'; // Fixed import

export default function PageWrapper({ children }) {
  const pathname = usePathname();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
      {pathname !== '/' && <CommonSection />}
    </motion.div>
  );
}