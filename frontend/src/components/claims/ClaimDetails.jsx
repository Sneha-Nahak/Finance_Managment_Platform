// --- src/components/claims/ClaimDetails.jsx ---
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClaimById, updateClaimStatus, deleteClaim } from "../../services/claimService";
import { useAuth } from "../../hooks/useAuth";

const ClaimDetails = () => {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchClaim = async () => {
    try {
      setLoading(true);
      const data = await getClaimById(id);
      setClaim(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : err.response?.data?.error || err.response?.data?.message || "Failed to fetch claim details";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaim();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    if (window.confirm(`Are you sure you want to change this claim status to ${newStatus}?`)) {
      try {
        await updateClaimStatus(id, newStatus);
        setSuccessMessage(`Claim status updated to ${newStatus}!`);
        fetchClaim();
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : err.response?.data?.error || err.response?.data?.message || "Failed to update claim status";
        setError(errorMessage);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
      try {
        await deleteClaim(id);
        setSuccessMessage("Claim deleted successfully!");
        setTimeout(() => navigate("/claims"), 2000);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : err.response?.data?.error || err.response?.data?.message || "Failed to delete claim";
        setError(errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5 text-center">
        Error: {error}
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="alert alert-warning mt-5 text-center">
        Claim not found.
      </div>
    );
  }

 const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000";


  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm rounded-3">
        <h2 className="text-center mb-4 text-primary">
          Claim Details (ID: {claim._id.substring(0, 8)}...)
        </h2>

        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

        <div className="row mb-3">
          <div className="col-md-6"><strong>Policy Type:</strong></div>
          <div className="col-md-6">{claim.policyId?.type || "N/A"}</div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><strong>Description:</strong></div>
          <div className="col-md-6">{claim.description}</div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><strong>Status:</strong></div>
          <div className="col-md-6">
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
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><strong>Filed On:</strong></div>
          <div className="col-md-6">{new Date(claim.createdAt).toLocaleString()}</div>
        </div>
        {claim.documentPath && (
          <div className="row mb-3">
            <div className="col-md-6"><strong>Supporting Document:</strong></div>
            <div className="col-md-6">
              <a
                href={`${backendBaseUrl}${claim.documentPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary rounded-pill"
              >
                View Document
              </a>
            </div>
          </div>
        )}

        {user?.role === "agent" && claim.status === "pending" && (
          <div className="d-flex justify-content-center gap-2 mt-4">
            <button
              className="btn btn-success rounded-pill"
              onClick={() => handleStatusChange("approved")}
            >
              Approve Claim
            </button>
            <button
              className="btn btn-danger rounded-pill"
              onClick={() => handleStatusChange("rejected")}
            >
              Reject Claim
            </button>
          </div>
        )}

        {(user?.role === "agent" ||
          (user?.role === "customer" && claim.customerId === user?._id)) && (
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-danger rounded-pill"
              onClick={handleDelete}
            >
              Delete Claim
            </button>
          </div>
        )}

        <div className="text-center mt-4">
          <button
            className="btn btn-secondary rounded-pill"
            onClick={() => navigate("/claims")}
          >
            Back to Claims List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetails;
