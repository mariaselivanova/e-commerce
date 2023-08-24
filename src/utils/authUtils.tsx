import { rootClient } from '../sdk/client';

export const handleLogout = (): void => {
  localStorage.removeItem('user');
  rootClient.updateWithAnonymousSessionFlow();
};
