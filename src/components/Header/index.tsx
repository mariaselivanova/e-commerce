import React, { FC, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Stack, Typography, Button, IconButton } from '@mui/material';

import { UserContext } from '../../contexts/userContext';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { handleLogout } from '../../utils/authUtils';

import { BurgerMenu } from '../BurgerMenu';

import styles from './Header.module.css';
import userIcon from '../../assets/icons/user-icon.svg';
import { catalogRoute, loginRoute, mainRoute, profileRoute, registerRoute } from '../../utils/routes';

export const Header: FC = () => {
  const user = useContext(UserContext);

  const { isMobileScreen } = useWindowWidth();

  const { pathname } = useLocation();
  const isMainRoute = pathname === mainRoute;

  let links;

  if (user.name) {
    links = (
      <>
        <Link to={profileRoute}>
          <IconButton>
            <img className={styles.usericon} src={userIcon} alt='link to user profile' />
          </IconButton>
        </Link>
        <Button onClick={handleLogout} variant='contained' href={mainRoute}>
          Logout
        </Button>
      </>
    );
  } else if (isMainRoute) {
    links = (
      <>
        <Button variant='contained' href={loginRoute}>
          Log in
        </Button>
        <Button variant='contained' href={registerRoute}>
          Register
        </Button>
      </>
    );
  }

  return (
    <header className={styles.header}>
      <Link to={mainRoute} className={styles.logo}>
        <Typography variant={isMobileScreen ? 'h5' : 'h4'} component='h1'>
          Universe of Sparkle
        </Typography>
      </Link>
      <Stack spacing={2} direction='row' alignItems={'center'}>
        {isMainRoute && (
          <Link className={styles.link} to={catalogRoute}>
            Catalog
          </Link>
        )}
        {isMobileScreen && isMainRoute ? <BurgerMenu /> : links}
      </Stack>
    </header>
  );
};
