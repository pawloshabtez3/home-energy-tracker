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
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
              {value.toFixed(2)}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-500 flex-shrink-0">{unit}</p>
          </div>
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-2 sm:ml-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
