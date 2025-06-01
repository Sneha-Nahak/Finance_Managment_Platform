// New service for Policy API calls
import axios from 'axios';
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_POLICY_API_URL || "http://localhost:5000/api/policies";


const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const createPolicy = async (policyData) => {
  try {
    const response = await axios.post(`${API_URL}/`, policyData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create policy';
  }
};

const getPolicies = async () => {
  try {
    const response = await axios.get(`${API_URL}/`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch policies';
  }
};


const getMyPolicies = async () => {
  try {
    const response = await axios.get(`${API_URL}/my`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch my policies';
  }
};

const getPolicyById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch policy details';
  }
};

const updatePolicy = async (id, policyData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, policyData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update policy';
  }
};

const deletePolicy = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete policy';
  }
};

export { createPolicy, getPolicies,getMyPolicies,getPolicyById, updatePolicy, deletePolicy };
