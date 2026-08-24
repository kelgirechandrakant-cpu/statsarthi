---
name: ship
description: Pre-deploy checklist for StatSarthi. Runs build checks, verifies routes, validates AI features, checks Firebase security, and prepares for deployment. Use when ready to deploy or demo to judges.
---

# Ship — Pre-Deploy Checklist

## When to Use
"Deploy this." "Push to production." "Demo ready?" Before showing to SIH judges.

---

## Pre-Deploy Checks

### 1. Build Verification
```bash
npm run build
```
- [ ] Build succeeds with zero errors
- [ ] No TypeScript errors
- [ ] Bundle size warnings checked (any chunk > 500KB?)

### 2. Route Verification
Test EVERY active StatSarthi route in the browser:
- [ ] `/` — Landing page loads
- [ ] `/login` — Auth page works
- [ ] `/assess` — Diagnostic assessment loads
- [ ] `/report` — Radar chart renders
- [ ] `/pathway` — Course cards display
- [ ] `/quiz-generator` — PDF upload works
- [ ] `/admin` — Admin panel loads (auth-protected)
- [ ] `/about` — About page loads
- [ ] `/privacy-policy` — Privacy page loads
- [ ] `/404-test` — 404 page shows

Verify NO EduResources routes are accessible:
- [ ] `/practice` — Should show 404
- [ ] `/notes` — Should show 404
- [ ] `/pyqs` — Should show 404
- [ ] `/assignments` — Should show 404

### 3. AI Feature Verification
- [ ] Upload a PDF → Generate MCQs → Questions appear correctly
- [ ] Take a diagnostic assessment → Answers are scored → Gap report generates
- [ ] Radar chart displays with correct data
- [ ] Learning path shows relevant iGOT courses
- [ ] AI handles errors gracefully (bad API key, rate limit, malformed PDF)

### 4. Firebase Verification
- [ ] New user can sign up / log in
- [ ] Gap report saves to Firestore
- [ ] Learning progress updates persist
- [ ] Quiz data saves correctly
- [ ] Security Rules block unauthorized access
- [ ] Original Supabase code is untouched and doesn't interfere

### 5. Security Final Check
- [ ] No API keys in source code
- [ ] `.env` is in `.gitignore`
- [ ] Firebase Security Rules deployed
- [ ] Admin routes require authentication

### 6. Mobile Check
- [ ] Open on phone (or Chrome DevTools mobile view)
- [ ] Navigation works
- [ ] Quiz is usable
- [ ] Radar chart is readable
- [ ] No horizontal scroll

### 7. Performance
- [ ] First page load < 3 seconds
- [ ] AI generation shows loading spinner
- [ ] No layout shift during loading
- [ ] Images/assets optimized

---

## Deploy

### Option A: Firebase Hosting (Recommended)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting  # Set public directory to 'dist'
firebase deploy
```

### Option B: Vercel
```bash
npx vercel --prod
```

### Post-Deploy
- [ ] Verify live URL works
- [ ] Test one full flow: Login → Assess → Gap Report → Learning Path
- [ ] Test quiz generator with a real PDF
- [ ] Share URL with team for testing
