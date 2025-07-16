import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems, updateCartItemQuantity } from "../../services/cartService";
import "./Cart.css";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = () => setItems(getCartItems());
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const updateQuantity = (id, quantity) => {
    const newQuantity = Math.max(0, quantity);
    updateCartItemQuantity(id, newQuantity);
    setItems(getCartItems());
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleProceedToCheckout = () => {
    if (items.length > 0) {
      // ✅ Pass the items array to the next route in the navigation state
      navigate("/order", { state: { cartItems: items } });
    } else {
      alert("Your cart is empty.");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-content">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Discover our heritage collection and add some beautiful pieces to your cart.</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <Link to="/products" className="back-btn">← Continue Shopping</Link>
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-count">{items.length} items</div>
      </div>
      <div className="cart-container">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </Link>
              </div>
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
              </div>
              <div className="item-quantity">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="qty-btn" disabled={item.quantity <= 1}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="qty-btn">+</button>
                </div>
              </div>
              <div className="item-price">
                <div className="total-price">NPR {(item.price * item.quantity).toLocaleString()}</div>
              </div>
              <button className="remove-btn" onClick={() => updateQuantity(item.id, 0)} title="Remove item">×</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="summary-card">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal ({items.length} items)</span>
              <span>NPR {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total (Estimated)</span>
              <span>NPR {subtotal.toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}