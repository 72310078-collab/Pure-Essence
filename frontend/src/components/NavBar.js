import "../styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { AuthContext } from "../auth/AuthContext";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container-fluid">
        <Link className="navbar-brand logo-container" to="/home">
          <span className="logo-main">PURE</span>
          <span className="logo-sub">Essence</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="mainNav">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/shop">
                Shop
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-4 pe-2">
          {!user ? (
            <Link to="/login" className="icon">
              <PersonIcon sx={{ fontSize: 30 }} />
            </Link>
          ) : (
            <div>
              <span className="auth-welcome">
                Welcome to our website, {user.username}
              </span>

              <button
                className="btn btn-outline-dark btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          <Link to="/cart" className="icon">
            <ShoppingBagIcon sx={{ fontSize: 30 }} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

