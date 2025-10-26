import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import '../styles/lesson-card.css';

function LessonCard({ lessonNumber, icon, title, description }) {
  const navigate = useNavigate();
  const { isLessonUnlocked, isLessonCompleted } = useProgress();

  const unlocked = isLessonUnlocked(lessonNumber);
  const completed = isLessonCompleted(lessonNumber);

  const handleClick = () => {
    if (unlocked) {
      navigate(`/lesson/${lessonNumber}`);
    }
  };

  const getButtonText = () => {
    if (completed) return 'Review →';
    if (unlocked) return 'Start →';
    return `🔒 Complete Lesson ${lessonNumber - 1} First`;
  };

  const getTooltip = () => {
    if (!unlocked) {
      return `Complete Lesson ${lessonNumber - 1} to unlock`;
    }
    return '';
  };

  return (
    <div
      className={`module-card ${!unlocked ? 'locked' : ''} ${completed ? 'completed' : ''}`}
      title={getTooltip()}
      onClick={handleClick}
      style={{ cursor: unlocked ? 'pointer' : 'not-allowed' }}
    >
      {/* Completion Badge */}
      {completed && (
        <div className="completion-badge">
          <span className="checkmark">✓</span>
        </div>
      )}

      {/* Lock Overlay */}
      {!unlocked && (
        <div className="lock-overlay">
          <span className="lock-icon">🔒</span>
        </div>
      )}

      <div className="module-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{description}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        disabled={!unlocked}
        className={completed ? 'review-button' : ''}
      >
        {getButtonText()}
      </button>
    </div>
  );
}

export default LessonCard;
