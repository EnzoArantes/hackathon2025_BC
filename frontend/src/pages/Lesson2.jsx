import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonLayout from '../components/LessonLayout';
import { updateProgress } from '../utils/api';

function Lesson2() {
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const navigate = useNavigate();

  const markLessonComplete = async () => {
    const lessonId = 2;
    const score = 100;

    console.log('Marking lesson 2 as complete...');
    const success = await updateProgress(lessonId, score);
    if (success) {
      console.log('✓ Lesson 2 progress saved!');
    } else {
      console.log('⚠ Failed to save progress');
    }
  };

  const checkPrompt = () => {
    const trimmedPrompt = userPrompt.trim();

    if (trimmedPrompt.length < 30) {
      setFeedback({
        type: 'partial',
        title: '⚠️ Too Short!',
        score: 0,
        items: ['Your prompt needs much more context. Aim for at least 100 characters with specific details.']
      });
      setShowContinue(false);
      return;
    }

    // Check for context elements
    const hasJob = /interview|internship|position|role|job|software|engineer|marketing|design|analyst/i.test(trimmedPrompt);
    const hasBackground = /student|major|experience|project|year|sophomore|junior|senior|graduated|degree/i.test(trimmedPrompt);
    const hasConcern = /nervous|worried|concern|help|prepare|practice|struggle|difficulty|weak|improve/i.test(trimmedPrompt);
    const hasTimeline = /tomorrow|next week|monday|days|weeks|soon|upcoming|scheduled/i.test(trimmedPrompt);
    const isDetailed = trimmedPrompt.length > 100;

    let score = 0;
    let feedbackItems = [];

    if (hasJob) {
      score += 25;
      feedbackItems.push('✅ Great! You specified the job/role');
    } else {
      feedbackItems.push('❌ Add details about what job or position you\'re interviewing for');
    }

    if (hasBackground) {
      score += 25;
      feedbackItems.push('✅ Excellent! You included your background');
    } else {
      feedbackItems.push('❌ Mention your education, experience, or relevant skills');
    }

    if (hasConcern) {
      score += 20;
      feedbackItems.push('✅ Good! You identified what concerns you');
    } else {
      feedbackItems.push('❌ Share what specifically worries you or what you need help with');
    }

    if (hasTimeline) {
      score += 15;
      feedbackItems.push('✅ Nice! You mentioned when the interview is');
    } else {
      feedbackItems.push('💡 Bonus tip: Adding a timeline helps AI prioritize your preparation');
    }

    if (isDetailed) {
      score += 15;
      feedbackItems.push('✅ Your prompt is detailed and thorough!');
    } else {
      feedbackItems.push('💡 Try adding more specific details to get even better advice');
    }

    const isSuccess = score >= 70;

    setFeedback({
      type: isSuccess ? 'success' : 'partial',
      title: isSuccess ? '🎉 Excellent!' : '💪 Getting There!',
      score,
      items: feedbackItems,
      example: isSuccess ? `"I'm interviewing for a software engineering internship at a fintech startup next Tuesday. I'm a sophomore CS major with one Python project on GitHub but no professional experience. I'm nervous about technical questions on data structures and explaining my project clearly. Help me prepare a 2-minute introduction and practice answers for common technical questions."` : null
    });

    setShowContinue(isSuccess);
  };

  return (
    <LessonLayout
      lessonNumber={2}
      totalSections={4}
      onComplete={markLessonComplete}
    >
      {({ currentSection, goToSection }) => (
        <>
          {/* Section 1: Introduction */}
          <section className={`section ${currentSection === 1 ? 'active' : ''}`}>
            <div className="section-inner">
              <h1>📝 Context is Key</h1>
              <p className="intro-text">
                Imagine asking a friend for restaurant recommendations without mentioning you're vegetarian,
                on a budget, or that you're in Tokyo. Context changes everything!
              </p>

              <div className="key-principle">
                <h3>💡 Key Principle</h3>
                <p>AI can't read your mind. The more relevant background information you provide, the more tailored and useful the response will be.</p>
              </div>

              <button className="next-button" onClick={() => goToSection(2)}>
                See Examples →
              </button>
            </div>
          </section>

          {/* Section 2: Before & After Examples */}
          <section className={`section ${currentSection === 2 ? 'active' : ''}`}>
            <div className="section-inner">
              <h2>The Power of Context</h2>
              <p className="subtitle">Watch how adding context transforms generic advice into personalized help</p>

              {/* Example 1: Without Context */}
              <div className="example-container">
                <h3 className="example-title bad-title">❌ Without Context</h3>
                <div className="example-content">
                  <div className="prompt-display-large bad">
                    "Give me tips for learning to code"
                  </div>
                  <div className="response-preview">
                    <div className="response-label">AI Response:</div>
                    <p>Here are some general tips: Start with Python, practice daily, build projects, use online tutorials, join coding communities...</p>
                    <div className="quality-badge bad-badge">
                      <span className="badge-icon">⚠️</span>
                      <span>Generic advice that might not fit your situation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer */}
              <div className="vs-divider">
                <span>VS</span>
              </div>

              {/* Example 2: With Context */}
              <div className="example-container">
                <h3 className="example-title good-title">✅ With Context</h3>
                <div className="example-content">
                  <div className="prompt-display-large good">
                    "I'm a biology major interested in data analysis for research. I have no coding experience but can dedicate 2 hours per week to learning. Give me tips for learning to code that fit my background and time constraints."
                  </div>
                  <div className="response-preview">
                    <div className="response-label">AI Response:</div>
                    <p>Perfect! Focus on Python and R since they're ideal for biological data analysis. Start with DataCamp's biology-focused intro courses which work well with a 2hr/week schedule. Practice with real genomic or ecological datasets from Kaggle to stay motivated...</p>
                    <div className="quality-badge good-badge">
                      <span className="badge-icon">✓</span>
                      <span>Personalized, actionable advice tailored to you</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Takeaway Box */}
              <div className="takeaway-box">
                <h3>🎯 The Difference?</h3>
                <p>The second prompt included <strong>who you are</strong> (biology major), <strong>your goal</strong> (data analysis), and <strong>your constraints</strong> (2hrs/week, no experience). This gave the AI everything it needed to give you relevant advice.</p>
              </div>

              {/* Context Types Section */}
              <div className="context-section">
                <h3>What Kind of Context Should You Include?</h3>

                <div className="context-list">
                  <div className="context-item">
                    <div className="context-header">
                      <span className="context-icon">👤</span>
                      <h4>Your Background</h4>
                    </div>
                    <p>Your skills, experience level, field of study, or current role</p>
                    <div className="context-example">
                      <em>Example: "I'm a junior majoring in psychology..."</em>
                    </div>
                  </div>

                  <div className="context-item">
                    <div className="context-header">
                      <span className="context-icon">🎯</span>
                      <h4>Your Goal</h4>
                    </div>
                    <p>What you want to achieve and why it matters to you</p>
                    <div className="context-example">
                      <em>Example: "...looking to apply for grad school in neuroscience"</em>
                    </div>
                  </div>

                  <div className="context-item">
                    <div className="context-header">
                      <span className="context-icon">⏰</span>
                      <h4>Your Constraints</h4>
                    </div>
                    <p>Time, budget, resources, or limitations you're working with</p>
                    <div className="context-example">
                      <em>Example: "...have 6 months and a $500 budget"</em>
                    </div>
                  </div>

                  <div className="context-item">
                    <div className="context-header">
                      <span className="context-icon">📍</span>
                      <h4>Your Situation</h4>
                    </div>
                    <p>Current circumstances, challenges, or specific needs</p>
                    <div className="context-example">
                      <em>Example: "...struggling with statistics courses"</em>
                    </div>
                  </div>
                </div>
              </div>

              <button className="next-button" onClick={() => goToSection(3)}>
                Practice Adding Context →
              </button>
            </div>
          </section>

          {/* Section 3: Interactive Exercise */}
          <section className={`section ${currentSection === 3 ? 'active' : ''}`}>
            <div className="section-inner">
              <h2>🎮 Your Turn: Add Context</h2>

              <div className="challenge-box">
                <div className="scenario-box">
                  <h3>📖 Scenario:</h3>
                  <p>You want AI to help you prepare for a job interview.</p>

                  <div className="bad-prompt-display">
                    <h4>❌ Basic Prompt (No Context):</h4>
                    <p className="bad-prompt">"Help me prepare for a job interview"</p>
                  </div>
                </div>

                <div className="task-box">
                  <h3>Your Task:</h3>
                  <p>Rewrite this prompt by adding context about:</p>
                  <ul className="task-list">
                    <li>✓ What job/role you're interviewing for</li>
                    <li>✓ Your relevant background or experience</li>
                    <li>✓ What specifically concerns you about the interview</li>
                    <li>✓ When the interview is (timeline)</li>
                  </ul>
                </div>

                <textarea
                  className="prompt-input"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Rewrite the prompt here with lots of context...&#10;&#10;Example start: 'I'm interviewing for a software engineering internship at a startup. I'm a sophomore computer science student with one Python project...'&#10;&#10;Keep going - add more details!"
                  rows="8"
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
                        <strong>Perfect example with rich context:</strong><br /><br />
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
                <p>You've mastered Context!</p>
              </div>

              <div className="summary-box">
                <h3>What You Learned:</h3>
                <ul className="checklist">
                  <li>✅ Why context transforms generic responses into personalized advice</li>
                  <li>✅ Four types of context to include: background, goals, constraints, situation</li>
                  <li>✅ How to enrich prompts with relevant details</li>
                </ul>
              </div>

              <div className="pro-tip-box">
                <h3>💎 Pro Tip:</h3>
                <p>The best prompts combine Lesson 1 (WHO, WHAT, HOW) with Lesson 2 (Context). Try it: "You are a career coach [WHO]. I'm a junior majoring in marketing with one internship [CONTEXT]. Help me write a cover letter for a social media manager role [WHAT]. Format it as three paragraphs [HOW]."</p>
              </div>

              <div className="next-lesson-preview">
                <h3>🔜 Next Lesson: Critical Thinking</h3>
                <p>Learn how to spot AI mistakes, hallucinations, and verify information</p>
              </div>

              <div className="button-group">
                <button className="next-button primary" onClick={() => navigate('/lesson/3')}>
                  Next Lesson: Think Critically →
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

export default Lesson2;
