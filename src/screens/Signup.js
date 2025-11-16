import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error: ${res.status} – ${errText}`);
      }

      const json = await res.json();
      console.log("Server response:", json);
      alert(json.message);
      navigate("/login");
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Request failed—check console.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card shadow-lg p-4 w-100"
        style={{
          maxWidth: "420px",
          borderColor: "#198754", 
          borderWidth: "2px",
        }}
      >
        <h2 className="text-center mb-4 text-success">Sign Up</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label text-success">Full Name</label>
            <input
              type="text"
              className="form-control border-success"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-success">Email address</label>
            <input
              type="email"
              className="form-control border-success"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-success">Location</label>
            <input
              type="text"
              className="form-control border-success"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-success">Password</label>
            <input
              type="password"
              className="form-control border-success"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
            <div className="form-text text-success">
              Password must be at least 8 characters.
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Create Account
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="fw-semibold text-success text-decoration-none"
            >
              Log in
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
