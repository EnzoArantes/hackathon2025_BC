import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import '../styles/lesson-style.css';

function LessonLayout({ lessonNumber, totalSections, children, onComplete }) {
  const [currentSection, setCurrentSection] = useState(1);
  const navigate = useNavigate();

  const progress = (currentSection / totalSections) * 100;

  const goToSection = (sectionNum) => {
    setCurrentSection(sectionNum);

    // If moving to final section (completion), mark lesson as complete
    if (sectionNum === totalSections && onComplete) {
      onComplete();
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="lesson-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Navigation */}
      <nav className="lesson-nav">
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="back-button">
          ← Back to Home
        </a>
        <span className="lesson-badge">Lesson {lessonNumber} of 4</span>
      </nav>

      {/* Lesson Content */}
      <main className="lesson-content">
        {children({ currentSection, goToSection })}
      </main>
    </div>
  );
}

export default LessonLayout;
