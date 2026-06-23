# Writing Practice Feature

## Problem
The app teaches grammar rules and vocabulary in isolation. There's no exercise where you produce free-form Dutch sentences, get AI corrections, and then review those corrected sentences over time to internalize natural phrasing and new expressions.

## Solution
Add a "Schrijven" (Writing) section with two modes:
1. **Write** — Prompted writing → LLM correction → save corrected sentences
2. **Review** — Spaced repetition over saved sentences (typing, fill-in-the-blank, read & confirm)

## Architecture Decisions
- LLM: Claude API via Next.js API route (server-side, key stays safe)
- Storage: File-based JSON (same pattern as existing `progress.json`)
- No new dependencies beyond `@anthropic-ai/sdk`

## Phases

| # | Phase | Description | Status |
|---|-------|-------------|--------|
| 1 | Write Mode | Prompts + text input + LLM correction + save | 🔲 |
| 2 | Review Mode | SRS scheduler + 3 review types over saved sentences | 🔲 |
| 3 | Polish | Home page card, keyboard shortcuts, edge cases | 🔲 |

## Success Criteria
- User can write Dutch sentences from prompts and receive corrections with explanations
- Corrected sentences accumulate in persistent storage
- Sentences resurface for review at SRS intervals in varied formats
- Integrates seamlessly with existing app (same styling, navigation, shortcuts)

## Key Risks
| Risk | Mitigation |
|------|-----------|
| API key exposure | Server-side only route, env var, never sent to client |
| LLM latency (1-3s) | Loading state with skeleton UI, disable submit during processing |
| Bad corrections | Show original + corrected side-by-side so user can judge |
| Storage growth | Cap at 500 sentences, oldest auto-archive |
