import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/loginuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Invalid credentials");
        return;
      }

      // ✅ Save token and user details directly from response
      localStorage.setItem("authToken", data.authToken);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userName", data.name);

      alert("🎉 Login successful!");
      navigate("/"); // redirect to home page

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong while logging in. Please try again.");
      setLoading(false);
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
        <h2 className="text-center mb-4 text-success">Log In</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label text-success">Email address</label>
            <input
              type="email"
              className="form-control border-success"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
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
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="fw-semibold text-success text-decoration-none"
            >
              Sign up
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
