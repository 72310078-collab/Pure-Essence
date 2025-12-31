import "../styles/Pages.css";
import Header from "../assets/h.jpg";

function About() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">About Pure Essence</h1>
        <p className="page-subtitle">
          A curated world of scent, crafted to turn everyday moments into memories.
        </p>

        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <img src={Header} alt="Pure Essence" className="card-img-top" />
            </div>
          </div>

          <div className="col-md-6">
            <p>
              Pure Essence was born from a love for fine fragrance — the kind that lingers in the air
              and in memory. We carefully select perfumes and colognes from iconic houses like Dior,
              Chanel, Armani, Versace, Gucci and Yves Saint Laurent.
            </p>
            <p>
              Our mission is to help you discover a scent that feels like an extension of yourself —
              soft and romantic, bold and daring, or quietly elegant.
            </p>
            <p>
              Each bottle in our collection is chosen for its quality, longevity and character, so
              that every spray feels like a small luxury.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
