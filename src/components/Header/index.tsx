import React, { FC, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';

import { UserContext } from '../../contexts/userContext';

import styles from './Header.module.css';

export const Header: FC = () => {
  const user = useContext(UserContext);
  const { pathname } = useLocation();
  const isMainRoute = pathname === '/';

  const buttons = user ? (
    <Button variant='contained' href={'/'}>
      Logout
    </Button>
  ) : isMainRoute ? (
    <>
      <Button variant='contained' href={'/login'}>
        Log in
      </Button>
      <Button variant='contained' href={'/register'}>
        Register
      </Button>
    </>
  ) : null;

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        <Typography variant='h4' component='h1'>
          Universe of Sparkle
        </Typography>
      </Link>
      <Stack spacing={2} direction='row'>
        {buttons}
      </Stack>
    </header>
  );
};
