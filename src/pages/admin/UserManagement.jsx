import React, { useState } from "react";
import { useUser } from "../../hooks/admin/useUser";
import UserTable from "../../components/admin/user/UserTable";
import { toast } from "react-toastify";

export default function UserManagement() {
  const {
    users,
    loading,
    error,
    getUserById,
    editUser,
    deleteUser,
  } = useUser();

  const [viewUser, setViewUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [editingId, setEditingId] = useState(null);

  const handleView = async (id) => {
    const user = await getUserById(id);
    setViewUser(user);
  };

  const closeView = () => setViewUser(null);

  const openEdit = (user) => {
    setEditingId(user._id);
    setFormData({ firstName: user.firstName, lastName: user.lastName });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ firstName: "", lastName: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      toast.error("All fields required");
      return;
    }
    try {
      await editUser(editingId, formData);
      toast.success("User updated");
      closeForm();
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <h2 className="page-title">User Management</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <UserTable
        users={users}
        viewUser={handleView}
        editUser={openEdit}
        deleteUser={handleDelete}
      />

      {/* View Modal */}
      {viewUser && (
        <div className="modal-backdrop" onClick={closeView}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>User Details</h3>
            <p><strong>First Name:</strong> {viewUser.firstName}</p>
            <p><strong>Last Name:</strong> {viewUser.lastName}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Created At:</strong> {new Date(viewUser.createdAt).toLocaleString()}</p>
            <button onClick={closeView} className="btn btn-close">Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showForm && (
        <div className="modal-backdrop" onClick={closeForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit User</h3>
            <form onSubmit={handleSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="submit" className="btn btn-submit">Update</button>
                <button type="button" onClick={closeForm} className="btn btn-cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

