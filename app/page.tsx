export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 lg:p-24">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Home Energy Tracker</h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 px-4">Welcome to your energy tracking dashboard</p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center px-4">
          <a
            href="/auth/login"
            className="min-h-[44px] inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation"
          >
            Log In
          </a>
          <a
            href="/auth/signup"
            className="min-h-[44px] inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-md hover:bg-blue-50 active:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation"
          >
            Sign Up
          </a>
        </div>
      </div>
    </main>
  );
}
