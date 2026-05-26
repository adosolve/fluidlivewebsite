import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('blog_token');
    const userData = localStorage.getItem('blog_user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setIsInitialized(true);
  }, []);

  const login = useCallback((userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('blog_token', token);
    localStorage.setItem('blog_user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentModule('dashboard');
    setBreadcrumbs([]);
    localStorage.removeItem('blog_token');
    localStorage.removeItem('blog_user');
  }, []);

  const updateBreadcrumbs = useCallback((crumbs) => {
    setBreadcrumbs(crumbs);
  }, []);

  const switchModule = useCallback((module) => {
    setCurrentModule(module);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        user,
        isAuthenticated,
        currentModule,
        breadcrumbs,
        isInitialized,
        login,
        logout,
        updateBreadcrumbs,
        switchModule
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
