import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonLayout from '../components/LessonLayout';
import { useProgress } from '../contexts/ProgressContext';

function Lesson1() {
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const navigate = useNavigate();
  const { markLessonComplete } = useProgress();

  const handleLessonComplete = async () => {
    const lessonId = 1;
    console.log('Marking lesson 1 as complete...');
    await markLessonComplete(lessonId);
    console.log('✓ Lesson 1 completed!');
  };

  const checkPrompt = () => {
    const trimmedPrompt = userPrompt.trim();

    if (trimmedPrompt.length < 20) {
      setFeedback({
        type: 'partial',
        title: '⚠️ Too Short!',
        score: 0,
        items: ['Your prompt needs more detail. Aim for at least 50 characters with WHO, WHAT, and HOW elements.']
      });
      setShowContinue(false);
      return;
    }

    // Check for elements
    const hasWho = /you are|act as|as a|like a|pretend|role|expert|professional|advisor|coach/i.test(trimmedPrompt);
    const hasWhat = /help|write|create|make|explain|tell|describe|list|provide|give|show|teach/i.test(trimmedPrompt);
    const hasHow = /format|bullet|paragraph|step|list|example|specific|detail|concise|brief|structured/i.test(trimmedPrompt);
    const isEssayRelated = /essay|paper|writing|college|school|assignment/i.test(trimmedPrompt);
    const isDetailed = trimmedPrompt.length > 50;

    let score = 0;
    let feedbackItems = [];

    if (hasWho) {
      score += 30;
      feedbackItems.push('✅ Great! You defined the role (WHO)');
    } else {
      feedbackItems.push('❌ Add a role like "You are an expert writing coach..."');
    }

    if (hasWhat) {
      score += 30;
      feedbackItems.push('✅ Excellent! You stated your goal clearly (WHAT)');
    } else {
      feedbackItems.push('❌ Specify what you need: "help me write...", "explain...", etc.');
    }

    if (hasHow) {
      score += 25;
      feedbackItems.push('✅ Perfect! You specified the format (HOW)');
    } else {
      feedbackItems.push('💡 Bonus: Add format details like "use bullet points" or "keep it concise"');
    }

    if (isEssayRelated) {
      score += 10;
      feedbackItems.push('✅ Good! Your prompt is relevant to the exercise');
    }

    if (isDetailed) {
      score += 5;
      feedbackItems.push('✅ Your prompt is nice and detailed!');
    }

    const isSuccess = score >= 70;

    setFeedback({
      type: isSuccess ? 'success' : 'partial',
      title: isSuccess ? '🎉 Excellent!' : '💪 Getting There!',
      score,
      items: feedbackItems,
      example: isSuccess ? `Perfect example: "You are an experienced English teacher. Help me write a 5-paragraph essay on climate change for my college application. Format it with an introduction, three body paragraphs, and a conclusion."` : null
    });

    setShowContinue(isSuccess);
  };

  return (
    <LessonLayout
      lessonNumber={1}
      totalSections={4}
      onComplete={handleLessonComplete}
    >
      {({ currentSection, goToSection }) => (
        <>
          {/* Section 1: Introduction */}
          <section className={`section ${currentSection === 1 ? 'active' : ''}`}>
            <div className="section-inner">
              <h1>🎯 Prompt Fundamentals</h1>
              <p className="intro-text">
                Think of AI like a really talented assistant who's eager to help but needs clear instructions.
                The better your instructions (prompts), the better the results!
              </p>

              <div className="key-principle">
                <h3>💡 Key Principle</h3>
                <p>Specific prompts = Better results. Always include <strong>WHO</strong>, <strong>WHAT</strong>, and <strong>HOW</strong>.</p>
              </div>

              <button className="next-button" onClick={() => goToSection(2)}>
                Start Learning →
              </button>
            </div>
          </section>

          {/* Section 2: The Three Elements */}
          <section className={`section ${currentSection === 2 ? 'active' : ''}`}>
            <div className="section-inner">
              <h2>The Three Elements of Great Prompts</h2>
              <p className="subtitle">Master these and you'll get 10x better results from any AI</p>

              <div className="elements-grid">
                <div className="element-card">
                  <div className="element-icon">👤</div>
                  <h3>WHO - Define the Role</h3>
                  <p>Tell the AI what perspective or expertise to use.</p>
                  <div className="example-box good">
                    <strong>Example:</strong> "You are an experienced college advisor..."
                  </div>
                </div>

                <div className="element-card">
                  <div className="element-icon">📋</div>
                  <h3>WHAT - State Your Goal</h3>
                  <p>Be crystal clear about what you need.</p>
                  <div className="example-box good">
                    <strong>Example:</strong> "...help me write a resume that highlights my coding skills..."
                  </div>
                </div>

                <div className="element-card">
                  <div className="element-icon">⚙️</div>
                  <h3>HOW - Specify Format</h3>
                  <p>Describe exactly how you want the output.</p>
                  <div className="example-box good">
                    <strong>Example:</strong> "...format it with bullet points, keep each under 15 words"
                  </div>
                </div>
              </div>

              <div className="full-example">
                <h4>✨ Putting It All Together:</h4>
                <div className="prompt-display">
                  "You are an experienced college advisor. Help me write a resume that highlights my coding skills. Format it with bullet points, keep each under 15 words."
                </div>
              </div>

              <button className="next-button" onClick={() => goToSection(3)}>
                Try an Exercise →
              </button>
            </div>
          </section>

          {/* Section 3: Interactive Exercise */}
          <section className={`section ${currentSection === 3 ? 'active' : ''}`}>
            <div className="section-inner">
              <h2>🎮 Your Turn: Fix This Prompt</h2>

              <div className="challenge-box">
                <div className="bad-prompt-display">
                  <h3>❌ Vague Prompt:</h3>
                  <p className="bad-prompt">"Help me with my essay"</p>
                  <p className="explanation">This is too vague! The AI doesn't know what kind of help, what essay, or how to format the response.</p>
                </div>

                <div className="task-box">
                  <h3>Your Task:</h3>
                  <p>Rewrite this prompt using WHO, WHAT, and HOW. Make it specific!</p>
                </div>

                <textarea
                  className="prompt-input"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Type your improved prompt here...&#10;&#10;Hint: Start with 'You are...' and include specific details about the essay topic and what kind of help you need."
                  rows="6"
                />

                <button className="check-button" onClick={checkPrompt}>
                  Check My Answer ✓
                </button>

                {feedback && (
                  <div className={`feedback-box feedback-${feedback.type}`}>
                    <h3>{feedback.title}</h3>
                    <div className="score-display">{feedback.score}/100</div>
                    <ul className="feedback-list">
                      {feedback.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    {feedback.example && (
                      <div style={{ marginTop: '20px', padding: '20px', background: 'white', borderRadius: '10px' }}>
                        <strong>Perfect example:</strong><br /><br />
                        <em>{feedback.example}</em>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {showContinue && (
                <button className="next-button" onClick={() => goToSection(4)}>
                  Continue to Summary →
                </button>
              )}
            </div>
          </section>

          {/* Section 4: Summary & Next Steps */}
          <section className={`section ${currentSection === 4 ? 'active' : ''}`}>
            <div className="section-inner">
              <h2>🎉 Lesson Complete!</h2>

              <div className="completion-badge">
                <div className="badge-icon">✓</div>
                <p>You've mastered Prompt Fundamentals</p>
              </div>

              <div className="summary-box">
                <h3>What You Learned:</h3>
                <ul className="checklist">
                  <li>✅ How to structure prompts with WHO, WHAT, and HOW</li>
                  <li>✅ Why specificity leads to better AI results</li>
                  <li>✅ How to transform vague requests into clear instructions</li>
                </ul>
              </div>

              <div className="next-lesson-preview">
                <h3>🔜 Next Lesson: Adding Context</h3>
                <p>Learn how providing background information dramatically improves AI responses</p>
              </div>

              <div className="button-group">
                <button className="next-button primary" onClick={() => navigate('/lesson/2')}>
                  Next Lesson: Context is Key →
                </button>
                <button className="next-button secondary" onClick={() => navigate('/')}>
                  ← Back to Home
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </LessonLayout>
  );
}

export default Lesson1;
