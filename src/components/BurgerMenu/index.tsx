import React, { FC, useEffect, useState } from 'react';

import { RightNav } from '../RightNav';

import styles from './BurgerMenu.module.css';

const menuItems = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  className: styles.element,
  isOpenClassName: styles[`openElement${index + 1}`],
}));

export const BurgerMenu: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const closeNav = (): void => {
    setIsMenuOpen(false);
  };

  const toggleNav = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={styles.menu} onClick={toggleNav}>
        {menuItems.map((item) => (
          <div key={item.id} className={`${item.className} ${isMenuOpen ? item.isOpenClassName : ''}`} />
        ))}
      </div>
      <RightNav open={isMenuOpen} onClick={closeNav} />
    </>
  );
};
