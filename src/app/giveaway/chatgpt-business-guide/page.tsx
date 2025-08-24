'use client';

import { useState } from 'react';
import { Copy, Check, ChevronDown, Search } from 'lucide-react';
import { promptData } from './data';


export default function ChatGPTBusinessGuide() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // カテゴリ一覧を取得
  const categories = ["all", ...Array.from(new Set(promptData.map(p => p.category)))];

  // フィルタリング
  const filteredPrompts = promptData.filter(prompt => {
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // コピー機能
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ChatGPT仕事術マスター大全<span className="hidden sm:inline">2025</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Instagram限定配布 - 生産性3倍化プロンプト集
              </p>
            </div>
            <div className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              70プロンプト収録
            </div>
          </div>
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 検索ボックス */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="プロンプトを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* カテゴリフィルター */}
            <div>
              {/* PC表示: 横スクロールタブ */}
              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <div className="flex gap-2 min-w-max">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                          selectedCategory === category
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category === "all" ? "すべて" : category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* スマホ表示: ドロップダウン */}
              <div className="md:hidden">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">📋 すべてのカテゴリ</option>
                  {categories.filter(c => c !== "all").map(category => (
                    <option key={category} value={category}>
                      {category === "文書作成・ライティング" ? "📝 文書作成・ライティング" :
                       category === "データ分析・Excel効率化" ? "📊 データ分析・Excel効率化" :
                       category === "コミュニケーション最適化" ? "💬 コミュニケーション最適化" :
                       category === "企画・戦略立案支援" ? "🎯 企画・戦略立案支援" :
                       category === "学習・スキルアップ加速" ? "🚀 学習・スキルアップ加速" :
                       category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* プロンプト一覧 */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid gap-4">
          {filteredPrompts.map((prompt) => (
            <div key={prompt.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 md:p-6">
                {/* ヘッダー部分 - カード全体クリック可能 */}
                <div 
                  className="flex items-start justify-between mb-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === prompt.id ? null : prompt.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">
                        {prompt.category}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 leading-tight">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {prompt.description}
                    </p>
                  </div>
                  <div className="ml-2 md:ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      expandedId === prompt.id ? 'transform rotate-180' : ''
                    }`} />
                  </div>
                </div>

                {/* プロンプト本文（展開時） - アニメーション付き */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedId === prompt.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                    {/* プロンプト */}
                    <div className="relative">
                      <div className="bg-gray-50 rounded-lg p-3 md:p-4 font-mono text-sm overflow-x-auto">
                        <pre className="whitespace-pre-wrap text-gray-700 break-words">
                          {prompt.prompt}
                        </pre>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(prompt.prompt, prompt.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 md:p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                        title="プロンプトをコピー"
                      >
                        {copiedId === prompt.id ? (
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                        )}
                      </button>
                    </div>

                    {/* 使用場面とコピーボタン */}
                    <div className="space-y-3">
                      {/* 使用場面 */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                        <span className="font-medium text-gray-700 whitespace-nowrap">使用場面:</span>
                        <span className="text-gray-600">{prompt.useCase}</span>
                      </div>
                      
                      {/* プロンプトコピーボタン */}
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(prompt.prompt, prompt.id + '-expanded');
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          {copiedId === prompt.id + '-expanded' ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>コピー完了！</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>プロンプトをコピー</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* クイックコピーボタン（折りたたみ時） */}
                {expandedId !== prompt.id && (
                  <div className="mt-4 space-y-3">
                    {/* 使用場面 */}
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 space-y-2">
                      <div className="flex items-center gap-1.5 text-blue-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        <span className="font-semibold text-sm">活用シーン</span>
                      </div>
                      <div className="text-sm text-gray-700 font-medium pl-5">
                        {prompt.useCase}
                      </div>
                    </div>
                    
                    {/* コピーボタン */}
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(prompt.prompt, prompt.id + '-quick');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        {copiedId === prompt.id + '-quick' ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>コピー完了！</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>プロンプトをコピー</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 結果が0件の場合 */}
        {filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">該当するプロンプトが見つかりませんでした</p>
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              このプロンプト集を活用して、月20時間の業務時間を削減しましょう！
            </p>
            <p className="text-xs text-gray-500">
              © 2025 FIND to DO - Instagram限定配布コンテンツ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}