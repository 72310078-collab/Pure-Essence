import "../styles/Pages.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function ClientRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await axios.post("http://localhost:5000/register", { username, password });
      setMsg("✅ Registration successful. Redirecting to login...");
      setTimeout(() => nav("/login"), 800);
    } catch (err) {
      setMsg(err?.response?.data?.error || "❌ Register error");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card shadow-sm border-0 auth-card p-4">
        <h2 className="auth-title">Register</h2>
        <p className="auth-subtitle">Create your Pure Essence account.</p>

        {msg && <div className="alert alert-light">{msg}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button className="btn w-100 auth-btn" type="submit">
            Create Account
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ClientRegister;
