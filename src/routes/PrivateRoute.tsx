import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import { useStore } from '../contexts/StoreContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // const { store } = useStore();

  // if(store?.newStore === true){
  //   return <Navigate to="/welcome" />
  // }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
