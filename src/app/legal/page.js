'use client';

import { motion } from 'framer-motion';

export default function LegalPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6 md:p-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">特定商取引法に基づく表記</h1>
          
          <div className="space-y-6 text-sm md:text-base">
            <section className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-3 text-left align-top w-2/5 text-gray-700 font-semibold">事業者名</th>
                    <td className="py-3 text-gray-700">FIND to DO</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-3 text-left align-top w-2/5 text-gray-700 font-semibold">代表者</th>
                    <td className="py-3 text-gray-700">飯田 思遠</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-3 text-left align-top w-2/5 text-gray-700 font-semibold">所在地</th>
                    <td className="py-3 text-gray-700">〒466-0831 愛知県名古屋市昭和区花見通2-3-17</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-3 text-left align-top w-2/5 text-gray-700 font-semibold">連絡先</th>
                    <td className="py-3 text-gray-700">
                      <p>メールアドレス：info@find-to-do.com</p>
                      <p className="mt-1">※お問い合わせはメールでお願いいたします</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-3 text-left align-top w-2/5 text-gray-700 font-semibold">サービス料金</th>
                    <td className="py-3 text-gray-700">
                      <p>採用支援サービス：詳細はお問い合わせください</p>
                      <p className="mt-1">イベント企画：詳細はお問い合わせください</p>
                      <p className="mt-1">インターンシップマッチング：詳細はお問い合わせください</p>
                      <p className="mt-1">※価格は全て税込表示です</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-3 text-left align-top w-2/5 text-gray-700 font-semibold">支払方法</th>
                    <td className="py-3 text-gray-700">
                      <p>銀行振込</p>
                      <p className="mt-1">クレジットカード決済（VISA, Mastercard, JCB）</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-3 text-left align-top w-2/5 text-gray-700 font-semibold">支払時期</th>
                    <td className="py-3 text-gray-700">
                      <p>銀行振込：請求書発行後14日以内</p>
                      <p className="mt-1">クレジットカード決済：サービス申込時</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-3 text-left align-top w-2/5 text-gray-700 font-semibold">サービス提供時期</th>
                    <td className="py-3 text-gray-700">
                      <p>ご入金確認後、または別途契約に定めた日程にてサービスを提供いたします。</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-3 text-left align-top w-2/5 text-gray-700 font-semibold">返品・キャンセルについて</th>
                    <td className="py-3 text-gray-700">
                      <p>サービスの性質上、お申し込み後のキャンセルは原則としてお受けしておりません。</p>
                      <p className="mt-1">ただし、サービス提供開始前で、かつ当方が認めた場合に限り、キャンセル料（契約金額の30%）を頂いた上でキャンセルを承ることがあります。</p>
                      <p className="mt-1">詳細は契約時にご確認ください。</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-3 text-left align-top w-2/5 text-gray-700 font-semibold">動作環境</th>
                    <td className="py-3 text-gray-700">
                      <p>Webサービスをご利用いただくための推奨環境は以下の通りです。</p>
                      <p className="mt-1">【スマートフォン/タブレット】</p>
                      <ul className="list-disc pl-5 mt-1">
                        <li>iOS 14.0以降</li>
                        <li>Android 10.0以降</li>
                      </ul>
                      <p className="mt-1">【PC】</p>
                      <ul className="list-disc pl-5 mt-1">
                        <li>Windows 10以降 / macOS 10.15以降</li>
                        <li>Google Chrome 最新版</li>
                        <li>Firefox 最新版</li>
                        <li>Safari 最新版</li>
                        <li>Microsoft Edge 最新版</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}