import { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, clearToken } from '../services/authService.js';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  const decodeToken = (token) => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired. Logging out.");
          logoutUser();
          return null;
        }
        setUser(decoded);
        return decoded;
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null);
        clearToken();
        return null;
      }
    } else {
      setUser(null);
      return null;
    }
  };

  const loginUser = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    decodeToken(newToken);
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    clearToken();
    navigate('/login');
  };

  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);
    decodeToken(storedToken);
    setAuthLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, authLoading, login: loginUser, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
