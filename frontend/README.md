# AI Literacy Academy - React Frontend

A modern React application for teaching AI literacy through interactive lessons.

## Features

- ✨ **Modern React Architecture** - Built with React 18 and Vite for fast development
- 🎨 **Beautiful Duolingo-inspired Design** - Preserved from the original HTML/CSS
- 🔐 **Session-based Authentication** - Secure login/register with Django backend
- 📚 **4 Interactive Lessons**:
  - Lesson 1: Prompt Fundamentals
  - Lesson 2: Context is Key
  - Lesson 3: Think Critically
  - Lesson 4: Use AI Ethically (**NEW!**)
- 📊 **Progress Tracking** - Saves your progress to the backend
- 🛡️ **Protected Routes** - Authentication-based navigation
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Vanilla CSS** - Preserved original styling
- **Django REST API** - Backend integration

## Prerequisites

Before running the frontend, make sure:

1. **Backend is running** at `http://127.0.0.1:8000`
   - The Django backend must be running for authentication and progress tracking
   - See the main project README for backend setup instructions

2. **Node.js** is installed (v16 or higher)
   - Check: `node --version`

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. **Start the backend first**:
   ```bash
   # In the root project directory
   cd backend
   python manage.py runserver
   ```

2. **Start the frontend** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser**:
   - Frontend: `http://localhost:5173` (Vite default)
   - Backend API: `http://127.0.0.1:8000/api/`

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header.jsx      # Site header with logout
│   │   ├── LessonLayout.jsx # Shared lesson structure
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Main landing page
│   │   ├── Login.jsx       # Login/Register page
│   │   ├── Lesson1.jsx     # Prompt Fundamentals
│   │   ├── Lesson2.jsx     # Context is Key
│   │   ├── Lesson3.jsx     # Think Critically
│   │   └── Lesson4.jsx     # Use AI Ethically (NEW!)
│   ├── utils/              # Utility functions
│   │   ├── api.js          # API calls (login, register, progress)
│   │   └── auth.js         # Auth helpers
│   ├── styles/             # CSS files
│   │   ├── style.css       # Main styles
│   │   ├── auth-style.css  # Authentication page styles
│   │   └── lesson-style.css # Lesson page styles
│   ├── App.jsx             # Main app with routing
│   └── main.jsx            # React entry point
├── package.json
└── vite.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## API Integration

The frontend connects to Django backend at `http://127.0.0.1:8000/api/` with these endpoints:

- `POST /api/register/` - Create new user account
- `POST /api/login/` - Authenticate user
- `POST /api/logout/` - Log out user
- `POST /api/update-progress/` - Save lesson progress
- `GET /api/progress/` - Retrieve user progress

All API calls use `credentials: 'include'` to maintain Django session cookies.

## Development Notes

### Preserving Original Design
- All CSS from the original HTML/CSS version is preserved
- Component structure mirrors the original page layouts
- Interactive exercises use the same validation logic
- Animations and transitions are identical

## Troubleshooting

### "Connection error" on login
- **Fix**: Ensure Django backend is running at `http://127.0.0.1:8000`
- Check: Visit `http://127.0.0.1:8000/api/` in browser

### Progress not saving
- **Fix**: Verify backend is running and accessible
- Check browser console for API errors
- Ensure `credentials: 'include'` is set in API calls

## Credits

Built at **BC Horizons Hackathon 2025**
