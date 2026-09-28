# FarmLink

Farm-to-market platform connecting Zimbabwean farmers directly with buyers in Harare.
Static site (HTML/CSS/vanilla JS) — no build step, no dependencies, no tracking cookies.

## Deploy free on Vercel (3 ways, pick one)

**A. Vercel CLI**
```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

**B. From GitHub (recommended — auto-deploys on every push)**
```bash
git init
git add .
git commit -m "FarmLink launch"
git remote add origin https://github.com/<you>/farmlink.git
git push -u origin main
```
Then at vercel.com: **Add New → Project → Import** the repo. Vercel auto-detects a static site; no settings needed. `vercel.json` already supplies the security headers and `404.html` is served automatically as the custom 404.

**C. Drag & drop** — drop this folder at vercel.com/new (or app.netlify.com/drop).

## Custom domain
In Vercel: Project → Settings → Domains → add `farmlink.co.zw` (and `www.farmlink.co.zw`),
then point DNS at Vercel's records (A record `76.76.21.21` for apex, CNAME `cname.vercel-dns.com` for www — Vercel shows the exact values). SSL is automatic.

## Before real users
1. **Change the admin password** in `assets/js/app.js` (search for `admin@farmlink.co.zw`).
2. If your domain is not `farmlink.co.zw`, find-and-replace `farmlink.co.zw` in the HTML files
   (canonicals, OG tags) and in `sitemap.xml` / `robots.txt`.
3. Replace the demo produce/stores with your real inventory via the admin dashboard (`admin.html`).

## Notes
- Carts, orders, reviews and admin edits persist in the browser (localStorage) — per-device until the backend upgrade.
- `_headers` is for Netlify; `vercel.json` does the same job on Vercel.
- Payment flow is simulated end-to-end (10% service fee + escrow-style hold); connect Paynow/Pesepay for real money movement.
