# Form Up — Office Dashboard (Web)

Production web dashboard for Form Up construction management.  
Deployed on **Vercel** at `app.useformup.com`.

---

## Architecture

```
useformup.com (Squarespace)     → Marketing site + "Login" button
app.useformup.com (Vercel)      → This dashboard app
Supabase                        → Auth + database (shared with mobile app)
```

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env.local

# 3. Fill in your Supabase credentials in .env.local
#    (same values from your Form Up mobile app's .env)

# 4. Start dev server
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

### First-time setup:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Form Up web dashboard"
   git remote add origin https://github.com/YOUR_USERNAME/formup-web.git
   git push -u origin main
   ```

2. **Import in Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository" → select `formup-web`
   - Framework Preset: **Vite**
   - Add environment variables:
     - `VITE_SUPABASE_URL` = your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - Click **Deploy**

3. **Add custom domain**
   - In Vercel dashboard → Settings → Domains
   - Add `app.useformup.com`
   - In your domain registrar (wherever you bought useformup.com):
     - Add a **CNAME record**: `app` → `cname.vercel-dns.com`
   - Vercel will auto-provision SSL

### After that, every push to `main` auto-deploys.

---

## Connect Squarespace "Login" Button

On your Squarespace site (useformup.com), add a button/nav link:

- **URL**: `https://app.useformup.com`
- **Text**: "Login" or "Open Dashboard"

That's it — users click Login on the marketing site, land on the dashboard,
and see the Supabase login screen if not authenticated.

---

## Supabase Setup Notes

This uses the **same Supabase project** as your Form Up mobile app.  
Users who create accounts in the mobile app can log in here and vice versa.

### Required tables (you likely already have these):
- `profiles` — user profiles with `full_name`, `company_id`
- `companies` — company info with logo, contact details
- `projects` — project data
- `invoices` — invoice records
- `integrations` — Stripe/Square/QuickBooks connections
- `client_contacts` — CRM client data

### CORS / Auth settings:
In Supabase Dashboard → Authentication → URL Configuration:
- Add `https://app.useformup.com` to **Redirect URLs**
- Add `http://localhost:3000` for local dev

---

## Project Structure

```
formup-web/
├── index.html              # Entry HTML with fonts
├── package.json
├── vite.config.js
├── vercel.json             # SPA routing for Vercel
├── .env.example            # Template for env vars
├── public/
│   └── favicon.svg         # Form Up logo favicon
└── src/
    ├── main.jsx            # React mount point
    ├── App.jsx             # Auth router (login vs dashboard)
    ├── lib/
    │   └── supabase.js     # Supabase client init
    ├── providers/
    │   └── AuthProvider.jsx # Auth context (session, login, logout)
    └── screens/
        ├── LoginScreen.jsx  # Branded login/signup/forgot
        └── Dashboard.jsx    # Full office dashboard
```

---

## Next Steps

- [ ] Wire mock data to real Supabase queries
- [ ] Add real-time subscriptions for live updates
- [ ] Implement invoice creation form (not just preview)
- [ ] Add file upload for company logo
- [ ] Connect Stripe/Square/QuickBooks OAuth flows
- [ ] Add role-based access (owner vs worker views)
- [ ] Mobile responsive breakpoints
- [ ] PWA support (install as app)
