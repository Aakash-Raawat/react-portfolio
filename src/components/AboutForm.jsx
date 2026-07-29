import React from "react";

function AboutForm({
    about,
    handleChange,
    handleSubmit,
}) {

    return (

        <form className="admin-form" onSubmit={handleSubmit}>

            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={about.name || ""}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="title"
                placeholder="Title"
                value={about.title || ""}
                onChange={handleChange}
                required
            />

            <textarea
                name="description"
                placeholder="Description"
                value={about.description || ""}
                onChange={handleChange}
                rows="5"
                required
            />

            <input
                type="text"
                name="experience"
                placeholder="Experience"
                value={about.experience || ""}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={about.email || ""}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="location"
                placeholder="Location"
                value={about.location || ""}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Save About
            </button>

        </form>

    );

}

export default AboutForm;