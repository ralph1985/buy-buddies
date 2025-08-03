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
2. Run tests: `npm test` (tests are also executed automatically by Vercel on each deployment)
3. Start Vercel development server (if needed): `vercel dev`

## Development
This project follows a test-driven development (TDD) approach. Every new
feature must include its own tests, which should be written before or
alongside the implementation. The test suite is run on every deployment
by Vercel, so keep it green locally with `npm test` during development.

## Environment Variables
The following environment variables are required for Google Sheets access:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY` (replace line breaks with `\n`)

The Google Sheet ID is configured in the app's settings page and stored in
`localStorage`. If no ID is provided, the application will use a mock
repository.

