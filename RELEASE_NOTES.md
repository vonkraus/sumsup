# Release Notes

## v3.0 / desktop v1.0.0 — 2026-07-01

### Fixed
- **Paycheck frequency now actually affects your budget.** Previously, the frequency dropdown (Weekly, Bi-weekly, etc.) was purely informational — the amount you typed was always treated as a full month's or year's income regardless of which frequency was selected. Now every frequency (weekly, bi-weekly, semi-monthly, monthly, quarterly, annually) correctly converts your entered amount into the right monthly and annual figures.

### Improved
- **Paycheck Frequency now comes before Income Amount**, and the amount field's label updates to match your selection (e.g. "Weekly Income", "Quarterly Income").
- Removed the separate Monthly/Yearly toggle — now redundant since Monthly and Annually are both frequency options.
- Replaced the old "Estimated Paycheck" readout with a clearer Monthly/Annual Equivalent summary.
- "Add Custom Category" moved to the top of the Budget Categories card as a toggle button, so it's visible without scrolling past your whole category list.

---

### Store listing blurb (for Play Store / App Store submission)
> Paycheck frequency now actually drives your budget math — pick Weekly, Bi-weekly, Semi-monthly, Monthly, Quarterly, or Annually and we'll convert it correctly. Adding a custom category is also quicker to find, right at the top of your categories list.

---

## v2.9 / desktop v0.9.0 — 2026-06-30

### Added
- **Net / Gross income toggle** — choose whether you're entering your take-home (net) or pre-tax (gross) income. Select Gross to pick your state and see a full federal + state tax breakdown with your estimated net monthly amount calculated automatically. Works for both monthly and yearly inputs.
- **"Help me choose Net or Gross" link** — a quick link below the toggle takes you directly to the knowledge base article explaining the difference.

### Improved
- Income input label simplified to "Monthly Income" / "Yearly Income" — the Net/Gross toggle makes the distinction clear without cluttering the label.
- Feature bullet points on the home screen are now vertically aligned and centered under the heading.

---

### Store listing blurb (for Play Store / App Store submission)
> You can now tell the app whether you're entering gross or net income. Select Gross, pick your state, and the app calculates your federal and state taxes and shows your estimated take-home automatically. A help link below the toggle explains the difference if you're not sure which to use.

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
