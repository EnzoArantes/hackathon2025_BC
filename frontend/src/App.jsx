import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProgressProvider } from './contexts/ProgressContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Lesson1 from './pages/Lesson1';
import Lesson2 from './pages/Lesson2';
import Lesson3 from './pages/Lesson3';
import Lesson4 from './pages/Lesson4';
import './styles/style.css';

function App() {
  return (
    <Router>
      <ProgressProvider>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/1"
            element={
              <ProtectedRoute>
                <Lesson1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/2"
            element={
              <ProtectedRoute>
                <Lesson2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/3"
            element={
              <ProtectedRoute>
                <Lesson3 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/4"
            element={
              <ProtectedRoute>
                <Lesson4 />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProgressProvider>
    </Router>
  );
}

export default App;
