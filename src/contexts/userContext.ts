import { createContext } from 'react';

interface IUserContext {
  name: string;
}

export const UserContext = createContext<IUserContext | null>(null);
