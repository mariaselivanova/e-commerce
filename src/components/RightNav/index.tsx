import React, { FC, useContext } from 'react';
import { Button, Drawer, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/userContext';
import { catalogRoute, loginRoute, profileRoute, registerRoute } from '../../utils/routes';
import { rootClient } from '../../sdk/client';

import styles from './RightNav.module.css';

interface IRightNav {
  open: boolean;
  onClick: () => void;
}

export const RightNav: FC<IRightNav> = ({ open, onClick }) => {
  const user = useContext(UserContext);

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    user.setName(null);
    rootClient.updateWithAnonymousSessionFlow();
    onClick();
  };

  return (
    <Drawer className={styles.drawer} anchor='right' open={open} onClose={onClick}>
      <Stack className={styles.stack} spacing={3}>
        <Link className={styles.link} to={catalogRoute} onClick={onClick}>
          Catalog
        </Link>
        {user.name ? (
          <>
            <Link className={styles.link} to={profileRoute} onClick={onClick}>
              Profile
            </Link>
            <Button onClick={handleLogout} variant='contained'>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link className={styles.link} to={loginRoute} onClick={onClick}>
              Log in
            </Link>
            <Link className={styles.link} to={registerRoute} onClick={onClick}>
              Register
            </Link>
          </>
        )}
      </Stack>
    </Drawer>
  );
};
