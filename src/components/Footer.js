import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-container mt-5">
      <div className="container">

        <div className="row align-items-center text-center text-md-start">

          <div className="col-md-4 mb-3 mb-md-0">
            <p className="footer-text mb-1">
              &copy; Pure Essence
            </p>
            <p className="footer-subtext">
              Luxury fragrances for every moment
            </p>
          </div>
          
          <div className="col-md-4 mb-3 mb-md-0">
            <p className="footer-contact mb-1 footer-contact-line">
              <EmailIcon fontSize="small" />{" "}
              <a href="mailto:pureEssence7@gmail.com">
                pureEssence7@gmail.com
              </a>
            </p>

            <p className="footer-contact mb-0 footer-contact-line">
              <PhoneIcon fontSize="small" />{" "}
              <a href="tel:+96170956297">
                +961 70 956 297
              </a>
            </p>
          </div>

          
          <div className="col-md-4 d-flex justify-content-center justify-content-md-end gap-4 footer-icons">
            <a href="#" aria-label="Instagram">
              <InstagramIcon fontSize="inherit" />
            </a>

            <a href="#" aria-label="Facebook">
              <FacebookIcon fontSize="inherit" />
            </a>

            <a href="#" aria-label="Twitter">
              <TwitterIcon fontSize="inherit" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;

