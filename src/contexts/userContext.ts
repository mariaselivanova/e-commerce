import { createContext } from 'react';

interface IUserContext {
  name: string | null;
  setName: (name: string) => void;
}

export const UserContext = createContext<IUserContext>({
  name: null,
  setName: () => {},
});
