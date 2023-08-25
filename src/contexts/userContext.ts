import { createContext } from 'react';

interface IUserContext {
  name: string | null;
  setName: (name: string | null) => void;
}

export const UserContext = createContext<IUserContext>({
  name: null,
  setName: () => {},
});
