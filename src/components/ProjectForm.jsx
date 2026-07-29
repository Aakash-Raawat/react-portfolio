import React from "react";

function ProjectForm({
  project,
  handleChange,
  handleImageChange,
  handleSubmit,
  editId,
}) {
  return (
    <form className="admin-form" onSubmit={handleSubmit}>

      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={project.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="tech"
        placeholder="Tech Stack"
        value={project.tech}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={project.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="github"
        placeholder="Github Link"
        value={project.github}
        onChange={handleChange}
        required
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      />

      <button type="submit">
        {editId ? "Update Project" : "Save Project"}
      </button>

    </form>
  );
}

export default ProjectForm;