// src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';

// カテゴリを直接定義
const CATEGORIES = [
    'プログラミング',
    'ウェブ開発',
    'AI技術',
    'キャリア',
    'ビジネス',
  ];

export default function AdminPage() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  // カテゴリが変更されたらトピックを取得
  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch(`/api/topics?category=${encodeURIComponent(category)}`);
        const data = await response.json();
        
        if (data.success) {
          setTopics(data.topics);
          setSelectedTopic(data.topics[0] || '');
        }
      } catch (error) {
        console.error('トピック取得エラー:', error);
      }
    }
    
    fetchTopics();
  }, [category]);

  // 記事生成
  async function handleGenerate() {
    if (!selectedTopic) return;
    
    setIsGenerating(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/admin/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: selectedTopic,
          category: category,
        }),
      });
      
      const data = await response.json();
      
      setResult({
        success: data.success,
        message: data.success 
          ? `記事「${data.title}」を生成しました！` 
          : `エラー: ${data.error}`,
      });
    } catch (error) {
      setResult({
        success: false,
        message: '記事生成中にエラーが発生しました',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">ブログ記事生成管理</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">カテゴリ</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded p-2"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-2 font-medium">トピック</label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full border rounded p-2"
            disabled={topics.length === 0}
          >
            {topics.length === 0 ? (
              <option>トピックがありません</option>
            ) : (
              topics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))
            )}
          </select>
        </div>
        
        <div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !selectedTopic}
            className="bg-blue-600 text-white px-4 py-2 rounded 
                      hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isGenerating ? '生成中...' : '記事を生成'}
          </button>
        </div>
        
        {result && (
          <div className={`p-4 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
            {result.message}
          </div>
        )}
      </div>
    </div>
  );
}