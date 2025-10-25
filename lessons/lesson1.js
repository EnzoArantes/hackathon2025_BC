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
    
    if (userPrompt.length < 20) {
        feedbackBox.innerHTML = `
            <div class="feedback-partial">
                <h3>⚠️ Too Short!</h3>
                <p>Your prompt needs more detail. Try to include WHO, WHAT, and HOW.</p>
            </div>
        `;
        feedbackBox.style.display = 'block';
        return;
    }
    
    // Check for key elements
    const hasRole = /you are|act as|as a|as an/i.test(userPrompt);
    const hasSpecifics = userPrompt.length > 50;
    const hasFormat = /bullet|list|paragraph|format|points|section/i.test(userPrompt);
    
    let score = 0;
    let feedback = [];
    
    if (hasRole) {
        score += 35;
        feedback.push('✅ Great! You defined a role (WHO)');
    } else {
        feedback.push('❌ Try adding a role (e.g., "You are a writing tutor...")');
    }
    
    if (hasSpecifics) {
        score += 35;
        feedback.push('✅ Good! You included specific details (WHAT)');
    } else {
        feedback.push('❌ Be more specific about what you need');
    }
    
    if (hasFormat) {
        score += 30;
        feedback.push('✅ Excellent! You specified a format (HOW)');
    } else {
        feedback.push('❌ Try specifying how you want the output formatted');
    }
    
    // Display feedback
    const isSuccess = score >= 70;
    
    feedbackBox.innerHTML = `
        <div class="${isSuccess ? 'feedback-success' : 'feedback-partial'}">
            <h3>${isSuccess ? '🎉 Well Done!' : '💪 Keep Going!'}</h3>
            <div class="score-display">${score}/100</div>
            <ul class="feedback-list">
                ${feedback.map(item => `<li>${item}</li>`).join('')}
            </ul>
            ${isSuccess ? `
                <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 10px;">
                    <strong>Example of a great prompt:</strong><br><br>
                    <em>"You are an experienced writing tutor. Help me improve the introduction paragraph of my essay about climate change. Provide 3-5 specific suggestions in bullet points, focusing on thesis clarity and creating a strong hook."</em>
                </div>
            ` : `
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.5); border-radius: 8px;">
                    <strong>Hint:</strong> Think about WHO should help you (a tutor? an expert?), WHAT exactly you need help with, and HOW you want the response formatted.
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