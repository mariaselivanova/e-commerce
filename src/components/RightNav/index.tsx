import React, { FC, useContext } from 'react';
import { Button, Drawer, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/userContext';
import { rootClient } from '../../sdk/client';
import { RouteLinks } from '../../utils/types';

import styles from './RightNav.module.css';

interface IRightNav {
  open: boolean;
  onClick: () => void;
}

export const RightNav: FC<IRightNav> = ({ open, onClick }) => {
  const user = useContext(UserContext);

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    user.setName(null);
    user.setCart('');
    rootClient.updateWithAnonymousSessionFlow();
    onClick();
  };

  return (
    <Drawer className={styles.drawer} anchor='right' open={open} onClose={onClick}>
      <Stack className={styles.stack} spacing={3}>
        <Link className={styles.link} to={RouteLinks.Main} onClick={onClick}>
          Home
        </Link>
        <Link className={styles.link} to={RouteLinks.Catalog} onClick={onClick}>
          All jewelry
        </Link>
        {user.name ? (
          <>
            <Link className={styles.link} to={RouteLinks.Profile} onClick={onClick}>
              Profile
            </Link>
            <Button onClick={handleLogout} variant='contained'>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link className={styles.link} to={RouteLinks.Login} onClick={onClick}>
              Log in
            </Link>
            <Link className={styles.link} to={RouteLinks.Profile} onClick={onClick}>
              Register
            </Link>
          </>
        )}
      </Stack>
    </Drawer>
  );
};
