import React, { useState } from "react";
import { useCategory } from "../../hooks/admin/useCategory";
import CategoryTable from "../../components/admin/category/CategoryTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryManagement() {
  const {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
    getCategoryById,
  } = useCategory();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [editingId, setEditingId] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);

  const openForm = (category = null) => {
    if (category) {
      setEditingId(category._id);
      setFormData({ name: category.name, image: null });
    } else {
      setEditingId(null);
      setFormData({ name: "", image: null });
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", image: null });
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Category name is required");
      return;
    }

    try {
      if (editingId) {
        await editCategory(editingId, formData);
        toast.success("Category updated successfully");
      } else {
        await addCategory(formData);
        toast.success("Category added successfully");
      }
      closeForm();
    } catch (err) {
      toast.error("Failed to update or add category");
    }
  };

  const handleView = async (id) => {
    const cat = await getCategoryById(id);
    setViewCategory(cat);
  };

  const handleDelete = async (id) => {
    try {
      await removeCategory(id);
      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  const closeView = () => setViewCategory(null);

  return (
    <div className="admin-page">
      <h2 className="page-title">Category Management</h2>

      <button className="btn btn-add-category" onClick={() => openForm()}>
        + Add Category
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <CategoryTable
        categories={categories}
        viewCategory={handleView}
        editCategory={(id) => openForm(categories.find((c) => c._id === id))}
        removeCategory={handleDelete}
      />

      {showForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editingId ? "Edit Category" : "Add Category"}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Image:
                <input type="file" name="image" onChange={handleChange} />
              </label>
              <div className="modal-actions">
                <button type="submit" className="btn btn-submit">
                  {editingId ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewCategory && (
        <div className="modal-backdrop" onClick={closeView}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Category Details</h3>
            <p>
              <strong>Name:</strong> {viewCategory.name}
            </p>
            {viewCategory.filepath ? (
              <img
                src={`http://localhost:5050/${viewCategory.filepath}`}
                alt={viewCategory.name}
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            ) : (
              <p>No Image Available</p>
            )}
            <button onClick={closeView} className="btn btn-close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

