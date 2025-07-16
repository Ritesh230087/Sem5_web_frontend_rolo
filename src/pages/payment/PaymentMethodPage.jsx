import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentMethod.css';
import { redirectToEsewa } from '../../utils/esewa';

// Import the new, clean API function.
import { createOrderApi } from '../../api/orderApi';

export default function PaymentMethodPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.fullOrderData;

  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCodAvailable, setIsCodAvailable] = useState(false);

  useEffect(() => {
    if (!orderData) {
      console.error("No order data found. Redirecting to cart.");
      navigate('/cart');
      return;
    }
    const valleyDistricts = ["kathmandu", "lalitpur", "bhaktapur"];
    const userDistrict = (orderData.shippingAddress?.district || "").toLowerCase();
    const codIsAllowed = valleyDistricts.includes(userDistrict);
    setIsCodAvailable(codIsAllowed);
    if (!codIsAllowed && selectedMethod === 'cod') {
      setSelectedMethod("");
    }
  }, [orderData, navigate, selectedMethod]);

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (selectedMethod === 'bank') {
      navigate('/bank-transfer-details', { state: { fullOrderData: orderData } });
      return;
    }

    const storedUserJSON = localStorage.getItem('user');
    if (!storedUserJSON) {
      alert("Authentication error. Please log in again.");
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(storedUserJSON);
    if (!user || !user._id) {
      alert("Your login data is corrupted. Please log in again.");
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    const { firstName, lastName, ...restOfAddress } = orderData.shippingAddress;
    const finalShippingAddress = {
      ...restOfAddress,
      fullName: `${firstName} ${lastName}`.trim()
    };

    const finalOrderPayload = {
      userId: user._id,
      items: orderData.items.map(item => ({
        productId: item.id || item._id, name: item.name, quantity: item.quantity, price: item.price
      })),
      shippingAddress: finalShippingAddress,
      deliveryFee: orderData.shippingFee,
      totalAmount: orderData.total,
      paymentMethod: selectedMethod,
      deliveryType: "domestic",
    };

    try {
      // No more direct axios call! Use the clean API function.
      const { data } = await createOrderApi(finalOrderPayload);

      if (selectedMethod === 'esewa') {
        if (data.paymentGatewayUrl && data.paymentDetails) {
          redirectToEsewa(data.paymentDetails, data.paymentGatewayUrl);
        } else { throw new Error("eSewa payment details were not returned."); }
      } else { // For COD
        navigate('/payment-success', { state: { order: data.order } });
      }
    } catch (error) {
      setIsProcessing(false); 
      console.error("Order processing failed:", error.response ? error.response.data : error.message);
      navigate('/payment-fail', { state: { error: error.response?.data?.error || "Failed to place your order." } });
    }
  };
  
  if (!orderData) { return <div className="loading-container">Loading...</div>; }
  const { total, subtotal, shippingFee, shippingAddress, items } = orderData;
  const paymentMethods = [
    { id: "esewa", name: "eSewa", icon: "/images/esewa_logo.png", description: "Pay securely with your eSewa wallet.", available: true, codBlocked: false },
    { id: "bank", name: "Bank Transfer", icon: "🏦", description: "Transfer directly from your bank account.", available: true, codBlocked: false },
    { id: "cod", name: "Cash on Delivery", icon: "/images/cod_logo.png", description: "Pay when you receive your order.", available: true, codBlocked: !isCodAvailable }
  ];
  const buttonText = selectedMethod === 'bank' 
    ? "Continue to Bank Details" 
    : `Place Order - NPR ${total.toLocaleString()}`;

  return (
    <div className="payment-page">
      <div className="payment-header">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="payment-title">Payment Method</h1>
      </div>
      <div className="payment-container">
        <div className="payment-section">
          <h3 className="section-title">Choose how you'd like to pay</h3>
          <div className="methods-grid">{paymentMethods.map((method) => (<div key={method.id} className={`payment-method ${selectedMethod===method.id ? "selected":""} ${method.codBlocked ? "blocked-cod" : ""}`} onClick={()=> !method.codBlocked && setSelectedMethod(method.id)}><div className="method-icon">{method.icon.includes('/') ? <img src={method.icon} alt={method.name} /> : <span>{method.icon}</span>}</div><div className="method-info"><h4>{method.name}</h4><p>{method.description}</p></div>{method.codBlocked && (<div className="cod-hover-message">Only available inside Kathmandu Valley.</div>)}<div className="method-radio"><div className={`radio ${selectedMethod===method.id ? "checked":""}`}></div></div></div>))}</div>
          <button className={`pay-btn ${isProcessing ? "processing":""}`} onClick={handlePayment} disabled={!selectedMethod || isProcessing}>{isProcessing ? (<span className="processing-text"><span className="spinner"></span>Processing...</span>) : (buttonText)}</button>
        </div>
        <div className="order-summary"><div className="summary-card"><h3 className="summary-title">Order Summary</h3><div className="customer-info"><h4>Shipping To:</h4><p><strong>{shippingAddress.firstName} {shippingAddress.lastName}</strong></p><p>{shippingAddress.addressLine}, {shippingAddress.city}</p><p>{shippingAddress.district}, Nepal</p><p>Phone: {shippingAddress.phone}</p></div><div className="order-items">{items.map((item)=>(<div key={item.id} className="summary-item"><img src={item.image || "/placeholder.svg"} alt={item.name} className="item-image" /><div className="item-details"><h4>{item.name}</h4><p>Qty: {item.quantity}</p></div><div className="item-price">NPR {(item.price*item.quantity).toLocaleString()}</div></div>))}</div><div className="summary-calculations"><div className="summary-line"><span>Subtotal</span><span>NPR {subtotal.toLocaleString()}</span></div><div className="summary-line"><span>Shipping</span><span>NPR {shippingFee.toLocaleString()}</span></div><div className="summary-divider"></div><div className="summary-total"><span>Total</span><span>NPR {total.toLocaleString()}</span></div></div></div></div>
      </div>
    </div>
  );
}