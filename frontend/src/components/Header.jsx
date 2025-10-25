import { useNavigate } from 'react-router-dom';
import { getCurrentUsername, clearAuthentication } from '../utils/auth';
import { logout as apiLogout } from '../utils/api';

function Header() {
  const navigate = useNavigate();
  const username = getCurrentUsername();

  const handleLogout = async () => {
    await apiLogout();
    clearAuthentication();
    navigate('/login');
  };

  return (
    <header>
      <div className="header-content">
        <div>
          <h1>🎓 AI Literacy Academy</h1>
          <p className="tagline">Master AI in 15 Minutes</p>
        </div>
        <div className="user-controls">
          <span className="welcome-text">Welcome back, {username}! 👋</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
