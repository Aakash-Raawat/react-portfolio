import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import "./Dashboard.css";
import { FaProjectDiagram, FaTools, FaUsers, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";

function Dashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    totalProjects: 0,
    totalSkills: 0,
    totalTeam: 0,
    totalMessages: 0,
    recentMessages: [],
  });

  useEffect(() => {

    fetch(`${BASE_URL}/api/dashboard`)
      .then((res) => res.json())
      .then((data) => {

        setDashboard(data);

      })
      .catch((err) => console.log(err));

  }, []);

  return (

    <AdminLayout>

      <div className="dashboard">

        <h1>Dashboard</h1>

        <div className="welcome-card">

          <div className="welcome-text">

            <h2>👋 Welcome Back, Admin!</h2>

            <p>
              Manage your portfolio website from one place. You can add projects,
              update skills, manage team members and view contact messages.
            </p>

            <button
              className="welcome-btn"
              onClick={() => navigate("/admin/projects")}
            >
              Manage Projects
            </button>

          </div>

          {/* <div className="welcome-icon">
            💻
          </div> */}

        </div>

        <div className="dashboard-cards">

          <div className="card projects">
            <div className="card-icon">
              <FaProjectDiagram />
            </div>
            <h2>Projects</h2>
            <p>{dashboard.totalProjects}</p>
          </div>

          <div className="card skills">
            <div className="card-icon">
              <FaTools />
            </div>
            <h2>Skills</h2>
            <p>{dashboard.totalSkills}</p>
          </div>

          <div className="card team">
            <div className="card-icon">
              <FaUsers />
            </div>
            <h2>Team</h2>
            <p>{dashboard.totalTeam}</p>
          </div>

          <div className="card messages">
            <div className="card-icon">
              <FaEnvelope />
            </div>
            <h2>Messages</h2>
            <p>{dashboard.totalMessages}</p>
          </div>

        </div>

        {/* <div className="dashboard-cards">

          <div className="card">
            <h2>Projects</h2>
            <p>{dashboard.totalProjects}</p>
          </div>

          <div className="card">
            <h2>Skills</h2>
            <p>{dashboard.totalSkills}</p>
          </div>

          <div className="card">
            <h2>Team</h2>
            <p>{dashboard.totalTeam}</p>
          </div>

          <div className="card">
            <h2>Messages</h2>
            <p>{dashboard.totalMessages}</p>
          </div>

        </div> */}

        <div className="recent-messages">

          <h2>Recent Contact Messages</h2>

          <table className="recent-table">

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>

            </thead>

            <tbody>

              {
                !dashboard.recentMessages || dashboard.recentMessages.length === 0 ?

                  <tr>

                    <td colSpan="3">
                      No Messages Found
                    </td>

                  </tr>

                  :

                  dashboard.recentMessages?.map((message) => (

                    <tr key={message._id}>

                      <td>{message.name}</td>

                      <td>{message.email}</td>

                      <td>{message.message}</td>

                    </tr>

                  ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default Dashboard;