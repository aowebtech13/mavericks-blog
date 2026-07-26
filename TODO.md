# Task: Fix SSR crash when Laravel backend is unreachable

## Steps

- [x] Step 1: Analyze codebase and create plan
- [x] Step 2: Update `src/lib/axios.ts` — Add retry logic for transient network failures
- [x] Step 3: Update `src/app/blog/page.tsx` — Wrap API calls in try-catch with fallback empty state
- [x] Step 4: Update `src/app/blog/[slug]/page.tsx` — Graceful error handling beyond notFound()
- [x] Step 5: Verify changes

