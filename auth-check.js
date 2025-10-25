// Auth Check - Include this file on protected pages
// Verifies user is logged in before allowing access

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Check authentication status
async function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    // If no login flag in sessionStorage, redirect to login
    if (isLoggedIn !== 'true') {
        console.log('Not logged in - redirecting to login page');
        window.location.href = '/login.html';
        return false;
    }
    
    // Optionally: verify session with backend
    // Uncomment if you want to verify the session is still valid
    /*
    try {
        const response = await fetch(`${API_BASE_URL}/check-session/`, {
            method: 'GET',
            credentials: 'include'
        });
        
        if (!response.ok) {
            // Session expired
            sessionStorage.clear();
            window.location.href = '/login.html';
            return false;
        }
    } catch (error) {
        console.error('Session check error:', error);
    }
    */
    
    return true;
}

// Get current username
function getCurrentUsername() {
    return sessionStorage.getItem('username') || 'Student';
}

// Logout function
async function logout() {
    try {
        // Optional: call backend logout endpoint if it exists
        await fetch(`${API_BASE_URL}/logout/`, {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.log('Logout error:', error);
    }
    
    // Clear session storage
    sessionStorage.clear();
    
    // Redirect to login
    window.location.href = '/login.html';
}

// Send progress update to backend
async function updateProgress(lessonId, score) {
    try {
        const response = await fetch(`${API_BASE_URL}/update-progress/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important: includes session cookies
            body: JSON.stringify({
                lesson_id: lessonId,
                score: score
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            console.log('Progress updated successfully:', data);
            return true;
        } else {
            console.error('Failed to update progress:', data);
            return false;
        }
    } catch (error) {
        console.error('Progress update error:', error);
        return false;
    }
}

// Get user progress from backend
async function getUserProgress() {
    try {
        const response = await fetch(`${API_BASE_URL}/progress/`, {
            method: 'GET',
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch progress');
            return null;
        }
    } catch (error) {
        console.error('Get progress error:', error);
        return null;
    }
}

// Run auth check when page loads
checkAuth();

// Export functions for use in other scripts
window.authUtils = {
    checkAuth,
    getCurrentUsername,
    logout,
    updateProgress,
    getUserProgress
};