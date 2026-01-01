import "../styles/Pages.css";
import { useContext } from "react";
import { CartContext } from "../pages/CartContext";

function Cart() {
  const { cart, removeFromCart, changeQty, clearCart, total } = useContext(CartContext);

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Your Cart</h1>
        <p className="page-subtitle">
          Review your selection before completing your order.
        </p>

        {cart.length === 0 ? (
          <p className="page-subtitle">Your cart is empty.</p>
        ) : (
          <div className="row g-4">
            
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">

                  {cart.map((item, i) => (
                    <div
                      key={i}
                      className="cart-item d-flex align-items-center justify-content-between mb-3"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item.img}
                          alt={item.name}
                          style={{ width: "80px", height: "100px", objectFit: "cover" }}
                          className="me-3 rounded"
                        />

                        <div>
                          <p className="product-name mb-1">{item.name}</p>
                          <p className="product-desc mb-1">{item.desc}</p>
                          <p className="mb-0">{item.price}</p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => changeQty(item.name, item.qty - 1)}
                        >
                          -
                        </button>

                        <span>{item.qty}</span>

                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => changeQty(item.name, item.qty + 1)}
                        >
                          +
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFromCart(item.name)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <button className="btn btn-outline-dark" onClick={clearCart}>
                    Clear Cart
                  </button>

                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm contact-box">
                <div className="card-body">
                  <h5 className="cart-total mb-3">Order Summary</h5>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Estimated Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Total</span>
                    <span className="cart-total">${total.toFixed(2)}</span>
                  </div>

                  <button className="btn btn-gold w-100">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
