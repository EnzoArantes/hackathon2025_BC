// Simple navigation functions
function startCourse() {
    // Go directly to lesson 1
    window.location.href = 'lessons/lesson1.html';
}

function goToLesson(lessonNumber) {
    // Navigate to the specific lesson
    window.location.href = `lessons/lesson${lessonNumber}.html`;
}

// Add a nice welcome message
window.addEventListener('load', function() {
    console.log('🎓 AI Literacy Academy loaded successfully!');
});