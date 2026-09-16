import React, { useEffect, useState } from "react";
import "./Skills.css";
import {
  FaCode,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLaptopCode,
} from "react-icons/fa";

const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "https://react-portfolio-24zb.onrender.com";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/skills`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch skills");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setSkills(data);
        } else {
          setSkills([]);
        }
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
    <section id="skills" className="skills">
      <h2>My Skills</h2>

      {/* Loading UI */}
      {loading && (
        <div className="skills-loading">
          <div className="skills-loading-icon">
            <FaLaptopCode />
          </div>

          <h3>Preparing My Skills</h3>

          <p>
            I'm loading my technical skills and experience.
            <br />
            Please wait a moment...
          </p>

          <div className="skills-tech-icons">
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

          <div className="skills-spinner"></div>

          <small>Loading skills...</small>
        </div>
      )}

      {/* Error UI */}
      {!loading && error && (
        <div className="skills-empty">
          <FaCode />
          <p>Unable to load skills right now.</p>
        </div>
      )}

      {/* Skills Data */}
      {!loading && !error && skills.length > 0 && (
        <div className="skills-container">
          {skills.map((skill) => (
            <div className="skill-card" key={skill._id}>
              <h3>{skill.name}</h3>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: skill.level }}
                ></div>
              </div>

              <span>{skill.level}</span>
            </div>
          ))}
        </div>
      )}

      {/* Empty Data */}
      {!loading && !error && skills.length === 0 && (
        <div className="skills-empty">
          <FaCode />
          <p>No skills available at the moment.</p>
        </div>
      )}
    </section>
  );
}

export default Skills;
