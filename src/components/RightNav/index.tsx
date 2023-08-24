import React, { FC, useContext } from 'react';
import { Drawer, Link, Stack } from '@mui/material';

import { UserContext } from '../../contexts/userContext';
import { handleLogout } from '../../utils/authUtils';

import styles from './RightNav.module.css';
import { loginRoute, registerRoute } from '../../utils/routes';

interface IRightNav {
  open: boolean;
  onClick: () => void;
}

export const RightNav: FC<IRightNav> = ({ open, onClick }) => {
  const user = useContext(UserContext);

  return (
    <Drawer className={styles.drawer} anchor='right' open={open} onClose={onClick}>
      {user.name ? (
        <Stack className={styles.stack}>
          <Link className={styles.link} href='/' underline='hover' variant='h5' onClick={handleLogout}>
            Logout
          </Link>
        </Stack>
      ) : (
        <Stack className={styles.stack} spacing={3}>
          <Link className={styles.link} href={loginRoute} underline='hover' variant='h5'>
            Log in
          </Link>
          <Link className={styles.link} href={registerRoute} underline='hover' variant='h5'>
            Register
          </Link>
        </Stack>
      )}
    </Drawer>
  );
};
