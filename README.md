# Ethiopia News Website

A comprehensive news platform focused on Ethiopia, featuring multi-language support, real-time updates, and a modern React frontend with a Python backend.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Frontend Development](#frontend-development)
- [Backend Development](#backend-development)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Internationalization](#internationalization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Ethiopia News Website is a modern news platform designed to deliver timely and relevant news to Ethiopian audiences in multiple languages. The platform supports English, Amharic, Oromo, and Tigrinya, making it accessible to a wide range of users across Ethiopia.

## Features

- **Multi-language Support**: Content available in English, Amharic, Oromo, and Tigrinya
- **Real-time Updates**: WebSocket integration for live breaking news notifications
- **Article Management**: Create, read, update, and delete news articles
- **Category and Region Filtering**: Organize content by categories and Ethiopian regions
- **User Submissions**: Allow citizens to submit their own news stories
- **RSS Feed Generation**: Automatically generate RSS feeds for content syndication
- **Ethiopian Calendar**: Custom utility for handling Ethiopian date conversions
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Search Functionality**: Easily find articles by keywords

## Technology Stack

### Frontend

- **React 19** with **TypeScript**
- **Vite 7** as the build tool
- **Tailwind CSS** for styling
- **@tanstack/react-query** for data fetching
- **React Router** for navigation
- **i18next** with **react-i18next** for internationalization
- **Tiptap** for rich text editing
- **Axios** for API requests
- **React Toastify** for notifications

### Backend

- **Python 3.8+**
- **FastAPI** for the REST API
- **SQLAlchemy** for ORM
- **Pydantic** for data validation
- **PostgreSQL** as the database
- **WebSocket** for real-time communication
- **JWT** for authentication

## Project Structure

```
ethiopia-news-website/
├── backend/
│   ├── routers/           # API route definitions
│   ├── models.py          # Database models
│   ├── schemas.py         # Pydantic schemas for validation
│   ├── database.py        # Database configuration
│   ├── main.py            # Application entry point
│   ├── seed_data.py       # Initial data seeding
│   └── utils/             # Utility functions
│       ├── auth.py        # Authentication utilities
│       └── ethiopian_calendar.py  # Ethiopian calendar conversion
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   ├── i18n/          # Internationalization setup
│   │   ├── App.tsx        # Main App component
│   │   ├── main.tsx       # Application entry point
│   │   └── index.css      # Global CSS styles
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.ts     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── postcss.config.js  # PostCSS configuration
├── README.md              # This file
└── pyproject.toml         # Backend dependencies
```

## Prerequisites

- **Node.js 16+** for frontend development
- **Python 3.8+** for backend development
- **PostgreSQL 12+** for the database
- **npm** or **yarn** for package management

## Installation

### Frontend Setup

```bash
cd frontend
npm install
```

### Backend Setup

```bash
# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install backend dependencies
pip install -r pyproject.toml

# Set up environment variables
# Copy .env.example to .env and fill in the required values
```

## Running the Application

### Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000` (or another available port).

### Backend Development Server

```bash
cd backend
python main.py
```

The backend API will be available at `http://localhost:8000`.

### Database Setup

1. Create a PostgreSQL database for the project
2. Update the database connection string in your `.env` file
3. Run the database migration script to set up tables

```bash
cd backend
python seed_data.py
```

## Frontend Development

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the production version
- `npm run preview`: Preview the production build

### Tailwind CSS Configuration

If you encounter PostCSS errors related to Tailwind CSS:

1. Ensure you have the correct package installed:
   ```bash
   npm install @tailwindcss/postcss --save-dev
   ```

2. The PostCSS configuration should use `'@tailwindcss/postcss': {}` as the plugin name in `postcss.config.js`.

3. If you continue to experience issues, try:
   - Clearing the npm cache: `npm cache clean --force`
   - Removing node_modules and package-lock.json
   - Reinstalling dependencies: `npm install`

### Internationalization

The application supports 4 languages:
- English (en)
- Amharic (am)
- Oromo (om)
- Tigrinya (ti)

Language files are located in `frontend/src/i18n/`.

## Backend Development

### API Endpoints

The backend provides RESTful API endpoints for:
- Articles management
- Categories and regions
- User authentication
- Comments system
- Article submissions
- RSS feed generation

### WebSocket Integration

Real-time updates are provided through WebSocket connections at `ws://localhost:8000/ws`.

### Authentication

The backend uses JWT tokens for authentication. Include the token in the `Authorization` header as `Bearer <token>`.

## API Documentation

API documentation is available at `http://localhost:8000/docs` when the backend server is running.

## Database Schema

The database includes tables for:
- Users
- Articles
- Categories
- Regions
- Comments
- Submissions

## Internationalization

The platform supports content in four languages to reach diverse Ethiopian audiences. All user interface elements are translated, and articles can be created in any of the supported languages.

## Deployment

### Frontend Deployment

```bash
cd frontend
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Backend Deployment

For production deployment, use a WSGI server like Gunicorn:

```bash
cd backend
gunicorn main:app --workers 4 --bind 0.0.0.0:8000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.