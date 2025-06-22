// components/sections/TechStackSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TechStackSection() {
  const categories = [
    {
      name: "フロントエンド",
      technologies: [
        { name: "React", logo: "/tech/react.svg" },
        { name: "Next.js", logo: "/tech/nextjs.svg" },
        { name: "TypeScript", logo: "/tech/typescript.svg" },
        { name: "Tailwind CSS", logo: "/tech/tailwindcss.svg" },
        { name: "Framer Motion", logo: "/tech/framer.svg" },
        { name: "Vercel", logo: "/tech/vercel.svg" }
      ]
    },
    {
      name: "バックエンド",
      technologies: [
        { name: "Node.js", logo: "/tech/nodejs.svg" },
        { name: "Python", logo: "/tech/python.svg" },
        { name: "SQL", logo: "/tech/sql.svg" },
        { name: "Firebase", logo: "/tech/firebase.svg" },
        { name: "MongoDB", logo: "/tech/mongodb.svg" },
        { name: "AWS", logo: "/tech/aws.svg" }
      ]
    },
    {
      name: "デザイン",
      technologies: [
        { name: "Figma", logo: "/tech/figma.svg" },
        { name: "Clip Studio", logo: "/tech/clipstudio.png" },
        { name: "Procreate", logo: "/tech/Procreate-AppIcon.png" },
        { name: "Canva", logo: "/tech/canva.png" },
        { name: "Live2D Cubism", logo: "/tech/Live2D.png" },
        { name: "GIMP", logo: "/tech/gimp.png" }
      ]
    },
    {
      name: "Web3",
      technologies: [
        { name: "Solidity", logo: "/tech/solidity.svg" },
        { name: "Ethereum", logo: "/tech/ethereum.svg" },
        { name: "OpenZeppelin", logo: "/tech/openzeppelin.svg" },
        { name: "Web3.js", logo: "/tech/web3js.svg" },
        { name: "IPFS", logo: "/tech/ipfs.svg" },
        { name: "Smart Contracts", logo: "/tech/smartcontract.svg" }
      ]
    },
    {
      name: "AI技術",
      technologies: [
        { name: "生成AI", logo: "/tech/generative-ai.png" },
        { name: "アルゴリズム", logo: "/tech/algorithm.png" },
        { name: "データサイエンス", logo: "/tech/data-science.png" }
      ]
    },
    {
      name: "動画編集",
      technologies: [
        { name: "Final Cut Pro", logo: "/tech/finalcutpro.png" },
        { name: "DaVinci Resolve", logo: "/tech/davinci.png" },
        { name: "Filmora", logo: "/tech/filmora.png" }
      ]
    },
    {
      name: "3D・ゲーム開発",
      technologies: [
        { name: "Blender", logo: "/tech/blender.png" },
        { name: "Unity", logo: "/tech/unity.png" },
        { name: "Unreal Engine", logo: "/tech/unreal.png" }
      ]
    },
    {
      name: "メタバース",
      technologies: [
        { name: "cluster", logo: "/tech/cluster.png" },
        { name: "VRChat", logo: "/tech/vrchat.png" },
        { name: "The Sandbox", logo: "/tech/sandbox.jpg" }
      ]
    }
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">最先端の<span className="text-blue-400">技術スタック</span></h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            FIND to DOでは、業界で求められる最新の技術スタックを使用した開発を行っています。
            これらの技術を実践的に学び、実務レベルのスキルを身につけることができます。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={categoryIndex}
              variants={fadeInVariants}
              className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-3"
            >
              <h3 className="text-xl font-bold mb-3 text-center">{category.name}</h3>
              <div className={`grid ${category.technologies.length > 3 ? 'grid-cols-3' : category.technologies.length === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-gray-700 rounded-lg w-full aspect-square flex items-center justify-center mb-1">
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="w-4/5 h-4/5 object-contain"
                      />
                    </div>
                    <span className="text-xs text-center text-gray-300">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-300 mb-6">
            これらの技術は実務で高く評価されており、キャリアアップに直結するスキルセットです
          </p>
          {/* <a href="/tech-stack" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            技術スタック詳細を見る
          </a> */}
        </motion.div>
      </div>

      {/* グリッドレイアウトの調整 */}
      <style jsx>{`
        @media (min-width: 1024px) and (max-width: 1279px) {
          .grid-cols-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1280px) and (max-width: 1535px) {
          .grid-cols-4 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 1536px) {
          .grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
      `}</style>

      {/* フッター部分に帰属情報を追加 */}
      <div className="mt-12 text-xs text-gray-400 text-center">
        <p>使用しているロゴの一部はそれぞれの所有者に帰属します。各ロゴはイメージとして使用しており、商標権を侵害する意図はありません。</p>
      </div>
    </section>
  );
}