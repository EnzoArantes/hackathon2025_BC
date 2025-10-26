import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import LessonCard from '../components/LessonCard';
import { useProgress } from '../contexts/ProgressContext';
import '../styles/style.css';

function Home() {
  const navigate = useNavigate();
  const { getNextLesson } = useProgress();

  const startCourse = () => {
    const nextLesson = getNextLesson();
    if (nextLesson) {
      navigate(`/lesson/${nextLesson}`);
    } else {
      // All lessons completed, go to lesson 1
      navigate('/lesson/1');
    }
  };

  const lessons = [
    {
      id: 1,
      icon: '🎯',
      title: 'Prompt Fundamentals',
      description: 'Learn how to write clear, effective prompts that get you better results.'
    },
    {
      id: 2,
      icon: '📝',
      title: 'Adding Context',
      description: 'Discover why context matters and how to provide it effectively.'
    },
    {
      id: 3,
      icon: '🔍',
      title: 'Think Critically',
      description: 'Learn to spot AI mistakes and verify information properly.'
    },
    {
      id: 4,
      icon: '⚖️',
      title: 'Use AI Ethically',
      description: 'Understand privacy, plagiarism, and responsible AI practices.'
    }
  ];

  return (
    <div className="container">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <h2>Learn How to Use AI Like a Pro</h2>
        <p>Interactive lessons that teach you proper prompting, critical thinking, and responsible AI use.</p>
        <button className="cta-button" onClick={startCourse}>Start Learning Free →</button>
      </section>

      {/* Progress Section */}
      <section className="progress-section">
        <ProgressBar />
      </section>

      {/* Course Modules */}
      <section className="modules">
        <h3>What You'll Learn</h3>

        <div className="module-grid">
          {lessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              lessonNumber={lesson.id}
              icon={lesson.icon}
              title={lesson.title}
              description={lesson.description}
            />
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo">
        <h3>Try It: See the Difference</h3>
        <div className="comparison">
          <div className="bad-example">
            <h4>❌ Vague Prompt</h4>
            <div className="prompt-box">
              "Tell me about dogs"
            </div>
            <p>Too broad - AI doesn't know what you want</p>
          </div>

          <div className="good-example">
            <h4>✅ Specific Prompt</h4>
            <div className="prompt-box">
              "List 3 dog breeds good for apartments with their exercise needs"
            </div>
            <p>Clear goal with specific requirements</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>Built at BC Horizons Hackathon 2025</p>
        <p>Empowering responsible AI use 🚀</p>
      </footer>
    </div>
  );
}

export default Home;
