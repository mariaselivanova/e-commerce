import React, { FC, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';

import { UserContext } from '../../contexts/userContext';

import styles from './Header.module.css';

export const Header: FC = () => {
  const user = useContext(UserContext);
  const { pathname } = useLocation();
  const isMainRoute = pathname === '/';

  let buttons;

  const handleLogout = (): void => {
    localStorage.removeItem('user');
  };

  if (user.name) {
    buttons = (
      <Button onClick={handleLogout} variant='contained' href={'/'}>
        Logout
      </Button>
    );
  } else if (isMainRoute) {
    buttons = (
      <>
        <Button variant='contained' href={'/login'}>
          Log in
        </Button>
        <Button variant='contained' href={'/register'}>
          Register
        </Button>
      </>
    );
  }

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
