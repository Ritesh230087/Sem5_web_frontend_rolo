import { 
  getOrdersAdminApi, 
  getOrderAdminApi, 
  editOrderAdminApi,
  updateOrderStatusAdminApi, 
  deleteOrderAdminApi 
} from '../../api/orderApi'; 

export const getOrders = async () => {
  const response = await getOrdersAdminApi();
  return response.data; 
};

export const getOrder = async (id) => {
  const response = await getOrderAdminApi(id);
  return response.data;
};

export const editOrder = async (id, data) => {
  const response = await editOrderAdminApi(id, data);
  return response.data;
};

export const updateOrderStatus = async (id, updates) => {
  const response = await updateOrderStatusAdminApi(id, updates);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await deleteOrderAdminApi(id);
  return response.data;
};