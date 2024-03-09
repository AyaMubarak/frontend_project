import { Navigate } from 'react-router-dom';

function ProductedRouter({ children }) {
  const token = localStorage.getItem('userToken');
  console.log('User Token in ProductedRouter:', token);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProductedRouter;
