import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function ProtectedAdminRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAdmin();

  useEffect(() => {
    if (!isAuthenticated) {
      const token = localStorage.getItem('blog_token');
      if (!token) {
        navigate('/admin');
      }
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    const token = localStorage.getItem('blog_token');
    if (!token) {
      return null;
    }
  }

  return children;
}
