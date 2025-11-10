# Deployment Guide

This guide walks you through deploying the Home Energy Usage Tracker to Vercel.

## Prerequisites

- GitHub account with this repository
- Vercel account (sign up at https://vercel.com)
- Supabase project with database configured
- Google Gemini API key

## Environment Variables

The application requires the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

You can find these values:
- **Supabase URL & Anon Key**: Supabase Dashboard → Project Settings → API
- **Gemini API Key**: Google AI Studio (https://makersuite.google.com/app/apikey)

## Vercel Deployment Steps

### 1. Connect GitHub Repository

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account and this repository
4. Click "Import"

### 2. Configure Project Settings

1. **Framework Preset**: Next.js (should be auto-detected)
2. **Root Directory**: Leave as default (.)
3. **Build Command**: Leave as default (`next build`)
4. **Output Directory**: Leave as default (`.next`)

### 3. Add Environment Variables

In the Vercel project configuration:

1. Click "Environment Variables"
2. Add each variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase project URL
   - Environment: Production, Preview, Development (select all)
   
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Your Supabase anonymous key
   - Environment: Production, Preview, Development (select all)
   
   - Name: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key
   - Environment: Production, Preview, Development (select all)

3. Click "Deploy"

### 4. Enable Automatic Deployments

Automatic deployments are enabled by default:
- **Production**: Pushes to `main` branch trigger production deployments
- **Preview**: Pull requests and pushes to other branches create preview deployments

To verify or modify:
1. Go to Project Settings → Git
2. Ensure "Production Branch" is set to `main`
3. Ensure "Automatic Deployments" is enabled

### 5. Configure Preview Deployments

Preview deployments are automatically enabled for:
- All pull requests
- All branches (optional, can be disabled)

To configure:
1. Go to Project Settings → Git
2. Under "Ignored Build Step", you can add conditions to skip builds
3. Preview deployments use the same environment variables as production

## Post-Deployment Verification

### 1. Verify Supabase Connection

1. Open your deployed application URL
2. Navigate to the signup page
3. Create a test account
4. Verify you can log in successfully
5. Check Supabase Dashboard → Authentication → Users to confirm the user was created

### 2. Test Authentication Flow

1. **Sign Up**:
   - Go to `/auth/signup`
   - Enter email and password
   - Verify successful account creation
   - Confirm redirect to dashboard

2. **Sign In**:
   - Log out
   - Go to `/auth/login`
   - Enter credentials
   - Verify successful login
   - Confirm redirect to dashboard

3. **Session Persistence**:
   - Refresh the page
   - Verify you remain logged in
   - Navigate between pages
   - Confirm session is maintained

### 3. Test CRUD Operations

1. **Create Reading**:
   - Fill out the energy form
   - Submit a new reading
   - Verify success toast appears
   - Confirm reading appears in the list

2. **Update Reading**:
   - Click edit on a reading
   - Modify values
   - Save changes
   - Verify success toast and updated values

3. **Delete Reading**:
   - Click delete on a reading
   - Confirm deletion
   - Verify success toast and reading removed

4. **Verify in Database**:
   - Check Supabase Dashboard → Table Editor → energy_readings
   - Confirm operations are reflected in the database

### 4. Verify AI Insights Generation

1. Add several energy readings (at least 5-10 for meaningful insights)
2. Scroll to the Insights section on the dashboard
3. Click "Generate Insights" or wait for automatic generation
4. Verify:
   - Loading spinner appears
   - Insights load within 10 seconds
   - Summary and recommendations are displayed
   - Content is relevant to your data

5. Test error handling:
   - If insights fail, verify error message is displayed
   - Click refresh to retry

### 5. Test Responsive Design

1. Open browser DevTools
2. Test on different viewport sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
3. Verify:
   - Layout adapts appropriately
   - All elements are accessible
   - No horizontal scrolling
   - Touch targets are adequate on mobile

### 6. Monitor Deployment

1. Go to Vercel Dashboard → Your Project → Deployments
2. Check deployment logs for any errors
3. Monitor function logs for runtime errors
4. Set up Vercel Analytics (optional) for performance monitoring

## Troubleshooting

### Build Failures

- Check Vercel build logs for specific errors
- Verify all dependencies are in package.json
- Ensure TypeScript types are correct
- Check for missing environment variables

### Authentication Issues

- Verify Supabase URL and keys are correct
- Check Supabase Dashboard → Authentication → URL Configuration
- Add your Vercel domain to Supabase allowed redirect URLs
- Verify RLS policies are enabled

### AI Insights Not Working

- Verify GEMINI_API_KEY is set correctly
- Check API key has proper permissions in Google AI Studio
- Review Vercel function logs for API errors
- Verify API quota hasn't been exceeded

### Database Connection Issues

- Verify Supabase project is active
- Check database connection pooling settings
- Verify RLS policies allow authenticated users to access data
- Test connection from Supabase SQL Editor

## Updating Environment Variables

To update environment variables after deployment:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find the variable to update
3. Click the three dots → Edit
4. Update the value
5. Click "Save"
6. Redeploy the application for changes to take effect

## Rollback

If a deployment has issues:

1. Go to Vercel Dashboard → Your Project → Deployments
2. Find the last working deployment
3. Click the three dots → Promote to Production
4. Confirm the rollback

## Custom Domain (Optional)

To add a custom domain:

1. Go to Project Settings → Domains
2. Enter your domain name
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)
5. Verify SSL certificate is issued automatically

## Continuous Integration

The project is configured for CI/CD:
- Every push to `main` deploys to production
- Every PR creates a preview deployment
- Preview URL is automatically commented on PRs
- Failed builds prevent deployment

## Security Checklist

- [ ] Environment variables are set in Vercel (not in code)
- [ ] Supabase RLS policies are enabled
- [ ] API keys are kept secret (not exposed to client)
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Allowed redirect URLs are configured in Supabase
- [ ] CORS settings are properly configured

## Performance Monitoring

Consider enabling:
- Vercel Analytics for performance metrics
- Vercel Speed Insights for Core Web Vitals
- Supabase Dashboard for database query performance
- Error tracking service (Sentry, LogRocket, etc.)

## Support

- Vercel Documentation: https://vercel.com/docs
- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Project Issues: [Your GitHub Repository]/issues
