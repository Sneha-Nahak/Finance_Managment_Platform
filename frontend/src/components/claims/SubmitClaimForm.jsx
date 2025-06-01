// --- src/components/claims/SubmitClaimForm.jsx ---
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPolicies } from "../../services/policyService";
import { createClaim } from "../../services/claimService";

const SubmitClaimForm = () => {
  const [policyId, setPolicyId] = useState("");
  const [description, setDescription] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const data = await getPolicies();
        setPolicies(data);
        if (data.length > 0) {
          setPolicyId(data[0]._id);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : err.response?.data?.message || "Failed to fetch policies";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (!policyId || !description) {
      setError("Policy and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("policyId", policyId);
    formData.append("description", description);
    if (documentFile) {
      formData.append("document", documentFile);
    }

    try {
      await createClaim(formData);
      setSuccessMessage("Claim submitted successfully!");
      setTimeout(() => navigate("/claims"), 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : err.response?.data?.message || "Failed to submit claim";
      setError(errorMessage);
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

  if (error && policies.length === 0) {
    return (
      <div className="alert alert-danger mt-5 text-center">
        Error loading policies: {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow-sm rounded-3">
            <h2 className="text-center mb-4 text-primary">Submit New Claim</h2>
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}
            {successMessage && (
              <div className="alert alert-success text-center">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="policyId" className="form-label">
                  Select Policy
                </label>
                {policies.length === 0 ? (
                  <p className="text-danger">
                    No policies available. Please create a policy first.
                  </p>
                ) : (
                  <select
                    className="form-select rounded-pill"
                    id="policyId"
                    value={policyId}
                    onChange={(e) => setPolicyId(e.target.value)}
                    required
                  >
                    {policies.map((policy) => (
                      <option key={policy._id} value={policy._id}>
                        {policy.type} - {policy.coverage.substring(0, 30)}...
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control rounded-3"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="document" className="form-label">
                  Supporting Document (PDF, JPG, PNG)
                </label>
                <input
                  type="file"
                  className="form-control rounded-pill"
                  id="document"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill mt-3"
                disabled={policies.length === 0}
              >
                Submit Claim
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 rounded-pill mt-2"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitClaimForm;
