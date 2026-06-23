# Phase 1: Write Mode

## Overview
The core writing loop — user gets a prompt, writes in Dutch, receives AI correction with explanations, and the corrected sentence is saved.

## Dependencies
- `@anthropic-ai/sdk` npm package
- `ANTHROPIC_API_KEY` env var

## Data Model

### `/src/data/writing-prompts.ts`
```
WritingPrompt {
  id: string
  type: 'topic' | 'image' | 'completion'
  prompt_nl: string          // Dutch instruction
  prompt_en: string          // English hint
  context?: string           // For completion type: partial sentence
  imageUrl?: string          // For image type: path to public/images/
  difficulty: 'A1' | 'A2' | 'B1' | 'B2'
  tags: string[]             // e.g., ['daily-life', 'work', 'travel']
}
```

### `/data/writing-progress.json`
```
{
  sentences: [
    {
      id: string (uuid)
      prompt_id: string
      original: string         // What user wrote
      corrected: string        // LLM-corrected version
      explanation: string      // What was wrong / improvements
      new_expressions: string[] // New words/phrases introduced by LLM
      created_at: string       // ISO date
      next_review: string      // ISO date (SRS)
      interval: number         // Days until next review
      ease_factor: number      // SM-2 ease factor
      review_count: number
    }
  ]
}
```

## Implementation Steps

### 1. Install Anthropic SDK
- `npm install @anthropic-ai/sdk`
- Add `ANTHROPIC_API_KEY` to `.env.local` (gitignored)

### 2. Create API route: `/src/app/api/correct/route.ts`
- Accept POST with `{ sentence: string, prompt_context: string }`
- Call Claude with system prompt:
  - You are a Dutch language tutor
  - Correct the sentence, explain errors
  - Suggest 1-2 natural alternative expressions
  - Return JSON: `{ corrected, explanation, new_expressions, is_correct }`
- Return structured response to client

### 3. Create writing prompts data: `/src/data/writing-prompts.ts`
- 30-50 prompts across types:
  - ~20 topic/scenario prompts (describe your day, order food, etc.)
  - ~10 image-based prompts (with images in `/public/images/writing/`)
  - ~15 sentence completion prompts (start of sentence, user finishes)
- Tag by difficulty and topic

### 4. Create page: `/src/app/schrijven/page.tsx`
- Client component with states:
  - `currentPrompt` — randomly selected (weighted away from recent)
  - `userInput` — textarea content
  - `correction` — API response (null → loading → result)
  - `phase` — 'writing' | 'reviewing-correction'
- UI flow:
  1. Show prompt (with type-specific rendering: text/image/partial sentence)
  2. Textarea for user input (auto-focus, min 1 sentence)
  3. Submit button → call `/api/correct`
  4. Show correction card:
     - Original (struck-through if different)
     - Corrected (highlighted changes)
     - Explanation
     - New expressions (highlighted, maybe with 💡)
  5. "Save & Next" button → persist to writing-progress.json + new prompt

### 5. Create API route: `/src/app/api/writing-progress/route.ts`
- GET: Return all saved sentences
- POST: Add new sentence (with SRS defaults: next_review = tomorrow, interval = 1, ease = 2.5)
- Same file-based pattern as existing `/api/progress`

### 6. Add prompt images
- 8-10 simple, license-free images in `/public/images/writing/`
- Scenes: kitchen, street, park, office, store, etc.

## Success Criteria
- User can cycle through prompts and write sentences
- Corrections arrive within 3s with useful explanations
- Each correction is saved with SRS metadata
- API key never exposed to client
- UI matches existing app styling (Tailwind, same spacing/colors)

## Risks
| Risk | Mitigation |
|------|-----------|
| LLM returns malformed JSON | Wrap in try/catch, retry once, show error gracefully |
| User writes English by accident | LLM system prompt should detect and gently redirect |
| Rate limiting on Claude API | Add basic client-side throttle (1 req per 5s) |
