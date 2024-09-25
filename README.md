# CountryInfoApp

**CountryInfoApp** is a full-stack web application that provides users with detailed information about countries, including country names, flags, border countries, and population history over time.
The application is built with a Node.js backend using Express and a React.js frontend. It integrates external APIs to fetch real-time data and displays it in a user-friendly interface.

## Features

- **Country List Page**: Browse a list of available countries, each with a clickable link for more details.
- **Country Info Page**: Detailed information about a specific country, including:
  - **Country Name and Flag**.
  - **List of Bordering Countries** with clickable links to their pages.
  - **Population History Chart** displaying population trends over time.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **APIs Used**:
  - [Date Nager API](https://date.nager.at): Provides information about countries and their borders.
  - [CountriesNow API](https://countriesnow.space): Fetches population and flag details for each country.

---

## Requirements

- **Node.js** (version 14 or above)
- **npm** (version 6 or above)
- **React.js** (version 17 or above)
- **Axios** (for API requests)

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/CountryInfoApp.git
cd CountryInfoApp
```

---

## Backend Setup (Node.js + Express)

### Step 1: Install Backend Dependencies

Navigate to the root of the project:

```bash
cd server
npm install
```

### Step 2: Create Environment Variables

Create a `.env` file in the `server/` directory with the following content:

```bash
# .env file

PORT=5000
AVAILABLE_COUNTRIES_BASE_URL=https://date.nager.at/api/v3
COUNTRY_INFO_API_BASE_URL=https://countriesnow.space/api/v0.1
CORS_ORIGIN=http://localhost:3000
```

### Step 3: Start the Backend Server

Once dependencies are installed and environment variables are set, you can start the backend server with:

```bash
npm run start
```

You can also use **nodemon** to auto-reload the server:

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

---

## Frontend Setup (React.js)

### Step 1: Install Frontend Dependencies

Navigate to the `client/` directory:

```bash
cd client
npm install
```

### Step 2: Create Environment Variables

Create a `.env` file in the `client/` directory with the following content:

```bash
# .env file

REACT_APP_API_BASE_URL=http://localhost:5000
```

### Step 3: Start the Frontend Server

Once the dependencies are installed, start the frontend development server:

```bash
npm start
```

The React application will be available at `http://localhost:3000`.

---

## ESLint and Prettier

### Setup

The project includes ESLint and Prettier for code quality and formatting. They are configured to work across both the frontend and backend.

1. **To run ESLint**:
   ```bash
   npm run lint
   ```

2. **To fix formatting issues with Prettier**:
   ```bash
   npm run prettier
   ```

### Configuration

- **Frontend**: Configured in `client/.eslint.config.mjs` and `client/.prettierrc`.
- **Backend**: Configured in `server/.eslint.config.mjs` and `server/.prettierrc`.

---

## API Endpoints

### 1. Get Available Countries

- **URL**: `/available-countries`
- **Method**: `GET`
- **Description**: Fetches a list of available countries with their names and codes.

### 2. Get Country Info

- **URL**: `/country-info/:countryCode`
- **Method**: `GET`
- **Description**: Fetches detailed information about a country, including its borders, population history, and flag URL.

---

### Author

Created by [lizrek](https://github.com/lizrek).
