import React, { FC, useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import styles from './Header.module.css';
import AuthLink from '../AuthLink';

const Header: FC = () => {
  const user = useContext(UserContext);
  const { pathname } = useLocation();
  const isMainRoute = pathname === '/';

  const buttons = user ? (
    <AuthLink to={'/'}>Logout</AuthLink>
  ) : isMainRoute ? (
    <>
      <AuthLink to={'/login'}>Log in</AuthLink>
      <AuthLink to={'/register'}>Register</AuthLink>
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

export default Header;
