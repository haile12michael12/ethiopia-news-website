# Ethiopia News Website - Frontend

This is the frontend application for the Ethiopia News Website, built with React, TypeScript, Vite, and Tailwind CSS.

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Setup Instructions

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Development Server

The development server will start on port 3001 by default, but will automatically find another available port if needed.

- Local URL: http://localhost:3004/ (or another available port)
- Network URLs: Available on your local network for testing on other devices

## Project Structure

- `src/` - Main source code
  - `components/` - React components
  - `pages/` - Page components
  - `services/` - API service functions
  - `types/` - TypeScript types
  - `utils/` - Utility functions
  - `i18n/` - Internationalization setup
- `public/` - Static assets
- `src/index.css` - Global CSS styles with Tailwind directives

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios for API requests
- i18next for internationalization
- TanStack Query for data fetching
- React Toastify for notifications

## Available Languages

The application supports 4 languages:
- English (en)
- Amharic (am)
- Oromo (om)
- Tigrinya (ti)

## API Integration

The frontend connects to a backend API running on port 8000 with the following proxies:
- `/api` → `http://localhost:8000`
- `/uploads` → `http://localhost:8000`
- `/ws` → `ws://localhost:8000` (WebSocket)

Make sure the backend is running for full functionality.

## Troubleshooting

### PostCSS/Tailwind CSS Issues

If you encounter PostCSS errors related to Tailwind CSS, ensure you have the correct package installed:

```bash
npm install @tailwindcss/postcss --save-dev
```

The PostCSS configuration should use `'@tailwindcss/postcss': {}` as the plugin name in `postcss.config.js`.

If you continue to experience issues, try:
1. Clearing the npm cache: `npm cache clean --force`
2. Removing node_modules and package-lock.json
3. Reinstalling dependencies: `npm install`