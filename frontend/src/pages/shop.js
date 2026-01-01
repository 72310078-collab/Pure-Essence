import "../styles/Pages.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../pages/CartContext";
import axios from "axios";

const BACKEND = "http://localhost:5000";

function Shop() {
  const [filter, setFilter] = useState("all");
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

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

  const filteredPerfumes = useMemo(() => {
    if (filter === "all") return perfumes;
    return perfumes.filter((p) => p.gender === filter);
  }, [filter, perfumes]);

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Shop</h1>
        <p className="page-subtitle">
          Discover designer perfumes and colognes for every mood and moment.
        </p>

        <div className="mb-4 d-flex gap-3 justify-content-center">
          <button
            className={`btn ${filter === "all" ? "btn-gold" : "btn-outline-dark"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn ${filter === "women" ? "btn-gold" : "btn-outline-dark"}`}
            onClick={() => setFilter("women")}
          >
            Women
          </button>
          <button
            className={`btn ${filter === "men" ? "btn-gold" : "btn-outline-dark"}`}
            onClick={() => setFilter("men")}
          >
            Men
          </button>
        </div>

        {loading ? (
          <p className="page-subtitle text-center">Loading perfumes...</p>
        ) : filteredPerfumes.length === 0 ? (
          <p className="page-subtitle text-center">No perfumes found.</p>
        ) : (
          <div className="row g-4">
            {filteredPerfumes.map((p) => {
              const img =
                p.imageUrl ||
                (p.image ? `${BACKEND}/images/${p.image}` : "https://via.placeholder.com/300x400?text=No+Image");

              const priceNum = Number(p.price);

              return (
                <div className="col-6 col-sm-4 col-md-3" key={p.id}>
                  <div className="card h-100 border-0 shadow-sm product-card">
                    <img src={img} className="product-img card-img-top" alt={p.name} />

                    <div className="card-body">
                      <p className="product-name mb-1">{p.name}</p>
                      <p className="product-desc mb-1">{p.description}</p>
                      <p className="product-price mb-2">${priceNum.toFixed(2)}</p>

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
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;

