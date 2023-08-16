import React, { FC } from 'react';
import { Stack, Typography, Link } from '@mui/material';

import styles from './styles.module.css';
import gitHubIcon from '../../assets/icons/github-mark.svg';

interface IDeveloperProps {
  name: string;
  github: string;
}

export const Developer: FC<IDeveloperProps> = ({ name, github }) => (
  <Stack spacing={2} direction='row' className={styles.developer}>
    <Typography>{name}</Typography>
    <Link href={`https://github.com/${github}`} className={styles.developer_link} target='_blank'>
      <img src={gitHubIcon} alt={`${name}'s github`} className={styles.developer_link__img} />
    </Link>
  </Stack>
);
