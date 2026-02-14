import { createContext, useContext, useState } from 'react';
import StorageService from '../services/storageService';

const AuthContext = createContext();
const HRM_TOKEN_KEY = 'hrmToken';

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(StorageService.get(HRM_TOKEN_KEY));

  const setToken = (newToken) => {
    StorageService.set(HRM_TOKEN_KEY, newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    StorageService.remove(HRM_TOKEN_KEY);
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
