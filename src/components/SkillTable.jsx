import React from "react";
import "./SkillTable.css";

function SkillTable({
    skills,
    editSkill,
    deleteSkill,
}) {

    return (

        <div className="skill-table">

            <table>

                <thead>

                    <tr>
                        <th>S.No</th>
                        <th>Skill Name</th>
                        <th>Percentage</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {skills.length > 0 ? (

                        skills.map((item, index) => (

                            <tr key={item._id}>

                                <td>{index + 1}</td>

                                <td>{item.name}</td>

                                <td>{item.percentage}%</td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => editSkill(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteSkill(item._id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="4">
                                No Skills Found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );
}

export default SkillTable;