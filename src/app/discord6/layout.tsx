// discord6専用レイアウト（ヘッダー非表示）
import { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { AnimatePresence } from 'framer-motion';

export default function Discord6Layout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* ヘッダーとBreadcrumbを非表示 */}
      <AnimatePresence mode="wait">
        <div key="page-content">
          <main className="min-h-screen w-full overflow-x-hidden">
            <div className="w-full overflow-x-hidden">
              {children}
            </div>
          </main>
        </div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}