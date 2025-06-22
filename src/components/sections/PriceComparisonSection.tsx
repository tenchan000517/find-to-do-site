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
      return ['Web DX', 'Web3', 'モバイル', 'UI/UX'];
    }
    return ['WebアプリケーションDX', 'Web3開発', 'モバイルアプリ開発', 'UI/UXデザイン'];
  };

  // Chart data
  const chartData = {
    labels: getLabels(),
    datasets: [
      {
        label: '一般的な外注価格',
        data: [1000, 1500, 800, 500],
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
      {
        label: 'FIND to DOの価格',
        data: [100, 150, 80, 50],
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
        text: windowWidth < 768 ? 'FIND to DOの料金比較' : '一般的な外注価格とFIND to DOの料金比較',
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
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">開発コストを<span className="text-blue-600">最大90%削減</span></h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            通常のフリーランスや開発会社への外注より圧倒的なコストパフォーマンスを実現。
            プロの監修による高品質な成果物をお届けします。
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
          <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {chartData.labels.map((label, index) => (
              <div key={index} className="bg-blue-50 p-2 md:p-3 rounded-lg text-center">
                <p className="text-sm md:text-base font-medium">{label}</p>
                <p className="text-blue-600 font-bold text-lg md:text-xl">
                  {calculateSavings(chartData.datasets[0].data[index], chartData.datasets[1].data[index])}%削減
                </p>
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
              title: '高品質なサービス',
              description: 'プロフェッショナルメンターによる品質管理と監修で安心のクオリティ',
            },
            {
              title: '迅速な納品',
              description: '複数のインターン生による並行作業で効率的に開発を進行',
            },
            {
              title: '柔軟な対応',
              description: '要件の変更や追加にも柔軟に対応し、ご要望に沿った開発を実現',
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