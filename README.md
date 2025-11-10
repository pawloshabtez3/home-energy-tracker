# Home Energy Tracker

A Next.js web application for tracking and analyzing household energy consumption across electricity, gas, and water utilities.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS 3.x
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Google Gemini API
- **Charts**: Recharts
- **Notifications**: react-hot-toast

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase and Gemini API credentials

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
/app                 # Next.js App Router pages
/components          # React components
/lib                 # Utility functions and clients
/hooks               # Custom React hooks
```

## Environment Variables

See `.env.local.example` for required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `GEMINI_API_KEY` - Your Google Gemini API key

## Deployment

This application is designed to be deployed on Vercel with Supabase as the backend.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/home-energy-tracker)

### Manual Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

For a complete verification checklist, see [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md).

**Key Steps:**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy to production
4. Verify authentication, CRUD operations, and AI insights

### Supabase Setup

Before deploying, ensure your Supabase project is configured:
1. Run database migrations from `/supabase/migrations`
2. Enable Row Level Security policies
3. Configure authentication settings
4. Add your Vercel domain to allowed redirect URLs

See [supabase/SETUP_GUIDE.md](./supabase/SETUP_GUIDE.md) for detailed instructions.

## Features

- 🔐 Secure authentication with email/password
- 📊 Track energy usage for electricity, gas, and water
- 📈 Interactive charts and visualizations
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🤖 AI-powered insights and recommendations
- ✏️ Create, read, update, and delete energy readings
- 🔔 Toast notifications for user feedback
- 🎨 Modern UI with TailwindCSS

## License

MIT
