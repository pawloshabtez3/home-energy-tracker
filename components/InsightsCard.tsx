'use client';

import { useState } from 'react';

interface InsightsCardProps {
  insights: string | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export default function InsightsCard({ insights, loading, error, onRefresh }: InsightsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="min-h-[44px] w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors touch-manipulation"
          aria-label="Refresh insights"
        >
          {loading ? 'Generating...' : 'Refresh'}
        </button>
      </div>

      <div className="min-h-[150px] sm:min-h-[200px]">
        {loading && (
          <div className="flex flex-col items-center justify-center h-[150px] sm:h-[200px]">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xs sm:text-sm text-gray-600 px-4 text-center">Analyzing your energy usage...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-xs sm:text-sm font-medium text-red-800">Error generating insights</h4>
                <p className="mt-1 text-xs sm:text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {insights && !loading && !error && (
          <div className="prose prose-sm max-w-none">
            <div className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
              {insights}
            </div>
          </div>
        )}

        {!insights && !loading && !error && (
          <div className="flex flex-col items-center justify-center h-[150px] sm:h-[200px] text-center px-4">
            <svg className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">No insights generated yet</p>
            <p className="text-xs text-gray-500">Click "Refresh" to generate AI-powered insights</p>
          </div>
        )}
      </div>
    </div>
  );
}
