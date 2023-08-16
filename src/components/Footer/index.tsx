import React, { FC } from 'react';
import { Stack } from '@mui/material';

import { Developer } from '../Developer';

const developers = [
  { name: '© Maria Selivanova', github: 'mariaselivanova', id: 0 },
  { name: 'Pavel Mihailov', github: 'svygzhryr', id: 1 },
  { name: 'Danuta Karpava', github: 'inari13066', id: 2 },
];

export const Footer: FC = () => (
  <footer>
    <Stack spacing={2} direction='row'>
      {developers.map((item) => (
        <Developer key={item.id} name={item.name} github={item.github} />
      ))}
    </Stack>
  </footer>
);
