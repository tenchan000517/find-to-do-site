'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedCharacters from './AnimatedCharacters';
import { DiscordFooter } from '@/components/layout/DiscordFooter';
import { MessageCircle, Users, Calendar, BookOpen, ChevronDown } from 'lucide-react';

export default function DiscordPage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(2); // 初期位置を2に変更（真の最初のスライド）
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [openFaqItems, setOpenFaqItems] = useState<number[]>([]);
  const [currentEditorialSlide, setCurrentEditorialSlide] = useState(2); // 初期位置を2に設定（真の最初のスライド）
  const [editorialTouchStart, setEditorialTouchStart] = useState(0);
  const [editorialTouchEnd, setEditorialTouchEnd] = useState(0);
  const [isEditorialTransitioning, setIsEditorialTransitioning] = useState(false);
  
  const storyContent = [
    {
      title: "人の夢と希望のブースターになる",
      content: "技術的なことはAIに聞けばわかる。\n\nでも実際に仕事をするとなると、クライアントとのやり取りや細かい対応、社内での仕事の進め方は教材では学べない。\n\n一人でやるしかないけど、正解がわからないから不安になり一歩目を踏み出せない。\n\nこの「不安を抱えたまま、わからないままでは挑戦できない」という現状を変えるためにアウトプットしながら学べるコミュニティを作りました。"
    },
    {
      title: "挑戦と発見の循環を、共に創る",
      content: "一人だと「失敗したらどうしよう」と不安になって挑戦できない。\n\nでも実践しながら、アウトプットしながら学べる環境があれば違う。\n\n失敗してもフォローしてくれる人がいる、相談できる人がいる、わからない時に聞ける人がいる場所があれば、自然と「やってみよう」と思える。\n\nこの挑戦しやすい環境を創ることが私たちの使命です。"
    },
    {
      title: "好きから自信につながる4ステップ",
      content: "これからの時代、情報はどこにでもある。\n\n講座や教材は情報をフォーマット通りに一方向に提供するだけで、「自分に合った」学習方法とは限らない。\n\n「何を学ぶか」ではなく「誰から学ぶか」\n\nコミュニティなら信頼できる人たちと一緒にあなたの状況に合わせて学んでいける。\n\n新しい時代に必要なのは、誰を信じるか、誰と一緒に歩いていくかです。"
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "参加に費用はかかりますか？",
      answer: "いいえ、完全無料です。FIND to DOは講座ではなく、あなたのサードプレイスになりたいコミュニティです。",
      bgClass: "from-blue-50 to-blue-100"
    },
    {
      question: "ZERO to ONEサポートってなんですか？",
      answer: "FIND to DOの母体となるDiscordコミュニティです。FIND to DOはZERO to ONEサポート内のプロジェクトの一つで、ここから様々な学習・成長支援が提供されています。",
      bgClass: "from-indigo-50 to-indigo-100"
    },
    {
      question: "オンラインでの交流手段はなんですか？",
      answer: "Discordというオンラインコミュニティ運営に特化したチャットアプリを利用しています。",
      bgClass: "from-green-50 to-green-100"
    },
    {
      question: "初心者でも大丈夫ですか？",
      answer: "もちろんです。Discordの使い方から仕事の進め方まで、先輩メンバーが丁寧にサポートします。",
      bgClass: "from-orange-50 to-orange-100"
    },
    {
      question: "毎日参加しないといけませんか？",
      answer: "いいえ、自由です。気が向いた時だけ、週1回だけでも価値があります。自分のペースで大丈夫です。",
      bgClass: "from-purple-50 to-purple-100"
    },
    {
      question: "どんな仕事ができますか？",
      answer: "ライティング、デザイン、データ分析、企画など様々。あなたの興味に合わせて、未経験からでもサポートします。",
      bgClass: "from-pink-50 to-pink-100"
    },
    {
      question: "参加に資格や条件はありますか？",
      answer: "ありません。誰でも歓迎です。学生も社会人も、年齢も経験も一切関係ありません。",
      bgClass: "from-yellow-50 to-yellow-100"
    },
    {
      question: "匿名でも参加できますか？",
      answer: "はい。匿名でも参加できます。プロフィールに関してはご自身が心地よく参加できる範囲の共有で大丈夫です。",
      bgClass: "from-gray-50 to-gray-100"
    },
    {
      question: "自分が入ってもいいのかわかりません",
      answer: "どんな人でも大歓迎です。コミュニティメンバーを大切に思ってくれる人であれば誰1人として参加してはいけない人はいません。安心してご参加ください。",
      bgClass: "from-orange-50 to-orange-100"
    }
  ];

  // Editorial team data
  const editorialMembers = ['iida', 'misaki', 'king', 'kikuyo', 'ten'];

  // Editorial members content with background styles
  const editorialMembersData = [
    {
      name: 'IIDA',
      role: 'CEO',
      content: '「どうして人は自分の可能性を諦めてしまうんだろう」という疑問を幼少期から抱き続けている青年。\n\n真面目すぎてエンタメ知識ゼロだが、人の可能性を本気で信じている。\n\nこの社会の仕組みが人を諦めさせてしまうことに怒りを感じ、一人ひとりが自分の可能性を信じられる世界を作ろうとしている。',
      bgGradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)'
    },
    {
      name: 'MISAKI',
      role: 'CMO',
      content: '「楽しくなければ仕事じゃない」と信じてEC部門を作ったのに、社員がどんどん辞めていく現実に直面した。\n\n自分が作った環境でも人を幸せにできなかった罪悪感から、今度こそ人が本当に輝ける場所を作りたいと考えている。\n\n母となった今、次の世代のためにも人が心から「自分らしくいられる場所」作りに本気で取り組んでいる。',
      bgGradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)'
    },
    {
      name: 'KING',
      role: 'COO',
      content: 'IQ135のインテリかつ筋トレオタク。\n\n気づいたらFIND to DOにいた謎の存在。誰も呼んでいないのに。\n\n自分を信じられない人に代わって、その人の成長した姿を信じ続けている。\n\n謎に包まれているが、人が成長によって幸せになることを心から楽しみにしている、その深い想いだけは確かなもの。',
      bgGradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 50%, #86efac 100%)'
    },
    {
      name: 'KIKUYO',
      role: 'CIO',
      content: '雑談が苦手で人間関係に疲れ、データだけが友達のような孤独を抱えていた過去を持つ。\n\nでも、自分の愛するデータが誰かの役に立った時、データも人も幸せになれることを知った。\n\nだからこそ、今は自分が最も大切にしてきたデータの力で人を幸せにしたいと本気で思っている。',
      bgGradient: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 50%, #fde68a 100%)'
    },
    {
      name: 'TEN',
      role: '最高血流責任者',
      content: '期待されて参加した経営に失敗し自責の念から1年引きこもり、\n\n挫折と絶望を味わった時、かつての仲間に救われた。\n\n一人では何もできないことを痛感し、仲間の大切さを誰よりも知っている。\n\n中二病で古風な言い回しを好み、効率化を追求しながらも人との縁を何より大切にしている。',
      bgGradient: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 50%, #d8b4fe 100%)'
    }
  ];

  // 無限ループ用の拡張スライド配列（編集部用）[ten, iida, misaki, king, kikuyo, ten, iida]
  const extendedEditorialSlides = [
    editorialMembers[4], // ten
    editorialMembers[0], // iida
    editorialMembers[1], // misaki
    editorialMembers[2], // king
    editorialMembers[3], // kikuyo
    editorialMembers[4], // ten
    editorialMembers[0]  // iida
  ];

  // 無限ループ用の拡張スライド配列 [2, 3, 1, 2, 3, 1, 2]
  const extendedSlides = [
    storyContent[1], // 2枚目
    storyContent[2], // 3枚目
    storyContent[0], // 1枚目
    storyContent[1], // 2枚目
    storyContent[2], // 3枚目
    storyContent[0], // 1枚目
    storyContent[1]  // 2枚目
  ];

  const slideImages = ['mission', 'community', 'vision', 'mission', 'community', 'vision', 'mission'];
  
  const handleSlideChange = (slideIndex: number) => {
    // ドットクリック時は実際のインデックス（2,3,4）に変換
    const slideMap = [2, 3, 4]; // 1枚目→index2, 2枚目→index3, 3枚目→index4
    setCurrentSlide(slideMap[slideIndex]);
  };

  const handlePrevSlide = () => {
    if (currentSlide === 2) {
      // 1枚目で<を押した場合：アニメーション完了後に瞬間移動
      setCurrentSlide(1); // ダミーの3へアニメーション
      
      setTimeout(() => {
        setIsTransitioning(true); // トランジション無効化
        setCurrentSlide(4); // 真の3枚目へ瞬間移動
        
        // 次のフレームでトランジション復活
        setTimeout(() => {
          setIsTransitioning(false);
        }, 10);
      }, 300); // アニメーション完了後（300ms）に瞬間移動
    } else {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide === 4) {
      // 3枚目で>を押した場合：アニメーション完了後に瞬間移動
      setCurrentSlide(5); // ダミーの1へアニメーション
      
      setTimeout(() => {
        setIsTransitioning(true); // トランジション無効化
        setCurrentSlide(2); // 真の1枚目へ瞬間移動
        
        // 次のフレームでトランジション復活
        setTimeout(() => {
          setIsTransitioning(false);
        }, 10);
      }, 300); // アニメーション完了後（300ms）に瞬間移動
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  // スワイプ検出
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // リセット
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // 左スワイプ = 次のスライド（矢印の>と同じ）
      handleNextSlide();
    }
    
    if (isRightSwipe) {
      // 右スワイプ = 前のスライド（矢印の<と同じ）
      handlePrevSlide();
    }
  };

  // FAQ toggle function
  const toggleFaqItem = (index: number) => {
    setOpenFaqItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  // Editorial slider functions
  const handleEditorialSlideChange = (slideIndex: number) => {
    // ドットクリック時は実際のインデックス（1,2,3,4,5）に変換
    const slideMap = [1, 2, 3, 4, 5]; // 1枚目→index1, 2枚目→index2, ...
    setCurrentEditorialSlide(slideMap[slideIndex]);
  };

  const handleEditorialPrevSlide = () => {
    if (currentEditorialSlide === 1) {
      // 1枚目で<を押した場合：アニメーション完了後に瞬間移動
      setCurrentEditorialSlide(0); // ダミーのten(0)へアニメーション
      
      setTimeout(() => {
        setIsEditorialTransitioning(true); // トランジション無効化
        setCurrentEditorialSlide(5); // 真のten(5)へ瞬間移動
        
        // 次のフレームでトランジション復活
        setTimeout(() => {
          setIsEditorialTransitioning(false);
        }, 10);
      }, 300); // アニメーション完了後（300ms）に瞬間移動
    } else {
      setCurrentEditorialSlide(prev => prev - 1);
    }
  };

  const handleEditorialNextSlide = () => {
    if (currentEditorialSlide === 5) {
      // 5枚目で>を押した場合：アニメーション完了後に瞬間移動
      setCurrentEditorialSlide(6); // ダミーのiida(6)へアニメーション
      
      setTimeout(() => {
        setIsEditorialTransitioning(true); // トランジション無効化
        setCurrentEditorialSlide(1); // 真のiida(1)へ瞬間移動
        
        // 次のフレームでトランジション復活
        setTimeout(() => {
          setIsEditorialTransitioning(false);
        }, 10);
      }, 300); // アニメーション完了後（300ms）に瞬間移動
    } else {
      setCurrentEditorialSlide(prev => prev + 1);
    }
  };

  // Editorial swipe detection
  const handleEditorialTouchStart = (e: React.TouchEvent) => {
    setEditorialTouchEnd(0); // リセット
    setEditorialTouchStart(e.targetTouches[0].clientX);
  };

  const handleEditorialTouchMove = (e: React.TouchEvent) => {
    setEditorialTouchEnd(e.targetTouches[0].clientX);
  };

  const handleEditorialTouchEnd = () => {
    if (!editorialTouchStart || !editorialTouchEnd) return;
    
    const distance = editorialTouchStart - editorialTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // 左スワイプ = 次のスライド（矢印の>と同じ）
      handleEditorialNextSlide();
    }
    
    if (isRightSwipe) {
      // 右スワイプ = 前のスライド（矢印の<と同じ）
      handleEditorialPrevSlide();
    }
  };
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CTAセクションの可視性を監視
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isAnyCTAVisible = entries.some(entry => entry.isIntersecting);
        setIsCtaVisible(isAnyCTAVisible);
      },
      { threshold: 0.1 }
    );

    const ctaSection = document.getElementById('cta-section');
    const finalCtaSection = document.getElementById('final-cta-section');
    
    if (ctaSection) {
      observer.observe(ctaSection);
    }
    if (finalCtaSection) {
      observer.observe(finalCtaSection);
    }

    return () => {
      if (ctaSection) {
        observer.unobserve(ctaSection);
      }
      if (finalCtaSection) {
        observer.unobserve(finalCtaSection);
      }
    };
  }, []);

  return (
    <>
      {/* discordページ専用スタイル：ヘッダー分の余白を除去 */}
      <style jsx global>{`
        main { 
          padding-top: 0 !important; 
        }
      `}</style>
      <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {/* PC Background */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/hero/pc_bg.png"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Mobile Background */}
          <div className="md:hidden absolute inset-0">
            <Image
              src="/hero/sp_bg.png"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-600/10 to-blue-900/20" />
        </div>

        {/* Animated Characters */}
        <AnimatedCharacters />

        {/* Content */}
        <div className="relative z-50 min-h-screen flex items-end justify-center px-1 pb-28">
          <div className="text-center max-w-sm md:max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-10"
            >
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white drop-shadow-lg text-center">
                「自分には何もない」から<br />
                「<span className="text-amber-400">自分にはこれがある</span>」が<br />
                見つかるコミュニティ
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollY < 50 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="animate-bounce">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30 shadow-lg">
              <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </motion.div>
      </section>

      {/* NEW: FIND to DO Overview - 30秒で理解 */}
      <section className="py-20 px-6 bg-white" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8 -mx-6">
              <Image
                src="/hero/about_find_to_do.png"
                alt="About FIND to DO"
                width={300}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="mb-8 text-left">
              <p className="text-lg text-gray-700 leading-relaxed">
                ワイワイ楽しく話したり、オンラインで交流したり、イベントをしたり参加したり、ゲームをしたり作ったり、相談したり相談されたりしながら自分の好きなことを発見していくコミュニティです。
              </p>
            </div>
            
            <div className="mb-8 text-left">
              <p className="text-lg text-gray-700 leading-relaxed">
                好きなことや興味を持った仕事を実際にしてみて体験し、お金をもらいながら学び、手を動かして得た経験と知識から自分の「得意」を見つけます。
              </p>
            </div>
            
            <div className="mb-8 text-left">
              <p className="text-lg text-gray-700 leading-relaxed">
                みんなでみんなの0から1を応援しあう、あなたのサードプレイスとして、一緒に成長していける仲間が待っています。
              </p>
            </div>
          </div>

          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-2xl py-4 px-0 border border-blue-200 shadow-sm">
              <p className="text-lg text-blue-800 font-medium text-center leading-relaxed">
                講座や教材のようなサービスではなく<br />
                FIND to DOはあなたの一生涯の<br />
                サードプレイスでありたいコミュニティです
              </p>
            </div>
          </div>


          {/* FIND to DOの流れ */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="relative inline-block pb-2">
                <h3 className="text-2xl font-bold text-gray-800 relative">
                  FIND to DOの流れ
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-400 rounded-full"></div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-300 rounded-full"></div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-blue-200 rounded-full"></div>
                </h3>
              </div>
            </div>
            
            <div className="space-y-1">
              {/* 01 */}
              <div className="bg-white border border-gray-200 shadow-md">
                <div className="flex">
                  <div className="bg-blue-400 text-white font-bold text-2xl min-w-[60px] flex items-center justify-center">
                    01
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">気軽にコミュニティに参加</h3>
                    <hr className="border-gray-300 mb-2" />
                    <p className="text-base text-gray-600">成長したい人が集まる温かい場所</p>
                  </div>
                </div>
              </div>
              
              {/* 矢印01→02 */}
              <div className="flex justify-center -my-2">
                <svg className="w-16 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 12">
                  <path d="M7 2l5 8 5-8z" />
                </svg>
              </div>
              
              {/* 02 */}
              <div className="bg-white border border-gray-200 shadow-md">
                <div className="flex">
                  <div className="bg-blue-400 text-white font-bold text-2xl min-w-[60px] flex items-center justify-center">
                    02
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">日々の会話や学びに参加</h3>
                    <hr className="border-gray-300 mb-2" />
                    <p className="text-base text-gray-600">見てるだけでも、たまに発言でもOK</p>
                  </div>
                </div>
              </div>
              
              {/* 矢印02→03 */}
              <div className="flex justify-center -my-2">
                <svg className="w-16 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 12">
                  <path d="M7 2l5 8 5-8z" />
                </svg>
              </div>
              
              {/* 03 */}
              <div className="bg-white border border-gray-200 shadow-md">
                <div className="flex">
                  <div className="bg-blue-400 text-white font-bold text-2xl min-w-[60px] flex items-center justify-center">
                    03
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">興味があれば実際の仕事に挑戦</h3>
                    <hr className="border-gray-300 mb-2" />
                    <p className="text-base text-gray-600">全くの未経験からでもサポートを受けながら実践</p>
                  </div>
                </div>
              </div>
              
              {/* 矢印03→04 */}
              <div className="flex justify-center -my-2">
                <svg className="w-16 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 12">
                  <path d="M7 2l5 8 5-8z" />
                </svg>
              </div>
              
              {/* 04 */}
              <div className="bg-white border border-gray-200 shadow-md">
                <div className="flex">
                  <div className="bg-blue-400 text-white font-bold text-2xl min-w-[60px] flex items-center justify-center">
                    04
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">スキルアップ＋実績＋収入</h3>
                    <hr className="border-gray-300 mb-2" />
                    <p className="text-base text-gray-600">自分のペースで「得意」を発見</p>
                  </div>
                </div>
              </div>
              
              {/* 矢印04→05 */}
              <div className="flex justify-center -my-2">
                <svg className="w-16 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 12">
                  <path d="M7 2l5 8 5-8z" />
                </svg>
              </div>
              
              {/* 05 */}
              <div className="bg-white border border-gray-200 shadow-md">
                <div className="flex">
                  <div className="bg-blue-400 text-white font-bold text-2xl min-w-[60px] flex items-center justify-center">
                    05
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">「自分にはこれがある！」</h3>
                    <hr className="border-gray-300 mb-2" />
                    <p className="text-base text-gray-600">「得意」を活かし理想のキャリアを実現</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FIND → DO 循環図 */}
          <div className="mb-12 relative">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="relative h-64">
                {/* 中心 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="px-4 py-3 rounded-xl flex items-center justify-center shadow-lg" style={{
                    background: 'linear-gradient(135deg, #9BA9FE 0%, #7C8CFC 100%)'
                  }}>
                    <span className="text-white font-bold text-base text-center leading-tight whitespace-nowrap">
                      FIND to DO
                    </span>
                  </div>
                </div>
                
                {/* 好きを見つける - 上 */}
                <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    <span className="text-center">好きを<br />見つける</span>
                  </div>
                </div>
                
                {/* 興味を持った仕事をやってみる - 右 */}
                <div className="absolute top-1/2 right-[-20px] transform -translate-y-1/2">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    <span className="text-center">仕事を<br />やってみる</span>
                  </div>
                </div>
                
                {/* 得意が見つかる - 下 */}
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    <span className="text-center">得意が<br />見つかる</span>
                  </div>
                </div>
                
                {/* 得意を活かして行動する - 左 */}
                <div className="absolute top-1/2 left-[-20px] transform -translate-y-1/2">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    <span className="text-center">得意を<br />仕事に活かす</span>
                  </div>
                </div>
                
                {/* 矢印 */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  {/* 上から右への矢印（右上：末端を短く） */}
                  <path d="M 145 15 Q 180 25 195 60" fill="none" stroke="#e5e7eb" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  {/* 右から下への矢印（右下：先端を短く） */}
                  <path d="M 195 140 Q 180 175 145 185" fill="none" stroke="#e5e7eb" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  {/* 下から左への矢印（左下：末端を短く） */}
                  <path d="M 55 185 Q 15 175 0 140" fill="none" stroke="#e5e7eb" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  {/* 左から上への矢印（左上：先端を短く） */}
                  <path d="M 0 58 Q 15 25 55 15" fill="none" stroke="#e5e7eb" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  
                  {/* FIND文字 - 右上矢印の制御点近く */}
                  <text x="195" y="30" fill="#6b7280" fontSize="14" fontWeight="bold" textAnchor="middle">FIND</text>
                  
                  {/* DO文字 - 右下矢印の制御点近く */}
                  <text x="195" y="175" fill="#6b7280" fontSize="14" fontWeight="bold" textAnchor="middle">DO</text>
                  
                  {/* FIND文字 - 左下矢印の制御点近く */}
                  <text x="-5" y="175" fill="#6b7280" fontSize="14" fontWeight="bold" textAnchor="middle">FIND</text>
                  
                  {/* DO文字 - 左上矢印の制御点近く */}
                  <text x="5" y="30" fill="#6b7280" fontSize="14" fontWeight="bold" textAnchor="middle">DO</text>
                  
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#e5e7eb" />
                    </marker>
                  </defs>
                </svg>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-base text-gray-700 font-medium">
                  フォーマットのない最適化された時代に<br />
                  発見（FIND）と行動（DO）の間にある<br />
                  <span className="text-blue-600 font-bold">あなただけのキャリアパスを共に創ります</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FIND to DO Story Slider - ビジョン・ミッション・コミュニティ */}
      <section className="py-20" style={{
        background: 'linear-gradient(135deg, #f8faff 0%, #f1f5ff 50%, #e8f2ff 100%)'
      }}>
        <div className="mx-auto">
          {/* Backstory画像 */}
          <div className="mb-8 px-6">
            <Image
              src="/hero/backstory_find_to_do.png"
              alt="FIND to DOを作った理由"
              width={300}
              height={400}
              className="w-full h-auto max-w-sm mx-auto"
            />
            <p className="text-center text-lg text-gray-500 mt-6">
              私たちがコミュニティを作った3つの理由
            </p>
          </div>

          {/* PC: 横並び表示 / Mobile: スライダー */}
          {/* PC用横並び表示 */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-6 md:px-6 mb-8">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
                <Image
                  src="/hero/find_to_do_mission.png"
                  alt="Mission"
                  width={300}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{storyContent[1].title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{storyContent[1].content}</p>
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
                <Image
                  src="/hero/find_to_do_community.png"
                  alt="Community"
                  width={300}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{storyContent[2].title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{storyContent[2].content}</p>
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
                <Image
                  src="/hero/find_to_do_vision.png"
                  alt="Vision"
                  width={300}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{storyContent[0].title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{storyContent[0].content}</p>
              </div>
            </div>
          </div>

          {/* Mobile用スライダー */}
          <div className="relative mb-8 md:hidden">
            {/* Left Arrow */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-lg transition-all duration-200"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button 
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-lg transition-all duration-200"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div 
                className={`flex ${isTransitioning ? 'transition-none' : 'transition-transform duration-300 ease-in-out'}`}
                style={{ 
                  transform: currentSlide === 1 
                    ? `translateX(calc(12% + ${-currentSlide * 70}% - ${currentSlide * 12}px))`
                    : currentSlide === 2
                    ? `translateX(calc(12% + ${-currentSlide * 70}% - ${(currentSlide + 1) * 12}px))`
                    : `translateX(calc(12% + ${-currentSlide * 70}% - ${(currentSlide + 2) * 12}px))`,
                  gap: '12px'
                }}
                id="storySlider"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* 拡張スライド配列をレンダリング [3, 1, 2, 3, 1] */}
                {slideImages.map((imageType, index) => (
                  <div key={index} className="w-[70%] flex-shrink-0 mr-3">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={`/hero/find_to_do_${imageType}.png`}
                        alt={`Slide ${index}`}
                        width={300}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {storyContent.map((_, index) => (
                <button 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    (index === 0 && currentSlide === 2) || 
                    (index === 1 && currentSlide === 3) || 
                    (index === 2 && currentSlide === 4) ? 'bg-blue-400' : 'bg-gray-300'
                  }`}
                  onClick={() => handleSlideChange(index)}
                ></button>
              ))}
            </div>
          </div>

          {/* Current Story Summary - モバイルのみ表示 */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100 mx-6 md:hidden">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-lg text-gray-700 leading-tight text-left space-y-2">
                {extendedSlides[currentSlide].content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 活動内容 */}
      <section className="py-20 px-6 bg-white" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            {/* Activities画像 */}
            <div className="mb-8">
              <Image
                src="/hero/activities_find_to_do.png"
                alt="活動内容"
                width={300}
                height={120}
                className="w-full h-auto max-w-sm mx-auto"
              />
            </div>
          </div>

          <div className="space-y-8">
            {/* オンライン交流 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-blue-800">
                  オンライン交流
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Discordというチャットアプリを活用して日常的にコミュニケーションを取ります。SNSと違ってクローズドな環境なので安心して投稿できます。気軽な雑談から真剣な相談まで、自分のペースで参加できます。
              </p>
            </div>

            {/* サークル活動 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-green-800">
                  サークル活動
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                キャリアについて語る会やゲーム大会、アートやゲームなど自分の作品をみんなに見てもらったり遊んでもらったり、自由にサークルを立ち上げたり、仲間と一緒ならなんでもできる楽しい場所です。
              </p>
            </div>

            {/* イベント */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-purple-800">
                  イベント
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                オンライン/オフライン問わず交流会やセミナー、イベントを開催しています。もちろん開催してもらうのも大歓迎です。これまで経営者を招いての交流会だったり、人事担当に直接考えてもらったワークショップ、学生主体のセミナーなど様々なイベントを開催しました。
              </p>
            </div>

            {/* 情報収集 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold text-orange-800">
                  情報収集
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                FIND to DO編集部が独自の調査で収集してきた最新情報や、学習情報、毎日3000文字のコラム記事などを毎日ティップスとして発信しています。自分の好きな情報だけを通知できるのもDiscordの便利なところです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - 活動内容の後に参加を促進 */}
      <section 
        id="cta-section"
        className="relative py-16 px-6 pb-24 bg-indigo-400"
      >
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-2xl py-6 px-4 shadow-lg text-center">
          <div className="mb-4">
            <Image
              src="/characters/iida_communication.png"
              alt="IIDA"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          
          <div className="space-y-6 mb-10">
            <h2 className="text-xl md:text-2xl font-bold leading-tight text-gray-800 -mx-3">
              私たちは<br />
              あなたが仲間になってくれることを<br />
              心から楽しみにしています！
            </h2>
            
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              見てるだけでも学びがあります！<br />
              最初は挨拶だけでも大丈夫！<br />
              一緒に成長していきましょう！
            </p>
          </div>
          
          <div className="space-y-4">
            <a
              href="https://discord.gg/xQM6NgmwPk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-orange-500 text-white font-bold py-4 px-6 rounded-2xl text-base md:text-lg transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] hover:bg-orange-600"
            >
              コミュニティに参加する
            </a>
            
            <div className="text-xs md:text-sm text-gray-600 text-center">
              <span>※FIND to DOはサービスではなくコミュニティですので<br />参加に費用はかかりません</span><br />
              <span className="text-xs text-gray-600 mt-1 block">※参加先はFIND to DOの運営母体であるDiscordの<br />「ZERO to ONEサポート」です</span>
            </div>
          </div>
          </div>
          
          {/* よくある質問テキスト */}
          <div className="text-center mt-16">
            <div className="text-gray-200 text-base font-medium">
              よくある質問
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator to FAQ */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30 shadow-lg">
            <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              よくあるご質問
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-r ${faq.bgClass} rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md`}
              >
                <button
                  onClick={() => toggleFaqItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 pr-4">
                    Q. {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-600 flex-shrink-0 transform transition-transform duration-300 ${
                      openFaqItems.includes(index) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaqItems.includes(index) ? 'auto' : 0,
                    opacity: openFaqItems.includes(index) ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className="bg-white bg-opacity-60 p-4 rounded-xl">
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        A. {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Team Slider - ストーリースライダーと同じスタイル */}
      <section className="py-20" style={{
        background: 'linear-gradient(135deg, #f8faff 0%, #f1f5ff 50%, #e8f2ff 100%)'
      }}>
        <div className="mx-auto">
          {/* タイトル */}
          <div className="mb-8 px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              サポート編集部メンバー
            </h2>
          </div>

          {/* PC: 横並び表示 / Mobile: スライダー */}
          {/* PC用横並び表示 */}
          <div className="hidden md:grid md:grid-cols-5 md:gap-4 md:px-6 mb-8">
            {editorialMembers.map((member, index) => (
              <div key={member}>
                <div className="rounded-2xl overflow-hidden shadow-lg mb-3">
                  <Image
                    src={`/editorial/${member}.png`}
                    alt={`Editorial member ${member}`}
                    width={200}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-sm font-bold text-gray-800 mb-1">{editorialMembersData[index].name}</h4>
                  <p className="text-xs text-gray-600">{editorialMembersData[index].role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile用スライダー */}
          <div className="relative mb-8 md:hidden">
            {/* Left Arrow */}
            <button 
              onClick={handleEditorialPrevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-lg transition-all duration-200"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button 
              onClick={handleEditorialNextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-lg transition-all duration-200"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div 
                className={`flex ${isEditorialTransitioning ? 'transition-none' : 'transition-transform duration-300 ease-in-out'}`}
                style={{ 
                  transform: currentEditorialSlide === 0 
                    ? `translateX(calc(12% + ${-currentEditorialSlide * 70}% - ${currentEditorialSlide * 12}px))`
                    : currentEditorialSlide === 1
                    ? `translateX(calc(12% + ${-currentEditorialSlide * 70}% - ${currentEditorialSlide * 12}px))`
                    : currentEditorialSlide === 2
                    ? `translateX(calc(12% + ${-currentEditorialSlide * 70}% - ${(currentEditorialSlide + 1) * 12}px))`
                    : currentEditorialSlide === 4
                    ? `translateX(calc(12% + ${-currentEditorialSlide * 70}% - ${(currentEditorialSlide + 3) * 12}px))`
                    : currentEditorialSlide === 5
                    ? `translateX(calc(12% + ${-currentEditorialSlide * 70}% - ${(currentEditorialSlide + 4) * 12}px))`
                    : `translateX(calc(12% + ${-currentEditorialSlide * 70}% - ${(currentEditorialSlide + 2) * 12}px))`,
                  gap: '12px'
                }}
                id="editorialSlider"
                onTouchStart={handleEditorialTouchStart}
                onTouchMove={handleEditorialTouchMove}
                onTouchEnd={handleEditorialTouchEnd}
              >
                {/* 拡張スライド配列をレンダリング [ten, iida, misaki, king, kikuyo, ten, iida] */}
                {extendedEditorialSlides.map((member, index) => (
                  <div key={index} className="w-[70%] flex-shrink-0 mr-3">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={`/editorial/${member}.png`}
                        alt={`Editorial member ${member}`}
                        width={300}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {editorialMembers.map((_, index) => (
                <button 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    (index === 0 && currentEditorialSlide === 1) || 
                    (index === 1 && currentEditorialSlide === 2) || 
                    (index === 2 && currentEditorialSlide === 3) ||
                    (index === 3 && currentEditorialSlide === 4) ||
                    (index === 4 && currentEditorialSlide === 5) ? 'bg-blue-400' : 'bg-gray-300'
                  }`}
                  onClick={() => handleEditorialSlideChange(index)}
                ></button>
              ))}
            </div>
          </div>

          {/* Current Editorial Member Summary - モバイルのみ表示 */}
          <div className="mx-6 md:hidden">
            <motion.div
              key={currentEditorialSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-3xl shadow-lg"
              style={{
                background: currentEditorialSlide === 1 ? editorialMembersData[0].bgGradient :
                           currentEditorialSlide === 2 ? editorialMembersData[1].bgGradient :
                           currentEditorialSlide === 3 ? editorialMembersData[2].bgGradient :
                           currentEditorialSlide === 4 ? editorialMembersData[3].bgGradient :
                           currentEditorialSlide === 5 ? editorialMembersData[4].bgGradient :
                           editorialMembersData[2].bgGradient, // default to KING
                minHeight: '300px'
              }}
            >
              {/* 都市風景背景の模擬 */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(45deg, #1f2937 25%, transparent 25%), linear-gradient(-45deg, #1f2937 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1f2937 75%), linear-gradient(-45deg, transparent 75%, #1f2937 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}></div>
              
              <div className="relative z-10 p-4">
                <div className="bg-white bg-opacity-80 p-6 rounded-2xl backdrop-blur-sm">
                  <p className="text-base text-gray-700 leading-tight whitespace-pre-line">
                    {currentEditorialSlide === 1 ? editorialMembersData[0].content :
                     currentEditorialSlide === 2 ? editorialMembersData[1].content :
                     currentEditorialSlide === 3 ? editorialMembersData[2].content :
                     currentEditorialSlide === 4 ? editorialMembersData[3].content :
                     currentEditorialSlide === 5 ? editorialMembersData[4].content :
                     editorialMembersData[2].content}
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* 注釈 */}
            <div className="text-center mt-6 px-2">
              <div className="text-base text-gray-600 leading-relaxed -mx-4">
                ※各メンバーは実在の人物の経験・実績・実話を<br />
                元にして生まれたクロニクルキャラクターです
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discord詳細 - 前提が理解された後で */}
      <section className="py-20 px-6 bg-white" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              なぜDiscordを使うのか？
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                コミュニティ運営に特化
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                コミュニティ運営に特化して設計されており、自然と交流ができ、コミュニケーションから学習まで、Discord内で全て完結する環境が整っています。
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                自由な参加スタイル
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                雑談、質問、作業報告など、話題ごとにチャンネルを分けて参加することができ、興味のある話題だけを選んで通知を受け取ることができます。
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                参加のハードルが低い
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                無料のアカウント作成だけで参加でき、招待リンクから簡単に始められます。本名登録の必要がなく、ニックネームで気軽に参加できます。
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                使いやすい機能
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                音声チャット、画面共有、フォーラム機能、ステージ機能など、コミュニティを楽しんだり学習するための機能が充実しています。
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <div className="mb-4">
              <Image
                src="/characters/misaki.png"
                alt="MISAKI"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <div className="relative bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg max-w-md mx-auto border-2 border-black">
              {/* 黒い枠線の三角形 */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[15px] border-l-transparent border-r-transparent border-b-black"></div>
              {/* 白い中身の三角形（少し小さめで位置を調整） */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[14px] border-l-transparent border-r-transparent border-b-white"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                使い慣れない方には、使い方から丁寧にサポートします！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 参加方法 */}
      <section className="py-20 px-6" style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)'
      }}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              簡単3ステップで参加
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">招待リンクをクリック</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                コミュニティに参加するボタンをタップ。初回の方はアプリストアに誘導されるので、Discordアプリをダウンロードしてください。<br />
                <span className="text-sm text-gray-500">※既にDiscordをお持ちの方は、タップするだけで参加できます</span>
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">アカウント作成</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                メールアドレス、ユーザー名、パスワードを入力してアカウントを作成。<br />
                作成後、FIND to DOの運営母体である「ZERO to ONEサポート」コミュニティに参加できます。<br />
                <span className="text-sm text-gray-500 mt-2 block">※FIND to DOはZERO to ONEサポートのプロジェクトです。参加時にロールを取得してもらえればFIND to DO情報が優先的に取得できます</span>
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">自己紹介や挨拶</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                #自己紹介チャンネルで自己紹介をしたり、#雑談チャンネルで挨拶をしていただければ、コミュニティメンバーが温かくお迎えします！<br />もちろん、見学だけでも大丈夫です！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section 
        id="final-cta-section"
        className="relative py-16 px-6 pb-24 bg-indigo-400"
      >
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-2xl py-6 px-4 shadow-lg text-center">
            <div className="mb-4">
              <Image
                src="/characters/iida.png"
                alt="IIDA"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>
            
            <div className="space-y-6 mb-10">
              <h2 className="text-xl md:text-2xl font-bold leading-tight text-gray-800 -mx-3">
                あなたが仲間になってくれることを<br />
                心から楽しみにしています！
              </h2>
              
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Discordコミュニティで、<br />
                一生続けられるサークルのような<br />
                サードプレイスを一緒に作りましょう！
              </p>
              
              <div className="bg-gray-50 p-6 rounded-2xl">
                <p className="text-base md:text-lg font-medium leading-relaxed text-gray-800">
                  「自分には何もない」から<br />
                  「<span className="text-amber-500">自分にはこれがある</span>」<br />
                  が見つかるコミュニティ
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <a
                href="https://discord.gg/xQM6NgmwPk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-orange-500 text-white font-bold py-4 px-6 rounded-2xl text-base md:text-lg transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] hover:bg-orange-600"
              >
                コミュニティに参加する
              </a>
              
              <div className="text-xs md:text-sm text-gray-600 text-center">
                <span>※FIND to DOはサービスではなくコミュニティですので<br />参加に費用はかかりません</span><br />
                <span className="text-xs text-gray-600 mt-1 block">※参加先はFIND to DOの運営母体であるDiscordの<br />「ZERO to ONEサポート」です</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Floating CTA Button */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-opacity duration-300 ${isCtaVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-sm mx-auto">
          <a
            href="https://discord.gg/xQM6NgmwPk"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] text-center"
          >
            コミュニティに参加する
          </a>
        </div>
      </div>
      
      {/* Discord専用フッター */}
      <DiscordFooter />
    </div>
    </>
  );
}