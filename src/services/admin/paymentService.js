import axios from 'axios';

export const initiateEsewa = (orderId, amount) =>
  axios.post('/api/payments/esewa/initiate', { orderId, totalAmount: amount });

export const verifyEsewa = (transactionId, orderId, amt) =>
  axios.post('/api/payments/esewa/verify', { transactionId, orderId, amt });

export const initiateKhalti = (orderId, amount) =>
  axios.post('/api/payments/khalti/initiate', { orderId, totalAmount: amount });

export const verifyKhalti = (token, amount, orderId) =>
  axios.post('/api/payments/khalti/verify', { token, amount, orderId });
