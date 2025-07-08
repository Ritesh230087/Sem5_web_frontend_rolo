import React, { useState } from "react";
import { useRibbon } from "../../hooks/admin/useRibbon";
import RibbonTable from "../../components/admin/ribbon/RibbonTable";
import { toast } from "react-toastify";
import { getColorName } from "../../utils/colorNameFromHex";

export default function RibbonManagement() {
  const {
    ribbons,
    loading,
    error,
    addRibbon,
    editRibbon,
    removeRibbon,
    getRibbonById,
  } = useRibbon();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ label: "", color: "" });
  const [editingId, setEditingId] = useState(null);
  const [viewRibbon, setViewRibbon] = useState(null);

  const openForm = (ribbon = null) => {
    if (ribbon) {
      setEditingId(ribbon._id);
      setFormData({
        label: ribbon.label,
        color: getColorName(ribbon.color) || ribbon.color,
      });
    } else {
      setEditingId(null);
      setFormData({ label: "", color: "" });
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ label: "", color: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.label) {
      toast.error("Ribbon label is required");
      return;
    }

    try {
      if (editingId) {
        await editRibbon(editingId, formData);
        toast.success("Ribbon updated successfully");
      } else {
        await addRibbon(formData);
        toast.success("Ribbon added successfully");
      }
      closeForm();
    } catch (err) {
      toast.error("Failed to save ribbon");
    }
  };

  const handleView = async (id) => {
    try {
      const ribbon = await getRibbonById(id);
      setViewRibbon(ribbon);
    } catch (err) {
      toast.error("Failed to load ribbon details");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeRibbon(id);
      toast.success("Ribbon deleted");
    } catch (err) {
      toast.error("Failed to delete ribbon");
    }
  };

  return (
    <div className="admin-page">
      <h2 className="page-title">Ribbon Management</h2>

      <button className="btn btn-add-category" onClick={() => openForm()}>
        + Add Ribbon
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <RibbonTable
        ribbons={ribbons}
        viewRibbon={handleView}
        editRibbon={(id) => openForm(ribbons.find((r) => r._id === id))}
        removeRibbon={handleDelete}
      />

      {showForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editingId ? "Edit Ribbon" : "Add Ribbon"}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Label (e.g. Best Seller, Limited Stock):
                <input
                  type="text"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Color Name (e.g. Red, Brown):
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="submit" className="btn btn-submit">
                  {editingId ? "Update" : "Add"}
                </button>
                <button type="button" onClick={closeForm} className="btn btn-cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewRibbon && (
        <div className="modal-backdrop" onClick={() => setViewRibbon(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Ribbon Details</h3>
            <p><strong>Label:</strong> {viewRibbon.label}</p>
            <p>
              <strong>Color Swatch:</strong>{" "}
              <span
                style={{
                  backgroundColor: viewRibbon.color,
                  width: "40px",
                  height: "20px",
                  display: "inline-block",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              ></span>
              {viewRibbon.color}
            </p>
            <p>
              <strong>Color Name:</strong> {getColorName(viewRibbon.color)}
            </p>
            <button onClick={() => setViewRibbon(null)} className="btn btn-close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
