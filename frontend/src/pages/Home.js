import "../styles/Home.css";
import Header from "../assets/header.jpg";
import { useContext } from "react";
import { CartContext } from "../pages/CartContext";

import Dior from "../assets/diorlogo.jpg";
import Ysl from "../assets/yslLogo.jpg";
import Versace from "../assets/versaceLogo.jpg";
import Armani from "../assets/armaniLogo.jpg";
import Chanel from "../assets/chanelLogo.jpg";
import Gucci from "../assets/gucciLogo.jpg";

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

const brands = [
  { src: Dior, name: "Dior" },
  { src: Ysl, name: "Yves Saint Laurent" },
  { src: Versace, name: "Versace" },
  { src: Armani, name: "Armani" },
  { src: Chanel, name: "Chanel" },
  { src: Gucci, name: "Gucci" },
];

const womenPerfumes = [
  { img: Missdior, name: "Miss Dior by Dior", desc: "Romantic florals with a timeless trail.", price: "$120.00" },
  { img: Libre, name: "Libre by Yves Saint Laurent", desc: "Bold lavender with warm vanilla.", price: "$135.00" },
  { img: Bright, name: "Bright Crystal by Versace", desc: "Fresh, fruity florals with sparkle.", price: "$95.00" },
  { img: Si, name: "Si by Armani", desc: "Velvety vanilla and cassis.", price: "$110.00" },
  { img: Chance, name: "Chance by Chanel", desc: "Playful, elegant florals.", price: "$140.00" },
  { img: Flora, name: "Flora by Gucci", desc: "Youthful white florals & citrus.", price: "$105.00" },
];

const menPerfumes = [
  { img: Sauvage, name: "Sauvage by Dior", desc: "Fresh bergamot and rugged woods.", price: "$115.00" },
  { img: YslM, name: "Y by Yves Saint Laurent", desc: "Clean freshness with woods.", price: "$118.00" },
  { img: Eros, name: "Eros by Versace", desc: "Mint, vanilla and woods in power.", price: "$100.00" },
  { img: You, name: "Stronger With You by Armani", desc: "Sweet chestnut & warm spices.", price: "$112.00" },
  { img: Bleu, name: "Bleu de Chanel", desc: "Citrus, incense and woods.", price: "$145.00" },
  { img: Guilty, name: "Gucci Guilty", desc: "Seductive lavender and patchouli.", price: "$108.00" },
];




function Home() {
  const { addToCart } = useContext(CartContext);

  const PerfumeCard = ({ product, img, name, desc, price }) => {
  return (
    <div className="col-6 col-sm-4 col-md-3">
      <div className="card h-100 border-0 shadow-sm product-card text-center">
        
        <img src={img} className="product-img card-img-top" alt={name} />

        <div className="card-body">
          <p className="product-name mb-1">{name}</p>
          <p className="product-desc mb-1">{desc}</p>
          <p className="product-price mb-2">{price}</p>
        </div>

        <div className="pb-3">
          <button
            className="btn btn-sm btn-gold"
            onClick={() => {
              addToCart(product);
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

      <br />
      <br />

      <section className="section">
        <h3 className="section-title">Most Popular Perfume Brands</h3>

        <div className="container">
          <div className="row justify-content-center gap-4">
            {brands.map((b, i) => (
              <img key={i} src={b.src} alt={b.name} className="brand-img" />
            ))}
          </div>
        </div>
      </section>

      <br />
      <br />

      <section className="section">
        <h3 className="section-title">Perfumes for Women</h3>

        <div className="container mt-4">
          <div className="row g-4 justify-content-center">
            {womenPerfumes.map((p, i) => (
              <PerfumeCard
                key={i}
                 product={p}
                img={p.img}
                name={p.name}
                desc={p.desc}
                price={p.price}
              />
            ))}
          </div>
        </div>
      </section>

      <br />
      <br />

      <section className="section ">
        <h3 className="section-title">Perfumes for Men</h3>

        <div className="container mt-4">
          <div className="row g-4 justify-content-center">
            {menPerfumes.map((p, i) => (
              <PerfumeCard
                key={i}
                product={p}
                img={p.img}
                name={p.name}
                desc={p.desc}
                price={p.price}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
