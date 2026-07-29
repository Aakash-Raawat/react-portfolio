import React from "react";
import Sidebar from "../components/Sidebar";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <>
      <Sidebar />

      <div className="admin-container">
        {children}
      </div>
    </>
  );
}

export default AdminLayout;