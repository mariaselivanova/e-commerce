import { createContext } from 'react';

interface IUserContext {
  name: string | null;
  setName: (name: string | null) => void;
  cart: string;
  setCart: (name: string) => void;
  productQuantity: number;
  setProductQuantity: (quantity: number) => void;
}

export const UserContext = createContext<IUserContext>({
  name: null,
  setName: () => {},
  cart: '',
  setCart: () => {},
  productQuantity: 0,
  setProductQuantity: () => {},
});
