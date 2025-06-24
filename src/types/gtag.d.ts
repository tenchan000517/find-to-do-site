// Google Analytics gtag type definitions
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        [key: string]: any;
        currency?: string;
        value?: number;
        items?: Array<{
          item_id?: string;
          item_name?: string;
          item_category?: string;
          price?: number;
          [key: string]: any;
        }>;
        event_category?: string;
        event_label?: string;
        outbound?: boolean;
      }
    ) => void;
    dataLayer: any[];
  }
}

export {};