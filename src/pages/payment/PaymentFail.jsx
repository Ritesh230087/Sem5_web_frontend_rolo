import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PaymentFailed.css'; 

export default function PaymentFailed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('order_id');

  const handleRetryPayment = () => {
    alert("Retrying payment for a specific order requires additional logic to refetch order data. Navigating to cart for now.");
    navigate('/cart');
  };

  const handleSwitchToCOD = async () => {
    if (!orderId) {
      alert("No order ID found to switch to Cash on Delivery.");
      return;
    }
    alert("Switching to COD after failure requires a dedicated backend endpoint. This is a placeholder.");
  };
  
  const commonIssues = [
    { icon: "💳", title: "Card & Wallet Issues", description: "Insufficient funds, expired card, or incorrect details.", solution: "Check your card/wallet details and balance." },
    { icon: "🌐", title: "Network Error", description: "A poor internet connection interrupted the transaction.", solution: "Check your internet and try again." },
    { icon: "🏦", title: "Bank Declined", description: "Your bank may have blocked the transaction for security.", solution: "Contact your bank or try another payment method." },
    { icon: "🔒", title: "Security Check", description: "Additional 3D-Secure or other verification was required.", solution: "Complete your bank's security verification steps." },
  ];

  return (
    <div className="failed-page">
      <div className="failed-container">
        <div className="failed-animation">
          <div className="error-circle">
            <div className="error-x"></div>
          </div>
        </div>

        <div className="failed-content">
          <h1 className="failed-title">Payment Failed</h1>
          <p className="failed-subtitle">Don't worry, this happens sometimes. Your order has been saved, but the payment could not be processed.</p>

          <div className="common-issues-card">
            <h3>Common Issues & Solutions</h3>
            <div className="issues-grid">
              {commonIssues.map((issue, index) => (
                <div key={index} className="issue-item">
                  <div className="issue-icon">{issue.icon}</div>
                  <div className="issue-content">
                    <h4>{issue.title}</h4>
                    <p className="issue-description">{issue.description}</p>
                    <p className="issue-solution">{issue.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="retry-btn" onClick={handleRetryPayment}>
              Try Another Payment Method
            </button>
            <button className="cod-btn" onClick={handleSwitchToCOD}>
              Switch to Cash on Delivery
            </button>
          </div>

          <div className="help-card">
            <h4>Still Having Trouble?</h4>
            <div className="help-options">
              <div className="help-option">
                <span className="help-icon">📞</span>
                <div><strong>Call Us</strong><p>+977-9823288876</p></div>
              </div>
              <div className="help-option">
                <span className="help-icon">📧</span>
                <div><strong>Email Support</strong><p>rolonepal@gmail.com</p></div>
              </div>
            </div>
          </div>

          <button className="back-shopping-btn" onClick={() => navigate('/cart')}>
            ← Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}