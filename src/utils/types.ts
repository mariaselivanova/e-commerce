import { ReactElement, ReactNode } from 'react';

export interface IUserContext {
  name: string;
}

export interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  element: ReactElement;
}

export interface IAuthLinkProps {
  to: string;
  children: ReactNode;
}
