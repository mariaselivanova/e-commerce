import React, { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { IProtectedRouteProps } from '../../utils/types';

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ onlyUnAuth, element }) => {
  const user = useContext(UserContext);

  //user can't visit login or register pages when authorized.
  if (user && onlyUnAuth) {
    return <Navigate to='/' />;
  }

  //if user is not authorized and the route is protected, user is redirected to login page.
  if (!user && !onlyUnAuth) {
    return <Navigate to='/login' />;
  }

  return element;
};
