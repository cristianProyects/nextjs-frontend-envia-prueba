import { useEffect, useState } from 'react';

const ProtectedPage = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verify user
    const verifyAuth = async () => {
      const token = window.localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/v1/auth/verify/${token}`);
      const data = await response.json();
    
      if (response.ok && data.message === 'Autorizado') {
        setIsAuthenticated(true);
      } else {
        window.location.href ='/'; // Redirect to login page
      }
    };

    verifyAuth();
  }, []);

  return isAuthenticated ? children : null;
};

export default ProtectedPage;