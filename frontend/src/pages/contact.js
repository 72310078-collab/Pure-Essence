import "../styles/Pages.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

function Contact() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">
          We’d love to help you find your signature scent or answer any questions.
        </p>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm contact-box">
              <div className="card-body">
                <p className="contact-label mb-1">Email</p>
                <p>
                  <EmailIcon fontSize="small" />{" "}
                  <a href="mailto:pureEssence7@gmail.com">pureEssence7@gmail.com</a>
                </p>

                <p className="contact-label mt-3 mb-1">Phone</p>
                <p>
                  <PhoneIcon fontSize="small" />{" "}
                  <a href="tel:+96170956297">+961 70 956 297</a>
                </p>

                <p className="mt-3 mb-0">
                  Our team will respond within 24–48 hours on business days.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Your name" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="you@example.com" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-gold" alert=" successfully sen!">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
