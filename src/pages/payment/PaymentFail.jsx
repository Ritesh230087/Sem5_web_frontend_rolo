import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFail = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Payment Failed ❌</h1>
      <p>Unfortunately, your payment was not successful. Please try again.</p>
      <Link to="/cart">
        Go back to Cart
      </Link>
    </div>
  );
};

export default PaymentFail;
