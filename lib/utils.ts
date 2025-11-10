// Utility functions for the Home Energy Usage Tracker

import { EnergyReading, ChartDataPoint, Statistics, DateRange } from './types';

// ============================================================================
// Date Formatting Utilities
// ============================================================================

/**
 * Converts a Date object to an ISO date string (YYYY-MM-DD)
 */
export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Formats an ISO date string for display (e.g., "Jan 15, 2024")
 */
export function formatDateForDisplay(isoDateString: string): string {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Formats an ISO date string for input fields (YYYY-MM-DD)
 */
export function formatDateForInput(isoDateString: string): string {
  return isoDateString.split('T')[0];
}

// ============================================================================
// Statistics Calculation Functions
// ============================================================================

/**
 * Calculates total usage for a specific utility type
 */
export function calculateTotalUsage(
  readings: EnergyReading[],
  utilityType: 'electricity' | 'gas' | 'water'
): number {
  return readings
    .filter((reading) => reading.type === utilityType)
    .reduce((sum, reading) => sum + reading.usage, 0);
}

/**
 * Calculates average daily usage for a specific utility type
 */
export function calculateAverageUsage(
  readings: EnergyReading[],
  utilityType: 'electricity' | 'gas' | 'water',
  periodDays: number
): number {
  if (periodDays === 0) return 0;
  const total = calculateTotalUsage(readings, utilityType);
  return total / periodDays;
}

/**
 * Calculates the number of days in a date range
 */
export function calculatePeriodDays(dateRange: DateRange): number {
  const start = new Date(dateRange.start);
  const end = new Date(dateRange.end);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end dates
}

/**
 * Calculates comprehensive statistics for all utility types
 */
export function calculateStatistics(
  readings: EnergyReading[],
  dateRange: DateRange
): Statistics {
  const periodDays = calculatePeriodDays(dateRange);

  return {
    totalElectricity: calculateTotalUsage(readings, 'electricity'),
    totalGas: calculateTotalUsage(readings, 'gas'),
    totalWater: calculateTotalUsage(readings, 'water'),
    avgElectricity: calculateAverageUsage(readings, 'electricity', periodDays),
    avgGas: calculateAverageUsage(readings, 'gas', periodDays),
    avgWater: calculateAverageUsage(readings, 'water', periodDays),
    periodDays,
  };
}

// ============================================================================
// Data Transformation Functions
// ============================================================================

/**
 * Transforms energy readings into chart data points
 * Groups readings by date and organizes by utility type
 */
export function transformToChartData(readings: EnergyReading[]): ChartDataPoint[] {
  // Group readings by date
  const groupedByDate = readings.reduce((acc, reading) => {
    const date = reading.date;
    if (!acc[date]) {
      acc[date] = { date };
    }
    acc[date][reading.type] = reading.usage;
    return acc;
  }, {} as Record<string, ChartDataPoint>);

  // Convert to array and sort by date
  return Object.values(groupedByDate).sort((a, b) => 
    a.date.localeCompare(b.date)
  );
}

/**
 * Filters readings by date range
 */
export function filterByDateRange(
  readings: EnergyReading[],
  dateRange: DateRange
): EnergyReading[] {
  return readings.filter((reading) => {
    const readingDate = reading.date;
    return readingDate >= dateRange.start && readingDate <= dateRange.end;
  });
}

/**
 * Filters readings by utility type
 */
export function filterByUtilityType(
  readings: EnergyReading[],
  utilityType: 'electricity' | 'gas' | 'water' | 'all'
): EnergyReading[] {
  if (utilityType === 'all') return readings;
  return readings.filter((reading) => reading.type === utilityType);
}

// ============================================================================
// Input Validation Utilities
// ============================================================================

/**
 * Validates that a date is not in the future
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today
  return date <= today;
}

/**
 * Validates that usage value is positive
 */
export function isValidUsage(usage: number): boolean {
  return usage > 0 && !isNaN(usage) && isFinite(usage);
}

/**
 * Validates an energy reading object
 */
export function validateEnergyReading(reading: {
  date: string;
  type: string;
  usage: number;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!reading.date) {
    errors.push('Date is required');
  } else if (!isValidDate(reading.date)) {
    errors.push('Date cannot be in the future');
  }

  if (!reading.type || !['electricity', 'gas', 'water'].includes(reading.type)) {
    errors.push('Valid utility type is required (electricity, gas, or water)');
  }

  if (reading.usage === undefined || reading.usage === null) {
    errors.push('Usage value is required');
  } else if (!isValidUsage(reading.usage)) {
    errors.push('Usage must be a positive number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
