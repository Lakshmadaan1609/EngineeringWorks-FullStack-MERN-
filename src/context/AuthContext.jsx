import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      const refreshAllowed = sessionStorage.getItem('refresh_allowed');
      const storedToken = sessionStorage.getItem('token');

      if (refreshAllowed === 'true' && storedToken) {
        // First refresh is allowed, let's validate the token
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          await axios.get('https://engineerworks-backend.onrender.com/api/auth/validate');
          
          // Token is valid. Keep the user logged in but use up the refresh allowance.
          setToken(storedToken);
          sessionStorage.setItem('refresh_allowed', 'false');
        } catch (error) {
          // Token is invalid, log out completely
          console.log('Token validation failed on refresh, logging out.');
          setToken(null);
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('refresh_allowed');
          delete axios.defaults.headers.common['Authorization'];
        }
      } else {
        // This is a second refresh or a new session, so force logout.
        setToken(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refresh_allowed');
      }
      setLoading(false);
    };

    validateSession();
  }, []);

  useEffect(() => {
    // Update axios headers when token changes
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://engineerworks-backend.onrender.com/api/auth/login', {
        username,
        password,
      });
      const { token: responseToken } = response.data;
      setToken(responseToken);
      // Store token in sessionStorage and grant one refresh
      sessionStorage.setItem('token', responseToken);
      sessionStorage.setItem('refresh_allowed', 'true');
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh_allowed');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 