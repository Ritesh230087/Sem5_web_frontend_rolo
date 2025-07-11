import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCartItems,
  updateCartItemQuantity,
  clearCart,
} from "../../services/cartService";
import axios from "axios";
import "./Cart.css";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    country: "",
    city: "",
    addressLine: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = () => {
      setItems(getCartItems());
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const updateQuantity = (id, quantity) => {
    // Prevent negative quantities
    const newQuantity = Math.max(0, quantity);
    updateCartItemQuantity(id, newQuantity);
    setItems(getCartItems()); // Refresh state from service
    window.dispatchEvent(new Event("cartUpdated")); // Notify other components
  };
  
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
  
  // Helper function to create and submit a form for eSewa redirection
  const postToEsewa = (paymentDetails, paymentGatewayUrl) => {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", paymentGatewayUrl);

    for (const key in paymentDetails) {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", paymentDetails[key]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  };

  const handleCheckout = async () => {
    if (
      !shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.country ||
      !shippingInfo.city || !shippingInfo.addressLine || !shippingInfo.postalCode
    ) {
      alert("Please fill in all shipping details.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    setIsCheckingOut(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await axios.post("http://localhost:5050/api/admin/order/create", {
        userId,
        items: orderItems,
        shippingAddress: shippingInfo,
        paymentMethod,
        deliveryType: "domestic",
        deliveryFee: shipping,
        totalAmount: total,
      });

      if (response.data.paymentDetails) {
        clearCart(); // Clear cart before redirecting to payment
        postToEsewa(response.data.paymentDetails, response.data.paymentGatewayUrl);
      } else {
        alert("Order placed successfully!");
        clearCart();
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Order Error:", error.response ? error.response.data : error.message);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-content">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Discover our heritage collection and add some beautiful pieces to your cart.</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <Link to="/" className="back-btn">← Continue Shopping</Link>
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-count">{items.length} items</div>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="cart-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="item-image">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </Link>
              </div>
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
              </div>
              <div className="item-quantity">
                <label>Quantity</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="item-price">
                <div className="unit-price">NPR {item.price.toLocaleString()}</div>
                <div className="total-price">
                  NPR {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => updateQuantity(item.id, 0)}
                title="Remove item"
              >
                ×
              </button>
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
              <span>{shipping === 0 ? "Free" : `NPR ${shipping.toLocaleString()}`}</span>
            </div>
            {shipping === 0 && (
              <div className="free-shipping-note">🎉 You've qualified for free shipping!</div>
            )}
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total</span>
              <span>NPR {total.toLocaleString()}</span>
            </div>
            <div style={{ marginTop: "2rem", textAlign: "left" }}>
              <h3>Shipping Details</h3>
              <input type="text" name="fullName" placeholder="Full Name" value={shippingInfo.fullName} onChange={handleInputChange} required />
              <input type="text" name="phone" placeholder="Phone Number" value={shippingInfo.phone} onChange={handleInputChange} required />
              <input type="text" name="country" placeholder="Country" value={shippingInfo.country} onChange={handleInputChange} required />
              <input type="text" name="city" placeholder="City" value={shippingInfo.city} onChange={handleInputChange} required />
              <input type="text" name="addressLine" placeholder="Address Line" value={shippingInfo.addressLine} onChange={handleInputChange} required />
              <input type="text" name="postalCode" placeholder="Postal Code" value={shippingInfo.postalCode} onChange={handleInputChange} required />
              <h3 style={{ marginTop: "1rem" }}>Payment Method</h3>
              <label>
                <input type="radio" name="paymentMethod" value="esewa" checked={paymentMethod === "esewa"} onChange={() => setPaymentMethod("esewa")} />
                eSewa
              </label>
              <button
                className={`checkout-btn ${isCheckingOut ? "checking-out" : ""}`}
                onClick={handleCheckout}
                disabled={isCheckingOut}
                style={{ marginTop: "1rem" }}
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
