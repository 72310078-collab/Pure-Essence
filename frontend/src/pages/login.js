import "../styles/Pages.css";
import { useAuth } from "./AuthContext";
import LoginForm from "./LoginForm";

function Login() {
  const { user, logout } = useAuth();

  return (
    <div className="auth-wrapper">
      <div className="auth-card card shadow-sm border-0">
        <div className="card-body">
          {user ? (
            <div className="text-center">
              <h2 className="auth-welcome">Welcome, {user.username}!</h2>
              <p>
                You are now logged in to Pure Essence.
              </p>
              <button className="btn auth-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

