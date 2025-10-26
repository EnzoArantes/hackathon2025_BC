// API utilities for authentication and progress tracking
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Login function
export async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: includes session cookies
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    return { ok: response.ok, data };
}

// Register function
export async function register(username, password) {
    const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: includes session cookies
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    return { ok: response.ok, data };
}

// Logout function
export async function logout() {
    try {
        await fetch(`${API_BASE_URL}/logout/`, {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.log('Logout error:', error);
    }
}

// Update progress
export async function updateProgress(lessonId, score) {
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

// Get user progress
export async function getUserProgress() {
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