import { Button, Stack, Typography } from '@mui/material';
import React, { FC, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import styles from './header.module.css';

const Header: FC = () => {
  const user = useContext(UserContext);
  const location = useLocation();
  const isMainRoute = location.pathname === '/';

  let buttons;
  if (user) {
    buttons = <Button>Logout</Button>;
  } else if (isMainRoute) {
    buttons = (
      <>
        <NavLink className={styles.link} to='/login'>
          Log in
        </NavLink>
        <NavLink className={styles.link} to='/register'>
          Register
        </NavLink>
      </>
    );
  }
  return (
    <header className={styles.header}>
      <Typography variant='h4' component='h1'>
        Universe of Sparkle
      </Typography>
      <Stack spacing={2} direction='row'>
        {buttons}
      </Stack>
    </header>
  );
};

export default Header;
