let currentSection = 1;
const totalSections = 4;

// Update progress bar
function updateProgress() {
    const progress = (currentSection / totalSections) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Navigate to a section
function goToSection(sectionNum) {
    // Hide current section
    const currentSectionEl = document.getElementById(`section${currentSection}`);
    currentSectionEl.classList.remove('active');
    
    // Show new section
    const newSectionEl = document.getElementById(`section${sectionNum}`);
    newSectionEl.classList.add('active');
    
    // Update current section
    currentSection = sectionNum;
    updateProgress();
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Check the user's prompt
function checkPrompt() {
    const userPrompt = document.getElementById('userPrompt').value.trim();
    const feedbackBox = document.getElementById('feedback');
    const continueButton = document.getElementById('continueButton');
    
    if (userPrompt.length < 30) {
        feedbackBox.innerHTML = `
            <div class="feedback-partial">
                <h3>⚠️ Too Short!</h3>
                <p>Your prompt needs much more context. Aim for at least 100 characters with specific details.</p>
            </div>
        `;
        feedbackBox.style.display = 'block';
        return;
    }
    
    // Check for context elements
    const hasJob = /interview|internship|position|role|job|software|engineer|marketing|design|analyst/i.test(userPrompt);
    const hasBackground = /student|major|experience|project|year|sophomore|junior|senior|graduated|degree/i.test(userPrompt);
    const hasConcern = /nervous|worried|concern|help|prepare|practice|struggle|difficulty|weak|improve/i.test(userPrompt);
    const hasTimeline = /tomorrow|next week|monday|days|weeks|soon|upcoming|scheduled/i.test(userPrompt);
    const isDetailed = userPrompt.length > 100;
    
    let score = 0;
    let feedback = [];
    
    if (hasJob) {
        score += 25;
        feedback.push('✅ Great! You specified the job/role');
    } else {
        feedback.push('❌ Add details about what job or position you\'re interviewing for');
    }
    
    if (hasBackground) {
        score += 25;
        feedback.push('✅ Excellent! You included your background');
    } else {
        feedback.push('❌ Mention your education, experience, or relevant skills');
    }
    
    if (hasConcern) {
        score += 20;
        feedback.push('✅ Good! You identified what concerns you');
    } else {
        feedback.push('❌ Share what specifically worries you or what you need help with');
    }
    
    if (hasTimeline) {
        score += 15;
        feedback.push('✅ Nice! You mentioned when the interview is');
    } else {
        feedback.push('💡 Bonus tip: Adding a timeline helps AI prioritize your preparation');
    }
    
    if (isDetailed) {
        score += 15;
        feedback.push('✅ Your prompt is detailed and thorough!');
    } else {
        feedback.push('💡 Try adding more specific details to get even better advice');
    }
    
    // Display feedback
    const isSuccess = score >= 70;
    
    feedbackBox.innerHTML = `
        <div class="${isSuccess ? 'feedback-success' : 'feedback-partial'}">
            <h3>${isSuccess ? '🎉 Excellent!' : '💪 Getting There!'}</h3>
            <div class="score-display">${score}/100</div>
            <ul class="feedback-list">
                ${feedback.map(item => `<li>${item}</li>`).join('')}
            </ul>
            ${isSuccess ? `
                <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 10px;">
                    <strong>Perfect example with rich context:</strong><br><br>
                    <em>"I'm interviewing for a software engineering internship at a fintech startup next Tuesday. I'm a sophomore CS major with one Python project on GitHub but no professional experience. I'm nervous about technical questions on data structures and explaining my project clearly. Help me prepare a 2-minute introduction and practice answers for common technical questions."</em>
                </div>
            ` : `
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.5); border-radius: 8px;">
                    <strong>Hint:</strong> Think about all the details that would help a friend give you personalized advice. What's the role? What's your background? What specifically worries you? When is it?
                </div>
            `}
        </div>
    `;
    
    feedbackBox.style.display = 'block';
    
    if (isSuccess) {
        continueButton.style.display = 'inline-block';
    }
}

// Initialize
updateProgress();