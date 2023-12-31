import React, { FC } from 'react';
import { Typography, Link } from '@mui/material';

import { useWindowWidth } from '../../hooks/useWindowWidth';

import styles from './styles.module.css';
import gitHubIcon from '../../assets/icons/github-mark.svg';

interface IDeveloperProps {
  name: string;
  github: string;
}

export const Developer: FC<IDeveloperProps> = ({ name, github }) => {
  const { isMobileScreen } = useWindowWidth();

  return (
    <Link href={`https://github.com/${github}`} className={styles.developer} target='_blank'>
      {!isMobileScreen && <Typography>{name}</Typography>}
      <img src={gitHubIcon} alt={`${name}'s github`} className={styles.developer_link__img} />
    </Link>
  );
};
