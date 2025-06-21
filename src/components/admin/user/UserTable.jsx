import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function UserTable({ users, viewUser, editUser, deleteUser }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{new Date(user.createdAt).toLocaleString()}</td>
            <td className="action-buttons">
              <button className="btn btn-view" onClick={() => viewUser(user._id)}>
                <FaEye className="btn-icon" /> View
              </button>
              <button className="btn btn-edit" onClick={() => editUser(user)}>
                <FaEdit className="btn-icon" /> Edit
              </button>
              <button className="btn btn-delete" onClick={() => deleteUser(user._id)}>
                <FaTrash className="btn-icon" /> Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

