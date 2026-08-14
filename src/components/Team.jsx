import React, { useEffect, useState } from "react";
import "./Team.css";

// Priority: Vite env -> CRA env -> Render backend URL -> Localhost fallback
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "https://react-portfolio-24zb.onrender.com"; // <-- Live Backend URL yahan fixed fallback ke roop me di hai

function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/team`)
      .then((res) => {
        // Agar response 200 OK nahi hai (e.g. 500 ya 404), toh error throw karein
        if (!res.ok) {
          throw new Error(`Server returned status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Confirm karein ki receive hua data Sach me ARRAY hai
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
      <p className="team-text">Our talented team members</p>

      {/* Loading state handle karein */}
      {loading && <p>Loading team members...</p>}

      {/* Error state handle karein */}
      {error && <p className="error-msg">{error}</p>}

      {/* White Screen Crash Protection: Safely Array check karke Render Karein */}
      <div className="team-container">
        {!loading && Array.isArray(members) && members.length > 0 ? (
          members.map((member) => (
            <div className="team-card" key={member._id || member.id}>
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
                <i className="fab fa-facebook"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No team members available right now.</p>
        )}
      </div>
    </section>
  );
}

export default Team;
