import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });

    };

    useEffect(() => {

        if (localStorage.getItem("isAdmin") === "true") {

            navigate("/admin/dashboard");

        }
        setUser({
            username: "",
            password: "",
        });


    }, [navigate]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const username = user.username.trim();
        const password = user.password.trim();

        if (username === "") {
            alert("Username is required");
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(username)) {
            alert("Username should contain only letters");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {

            // API call here


            const response = await fetch(`${BASE_URL}/api/admin/login`, {


                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },


                body: JSON.stringify(user),

            });

            const data = await response.json();

            if (data.success) {

                localStorage.setItem("isAdmin", "true");

                alert(data.message);

                navigate("/admin/dashboard");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);

            alert("Something went wrong");
        }


    };

    return (

        <div className="login-container">

            <form className="login-form" onSubmit={handleSubmit}>

                <h2>Admin Login</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                />

                <div className="password-wrapper">

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                    />

                    <span
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>

                </div>

                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;