'use client';

import { useState } from 'react';

interface FormData {
  nameKanji: string;
  nameKana: string;
  university: string;
  faculty: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  lineRegistered: boolean;
  note: string;
}

interface EventApplicationFormProps {
  onSuccess: () => void;
}

export default function EventApplicationForm({ onSuccess }: EventApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nameKanji: '',
    nameKana: '',
    university: '',
    faculty: '',
    gender: '男性',
    email: '',
    phone: '',
    address: '',
    lineRegistered: false,
    note: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value || ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // デバッグ：送信データを確認
    console.log('送信データ:', {
      nameKanji: formData.nameKanji,
      nameKana: formData.nameKana,
      university: formData.university,
      faculty: formData.faculty,
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      lineRegistered: formData.lineRegistered ? '登録しました' : '',
      note: formData.note
    });
    
    // GoogleフォームのURL（formResponseに変更）
    const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSebAfU6grY_RpCR3ZVEPeSJBMzw7xQO8vunNW0BPg0ehLE3ag/formResponse';
    
    // フォームデータを作成
    const formDataToSend = new FormData();
    formDataToSend.append('entry.625662965', formData.nameKanji || '');
    formDataToSend.append('entry.1435081789', formData.nameKana || '');
    formDataToSend.append('entry.1734797656', formData.university || '');
    formDataToSend.append('entry.1356713871', formData.faculty || '');
    formDataToSend.append('entry.813084755', formData.gender || '');
    formDataToSend.append('entry.146551739', formData.email || '');
    formDataToSend.append('entry.843829010', formData.phone || '');
    formDataToSend.append('entry.1029401559', formData.address || '');
    formDataToSend.append('entry.2106029233', formData.lineRegistered ? '登録しました' : '');
    formDataToSend.append('entry.1209605415', formData.note || '');

    try {
      console.log('Googleフォームに送信中...');
      // Googleフォームに送信
      const response = await fetch(googleFormURL, {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors'
      });
      
      console.log('送信レスポンス:', response);
      
      // 成功時の処理
      onSuccess();
      
      // ページトップにスムーズスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // フォームをリセット
      setFormData({
        nameKanji: '',
        nameKana: '',
        university: '',
        faculty: '',
        gender: '男性',
        email: '',
        phone: '',
        address: '',
        lineRegistered: false,
        note: ''
      });
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。しばらく時間をおいて再度お試しください。');
    }
  };

  return (
    <div id="application-form" className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 氏名（漢字フルネーム） */}
            <div>
              <label htmlFor="nameKanji" className="block text-sm font-medium text-gray-700 mb-2">
                氏名（漢字フルネーム） <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nameKanji"
                name="nameKanji"
                required
                value={formData.nameKanji || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="山田 太郎"
              />
            </div>

            {/* 氏名（フリガナ） */}
            <div>
              <label htmlFor="nameKana" className="block text-sm font-medium text-gray-700 mb-2">
                氏名（フリガナ） <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nameKana"
                name="nameKana"
                required
                value={formData.nameKana || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ヤマダ タロウ"
              />
            </div>

            {/* 大学名 */}
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                大学名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="university"
                name="university"
                required
                value={formData.university || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="○○大学"
              />
            </div>

            {/* 学部・学科 */}
            <div>
              <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-2">
                学部・学科 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="faculty"
                name="faculty"
                required
                value={formData.faculty || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="経済学部 経済学科"
              />
            </div>

            {/* 性別 */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                性別 <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender || '男性'}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="男性">男性</option>
                <option value="女性">女性</option>
                <option value="">その他</option>
              </select>
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>

            {/* 電話番号 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                電話番号 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="090-0000-0000"
              />
            </div>

            {/* 現在お住まいの都道府県と市町村 */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                現在お住まいの都道府県と市町村 <span className="text-red-500">*</span>
                <div className="text-xs text-gray-500 mt-1">（例：愛知県名古屋市）</div>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="愛知県名古屋市"
              />
            </div>

            {/* LINE登録確認 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                アルファクルーズ様との共同イベントにつき、公式LINEへの登録をお願いいたします <span className="text-red-500">*</span>
              </label>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 mb-2">こちらの公式LINEにご登録ください：</p>
                <a 
                  href="https://lin.ee/KExdgTR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  https://lin.ee/KExdgTR
                </a>
              </div>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    name="lineRegistered"
                    checked={formData.lineRegistered}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2 rounded"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">登録しました</span>
                </label>
              </div>
            </div>

            {/* 質問・相談 */}
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                質問・相談がありましたらお書きください
              </label>
              <textarea
                id="note"
                name="note"
                rows={4}
                value={formData.note || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="ご質問やご相談があればお気軽にお書きください"
              />
            </div>

            {/* 送信ボタン */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bold py-4 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
              >
                申込を送信する
              </button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>個人情報は適切に管理し、イベント運営以外の目的では使用いたしません。</p>
            </div>
          </form>
      </div>
    </div>
  );
}