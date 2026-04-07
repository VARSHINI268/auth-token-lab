const Login = ({ onLogin }) => {
  const handleLogin = () => {
    // Simulate server response: access token (short life) and refresh token (secure cookie)
    const accessToken = "access-jwt-token-" + Date.now();
    const refreshToken = "refresh-jwt-token-" + Date.now();
    
    // Store access token in localStorage (short-lived)
    localStorage.setItem("accessToken", accessToken);
    // Set expiration time for access token (e.g., 5 minutes from now)
    localStorage.setItem("accessTokenExpiry", Date.now() + 5 * 60 * 1000);
    
    // Store refresh token in secure cookie
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict; max-age=${7 * 24 * 60 * 60}`; // 7 days
    
    onLogin();
  };
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
export default Login;