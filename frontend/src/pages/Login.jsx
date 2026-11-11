import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await login(form);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <p className="muted">Login to view your expense dashboard.</p>
      <form onSubmit={submit}>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={change} required />
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={change} required />
        <button className="primary full">Login</button>
      </form>
      {message && <p className="error">{message}</p>}
      <p className="muted">New user? <Link to="/register">Create account</Link></p>
    </div>
  );
};

export default Login;
