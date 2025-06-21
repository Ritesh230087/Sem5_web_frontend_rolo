AdminLayout.jsx
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-black min-h-screen text-white">
      <Sidebar />
      <main className="ml-72 p-8">{children}</main>
    </div>
  );
}