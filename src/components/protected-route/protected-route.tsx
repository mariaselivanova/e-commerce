import React, { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { IProtectedRouteProps } from '../../utils/types';

const ProtectedRoute: FC<IProtectedRouteProps> = ({ onlyUnAuth, element }) => {
  const user = useContext(UserContext);

  //if user is authorized, he can't visit login or register pages.
  if (user && onlyUnAuth) {
    return <Navigate to='/' />;
  }

  //if user is not authorized and the route is protected, he is redirected to login page.
  if (!user && !onlyUnAuth) {
    return <Navigate to='/login' />;
  }

  return element;
};

export default ProtectedRoute;