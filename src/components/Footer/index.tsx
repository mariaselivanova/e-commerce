import React, { FC } from 'react';
import { Stack, Typography } from '@mui/material';

import { Developer } from '../Developer';

import styles from './Footer.module.css';

const developers = [
  { name: 'Maria Selivanova', github: 'mariaselivanova', id: 0 },
  { name: 'Pavel Mihailov', github: 'svygzhryr', id: 1 },
  { name: 'Danuta Karpava', github: 'inari13066', id: 2 },
];

export const Footer: FC = () => (
  <footer>
    <Stack gap={2} direction='row'>
      <Typography className={styles.copyright}>&copy; {new Date().getFullYear()} </Typography>
      {developers.map((item) => (
        <Developer key={item.id} name={item.name} github={item.github} />
      ))}
    </Stack>
  </footer>
);
