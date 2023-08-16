import React, { FC, ReactElement } from 'react';
import { Stack, Typography, Link } from '@mui/material';

import styles from './styles.module.css';
import gitHubIcon from '../../assets/icons/github-mark.svg';

export const Footer: FC = () => {
  const developer = (name: string, github: string): ReactElement => (
    <Stack spacing={2} direction='row' className={styles.developer}>
      <Typography>{name}</Typography>
      <Link href={`https://github.com/${github}`} className={styles.developer_link} target='_blank'>
        <img src={gitHubIcon} alt={`${name}'s github`} className={styles.developer_link__img} />
      </Link>
    </Stack>
  );

  return (
    <footer className={styles.footer}>
      <Stack spacing={2} direction='row'>
        {developer('© Maria Selivanova', 'mariaselivanova')}
        {developer('Pavel Mihailov', 'svygzhryr')}
        {developer('Danuta Karpava', 'inari13066')}
      </Stack>
    </footer>
  );
};
