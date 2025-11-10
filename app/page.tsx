export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 lg:p-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 rounded-full p-4 shadow-lg">
              <svg 
                className="w-12 h-12 sm:w-16 sm:h-16 text-white" 
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
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Home Energy Tracker
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-700 px-4 max-w-2xl mx-auto">
            Track your household energy consumption across electricity, gas, and water. 
            Visualize trends, get AI-powered insights, and reduce your energy usage.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center px-4">
            <a
              href="/auth/login"
              className="min-h-[44px] inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation shadow-md hover:shadow-lg transition-all"
            >
              Log In
            </a>
            <a
              href="/auth/signup"
              className="min-h-[44px] inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 active:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation shadow-md hover:shadow-lg transition-all"
            >
              Sign Up
            </a>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Usage</h3>
              <p className="text-sm text-gray-600">
                Record daily energy readings for electricity, gas, and water
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visualize Trends</h3>
              <p className="text-sm text-gray-600">
                View interactive charts and statistics of your consumption patterns
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Insights</h3>
              <p className="text-sm text-gray-600">
                Get personalized recommendations to reduce your energy consumption
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
