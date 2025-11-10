# Supabase Setup Guide

This guide will walk you through setting up your Supabase backend for the Home Energy Tracker application.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create a new account
3. Click "New Project"
4. Fill in the project details:
   - **Project Name**: home-energy-tracker (or your preferred name)
   - **Database Password**: Choose a strong password (save this securely)
   - **Region**: Select the region closest to your users
   - **Pricing Plan**: Free tier is sufficient for development
5. Click "Create new project"
6. Wait for the project to be provisioned (this takes 1-2 minutes)

## Step 2: Obtain Project Credentials

1. Once your project is ready, go to **Project Settings** (gear icon in sidebar)
2. Navigate to **API** section
3. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")
4. Create a `.env.local` file in your project root (copy from `.env.local.example`)
5. Update the values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

## Step 3: Run Database Migration

### Option A: Using Supabase SQL Editor (Recommended for Quick Setup)

1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy the entire contents of `supabase/migrations/001_create_energy_readings.sql`
4. Paste it into the SQL editor
5. Click **Run** (or press Ctrl/Cmd + Enter)
6. Verify success: You should see "Success. No rows returned"

### Option B: Using Supabase CLI (For Production/Team Environments)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```
   (Find your project ref in Project Settings > General)

4. Push the migration:
   ```bash
   supabase db push
   ```

## Step 4: Configure Authentication

1. In your Supabase dashboard, go to **Authentication** in the left sidebar
2. Click on **Providers**
3. Ensure **Email** provider is enabled (it should be enabled by default)
4. Configure email settings:
   - Go to **Authentication** > **Email Templates**
   - Customize confirmation and password reset emails if desired
5. (Optional) Configure additional settings:
   - Go to **Authentication** > **Settings**
   - Set **Site URL** to your application URL (e.g., `http://localhost:3000` for development)
   - Configure **Redirect URLs** if needed

## Step 5: Verify Database Setup

1. Go to **Table Editor** in the Supabase dashboard
2. You should see the `energy_readings` table
3. Click on the table to view its structure
4. Verify the following:
   - ✅ Columns: id, user_id, date, type, usage, notes, created_at, updated_at
   - ✅ Indexes: idx_energy_readings_user_date, idx_energy_readings_user_type
   - ✅ RLS is enabled (look for the shield icon)

5. Check RLS Policies:
   - Click on the table
   - Go to the **Policies** tab
   - You should see 4 policies:
     - Users can view own readings
     - Users can insert own readings
     - Users can update own readings
     - Users can delete own readings

## Step 6: Test the Setup

You can test the database setup with a simple query in the SQL Editor:

```sql
-- This should return an empty result (no error)
SELECT * FROM energy_readings;

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'energy_readings';
-- Should return: rowsecurity = true

-- Check policies
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'energy_readings';
-- Should return 4 policies
```

## Troubleshooting

### Issue: "relation 'energy_readings' does not exist"
- **Solution**: Make sure you ran the migration SQL in Step 3

### Issue: "permission denied for table energy_readings"
- **Solution**: Verify RLS policies are created correctly. Re-run the migration if needed.

### Issue: "uuid-ossp extension does not exist"
- **Solution**: The migration should create it automatically. If not, run:
  ```sql
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  ```

### Issue: Authentication not working
- **Solution**: 
  - Verify your environment variables are correct
  - Check that email provider is enabled in Authentication > Providers
  - Ensure Site URL is configured correctly

## Next Steps

Once you've completed this setup:

1. ✅ Supabase project created
2. ✅ Credentials added to `.env.local`
3. ✅ Database migration executed
4. ✅ Authentication configured
5. ✅ Setup verified

You're ready to proceed with **Task 3: Create TypeScript type definitions and utility functions**!

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
