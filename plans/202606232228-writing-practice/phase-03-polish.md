# Phase 3: Polish & Integration

## Overview
Wire everything into the main app shell — home page card, navigation, keyboard shortcuts, and edge case handling.

## Dependencies
- Phase 1 and 2 complete

## Implementation Steps

### 1. Add GameCard to home page
- Title: "Schrijven" (Writing)
- Emoji: ✍️
- Description: "Write Dutch sentences, get AI corrections, review later"
- Link: `/schrijven`

### 2. Sub-navigation within /schrijven
- Two tabs/buttons at top of page: "Schrijven" | "Herhalen (X due)"
- Badge shows count of sentences due for review
- Default to write mode; if sentences are due, show subtle nudge

### 3. Keyboard shortcuts
- `Enter` to submit sentence (when textarea focused and not empty)
- `Ctrl+Enter` to save correction & get next prompt
- `s` to skip prompt (get a new one)
- Register in `KeyboardShortcutsHelp` component

### 4. Edge cases
- Empty textarea submit: prevent, show inline hint
- API failure: show retry button + "Try again later" message
- Very long input (>500 chars): warn, still allow
- Network offline: disable submit, show offline indicator
- Duplicate sentence detection: skip if corrected text already exists

### 5. Styling consistency
- Match existing Tailwind patterns (rounded-xl, shadow, p-6, etc.)
- Same color scheme for feedback (green=correct, red=needs work, blue=info)
- Responsive: works on mobile (textarea resizes, buttons full-width on sm)

### 6. Docker/persistence
- Add `writing-progress.json` to same `DATA_DIR` volume mount
- Verify data persists across container restarts (same as existing progress.json)

## Success Criteria
- Feature discoverable from home page
- Smooth flow between writing and reviewing
- Keyboard-driven workflow (minimal mouse needed)
- No regressions to existing exercises
- Works in Docker deployment

## Risks
| Risk | Mitigation |
|------|-----------|
| Home page gets crowded | GameCard grid already handles 6+ cards well |
| User confusion between modes | Clear tab UI with active state |
