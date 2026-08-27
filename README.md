# AI-Powered Chinese Handwriting Grading App (PWA)

> A modern Progressive Web App (PWA) designed for MOE Primary students to practice, capture, and receive instant AI-powered feedback on Chinese handwriting worksheets.

🔗 **Live Deployment URL:** `https://your-deployment-url.vercel.app` *(Update with your Vercel link upon deployment)*

---

## 📱 Features & Implemented Screens

### 1. Dashboard (Screen 1)
- **Student Profile Overview:** Header showing student details (`Lucas - Primary 2`) with notification badge.
- **Prepaid Credits Card:** Live balance (`12 of 20 Remaining`), interactive progress bar, and expiration notice.
- **Mastery Rate & Practice Metrics:** 2-column statistical cards showing progress percentages and character counts.
- **Upcoming Ting Xie:** Interactive weekly calendar strip with active date selector and spelling test reminder card.
- **Scan CTA Button:** Direct shortcut into the camera viewfinder scanner.

### 2. MOE Syllabus (Screen 2)
- **P1–P6 Level Selector Pills:** Responsive tabs to switch across primary school syllabus levels.
- **MOE Lesson Cards:** Expandable lesson units (e.g. 《第十课 - 我们的校园》) with vocabulary grids containing Chinese characters and Pinyin pronunciation (`xiào yuán`, `cāo chǎng`, `lǎo shī`, `lǐ táng`).
- **Status Tags:** Dynamic status badges for `Pending Practice`, `Completed (80%)`, and `Needs Revision`.
- **Worksheet PDF Action:** Footer action to download printable A4 Tian Zige practice sheets.

### 3. Camera Capture & Live Alignment Viewfinder (Screen 3)
- **HTML5 MediaDevices API:** Accesses native rear camera (`facingMode: environment`) with permission handling.
- **Live Alignment Overlay:** Centered scanning frame with corner brackets (L-guides), QR code alignment target, and guidance banner (*"Keep page flat and inside the brackets"*).
- **Controls:** Flashlight toggle and device file upload fallback for laptop testing.
- **High-Res Shutter Capture:** Draws frames directly to an off-screen HTML5 Canvas, converts to JPEG Blob, and triggers the AI grading pipeline.

### 4. Results & Historical Matrix (Screen 4)
- **Score Overview Header:** Circular score percentage ring (e.g. `80%`), overall ratio (`Score: 8/10`), timestamp badge, and missed characters counter.
- **Historical Results Matrix:** Dynamic multi-date table comparing tested Chinese characters against past dates with green ticks (**✓**) and red crosses (**✗**).
- **Action Buttons:** `Share Report` and `Retest Missed` quick actions.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling & UI:** Tailwind CSS v4 + Lucide React Icons
- **AI Vision Engine:** Google Gemini 1.5 Flash Vision API (`@google/generative-ai`)
- **Backend Database & Storage:** Supabase (PostgreSQL tables + Storage Buckets)
- **PWA Setup:** Web App Manifest (`manifest.json` / `manifest.ts`), Apple Mobile Web App tags, and SVG icons
- **Deployment:** Vercel

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in your root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Google Gemini AI API Key
GEMINI_API_KEY=your-gemini-api-key
```

---

## 🗄️ Database Schema (Supabase SQL)

Run this in your Supabase SQL Editor:

```sql
-- 1. Lessons table
create table if not exists public.lessons (
  id uuid default gen_random_uuid() primary key,
  week text not null,
  title text not null,
  moe_level text not null default 'P2',
  status text not null default 'pending',
  score numeric,
  words jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone default now()
);

-- 2. Submissions table
create table if not exists public.submissions (
  id uuid default gen_random_uuid() primary key,
  student_id text not null default 'lucas-p2',
  lesson_id uuid references public.lessons(id) on delete set null,
  image_url text not null,
  total_score numeric not null default 0,
  percentage numeric not null default 0,
  total_characters integer not null default 0,
  correct_count integer not null default 0,
  created_at timestamp with time zone default now()
);

-- 3. Character Results table
create table if not exists public.character_results (
  id uuid default gen_random_uuid() primary key,
  submission_id uuid references public.submissions(id) on delete cascade not null,
  character text not null,
  pinyin text,
  is_correct boolean not null,
  created_at timestamp with time zone default now()
);
```

---

## 🚀 Getting Started Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
