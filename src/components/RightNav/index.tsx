import React, { FC, useContext } from 'react';
import { Drawer, Link, Stack } from '@mui/material';

import { UserContext } from '../../contexts/userContext';
import { handleLogout } from '../../utils/authUtils';
import { catalogRoute, loginRoute, mainRoute, profileRoute, registerRoute } from '../../utils/routes';

import styles from './RightNav.module.css';

interface IRightNav {
  open: boolean;
  onClick: () => void;
}

export const RightNav: FC<IRightNav> = ({ open, onClick }) => {
  const user = useContext(UserContext);

  return (
    <Drawer className={styles.drawer} anchor='right' open={open} onClose={onClick}>
      <Stack className={styles.stack} spacing={3}>
        <Link className={styles.link} href={catalogRoute} underline='hover' variant='h5'>
          Catalog
        </Link>
        {user.name ? (
          <>
            <Link className={styles.link} href={profileRoute} underline='hover' variant='h5' onClick={handleLogout}>
              Profile
            </Link>
            <Link className={styles.link} href={mainRoute} underline='hover' variant='h5' onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.link} href={loginRoute} underline='hover' variant='h5'>
              Log in
            </Link>
            <Link className={styles.link} href={registerRoute} underline='hover' variant='h5'>
              Register
            </Link>
          </>
        )}
      </Stack>
    </Drawer>
  );
};
