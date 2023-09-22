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
        <Link className={styles.link} to={RouteLinks.About} onClick={onClick}>
          About
        </Link>
        <Link className={styles.link} to={RouteLinks.Catalog} onClick={onClick}>
          All jewelry
        </Link>
        <Link className={styles.link} to={RouteLinks.Cart} onClick={onClick}>
          Cart
          {!!user.productQuantity && <span className={styles.quantity}>{user.productQuantity}</span>}
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
            <Link to={RouteLinks.Login} onClick={onClick}>
              <Button variant='contained' className={styles.navBtns}>
                Log in
              </Button>
            </Link>
            <Link to={RouteLinks.Register} onClick={onClick}>
              <Button variant='contained' className={styles.navBtns}>
                Register
              </Button>
            </Link>
          </>
        )}
      </Stack>
    </Drawer>
  );
};
