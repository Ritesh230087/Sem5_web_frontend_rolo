import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../../../styles/dashboard.css";
import { getColorName } from "../../../utils/colorNameFromHex";

export default function RibbonTable({ ribbons, removeRibbon, editRibbon, viewRibbon }) {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Label</th>
            <th style={{ width: "100px" }}>Color</th>
            <th style={{ width: "120px" }}>Color Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ribbons?.map((r) => (
            <tr key={r._id}>
              <td>{r.label}</td>
              <td style={{ textAlign: "center" }}>
                <span
                  style={{
                    backgroundColor: r.color,
                    width: "40px",
                    height: "20px",
                    display: "inline-block",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  title={r.color}
                />
              </td>
              <td style={{ textAlign: "center", textTransform: "capitalize" }}>
                {getColorName(r.color)}
              </td>
              <td className="action-buttons">
                <button className="btn btn-view" onClick={() => viewRibbon(r._id)}>
                  <FaEye className="btn-icon" /> View
                </button>
                <button className="btn btn-edit" onClick={() => editRibbon(r._id)}>
                  <FaEdit className="btn-icon" /> Edit
                </button>
                <button className="btn btn-delete" onClick={() => removeRibbon(r._id)}>
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
