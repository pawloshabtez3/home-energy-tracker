'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { EnergyReading, DateRange } from '@/lib/types';
import { transformToChartData, filterByDateRange, filterByUtilityType } from '@/lib/utils';

interface ChartProps {
  data: EnergyReading[];
  type: 'line' | 'bar';
  utilityFilter?: 'electricity' | 'gas' | 'water' | 'all';
  dateRange?: DateRange;
}

export default function Chart({ data, type, utilityFilter = 'all', dateRange }: ChartProps) {
  // Apply filters to the data
  const filteredData = useMemo(() => {
    let filtered = data;

    // Filter by date range if provided
    if (dateRange) {
      filtered = filterByDateRange(filtered, dateRange);
    }

    // Filter by utility type if not 'all'
    if (utilityFilter !== 'all') {
      filtered = filterByUtilityType(filtered, utilityFilter);
    }

    return filtered;
  }, [data, dateRange, utilityFilter]);

  // Transform data for chart
  const chartData = useMemo(() => {
    return transformToChartData(filteredData);
  }, [filteredData]);

  // Format date for display on X-axis
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Empty state
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
          <p className="mt-1 text-sm text-gray-500">
            No data available for the selected period. Try adjusting your filters.
          </p>
        </div>
      </div>
    );
  }

  // Determine which utility types to show based on filter
  const showElectricity = utilityFilter === 'all' || utilityFilter === 'electricity';
  const showGas = utilityFilter === 'all' || utilityFilter === 'gas';
  const showWater = utilityFilter === 'all' || utilityFilter === 'water';

  // Common chart props
  const commonProps = {
    data: chartData,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg border border-gray-200">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'line' ? (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Usage', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px',
              }}
              labelFormatter={(label) => `Date: ${formatDate(label)}`}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {showElectricity && (
              <Line
                type="monotone"
                dataKey="electricity"
                stroke="#eab308"
                strokeWidth={2}
                dot={{ fill: '#eab308', r: 4 }}
                activeDot={{ r: 6 }}
                name="Electricity (kWh)"
              />
            )}
            {showGas && (
              <Line
                type="monotone"
                dataKey="gas"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Gas (m³)"
              />
            )}
            {showWater && (
              <Line
                type="monotone"
                dataKey="water"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: '#06b6d4', r: 4 }}
                activeDot={{ r: 6 }}
                name="Water (L)"
              />
            )}
          </LineChart>
        ) : (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Usage', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px',
              }}
              labelFormatter={(label) => `Date: ${formatDate(label)}`}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {showElectricity && (
              <Bar
                dataKey="electricity"
                fill="#eab308"
                name="Electricity (kWh)"
              />
            )}
            {showGas && (
              <Bar
                dataKey="gas"
                fill="#3b82f6"
                name="Gas (m³)"
              />
            )}
            {showWater && (
              <Bar
                dataKey="water"
                fill="#06b6d4"
                name="Water (L)"
              />
            )}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
