import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonLayout from '../components/LessonLayout';
import { useProgress } from '../contexts/ProgressContext';

function Lesson3() {
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const navigate = useNavigate();
  const { markLessonComplete } = useProgress();

  const handleLessonComplete = async () => {
    const lessonId = 3;
    console.log('Marking lesson 3 as complete...');
    await markLessonComplete(lessonId);
    console.log('✓ Lesson 3 completed!');
  };

  const checkPrompt = () => {
    const trimmedResponse = userResponse.trim();

    if (trimmedResponse.length < 50) {
      setFeedback({
        type: 'partial',
        title: '⚠️ Too Short!',
        score: 0,
        items: ['Try to identify at least 3 specific problems with the AI response and explain how you\'d verify them.']
      });
      setShowContinue(false);
      return;
    }

    // Check for identification of key red flags
    const mentionsUnverifiable = /unverifiable|can't verify|no source|citation|harvard|dr\.?\s*johnson|2023 study|fake|made up/i.test(trimmedResponse);
    const mentionsAbsolutes = /absolute|cure|completely|all types|prevents all|no side effects|too strong|overstated|exaggerat|guarantee/i.test(trimmedResponse);
    const mentionsDosage = /5000|dosage|too much|too high|safe|toxic|maximum|excess|side effect/i.test(trimmedResponse);
    const mentionsVerification = /verify|check|search|look up|consult|doctor|expert|medical|reliable source|official|research|pubmed|journal/i.test(trimmedResponse);
    const hasMedicalConcern = /medical|health|dangerous|misinformation|misleading|harmful|risky/i.test(trimmedResponse);
    const isDetailed = trimmedResponse.length > 120;

    let score = 0;
    let feedbackItems = [];

    if (mentionsUnverifiable) {
      score += 25;
      feedbackItems.push('✅ Great! You identified the unverifiable citation (the fake Harvard study)');
    } else {
      feedbackItems.push('❌ Look for citations or sources that sound real but may be made up');
    }

    if (mentionsAbsolutes) {
      score += 25;
      feedbackItems.push('✅ Excellent! You caught the absolute claims like "cure completely" or "prevents all cancer"');
    } else {
      feedbackItems.push('❌ Watch for absolute statements - they\'re rarely accurate in health/science');
    }

    if (mentionsDosage) {
      score += 20;
      feedbackItems.push('✅ Good! You noticed the concerning dosage claim (5000mg is very high)');
    } else {
      feedbackItems.push('💡 The extremely high dosage and claim of "no side effects" are major red flags');
    }

    if (mentionsVerification) {
      score += 20;
      feedbackItems.push('✅ Perfect! You explained how to verify the information with reliable sources');
    } else {
      feedbackItems.push('❌ Always explain HOW you would verify suspicious claims');
    }

    if (hasMedicalConcern || isDetailed) {
      score += 10;
      feedbackItems.push('✅ You showed strong critical thinking about medical misinformation');
    }

    const isSuccess = score >= 70;

    setFeedback({
      type: isSuccess ? 'success' : 'partial',
      title: isSuccess ? '🎉 Excellent Critical Thinking!' : '💪 Keep Analyzing!',
      score,
      items: feedbackItems
    });

    setShowContinue(isSuccess);
  };

  return (
    <LessonLayout
      lessonNumber={3}
      totalSections={4}
      onComplete={handleLessonComplete}
    >
      {({ currentSection, goToSection }) => (
        <>
          {/* Section 1: Introduction */}
          <section className={`section ${currentSection === 1 ? 'active' : ''}`}>
            <div className="section-inner">
              <h1>🔍 Think Critically</h1>
              <p className="intro-text">
                AI is powerful, but it's not perfect. It can make mistakes, "hallucinate" facts,
                and give outdated information. Learning to verify and question AI responses is crucial!
              </p>

              <div className="key-principle">
                <h3>💡 Key Principle</h3>
                <p>Always verify important information. AI is a helpful tool, but you're the one responsible for checking if the output is accurate and appropriate.</p>
              </div>

              <button className="next-button" onClick={() => goToSection(2)}>
                Learn How →
              </button>
            </div>
          </section>

          {/* Section 2: Types of AI Mistakes */}
          <section className={`section ${currentSection === 2 ? 'active' : ''}`}>
            <div className="section-inner">
              <h2>Common AI Mistakes to Watch For</h2>
              <p className="subtitle">Understanding what can go wrong helps you catch errors before they cause problems</p>

              <div className="mistakes-grid">
                <div className="mistake-card">
                  <div className="mistake-icon">🎭</div>
                  <h3>Hallucinations</h3>
                  <p>AI makes up facts, dates, or sources that sound real but aren't.</p>
                  <div className="example-box bad">
                    <strong>Example:</strong> Citing a research paper that doesn't exist, or claiming a historical event happened on the wrong date.
                  </div>
                  <div className="verification-tip">
                    <strong>How to Check:</strong> Cross-reference with reliable sources, look up citations, verify dates and names.
                  </div>
                </div>

                <div className="mistake-card">
                  <div className="mistake-icon">📅</div>
                  <h3>Outdated Information</h3>
                  <p>AI training data has a cutoff date - it doesn't know recent events.</p>
                  <div className="example-box bad">
                    <strong>Example:</strong> Information about current events, latest software versions, or recent policy changes may be incorrect.
                  </div>
                  <div className="verification-tip">
                    <strong>How to Check:</strong> For time-sensitive info, always verify with current sources or official websites.
                  </div>
                </div>

                <div className="mistake-card">
                  <div className="mistake-icon">⚖️</div>
                  <h3>Biased Responses</h3>
                  <p>AI can reflect biases from its training data or make oversimplified generalizations.</p>
                  <div className="example-box bad">
                    <strong>Example:</strong> Stereotypical assumptions about professions, cultures, or situations.
                  </div>
                  <div className="verification-tip">
                    <strong>How to Check:</strong> Question generalizations, seek diverse perspectives, be aware of potential bias.
                  </div>
                </div>

                <div className="mistake-card">
                  <div className="mistake-icon">🧮</div>
                  <h3>Math & Logic Errors</h3>
                  <p>AI can make calculation mistakes or logical inconsistencies.</p>
                  <div className="example-box bad">
                    <strong>Example:</strong> Incorrect calculations, flawed reasoning, or contradictory statements within the same response.
                  </div>
                  <div className="verification-tip">
                    <strong>How to Check:</strong> Double-check calculations, verify logic step by step, use specialized tools for complex math.
                  </div>
                </div>
              </div>

              <div className="critical-thinking-framework">
                <h3>🎯 Your Critical Thinking Checklist</h3>
                <div className="checklist-box">
                  <ul className="verification-list">
                    <li><strong>Is it specific?</strong> Vague responses might indicate the AI doesn't really know.</li>
                    <li><strong>Can I verify it?</strong> Check facts against trusted sources.</li>
                    <li><strong>Does it make sense?</strong> Use your own knowledge and common sense.</li>
                    <li><strong>Is it current?</strong> For time-sensitive info, confirm it's up to date.</li>
                    <li><strong>What's missing?</strong> Consider what perspectives or information might be left out.</li>
                  </ul>
                </div>
              </div>

              <button className="next-button" onClick={() => goToSection(3)}>
                Practice Spotting Errors →
              </button>
            </div>
          </section>

          {/* Section 3: Interactive Exercise */}
          <section className={`section ${currentSection === 3 ? 'active' : ''}`}>
            <div className="section-inner">
              <h2>🎮 Your Turn: Spot the Red Flags</h2>

              <div className="challenge-box">
                <div className="scenario-box">
                  <h3>📖 Scenario:</h3>
                  <p>You asked AI: "Tell me about the health benefits of vitamin C"</p>

                  <div className="ai-response-box">
                    <h4>AI Response:</h4>
                    <div className="fake-ai-response">
                      <p>"Vitamin C is essential for immune function and is found in citrus fruits. A 2023 study by Dr. Johnson at Harvard Medical School proved that taking 5000mg of vitamin C daily can cure the common cold completely. Vitamin C also prevents all types of cancer according to research. Everyone should take maximum doses for optimal health. There are no side effects at any dosage level."</p>
                    </div>
                  </div>
                </div>

                <div className="task-box">
                  <h3>Your Task:</h3>
                  <p>This response contains several red flags and potential errors. Identify at least 3 problems with this AI response and explain how you would verify the correct information.</p>
                  <div className="hint-box">
                    <strong>Hint:</strong> Look for claims that sound too absolute, unverifiable citations, potential medical misinformation, or overly simplistic statements.
                  </div>
                </div>

                <textarea
                  className="prompt-input"
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="List the red flags you spotted and how you'd verify the facts...&#10;&#10;Example format:&#10;&#10;Red Flag 1: [What's wrong]&#10;How to verify: [What you'd do to check]&#10;&#10;Red Flag 2: [What's wrong]&#10;How to verify: [What you'd do to check]"
                  rows="10"
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
                    {feedback.type === 'success' && (
                      <div style={{ marginTop: '20px', padding: '20px', background: 'white', borderRadius: '10px', color: '#1E293B' }}>
                        <strong>The main red flags in that response were:</strong><br /><br />
                        <ol style={{ textAlign: 'left', lineHeight: '1.8' }}>
                          <li><strong>Fake citation:</strong> The "2023 Harvard study by Dr. Johnson" is unverifiable and likely made up.</li>
                          <li><strong>Absolute claims:</strong> Saying vitamin C "cures completely" and "prevents all types of cancer" is false.</li>
                          <li><strong>Dangerous dosage:</strong> 5000mg is far above recommended levels and can cause side effects.</li>
                          <li><strong>Oversimplification:</strong> "No side effects at any dosage" is dangerously incorrect.</li>
                        </ol>
                        <br />
                        <strong>How to verify:</strong> Check medical sources like Mayo Clinic, NIH, or consult a healthcare provider. Look up the study in PubMed or Google Scholar. Research the recommended daily allowance for vitamin C (it's around 65-90mg for adults).
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
                <p>You've mastered Critical Thinking!</p>
              </div>

              <div className="summary-box">
                <h3>What You Learned:</h3>
                <ul className="checklist">
                  <li>✅ Four common types of AI mistakes: hallucinations, outdated info, bias, and logic errors</li>
                  <li>✅ How to verify AI responses using reliable sources</li>
                  <li>✅ A critical thinking checklist for evaluating AI output</li>
                  <li>✅ Red flags that indicate information needs verification</li>
                </ul>
              </div>

              <div className="pro-tip-box">
                <h3>💎 Pro Tip:</h3>
                <p>Use AI as your starting point, not your endpoint. For important decisions (health, legal, financial, academic integrity), always verify with experts or authoritative sources. AI is excellent for brainstorming and drafts, but critical thinking is YOUR responsibility!</p>
              </div>

              <div className="next-lesson-preview">
                <h3>🔜 Next Lesson: Use AI Ethically</h3>
                <p>Learn about privacy, plagiarism, and responsible AI practices</p>
              </div>

              <div className="button-group">
                <button className="next-button primary" onClick={() => navigate('/lesson/4')}>
                  Next Lesson: Ethical AI Use →
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

export default Lesson3;
