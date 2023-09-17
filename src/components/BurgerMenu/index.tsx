import React, { FC, useState } from 'react';
import { Stack } from '@mui/material';

import { RightNav } from '../RightNav';

import styles from './BurgerMenu.module.css';

const menuItems = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  className: styles.element,
  isOpenClassName: styles[`openElement${index + 1}`],
}));

export const BurgerMenu: FC = () => {
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
