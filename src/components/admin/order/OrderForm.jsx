import React from 'react';
import { initiateEsewa } from '../services/paymentService';

const OrderForm = ({ orderId, amount }) => {
  const handlePayment = async () => {
    try {
      // Call backend to initiate eSewa payment and get merchantId
      const { data } = await initiateEsewa(orderId, amount);

      // Success and failure redirect URLs
      const SU = `${window.location.origin}/payment-success`; // success page URL
      const FU = `${window.location.origin}/payment-fail`;    // failure page URL

      // Redirect user to eSewa payment page
      window.location.href = 
        `${process.env.REACT_APP_ESEWA_PAYMENT_URL}?amt=${amount}&scd=${data.merchantId}&pid=${orderId}&su=${SU}&fu=${FU}`;
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>
        Pay with eSewa (₹{amount})
      </button>
    </div>
  );
};

export default OrderForm;
