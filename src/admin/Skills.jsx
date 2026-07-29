import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
import SkillForm from "../components/SkillForm";
import SkillTable from "../components/SkillTable";
import "./Skills.css";
import AdminLayout from "./AdminLayout";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";

function Skills() {

    const [skill, setSkill] = useState({
        name: "",
        percentage: "",
    });

    const [skills, setSkills] = useState([]);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        setSkill({
            ...skill,
            [e.target.name]: e.target.value,
        });
    };

    const getSkills = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/skills`);
            const data = await response.json();
            setSkills(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSkills();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            let response;

            if (editId) {

                response = await fetch(
                    `${BASE_URL}/api/skills/${editId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(skill),
                    }
                );

            } else {

                response = await fetch(
                    `${BASE_URL}/api/skills`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(skill),
                    }
                );

            }

            const data = await response.json();

            alert(data.message);

            setSkill({
                name: "",
                percentage: "",
            });

            setEditId(null);
            setShowForm(false);

            getSkills();

        } catch (error) {
            console.log(error);
        }

    };

    const editSkill = (item) => {

        setSkill({
            name: item.name,
            percentage: item.percentage,
        });

        setEditId(item._id);

        setShowForm(true);

    };

    const deleteSkill = async (id) => {

        try {

            const response = await fetch(
                `${BASE_URL}/api/skills/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            alert(data.message);

            getSkills();

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <AdminLayout>
            <div className="admin">

                <div className="admin-header">

                    <h1>Skills Management</h1>

                    <button
                        className="add-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Close Form" : "+ Add Skill"}
                    </button>

                </div>

                {showForm && (
                    <SkillForm
                        skill={skill}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        editId={editId}
                    />
                )}

                <SkillTable
                    skills={skills}
                    editSkill={editSkill}
                    deleteSkill={deleteSkill}
                />

            </div>
        </AdminLayout >
        </>
    );
}

export default Skills;