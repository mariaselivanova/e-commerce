import React, { FC, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';

import { UserContext } from '../../contexts/userContext';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { handleLogout } from '../../utils/authUtils';

import { BurgerMenu } from '../BurgerMenu';

import styles from './Header.module.css';

export const Header: FC = () => {
  const user = useContext(UserContext);

  const { isMobileScreen } = useWindowWidth();

  const { pathname } = useLocation();
  const isMainRoute = pathname === '/';

  let buttons;
  let username;

  if (user.name) {
    username = (
      <Typography variant='h5' component='h5'>
        Hello, {user.name}!
      </Typography>
    );
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
        <Typography variant={isMobileScreen ? 'h5' : 'h4'} component='h1'>
          Universe of Sparkle
        </Typography>
      </Link>
      <Stack spacing={2} direction='row' alignItems={'center'}>
        {isMobileScreen && isMainRoute ? (
          <BurgerMenu />
        ) : (
          <>
            {username}
            {buttons}
          </>
        )}
      </Stack>
    </header>
  );
};
