import "../styles/Home.css";
import Header from "../assets/header.jpg";
import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../pages/CartContext";
import axios from "axios";
import Dior from "../assets/diorlogo.jpg";
import Ysl from "../assets/yslLogo.jpg";
import Versace from "../assets/versaceLogo.jpg";
import Armani from "../assets/armaniLogo.jpg";
import Chanel from "../assets/chanelLogo.jpg";
import Gucci from "../assets/gucciLogo.jpg";


const BACKEND = "http://localhost:5000";
const brandLogos = {
  Dior,
  "Yves Saint Laurent": Ysl,
  Versace,
  Armani,
  Chanel,
  Gucci,
};

function Home() {
  const { addToCart } = useContext(CartContext);
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const res = await axios.get(`${BACKEND}/perfumes`);
        setPerfumes(res.data || []);
      } catch (err) {
        console.log("❌ fetch error:", err?.response?.data || err.message);
        setPerfumes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfumes();
  }, []);

  const brands = useMemo(() => {
    const set = new Set(perfumes.map((p) => p.brand).filter(Boolean));
    return Array.from(set);
  }, [perfumes]);

  const womenPerfumes = useMemo(
    () => perfumes.filter((p) => p.gender === "women"),
    [perfumes]
  );
  const menPerfumes = useMemo(
    () => perfumes.filter((p) => p.gender === "men"),
    [perfumes]
  );

  const PerfumeCard = ({ p }) => {
    const img =
      p.imageUrl ||
      (p.image ? `${BACKEND}/images/${p.image}` : "https://via.placeholder.com/300x400?text=No+Image");

    const priceNum = Number(p.price);

    return (
      <div className="col-6 col-sm-4 col-md-3">
        <div className="card h-100 border-0 shadow-sm product-card text-center">
          <img src={img} className="product-img card-img-top" alt={p.name} />

          <div className="card-body">
            <p className="product-name mb-1">{p.name}</p>
            <p className="product-desc mb-1">{p.description}</p>
            <p className="product-price mb-2">${priceNum.toFixed(2)}</p>
          </div>

          <div className="pb-3">
            <button
              className="btn btn-sm btn-gold"
              onClick={() => {
                addToCart({
                  id: p.id,
                  img,
                  name: p.name,
                  desc: p.description,
                  price: `$${priceNum.toFixed(2)}`,
                  gender: p.gender,
                  brand: p.brand,
                });
                alert("✅ Item added to cart!");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="header-container">
        <img src={Header} className="header-img" alt="header" />
        <div className="header-text">
          <h1 className="header-title">Pure Essence</h1>
          <p className="header-sub">Where Luxury Meets Aroma</p>
        </div>
      </div>

      <br /><br />
      <section className="section">
        <h3 className="section-title">Most Popular Perfume Brands</h3>
        <div className="container">
          {loading ? (
            <p className="page-subtitle text-center">Loading brands...</p>
          ) : (
            <div className="row justify-content-center gap-4">
              {brands.map((b) => (
                <img key={b} src={brandLogos[b]} alt={b} className="brand-img" />
              ))}
            </div>
          )}
        </div>
      </section>

      <br /><br />
      <section className="section">
        <h3 className="section-title">Perfumes for Women</h3>
        <div className="container mt-4">
          {loading ? (
            <p className="page-subtitle text-center">Loading perfumes...</p>
          ) : (
            <div className="row g-4 justify-content-center">
              {womenPerfumes.map((p) => (
                <PerfumeCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <br /><br />
      <section className="section">
        <h3 className="section-title">Perfumes for Men</h3>
        <div className="container mt-4">
          {loading ? (
            <p className="page-subtitle text-center">Loading perfumes...</p>
          ) : (
            <div className="row g-4 justify-content-center">
              {menPerfumes.map((p) => (
                <PerfumeCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
