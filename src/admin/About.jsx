import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import "./About.css";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";

function About() {

    const [about, setAbout] = useState({
        heading: "",
        description: "",
    });

    useEffect(() => {

        fetch(`${BASE_URL}/api/about`)
            .then((res) => res.json())
            .then((data) => {

                if (data) {
                    setAbout({
                        heading: data.heading || "",
                        description: data.description || "",
                    });
                }

            })
            .catch((err) => console.log(err));

    }, []);

    const handleChange = (e) => {

        setAbout({
            ...about,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        fetch(`${BASE_URL}/api/about`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(about),

        })
            .then((res) => res.json())
            .then(() => {

                alert("About Saved Successfully");
                // form clear
                setAbout({
                    heading: "",
                    description: "",
                });

            })
            .catch((err) => console.log(err));

    };

    return (

        <AdminLayout>

            <div className="about-admin">

                <h1>About Management</h1>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Heading</label>

                        <input
                            type="text"
                            name="heading"
                            value={about.heading}
                            onChange={handleChange}
                            placeholder="Enter Heading"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Description</label>

                        <textarea
                            name="description"
                            value={about.description}
                            onChange={handleChange}
                            placeholder="Enter About Description"
                            rows="6"
                            required
                        />

                    </div>

                    <button type="submit" className="update-btn">
                        Save About
                    </button>

                </form>

            </div>

        </AdminLayout>

    );

}

export default About;