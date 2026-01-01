import "../styles/Pages.css";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function AdminLogin() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("http://localhost:5000/admin/login", { username, password });
      login(res.data.user);
      nav("/admin/dashboard");
    } catch (err) {
      setMsg(err?.response?.data?.error || "❌ Admin login error");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card shadow-sm border-0 auth-card p-4">
        <h2 className="auth-title">Admin Login</h2>
        <p className="auth-subtitle">Admins only.</p>

        {msg && <div className="alert alert-light">{msg}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Admin username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
            />
          </div>

          <button className="btn w-100 auth-btn" type="submit">
            Login as Admin
          </button>
        </form>

        <p className="text-center mt-3">
          Back to client? <Link to="/">Go Home</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
