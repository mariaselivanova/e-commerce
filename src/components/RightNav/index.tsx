import React, { FC, useContext } from 'react';
import { Link } from '@mui/material';

import { UserContext } from '../../contexts/userContext';
import { handleLogout } from '../../utils/authUtils';

import styles from './RightNav.module.css';

interface IRightNav {
  open: boolean;
  onClick: () => void;
}

export const RightNav: FC<IRightNav> = ({ open, onClick }) => {
  const user = useContext(UserContext);

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <div className={`${styles.wrapper} ${open && styles.visible}`} onClick={handleWrapperClick}>
      <nav className={`${styles.nav} ${open && styles.visible}`}>
        {user.name ? (
          <>
            <Link className={styles.link} href='/' underline='hover' variant='h5' onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.link} href='/login' underline='hover' variant='h5'>
              Log in
            </Link>
            <Link className={styles.link} href='/register' underline='hover' variant='h5'>
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
