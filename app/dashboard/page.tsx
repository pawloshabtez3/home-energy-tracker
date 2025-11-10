'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEnergyReadings } from '@/hooks/useEnergyReadings';
import Chart from '@/components/Chart';
import StatCard from '@/components/StatCard';
import EnergyForm from '@/components/EnergyForm';
import EnergyList from '@/components/EnergyList';
import InsightsCard from '@/components/InsightsCard';
import { EnergyReading, DateRange } from '@/lib/types';
import { calculateStatistics, filterByDateRange, toISODateString } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { readings, loading: readingsLoading, addReading, updateReading, deleteReading } = useEnergyReadings();

  // Filter states
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [utilityFilter, setUtilityFilter] = useState<'electricity' | 'gas' | 'water' | 'all'>('all');
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30); // Default to last 30 days
    return {
      start: toISODateString(start),
      end: toISODateString(end),
    };
  });

  // Edit mode state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingReading, setEditingReading] = useState<EnergyReading | undefined>(undefined);

  // AI Insights state
  const [insights, setInsights] = useState<string | null>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  // Filter readings based on date range
  const filteredReadings = useMemo(() => {
    return filterByDateRange(readings, dateRange);
  }, [readings, dateRange]);

  // Calculate statistics
  const statistics = useMemo(() => {
    return calculateStatistics(filteredReadings, dateRange);
  }, [filteredReadings, dateRange]);

  // Handle add reading
  const handleAddReading = async (reading: Omit<EnergyReading, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      await addReading(reading);
      toast.success('Energy reading added successfully', { duration: 3000 });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add reading');
      throw error;
    }
  };

  // Handle edit click
  const handleEdit = (id: string) => {
    const reading = readings.find(r => r.id === id);
    if (reading) {
      setEditingId(id);
      setEditingReading(reading);
      // Scroll to form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle update reading
  const handleUpdateReading = async (reading: Omit<EnergyReading, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!editingId) return;
    
    try {
      await updateReading(editingId, reading);
      toast.success('Energy reading updated successfully', { duration: 3000 });
      setEditingId(null);
      setEditingReading(undefined);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update reading');
      throw error;
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingReading(undefined);
  };

  // Handle delete reading
  const handleDelete = async (id: string) => {
    try {
      await deleteReading(id);
      toast.success('Energy reading deleted successfully', { duration: 3000 });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete reading');
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  // Fetch AI insights
  const fetchInsights = async () => {
    if (filteredReadings.length === 0) {
      toast.error('Add some energy readings first to get insights');
      return;
    }

    setInsightsLoading(true);
    setInsightsError(null);

    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ energyData: filteredReadings }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      const data = await response.json();
      setInsights(data.insights);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unable to generate insights. Please try again later.';
      setInsightsError(errorMessage);
      console.error('Error fetching insights:', error);
    } finally {
      setInsightsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Home Energy Tracker</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingId ? 'Edit Reading' : 'Add New Reading'}
              </h2>
              <EnergyForm
                onSubmit={editingId ? handleUpdateReading : handleAddReading}
                initialData={editingReading}
                mode={editingId ? 'edit' : 'create'}
                onCancel={editingId ? handleCancelEdit : undefined}
              />
            </div>
          </div>

          {/* Right Column - Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics Cards */}
            {readingsLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <StatCard
                    title="Total Electricity"
                    value={statistics.totalElectricity}
                    unit="kWh"
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    }
                  />
                  <StatCard
                    title="Total Gas"
                    value={statistics.totalGas}
                    unit="m³"
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      </svg>
                    }
                  />
                  <StatCard
                    title="Total Water"
                    value={statistics.totalWater}
                    unit="L"
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <StatCard
                    title="Avg Electricity"
                    value={statistics.avgElectricity}
                    unit="kWh/day"
                  />
                  <StatCard
                    title="Avg Gas"
                    value={statistics.avgGas}
                    unit="m³/day"
                  />
                  <StatCard
                    title="Avg Water"
                    value={statistics.avgWater}
                    unit="L/day"
                  />
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Energy Usage</h2>
                    
                    <div className="flex flex-wrap gap-3">
                      {/* Chart Type Toggle */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setChartType('line')}
                          className={`px-3 py-1 text-sm font-medium rounded-md ${
                            chartType === 'line'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Line
                        </button>
                        <button
                          onClick={() => setChartType('bar')}
                          className={`px-3 py-1 text-sm font-medium rounded-md ${
                            chartType === 'bar'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Bar
                        </button>
                      </div>

                      {/* Utility Filter */}
                      <select
                        value={utilityFilter}
                        onChange={(e) => setUtilityFilter(e.target.value as any)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Utilities</option>
                        <option value="electricity">Electricity</option>
                        <option value="gas">Gas</option>
                        <option value="water">Water</option>
                      </select>
                    </div>
                  </div>

                  {/* Date Range Filters */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="flex-1">
                      <label htmlFor="startDate" className="block text-xs font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="endDate" className="block text-xs font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <Chart
                    data={readings}
                    type={chartType}
                    utilityFilter={utilityFilter}
                    dateRange={dateRange}
                  />
                </div>

                {/* AI Insights */}
                <InsightsCard
                  insights={insights}
                  loading={insightsLoading}
                  error={insightsError}
                  onRefresh={fetchInsights}
                />

                {/* Energy Readings List */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Energy Readings</h2>
                  <EnergyList
                    readings={readings}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
