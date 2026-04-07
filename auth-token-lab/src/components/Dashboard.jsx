import { useState, useEffect } from "react";

const Dashboard = ({ onLogout }) => {
  const [accessToken, setAccessToken] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    const updateTokens = () => {
      setAccessToken(localStorage.getItem("accessToken") || "");
      const exp = localStorage.getItem("accessTokenExpiry");
      setExpiry(exp ? new Date(parseInt(exp)).toLocaleString() : "");
    };
    updateTokens();
    // Update every second to show real-time expiry
    const interval = setInterval(updateTokens, 1000);
    return () => clearInterval(interval);
  }, []);

  const simulateExpiry = () => {
    // Set expiry to past
    localStorage.setItem("accessTokenExpiry", Date.now() - 1000);
    // Trigger re-check by reloading or something, but since state updates, perhaps force refresh
    window.location.reload();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>You are logged in</p>
      <p><strong>Expires at:</strong> {expiry}</p>
      <button onClick={simulateExpiry}>Simulate Token Expiry</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;