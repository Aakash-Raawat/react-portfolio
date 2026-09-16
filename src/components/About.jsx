import React, { useEffect, useState } from "react";
import "./About.css";
import {
  FaUserTie,
  FaGraduationCap,
  FaCode,
  FaLaptopCode,
  FaProjectDiagram,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";

const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "https://react-portfolio-24zb.onrender.com";

function About() {
  const [about, setAbout] = useState({
    heading: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/about`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch about data");
        }
        return res.json();
      })
      .then((data) => {
        console.log("About Data:", data);

        setAbout({
          heading: data.heading || "",
          description: data.description || "",
        });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="about" className="about">
      {/* Section Heading */}
      <h2>About Me</h2>

      {/* Loading UI */}
      {loading && (
        <div className="about-loading">
          <div className="about-loading-icon">
            <FaUserTie />
          </div>

          <h3>Getting to Know Me</h3>

          <p>
            I'm preparing my introduction, education and
            <br />
            technical journey for you...
          </p>

          <div className="about-tech-icons">
            <span>
              <FaCode />
              Development
            </span>

            <span>
              <FaGraduationCap />
              Education
            </span>

            <span>
              <FaProjectDiagram />
              Projects
            </span>
          </div>

          <div className="about-spinner"></div>

          <small>Loading about information...</small>
        </div>
      )}

      {/* Error UI */}
      {!loading && error && (
        <div className="about-empty">
          <FaLaptopCode />
          <h3>About information unavailable</h3>
          <p>Please try again later.</p>
        </div>
      )}

      {/* Main About Content */}
      {!loading && !error && (
        <div className="about-container">

          {/* About Card */}
          <div className="about-card about-intro-card">
            <div className="about-card-icon">
              <FaUserTie />
            </div>

            <div>
              <h3>{about.heading || "MERN Stack Developer"}</h3>

              <p>
                {about.description ||
                  "I'm a passionate developer who enjoys building modern and user-friendly web applications."}
              </p>
            </div>
          </div>

          {/* Education Card */}
          <div className="about-card">
            <div className="about-card-icon">
              <FaGraduationCap />
            </div>

            <h3>Education</h3>

            <h4>Bachelor of Computer Applications (BCA)</h4>

            <p>
              Currently developing my knowledge in programming,
              web development and software technologies.
            </p>

            <div className="about-divider"></div>

            <h4>Technical Skills</h4>

            <div className="about-skills">
              <span>
                <FaHtml5 />
                HTML
              </span>

              <span>
                <FaCss3Alt />
                CSS
              </span>

              <span>
                <FaJs />
                JavaScript
              </span>

              <span>
                <FaReact />
                React
              </span>

              <span>
                <FaNodeJs />
                Node.js
              </span>

              <span>
                <FaDatabase />
                MongoDB
              </span>
            </div>
          </div>

          {/* Projects Card */}
          <div className="about-card about-project-card">
            <div className="about-card-icon">
              <FaProjectDiagram />
            </div>

            <h3>Projects</h3>

            <p>
              I have worked on practical web development projects
              to improve my programming and development skills.
            </p>

            <div className="about-projects">
              <div>
                <FaCode />
                <span>Blog Website</span>
              </div>

              <div>
                <FaCode />
                <span>Todo App</span>
              </div>

              <div>
                <FaCode />
                <span>Portfolio Website</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}

export default About;
