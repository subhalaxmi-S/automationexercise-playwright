# AutomationExercise — Playwright TypeScript Framework

End-to-end test automation framework for [automationexercise.com](https://automationexercise.com) 
built with Playwright and TypeScript.

## Tech Stack
- Playwright (TypeScript)
- Page Object Model
- GitHub Actions CI/CD

## Project Structure
- `pages/` — Page Object classes
- `tests/` — Test specs organised by feature
- `test-data/` — External JSON test data

## Test Coverage
- ✅ Phase 1: Auth flows (5 test cases)
- 🔄 Phase 2: Products & Search (coming soon)
- 🔄 Phase 3: Cart & Checkout (coming soon)
- 🔄 Phase 4: API Testing (coming soon)
- 🔄 Phase 5: Advanced scenarios + Reports (coming soon)

## Run Locally
npm install
npx playwright install
npx playwright test

## CI/CD
Tests run automatically on every push to `main` via GitHub Actions.
