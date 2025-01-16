declare module 'web-vitals' {
    export function onCLS(callback: (metric: MetricType) => void): void;
    export function onINP(callback: (metric: MetricType) => void): void;
    export function onFCP(callback: (metric: MetricType) => void): void;
    export function onLCP(callback: (metric: MetricType) => void): void;
    export function onTTFB(callback: (metric: MetricType) => void): void;
  
    export interface MetricType {
      id: string;
      value: number;
      entryType: string;
    }
}


  