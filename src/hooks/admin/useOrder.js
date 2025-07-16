import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

import {
  getOrders,
  getOrder,
  editOrder, 
  updateOrderStatus,
  deleteOrder,
} from "../../services/admin/orderService";

export function useOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      toast.error(err.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const changeOrderStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, { deliveryStatus: status }); 
      toast.success("Order status updated!");
      await loadOrders();
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const deleteOrderById = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id);
        toast.success("Order deleted!");
        await loadOrders();
      } catch (err) {
        toast.error("Failed to delete order.");
      }
    }
  };

  const updateOrder = async (id, orderData) => {
    try {
      await editOrder(id, orderData);
      toast.success("Order updated successfully!");
      await loadOrders();
    } catch(err) {
      toast.error("Failed to update order.");
      throw err; 
    }
  };

  const getOrderById = async (id) => {
    try {
      return await getOrder(id);
    } catch (err) {
      toast.error("Failed to fetch order details.");
      return null;
    }
  };

  return {
    orders,
    loading,
    error,
    getOrderById,
    updateOrder, 
    deleteOrderById,
    changeOrderStatus,
  };
}