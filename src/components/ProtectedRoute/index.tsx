import React, { FC, ReactElement, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../contexts/userContext';
import { loginRoute, mainRoute } from '../../utils/routes';

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  element: ReactElement;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ onlyUnAuth, element }) => {
  const user = useContext(UserContext);

  // user can't visit login or register pages when authorized.
  if (user.name && onlyUnAuth) {
    return <Navigate to={mainRoute} />;
  }

  // if user is not authorized and the route is protected, user is redirected to login page.
  if (!user.name && !onlyUnAuth) {
    return <Navigate to={loginRoute} />;
  }

  return element;
};
