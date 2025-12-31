
import '../styles/Navbar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";


function NavBar() {
 

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container-fluid">
        
        {/* TEXT LOGO */}
        <a className="navbar-brand logo-container" href="/Home">
          <span className="logo-main">PURE</span>
          <span className="logo-sub">Essence</span>
        </a>

        {/* Toggler / humburger icon*/}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center Menu */}
        <div className="collapse navbar-collapse justify-content-center" id="mainNav">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="/shop">Shop</a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="/About">About</a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="/Contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Right Icons */}
        <div className="d-flex align-items-center gap-4 pe-2">



          <a href="/login" className="icon">
            <PersonIcon sx={{ fontSize: 30 }} />
          </a>

          <a href="/cart" className="icon">
            <ShoppingBagIcon sx={{ fontSize: 30 }} />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
