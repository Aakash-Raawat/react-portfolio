import React, { useEffect, useState } from "react";
import "./About.css";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";
console.log(BASE_URL)
function About() {

  const [about, setAbout] = useState({
    heading: "",
    description: "",
  });

  useEffect(() => {
    fetch(`${BASE_URL}/api/about`)
      .then((res) => res.json())
      .then((data) => {
        console.log("About Data:", data);

        setAbout({
          heading: data.heading || "",
          description: data.description || "",
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="about" className="about">

      {/* Section Heading */}
      <h2>About Me</h2>

      <div className="about-container">

        {/* Left Card */}
        <div className="about-card">

          <h3>{about.heading || "MERN Stack Developer"}</h3>

          <p>
            {about.description || "No description available."}
          </p>

        </div>

        {/* Right Card */}
        <div className="about-card">

          <h3>Education</h3>

          <h4>Bachelor of Computer Applications (BCA)</h4>

          <p>
            Skills: HTML, CSS, JavaScript, React,
            Node.js, Express.js, MongoDB
          </p>

          <h4>Projects</h4>

          <p>
            Blog Website, Todo App, Portfolio Website
          </p>

        </div>

      </div>

    </section>

  );

}

export default About;