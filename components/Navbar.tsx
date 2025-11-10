'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { showErrorToast } from '@/lib/toast';

export default function Navbar() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      showErrorToast('Failed to sign out');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              {/* Logo Icon */}
              <svg 
                className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
              <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">
                Home Energy Tracker
              </h1>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden sm:inline text-sm text-gray-600 truncate max-w-[150px] lg:max-w-none">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="min-h-[44px] min-w-[44px] px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-gray-100 touch-manipulation transition-colors"
              >
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden" aria-label="Sign out">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
