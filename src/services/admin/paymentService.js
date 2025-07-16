import axios from 'axios';

export const initiateEsewa = (orderId, amount) =>
  axios.post('/api/payments/esewa/initiate', { orderId, totalAmount: amount });

export const verifyEsewa = (transactionId, orderId, amt) =>
  axios.post('/api/payments/esewa/verify', { transactionId, orderId, amt });
