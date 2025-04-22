'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, Code, CalendarDays, Users, CheckCircle, X } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

type Document = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  format: string;
  pages: number;
  thumbnail: string;
  category: 'business' | 'service' | 'case';
};

const documents: Document[] = [
  {
    id: 'business-model',
    icon: FileText,
    title: "FIND to DOビジネスモデル詳細資料",
    description: "「インターン→メンター」の成長パスを活用した独自のビジネスモデルについての詳細説明資料です。",
    format: "PDF",
    pages: 10,
    thumbnail: "/documents/business-model.jpg",
    category: 'business'
  },
  {
    id: 'cost-comparison',
    icon: FileText,
    title: "コスト削減効果詳細資料",
    description: "通常の開発費用と比較した場合のコスト削減効果について、具体的な数値とケーススタディを含む資料です。",
    format: "PDF",
    pages: 8,
    thumbnail: "/documents/cost-comparison.jpg",
    category: 'business'
  },
  {
    id: 'web-dev-service',
    icon: Code,
    title: "WEBアプリ・DX支援サービス詳細",
    description: "WEBアプリケーション開発やDX支援サービスの内容、プロセス、料金体系などを解説した資料です。",
    format: "PDF",
    pages: 12,
    thumbnail: "/documents/webdev-service.jpg",
    category: 'service'
  },
  {
    id: 'event-service',
    icon: CalendarDays,
    title: "イベント制作サービス詳細",
    description: "企業と学生のマッチングを促進するイベント制作サービスの詳細と成功事例を紹介した資料です。",
    format: "PDF",
    pages: 9,
    thumbnail: "/documents/event-service.jpg",
    category: 'service'
  },
  {
    id: 'intern-service',
    icon: Users,
    title: "インターン生紹介サービス詳細",
    description: "インターン生紹介の各プランと「学生広報員システム」についての詳細資料です。",
    format: "PDF",
    pages: 11,
    thumbnail: "/documents/intern-service.jpg",
    category: 'service'
  },
  {
    id: 'case-studies',
    icon: FileText,
    title: "導入事例集",
    description: "様々な業種・規模の企業における導入事例と具体的な成果を紹介した資料です。",
    format: "PDF",
    pages: 15,
    thumbnail: "/documents/case-studies.jpg",
    category: 'case'
  }
];

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
  });
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredDocuments = activeCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);

  const toggleDocumentSelection = (id: string) => {
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter(docId => docId !== id));
    } else {
      setSelectedDocs([...selectedDocs, id]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // ここで実際にはフォームデータを送信する処理を行う
    // API呼び出しなど
    
    // 送信完了後の処理（デモでは setTimeout で模擬）
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">資料ダウンロード</h1>
            <p className="text-xl mb-8">
              FIND to DOのサービスやビジネスモデルについての詳細資料をダウンロードいただけます。
              お気軽にご請求ください。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 資料一覧セクション */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">ダウンロード可能な資料一覧</h2>
            
            {/* カテゴリータブ */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['all', 'business', 'service', 'case'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category === 'all' ? 'すべて' : 
                   category === 'business' ? 'ビジネスモデル' : 
                   category === 'service' ? 'サービス詳細' : '導入事例'}
                </button>
              ))}
            </div>
            
            {/* 資料グリッド */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredDocuments.map((doc) => (
                <motion.div
                  key={doc.id}
                  variants={fadeInUp}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <div className="relative h-48">
                    <Image
                      src={doc.thumbnail}
                      alt={doc.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-lg font-bold">{doc.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-4 text-sm">{doc.description}</p>
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{doc.format} • {doc.pages}ページ</span>
                      <span>
                        {doc.category === 'business' ? 'ビジネスモデル' : 
                         doc.category === 'service' ? 'サービス詳細' : '導入事例'}
                      </span>
                    </div>
                    <div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedDocs.includes(doc.id)}
                          onChange={() => toggleDocumentSelection(doc.id)}
                        />
                        <span 
                          className={`w-5 h-5 mr-2 rounded border flex items-center justify-center ${
                            selectedDocs.includes(doc.id)
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedDocs.includes(doc.id) && <CheckCircle className="w-4 h-4 text-white" />}
                        </span>
                        <span>ダウンロードに追加</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 選択中の資料の表示 */}
          {selectedDocs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 p-6 rounded-lg mb-12 max-w-3xl mx-auto"
            >
              <h3 className="text-xl font-bold mb-4">選択中の資料（{selectedDocs.length}点）</h3>
              <div className="space-y-2 mb-4">
                {selectedDocs.map(id => {
                  const doc = documents.find(d => d.id === id);
                  return doc && (
                    <div key={id} className="flex justify-between items-center">
                      <span>{doc.title}</span>
                      <button 
                        onClick={() => toggleDocumentSelection(id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* お申し込みフォーム */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">資料ダウンロードお申し込み</h3>
            <p className="text-gray-600 mb-6 text-center">以下のフォームにご入力いただくと、選択いただいた資料のダウンロードリンクをメールでお送りいたします。</p>
            
            {showConfirmation ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">お申し込みありがとうございます</h4>
                <p className="text-gray-600 mb-6">
                  ご入力いただいたメールアドレス宛に、資料のダウンロードリンクをお送りしました。
                  もし数分経ってもメールが届かない場合は、お手数ですがお問い合わせください。
                </p>
                <Link 
                  href="/"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  トップページに戻る
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">お名前 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-gray-700 font-medium mb-2">会社名 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">メールアドレス <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">電話番号</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="interest" className="block text-gray-700 font-medium mb-2">ご興味のあるサービス <span className="text-red-500">*</span></label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">選択してください</option>
                    <option value="webdev">WEBアプリ・DX支援</option>
                    <option value="event">イベント制作</option>
                    <option value="intern">インターン生紹介</option>
                    <option value="multiple">複数のサービスに興味がある</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={selectedDocs.length === 0 || isSubmitting}
                    className={`px-8 py-3 rounded-lg font-medium ${
                      selectedDocs.length === 0 || isSubmitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        送信中...
                      </span>
                    ) : (
                      <>資料をダウンロードする</>
                    )}
                  </button>
                  {selectedDocs.length === 0 && (
                    <p className="mt-2 text-sm text-red-500">※ダウンロードする資料を1つ以上選択してください</p>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              詳しいご説明をご希望の方へ
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              資料だけでは伝わらない詳細や、貴社の課題に合わせたご提案をご希望の方は、
              お気軽にお問い合わせください。オンラインでの説明会も承っております。
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              お問い合わせ
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}