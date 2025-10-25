import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/style.css';

function Home() {
  const navigate = useNavigate();

  const startCourse = () => {
    navigate('/lesson/1');
  };

  const goToLesson = (lessonNumber) => {
    navigate(`/lesson/${lessonNumber}`);
  };

  return (
    <div className="container">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <h2>Learn How to Use AI Like a Pro</h2>
        <p>Interactive lessons that teach you proper prompting, critical thinking, and responsible AI use.</p>
        <button className="cta-button" onClick={startCourse}>Start Learning Free →</button>
      </section>

      {/* Course Modules */}
      <section className="modules">
        <h3>What You'll Learn</h3>

        <div className="module-grid">
          <div className="module-card">
            <div className="module-icon">🎯</div>
            <h4>Prompt Fundamentals</h4>
            <p>Learn how to write clear, effective prompts that get you better results.</p>
            <button onClick={() => goToLesson(1)}>Start →</button>
          </div>

          <div className="module-card">
            <div className="module-icon">📝</div>
            <h4>Adding Context</h4>
            <p>Discover why context matters and how to provide it effectively.</p>
            <button onClick={() => goToLesson(2)}>Start →</button>
          </div>

          <div className="module-card">
            <div className="module-icon">🔍</div>
            <h4>Think Critically</h4>
            <p>Learn to spot AI mistakes and verify information properly.</p>
            <button onClick={() => goToLesson(3)}>Start →</button>
          </div>

          <div className="module-card">
            <div className="module-icon">⚖️</div>
            <h4>Use AI Ethically</h4>
            <p>Understand privacy, plagiarism, and responsible AI practices.</p>
            <button onClick={() => goToLesson(4)}>Start →</button>
          </div>
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
