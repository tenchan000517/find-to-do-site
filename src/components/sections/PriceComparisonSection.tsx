'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PriceComparisonSection() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // ウィンドウサイズ検知用のエフェクト
  useEffect(() => {
    // クライアントサイドでのみ実行
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // 初期値設定
    setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // モバイル表示用に短縮されたラベル
  const getLabels = () => {
    if (windowWidth < 768) {
      return ['小規模DX', '中規模開発', '大規模DX'];
    }
    return ['小規模DXプロジェクト', '中規模システム開発', '大規模DX推進'];
  };

  // Chart data
  const chartData = {
    labels: getLabels(),
    datasets: [
      {
        label: '従来の外注価格',
        data: [225, 350, 750],
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
      {
        label: 'FIND to DOの価格',
        data: [20, 55, 140],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // レスポンシブなチャートオプション
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '費用（万円）',
        },
      },
      x: {
        ticks: {
          font: {
            size: windowWidth < 768 ? 10 : 12,
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw}万円`;
          }
        }
      },
      legend: {
        position: windowWidth < 768 ? 'bottom' as const : 'top' as const,
        labels: {
          boxWidth: windowWidth < 768 ? 10 : 40,
          font: {
            size: windowWidth < 768 ? 10 : 12,
          }
        }
      },
      title: {
        display: true,
        text: windowWidth < 768 ? 'FIND to DOの料金比較' : '従来の外注価格とFIND to DOの料金比較',
        font: {
          size: windowWidth < 768 ? 14 : 16,
        }
      },
    },
  };

  // モバイル表示時の適切な高さを計算
  const getChartHeight = () => {
    if (windowWidth < 640) return '300px';
    if (windowWidth < 768) return '350px';
    return '400px';
  };

  // 削減率を計算
  const calculateSavings = (original: number, discounted: number) => {
    return Math.round((original - discounted) / original * 100);
  };

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">「成果物への対価」で<span className="text-blue-600">1/10のコスト</span>を実現</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            教育投資ではなく、具体的な成果物（HP、システム、DX施策等）への正当な対価。
            プロメンター監修で従来外注と同等以上の品質を保証します。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 max-w-5xl mx-auto"
        >
          <div className="w-full" style={{ height: getChartHeight() }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
          
          {/* コスト削減メリットの強調表示 */}
          <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {[
              { category: "小規模DXプロジェクト", traditional: "150-300万円", findToDo: "10-30万円", savings: "大幅削減", value: "成果物 + 未来の人材接点" },
              { category: "中規模システム開発", traditional: "200-500万円", findToDo: "30-80万円", savings: "大幅削減", value: "ダブルメリット + 信頼関係構築" },
              { category: "大規模DX推進", traditional: "500-1000万円", findToDo: "80-200万円", savings: "大幅削減", value: "社会貢献 + 長期ブランド価値" }
            ].map((item, index) => (
              <div key={index} className="bg-blue-50 p-3 md:p-4 rounded-lg">
                <p className="text-base md:text-lg font-medium mb-2">{item.category}</p>
                <div className="space-y-1">
                  <p className="text-sm md:text-base text-gray-600">従来: {item.traditional}</p>
                  <p className="text-sm md:text-base text-blue-600 font-medium">FIND to DO: {item.findToDo}</p>
                  <p className="text-blue-600 font-bold text-base md:text-lg">{item.savings}</p>
                  <p className="text-sm md:text-base text-green-600 font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {[
            {
              title: '成果物への対価',
              description: '教育投資ではなく、具体的なHP・システム・DX施策など猫の手も借りたい業務への正当な対価のみ',
            },
            {
              title: 'ダブルメリット',
              description: '成果物の獲得 + 未来の優秀な人材との早期接点創造を同時実現',
            },
            {
              title: '品質担保',
              description: '学生作業 + プロメンター監修 = 従来外注と同等以上の高品質な成果物',
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-blue-700">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}