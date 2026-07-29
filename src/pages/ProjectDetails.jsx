import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";

function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/projects/${id}`)
            .then((res) => res.json())
            .then((data) => setProject(data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!project) {
        return (
            <div style={{ padding: "100px 20px", textAlign: "center" }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div style={{ padding: "100px 20px", maxWidth: "900px", margin: "auto" }}>

            <button
                onClick={() => navigate(-1)}
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    cursor: "pointer",
                    background: "rgb(36, 61, 119)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    marginRight: "800px",
                }}
            >
                ← Back
            </button>

            <img
                src={`http://localhost:5000/uploads/${project.image}`}
                alt={project.title}
                style={{
                    width: "100%",
                    borderRadius: "10px"
                }}
            />

            <h1>{project.title}</h1>

            <h3>{project.tech}</h3>

            <p>{project.description}</p>

            <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
            >
                <button
                    style={{
                        padding: "10px 20px",
                        marginBottom: "10px",
                        cursor: "pointer",
                        background: "rgb(41, 97, 226)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        marginTop: "10px",
                    }}
                >
                    View GitHub
                </button>
            </a>

        </div>
    );
}

export default ProjectDetails;