import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IAuthLinkProps } from '../../utils/types';
import styles from './AuthLink.module.css';

export const AuthLink: FC<IAuthLinkProps> = ({ to, children }) => {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
};
