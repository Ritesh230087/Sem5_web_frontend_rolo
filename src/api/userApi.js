const API_BASE = "/api/admin/user";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json"
});

export async function fetchUsers() {
  const res = await fetch(API_BASE, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data.data || [];
}

export async function fetchUserById(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  const data = await res.json();
  return data.data;
}

export async function createUser(user) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return await res.json();
}

export async function updateUser(id, user) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return await res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return await res.json();
}

