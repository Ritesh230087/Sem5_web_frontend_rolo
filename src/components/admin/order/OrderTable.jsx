import React from 'react';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../../../styles/dashboard.css";

export default function OrderTable({ orders, viewOrder, editOrder, removeOrder }) {
  if (!orders || orders.length === 0) {
    return <p style={{ padding: "1rem", textAlign: "center" }}>No orders found</p>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "pending": return "#ff9800";
      case "confirmed": return "#2196f3";
      case "processing": return "#9c27b0";
      case "shipped": return "#ff5722";
      case "delivered": return "#4caf50";
      case "cancelled": return "#f44336";
      case "paid": return "#4caf50";
      case "failed": return "#f44336";
      default: return "#ffffff";
    }
  };

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Delivery</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>#{o._id.slice(-6).toUpperCase()}</td>
              <td>{o.userId ? `${o.userId.firstName} ${o.userId.lastName}` : 'Guest User'}</td>
              <td>{formatDate(o.createdAt)}</td>
              <td>Rs. {o.totalAmount.toLocaleString()}</td>
              <td>
                <span style={{
                  color: getStatusTextColor(o.paymentStatus),
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}>
                  {o.paymentStatus}
                </span>
              </td>
              <td>
                <span style={{
                  color: getStatusTextColor(o.deliveryStatus),
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}>
                  {o.deliveryStatus}
                </span>
              </td>
              <td className="action-buttons">
                <button onClick={() => viewOrder(o._id)} className="btn btn-view"><FaEye /> View</button>
                <button onClick={() => editOrder(o._id)} className="btn btn-edit"><FaEdit /> Edit</button>
                <button onClick={() => removeOrder(o._id)} className="btn btn-delete"><FaTrash /> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
