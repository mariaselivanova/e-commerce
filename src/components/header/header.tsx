import { Button, Stack, Typography } from '@mui/material';
import React, { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import styles from './header.module.css';

const Header: FC = () => {
  const user = useContext(UserContext);
  return (
    <header className={styles.header}>
      <Typography variant='h4' component='h1'>
        Universe of Sparkle
      </Typography>
      <Stack spacing={2} direction='row'>
        <NavLink className={styles.link} to='/'>
          Main
        </NavLink>
        {user ? (
          <Button>Logout</Button>
        ) : (
          <>
            <NavLink className={styles.link} to='/login'>
              Log in
            </NavLink>
            <NavLink className={styles.link} to='/register'>
              Register
            </NavLink>
          </>
        )}
      </Stack>
    </header>
  );
};

export default Header;
