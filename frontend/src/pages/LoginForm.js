import { useState } from "react";
import { useAuth } from "./AuthContext";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login(username, password)) {
      alert("Login successful!");
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="auth-title">Login</h2>
      <p className="auth-subtitle">
        Sign in with your credentials to access Pure Essence.
      </p>

      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control auth-input"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control auth-input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn auth-btn w-100">
        Login
      </button>

    </form>
  );
}

export default LoginForm;
