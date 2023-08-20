import React, { FC, useEffect, useState } from 'react';

import { RightNav } from '../RightNav';

import styles from './BurgerMenu.module.css';

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
        <div className={`${styles.element} ${isMenuOpen ? styles.openElement1 : ''}`} />
        <div className={`${styles.element} ${isMenuOpen ? styles.openElement2 : ''}`} />
        <div className={`${styles.element} ${isMenuOpen ? styles.openElement3 : ''}`} />
      </div>
      <RightNav open={isMenuOpen} onClick={closeNav} />
    </>
  );
};
