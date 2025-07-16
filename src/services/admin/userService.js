import { 
  fetchUsersApi, 
  updateUserApi, 
  deleteUserApi 
} from '../../api/userApi';

export const getUsers = async () => {
  const response = await fetchUsersApi();
  return response.data.data || [];
};

export const updateUser = async (id, userData) => {
  const response = await updateUserApi(id, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await deleteUserApi(id);
  return response.data;
};