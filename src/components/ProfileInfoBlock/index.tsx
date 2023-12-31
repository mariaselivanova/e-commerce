import React, { FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import styles from './ProfileInfoBlock.module.css';

interface UserInfo {
  info?: string;
  label: string;
}

export const ProfileInfoBlock: FC<UserInfo> = ({ info, label }) => (
  <Grid item xs={1}>
    <Stack className={styles.stack}>
      <Typography>{label}</Typography>
      <Typography variant='h5' component={'h5'}>
        {info || 'Loading...'}
      </Typography>
    </Stack>
  </Grid>
);
