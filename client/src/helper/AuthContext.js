import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [username, setContextUsername] = useState('');

  const value = {
    username,
    setContextUsername,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
