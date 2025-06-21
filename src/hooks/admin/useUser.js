import { useState, useEffect } from "react";

export function useUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/user", {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized. Token may be expired or missing.");
        } else {
          throw new Error("Failed to fetch users");
        }
      }

      const data = await res.json();
      setUsers(data.data || []);
    } catch (err) {
      setError(err.message || "Error loading users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const getUserById = async (id) => {
    const res = await fetch(`/api/admin/user/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    const data = await res.json();
    return data.data;
  };

  const editUser = async (id, updates) => {
    const res = await fetch(`/api/admin/user/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update user");
    await loadUsers();
  };

  const deleteUser = async (id) => {
    const res = await fetch(`/api/admin/user/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete user");
    await loadUsers();
  };

  return {
    users,
    loading,
    error,
    getUserById,
    editUser,
    deleteUser,
  };
}



