import axios from 'axios';

const API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:5000/api/auth';

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Forgot password request failed');
  }
};

const resetPassword = async (token, email, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password/${token}`, {
      email,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Reset password failed');
  }
};

const getToken = () => {
  return localStorage.getItem('token');
};

const clearToken = () => {
  localStorage.removeItem('token');
};

export { register, login, forgotPassword, resetPassword, getToken, clearToken };
