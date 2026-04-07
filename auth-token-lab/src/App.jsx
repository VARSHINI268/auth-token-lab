import { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check if access token is valid
  const isAccessTokenValid = () => {
    const token = localStorage.getItem("accessToken");
    const expiry = localStorage.getItem("accessTokenExpiry");
    return token && expiry && Date.now() < parseInt(expiry);
  };

  // Function to refresh access token
  const refreshAccessToken = async () => {
    // Simulate calling backend: "Give me a new access token"
    // Backend verifies refresh token (check if cookie exists)
    const cookies = document.cookie.split(';');
    const refreshToken = cookies.find(cookie => cookie.trim().startsWith('refreshToken='))?.split('=')[1];
    
    if (refreshToken) {
      // Simulate backend verification and issuing new access token
      const newAccessToken = "new-access-jwt-token-" + Date.now();
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("accessTokenExpiry", Date.now() + 5 * 60 * 1000);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (isAccessTokenValid()) {
        setIsAuthenticated(true);
      } else {
        // Access token expired, try to refresh
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();

    // Check every minute for token expiry and refresh if needed
    const interval = setInterval(checkAuth, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiry");
    // Clear refresh token cookie
    document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Auth Token Simulation Lab</h1>
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;