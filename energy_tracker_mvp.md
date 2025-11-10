## ⚡ MVP Prompt: Home Energy Usage Tracker (Next.js + Supabase + Google Gemini)

**Goal:**  
Build a clean, responsive web app that helps users track their home energy consumption (electricity, gas, water) and get AI-powered insights using Google Gemini.

**Stack:**  
- **Frontend:** Next.js 14 (App Router, React, TailwindCSS, Recharts for charts)  
- **Backend:** Supabase (PostgreSQL + Auth + Storage)  
- **AI Layer:** Google Gemini API (for generating insights and recommendations)  
- **Deployment:** Vercel (frontend) + Supabase hosted backend  

---

### 🧩 Core MVP Features

1. **Authentication**
   - Sign up / log in with Supabase Auth (email + password)
   - Each user’s data is private (row-level security in Supabase)

2. **Data Entry (CRUD)**
   - Add daily/weekly readings for electricity, gas, and water  
   - Each record: `{ date, type, usage_kwh (or liters), notes }`  
   - Edit & delete entries

3. **Dashboard / Visualization**
   - Display a line or bar chart showing usage over time (by category)  
   - Filter by date range and energy type  
   - Calculate total usage and average usage

4. **AI Insights (Google Gemini)**
   - Summarize the user’s energy trends with short natural-language feedback  
     Example:  
     > "Your electricity usage increased by 12% this month. Try switching off idle devices to save energy."
   - Generate personalized energy-saving recommendations based on the past month’s data.

5. **UI/UX**
   - Minimal dashboard layout with TailwindCSS  
   - Responsive mobile/tablet design  
   - Toast notifications for CRUD actions (e.g. react-hot-toast)

---

### 🧠 Stretch Goals
- CSV import/export of readings  
- Estimated cost field using per-unit price  
- Weekly email summary via Supabase Edge Functions + Resend API  
- Regional comparison using open energy APIs  
- Dark/light mode toggle  

---

### 📁 Project Structure
```
/app
 ├─ /auth      → login/signup pages
 ├─ /dashboard → charts, insights, data entry
 ├─ /api       → AI route to call Google Gemini API
/lib
 ├─ supabaseClient.ts
 ├─ geminiClient.ts
/components
 ├─ Chart.tsx
 ├─ EnergyForm.tsx
 ├─ StatCard.tsx
 ├─ InsightsCard.tsx
```

---

### 🧰 Example Supabase Table: `energy_readings`
| id | user_id | date | type | usage | notes | created_at |
|----|----------|------|------|--------|--------|-------------|
| uuid | uuid | date | text (“electricity/gas/water”) | numeric | text | timestamptz |

```sql
create table energy_readings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  date date not null,
  type text check (type in ('electricity','gas','water')),
  usage numeric not null,
  notes text,
  created_at timestamp with time zone default now()
);
```

---

### ⚙️ Example AI Route (/api/insights/route.ts)
```ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  const { energyData } = await req.json();
  const model = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `Analyze the following household energy usage data and provide:
  1. A short summary of recent trends.
  2. Three specific, friendly recommendations for reducing energy usage.
  \n\nData:\n${JSON.stringify(energyData)}`;

  const result = await model.generateText({ model: 'gemini-pro', prompt });
  return NextResponse.json({ insights: result.text });
}
```

---

### ✅ MVP Success Criteria
- User can sign up and log in securely.  
- User can add/edit/delete daily usage entries.  
- Dashboard shows charts with filters.  
- Gemini generates and displays smart usage insights.  
- All data persists per user in Supabase.

