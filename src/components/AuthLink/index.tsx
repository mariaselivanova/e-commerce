import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthLink.module.css';

interface IAuthLinkProps {
  to: string;
  children: ReactNode;
}

export const AuthLink: FC<IAuthLinkProps> = ({ to, children }) => {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
};
