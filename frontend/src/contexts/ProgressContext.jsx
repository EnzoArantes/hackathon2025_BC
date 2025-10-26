import { createContext, useContext, useState, useEffect } from 'react';
import { getUserProgress, updateProgress as apiUpdateProgress } from '../utils/api';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalLessons] = useState(4);

  // Load progress from sessionStorage
  const loadFromSessionStorage = () => {
    try {
      const cached = sessionStorage.getItem('lessonProgress');
      if (cached) {
        const data = JSON.parse(cached);
        setCompletedLessons(data.completedLessons || []);
        setProgressData(data.progressData || {});
        return true;
      }
    } catch (err) {
      console.error('Error loading from sessionStorage:', err);
    }
    return false;
  };

  // Save progress to sessionStorage
  const saveToSessionStorage = (completed, data) => {
    try {
      sessionStorage.setItem('lessonProgress', JSON.stringify({
        completedLessons: completed,
        progressData: data,
        lastUpdated: new Date().toISOString()
      }));
    } catch (err) {
      console.error('Error saving to sessionStorage:', err);
    }
  };

  // Fetch progress from backend
  const fetchProgress = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getUserProgress();

      if (data) {
        const completed = data.completed_lessons || [];
        const progress = data.progress || {};

        setCompletedLessons(completed);
        setProgressData(progress);
        saveToSessionStorage(completed, progress);
      } else {
        // If backend fails, try to load from sessionStorage
        const hasCache = loadFromSessionStorage();
        if (!hasCache) {
          // No cache, set defaults (only Lesson 1 unlocked)
          setCompletedLessons([]);
          setProgressData({});
        }
        setError('Could not load progress from server. Showing cached data.');
      }
    } catch (err) {
      console.error('Error fetching progress:', err);
      // Try to load from sessionStorage on error
      const hasCache = loadFromSessionStorage();
      if (!hasCache) {
        setCompletedLessons([]);
        setProgressData({});
      }
      setError('Could not load progress from server. Showing offline data.');
    } finally {
      setLoading(false);
    }
  };

  // Update progress (optimistic update + backend sync)
  const markLessonComplete = async (lessonId) => {
    // Optimistic update
    const newCompleted = [...completedLessons];
    if (!newCompleted.includes(lessonId)) {
      newCompleted.push(lessonId);
      newCompleted.sort((a, b) => a - b);
    }

    const newProgressData = {
      ...progressData,
      [lessonId]: {
        score: 100,
        completed: true,
        completed_at: new Date().toISOString()
      }
    };

    setCompletedLessons(newCompleted);
    setProgressData(newProgressData);
    saveToSessionStorage(newCompleted, newProgressData);

    // Sync with backend
    try {
      const success = await apiUpdateProgress(lessonId, 100);
      if (success) {
        console.log(`✓ Lesson ${lessonId} progress saved to server!`);
        // Refresh from backend to confirm
        await fetchProgress();
      } else {
        console.log(`⚠ Failed to save Lesson ${lessonId} to server (will retry)`);
        // Keep the optimistic update, queue for retry
      }
    } catch (err) {
      console.error('Error updating progress:', err);
      // Keep the optimistic update
    }
  };

  // Check if a lesson is unlocked
  const isLessonUnlocked = (lessonId) => {
    if (lessonId === 1) return true; // Lesson 1 always unlocked

    // Lesson N is unlocked if Lesson N-1 is completed
    const previousLessonId = lessonId - 1;
    return completedLessons.includes(previousLessonId);
  };

  // Check if a lesson is completed
  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  // Get next lesson to unlock
  const getNextLesson = () => {
    for (let i = 1; i <= totalLessons; i++) {
      if (!completedLessons.includes(i)) {
        return i;
      }
    }
    return null; // All lessons completed
  };

  // Initialize on mount
  useEffect(() => {
    fetchProgress();
  }, []);

  const value = {
    completedLessons,
    progressData,
    loading,
    error,
    totalLessons,
    fetchProgress,
    markLessonComplete,
    isLessonUnlocked,
    isLessonCompleted,
    getProgressPercentage,
    getNextLesson
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
