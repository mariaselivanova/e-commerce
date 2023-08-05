import { createContext } from 'react';
import { IUserContext } from '../utils/types';

export const UserContext = createContext<IUserContext | null>(null);
