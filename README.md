# BuyBuddies

BuyBuddies is a collaborative shopping list app built with TypeScript, following a screaming architecture. It uses Google Sheets as the data source and Lit + Material Web Components for the UI.

## Branch Workflow
- `develop`: main development branch
- `release/x.y.z`: stable releases ready to deploy
- `feature/...`: temporary branches created from `develop`
- `hotfix/...`: urgent fixes for releases
- `main` is only used by GitHub

## Setup
1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. Start Vercel development server (if needed): `vercel dev`

Environment variables are required for Google Sheets access:
`GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `USE_MOCK_REPO`.

