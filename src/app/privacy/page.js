'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6 md:p-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">プライバシーポリシー</h1>
          
          <div className="space-y-6 text-gray-700 text-sm md:text-base">
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">1. 基本方針</h2>
              <p>
                FIND to DO（以下「当プロジェクト」）は、個人情報の重要性を認識し、個人情報の保護に関する法律、その他の関係法令を遵守するとともに、
                本プライバシーポリシーを遵守することにより、お客様の個人情報の適切な取扱いと保護に努めます。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">2. 個人情報の定義</h2>
              <p>
                本プライバシーポリシーにおいて「個人情報」とは、個人情報の保護に関する法律第2条第1項に定義される「個人情報」を指し、
                生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別できるもの、
                および他の情報と容易に照合することができ、それにより特定の個人を識別できるものをいいます。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">3. 個人情報の収集方法</h2>
              <p>
                当プロジェクトは、以下の方法により個人情報を取得します。
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>ウェブサイトからのお問い合わせやサービスへの申し込み</li>
                <li>メールによるお問い合わせ</li>
                <li>イベントやセミナーなどへの参加申し込み</li>
                <li>アンケートへの回答</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">4. 個人情報の利用目的</h2>
              <p>
                当プロジェクトは、取得した個人情報を以下の目的で利用します。
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>サービスの提供、維持、改善</li>
                <li>お問い合わせへの対応</li>
                <li>新サービスや更新情報のご案内</li>
                <li>イベントやセミナーなどのご案内</li>
                <li>アンケートやマーケティング調査の実施</li>
                <li>統計資料の作成</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">5. 個人情報の第三者提供</h2>
              <p>
                当プロジェクトは、法令に基づく場合を除いて、ご本人の同意なしに個人情報を第三者に提供することはありません。
                ただし、以下の場合は個人情報を提供することがあります。
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">6. 個人情報の安全管理</h2>
              <p>
                当プロジェクトは、個人情報の漏洩、滅失、毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">7. Cookieの使用について</h2>
              <p>
                当プロジェクトのウェブサイトでは、ユーザー体験の向上や利用状況の分析のためにCookieを使用しています。
                Cookieとは、ウェブサイトがお客様のコンピュータやモバイルデバイスに保存する小さなテキストファイルです。
                お客様はブラウザの設定でCookieの受け入れを拒否することができますが、その場合、当ウェブサイトの一部の機能が利用できなくなる可能性があります。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">8. アクセス解析ツールの使用</h2>
              <p>
                当プロジェクトのウェブサイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
                Googleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">9. 個人情報の開示・訂正・利用停止等</h2>
              <p>
                当プロジェクトは、お客様から個人情報の開示、訂正、追加、削除、利用停止、消去、第三者提供の停止の請求があった場合、
                本人確認の上、速やかに対応します。ただし、法令に基づき当プロジェクトが保有する個人情報を開示する義務を負わない場合は、
                お客様からの請求があった場合でも開示しないことがあります。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">10. プライバシーポリシーの変更</h2>
              <p>
                当プロジェクトは、必要に応じて本プライバシーポリシーを変更することがあります。
                変更後のプライバシーポリシーは、当ウェブサイトに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">11. お問い合わせ窓口</h2>
              <p>
                個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。
              </p>
              <div className="mt-2">
                <p className="font-medium">Find Todo</p>
                <p>代表者：飯田思遠</p>
                <p>〒466-0831 愛知県名古屋市昭和区花見通2-3-17</p>
                <p>メールアドレス：info@findtodo.jp（仮）</p>
              </div>
            </section>

            <section>
              <p className="text-right text-sm text-gray-600">制定日：2025年4月1日</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}