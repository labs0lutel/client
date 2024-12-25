import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false); 

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.discont_price || item.price) * item.quantity,
    0
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId); 
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setShowOverlay(true);
  };

  return (
    <div className="cart-container">
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-button" onClick={() => setShowOverlay(false)}>
              &times;
            </button>
            <h2>Congratulations!</h2>
            <p>Your order has been successfully placed on the website.</p>
            <p>A manager will contact you shortly to confirm your order.</p>
          </div>
        </div>
      )}
      <div className="cart-header">
        <h1>Shopping cart</h1>
      </div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Looks like you have no items in your basket currently.</p>
          <button
            onClick={() => navigate("/all-products")}
            className="continue-shopping-button"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={`http://localhost:3333/public${item.image}`}
                  alt={item.title}
                />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-price">
                    ${item.discont_price || item.price}{" "}
                    {item.discont_price && (
                      <span className="old-price">${item.price}</span>
                    )}
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order details</h2>
            <p>{totalItems} items</p>
            <p className="total-text">
              Total <span className="total-price">${totalPrice}</span>
            </p>
            <form onSubmit={handleOrderSubmit}>
              <input type="text" placeholder="Name" required />
              <input type="tel" placeholder="Phone number" required />
              <input type="email" placeholder="Email" required />
              <button type="submit">Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;