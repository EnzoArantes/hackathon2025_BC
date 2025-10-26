import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonLayout from '../components/LessonLayout';
import { useProgress } from '../contexts/ProgressContext';

function Lesson4() {
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const navigate = useNavigate();
  const { markLessonComplete } = useProgress();

  const handleLessonComplete = async () => {
    const lessonId = 4;
    console.log('Marking lesson 4 as complete...');
    await markLessonComplete(lessonId);
    console.log('✓ Lesson 4 completed!');
  };

  const checkPrompt = () => {
    const trimmedResponse = userResponse.trim();

    if (trimmedResponse.length < 40) {
      setFeedback({
        type: 'partial',
        title: '⚠️ Too Short!',
        score: 0,
        items: ['Try to identify at least 2-3 ethical concerns for each scenario.']
      });
      setShowContinue(false);
      return;
    }

    // Check for identification of ethical issues
    const mentionsPrivacy = /privacy|personal|sensitive|data|private|confidential|ssn|medical|health|password/i.test(trimmedResponse);
    const mentionsPlagiarism = /plagiarism|cite|source|credit|attribution|copy|original|academic|integrity|cheating/i.test(trimmedResponse);
    const mentionsBias = /bias|fair|diverse|perspective|stereotype|discriminat|represent/i.test(trimmedResponse);
    const mentionsVerification = /verify|check|fact|accuracy|responsibility|review|confirm/i.test(trimmedResponse);
    const mentionsConsent = /consent|permission|allow|authorized|appropriate/i.test(trimmedResponse);
    const isDetailed = trimmedResponse.length > 100;

    let score = 0;
    let feedbackItems = [];

    if (mentionsPrivacy) {
      score += 25;
      feedbackItems.push('✅ Great! You identified privacy concerns');
    } else {
      feedbackItems.push('❌ Consider privacy risks - sharing sensitive personal data with AI');
    }

    if (mentionsPlagiarism) {
      score += 25;
      feedbackItems.push('✅ Excellent! You recognized plagiarism and attribution issues');
    } else {
      feedbackItems.push('❌ Think about academic integrity and giving proper credit');
    }

    if (mentionsBias || mentionsVerification) {
      score += 20;
      feedbackItems.push('✅ Good! You considered bias or verification responsibility');
    } else {
      feedbackItems.push('💡 Remember to verify AI outputs and watch for bias');
    }

    if (mentionsConsent) {
      score += 15;
      feedbackItems.push('✅ Perfect! You thought about consent and appropriate use');
    } else {
      feedbackItems.push('💡 Always consider if you have permission to share information');
    }

    if (isDetailed) {
      score += 15;
      feedbackItems.push('✅ Your response shows thorough ethical thinking!');
    }

    const isSuccess = score >= 70;

    setFeedback({
      type: isSuccess ? 'success' : 'partial',
      title: isSuccess ? '🎉 Strong Ethical Awareness!' : '💪 Keep Thinking Ethically!',
      score,
      items: feedbackItems
    });

    setShowContinue(isSuccess);
  };

  return (
    <LessonLayout
      lessonNumber={4}
      totalSections={4}
      onComplete={handleLessonComplete}
    >
      {({ currentSection, goToSection }) => (
        <>
          {/* Section 1: Introduction */}
          <section className={`section ${currentSection === 1 ? 'active' : ''}`}>
            <div className="section-inner">
              <h1>⚖️ Use AI Ethically</h1>
              <p className="intro-text">
                With great AI power comes great responsibility! Just because AI can do something doesn't mean
                we should. This lesson teaches you how to use AI in ways that are ethical, legal, and respectful.
              </p>

              <div className="key-principle">
                <h3>💡 Key Principle</h3>
                <p>Ethical AI use protects you, respects others, and maintains trust. Always consider privacy, attribution, bias, and verification.</p>
              </div>

              <button className="next-button" onClick={() => goToSection(2)}>
                Learn the Principles →
              </button>
            </div>
          </section>

          {/* Section 2: The Four Pillars of Ethical AI Use */}
          <section className={`section ${currentSection === 2 ? 'active' : ''}`}>
            <div className="section-inner">
              <h2>The Four Pillars of Ethical AI Use</h2>
              <p className="subtitle">Follow these principles to use AI responsibly and safely</p>

              <div className="elements-grid">
                <div className="element-card">
                  <div className="element-icon">🔒</div>
                  <h3>Privacy First</h3>
                  <p>Never share sensitive personal information with AI systems.</p>
                  <div className="example-box bad">
                    <strong>DON'T:</strong> Share SSNs, passwords, medical records, others' private info, financial data
                  </div>
                  <div className="example-box good">
                    <strong>DO:</strong> Use generic examples or fictional data instead
                  </div>
                </div>

                <div className="element-card">
                  <div className="element-icon">📚</div>
                  <h3>Attribution & Honesty</h3>
                  <p>Always cite AI assistance and avoid plagiarism.</p>
                  <div className="example-box bad">
                    <strong>DON'T:</strong> Submit AI-generated work as entirely your own
                  </div>
                  <div className="example-box good">
                    <strong>DO:</strong> Acknowledge AI help, use it for drafts/brainstorming, add your own thinking
                  </div>
                </div>

                <div className="element-card">
                  <div className="element-icon">👁️</div>
                  <h3>Bias Awareness</h3>
                  <p>AI can perpetuate stereotypes and biases. Question outputs critically.</p>
                  <div className="example-box bad">
                    <strong>WATCH FOR:</strong> Stereotypes, cultural insensitivity, oversimplifications
                  </div>
                  <div className="example-box good">
                    <strong>DO:</strong> Seek diverse perspectives, challenge assumptions, edit for fairness
                  </div>
                </div>

                <div className="element-card">
                  <div className="element-icon">✓</div>
                  <h3>Verification Responsibility</h3>
                  <p>You're responsible for the accuracy of anything you use from AI.</p>
                  <div className="example-box bad">
                    <strong>DON'T:</strong> Blindly trust AI for critical decisions
                  </div>
                  <div className="example-box good">
                    <strong>DO:</strong> Fact-check important information, especially for health, legal, financial matters
                  </div>
                </div>
              </div>

              <div className="pro-tip-box">
                <h3>💎 Real-World Examples</h3>
                <p><strong>Good:</strong> "Help me brainstorm ideas for my essay on climate change" then cite: "Ideas developed with AI assistance"</p>
                <p><strong>Bad:</strong> Copying AI-generated essay word-for-word and submitting as your work</p>
                <br />
                <p><strong>Good:</strong> "I'm a student looking for study tips" (generic context)</p>
                <p><strong>Bad:</strong> "My name is John Smith, SSN 123-45-6789, help me..." (private info)</p>
              </div>

              <button className="next-button" onClick={() => goToSection(3)}>
                Practice Ethical Thinking →
              </button>
            </div>
          </section>

          {/* Section 3: Interactive Exercise */}
          <section className={`section ${currentSection === 3 ? 'active' : ''}`}>
            <div className="section-inner">
              <h2>🎮 Your Turn: Spot the Ethical Issues</h2>

              <div className="challenge-box">
                <div className="scenario-box">
                  <h3>📖 Scenarios - Identify What's Wrong:</h3>
                  <br />

                  <div className="ai-response-box">
                    <h4>Scenario 1: The Homework Shortcut</h4>
                    <p>Alex asks AI: "Write a 5-page research paper on Shakespeare's Hamlet for my English class." Alex copies the entire response and submits it with his name on it.</p>
                  </div>

                  <div className="ai-response-box">
                    <h4>Scenario 2: The Privacy Overshare</h4>
                    <p>Sarah asks AI: "Help me write a letter to my doctor. My full name is Sarah Johnson, DOB 3/15/1995, and I have diabetes and high blood pressure. My insurance policy number is ABC123456..."</p>
                  </div>

                  <div className="ai-response-box">
                    <h4>Scenario 3: The Unchecked Advice</h4>
                    <p>Mike asks AI for investment advice and immediately invests his entire savings based on the AI's recommendations without any further research or consulting a financial advisor.</p>
                  </div>
                </div>

                <div className="task-box">
                  <h3>Your Task:</h3>
                  <p>For each scenario, identify:</p>
                  <ul className="task-list">
                    <li>✓ What ethical principle is being violated?</li>
                    <li>✓ What could go wrong?</li>
                    <li>✓ What should they do instead?</li>
                  </ul>
                </div>

                <textarea
                  className="prompt-input"
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Analyze each scenario...&#10;&#10;Scenario 1:&#10;Ethical issue: [What's wrong]&#10;Risk: [What could happen]&#10;Better approach: [What to do instead]&#10;&#10;(Continue for Scenarios 2 and 3)"
                  rows="12"
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
                        <strong>Key Ethical Issues:</strong><br /><br />
                        <strong>Scenario 1 (Plagiarism):</strong> Submitting AI work as your own violates academic integrity. Risk: failing grade, academic probation. Better: Use AI for brainstorming, write in your own words, cite AI assistance.<br /><br />
                        <strong>Scenario 2 (Privacy):</strong> Sharing sensitive medical and personal data with AI. Risk: data breaches, privacy violations. Better: Use generic descriptions without names, dates, policy numbers.<br /><br />
                        <strong>Scenario 3 (Verification):</strong> Making major financial decisions without verification. Risk: losing money, bad investments. Better: Use AI as starting point, consult real financial advisors, do thorough research.
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

          {/* Section 4: Summary & Completion */}
          <section className={`section ${currentSection === 4 ? 'active' : ''}`}>
            <div className="section-inner">
              <h2>🎉 Congratulations!</h2>

              <div className="completion-badge">
                <div className="badge-icon">🎓</div>
                <p>You've completed the AI Literacy Academy!</p>
              </div>

              <div className="summary-box">
                <h3>What You Learned in This Lesson:</h3>
                <ul className="checklist">
                  <li>✅ The four pillars: Privacy, Attribution, Bias Awareness, Verification</li>
                  <li>✅ How to protect sensitive information when using AI</li>
                  <li>✅ Why academic integrity and proper attribution matter</li>
                  <li>✅ Your responsibility to verify AI outputs for important decisions</li>
                </ul>
              </div>

              <div className="next-lesson-preview">
                <h3>🌟 Your Complete AI Literacy Journey</h3>
                <p>You now know how to:</p>
                <ul className="checklist">
                  <li>🎯 Write effective prompts with WHO, WHAT, HOW</li>
                  <li>📝 Add context to get personalized responses</li>
                  <li>🔍 Think critically and spot AI mistakes</li>
                  <li>⚖️ Use AI ethically and responsibly</li>
                </ul>
              </div>

              <div className="pro-tip-box">
                <h3>💎 Final Pro Tips:</h3>
                <p><strong>Remember the 3 R's:</strong></p>
                <ul className="checklist">
                  <li><strong>Respect</strong> privacy and intellectual property</li>
                  <li><strong>Reflect</strong> critically on AI outputs</li>
                  <li><strong>Responsibility</strong> for how you use AI</li>
                </ul>
                <br />
                <p>AI is a powerful tool when used ethically. You're now equipped to be a responsible AI user!</p>
              </div>

              <div className="takeaway-box">
                <h3>🚀 Keep Learning</h3>
                <p>AI technology is constantly evolving. Stay curious, stay ethical, and keep questioning. Visit resources like:</p>
                <ul className="checklist">
                  <li>• Your school's AI use policy</li>
                  <li>• AI ethics guidelines from organizations like IEEE or ACM</li>
                  <li>• Fact-checking sites for verification practice</li>
                </ul>
              </div>

              <div className="button-group">
                <button className="next-button primary" onClick={() => navigate('/')}>
                  🏠 Return to Home
                </button>
                <button className="next-button secondary" onClick={() => goToSection(1)}>
                  ↻ Review This Lesson
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </LessonLayout>
  );
}

export default Lesson4;
