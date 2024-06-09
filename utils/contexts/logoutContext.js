import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCookie } from 'cookies-next';

// יצירת הקונטקסט
const AuthContext = createContext();

// ספק הקונטקסט
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// הוק מותאם אישית לגישה לקונטקסט
export const useAuth = () => useContext(AuthContext);
