import React, { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography, IconButton } from '@mui/material';

import { RouteLinks } from '../../utils/types';
import { UserContext } from '../../contexts/userContext';

import { RightNav } from '../RightNav';

import cartIcon from '../../assets/icons/cart.svg';
import styles from './BurgerMenu.module.css';

const menuItems = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  className: styles.element,
  isOpenClassName: styles[`openElement${index + 1}`],
}));

export const BurgerMenu: FC = () => {
  const user = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeNav = (): void => {
    setIsMenuOpen(false);
  };

  const toggleNav = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Stack direction='row' className={styles.burgerMenuItems}>
        <Link to={RouteLinks.Cart}>
          <IconButton className={styles.cart} onClick={closeNav}>
            <img className={styles.usericon} src={cartIcon} alt='link to cart' />
            {!!user.productQuantity && <Typography className={styles.quantity}>{user.productQuantity}</Typography>}
          </IconButton>
        </Link>
        <div className={styles.menu} onClick={toggleNav}>
          {menuItems.map((item) => (
            <div key={item.id} className={`${item.className} ${isMenuOpen && item.isOpenClassName}`} />
          ))}
        </div>
        <RightNav open={isMenuOpen} onClick={closeNav} />
      </Stack>
    </>
  );
};
