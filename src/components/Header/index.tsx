import React, { FC, ReactElement, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Stack, Typography, Button, IconButton } from '@mui/material';

import { UserContext } from '../../contexts/userContext';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { rootClient } from '../../sdk/client';
import { RouteLinks } from '../../utils/types';

import { BurgerMenu } from '../BurgerMenu';

import userIcon from '../../assets/icons/user-icon.svg';
import cartIcon from '../../assets/icons/cart.svg';
import styles from './Header.module.css';

export const Header: FC = () => {
  const user = useContext(UserContext);
  const { isMobileScreen } = useWindowWidth();
  const { pathname } = useLocation();
  const isAuthRoute = [RouteLinks.Login, RouteLinks.Register].includes(pathname as RouteLinks);

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    user.setName(null);
    user.setCart('');
    rootClient.updateWithAnonymousSessionFlow();
  };

  const renderDesktopLinks = (): ReactElement => (
    <>
      <Link to={RouteLinks.About} className={styles.link}>
        <Typography className={styles.linkText}>About us</Typography>
      </Link>
      <Link to={RouteLinks.Catalog} className={styles.link}>
        <Typography className={styles.linkText}>All jewelry</Typography>
      </Link>
      <Link to={RouteLinks.Cart}>
        <IconButton className={styles.cart}>
          <img className={styles.usericon} src={cartIcon} alt='link to cart' />
          {!!user.productQuantity && <Typography className={styles.quantity}>{user.productQuantity}</Typography>}
        </IconButton>
      </Link>
      {user.name ? (
        <>
          <Link to={RouteLinks.Profile}>
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
          <Link to={RouteLinks.Login}>
            <Button role='link' variant='contained'>
              Log in
            </Button>
          </Link>
          <Link to={RouteLinks.Register}>
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
      <Link to={RouteLinks.Main} className={styles.logo}>
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
