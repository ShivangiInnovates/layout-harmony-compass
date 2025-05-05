
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to the new home page
  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null; // No render needed as we're redirecting
};

export default Index;
