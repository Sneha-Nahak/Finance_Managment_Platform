import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm rounded-3">
        <h2 className="text-center mb-4 text-success">
          Welcome, {user?.name || "User"}!
        </h2>
        <p className="text-center">
          You are logged in as: <strong>{user?.role}</strong>
        </p>

        <div className="d-flex flex-column align-items-center gap-3 mt-4">
          <Link to="/policies" className="btn btn-info w-50 rounded-pill">
            View All Policies
          </Link>

          {user?.role === "agent" && (
            <Link to="/policies/create" className="btn btn-success w-50 rounded-pill">
              Create New Policy
            </Link>
          )}

          {user?.role === "customer" && (
            <Link to="/claims/submit" className="btn btn-primary w-50 rounded-pill">
              Submit New Claim
            </Link>
          )}

          <Link to="/claims" className="btn btn-warning w-50 rounded-pill text-dark">
            View My/All Claims
          </Link>

          <button onClick={logout} className="btn btn-danger w-25 rounded-pill mt-3">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
