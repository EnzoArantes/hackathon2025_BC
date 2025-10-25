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

// Check the user's response for identifying red flags
function checkPrompt() {
    const userResponse = document.getElementById('userPrompt').value.trim();
    const feedbackBox = document.getElementById('feedback');
    const continueButton = document.getElementById('continueButton');

    if (userResponse.length < 50) {
        feedbackBox.innerHTML = `
            <div class="feedback-partial">
                <h3>⚠️ Too Short!</h3>
                <p>Try to identify at least 3 specific problems with the AI response and explain how you'd verify them.</p>
            </div>
        `;
        feedbackBox.style.display = 'block';
        return;
    }

    // Check for identification of key red flags in the example
    const mentionsUnverifiable = /unverifiable|can't verify|no source|citation|harvard|dr\.?\s*johnson|2023 study|fake|made up/i.test(userResponse);
    const mentionsAbsolutes = /absolute|cure|completely|all types|prevents all|no side effects|too strong|overstated|exaggerat|guarantee/i.test(userResponse);
    const mentionsDosage = /5000|dosage|too much|too high|safe|toxic|maximum|excess|side effect/i.test(userResponse);
    const mentionsVerification = /verify|check|search|look up|consult|doctor|expert|medical|reliable source|official|research|pubmed|journal/i.test(userResponse);
    const hasMedicalConcern = /medical|health|dangerous|misinformation|misleading|harmful|risky/i.test(userResponse);
    const isDetailed = userResponse.length > 120;

    let score = 0;
    let feedback = [];

    if (mentionsUnverifiable) {
        score += 25;
        feedback.push('✅ Great! You identified the unverifiable citation (the fake Harvard study)');
    } else {
        feedback.push('❌ Look for citations or sources that sound real but may be made up');
    }

    if (mentionsAbsolutes) {
        score += 25;
        feedback.push('✅ Excellent! You caught the absolute claims like "cure completely" or "prevents all cancer"');
    } else {
        feedback.push('❌ Watch for absolute statements - they\'re rarely accurate in health/science');
    }

    if (mentionsDosage) {
        score += 20;
        feedback.push('✅ Good! You noticed the concerning dosage claim (5000mg is very high)');
    } else {
        feedback.push('💡 The extremely high dosage and claim of "no side effects" are major red flags');
    }

    if (mentionsVerification) {
        score += 20;
        feedback.push('✅ Perfect! You explained how to verify the information with reliable sources');
    } else {
        feedback.push('❌ Always explain HOW you would verify suspicious claims');
    }

    if (hasMedicalConcern || isDetailed) {
        score += 10;
        feedback.push('✅ You showed strong critical thinking about medical misinformation');
    }

    // Display feedback
    const isSuccess = score >= 70;

    feedbackBox.innerHTML = `
        <div class="${isSuccess ? 'feedback-success' : 'feedback-partial'}">
            <h3>${isSuccess ? '🎉 Excellent Critical Thinking!' : '💪 Keep Analyzing!'}</h3>
            <div class="score-display">${score}/100</div>
            <ul class="feedback-list">
                ${feedback.map(item => `<li>${item}</li>`).join('')}
            </ul>
            ${isSuccess ? `
                <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 10px;">
                    <strong>The main red flags in that response were:</strong><br><br>
                    <ol style="text-align: left; line-height: 1.8;">
                        <li><strong>Fake citation:</strong> The "2023 Harvard study by Dr. Johnson" is unverifiable and likely made up.</li>
                        <li><strong>Absolute claims:</strong> Saying vitamin C "cures completely" and "prevents all types of cancer" is false.</li>
                        <li><strong>Dangerous dosage:</strong> 5000mg is far above recommended levels and can cause side effects.</li>
                        <li><strong>Oversimplification:</strong> "No side effects at any dosage" is dangerously incorrect.</li>
                    </ol>
                    <br>
                    <strong>How to verify:</strong> Check medical sources like Mayo Clinic, NIH, or consult a healthcare provider. Look up the study in PubMed or Google Scholar. Research the recommended daily allowance for vitamin C (it's around 65-90mg for adults).
                </div>
            ` : `
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.5); border-radius: 8px;">
                    <strong>Hint:</strong> Look for claims that sound too good to be true (curing diseases, preventing all cancers), unverifiable sources (can you find that Harvard study?), dangerous medical advice (that dosage is very high), and absolute statements with no nuance.
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
