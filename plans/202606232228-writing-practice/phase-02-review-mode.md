# Phase 2: Review Mode

## Overview
Saved corrected sentences resurface at SRS intervals. Three review types rotate to keep practice varied and test different recall skills.

## Dependencies
- Phase 1 complete (sentences exist in writing-progress.json)

## SRS Algorithm (SM-2 Simplified)

On each review:
- **Correct**: `interval *= ease_factor`, `ease_factor += 0.1` (max 3.0), `review_count++`
- **Incorrect**: `interval = 1`, `ease_factor -= 0.2` (min 1.3), `review_count` stays
- `next_review = today + interval days`

## Review Types

### 1. Typing Practice
- Show: the original prompt + a hint (first 2 words of corrected sentence)
- User: types the full corrected sentence from memory
- Validation: normalized comparison (ignore punctuation case), highlight mismatches
- On fail: show corrected sentence, mark as incorrect

### 2. Fill-in-the-Blank
- Show: corrected sentence with 2-3 key words blanked (prioritize new_expressions)
- User: type the missing words in order
- Validation: exact match per blank (case-insensitive)
- On fail: reveal correct words with highlight

### 3. Read & Confirm (easiest — for new or difficult sentences)
- Show: original (if wrong) vs corrected side-by-side
- Highlight: the corrections and new expressions
- User: reads, then self-rates: "Got it" (correct) or "Need more practice" (incorrect)
- Used for: first review, or when sentence has been failed 3+ times

## Review Selection Logic
1. Query all sentences where `next_review <= today`
2. Sort by: overdue days (most overdue first), then lowest ease_factor
3. Present up to 10 per session
4. Assign review type based on `review_count`:
   - 0-1 reviews: Read & Confirm
   - 2-4 reviews: Fill-in-the-Blank
   - 5+ reviews: Typing Practice

## Implementation Steps

### 1. Create page: `/src/app/schrijven/review/page.tsx`
- States: `queue[]`, `currentIndex`, `userInput`, `phase` (answering | feedback)
- On mount: fetch writing-progress, filter due sentences, build queue
- Show "Nothing to review!" with link back to writing if queue empty
- After each review: PATCH the sentence's SRS fields

### 2. Create review components
- `TypingReview.tsx` — prompt + hint + text input + check
- `FillBlankReview.tsx` — sentence with `____` blanks + inputs per blank
- `ReadConfirmReview.tsx` — side-by-side display + two buttons

### 3. Update API route: `/src/app/api/writing-progress/route.ts`
- Add PATCH method: update a sentence by ID (SRS fields only)
- Validate: only allow updating `next_review`, `interval`, `ease_factor`, `review_count`

### 4. Add review summary at end of session
- Show: X reviewed, Y correct, Z need more practice
- "Continue writing" button → link to write mode
- "Done" → home

## Success Criteria
- Due sentences surface automatically each day
- Three review types rotate based on mastery level
- SRS intervals grow with correct answers, reset on failure
- Session feels quick (10 sentences max, ~5 min)
- Progress persists across sessions

## Risks
| Risk | Mitigation |
|------|-----------|
| Fill-in-the-blank picks wrong words to blank | Prioritize `new_expressions` array, fallback to longest words |
| User has 0 sentences saved | Show friendly empty state with CTA to write mode |
| SM-2 ease factor degrades too fast | Floor at 1.3, ceiling at 3.0 |
