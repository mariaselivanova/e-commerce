import React, { FC } from 'react';
import { Grid, Link } from '@mui/material';
// import userIcon from '../../assets/icons/user-icon.svg';
// import styles from './AboutUs.module.css';

export const AboutUs: FC = () => {
  console.log('hi!');
  return (
    <>
      <Grid container columns={3}>
        <Grid item xs={1}>
          фвы
        </Grid>
      </Grid>
      <Link href='https://rs.school/index.html'>RS</Link>
    </>
  );
};
