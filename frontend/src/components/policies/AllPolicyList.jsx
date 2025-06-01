// --- src/components/policies/PolicyList.jsx ---

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPolicies, deletePolicy } from "../../services/policyService";
import { useAuth } from "../../hooks/useAuth";

const AllPolicyList = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const data = await getPolicies();
        setPolicies(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch policies";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      try {
        await deletePolicy(id);
        setPolicies((prev) => prev.filter((policy) => policy._id !== id));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete policy";
        setError(errorMessage);
      }
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger mt-5 text-center" role="alert">
        Error: {error}
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Insurance Policies</h2>
        {user?.role === "agent" && (
          <button
            className="btn btn-success rounded-pill"
            onClick={() => navigate("/policies/create")}
          >
            Create New Policy
          </button>
        )}
      </div>

      {policies.length === 0 ? (
        <div className="alert alert-info text-center">No policies found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped shadow-sm rounded-3 overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th>Type</th>
                <th>Coverage</th>
                <th>Premium</th>
                <th>Terms</th>
                {user?.role === "agent" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy._id}>
                  <td>{policy.type}</td>
                  <td>{policy.coverage}</td>
                  <td>${parseFloat(policy.premium).toFixed(2)}</td>
                  <td>{policy.terms.substring(0, 50)}...</td>
                  {user?.role === "agent" && (
                    <td>
                      
                     
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPolicyList;
