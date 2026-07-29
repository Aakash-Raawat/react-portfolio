import React from "react";
import "./SkillForm.css";

function SkillForm({
    skill,
    handleChange,
    handleSubmit,
    editId,
}) {

    return (

        <form className="skill-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    placeholder="Skill Name"
                    value={skill.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <input
                    type="number"
                    name="percentage"
                    placeholder="Percentage"
                    value={skill.percentage}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">
                {editId ? "Update Skill" : "Save Skill"}
            </button>

        </form>
    );
}

export default SkillForm;