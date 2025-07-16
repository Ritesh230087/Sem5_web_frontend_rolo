import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BankTransferDetails.css';

export default function BankTransferDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.fullOrderData;

  const [slipImage, setSlipImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    if (!orderData) {
      console.error("Bank transfer page missing order data. Redirecting to cart.");
      navigate('/cart');
    }
  }, [orderData, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSlipImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText("01234567890123").then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => { setCopySuccess('Failed to copy'); });
  };

  // This function now creates the order and uploads the slip in one API call
  const handleCreateOrderAndSubmitSlip = async () => {
    if (!slipImage) {
      alert("Please upload your payment receipt to complete the order.");
      return;
    }

    const token = localStorage.getItem('token');
    const storedUserJSON = localStorage.getItem('user');
    if (!token || !storedUserJSON) {
      alert("Authentication error. Please log in again.");
      navigate('/login');
      return;
    }
    const user = JSON.parse(storedUserJSON);
    
    setIsUploading(true);
    
    const formData = new FormData();

    // Append all the order data. Objects must be stringified.
    formData.append('userId', user._id);
    formData.append('items', JSON.stringify(orderData.items.map(item => ({
      productId: item.id || item._id, name: item.name, quantity: item.quantity, price: item.price
    }))));
    formData.append('shippingAddress', JSON.stringify({
      ...orderData.shippingAddress,
      fullName: `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`.trim()
    }));
    formData.append('deliveryFee', orderData.shippingFee);
    formData.append('totalAmount', orderData.total);
    formData.append('paymentMethod', 'bank');
    formData.append('deliveryType', 'domestic');
    
    formData.append('slipImage', slipImage);

    try {
      const config = { headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data'
      }};
      
      const { data } = await axios.post(
        `http://localhost:5050/api/orders/create-with-slip`,
        formData,
        config
      );

      navigate('/payment-success', { state: { order: data.order } });
    } catch (error) {
      console.error("Failed to create order with slip:", error);
      alert("Order creation failed. Please check your connection and try again.");
      setIsUploading(false);
    }
  };

  if (!orderData) { return <div>Loading...</div>; }

  const { total, subtotal, shippingFee, items } = orderData;

  return (
    <div className="bank-transfer-page">
      <div className="transfer-header">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="transfer-title">Bank Transfer Instructions</h1>
      </div>
      <div className="transfer-container">
        <div className="transfer-content">

          {/* --- Bank Details Section --- */}
          <div className="bank-details">
            <div className="bank-card">
              <h3>🏦 Bank Account Details</h3>
              <div className="bank-info">
                <div className="bank-row">
                  <span className="label">Bank Name:</span>
                  <span className="value">Nabil Bank Limited</span>
                </div>
                <div className="bank-row">
                  <span className="label">Account Name:</span>
                  <span className="value">ROLO STORE PVT. LTD.</span>
                </div>
                <div className="bank-row">
                  <span className="label">Account Number:</span>
                  <span className="value account-number">01234567890123</span>
                </div>
                <div className="bank-row">
                  <span className="label">Branch:</span>
                  <span className="value">Kumaripati, Lalitpur</span>
                </div>
              </div>
              <div className="copy-details">
                <button className="copy-btn" onClick={handleCopyToClipboard}>
                  {copySuccess || '📋 Copy Account Number'}
                </button>
              </div>
            </div>
          </div>

          {/* --- Instructions Section --- */}
          <div className="instructions">
            <div className="instruction-card">
              <h3>📝 Transfer Instructions</h3>
              <ol className="instruction-list">
                <li>Transfer the exact amount of <strong>NPR {total.toLocaleString()}</strong> to the above account.</li>
                <li>Please try to include your name in the transfer remarks/description if possible.</li>
                <li>Take a clear photo or screenshot of your payment receipt.</li>
                <li>Upload the receipt using the form below to complete your order.</li>
              </ol>
            </div>
          </div>
          
          {/* --- Upload Section --- */}
          <div className="upload-section">
            <div className="upload-card">
              <h3>📤 Upload Payment Receipt</h3>
              <div className="file-upload">
                <input type="file" id="slip-upload" onChange={handleFileChange} accept="image/*" className="file-input" />
                <label htmlFor="slip-upload" className="file-label">
                  {slipImage ? `📄 ${slipImage.name}` : "📁 Choose Receipt Image"}
                </label>
              </div>
              {previewUrl && (
                <div className="preview-section">
                  <h4>Preview:</h4>
                  <img src={previewUrl} alt="Receipt preview" className="receipt-preview" />
                </div>
              )}
              <button 
                className={`submit-btn ${isUploading ? "uploading":""}`} 
                onClick={handleCreateOrderAndSubmitSlip} 
                disabled={isUploading || !slipImage}>
                {isUploading ? (<span className="uploading-text"><span className="spinner"></span>Completing Order...</span>) : ("Submit Receipt & Complete Order")}
              </button>
            </div>
          </div>
        </div>

        {/* --- Order Summary Section --- */}
        <div className="order-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {items.map((item)=>(
                <div key={item.id||item.productId} className="summary-item">
                  <img src={item.image||`/placeholder.svg`} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <span>NPR {(item.price*item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <div className="total-line"><span>Subtotal:</span><span>NPR {subtotal.toLocaleString()}</span></div>
              <div className="total-line"><span>Shipping:</span><span>NPR {shippingFee.toLocaleString()}</span></div>
              <div className="total-line final"><span>Total Due:</span><span>NPR {total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}