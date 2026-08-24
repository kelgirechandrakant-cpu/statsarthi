---
name: investigate
description: Systematic root-cause debugging for StatSarthi. Traces data flow, tests hypotheses, stops after 3 failed fixes. Use for bugs, errors, broken AI responses, or rendering issues.
---

# Investigate — Debug Methodology

## When to Use
"Why is this broken?" "Debug this." "It's not working."

## Iron Rule
**No fixes without investigation.** Understand WHY it broke before writing a fix.

---

## Step 1: Reproduce
- What exact action triggers the bug?
- What's the expected behavior vs actual behavior?
- Does it happen every time or intermittently?
- Check browser console for errors

## Step 2: Trace the Data Flow

### For AI/Gemini Issues
```
User Input → geminiService method → Gemini API call → JSON response → parse → state → render
```
At which step does it break? Add console.log at each boundary.

### For Firebase Issues
```
User Action → Firebase SDK call → Firestore/Auth/Storage → response → state → render
```
Check: Is the query correct? Do Security Rules block it? Is the response shape expected?

### For UI/Rendering Issues
```
State → component props → JSX → Tailwind classes → browser render
```
Check: Is the state correct? Are props passing through? Are CSS classes right?

## Step 3: Hypothesize
List the top 3 most likely causes. For each:
- Why you think this could be the cause
- How to verify (without changing code first)

## Step 4: Verify
Test each hypothesis. Read the code. Check the data. Don't guess.

## Step 5: Fix
Apply the smallest possible fix. One change at a time.

## Step 6: Three-Strike Rule
If your fix doesn't work after 3 attempts, STOP. Re-read the code from scratch. You're probably fixing the wrong thing.

---

## Common StatSarthi Bug Patterns

| Symptom | Likely Cause |
|---|---|
| Gemini returns empty/malformed JSON | Prompt too vague, or missing `responseSchema` |
| Quiz questions are off-topic | PDF not properly base64 encoded, or missing from chat context |
| Radar chart shows NaN | Competency score calculation returning undefined |
| Firebase write fails | Security Rules blocking the write, or missing auth |
| Auth redirect loop | Session check in wrong lifecycle hook |
| Blank screen after navigation | Missing lazy import or Suspense fallback |
| Original EduResources page loads | Route not properly commented out in App.tsx |
