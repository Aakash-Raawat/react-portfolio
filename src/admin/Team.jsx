import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import TeamForm from "../components/TeamForm";
import TeamTable from "../components/TeamTable";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";

function Team() {
    const [showForm, setShowForm] = useState(false);
    const [members, setMembers] = useState([]);
    const [editMember, setEditMember] = useState(null);

    const getMembers = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/team`);
            const data = await res.json();
            console.log(data);
            setMembers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (editMember) {
            setShowForm(true);
        }
    }, [editMember]);

    return (
        <AdminLayout>
            <div className="admin">
                <div className="admin-header">
                    <h1>Team Management</h1>

                    <button
                        className="add-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Close Form" : "+ Add Member"}
                    </button>
                </div>

                {showForm && (
                    <TeamForm
                        getMembers={getMembers}
                        editMember={editMember}
                        setEditMember={setEditMember} />
                )}

                <TeamTable
                    members={members}
                    getMembers={getMembers}
                    setEditMember={setEditMember}
                />
            </div>
        </AdminLayout>
    );
}

export default Team;