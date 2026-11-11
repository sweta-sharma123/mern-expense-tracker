import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await register(form);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <p className="muted">Register to manage your personal income and expenses.</p>
      <form onSubmit={submit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={change} required />
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={change} required />
        <label>Password</label>
        <input name="password" type="password" minLength="6" value={form.password} onChange={change} required />
        <button className="primary full">Register</button>
      </form>
      {message && <p className="error">{message}</p>}
      <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
