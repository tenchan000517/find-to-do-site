// src/lib/auto-tuning-system.ts
// Phase 3: 自動調整システム
// 品質スコア基準の動的最適化とパフォーマンス自動調整

import { QualityMetrics } from './quality-validator';
import { ABTestResult, GenerationMethod } from './ab-test-generator';
import { MonitoringDashboard, DashboardMetrics } from './monitoring-dashboard';

// 自動調整設定
export interface AutoTuningConfig {
  enabled: boolean;
  adjustmentInterval: number; // ミリ秒
  qualityThresholds: QualityThresholds;
  performanceTargets: PerformanceTargets;
  adaptiveWeights: AdaptiveWeights;
}

export interface QualityThresholds {
  minimum: number;          // 最低品質基準
  target: number;           // 目標品質
  excellent: number;        // 優秀品質
  adjustmentSensitivity: number; // 調整感度
}

export interface PerformanceTargets {
  maxExecutionTime: number; // 最大実行時間(ms)
  targetWordCount: number;  // 目標文字数
  successRateTarget: number; // 目標成功率
  trendReflectionTarget: number; // トレンド反映目標
}

export interface AdaptiveWeights {
  qualityWeight: number;
  speedWeight: number;
  reliabilityWeight: number;
  trendWeight: number;
}

export interface TuningRecommendation {
  type: 'threshold' | 'method' | 'parameter' | 'strategy';
  priority: 'high' | 'medium' | 'low';
  action: string;
  expectedImprovement: number;
  confidence: number;
  implementation: string;
}

export interface TuningResult {
  adjustmentsMade: TuningAdjustment[];
  newConfig: AutoTuningConfig;
  expectedImprovements: Record<string, number>;
  recommendations: TuningRecommendation[];
  timestamp: string;
}

export interface TuningAdjustment {
  parameter: string;
  oldValue: number;
  newValue: number;
  reason: string;
  impact: 'positive' | 'negative' | 'neutral';
}

/**
 * 自動調整システムメインクラス
 */
export class AutoTuningSystem {
  private config: AutoTuningConfig;
  private dashboard: MonitoringDashboard;
  private adjustmentHistory: TuningResult[] = [];
  private lastAdjustment: Date = new Date(0);

  constructor(dashboard: MonitoringDashboard, initialConfig?: Partial<AutoTuningConfig>) {
    this.dashboard = dashboard;
    this.config = this.getDefaultConfig();
    
    if (initialConfig) {
      this.config = { ...this.config, ...initialConfig };
    }
  }

  /**
   * 自動調整実行
   */
  async performAutoTuning(): Promise<TuningResult> {
    console.log('🤖 自動調整システム開始...');
    
    if (!this.config.enabled) {
      console.log('⏸️  自動調整は無効化されています');
      return this.createEmptyResult();
    }

    if (!this.shouldPerformAdjustment()) {
      console.log('⏭️  調整間隔未達のためスキップ');
      return this.createEmptyResult();
    }

    const dashboardData = this.dashboard.generateDashboard();
    const adjustments: TuningAdjustment[] = [];
    const recommendations: TuningRecommendation[] = [];

    // 1. 品質基準の調整
    const qualityAdjustments = this.adjustQualityThresholds(dashboardData);
    adjustments.push(...qualityAdjustments);

    // 2. パフォーマンス目標の調整
    const performanceAdjustments = this.adjustPerformanceTargets(dashboardData);
    adjustments.push(...performanceAdjustments);

    // 3. 重み付けの調整
    const weightAdjustments = this.adjustAdaptiveWeights(dashboardData);
    adjustments.push(...weightAdjustments);

    // 4. 推奨事項の生成
    const generatedRecommendations = this.generateRecommendations(dashboardData);
    recommendations.push(...generatedRecommendations);

    // 5. 期待改善値の計算
    const expectedImprovements = this.calculateExpectedImprovements(adjustments);

    const result: TuningResult = {
      adjustmentsMade: adjustments,
      newConfig: { ...this.config },
      expectedImprovements,
      recommendations,
      timestamp: new Date().toISOString()
    };

    this.adjustmentHistory.push(result);
    this.lastAdjustment = new Date();

    console.log(`✅ 自動調整完了: ${adjustments.length}個の調整、${recommendations.length}個の推奨事項`);
    
    return result;
  }

  /**
   * 品質閾値の動的調整
   */
  private adjustQualityThresholds(data: DashboardMetrics): TuningAdjustment[] {
    const adjustments: TuningAdjustment[] = [];
    const recentAvgQuality = data.summary.averageQuality;
    const sensitivity = this.config.qualityThresholds.adjustmentSensitivity;

    // 最低品質基準の調整
    if (recentAvgQuality > this.config.qualityThresholds.minimum + 10) {
      const oldValue = this.config.qualityThresholds.minimum;
      const newValue = Math.min(
        oldValue + sensitivity,
        recentAvgQuality - 5
      );
      
      if (newValue !== oldValue) {
        this.config.qualityThresholds.minimum = newValue;
        adjustments.push({
          parameter: 'qualityThresholds.minimum',
          oldValue,
          newValue,
          reason: '平均品質向上により最低基準を引き上げ',
          impact: 'positive'
        });
      }
    } else if (recentAvgQuality < this.config.qualityThresholds.minimum - 5) {
      const oldValue = this.config.qualityThresholds.minimum;
      const newValue = Math.max(
        oldValue - sensitivity,
        40 // 絶対最低値
      );
      
      if (newValue !== oldValue) {
        this.config.qualityThresholds.minimum = newValue;
        adjustments.push({
          parameter: 'qualityThresholds.minimum',
          oldValue,
          newValue,
          reason: '平均品質低下により最低基準を引き下げ',
          impact: 'negative'
        });
      }
    }

    // 目標品質の調整
    if (data.categoryPerformance.length > 0) {
      const topCategoryQuality = Math.max(...data.categoryPerformance.map(c => c.averageQuality));
      const currentTarget = this.config.qualityThresholds.target;
      
      if (topCategoryQuality > currentTarget + 5) {
        const oldValue = currentTarget;
        const newValue = Math.min(topCategoryQuality, currentTarget + sensitivity * 2);
        
        this.config.qualityThresholds.target = newValue;
        adjustments.push({
          parameter: 'qualityThresholds.target',
          oldValue,
          newValue,
          reason: 'トップカテゴリ実績に基づく目標品質向上',
          impact: 'positive'
        });
      }
    }

    return adjustments;
  }

  /**
   * パフォーマンス目標の調整
   */
  private adjustPerformanceTargets(data: DashboardMetrics): TuningAdjustment[] {
    const adjustments: TuningAdjustment[] = [];

    // 実行時間目標の調整
    if (data.generationMethods.length > 0) {
      const avgExecutionTime = data.generationMethods.reduce(
        (sum, method) => sum + method.averageExecutionTime, 0
      ) / data.generationMethods.length;

      const currentTarget = this.config.performanceTargets.maxExecutionTime;
      
      if (avgExecutionTime < currentTarget * 0.7) {
        // 実行時間が目標の70%未満なら目標を下げる
        const oldValue = currentTarget;
        const newValue = Math.max(avgExecutionTime * 1.2, 60000); // 最低1分
        
        this.config.performanceTargets.maxExecutionTime = newValue;
        adjustments.push({
          parameter: 'performanceTargets.maxExecutionTime',
          oldValue,
          newValue,
          reason: '実行時間の改善により目標を最適化',
          impact: 'positive'
        });
      }
    }

    // 文字数目標の調整
    const avgWordCount = data.summary.averageWordCount;
    const currentWordTarget = this.config.performanceTargets.targetWordCount;
    
    if (Math.abs(avgWordCount - currentWordTarget) > 500) {
      const oldValue = currentWordTarget;
      const newValue = Math.round((avgWordCount + currentWordTarget) / 2);
      
      this.config.performanceTargets.targetWordCount = newValue;
      adjustments.push({
        parameter: 'performanceTargets.targetWordCount',
        oldValue,
        newValue,
        reason: '実際の平均文字数に基づく目標調整',
        impact: 'neutral'
      });
    }

    return adjustments;
  }

  /**
   * 適応重みの調整
   */
  private adjustAdaptiveWeights(data: DashboardMetrics): TuningAdjustment[] {
    const adjustments: TuningAdjustment[] = [];

    // 成功率基準での重み調整
    if (data.summary.successRate < 90) {
      // 成功率が低い場合は信頼性重視
      const oldValue = this.config.adaptiveWeights.reliabilityWeight;
      const newValue = Math.min(oldValue + 0.1, 0.5);
      
      if (newValue !== oldValue) {
        this.config.adaptiveWeights.reliabilityWeight = newValue;
        this.config.adaptiveWeights.qualityWeight = Math.max(
          this.config.adaptiveWeights.qualityWeight - 0.05, 0.3
        );
        
        adjustments.push({
          parameter: 'adaptiveWeights.reliabilityWeight',
          oldValue,
          newValue,
          reason: '成功率低下により信頼性重視に調整',
          impact: 'positive'
        });
      }
    }

    // 品質トレンドに基づく調整
    const trendingCategories = data.categoryPerformance.filter(c => c.trending);
    if (trendingCategories.length > 0) {
      const oldValue = this.config.adaptiveWeights.trendWeight;
      const newValue = Math.min(oldValue + 0.05, 0.3);
      
      if (newValue !== oldValue) {
        this.config.adaptiveWeights.trendWeight = newValue;
        adjustments.push({
          parameter: 'adaptiveWeights.trendWeight',
          oldValue,
          newValue,
          reason: 'トレンディングカテゴリの成長によりトレンド重視に調整',
          impact: 'positive'
        });
      }
    }

    return adjustments;
  }

  /**
   * 推奨事項生成
   */
  private generateRecommendations(data: DashboardMetrics): TuningRecommendation[] {
    const recommendations: TuningRecommendation[] = [];

    // 低パフォーマンスメソッドの改善提案
    const lowPerformanceMethods = data.generationMethods.filter(
      method => method.recommendationScore < 70
    );
    
    lowPerformanceMethods.forEach(method => {
      recommendations.push({
        type: 'method',
        priority: 'high',
        action: `${method.method}メソッドの最適化またはA/Bテストでの除外を検討`,
        expectedImprovement: 15,
        confidence: 0.8,
        implementation: `A/Bテスト設定から${method.method}を除外、または専用最適化を実装`
      });
    });

    // カテゴリ特化の提案
    const underperformingCategories = data.categoryPerformance.filter(
      cat => cat.averageQuality < data.summary.averageQuality - 5
    );
    
    underperformingCategories.forEach(category => {
      recommendations.push({
        type: 'strategy',
        priority: 'medium',
        action: `${category.category}カテゴリの特化最適化を強化`,
        expectedImprovement: 10,
        confidence: 0.7,
        implementation: `category-optimizer.tsでの${category.category}特化設定を拡張`
      });
    });

    // 閾値調整の提案
    if (data.summary.averageQuality > this.config.qualityThresholds.excellent) {
      recommendations.push({
        type: 'threshold',
        priority: 'low',
        action: '優秀品質基準を上昇させてより高い品質を目指す',
        expectedImprovement: 5,
        confidence: 0.6,
        implementation: 'qualityThresholds.excellentを現在の平均品質+5に設定'
      });
    }

    // アラート基準での提案
    const highSeverityAlerts = data.alerts.filter(alert => alert.severity > 80);
    if (highSeverityAlerts.length > 0) {
      recommendations.push({
        type: 'parameter',
        priority: 'high',
        action: '高重要度アラートに対する予防的調整',
        expectedImprovement: 20,
        confidence: 0.9,
        implementation: '品質モニタリング基準の見直しとプロアクティブな改善'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * 期待改善値計算
   */
  private calculateExpectedImprovements(adjustments: TuningAdjustment[]): Record<string, number> {
    const improvements = {
      qualityScore: 0,
      executionTime: 0,
      successRate: 0,
      consistency: 0
    };

    adjustments.forEach(adj => {
      switch (adj.parameter) {
        case 'qualityThresholds.minimum':
        case 'qualityThresholds.target':
          improvements.qualityScore += adj.impact === 'positive' ? 3 : -2;
          improvements.consistency += 2;
          break;
        
        case 'performanceTargets.maxExecutionTime':
          improvements.executionTime += adj.impact === 'positive' ? -5 : 2; // 負の値は改善
          break;
        
        case 'adaptiveWeights.reliabilityWeight':
          improvements.successRate += 5;
          break;
        
        case 'adaptiveWeights.qualityWeight':
          improvements.qualityScore += 2;
          break;
      }
    });

    return improvements;
  }

  /**
   * 調整実行判定
   */
  private shouldPerformAdjustment(): boolean {
    const timeSinceLastAdjustment = Date.now() - this.lastAdjustment.getTime();
    return timeSinceLastAdjustment >= this.config.adjustmentInterval;
  }

  /**
   * 空の結果生成
   */
  private createEmptyResult(): TuningResult {
    return {
      adjustmentsMade: [],
      newConfig: { ...this.config },
      expectedImprovements: {},
      recommendations: [],
      timestamp: new Date().toISOString()
    };
  }

  /**
   * デフォルト設定取得
   */
  private getDefaultConfig(): AutoTuningConfig {
    return {
      enabled: true,
      adjustmentInterval: 24 * 60 * 60 * 1000, // 24時間
      qualityThresholds: {
        minimum: 55,
        target: 75,
        excellent: 85,
        adjustmentSensitivity: 2
      },
      performanceTargets: {
        maxExecutionTime: 300000, // 5分
        targetWordCount: 3500,
        successRateTarget: 90,
        trendReflectionTarget: 70
      },
      adaptiveWeights: {
        qualityWeight: 0.4,
        speedWeight: 0.2,
        reliabilityWeight: 0.25,
        trendWeight: 0.15
      }
    };
  }

  /**
   * 設定取得・更新
   */
  getConfig(): AutoTuningConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<AutoTuningConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('🔧 自動調整設定を更新しました');
  }

  /**
   * 調整履歴取得
   */
  getAdjustmentHistory(): TuningResult[] {
    return [...this.adjustmentHistory];
  }

  /**
   * レポート生成
   */
  generateTuningReport(): string {
    const recentAdjustment = this.adjustmentHistory[this.adjustmentHistory.length - 1];
    
    if (!recentAdjustment) {
      return '🤖 自動調整システムレポート\n\nまだ調整は実行されていません。';
    }

    const lines = [
      '🤖 自動調整システムレポート',
      '=' .repeat(40),
      '',
      `📅 最終調整: ${recentAdjustment.timestamp}`,
      `🔧 調整項目数: ${recentAdjustment.adjustmentsMade.length}`,
      `💡 推奨事項数: ${recentAdjustment.recommendations.length}`,
      '',
      '📊 実行された調整:',
      ...recentAdjustment.adjustmentsMade.map(adj => 
        `  • ${adj.parameter}: ${adj.oldValue} → ${adj.newValue} (${adj.reason})`
      ),
      '',
      '🎯 期待される改善:',
      ...Object.entries(recentAdjustment.expectedImprovements).map(([key, value]) => 
        `  • ${key}: ${value > 0 ? '+' : ''}${value}`
      ),
      '',
      '💡 高優先度推奨事項:',
      ...recentAdjustment.recommendations
        .filter(rec => rec.priority === 'high')
        .slice(0, 3)
        .map(rec => `  • ${rec.action} (改善期待値: ${rec.expectedImprovement}%)`)
    ];

    return lines.join('\n');
  }
}

/**
 * 自動調整システムの有効化・統合関数
 */
export function enableAutoTuning(
  dashboard: MonitoringDashboard,
  config?: Partial<AutoTuningConfig>
): AutoTuningSystem {
  const autoTuner = new AutoTuningSystem(dashboard, config);
  
  // 定期実行の設定（実際の運用では適切なスケジューラを使用）
  if (config?.enabled !== false) {
    console.log('🤖 自動調整システムが有効化されました');
  }
  
  return autoTuner;
}