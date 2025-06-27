# FIND to DO サイト更新 作業指示書

**作成日**: 2025年6月27日  
**対象プロジェクト**: find-to-do-site  
**目的**: LP リニューアル提案書に基づく具体的な実装作業指示

---

## 🎯 **作業概要**

### **背景**
FIND to DOの現実的な価格モデルと「リアルな仕事体験」という核心価値を反映したLP更新を実施

### **目標**
- 企業向け：コスト効率と人材獲得価値の訴求強化
- 学生向け：リアルな仕事体験による自己発見の訴求強化
- 両者共通：「人の夢と希望のブースター」という理念の具現化

---

## 📋 **作業フェーズと優先度**

### **フェーズ1（高優先度）: 企業向けLP強化**
#### **1-1. メインページ価格比較セクション強化** 
**ファイル**: `/src/app/page.tsx`、`/src/components/sections/PriceComparisonSection.tsx`

**作業内容**:
```typescript
// 新しい価格比較データ
const enhancedPriceData = {
  headline: "通常の1/10以下のコストで企業DXを実現",
  subtitle: "教育投資としての社会的価値と圧倒的なコスト効率を両立",
  
  comparisons: [
    {
      category: "小規模DXプロジェクト",
      traditional: "150-300万円",
      findToDo: "10-30万円", 
      savings: "最大90%削減",
      value: "実践的人材育成 + 企業課題解決"
    },
    {
      category: "中規模システム開発", 
      traditional: "200-500万円",
      findToDo: "30-80万円",
      savings: "最大84%削減", 
      value: "優秀な人材パイプライン構築"
    },
    {
      category: "大規模DX推進",
      traditional: "500-1000万円", 
      findToDo: "80-200万円",
      savings: "最大80%削減",
      value: "長期的ブランディング価値"
    }
  ]
}
```

**実装ポイント**:
- 既存のPriceComparisonSectionを上記データで更新
- 「教育投資」「社会的価値」のキーワードを強調
- 削減率を視覚的に分かりやすく表示

#### **1-2. サービスページROI・効果測定セクション追加**
**ファイル**: `/src/app/service/page.tsx`

**作業内容**:
新しいセクション「投資対効果セクション」を追加

```typescript
// 新セクション追加
const ROISection = () => {
  return (
    <section className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            教育投資としての持続可能な価値創造
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            単なるコスト削減ではなく、社会的価値と経済的価値を両立する新しいビジネスモデル
          </p>
        </motion.div>
        
        {/* ROI指標表示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roiMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <metric.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{metric.title}</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">{metric.value}</div>
              <p className="text-gray-600">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

**実装場所**: サービス概要セクションの後、共通価値セクションの前

#### **1-3. 従来採用との比較セクション追加**
**ファイル**: `/src/app/service/page.tsx`

**作業内容**:
```typescript
const HiringComparisonSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          従来の採用 vs FIND to DO方式
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">項目</th>
                <th className="p-4 text-left">従来の採用</th>
                <th className="p-4 text-left">FIND to DO方式</th>
                <th className="p-4 text-left">優位性</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 font-medium">{row.aspect}</td>
                  <td className="p-4 text-red-600">{row.traditional}</td>
                  <td className="p-4 text-blue-600">{row.findToDo}</td>
                  <td className="p-4 text-green-600 font-medium">{row.advantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
```

### **フェーズ2（高優先度）: 学生向けLP強化**

#### **2-1. コミュニティページヒーローメッセージ刷新**
**ファイル**: `/src/app/community/page.tsx`

**作業内容**:
既存のヒーローセクションを以下の内容に更新

```typescript
// 新しいヒーローメッセージ
const newHeroContent = {
  headline: "教科書では学べない「本物の仕事」がここにある",
  subtitle: "理系・文系の枠を超えて、リアルな業務を体験し、自分の可能性を発見しよう",
  keyPoints: [
    "教育用の模擬体験ではなく、企業の実際の課題解決に挑戦",
    "「こんなに面白い仕事があるんだ！」という発見と出会い", 
    "専攻に関係なく、様々な職種・業界に挑戦できる環境"
  ],
  cta: {
    primary: "本物の仕事に、本気で挑戦してみませんか？",
    secondary: "リアル体験ストーリーを見る"
  }
}
```

#### **2-2. リアル体験ストーリーセクション追加**
**ファイル**: 新規作成 `/src/components/sections/RealExperienceStories.tsx`

**作業内容**:
```typescript
const experienceStories = [
  {
    student: "文系3年生 田中さん",
    background: "文学部・プログラミング未経験", 
    challenge: "企業の業務効率化システム開発",
    discovery: "「理系じゃないから無理」の固定概念を破る体験",
    impact: "論理的思考力がIT業界で活かせることを発見",
    current: "現在はフロントエンド開発のメンターとして活躍",
    image: "/stories/student1.jpg"
  },
  {
    student: "理系2年生 山田さん",
    background: "工学部・技術志向",
    challenge: "企業のマーケティング戦略立案",
    discovery: "技術とビジネスを繋ぐ面白さを発見", 
    impact: "「理系だから技術職」の思い込みから解放",
    current: "プロダクトマネージャーを目指して活動中",
    image: "/stories/student2.jpg"
  },
  {
    student: "文系4年生 佐藤さん",
    background: "経済学部・クリエイティブ未経験",
    challenge: "企業PR動画の企画・制作",
    discovery: "企業成長に直結する仕事の責任と醍醐味",
    impact: "クリエイティブ×ビジネスの可能性を実感",
    current: "映像ディレクターとして就職決定",
    image: "/stories/student3.jpg"
  }
];
```

#### **2-3. 制限のない挑戦機会セクション**
**ファイル**: `/src/components/sections/UnlimitedOpportunities.tsx`

**作業内容**:
```typescript
const opportunityCategories = {
  テクノロジー: {
    icon: Code,
    challenges: ["WEBアプリ開発", "AI・データ分析", "ブロックチェーン", "IoTシステム"],
    message: "文系・理系問わず、論理的思考力があれば挑戦可能",
    color: "blue"
  },
  ビジネス企画: {
    icon: BarChart3,
    challenges: ["事業戦略立案", "マーケティング", "新規事業開発", "組織改善"],
    message: "専攻関係なく、課題発見力と創造力で勝負",
    color: "green"
  },
  クリエイティブ: {
    icon: Palette,
    challenges: ["動画制作", "グラフィックデザイン", "WEBデザイン", "コンテンツ企画"],
    message: "美術系でなくても、感性と熱意があれば十分",
    color: "orange"
  }
};
```

### **フェーズ3（中優先度）: 新機能追加**

#### **3-1. 学生広報員システム詳細ページ**
**ファイル**: 新規作成 `/src/app/service/student-pr/page.tsx`

#### **3-2. 導入効果測定ダッシュボード**
**ファイル**: 新規作成 `/src/components/sections/ImpactDashboard.tsx`

#### **3-3. 企業向け資料ダウンロードページ**
**ファイル**: `/src/app/documents/page.tsx` の強化

---

## 🛠 **技術的実装要件**

### **使用コンポーネント**
- **アニメーション**: 既存のframer-motionを活用
- **アイコン**: lucide-reactから追加アイコン
- **スタイリング**: 既存のTailwind CSSクラス体系に準拠

### **レスポンシブ対応**
- モバイルファースト設計を維持
- タブレット・PC表示での最適化

### **パフォーマンス**
- 画像の最適化（Next.js Image コンポーネント使用）
- コード分割（動的インポート活用）

---

## 📁 **ファイル構成**

### **新規作成ファイル**
```
/src/components/sections/
├── RealExperienceStories.tsx
├── UnlimitedOpportunities.tsx
├── ROISection.tsx
├── HiringComparisonSection.tsx
└── ImpactDashboard.tsx

/src/app/service/
└── student-pr/
    └── page.tsx

/public/stories/
├── student1.jpg
├── student2.jpg
└── student3.jpg
```

### **更新対象ファイル**
```
/src/app/
├── page.tsx (価格比較セクション強化)
├── service/page.tsx (新セクション追加)
└── community/page.tsx (ヒーロー刷新)

/src/components/sections/
└── PriceComparisonSection.tsx (データ更新)
```

---

## ✅ **作業チェックリスト**

### **フェーズ1: 企業向けLP強化**
- [ ] PriceComparisonSection の価格データ更新
- [ ] サービスページにROIセクション追加
- [ ] 従来採用との比較セクション実装
- [ ] レスポンシブ表示の確認
- [ ] GA4イベント追跡の設定

### **フェーズ2: 学生向けLP強化**
- [ ] コミュニティページヒーロー刷新
- [ ] RealExperienceStoriesコンポーネント作成
- [ ] UnlimitedOpportunitiesコンポーネント作成
- [ ] 各セクションの統合とテスト
- [ ] 学生向けGA4イベント設定

### **フェーズ3: 新機能追加**
- [ ] 学生広報員システム詳細ページ
- [ ] 導入効果測定ダッシュボード
- [ ] 企業向け資料ダウンロード強化

### **最終確認**
- [ ] 全ページのレスポンシブ表示確認
- [ ] パフォーマンステスト実行
- [ ] SEOメタデータ更新
- [ ] アクセシビリティチェック
- [ ] 本番環境デプロイ準備

---

## 🎯 **成功指標**

### **定量指標**
- 企業向けお問い合わせ数：20%向上
- 学生向けDiscord参加数：30%向上
- ページ滞在時間：平均2分以上
- コンバージョン率：企業2%、学生5%達成

### **定性指標**
- ブランドメッセージの一貫性確保
- ユーザビリティの向上
- 「リアルな仕事体験」価値の明確な伝達

---

## 📞 **サポート・問い合わせ**

**実装に関する質問や確認事項がある場合**:
- 技術的な質問：開発チーム
- デザイン・UX：デザインチーム  
- コンテンツ・文言：マーケティングチーム

**進捗報告**:
- 各フェーズ完了時に進捗レポート提出
- 問題発生時は即座に報告・相談

---

**この作業指示書に従って実装を進めることで、FIND to DOの新しい価値提案を効果的にWebサイトに反映できます。**