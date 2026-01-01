
import "../styles/Pages.css";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function ClientLogin() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      login(res.data.user);
      if (Number(res.data.user.isAdmin) === 1) nav("/admin/dashboard");
      else nav("/");
    } catch (err) {
      setMsg(err?.response?.data?.error || "❌ Login error");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card shadow-sm border-0 auth-card p-4">
        <h2 className="auth-title">Login</h2>
        <p className="auth-subtitle">Sign in to access Pure Essence.</p>

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
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          No account? <Link to="/register">Register</Link>
        </p>

        <p className="text-center mt-1">
          Are you admin? <Link to="/admin/login">Admin Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ClientLogin;
