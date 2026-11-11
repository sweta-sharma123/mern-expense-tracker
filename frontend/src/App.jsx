import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <Link className="brand" to="/">Expense Tracker</Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/">Dashboard</Link>
              <Link to="/transactions">Transactions</Link>
              <span className="welcome">Hi, {user.name}</span>
              <button className="secondary small" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer>Personal Expense Tracker · MERN Stack Learning Project</footer>
    </>
  );
};

export default App;
