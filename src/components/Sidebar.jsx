import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("isAdmin");

    navigate("/admin/login");

  };

  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Menu Button */}
      {!open && (
        <button
          className="menu-btn"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          className="overlay"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${open ? "show" : ""}`}>

        <div className="sidebar-header">
          <h2>AR Admin</h2>

          <button
            className="close-btn"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>

        <NavLink to="/admin/dashboard" onClick={closeSidebar}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/projects" onClick={closeSidebar}>
          Projects
        </NavLink>

        <NavLink to="/admin/skills" onClick={closeSidebar}>
          Skills
        </NavLink>

        <NavLink to="/admin/about" onClick={closeSidebar}>
          About
        </NavLink>

        <NavLink to="/admin/team" onClick={closeSidebar}>
          Team
        </NavLink>

        <NavLink to="/admin/contact" onClick={closeSidebar}>
          Contact
        </NavLink>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </>
  );
}

export default Sidebar;