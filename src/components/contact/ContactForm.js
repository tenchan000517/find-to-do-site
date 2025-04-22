// components/ContactForm.js
'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    privacyConsent: false, // 個人情報保護方針への同意チェック
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.company.trim()) {
      newErrors.company = '会社名を入力してください';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '電話番号を入力してください';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください';
    }
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = '個人情報の取り扱いについて同意が必要です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // APIエンドポイントにPOSTリクエストを送信
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'general', // 一般的なお問い合わせタイプ
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
          company: formData.company,
          requirements: formData.message, // message→requirementsに変更
          privacyConsent: formData.privacyConsent
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'エラーが発生しました。');
      }
      
      setSubmitSuccess(true);
      setFormData({
        company: '',
        name: '',
        email: '',
        phone: '',
        message: '',
        privacyConsent: false
      });
    } catch (error) {
      setErrors({ submit: error.message || 'エラーが発生しました。しばらく経ってからお試しください。' });
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded">
          お問い合わせを受け付けました。担当者より連絡させていただきます。
        </div>
      )}
      
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{errors.submit}</span>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            会社名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            お問い合わせ内容 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="privacyConsent"
            checked={formData.privacyConsent}
            onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="privacyConsent" className="ml-2 block text-sm text-gray-700">
            <span className="text-red-500">*</span> 個人情報の<a href="/privacy" className="text-blue-600 hover:underline">取り扱いについて</a>に同意します
          </label>
          {errors.privacyConsent && (
            <p className="mt-1 ml-6 text-sm text-red-600">{errors.privacyConsent}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </button>
      </div>
    </form>
  );
}