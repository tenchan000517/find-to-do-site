// FIND to DO Design System
// Based on FINAL_CORE_MESSAGES_v3.md and COMPREHENSIVE_REDESIGN_PLAN.md
// Created: 2025-06-28

export const DESIGN_SYSTEM = {
  // 企業向けカラーパレット
  enterprise: {
    primary: '#1e3a8a',      // Navy Blue - 信頼感・プロフェッショナル
    primaryLight: '#1e40af',  // Lighter Navy
    secondary: '#3b82f6',    // Professional Blue
    secondaryLight: '#60a5fa', // Light Blue
    accent: '#10b981',       // Trust Green - 成功・信頼
    accentLight: '#34d399',  // Light Green
    background: '#f8fafc',   // Light Gray - 清潔感
    backgroundAlt: '#f1f5f9', // Alternative background
    text: '#1f2937',         // Dark Gray - 読みやすさ
    textSecondary: '#374151', // Secondary text
    white: '#ffffff',
    success: '#10b981',      // 90%成功率などの数値強調用
    highlight: '#fbbf24',    // 重要情報のハイライト
  },
  
  // 学生向けカラーパレット
  student: {
    primary: '#f97316',      // Energetic Orange - エネルギー・挑戦
    primaryLight: '#fb923c', // Light Orange
    secondary: '#16a34a',    // Growth Green - 成長・可能性
    secondaryLight: '#22c55e', // Light Green
    accent: '#3b82f6',       // Hope Blue - 希望・未来
    accentLight: '#60a5fa',  // Light Blue
    background: '#fefefe',   // Warm White - 温かみ
    backgroundAlt: '#faf5ff', // Alternative background
    text: '#374151',         // Warm Gray - 親しみやすさ
    textSecondary: '#4b5563', // Secondary text
    white: '#ffffff',
    growth: '#16a34a',       // 成長要素の強調
    possibility: '#f97316',   // 可能性の強調
  },
  
  // 共通カラー
  common: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },
  
  // タイポグラフィ
  typography: {
    // 企業向けタイポグラフィ
    enterprise: {
      // ヘッドライン - インパクト重視
      headline: {
        large: 'font-bold text-4xl md:text-5xl lg:text-6xl leading-tight',
        medium: 'font-bold text-3xl md:text-4xl lg:text-5xl leading-tight',
        small: 'font-bold text-2xl md:text-3xl lg:text-4xl leading-tight',
      },
      // サブヘッドライン
      subheading: {
        large: 'font-semibold text-xl md:text-2xl lg:text-3xl',
        medium: 'font-semibold text-lg md:text-xl lg:text-2xl',
        small: 'font-semibold text-base md:text-lg lg:text-xl',
      },
      // ボディテキスト
      body: {
        large: 'text-lg md:text-xl leading-relaxed',
        medium: 'text-base md:text-lg leading-relaxed',
        small: 'text-sm md:text-base leading-relaxed',
      },
      // CTA・ボタンテキスト
      cta: {
        large: 'font-bold text-lg md:text-xl',
        medium: 'font-bold text-base md:text-lg',
        small: 'font-semibold text-sm md:text-base',
      },
      // 数値・統計
      stats: {
        large: 'font-bold text-5xl md:text-6xl lg:text-7xl',
        medium: 'font-bold text-4xl md:text-5xl lg:text-6xl',
        small: 'font-bold text-3xl md:text-4xl lg:text-5xl',
      }
    },
    
    // 学生向けタイポグラフィ
    student: {
      // ヘッドライン - 親しみやすく、エネルギッシュ
      headline: {
        large: 'font-bold text-4xl md:text-5xl lg:text-6xl leading-tight',
        medium: 'font-bold text-3xl md:text-4xl lg:text-5xl leading-tight',
        small: 'font-bold text-2xl md:text-3xl lg:text-4xl leading-tight',
      },
      // サブヘッドライン
      subheading: {
        large: 'font-semibold text-xl md:text-2xl lg:text-3xl',
        medium: 'font-semibold text-lg md:text-xl lg:text-2xl',
        small: 'font-semibold text-base md:text-lg lg:text-xl',
      },
      // ボディテキスト
      body: {
        large: 'text-lg md:text-xl leading-relaxed',
        medium: 'text-base md:text-lg leading-relaxed',
        small: 'text-sm md:text-base leading-relaxed',
      },
      // CTA・ボタンテキスト
      cta: {
        large: 'font-bold text-lg md:text-xl',
        medium: 'font-bold text-base md:text-lg',
        small: 'font-semibold text-sm md:text-base',
      },
      // 成長段階・ステップ
      steps: {
        large: 'font-bold text-2xl md:text-3xl lg:text-4xl',
        medium: 'font-bold text-xl md:text-2xl lg:text-3xl',
        small: 'font-bold text-lg md:text-xl lg:text-2xl',
      }
    }
  },
  
  // スペーシング
  spacing: {
    section: {
      padding: 'py-16 md:py-24 lg:py-32',
      paddingSmall: 'py-12 md:py-16 lg:py-20',
      margin: 'my-16 md:my-24 lg:my-32',
    },
    container: {
      padding: 'px-4 md:px-6 lg:px-8',
      maxWidth: 'max-w-7xl mx-auto',
    },
    element: {
      margin: {
        small: 'mb-4',
        medium: 'mb-6 md:mb-8',
        large: 'mb-8 md:mb-12',
      },
      padding: {
        small: 'p-4',
        medium: 'p-6 md:p-8',
        large: 'p-8 md:p-12',
      }
    }
  },
  
  // シャドウ・エフェクト
  effects: {
    shadow: {
      small: 'shadow-sm',
      medium: 'shadow-md',
      large: 'shadow-lg',
      xl: 'shadow-xl',
    },
    rounded: {
      small: 'rounded-md',
      medium: 'rounded-lg',
      large: 'rounded-xl',
      full: 'rounded-full',
    },
    border: {
      thin: 'border',
      medium: 'border-2',
      thick: 'border-4',
    }
  },
  
  // アニメーション
  animations: {
    transition: {
      fast: 'transition-all duration-200 ease-in-out',
      medium: 'transition-all duration-300 ease-in-out',
      slow: 'transition-all duration-500 ease-in-out',
    },
    hover: {
      scale: 'hover:scale-105',
      lift: 'hover:-translate-y-2',
      glow: 'hover:shadow-2xl',
    }
  },
  
  // ボタンスタイル
  buttons: {
    enterprise: {
      primary: `
        bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-bold py-4 px-8 rounded-lg
        transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1
        border-2 border-transparent hover:border-[#3b82f6]
      `,
      secondary: `
        bg-transparent hover:bg-[#1e3a8a] text-[#1e3a8a] hover:text-white font-bold py-4 px-8 rounded-lg
        transition-all duration-300 ease-in-out hover:shadow-xl
        border-2 border-[#1e3a8a]
      `,
      accent: `
        bg-[#10b981] hover:bg-[#34d399] text-white font-bold py-4 px-8 rounded-lg
        transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1
      `
    },
    student: {
      primary: `
        bg-[#f97316] hover:bg-[#fb923c] text-white font-bold py-4 px-8 rounded-lg
        transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1
        border-2 border-transparent hover:border-[#16a34a]
      `,
      secondary: `
        bg-transparent hover:bg-[#f97316] text-[#f97316] hover:text-white font-bold py-4 px-8 rounded-lg
        transition-all duration-300 ease-in-out hover:shadow-xl
        border-2 border-[#f97316]
      `,
      accent: `
        bg-[#16a34a] hover:bg-[#22c55e] text-white font-bold py-4 px-8 rounded-lg
        transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1
      `
    }
  },
  
  // レスポンシブ設定
  responsive: {
    mobile: 'max-w-sm mx-auto',
    tablet: 'max-w-2xl mx-auto',
    desktop: 'max-w-7xl mx-auto',
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    }
  }
} as const;

// ユーティリティ関数
export const getEnterpriseClasses = (variant: 'primary' | 'secondary' | 'accent' = 'primary') => {
  return DESIGN_SYSTEM.buttons.enterprise[variant];
};

export const getStudentClasses = (variant: 'primary' | 'secondary' | 'accent' = 'primary') => {
  return DESIGN_SYSTEM.buttons.student[variant];
};

// 企業向けテーマクラス
export const enterpriseTheme = {
  bg: 'bg-gradient-to-br from-slate-50 to-blue-50',
  text: 'text-slate-800',
  accent: 'text-blue-600',
  border: 'border-slate-200',
};

// 学生向けテーマクラス  
export const studentTheme = {
  bg: 'bg-gradient-to-br from-orange-50 to-green-50',
  text: 'text-slate-700',
  accent: 'text-orange-600',
  border: 'border-orange-200',
};

export default DESIGN_SYSTEM;