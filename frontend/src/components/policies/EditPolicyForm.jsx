// --- src/components/policies/EditPolicyForm.jsx ---

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPolicyById, updatePolicy } from "../../services/policyService";

const EditPolicyForm = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const data = await getPolicyById(id);
        setPolicy(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch policy";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicy((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    try {
      await updatePolicy(id, {
        ...policy,
        premium: parseFloat(policy.premium),
      });
      setSuccessMessage("Policy updated successfully!");
      setTimeout(() => navigate("/policies"), 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update policy";
      setError(errorMessage);
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

  if (!policy)
    return (
      <div className="alert alert-warning mt-5 text-center">
        Policy not found.
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow-sm rounded-3">
            <h2 className="text-center mb-4 text-primary">Edit Policy</h2>

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
                  name="type"
                  value={policy.type}
                  onChange={handleChange}
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
                  name="coverage"
                  rows="3"
                  value={policy.coverage}
                  onChange={handleChange}
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
                  name="premium"
                  value={policy.premium}
                  onChange={handleChange}
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
                  name="terms"
                  rows="5"
                  value={policy.terms}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill mt-3"
              >
                Update Policy
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 rounded-pill mt-2"
                onClick={() => navigate("/policies")}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPolicyForm;
