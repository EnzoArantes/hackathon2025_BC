import { useEffect, useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { getCurrentUsername } from '../utils/auth';
import '../styles/progress.css';

function ProgressBar() {
  const {
    completedLessons,
    totalLessons,
    getProgressPercentage,
    loading,
    error,
    certificationEarned,
    certificationDate
  } = useProgress();
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const percentage = getProgressPercentage();
  const completed = completedLessons.length;

  // Animate progress bar filling in
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayPercentage(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  // Show celebration when all lessons completed
  useEffect(() => {
    if (completed === totalLessons && totalLessons > 0) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [completed, totalLessons]);

  if (loading) {
    return (
      <div className="progress-container loading">
        <div className="progress-header">
          <span className="progress-icon">⏳</span>
          <h3>Loading your progress...</h3>
        </div>
      </div>
    );
  }

  const isComplete = completed === totalLessons;

  return (
    <div className={`progress-container ${isComplete ? 'complete' : ''}`}>
      <div className="progress-header">
        <span className="progress-icon">📊</span>
        <h3>Your Progress</h3>
      </div>

      <div className="progress-bar-wrapper">
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${displayPercentage}%` }}
          >
            <div className="progress-bar-shine"></div>
          </div>
        </div>
        <div className="progress-percentage">{displayPercentage}%</div>
      </div>

      <div className="progress-stats">
        {isComplete ? (
          <>
            <p className="progress-message celebrate">
              🎉 Congratulations! You've completed all {totalLessons} lessons! 🎉
            </p>
            <p className="progress-submessage">
              You're now ready to use AI like a pro! Feel free to review any lesson.
            </p>
          </>
        ) : (
          <>
            <p className="progress-message">
              You've completed <strong>{completed}</strong> of <strong>{totalLessons}</strong> lessons
            </p>
            <p className="progress-submessage">
              {totalLessons - completed === 1
                ? "Just 1 more lesson to go! 🚀"
                : `${totalLessons - completed} more lessons to go! Keep it up! 💪`}
            </p>
          </>
        )}
      </div>

      {certificationEarned && (
        <div className="certification-badge">
          <div className="certification-content">
            <div className="certification-icon">🏆</div>
            <h4>AI Literacy Certification</h4>
            <p className="certification-recipient">
              <strong>{getCurrentUsername()}</strong> completed the AI Literacy Academy
            </p>
            <p className="certification-text">
              This certifies successful completion of all 4 lessons covering prompt fundamentals, context, critical thinking, and ethical AI use
            </p>
            {certificationDate && (
              <p className="certification-date">
                Earned on {new Date(certificationDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
            <div className="certification-seal">
              <div className="seal-outer">
                <div className="seal-inner">
                  <span className="seal-text">CERTIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCelebration && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#58CC02', '#1CB0F6', '#FF9600', '#FFC800', '#FF4B4B', '#CE82FF'][Math.floor(Math.random() * 6)]
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
