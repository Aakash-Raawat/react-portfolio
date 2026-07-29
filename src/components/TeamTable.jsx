import React from "react";
import "./TeamTable.css";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";

function TeamTable({ members, getMembers, setEditMember,}) {

    const deleteMember = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this member?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(`${BASE_URL}/api/team/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("Member Deleted Successfully");
                getMembers();
            } else {
                alert("Delete Failed");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="team-table">

            <table>

                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>GitHub</th>
                        <th>LinkedIn</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {members.length === 0 ? (
                        <tr>
                            <td colSpan="6">No Team Members Found</td>
                        </tr>
                    ) : (
                        members.map((member) => (
                            <tr key={member._id}>

                                <td>
                                    <img
                                        src={`http://localhost:5000/uploads/${member.image}`}
                                        alt={member.name}
                                        width="60"
                                    />
                                </td>

                                <td>{member.name}</td>

                                <td>{member.role}</td>

                                <td>
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub
                                    </a>
                                </td>

                                <td>
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                </td>

                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => setEditMember(member)}
                                    >
                                        Edit
                                    </button>
                                    
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteMember(member._id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default TeamTable;