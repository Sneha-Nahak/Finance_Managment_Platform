// --- src/components/policies/CreatePolicyForm.jsx ---

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPolicy } from "../../services/policyService";

const CreatePolicyForm = () => {
  const [type, setType] = useState("health");
  const [coverage, setCoverage] = useState("");
  const [premium, setPremium] = useState("");
  const [terms, setTerms] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      await createPolicy({
        type,
        coverage,
        premium: parseFloat(premium),
        terms,
      });

      setSuccessMessage("Policy created successfully!");
      setTimeout(() => navigate("/policies"), 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create policy";
      setError(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow-sm rounded-3">
            <h2 className="text-center mb-4 text-primary">Create New Policy</h2>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Policy Type
                </label>
                <select
                  className="form-select rounded-pill"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="health">Health</option>
                  <option value="auto">Auto</option>
                  <option value="home">Home</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="coverage" className="form-label">
                  Coverage Details
                </label>
                <textarea
                  className="form-control rounded-3"
                  id="coverage"
                  rows="3"
                  value={coverage}
                  onChange={(e) => setCoverage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="premium" className="form-label">
                  Premium Amount ($)
                </label>
                <input
                  type="number"
                  className="form-control rounded-pill"
                  id="premium"
                  value={premium}
                  onChange={(e) => setPremium(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="terms" className="form-label">
                  Terms and Conditions
                </label>
                <textarea
                  className="form-control rounded-3"
                  id="terms"
                  rows="5"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill mt-3"
              >
                Create Policy
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 rounded-pill mt-2"
                onClick={() => navigate("/policies")}
              >
                Back to Policies
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePolicyForm;
