import React, { useState, useEffect } from "react";
import "./TeamForm.css";

function TeamForm({ getMembers, editMember, setEditMember }) {
  const [member, setMember] = useState({
    name: "",
    role: "",
    description: "",
    github: "",
    linkedin: "",
    image: null,
  });

  useEffect(() => {
    if (editMember) {
      setMember({
        name: editMember.name,
        role: editMember.role,
        description: editMember.description,
        github: editMember.github,
        linkedin: editMember.linkedin,
        image: null,
      });
    }
  }, [editMember]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setMember({ ...member, image: files[0] });
    } else {
      setMember({ ...member, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Name
    if (!member.name.trim()) {
      alert("Enter Team Member Name");
      return;
    }

    // Role
    if (!member.role.trim()) {
      alert("Enter Role");
      return;
    }

    // Description
    if (!member.description.trim()) {
      alert("Enter Description");
      return;
    }

    // GitHub
    if (!member.github.trim()) {
      alert("Enter GitHub Link");
      return;
    }

    // LinkedIn
    if (!member.linkedin.trim()) {
      alert("Enter LinkedIn Link");
      return;
    }

    // Image
    if (!editMember && !member.image) {
      alert("Please Select an Image");
      return;
    }

    const formData = new FormData();

    formData.append("name", member.name);
    formData.append("role", member.role);
    formData.append("description", member.description);
    formData.append("github", member.github);
    formData.append("linkedin", member.linkedin);
    // formData.append("image", member.image);

    if (member.image) {
      formData.append("image", member.image);
    }

    try {
      const url = editMember
        ? `http://localhost:5000/api/team/${editMember._id}`
        : "http://localhost:5000/api/team";

      const method = editMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });
      // const res = await fetch("http://localhost:5000/api/team", {
      //   method: "POST",
      //   body: formData,
      // });

      if (res.ok) {
        // alert("Team Member Added Successfully");
        alert(
          editMember
            ? "Team Member Updated Successfully"
            : "Team Member Added Successfully"
        );

        setMember({
          name: "",
          role: "",
          description: "",
          github: "",
          linkedin: "",
          image: null,
        });

        setEditMember(null);
        getMembers();
      } else {
        alert("Failed to Add Member");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="team-form" onSubmit={handleSubmit}>

      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Member Name"
          value={member.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={member.role}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group full-width">
        <textarea
          name="description"
          placeholder="Description"
          value={member.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="url"
          name="github"
          placeholder="GitHub Link"
          value={member.github}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Link"
          value={member.linkedin}
          onChange={handleChange}
        />
      </div>

      <div className="form-group full-width">
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <button className="save" type="submit">
        {editMember ? "Update Member" : "Save Member"}
      </button>

    </form>
  );
}

export default TeamForm;