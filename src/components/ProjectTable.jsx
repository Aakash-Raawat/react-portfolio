import React from "react";

function ProjectTable({
  projects,
  editProject,
  deleteProject,
}) {
  return (
    <div className="table-container">

      <table className="project-table">

        <thead>
          <tr>
            <th>S.No</th>
            <th>image</th>
            <th>Project Name</th>
            <th>Tech Stack</th>
            <th>Description</th>
            <th>GitHub</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {projects.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No Projects Found
              </td>
            </tr>
          ) : (
            projects.map((item, index) => (
              <tr key={item._id}>

                <td>{index + 1}</td>

                <td>
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.title}
                    className="project-image"
                  />
                </td>

                <td>{item.title}</td>

                <td>{item.tech}</td>

                <td>{item.description}</td>

                <td>
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => editProject(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProject(item._id)}
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

export default ProjectTable;