# FarmLink security checklist

Every item from the pre-launch security review, with its status in this codebase.

| # | Item | Status |
|---|------|--------|
| 1 | Hide API keys | No API keys exist in the codebase — nothing to leak. Re-check when payment APIs are added. |
| 2 | Check env variables | No build step or environment variables. Re-check when a backend is added; never commit `.env` files (see `.gitignore`). |
| 3 | Check keys in git | `.gitignore` blocks `.env*`, `*.pem`, `*.key`, `secrets.*`. Repository grep shows no secrets. |
| 4 | Protect admin routes | `admin.html` is `noindex,nofollow`, dashboard renders only after sign-in (sessionStorage gate), and the page is excluded in `robots.txt`. Client-side gating is a demo measure — put the dashboard behind server auth for production. |
| 5 | Add auth | Admin sign-in implemented with lockout (item 11). Demo credentials are marked CHANGE BEFORE LAUNCH in `assets/js/app.js`. |
| 6 | Check user perms | Roles are structural: buyers (shop only), farmers (apply via form; publish only after admin approval), admin (dashboard). |
| 7 | Sanitize user inputs | All user-supplied text is rendered through `esc()`; form fields carry `maxlength` caps; checkout validates required fields inline. |
| 8 | Protect against XSS | CSP (`script-src 'self'`) blocks inline scripts; all dynamic HTML passes through `esc()`; no `eval`, no `innerHTML` with raw user input. |
| 9 | SQL injection protection | No SQL/database — data lives in browser localStorage. Re-check when a real database is added (use parameterized queries/ORM). |
| 10 | Check DB rules | localStorage is per-browser and unreadable cross-origin. For production, enforce server-side authorization rules per store/order. |
| 11 | Add rate limiting | Admin login allows 5 attempts then locks for 60 seconds (sessionStorage-backed). |
| 12 | Set spend cap | No paid APIs in use. Set billing alerts before connecting SMS/payment APIs. |
| 13 | Secure file uploads | No file uploads in this version. When farmer photo uploads are added: accept images only, size-cap, strip EXIF, serve from a separate domain. |
| 14 | CSRF protection | No cookie-based auth (sessionStorage token), so CSRF does not apply; `form-action 'self'` in CSP limits form targets. |
| 15 | Check CORS settings | Site makes zero cross-origin requests; CSP `connect-src 'none'` blocks them outright. |
| 16 | Enable HTTPS | Enforced by the host; HSTS header set in `_headers` with `includeSubDomains`; CSP blocks mixed content. |
| 17 | Add security headers | `_headers` delivers CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, HSTS and `Permissions-Policy`. CSP/Referrer-Policy also set as meta tags for hosts that ignore `_headers`. |
| 18 | Secure cookies | No cookies are used at all — preferences live in localStorage. The cookie notice explains this. |
| 19 | Disable debug mode | No debug flags, no `console.log` output in production code. |
| 20 | Check prod settings | No source maps, no dev dependencies, single minifiable JS bundle (~20 KB), no placeholder/demo lorem content. |
