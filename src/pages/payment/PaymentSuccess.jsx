// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate, Link, useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import './PaymentSuccess.css'; 

// export default function PaymentSuccess() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams] = useSearchParams();

//   const esewaOrderId = searchParams.get('orderId');
//   const directOrder = location.state?.order;

//   const [order, setOrder] = useState(directOrder || null);
//   const [loading, setLoading] = useState(!directOrder && !!esewaOrderId);
//   const [error, setError] = useState('');
//   const [showConfetti, setShowConfetti] = useState(true);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       if (esewaOrderId && !directOrder) {
//         setLoading(true);
//         try {
//           const token = localStorage.getItem('token');
//           if (!token) throw new Error("Authentication token not found.");
          
//           const config = { headers: { 'Authorization': `Bearer ${token}` } };
//           const { data } = await axios.get(
//             `http://localhost:5050/api/orders/myorders/${esewaOrderId}`, 
//             config
//           );
          
//           if (data) {
//             setOrder(data);
//           } else {
//             throw new Error("API returned an empty response.");
//           }
//         } catch (err) {
//           console.error("Failed to fetch order details:", err);
//           setError(err.response?.data?.message || err.message || "Could not retrieve order details.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchOrderDetails();

//     const timer = setTimeout(() => setShowConfetti(false), 3000); 
//     return () => clearTimeout(timer);
//   }, [esewaOrderId, directOrder, navigate]);

//   if (loading) {
//     return <div className="loading-container">Finalizing Your Order...</div>;
//   }
  
//   if (error) {
//     return (
//       <div className="success-page error-page">
//         <div className="success-container">
//           <div className="error-animation">✖</div>
//           <h1>An Error Occurred</h1>
//           <p>{error}</p>
//           <Link to="/" className="continue-btn">Go to Homepage</Link>
//         </div>
//       </div>
//     );
//   }

//   if (!order) {
//     return null; 
//   }
  
//   let title = "Payment Successful! 🎉";
//   let subtitle = "Thank you for your order. Your heritage masterpiece is on its way!";
//   let amountLabel = "Total Paid:";

//   if (order.paymentMethod === 'cod') {
//     title = "Order Placed Successfully!";
//     subtitle = "Your order has been received. Please keep cash ready for delivery.";
//     amountLabel = "Total Amount Due:";
//   } else if (order.paymentMethod === 'bank' && order.paymentStatus === 'pending') {
//     title = "Order Received!";
//     subtitle = "Thank you! Please check your email for bank transfer details to complete your payment.";
//     amountLabel = "Total Amount Due:";
//   }

//   return (
//     <div className="success-page">
//       {showConfetti && <div className="confetti"></div>}
//       <div className="success-container">
//         <div className="success-animation">
//           <div className="checkmark-circle"><div className="checkmark"></div></div>
//         </div>
//         <div className="success-content">
//           <h1 className="success-title">{title}</h1>
//           <p className="success-subtitle">{subtitle}</p>

//           <div className="order-details">
//             <div className="order-number">
//               <span className="label">Order Number:</span>
//               <span className="value">#{order._id.slice(-6).toUpperCase()}</span>
//             </div>
//             <div className="order-amount">
//               <span className="label">{amountLabel}</span>
//               <span className="value">NPR {order.totalAmount.toLocaleString()}</span>
//             </div>
//           </div>

//           <div className="success-info">
//             <div className="info-grid">
//               <div className="info-item">
//                 <div className="info-icon">📧</div>
//                 <div className="info-text">
//                   <h4>Confirmation Email</h4>
//                   <p>Sent to {order.userId.email}</p>
//                 </div>
//               </div>
//               <div className="info-item">
//                 <div className="info-icon">🚚</div>
//                 <div className="info-text">
//                   <h4>Delivery Timeline</h4>
//                   <p>3-5 business days</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="order-summary-success">
//             <h3>Order Summary</h3>
//             <div className="items-list">
//               {order.items.map((item) => (
//                 <div key={item._id} className="success-item">
//                   <img 
//                     src={`http://localhost:5050/${item.productId.filepath}`} 
//                     alt={item.name} 
//                   />
//                   <div className="item-info">
//                     <h4>{item.name}</h4>
//                     <p>Quantity: {item.quantity}</p>
//                     <span className="item-price">NPR {(item.price * item.quantity).toLocaleString()}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="shipping-address">
//             <h4>Shipping Address</h4>
//             <div className="address-details">
//               <p>{order.shippingAddress.fullName}</p>
//               <p>{order.shippingAddress.addressLine}</p>
//               <p>{order.shippingAddress.city}</p>
//               <p>{order.shippingAddress.phone}</p>
//             </div>
//           </div>

//           <div className="action-buttons">
//             <button className="continue-btn" onClick={() => navigate('/shop')}>
//               Continue Shopping
//             </button>
//             <Link to="/profile" className="track-btn">Track Your Order</Link>
//           </div>

//           <div className="support-info">
//             <p>
//               Need help? Contact our support team at <strong>support@rolo.com</strong> or call{" "}
//               <strong>+977-1-234-5678</strong>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








































































import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../../services/cartService'; // ✅ Add this line
import './PaymentSuccess.css';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const esewaOrderId = searchParams.get('orderId');
  const directOrder = location.state?.order;

  const [order, setOrder] = useState(directOrder || null);
  const [loading, setLoading] = useState(!directOrder && !!esewaOrderId);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (esewaOrderId && !directOrder) {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error("Authentication token not found.");
          
          const config = { headers: { 'Authorization': `Bearer ${token}` } };
          const { data } = await axios.get(
            `http://localhost:5050/api/orders/myorders/${esewaOrderId}`, 
            config
          );
          
          if (data) {
            setOrder(data);
            clearCart(); // ✅ Clear cart after order fetch
          } else {
            throw new Error("API returned an empty response.");
          }
        } catch (err) {
          console.error("Failed to fetch order details:", err);
          setError(err.response?.data?.message || err.message || "Could not retrieve order details.");
        } finally {
          setLoading(false);
        }
      } else if (directOrder) {
        clearCart(); // ✅ Clear cart for direct orders too
      }
    };

    fetchOrderDetails();

    const timer = setTimeout(() => setShowConfetti(false), 3000); 
    return () => clearTimeout(timer);
  }, [esewaOrderId, directOrder, navigate]);

  if (loading) {
    return <div className="loading-container">Finalizing Your Order...</div>;
  }

  if (error) {
    return (
      <div className="success-page error-page">
        <div className="success-container">
          <div className="error-animation">✖</div>
          <h1>An Error Occurred</h1>
          <p>{error}</p>
          <Link to="/products" className="continue-btn">Go to Homepage</Link>
        </div>
      </div>
    );
  }

  if (!order) return null;

  let title = "Payment Successful! 🎉";
  let subtitle = "Thank you for your order. Your heritage masterpiece is on its way!";
  let amountLabel = "Total Paid:";

  if (order.paymentMethod === 'cod') {
    title = "Order Placed Successfully!";
    subtitle = "Your order has been received. Please keep cash ready for delivery.";
    amountLabel = "Total Amount Due:";
  } else if (order.paymentMethod === 'bank' && order.paymentStatus === 'pending') {
    title = "Order Received!";
    subtitle = "Thank you! Please check your email for bank transfer details to complete your payment.";
    amountLabel = "Total Amount Due:";
  }

  return (
    <div className="success-page">
      {showConfetti && <div className="confetti"></div>}
      <div className="success-container">
        <div className="success-animation">
          <div className="checkmark-circle"><div className="checkmark"></div></div>
        </div>
        <div className="success-content">
          <h1 className="success-title">{title}</h1>
          <p className="success-subtitle">{subtitle}</p>

          <div className="order-details">
            <div className="order-number">
              <span className="label">Order Number:</span>
              <span className="value">#{order._id.slice(-6).toUpperCase()}</span>
            </div>
            <div className="order-amount">
              <span className="label">{amountLabel}</span>
              <span className="value">NPR {order.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="success-info">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div className="info-text">
                  <h4>Confirmation Email</h4>
                  <p>Sent to {order.userId.email}</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">🚚</div>
                <div className="info-text">
                  <h4>Delivery Timeline</h4>
                  <p>3-5 business days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-summary-success">
            <h3>Order Summary</h3>
            <div className="items-list">
              {order.items.map((item) => (
                <div key={item._id} className="success-item">
                  <img 
                    src={`http://localhost:5050/${item.productId.filepath}`} 
                    alt={item.name} 
                  />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <span className="item-price">NPR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shipping-address">
            <h4>Shipping Address</h4>
            <div className="address-details">
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine}</p>
              <p>{order.shippingAddress.city}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="action-buttons">
            <button className="continue-btn" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
            <Link to="/profile" className="track-btn">Track Your Order</Link>
          </div>

          <div className="support-info">
            <p>
              Need help? Contact our support team at <strong>support@rolo.com</strong> or call{" "}
              <strong>+977-1-234-5678</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
