import React, { useEffect, useState } from "react";
import "./Team.css";

import {
  FaUsers,
  FaHandshake,
  FaLightbulb,
  FaRocket,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" &&
    process.env?.REACT_APP_API_URL) ||
  "https://react-portfolio-24zb.onrender.com";

function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/team`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned status: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setMembers(data);
        } else {
          console.error("API response is not an array:", data);
          setMembers([]);
        }
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Failed to load team members.");
        setMembers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="team">
      <h2>Team</h2>

      <p className="team-text">
        Our talented team members
      </p>

      {loading && (
        <div className="team-loading">
          <div className="loading-icon">
            <FaUsers />
          </div>

          <h3>Meet Our Team</h3>

          <p>
            Great things are built by great people.
            <br />
            We're preparing our team members for you.
          </p>

          <div className="loading-features">
            <span>
              <FaHandshake /> Collaboration
            </span>

            <span>
              <FaLightbulb /> Creativity
            </span>

            <span>
              <FaRocket /> Growth
            </span>
          </div>

          <div className="loading-spinner"></div>

          <small>Loading team members...</small>
        </div>
      )}

      {error && !loading && (
        <p className="error-msg">{error}</p>
      )}

      {!loading &&
        !error &&
        Array.isArray(members) &&
        members.length > 0 && (
          <div className="team-container">
            {members.map((member) => (
              <div
                className="team-card"
                key={member._id || member.id}
              >
                <img
                  src={
                    member.image
                      ? `${BASE_URL}/uploads/${member.image}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={member.name || "Team Member"}
                />

                <h3>{member.name}</h3>

                <p>{member.role}</p>

                <div className="social">
                  <FaFacebook />
                  <FaTwitter />
                  <FaInstagram />
                </div>
              </div>
            ))}
          </div>
        )}

      {!loading &&
        !error &&
        Array.isArray(members) &&
        members.length === 0 && (
          <p className="team-text">
            No team members available right now.
          </p>
        )}
    </section>
  );
}

export default Team;
