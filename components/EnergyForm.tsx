'use client';

import { useState, useEffect } from 'react';
import { EnergyReading } from '@/lib/types';

interface EnergyFormProps {
  onSubmit: (reading: Omit<EnergyReading, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  initialData?: EnergyReading;
  mode: 'create' | 'edit';
  onCancel?: () => void;
}

export default function EnergyForm({ onSubmit, initialData, mode, onCancel }: EnergyFormProps) {
  const [date, setDate] = useState('');
  const [type, setType] = useState<'electricity' | 'gas' | 'water'>('electricity');
  const [usage, setUsage] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    date?: string;
    usage?: string;
    submit?: string;
  }>({});

  // Initialize form with existing data in edit mode
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setDate(initialData.date);
      setType(initialData.type);
      setUsage(initialData.usage.toString());
      setNotes(initialData.notes || '');
    }
  }, [mode, initialData]);

  // Validate date field
  const validateDate = (dateValue: string): string | undefined => {
    if (!dateValue) {
      return 'Date is required';
    }

    const selectedDate = new Date(dateValue);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (selectedDate > today) {
      return 'Date cannot be in the future';
    }

    return undefined;
  };

  // Validate usage field
  const validateUsage = (usageValue: string): string | undefined => {
    if (!usageValue) {
      return 'Usage is required';
    }

    const usageNumber = parseFloat(usageValue);

    if (isNaN(usageNumber)) {
      return 'Usage must be a valid number';
    }

    if (usageNumber <= 0) {
      return 'Usage must be a positive number';
    }

    return undefined;
  };

  // Handle date change with validation
  const handleDateChange = (value: string) => {
    setDate(value);
    const error = validateDate(value);
    setErrors(prev => ({ ...prev, date: error }));
  };

  // Handle usage change with validation
  const handleUsageChange = (value: string) => {
    setUsage(value);
    const error = validateUsage(value);
    setErrors(prev => ({ ...prev, usage: error }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const dateError = validateDate(date);
    const usageError = validateUsage(usage);

    if (dateError || usageError) {
      setErrors({
        date: dateError,
        usage: usageError,
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await onSubmit({
        date,
        type,
        usage: parseFloat(usage),
        notes: notes.trim() || undefined,
      });

      // Reset form after successful submission in create mode
      if (mode === 'create') {
        setDate('');
        setType('electricity');
        setUsage('');
        setNotes('');
      }
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to save reading',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          className={`min-h-[44px] w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation ${
            errors.date ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date}</p>
        )}
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Utility Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as 'electricity' | 'gas' | 'water')}
          className="min-h-[44px] w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
          disabled={loading}
        >
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
          <option value="water">Water</option>
        </select>
      </div>

      <div>
        <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-1">
          Usage
        </label>
        <input
          type="number"
          id="usage"
          value={usage}
          onChange={(e) => handleUsageChange(e.target.value)}
          step="0.01"
          min="0"
          placeholder="Enter usage amount"
          className={`min-h-[44px] w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation ${
            errors.usage ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.usage && (
          <p className="mt-1 text-sm text-red-600">{errors.usage}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {type === 'electricity' && 'kWh'}
          {type === 'gas' && 'cubic meters'}
          {type === 'water' && 'liters'}
        </p>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Add any additional notes..."
          className="min-h-[88px] w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
          disabled={loading}
        />
      </div>

      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="min-h-[44px] flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Add Reading' : 'Update Reading'}
        </button>
        {mode === 'edit' && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="min-h-[44px] px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
