import { ReactElement } from 'react';

export interface IUserContext {
  name: string;
}

export interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  element: ReactElement;
}
