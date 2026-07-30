import React, { useEffect, useState } from "react";
import "./Projects.css";
import { useNavigate } from "react-router-dom";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";

function Projects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        fetch(`${BASE_URL}/api/projects`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // Check browser console
                setProjects(data);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <section className="projects">
            <h2>My Projects</h2>

            <div className="project-container">

                {projects.map((project) => (
                    <div className="project-card" key={project._id}
                        onClick={() => navigate(`/project/${project._id}`)}
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
                        >
                            View on GitHub
                        </a>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default Projects;
