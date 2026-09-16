import React, { useEffect, useState } from "react";
import "./Projects.css";
import { useNavigate } from "react-router-dom";

import {
  FaRocket,
  FaCode,
  FaLightbulb,
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";

const BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" &&
    process.env?.REACT_APP_API_URL) ||
  "https://react-portfolio-24zb.onrender.com";

function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.log(err);
        setProjects([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="projects">
      <h2>My Projects</h2>

      {/* 
          LOADING SECTION
      */}
      {loading && (
        <div className="projects-loading">
          <div className="projects-loading-icon">
            <FaRocket />
          </div>

          <h3>Loading My Projects</h3>

          <p>
            I'm preparing my latest projects for you.
            <br />
            Have a look at what I've been building.
          </p>

          <div className="project-tech-icons">
            <span>
              <FaReact /> React
            </span>

            <span>
              <FaNodeJs /> Node.js
            </span>

            <span>
              <FaDatabase /> MongoDB
            </span>

            <span>
              <FaCode /> Development
            </span>
          </div>

          <div className="projects-spinner"></div>

          <small>Fetching projects...</small>
        </div>
      )}

      {/* 
          PROJECT CARDS
      */}
      {!loading && projects.length > 0 && (
        <div className="project-container">
          {projects.map((project) => (
            <div
              className="project-card"
              key={project._id}
              onClick={() =>
                navigate(`/project/${project._id}`)
              }
            >
              <img
                src={
                  project.image
                    ? `${BASE_URL}/uploads/${project.image}`
                    : "https://via.placeholder.com/350x200?text=No+Image"
                }
                alt={project.title}
              />

              <h3>{project.title}</h3>

              <h4>{project.tech}</h4>

              <p>{project.description}</p>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn"
                onClick={(e) => e.stopPropagation()}
              >
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      )}

      {/* 
          NO PROJECTS
     */}
      {!loading && projects.length === 0 && (
        <p className="projects-empty">
          No projects available right now.
        </p>
      )}
    </section>
  );
}

export default Projects;
