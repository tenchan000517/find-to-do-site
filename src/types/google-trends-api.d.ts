declare module 'google-trends-api' {
    export function interestOverTime(options: any): Promise<string>;
    export function interestByRegion(options: any): Promise<string>;
    export function relatedQueries(options: any): Promise<string>;
    export function relatedTopics(options: any): Promise<string>;
    export function dailyTrends(options: {
      trendDate?: Date;
      geo?: string;
      hl?: string;
      timezone?: number;
      category?: number;
    }): Promise<string>;
    export function realTimeTrends(options: any): Promise<string>;
  }