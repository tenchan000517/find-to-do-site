// src/lib/monitoring-dashboard.ts
// Phase 3: 監視ダッシュボード機能
// 品質メトリクスの可視化・トレンド分析

import { QualityMetrics } from './quality-validator';
import { ABTestResult } from './ab-test-generator';

// ダッシュボードデータ構造
export interface DashboardMetrics {
  summary: MetricsSummary;
  qualityTrends: QualityTrend[];
  categoryPerformance: CategoryPerformance[];
  generationMethods: MethodPerformance[];
  timeSeriesData: TimeSeriesData[];
  alerts: Alert[];
}

export interface MetricsSummary {
  totalArticles: number;
  averageQuality: number;
  successRate: number;
  averageWordCount: number;
  topCategory: string;
  topMethod: string;
  lastUpdated: string;
}

export interface QualityTrend {
  date: string;
  category: string;
  method: string;
  qualityScore: number;
  wordCount: number;
  executionTime: number;
}

export interface CategoryPerformance {
  category: string;
  articleCount: number;
  averageQuality: number;
  averageWordCount: number;
  successRate: number;
  topMethods: string[];
  trending: boolean;
}

export interface MethodPerformance {
  method: string;
  usageCount: number;
  averageQuality: number;
  averageExecutionTime: number;
  successRate: number;
  recommendationScore: number;
}

export interface TimeSeriesData {
  timestamp: string;
  qualityScore: number;
  wordCount: number;
  successRate: number;
  category: string;
  method: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  category?: string;
  method?: string;
  severity: number;
  timestamp: string;
  resolved: boolean;
}

// メトリクス管理クラス
export class MonitoringDashboard {
  private metricsHistory: QualityTrend[] = [];
  private abTestHistory: ABTestResult[] = [];
  private alertsHistory: Alert[] = [];

  /**
   * 新しいメトリクスを記録
   */
  recordMetrics(
    qualityMetrics: QualityMetrics,
    category: string,
    method: string,
    wordCount: number,
    executionTime: number
  ): void {
    const trend: QualityTrend = {
      date: new Date().toISOString(),
      category,
      method,
      qualityScore: qualityMetrics.overall,
      wordCount,
      executionTime
    };

    this.metricsHistory.push(trend);
    this.checkAlerts(trend);
    
    console.log(`📊 メトリクス記録: ${category}/${method} - 品質${qualityMetrics.overall}`);
  }

  /**
   * A/Bテスト結果を記録
   */
  recordABTestResult(result: ABTestResult): void {
    this.abTestHistory.push(result);
    
    // A/Bテスト結果からのアラート生成
    if (result.results.filter(r => r.success).length < result.results.length * 0.5) {
      this.generateAlert('warning', 'A/Bテストの成功率が低下しています', 'abtest', 70);
    }
    
    console.log(`📊 A/Bテスト結果記録: 勝者${result.winner}`);
  }

  /**
   * ダッシュボードデータ生成
   */
  generateDashboard(): DashboardMetrics {
    return {
      summary: this.generateSummary(),
      qualityTrends: this.getRecentTrends(30), // 30日分
      categoryPerformance: this.analyzeCategoryPerformance(),
      generationMethods: this.analyzeMethodPerformance(),
      timeSeriesData: this.generateTimeSeriesData(),
      alerts: this.getActiveAlerts()
    };
  }

  /**
   * サマリー生成
   */
  private generateSummary(): MetricsSummary {
    const recentMetrics = this.getRecentTrends(7); // 7日分
    
    if (recentMetrics.length === 0) {
      return {
        totalArticles: 0,
        averageQuality: 0,
        successRate: 0,
        averageWordCount: 0,
        topCategory: 'N/A',
        topMethod: 'N/A',
        lastUpdated: new Date().toISOString()
      };
    }

    const totalArticles = recentMetrics.length;
    const averageQuality = recentMetrics.reduce((sum, m) => sum + m.qualityScore, 0) / totalArticles;
    const averageWordCount = recentMetrics.reduce((sum, m) => sum + m.wordCount, 0) / totalArticles;
    
    // カテゴリ別集計
    const categoryCount = this.countByCategory(recentMetrics);
    const topCategory = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b, 'N/A'
    );
    
    // メソッド別集計
    const methodCount = this.countByMethod(recentMetrics);
    const topMethod = Object.keys(methodCount).reduce((a, b) => 
      methodCount[a] > methodCount[b] ? a : b, 'N/A'
    );

    return {
      totalArticles,
      averageQuality: Math.round(averageQuality * 100) / 100,
      successRate: 100, // 記録されたもの = 成功したもの
      averageWordCount: Math.round(averageWordCount),
      topCategory,
      topMethod,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * カテゴリパフォーマンス分析
   */
  private analyzeCategoryPerformance(): CategoryPerformance[] {
    const categoryGroups = this.groupByCategory(this.metricsHistory);
    
    return Object.entries(categoryGroups).map(([category, metrics]) => {
      const articleCount = metrics.length;
      const averageQuality = metrics.reduce((sum, m) => sum + m.qualityScore, 0) / articleCount;
      const averageWordCount = metrics.reduce((sum, m) => sum + m.wordCount, 0) / articleCount;
      
      // トップメソッド算出
      const methodCount = this.countByMethod(metrics);
      const topMethods = Object.entries(methodCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([method]) => method);
      
      // トレンド判定（最近7日間のパフォーマンス向上）
      const recentMetrics = metrics.filter(m => 
        new Date(m.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      );
      const oldMetrics = metrics.filter(m => 
        new Date(m.date) <= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      );
      
      const recentAvgQuality = recentMetrics.length > 0 ? 
        recentMetrics.reduce((sum, m) => sum + m.qualityScore, 0) / recentMetrics.length : 0;
      const oldAvgQuality = oldMetrics.length > 0 ? 
        oldMetrics.reduce((sum, m) => sum + m.qualityScore, 0) / oldMetrics.length : 0;
      
      const trending = recentAvgQuality > oldAvgQuality + 5; // 5ポイント以上の改善

      return {
        category,
        articleCount,
        averageQuality: Math.round(averageQuality * 100) / 100,
        averageWordCount: Math.round(averageWordCount),
        successRate: 100, // 記録されたもの = 成功したもの
        topMethods,
        trending
      };
    }).sort((a, b) => b.averageQuality - a.averageQuality);
  }

  /**
   * メソッドパフォーマンス分析
   */
  private analyzeMethodPerformance(): MethodPerformance[] {
    const methodGroups = this.groupByMethod(this.metricsHistory);
    
    return Object.entries(methodGroups).map(([method, metrics]) => {
      const usageCount = metrics.length;
      const averageQuality = metrics.reduce((sum, m) => sum + m.qualityScore, 0) / usageCount;
      const averageExecutionTime = metrics.reduce((sum, m) => sum + m.executionTime, 0) / usageCount;
      
      // 推奨スコア計算（品質 + 効率性）
      const qualityScore = Math.min(100, averageQuality);
      const efficiencyScore = Math.max(0, 100 - (averageExecutionTime / 300000) * 100); // 5分を基準
      const recommendationScore = (qualityScore * 0.7 + efficiencyScore * 0.3);

      return {
        method,
        usageCount,
        averageQuality: Math.round(averageQuality * 100) / 100,
        averageExecutionTime: Math.round(averageExecutionTime),
        successRate: 100, // 記録されたもの = 成功したもの
        recommendationScore: Math.round(recommendationScore * 100) / 100
      };
    }).sort((a, b) => b.recommendationScore - a.recommendationScore);
  }

  /**
   * 時系列データ生成
   */
  private generateTimeSeriesData(): TimeSeriesData[] {
    const last30Days = this.getRecentTrends(30);
    
    // 日別集計
    const dailyGroups = this.groupByDate(last30Days);
    
    return Object.entries(dailyGroups).map(([date, metrics]) => {
      const qualityScore = metrics.reduce((sum, m) => sum + m.qualityScore, 0) / metrics.length;
      const wordCount = metrics.reduce((sum, m) => sum + m.wordCount, 0) / metrics.length;
      const topCategory = Object.entries(this.countByCategory(metrics))
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
      const topMethod = Object.entries(this.countByMethod(metrics))
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
      
      return {
        timestamp: date,
        qualityScore: Math.round(qualityScore * 100) / 100,
        wordCount: Math.round(wordCount),
        successRate: 100,
        category: topCategory,
        method: topMethod
      };
    }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  /**
   * アラート確認
   */
  private checkAlerts(trend: QualityTrend): void {
    // 品質低下アラート
    if (trend.qualityScore < 50) {
      this.generateAlert('error', 
        `品質スコアが危険レベルです: ${trend.qualityScore} (${trend.category}/${trend.method})`,
        trend.category, 90
      );
    } else if (trend.qualityScore < 65) {
      this.generateAlert('warning', 
        `品質スコアが低下しています: ${trend.qualityScore} (${trend.category}/${trend.method})`,
        trend.category, 60
      );
    }

    // 実行時間アラート
    if (trend.executionTime > 300000) { // 5分以上
      this.generateAlert('warning', 
        `実行時間が長すぎます: ${Math.round(trend.executionTime/1000)}秒 (${trend.method})`,
        trend.category, 70
      );
    }

    // 文字数アラート
    if (trend.wordCount < 2000) {
      this.generateAlert('info', 
        `文字数が少なめです: ${trend.wordCount}文字 (${trend.category})`,
        trend.category, 30
      );
    }
  }

  /**
   * アラート生成
   */
  private generateAlert(
    type: Alert['type'], 
    message: string, 
    category?: string, 
    severity: number = 50
  ): void {
    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      category,
      severity,
      timestamp: new Date().toISOString(),
      resolved: false
    };

    this.alertsHistory.push(alert);
    console.log(`🚨 ${type.toUpperCase()}: ${message}`);
  }

  /**
   * アクティブアラート取得
   */
  private getActiveAlerts(): Alert[] {
    return this.alertsHistory
      .filter(alert => !alert.resolved)
      .sort((a, b) => b.severity - a.severity)
      .slice(0, 10); // 上位10件
  }

  /**
   * ユーティリティメソッド
   */
  private getRecentTrends(days: number): QualityTrend[] {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return this.metricsHistory.filter(m => new Date(m.date) > cutoffDate);
  }

  private groupByCategory(metrics: QualityTrend[]): Record<string, QualityTrend[]> {
    return metrics.reduce((groups, metric) => {
      const category = metric.category;
      if (!groups[category]) groups[category] = [];
      groups[category].push(metric);
      return groups;
    }, {} as Record<string, QualityTrend[]>);
  }

  private groupByMethod(metrics: QualityTrend[]): Record<string, QualityTrend[]> {
    return metrics.reduce((groups, metric) => {
      const method = metric.method;
      if (!groups[method]) groups[method] = [];
      groups[method].push(metric);
      return groups;
    }, {} as Record<string, QualityTrend[]>);
  }

  private groupByDate(metrics: QualityTrend[]): Record<string, QualityTrend[]> {
    return metrics.reduce((groups, metric) => {
      const date = metric.date.split('T')[0]; // YYYY-MM-DD
      if (!groups[date]) groups[date] = [];
      groups[date].push(metric);
      return groups;
    }, {} as Record<string, QualityTrend[]>);
  }

  private countByCategory(metrics: QualityTrend[]): Record<string, number> {
    return metrics.reduce((count, metric) => {
      count[metric.category] = (count[metric.category] || 0) + 1;
      return count;
    }, {} as Record<string, number>);
  }

  private countByMethod(metrics: QualityTrend[]): Record<string, number> {
    return metrics.reduce((count, metric) => {
      count[metric.method] = (count[metric.method] || 0) + 1;
      return count;
    }, {} as Record<string, number>);
  }

  /**
   * レポート生成
   */
  generateReport(): string {
    const dashboard = this.generateDashboard();
    
    const lines = [
      '📊 記事生成品質監視レポート',
      '=' .repeat(50),
      '',
      '📈 サマリー',
      `-  記事総数: ${dashboard.summary.totalArticles}`,
      `-  平均品質: ${dashboard.summary.averageQuality}/100`,
      `-  成功率: ${dashboard.summary.successRate}%`,
      `-  平均文字数: ${dashboard.summary.averageWordCount}`,
      `-  トップカテゴリ: ${dashboard.summary.topCategory}`,
      `-  トップメソッド: ${dashboard.summary.topMethod}`,
      '',
      '🏆 カテゴリパフォーマンス',
      ...dashboard.categoryPerformance.map(cat => 
        `-  ${cat.category}: 品質${cat.averageQuality} (${cat.articleCount}記事) ${cat.trending ? '📈' : ''}`
      ),
      '',
      '⚡ メソッドパフォーマンス',
      ...dashboard.generationMethods.map(method => 
        `-  ${method.method}: 推奨度${method.recommendationScore} (${method.usageCount}回使用)`
      ),
      '',
      '🚨 アクティブアラート',
      ...dashboard.alerts.slice(0, 5).map(alert => 
        `-  [${alert.type.toUpperCase()}] ${alert.message}`
      ),
      '',
      `最終更新: ${dashboard.summary.lastUpdated}`
    ];

    return lines.join('\n');
  }

  /**
   * CSV形式でメトリクスエクスポート
   */
  exportMetricsCSV(): string {
    const headers = ['日時', 'カテゴリ', 'メソッド', '品質スコア', '文字数', '実行時間'];
    const rows = this.metricsHistory.map(metric => [
      metric.date,
      metric.category,
      metric.method,
      metric.qualityScore.toString(),
      metric.wordCount.toString(),
      metric.executionTime.toString()
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}

// グローバルダッシュボードインスタンス
export const globalDashboard = new MonitoringDashboard();