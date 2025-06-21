import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { getBackendImageUrl } from "../../../utils/backend-image";
import "../../../styles/dashboard.css";

export default function CategoryTable({ categories, removeCategory, editCategory, viewCategory }) {
  return (
    <div className="admin-table-wrapper">
      {/* <h2 className="page-title">Category Management</h2> */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>
                {c.filepath ? (
                  <img
                    src={getBackendImageUrl(c.filepath)}
                    alt={c.name}
                    className="category-image"
                  />
                ) : (
                  <span className="no-image">No Image</span>
                )}
              </td>
              <td className="action-buttons">
                <button className="btn btn-view" onClick={() => viewCategory(c._id)}>
                  <FaEye className="btn-icon" /> View
                </button>
                <button className="btn btn-edit" onClick={() => editCategory(c._id)}>
                  <FaEdit className="btn-icon" /> Edit
                </button>
                <button className="btn btn-delete" onClick={() => removeCategory(c._id)}>
                  <FaTrash className="btn-icon" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

