import { createContext } from 'react';

interface IUserContext {
  name: string | null;
  setName: (name: string | null) => void;
  cart: string;
  setCart: (name: string) => void;
}

export const UserContext = createContext<IUserContext>({
  name: null,
  setName: () => {},
  cart: 'default',
  setCart: () => {},
});
