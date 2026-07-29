import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";


function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="logo">
        {/* <a href="#home">AR</a> */}
        <NavLink to="/">AR</NavLink>
      </div>

      <div
        className="menu-icon"
        onClick={() => setOpen(!open)}
      >
        ☰
      </div>

      <ul className={open ? "nav-links active" : "nav-links"}>

        {/* <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li> */}

        <li>
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/skills" onClick={() => setOpen(false)}>
            Skills
          </NavLink>
        </li>

        <li>
          <NavLink to="/projects" onClick={() => setOpen(false)}>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/team" onClick={() => setOpen(false)}>
            Team
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;