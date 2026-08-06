# FrontEnd Listen Phirst Dashboard

A React dashboard for the Phicil-itate Change Oz experience. The app shows patient feedback, completed calls, data access records, response themes, insights, and account settings.

## Project Type

- Framework: React
- Tooling: Create React App / `react-scripts`
- Language: JavaScript JSX
- Styling: Plain CSS
- Data source: Local mock data in `src/App.js`
- Main app file: `src/App.js`
- Main stylesheet: `src/App.css`

## Features

- Create account and login screens
- Dashboard overview with total earnings, data access count, company count, and latest access date
- Data Access page with records displayed side by side in a responsive grid
- Completed Calls page
- Questionnaire Responses page
- Insights page
- Settings page with preference toggles and sign out

## Folder Structure

```text
frontend-listen-phirst-dashboard/
  public/
    index.html
    manifest.json
    robots.txt
  src/
    App.js
    App.css
    App.test.js
    index.js
    index.css
    reportWebVitals.js
    setupTests.js
  package.json
  package-lock.json
  README.md
```

## Requirements

- Node.js
- npm

The project dependencies are already listed in `package.json`.

## Install

Run this from the React project folder:

```bash
cd frontend-listen-phirst-dashboard
npm install
```

## Run Locally

```bash
npm start
```

By default, the app runs at:

```text
http://localhost:3000
```

If port `3000` is busy, run it on another port:

```bash
PORT=3003 npm start
```

## Build

Create a production-ready build:

```bash
npm run build
```

The compiled files are written to:

```text
build/
```

Use the `build/` folder when deploying the app to a static hosting service.

## Test

Run the React test suite:

```bash
npm test -- --watchAll=false
```

Current test coverage checks that the Oz dashboard account screen renders correctly.

## App Specs

### Navigation

The app uses local React state to switch between these sections:

- Dashboard
- Data Access
- Calls
- Responses
- Insights
- Settings

### Authentication

Authentication is currently frontend-only. Submitting the login or create account form signs the user into the dashboard during the current browser session.

### Data Access Records

Data access records are stored in `src/App.js` as `dataAccessRecords`.

Each record includes:

- `company`
- `companyType`
- `purpose`
- `categories`
- `accessedAt`
- `amount`

The Data Access page displays records in a responsive card grid:

- 3 columns on large screens
- 2 columns on medium screens
- 1 column on mobile screens

### Dashboard Metrics

The dashboard calculates these values from `dataAccessRecords`:

- Total earned
- Number of data accesses
- Number of unique companies
- Latest access date

### Styling

The app uses custom CSS classes in `src/App.css`. The layout is responsive and designed for a clean dashboard experience with a dark sidebar, white content panels, compact cards, and readable mobile views.

## Deployment Notes

1. Run `npm run build`.
2. Upload or deploy the generated `build/` folder.
3. Make sure the hosting service serves `build/index.html` for the app entry point.

## Future Improvements

- Connect authentication to a backend
- Replace mock records with database or API data
- Add filters/search to the Data Access page
- Add more detailed tests for navigation and dashboard sections
