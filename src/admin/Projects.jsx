// import Sidebar from "../components/Sidebar";
import ProjectForm from "../components/ProjectForm";
import ProjectTable from "../components/ProjectTable";

import React, { useEffect, useState } from "react";
import "./Projects.css";
import AdminLayout from "./AdminLayout";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";



function Projects() {
    const [showForm, setShowForm] = useState(false);

    const [project, setProject] = useState({
        title: "",
        tech: "",
        description: "",
        github: "",
        image: null,
    });

    const [projects, setProjects] = useState([]);

    const [editId, setEditId] = useState(null);


    // Input Change
    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {

        setProject({
            ...project,
            image: e.target.files[0],
        });

    };

    // Get All Projects
    const getProjects = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/projects`);
            const data = await response.json();

            setProjects(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProject = async (id) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/projects/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            alert(data.message);

            getProjects();

        } catch (error) {
            console.log(error);
        }
    };

    const editProject = (item) => {
        // console.log("Edit Button Clicked");
        // console.log(item);
        setProject({
            title: item.title,
            tech: item.tech,
            description: item.description,
            github: item.github,
            // live: item.live,
        });

        setEditId(item._id);
        setShowForm(true);
    };


    // Load Projects
    useEffect(() => {
        getProjects();
    }, []);



    // Add Project
    const handleSubmit = async (e) => {

        e.preventDefault();

        // Title Validation
    if (project.title.trim() === "") {
        alert("Project Title is required");
        return;
    }

    if (project.title.trim().length < 3) {
        alert("Project Title must be at least 3 characters");
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(project.title.trim())) {
        alert("Project Title should contain only letters and spaces");
        return;
    }

    // Tech Stack Validation
    if (project.tech.trim() === "") {
        alert("Tech Stack is required");
        return;
    }

    if (!/^[A-Za-z0-9\s.,|+#-]+$/.test(project.tech.trim())) {
        alert("Enter a valid Tech Stack");
        return;
    }

    // Description Validation
    if (project.description.trim() === "") {
        alert("Description is required");
        return;
    }

    if (project.description.trim().length < 20) {
        alert("Description must be at least 20 characters");
        return;
    }

    // GitHub Validation
    if (project.github.trim() === "") {
        alert("GitHub Link is required");
        return;
    }

    const githubRegex =
        /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+(\/[A-Za-z0-9_.-]+)?\/?$/;

    if (!githubRegex.test(project.github.trim())) {
        alert("Enter a valid GitHub repository URL");
        return;
    }

    // Image Validation
    if (!editId && !project.image) {
        alert("Please select a project image");
        return;
    }

        try {
            let response;

            if (editId) {
                response = await fetch(
                    `${BASE_URL}/api/projects/${editId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(project),
                    }
                );
            } else {
                const formData = new FormData();

                formData.append("title", project.title);
                formData.append("tech", project.tech);
                formData.append("description", project.description);
                formData.append("github", project.github);
                formData.append("image", project.image);

                response = await fetch(
                    `${BASE_URL}/api/projects`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
            }
          
            const data = await response.json();

            alert(data.message);

            setProject({
                title: "",
                tech: "",
                description: "",
                github: "",
                live: "",
            });

            setEditId(null);
            getProjects();
            setShowForm(false);

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <AdminLayout>
                <div className="admin">

                    <div className="admin-header">

                        <h1>Projects Management</h1>

                        <button
                            className="add-btn"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? "Close Form" : "+ Add Project"}
                        </button>

                    </div>

                    {showForm && (
                        <div className="modal-overlay">

                            <div className="modal">

                                <div className="modal-header">

                                    <h2>
                                        {editId ? "Update Project" : "Add New Project"}
                                    </h2>

                                    <button
                                        className="close-btn"
                                        onClick={() => setShowForm(false)}
                                    >
                                        ✖
                                    </button>

                                </div>

                                <ProjectForm
                                    project={project}
                                    handleChange={handleChange}
                                    handleImageChange={handleImageChange}
                                    handleSubmit={handleSubmit}
                                    editId={editId}
                                />

                            </div>

                        </div>
                    )}

                    <ProjectTable
                        projects={projects}
                        editProject={editProject}
                        deleteProject={deleteProject}
                    />

                </div>
            </AdminLayout>
        </>
    );
}
export default Projects;