# Implementation Plan

- [x] 1. Initialize Next.js project and configure dependencies





  - Create Next.js 14 project with App Router and TypeScript
  - Install and configure TailwindCSS
  - Install dependencies: @supabase/supabase-js, @google/generative-ai, recharts, react-hot-toast
  - Set up environment variables structure (.env.local.example)
  - Configure TypeScript with strict mode
  - _Requirements: All requirements depend on proper project setup_

- [x] 2. Set up Supabase backend and database schema





  - Create Supabase project and obtain credentials
  - Write and execute database migration for energy_readings table with proper constraints
  - Implement row-level security policies for SELECT, INSERT, UPDATE, DELETE operations
  - Create database indexes on user_id and date columns
  - Add trigger for updated_at timestamp automation
  - Configure Supabase Auth for email/password authentication
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.4, 3.1, 3.2, 3.3_

- [x] 3. Create TypeScript type definitions and utility functions





  - Define EnergyReading, User, DateRange, ChartDataPoint, Statistics, and AIInsights interfaces in lib/types.ts
  - Implement date formatting utilities (ISO string conversion, display formatting)
  - Create statistics calculation functions (total usage, average usage, period days)
  - Write data transformation functions for chart formatting
  - Implement input validation utilities (date validation, usage validation)
  - _Requirements: 2.2, 2.3, 4.4, 4.5_

- [x] 4. Implement Supabase client and authentication





- [x] 4.1 Create Supabase client initialization


  - Set up Supabase client in lib/supabaseClient.ts with environment variables
  - Configure client options for authentication persistence
  - _Requirements: 1.1, 1.2_

- [x] 4.2 Build useAuth custom hook


  - Implement user state management with Supabase Auth
  - Create signUp function with email/password validation
  - Create signIn function with error handling
  - Create signOut function with session cleanup
  - Handle authentication state changes and session persistence
  - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [x] 4.3 Create authentication UI components


  - Build AuthForm component with mode prop for login/signup
  - Implement form validation and error display
  - Add loading states during authentication
  - Create auth pages: /app/auth/login/page.tsx and /app/auth/signup/page.tsx
  - Implement redirect logic to dashboard on successful authentication
  - _Requirements: 1.1, 1.2, 1.4_

- [ ]* 4.4 Write authentication tests
  - Create unit tests for useAuth hook with mocked Supabase client
  - Test authentication flows: successful login, failed login, signup, logout
  - Test session persistence across page reloads
  - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [x] 5. Implement energy readings CRUD operations





- [x] 5.1 Create useEnergyReadings custom hook


  - Implement fetchReadings function with Supabase query
  - Create addReading function with validation and error handling
  - Create updateReading function with optimistic updates
  - Create deleteReading function with confirmation
  - Implement loading and error states
  - Add refetch functionality for data synchronization
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5_


- [x] 5.2 Build EnergyForm component

  - Create form with date picker, utility type dropdown, usage input, and notes textarea
  - Implement client-side validation (future date check, positive number check)
  - Add mode prop to handle both create and edit scenarios
  - Display inline validation errors
  - Handle form submission with loading state
  - _Requirements: 2.1, 2.2, 2.3, 2.5, 3.1_


- [x] 5.3 Build EnergyList component

  - Display energy readings in responsive table/card layout
  - Add edit and delete buttons for each reading
  - Implement delete confirmation dialog
  - Handle empty state when no readings exist
  - _Requirements: 3.1, 3.2, 3.3_

- [ ]* 5.4 Write CRUD operation tests
  - Test useEnergyReadings hook with mocked Supabase operations
  - Test EnergyForm validation logic and submission
  - Test EnergyList rendering and interaction handlers
  - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3_

- [x] 6. Implement data visualization and statistics





- [x] 6.1 Create Chart component with Recharts


  - Build responsive line/bar chart using Recharts library
  - Implement data filtering by utility type
  - Implement date range filtering
  - Add color coding for each utility type (electricity: yellow, gas: blue, water: cyan)
  - Configure responsive chart sizing and axis labels
  - Handle empty data state with appropriate message
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 6.2 Build StatCard component


  - Create reusable card component for displaying statistics
  - Add props for title, value, unit, and optional icon
  - Style with TailwindCSS for consistent appearance
  - _Requirements: 4.4, 4.5_

- [x] 6.3 Implement statistics calculations


  - Calculate total usage for each utility type within selected period
  - Calculate average daily usage for each utility type
  - Integrate calculations with StatCard components on dashboard
  - Update statistics when filters change
  - _Requirements: 4.4, 4.5_

- [ ]* 6.4 Write visualization tests
  - Test Chart component data transformation and filtering
  - Test StatCard rendering with various props
  - Test statistics calculation functions with sample data
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 7. Integrate Google Gemini AI for insights




- [x] 7.1 Set up Gemini API client


  - Create Gemini client initialization in lib/geminiClient.ts
  - Configure API key from environment variables
  - Implement error handling for API initialization
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 7.2 Create AI insights API route


  - Build /app/api/insights/route.ts with POST handler
  - Validate user authentication via Supabase JWT
  - Format energy readings data for Gemini prompt
  - Construct prompt requesting trend summary and three recommendations
  - Call Gemini API with structured prompt
  - Parse and format AI response
  - Implement timeout handling (10 second limit)
  - Add error handling for API failures
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 7.3 Build InsightsCard component


  - Create component to display AI-generated insights
  - Add loading spinner during API call
  - Implement refresh button to regenerate insights
  - Display error message when insights generation fails
  - Format insights text for readability
  - _Requirements: 5.2, 5.3, 5.4, 5.5_

- [ ]* 7.4 Write AI integration tests
  - Test Gemini API route with mocked API responses
  - Test InsightsCard loading and error states
  - Test prompt formatting with various data inputs
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 8. Build main dashboard page





  - Create /app/dashboard/page.tsx with protected route layout
  - Integrate Chart component with filter controls
  - Add date range picker and utility type filter dropdowns
  - Display StatCard components for total and average usage
  - Integrate EnergyForm for adding new readings
  - Integrate EnergyList for viewing and managing readings
  - Integrate InsightsCard for AI-generated recommendations
  - Implement data fetching and state management
  - Add loading states for initial data fetch
  - _Requirements: 2.1, 2.5, 3.1, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.4_

- [x] 9. Implement toast notifications





  - Set up react-hot-toast provider in root layout
  - Add success toast for create operations (3 second duration)
  - Add success toast for update operations (3 second duration)
  - Add success toast for delete operations (3 second duration)
  - Add error toast for failed operations with descriptive messages
  - Configure auto-dismiss after 5 seconds
  - Add manual close button to all toasts
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 10. Implement responsive design and mobile optimization





  - Configure TailwindCSS breakpoints for mobile (320px+), tablet (768px+), desktop (1024px+)
  - Make dashboard layout responsive with grid/flexbox
  - Ensure chart scales appropriately on all screen sizes
  - Make form inputs touch-friendly with minimum 44x44px tap targets
  - Optimize navigation for mobile with hamburger menu or bottom nav
  - Test text readability without horizontal scrolling
  - Ensure table/list view adapts to card layout on mobile
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 11. Add navigation and layout components
  - Create Navbar component with logo and user menu
  - Add sign out button in navigation
  - Create protected route layout in /app/dashboard/layout.tsx
  - Implement authentication check and redirect logic
  - Add landing page at /app/page.tsx with links to login/signup
  - Style navigation with TailwindCSS
  - _Requirements: 1.5_

- [ ] 12. Configure deployment and environment setup
  - Create .env.local.example with all required environment variables
  - Set up Vercel project and connect GitHub repository
  - Configure environment variables in Vercel dashboard (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, GEMINI_API_KEY)
  - Enable automatic deployments on main branch
  - Configure preview deployments for pull requests
  - Verify Supabase connection in production
  - Test authentication flow in deployed environment
  - Verify AI insights generation in production
  - _Requirements: All requirements must work in production environment_

- [ ]* 13. Create integration tests for critical user flows
  - Set up Playwright or Cypress for end-to-end testing
  - Write test for complete user journey: signup → add reading → view chart → get insights → logout
  - Write test for CRUD operations flow: create → edit → delete reading
  - Write test for filtering functionality with date range and utility type
  - Write test for error scenarios: invalid login, network failures
  - _Requirements: 1.1, 1.2, 2.1, 3.1, 3.2, 4.1, 5.1_
