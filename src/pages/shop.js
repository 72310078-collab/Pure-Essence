import "../styles/Pages.css";
import { useContext } from "react";
import { CartContext } from "../pages/CartContext";
import { useState } from "react";


import Missdior from "../assets/diorwomen.jpg";
import Libre from "../assets/yslwomen.jpg";
import Bright from "../assets/versacewomen.jpg";
import Si from "../assets/armaniwomen.jpg";
import Chance from "../assets/chanelwomen.jpg";
import Flora from "../assets/gucciwomen.jpg";

import Sauvage from "../assets/diormen.jpg";
import YslM from "../assets/yslmen.jpg";
import Eros from "../assets/versacemen.jpg";
import You from "../assets/armanimen.jpg";
import Bleu from "../assets/chanelmen.jpg";
import Guilty from "../assets/guccimen.jpg";

function Shop() {
  const [filter, setFilter] = useState("all");
  const { addToCart } = useContext(CartContext);
  const perfumes = [
            { img: Missdior, name: "Miss Dior by Dior", desc: "Romantic florals with a timeless trail.", price: "$120.00",gender: "women" },
            { img: Libre, name: "Libre by Yves Saint Laurent", desc: "Bold lavender with warm vanilla.", price: "$135.00",gender: "women" },
            { img: Bright, name: "Bright Crystal by Versace", desc: "Fresh, fruity florals with sparkle.", price: "$95.00",gender: "women" },
            { img: Si, name: "Si by Armani", desc: "Velvety vanilla and cassis.", price: "$110.00" ,gender: "women"},
            { img: Chance, name: "Chance by Chanel", desc: "Playful, elegant florals.", price: "$140.00" ,gender: "women"},
            { img: Flora, name: "Flora by Gucci", desc: "Youthful white florals & citrus.", price: "$105.00",gender: "women" },
            { img: Sauvage, name: "Sauvage by Dior", desc: "Fresh bergamot and rugged woods.", price: "$115.00", gender: "men" },
            { img: YslM, name: "Y by Yves Saint Laurent", desc: "Clean freshness with woods.", price: "$118.00" , gender: "men"},
            { img: Eros, name: "Eros by Versace", desc: "Mint, vanilla and woods in power.", price: "$100.00", gender: "men" },
            { img: You, name: "Stronger With You by Armani", desc: "Sweet chestnut & warm spices.", price: "$112.00" , gender: "men"},
            { img: Bleu, name: "Bleu de Chanel", desc: "Citrus, incense and woods.", price: "$145.00", gender: "men" },
            { img: Guilty, name: "Gucci Guilty", desc: "Seductive lavender and patchouli.", price: "$108.00", gender: "men" },
          ];
  const filteredPerfumes =
  filter === "all"
    ? perfumes
    : perfumes.filter(p => p.gender === filter);
  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Shop</h1>
        <p className="page-subtitle">
          Discover designer perfumes and colognes for every mood and moment.
        </p>
      <div className="mb-4 d-flex gap-3 justify-content-center">
        <button className={`btn ${filter === "all" ? "btn-gold" : "btn-outline-dark"}`}
            onClick={() => setFilter("all")}> All </button>

        <button className={`btn ${filter === "women" ? "btn-gold" : "btn-outline-dark"}`}
         onClick={() => setFilter("women")}> Women </button>
        <button className={`btn ${filter === "men" ? "btn-gold" : "btn-outline-dark"}`}
        onClick={() => setFilter("men")} >  Men </button>
      </div>

        <div className="row g-4">
          {filteredPerfumes.map((p, i) => (

            <div className="col-6 col-sm-4 col-md-3" key={i}>
              <div className="card h-100 border-0 shadow-sm product-card">
                <img src={p.img} className="product-img card-img-top" alt={p.name} />
                <div className="card-body">
                  <p className="product-name mb-1">{p.name}</p>
                  <p className="product-desc mb-1">{p.desc}</p>
                  <p className="product-price mb-2">{p.price}</p>
                  <button
                        className="btn btn-sm btn-gold"
                          onClick={() => {addToCart(p); alert("✅ Item added to cart!");}} >
                                                   Add to Cart </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
