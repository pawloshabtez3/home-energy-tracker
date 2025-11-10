'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { EnergyReading } from '@/lib/types';

interface UseEnergyReadings {
  readings: EnergyReading[];
  loading: boolean;
  error: Error | null;
  addReading: (reading: Omit<EnergyReading, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateReading: (id: string, reading: Partial<Omit<EnergyReading, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => Promise<void>;
  deleteReading: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useEnergyReadings(): UseEnergyReadings {
  const [readings, setReadings] = useState<EnergyReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch readings from Supabase
  const fetchReadings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error: fetchError } = await supabase
        .from('energy_readings')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setReadings(data || []);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch readings');
      setError(error);
      console.error('Error fetching readings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchReadings();
  }, [fetchReadings]);

  // Add a new reading
  const addReading = async (reading: Omit<EnergyReading, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<void> => {
    try {
      // Validate date is not in the future
      const readingDate = new Date(reading.date);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      if (readingDate > today) {
        throw new Error('Date cannot be in the future');
      }

      // Validate usage is positive
      if (reading.usage <= 0) {
        throw new Error('Usage must be a positive number');
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error: insertError } = await supabase
        .from('energy_readings')
        .insert({
          user_id: user.id,
          date: reading.date,
          type: reading.type,
          usage: reading.usage,
          notes: reading.notes || null,
        });

      if (insertError) {
        throw insertError;
      }

      // Refetch to get the updated list
      await fetchReadings();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to add reading');
      setError(error);
      throw error;
    }
  };

  // Update an existing reading
  const updateReading = async (
    id: string,
    reading: Partial<Omit<EnergyReading, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
  ): Promise<void> => {
    try {
      // Validate date if provided
      if (reading.date) {
        const readingDate = new Date(reading.date);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        
        if (readingDate > today) {
          throw new Error('Date cannot be in the future');
        }
      }

      // Validate usage if provided
      if (reading.usage !== undefined && reading.usage <= 0) {
        throw new Error('Usage must be a positive number');
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Optimistic update
      setReadings(prevReadings =>
        prevReadings.map(r =>
          r.id === id ? { ...r, ...reading, updated_at: new Date().toISOString() } : r
        )
      );

      const { error: updateError } = await supabase
        .from('energy_readings')
        .update(reading)
        .eq('id', id)
        .eq('user_id', user.id);

      if (updateError) {
        // Revert optimistic update on error
        await fetchReadings();
        throw updateError;
      }

      // Refetch to ensure consistency
      await fetchReadings();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update reading');
      setError(error);
      throw error;
    }
  };

  // Delete a reading
  const deleteReading = async (id: string): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error: deleteError } = await supabase
        .from('energy_readings')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) {
        throw deleteError;
      }

      // Update local state
      setReadings(prevReadings => prevReadings.filter(r => r.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete reading');
      setError(error);
      throw error;
    }
  };

  // Refetch readings
  const refetch = async (): Promise<void> => {
    await fetchReadings();
  };

  return {
    readings,
    loading,
    error,
    addReading,
    updateReading,
    deleteReading,
    refetch,
  };
}
