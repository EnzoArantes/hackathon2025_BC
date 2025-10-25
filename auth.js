// Authentication JavaScript
// Handles login, registration, and session management with Django backend

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Toggle between login and register forms
function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('registerTab').classList.remove('active');
    
    // Clear any error messages
    hideError('loginError');
    hideError('registerError');
}

function showRegister() {
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerTab').classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
    
    // Clear any error messages
    hideError('loginError');
    hideError('registerError');
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Hide error message
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}

// Handle Login Form Submit
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const loginButton = document.getElementById('loginButton');
    
    // Validate
    if (!username || !password) {
        showError('loginError', 'Please fill in all fields');
        return;
    }
    
    // Disable button and show loading
    loginButton.disabled = true;
    loginButton.classList.add('loading');
    loginButton.textContent = 'Logging in';
    hideError('loginError');
    
    try {
        const response = await fetch(`${API_BASE_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important: includes session cookies
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Login successful
            console.log('Login successful:', data);
            
            // Store username in sessionStorage for personalization
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to main page
            window.location.href = 'index.html';
        } else {
            // Login failed
            showError('loginError', data.error || 'Invalid username or password');
            loginButton.disabled = false;
            loginButton.classList.remove('loading');
            loginButton.textContent = 'Login →';
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('loginError', 'Connection error. Make sure the backend is running at http://127.0.0.1:8000');
        loginButton.disabled = false;
        loginButton.classList.remove('loading');
        loginButton.textContent = 'Login →';
    }
});

// Handle Register Form Submit
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const registerButton = document.getElementById('registerButton');
    
    // Validate
    if (!username || !password || !confirmPassword) {
        showError('registerError', 'Please fill in all fields');
        return;
    }
    
    if (username.length < 3) {
        showError('registerError', 'Username must be at least 3 characters');
        return;
    }
    
    if (password.length < 6) {
        showError('registerError', 'Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('registerError', 'Passwords do not match');
        return;
    }
    
    // Disable button and show loading
    registerButton.disabled = true;
    registerButton.classList.add('loading');
    registerButton.textContent = 'Creating Account';
    hideError('registerError');
    
    try {
        const response = await fetch(`${API_BASE_URL}/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important: includes session cookies
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Registration successful
            console.log('Registration successful:', data);
            
            // Store username in sessionStorage
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // Show success message briefly then redirect
            registerButton.classList.remove('loading');
            registerButton.textContent = '✓ Account Created!';
            registerButton.style.background = 'var(--primary-green)';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            // Registration failed
            showError('registerError', data.error || 'Registration failed. Username may already exist.');
            registerButton.disabled = false;
            registerButton.classList.remove('loading');
            registerButton.textContent = 'Create Account →';
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError('registerError', 'Connection error. Make sure the backend is running at http://127.0.0.1:8000');
        registerButton.disabled = false;
        registerButton.classList.remove('loading');
        registerButton.textContent = 'Create Account →';
    }
});

// Check if user is already logged in when page loads
window.addEventListener('load', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        // User is already logged in, redirect to main page
        window.location.href = 'index.html';
    }
    
    console.log('🎓 AI Literacy Academy - Auth page loaded');
});