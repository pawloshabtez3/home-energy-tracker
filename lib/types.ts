// TypeScript type definitions for the Home Energy Usage Tracker

export interface EnergyReading {
  id: string;
  user_id: string;
  date: string; // ISO date string
  type: 'electricity' | 'gas' | 'water';
  usage: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface DateRange {
  start: string; // ISO date string
  end: string;   // ISO date string
}

export interface ChartDataPoint {
  date: string;
  electricity?: number;
  gas?: number;
  water?: number;
}

export interface Statistics {
  totalElectricity: number;
  totalGas: number;
  totalWater: number;
  avgElectricity: number;
  avgGas: number;
  avgWater: number;
  periodDays: number;
}

export interface AIInsights {
  summary: string;
  recommendations: string[];
  generatedAt: string;
}
