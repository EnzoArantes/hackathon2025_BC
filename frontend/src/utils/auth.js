// Authentication helper functions

// Check if user is logged in
export function isAuthenticated() {
  return sessionStorage.getItem('isLoggedIn') === 'true';
}

// Get current username
export function getCurrentUsername() {
  return sessionStorage.getItem('username') || 'Student';
}

// Set authentication
export function setAuthentication(username) {
  sessionStorage.setItem('username', username);
  sessionStorage.setItem('isLoggedIn', 'true');
}

// Clear authentication
export function clearAuthentication() {
  sessionStorage.clear();
}
