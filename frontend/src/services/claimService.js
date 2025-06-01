import axios from 'axios';
import { getToken } from './authService';


const API_URL = import.meta.env.VITE_CLAIM_API_URL || "http://localhost:5000/api/claims";


const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const createClaim = async (claimData) => {
  try {
    const response = await axios.post(`${API_URL}/`, claimData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to submit claim';
    throw new Error(errorMessage);
  }
};

const getClaims = async () => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to fetch claims';
    throw new Error(errorMessage);
  }
};

const getClaimById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to fetch claim details';
    throw new Error(errorMessage);
  }
};

const updateClaimStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}/status`,
      { status },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to update claim status';
    throw new Error(errorMessage);
  }
};

const deleteClaim = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to delete claim';
    throw new Error(errorMessage);
  }
};

export {
  createClaim,
  getClaims,
  getClaimById,
  updateClaimStatus,
  deleteClaim,
};
