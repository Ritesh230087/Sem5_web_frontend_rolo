
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Verifying payment...');

  useEffect(() => {
    const isVerified = searchParams.get('verified');
    const orderId = searchParams.get('orderId');

    if (isVerified === 'true' && orderId) {
      setStatus(`Payment successful! Your order #${orderId} has been confirmed.`);
    } else {
      setStatus('Payment verification failed. Please contact support.');
    }
  }, [searchParams]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{status.includes('successful') ? 'Payment Successful 🎉' : 'Verification Issue'}</h1>
      <p>{status}</p>
      <Link to="/homepage">
        Go back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
