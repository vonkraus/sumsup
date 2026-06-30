# Release Notes

## desktop v0.8.0 — 2026-06-30

### Added
- **Net / Gross income toggle** — choose whether you're entering your take-home (net) or pre-tax (gross) income. Select Gross to pick your state and see a full federal + state tax breakdown with your estimated net monthly amount calculated automatically.
- Tax estimate works for both monthly and yearly gross inputs.

### Improved
- Income input label simplified to "Monthly Income" / "Yearly Income" — the Net/Gross toggle makes the distinction clear without cluttering the label.
- Feature bullet points on the home screen are now vertically aligned and centered under the heading.

---

## v2.7 — 2026-06-19

### Improved
- **Fresh start every time** — the app now opens with a clean slate. No income, no category amounts, no leftover name from last time. Your saved budgets are right there waiting; just tap the one you want.
- **New budget name, new budget** — typing a name into the budget name field now resets the form completely. Existing saved budgets aren't affected — starting fresh is genuinely fresh.

### The thinking behind it
Saved budgets should feel like files you open, not state that lingers. The earlier behavior — where the app restored whatever you last had open — made it easy to accidentally edit a saved budget without realizing it. Now the app makes the distinction clear: open a saved budget intentionally, or start a new one from zero.

---

### Store listing blurb (for Play Store / App Store submission)
> The app now opens to a clean slate every time — no leftover data from your last session. Tap a saved budget to load it, or type a new name to start fresh. Your saved budgets are always a tap away and load exactly as you left them.

---

## v2.5 — 2026-06-19

### Added
- **Named budget files** — give your budget a name and it saves automatically to your device. Every change is captured in real time. No account. No server. Your data stays exactly where it should: on your device.
- **Saved Budgets list** — right below the budget name field, your previously saved budgets appear and are one tap away. Open the app, pick up where you left off — or load a different budget entirely.
- **Swipe left to delete** a saved budget, or tap the ← / 🗑 icon for a confirmation prompt before removing it.
- **Import button** moved into the Export card — export and import now live together where they make sense.
- **Android swipe-back gesture** — swipe from the left edge to navigate back between pages, matching the iOS experience.
- **"Visit our website" link** in the app header on iOS and Android — opens sumsupbudgetcalc.com in your browser.

### The thinking behind saved budgets
The goal was to keep things honest with users who trust that their data never leaves their device. Rather than prompting "You have unsaved data from May — save it before starting June?" (which felt like the right instinct), we landed on something even simpler: name your budget and it's saved. Open the app and your budgets are right there waiting. No manual saves, no monthly prompts, no surprises.

---

### Store listing blurb (for Play Store / App Store submission)
> Your budgets now save automatically on your device — no account needed, no data sent anywhere. Name a budget and it's saved instantly. Tap any saved budget to pick up right where you left off. Swipe left to delete ones you no longer need. Import and export options are now grouped together for easier access.

---

## v2.3 — 2026-06-19

### Added
- "Visit our website" link in the app header (iOS and Android) — opens sumsupbudgetcalc.com in the system browser

---

## v2.0 — 2026-06-18

### Added
- Swipe gesture to navigate back between pages on iOS and Android

### Improved
- Budget data now persists for the entire session — data only clears when you fully close the app from the app switcher
- Dark mode: dollar amount input fields are now clearly visible in categories section

---

### Store listing blurb (for Play Store / App Store submission)
> Swipe to go back between pages, your budget data now stays put while the app is open, and dollar amount fields are easier to see in dark mode.

---

## v1.25 — 2026-06-15

### Added
- Light/dark theme toggle in the header
- Hamburger menu for mobile portrait view
- StatusBar theme sync for Capacitor mobile apps (Android/iOS)

### Fixed
- Download button no longer loses scroll position when navigating from other pages
- Redirected `/calculator` to `/` to resolve a Google duplicate canonical URL issue

---

### Store listing blurb (for Play Store / App Store submission)
> Added a light/dark theme toggle and a new mobile menu for easier navigation on phones. Fixed a scrolling bug on the download button and improved page redirects for better search visibility.
