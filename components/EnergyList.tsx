'use client';

import { useState } from 'react';
import { EnergyReading } from '@/lib/types';

interface EnergyListProps {
  readings: EnergyReading[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function EnergyList({ readings, onEdit, onDelete }: EnergyListProps) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get utility type display name and color
  const getUtilityInfo = (type: string) => {
    switch (type) {
      case 'electricity':
        return { label: 'Electricity', color: 'bg-yellow-100 text-yellow-800', unit: 'kWh' };
      case 'gas':
        return { label: 'Gas', color: 'bg-blue-100 text-blue-800', unit: 'm³' };
      case 'water':
        return { label: 'Water', color: 'bg-cyan-100 text-cyan-800', unit: 'L' };
      default:
        return { label: type, color: 'bg-gray-100 text-gray-800', unit: '' };
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (deleteConfirmId) {
      onDelete(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  // Empty state
  if (readings.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
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
        <h3 className="mt-2 text-sm font-medium text-gray-900">No energy readings</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by adding your first reading.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {readings.map((reading) => {
              const utilityInfo = getUtilityInfo(reading.type);
              return (
                <tr key={reading.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(reading.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${utilityInfo.color}`}>
                      {utilityInfo.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reading.usage.toFixed(2)} {utilityInfo.unit}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {reading.notes || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(reading.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(reading.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {readings.map((reading) => {
          const utilityInfo = getUtilityInfo(reading.type);
          return (
            <div key={reading.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{formatDate(reading.date)}</p>
                  <span className={`mt-1 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${utilityInfo.color}`}>
                    {utilityInfo.label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {reading.usage.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{utilityInfo.unit}</p>
                </div>
              </div>
              
              {reading.notes && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{reading.notes}</p>
              )}
              
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => onEdit(reading.id)}
                  className="min-h-[44px] flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 active:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(reading.id)}
                  className="min-h-[44px] flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 active:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 touch-manipulation"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete confirmation dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this energy reading? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="min-h-[44px] px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="min-h-[44px] px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 touch-manipulation"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
