# Supabase Database Configuration

This directory contains the database schema and setup instructions for the Home Energy Tracker application.

## Quick Start

1. **Read the setup guide**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
2. **Create Supabase project**: Sign up at [supabase.com](https://supabase.com)
3. **Run migration**: Execute `migrations/001_create_energy_readings.sql` in Supabase SQL Editor
4. **Configure environment**: Add credentials to `.env.local`

## Files

- `migrations/001_create_energy_readings.sql` - Database schema with tables, indexes, RLS policies, and triggers
- `SETUP_GUIDE.md` - Comprehensive setup instructions with troubleshooting

## Database Schema Overview

### Table: energy_readings

Stores user energy consumption data with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to auth.users |
| date | DATE | Reading date |
| type | TEXT | Utility type (electricity, gas, water) |
| usage | NUMERIC(10,2) | Usage amount |
| notes | TEXT | Optional notes |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### Security

- **Row Level Security (RLS)**: Enabled with policies ensuring users can only access their own data
- **Policies**: SELECT, INSERT, UPDATE, DELETE policies based on user_id
- **Constraints**: Type validation and positive usage checks

### Performance

- **Indexes**: 
  - `idx_energy_readings_user_date` on (user_id, date DESC)
  - `idx_energy_readings_user_type` on (user_id, type)
- **Triggers**: Automatic updated_at timestamp on row updates

## Authentication

Supabase Auth is configured for email/password authentication with:
- User registration
- Email confirmation
- Password reset
- Session management

## Next Steps

After completing the Supabase setup, proceed to implement:
- TypeScript type definitions (Task 3)
- Supabase client initialization (Task 4)
- CRUD operations (Task 5)
