'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  icon?: ReactNode;
}

export default function StatCard({ title, value, unit, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">
              {value.toFixed(2)}
            </p>
            <p className="text-sm font-medium text-gray-500">{unit}</p>
          </div>
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
