import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function DiscordLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <html lang="ja">
      <head>
        <title>Discord コミュニティ参加 | FIND to DO</title>
        <meta name="description" content="一生付き合える仲間と出会い、共に成長できる学生コミュニティ。初心者歓迎、今のあなたのままで大丈夫。" />
        <meta name="keywords" content="Discord,コミュニティ,学生,キャリア,成長,チャレンジ,FIND to DO" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Discord コミュニティ参加 | FIND to DO" />
        <meta property="og:description" content="一生付き合える仲間と出会い、共に成長できる学生コミュニティ。初心者歓迎、今のあなたのままで大丈夫。" />
        <meta property="og:type" content="website" />
      </head>
      <body className={`${inter.className} overflow-x-hidden w-full`}>
        <div className="w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}