# Deployment Verification Checklist

Use this checklist to verify your deployment is working correctly.

## Pre-Deployment

- [ ] All environment variables are documented in `.env.local.example`
- [ ] Local development environment is working
- [ ] All tests pass locally
- [ ] Code is committed to GitHub repository
- [ ] Supabase project is set up with database schema
- [ ] Supabase RLS policies are enabled
- [ ] Google Gemini API key is obtained

## Vercel Setup

- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Project imported successfully
- [ ] Framework preset detected as Next.js
- [ ] Build settings are correct (default Next.js settings)

## Environment Variables Configuration

- [ ] `NEXT_PUBLIC_SUPABASE_URL` added to Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added to Vercel
- [ ] `GEMINI_API_KEY` added to Vercel
- [ ] All variables set for Production environment
- [ ] All variables set for Preview environment
- [ ] All variables set for Development environment

## Deployment Configuration

- [ ] Production branch set to `main`
- [ ] Automatic deployments enabled
- [ ] Preview deployments enabled for pull requests
- [ ] Build command: `next build` (default)
- [ ] Output directory: `.next` (default)
- [ ] Node.js version compatible (18.x or higher)

## Initial Deployment

- [ ] First deployment triggered successfully
- [ ] Build completed without errors
- [ ] Deployment URL is accessible
- [ ] Application loads without errors
- [ ] No console errors in browser DevTools

## Supabase Connection Verification

- [ ] Application can connect to Supabase
- [ ] No CORS errors in browser console
- [ ] Supabase client initializes correctly
- [ ] Database queries work from production
- [ ] Vercel domain added to Supabase allowed URLs (if needed)

## Authentication Flow Testing

### Sign Up
- [ ] Navigate to `/auth/signup`
- [ ] Form renders correctly
- [ ] Can enter email and password
- [ ] Submit button works
- [ ] Account creation succeeds
- [ ] User appears in Supabase Auth dashboard
- [ ] Redirects to dashboard after signup
- [ ] Success toast notification appears

### Sign In
- [ ] Navigate to `/auth/login`
- [ ] Form renders correctly
- [ ] Can enter credentials
- [ ] Login succeeds with valid credentials
- [ ] Login fails with invalid credentials
- [ ] Error message displays for invalid credentials
- [ ] Redirects to dashboard after login
- [ ] Success toast notification appears

### Session Management
- [ ] User remains logged in after page refresh
- [ ] User remains logged in when navigating between pages
- [ ] Session persists across browser tabs
- [ ] Sign out button works
- [ ] User redirected to home after sign out
- [ ] Cannot access dashboard when logged out

### Protected Routes
- [ ] Dashboard requires authentication
- [ ] Unauthenticated users redirected to login
- [ ] Authenticated users can access dashboard
- [ ] Auth state loads correctly on page load

## CRUD Operations Testing

### Create Energy Reading
- [ ] Energy form renders on dashboard
- [ ] Date picker works correctly
- [ ] Utility type dropdown has all options (electricity, gas, water)
- [ ] Usage input accepts numeric values
- [ ] Notes textarea works (optional field)
- [ ] Form validation works (future dates rejected)
- [ ] Form validation works (negative values rejected)
- [ ] Submit button works
- [ ] Reading saves to database
- [ ] Success toast appears
- [ ] Reading appears in list immediately
- [ ] Reading visible in Supabase table editor

### Read Energy Readings
- [ ] Energy list displays all user's readings
- [ ] Readings sorted correctly (by date)
- [ ] All fields display correctly (date, type, usage, notes)
- [ ] Empty state shows when no readings exist
- [ ] Only user's own readings are visible (RLS working)
- [ ] List updates when new reading added

### Update Energy Reading
- [ ] Edit button appears for each reading
- [ ] Click edit populates form with existing data
- [ ] Can modify all fields
- [ ] Validation works on update
- [ ] Save button works
- [ ] Reading updates in database
- [ ] Success toast appears
- [ ] Updated values display in list
- [ ] Changes visible in Supabase table editor

### Delete Energy Reading
- [ ] Delete button appears for each reading
- [ ] Click delete shows confirmation dialog
- [ ] Can cancel deletion
- [ ] Confirm deletion removes reading
- [ ] Reading deleted from database
- [ ] Success toast appears
- [ ] Reading removed from list
- [ ] Deletion visible in Supabase table editor

## Data Visualization Testing

### Chart Component
- [ ] Chart renders on dashboard
- [ ] Chart displays energy data correctly
- [ ] Line/bar chart shows usage over time
- [ ] Chart is responsive (resizes with viewport)
- [ ] Chart colors match utility types
  - [ ] Electricity: yellow
  - [ ] Gas: blue
  - [ ] Water: cyan
- [ ] Chart axes labeled correctly
- [ ] Chart tooltip shows data on hover
- [ ] Empty state shows when no data

### Filtering
- [ ] Utility type filter dropdown works
- [ ] Selecting utility type filters chart data
- [ ] Date range picker works
- [ ] Selecting date range filters chart data
- [ ] Filters can be combined
- [ ] Filters update chart in real-time
- [ ] "All" option shows all utility types

### Statistics Cards
- [ ] Total usage cards display for each utility type
- [ ] Average usage cards display for each utility type
- [ ] Statistics calculate correctly
- [ ] Statistics update when filters change
- [ ] Statistics update when data changes
- [ ] Units display correctly (kWh, m³, L)

## AI Insights Testing

### Insights Generation
- [ ] Insights card renders on dashboard
- [ ] "Generate Insights" button works
- [ ] Loading spinner appears during generation
- [ ] Insights load within 10 seconds
- [ ] Summary text displays correctly
- [ ] Recommendations display correctly (at least 3)
- [ ] Insights are relevant to user's data
- [ ] Refresh button regenerates insights

### Error Handling
- [ ] Error message displays if insights fail
- [ ] Can retry after error
- [ ] Application doesn't crash on AI error
- [ ] Timeout handled gracefully (>10s)

### API Route
- [ ] `/api/insights` endpoint accessible
- [ ] Endpoint requires authentication
- [ ] Unauthenticated requests return 401
- [ ] Valid requests return insights
- [ ] Gemini API key works in production
- [ ] No API key exposed to client
- [ ] Function logs show no errors

## Responsive Design Testing

### Mobile (375px)
- [ ] Layout adapts to mobile viewport
- [ ] All content visible without horizontal scroll
- [ ] Navigation works on mobile
- [ ] Forms are usable with touch
- [ ] Buttons have adequate tap targets (44x44px)
- [ ] Chart scales to mobile width
- [ ] Table/list converts to card layout
- [ ] Text is readable without zooming

### Tablet (768px)
- [ ] Layout adapts to tablet viewport
- [ ] Navigation optimized for tablet
- [ ] Forms are well-spaced
- [ ] Chart displays appropriately
- [ ] All features accessible

### Desktop (1920px)
- [ ] Layout uses available space effectively
- [ ] Content not stretched awkwardly
- [ ] Chart displays at optimal size
- [ ] Navigation positioned correctly
- [ ] All features accessible

## Toast Notifications Testing

- [ ] Success toast on create operation (3s duration)
- [ ] Success toast on update operation (3s duration)
- [ ] Success toast on delete operation (3s duration)
- [ ] Error toast on failed operations
- [ ] Error messages are descriptive
- [ ] Toasts auto-dismiss after 5 seconds
- [ ] Manual close button works
- [ ] Multiple toasts stack correctly
- [ ] Toasts don't block important UI

## Performance Testing

- [ ] Initial page load < 3 seconds
- [ ] Dashboard loads < 2 seconds after auth
- [ ] Chart renders < 1 second
- [ ] Form submissions feel instant
- [ ] No layout shift during load
- [ ] Images optimized (if any)
- [ ] No unnecessary re-renders
- [ ] Smooth scrolling and interactions

## Security Verification

- [ ] Environment variables not exposed in client code
- [ ] API keys not visible in browser DevTools
- [ ] RLS policies prevent cross-user data access
- [ ] Authentication required for protected routes
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] No sensitive data in URL parameters
- [ ] No sensitive data in console logs
- [ ] CORS configured correctly
- [ ] Security headers set (check vercel.json)

## Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Error Handling

- [ ] 404 page displays for invalid routes
- [ ] Network errors handled gracefully
- [ ] Database errors show user-friendly messages
- [ ] API errors don't crash application
- [ ] Form validation errors display clearly
- [ ] Authentication errors handled properly

## Monitoring & Logs

- [ ] Vercel deployment logs accessible
- [ ] Function logs show no errors
- [ ] Build logs show no warnings
- [ ] Browser console shows no errors
- [ ] No memory leaks detected
- [ ] Consider enabling Vercel Analytics

## Post-Deployment

- [ ] Production URL shared with stakeholders
- [ ] Documentation updated with production URL
- [ ] Monitoring set up (optional)
- [ ] Backup strategy in place (Supabase handles this)
- [ ] Rollback plan documented
- [ ] Team has access to Vercel project
- [ ] Team has access to Supabase project

## Continuous Deployment

- [ ] Push to `main` triggers production deployment
- [ ] Pull requests create preview deployments
- [ ] Preview URLs accessible
- [ ] Failed builds prevent deployment
- [ ] Deployment notifications configured (optional)

## Final Verification

- [ ] All requirements from requirements.md are met
- [ ] All features from design.md are implemented
- [ ] All tasks from tasks.md are complete
- [ ] Application works end-to-end in production
- [ ] No critical bugs identified
- [ ] Performance is acceptable
- [ ] Security measures in place
- [ ] Ready for users

## Notes

Use this space to document any issues found or special configurations needed:

---

**Deployment Date:** _______________

**Deployed By:** _______________

**Production URL:** _______________

**Issues Found:** 

---

**Sign-off:** _______________
