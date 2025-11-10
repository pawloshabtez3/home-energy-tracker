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

See `.env.local.example` for required environment variables.
