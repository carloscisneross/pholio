import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const initAuth = async () => {
      const sessionToken = Cookies.get('session_token');
      if (sessionToken) {
        try {
          const response = await axios.get(`${backendUrl}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${sessionToken}`
            }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Auth initialization error:', error);
          Cookies.remove('session_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [backendUrl]);

  const login = async (sessionId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/profile`, {
        session_id: sessionId
      });
      
      const { user, session_token } = response.data;
      
      // Store session token in cookie
      Cookies.set('session_token', session_token, { expires: 7 });
      
      setUser(user);
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      const sessionToken = Cookies.get('session_token');
      if (sessionToken) {
        await axios.post(`${backendUrl}/api/auth/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${sessionToken}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('session_token');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};