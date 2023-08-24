import React, { FC, ReactElement, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Stack, Typography, Button, IconButton } from '@mui/material';

import { UserContext } from '../../contexts/userContext';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { catalogRoute, loginRoute, mainRoute, profileRoute, registerRoute } from '../../utils/routes';
import { rootClient } from '../../sdk/client';

import { BurgerMenu } from '../BurgerMenu';

import styles from './Header.module.css';
import userIcon from '../../assets/icons/user-icon.svg';

export const Header: FC = () => {
  const user = useContext(UserContext);
  const { isMobileScreen } = useWindowWidth();
  const { pathname } = useLocation();

  const isAuthRoute = [loginRoute, registerRoute].includes(pathname);

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    user.setName(null);
    rootClient.updateWithAnonymousSessionFlow();
  };

  const renderDesktopLinks = (): ReactElement => (
    <>
      <Link className={styles.link} to={catalogRoute}>
        Catalog
      </Link>
      {user.name ? (
        <>
          <Link to={profileRoute}>
            <IconButton>
              <img className={styles.usericon} src={userIcon} alt='link to user profile' />
            </IconButton>
          </Link>
          <Button onClick={handleLogout} variant='contained'>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to={loginRoute}>
            <Button role='link' variant='contained'>
              Log in
            </Button>
          </Link>
          <Link to={registerRoute}>
            <Button role='link' variant='contained'>
              Register
            </Button>
          </Link>
        </>
      )}
    </>
  );

  const renderHeader = (): ReactElement => {
    if (isMobileScreen) {
      return <BurgerMenu />;
    }

    return renderDesktopLinks();
  };

  return (
    <header className={styles.header}>
      <Link to={mainRoute} className={styles.logo}>
        <Typography variant={isMobileScreen ? 'h5' : 'h4'} component='h1'>
          Universe of Sparkle
        </Typography>
      </Link>
      <Stack spacing={2} direction='row' alignItems={'center'}>
        {!isAuthRoute && renderHeader()}
      </Stack>
    </header>
  );
};
