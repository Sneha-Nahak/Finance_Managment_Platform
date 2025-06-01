// --- src/components/claims/ClaimList.jsx ---

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClaims, updateClaimStatus, deleteClaim } from "../../services/claimService";
import { useAuth } from "../../hooks/useAuth";

const ClaimList = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const data = await getClaims();
      setClaims(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch claims";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleStatusUpdate = async (claimId, newStatus) => {
    if (window.confirm(`Are you sure you want to ${newStatus} this claim?`)) {
      try {
        await updateClaimStatus(claimId, newStatus);
        setClaims((prev) =>
          prev.map((claim) =>
            claim._id === claimId ? { ...claim, status: newStatus } : claim
          )
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update claim status";
        setError(errorMessage);
      }
    }
  };

  const handleDelete = async (claimId) => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
      try {
        await deleteClaim(claimId);
        setClaims((prev) => prev.filter((claim) => claim._id !== claimId));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete claim";
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
        <h2 className="text-primary">
          {user?.role === "agent" ? "All Claims" : "My Claims"}
        </h2>
        {user?.role === "customer" && (
          <button
            className="btn btn-success rounded-pill"
            onClick={() => navigate("/claims/submit")}
          >
            Submit New Claim
          </button>
        )}
      </div>
      {claims.length === 0 ? (
        <div className="alert alert-info text-center">No claims found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped shadow-sm rounded-3 overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th>ID</th>
                <th>Policy Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Filed On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim._id}>
                  <td>{claim._id.substring(0, 8)}...</td>
                  <td>{claim.policyId?.type || "N/A"}</td>
                  <td>{claim.description.substring(0, 50)}...</td>
                  <td>
                    <span
                      className={`badge ${
                        claim.status === "pending"
                          ? "bg-warning text-dark"
                          : claim.status === "approved"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {claim.status}
                    </span>
                  </td>
                  <td>{new Date(claim.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2 rounded-pill"
                      onClick={() => navigate(`/claims/${claim._id}`)}
                    >
                      View
                    </button>

                    {user?.role === "agent" && claim.status === "pending" && (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2 rounded-pill"
                          onClick={() =>
                            handleStatusUpdate(claim._id, "approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-warning me-2 rounded-pill"
                          onClick={() =>
                            handleStatusUpdate(claim._id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {(user?.role === "agent" ||
                      (user?.role === "customer" &&
                        claim.customerId === user?._id)) && (
                      <button
                        className="btn btn-sm btn-danger rounded-pill"
                        onClick={() => handleDelete(claim._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClaimList;
