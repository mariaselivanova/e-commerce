import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

import styles from './NotFoundPage.module.css';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.notFoundContainer}>
      <Typography variant='h3' gutterBottom>
        404: Lost in Space Gems
      </Typography>
      <Typography gutterBottom>
        Oops! It seems like you&apos;ve ventured into the cosmic void of our website, where our dazzling gems like to play hide-and-seek.
        <br />
        While they&apos;re enjoying their little cosmic adventure, we apologize for the temporary detour.
        <br />
        Rest assured, our jewelry astronauts are on a mission to retrieve the missing treasures.
        <br />
        In the meantime, why not enjoy some stardust humor:
        <br />
        <br />
        <i>Why did the diamond feel left out? It couldn&apos;t find a facet-ating group!</i>
        <br />
        <br />
        If you need assistance finding your way back, reach out to our cosmic customer support team.
        <br />
        They&apos;ll navigate you back to the shimmering path.
        <br />
        Safe travels through the stars, <br />
        React Cats Team
      </Typography>
      <Box className={styles.BtnContainer}>
        <Button variant='contained' onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant='contained' href='/'>
          Main
        </Button>
      </Box>
    </div>
  );
};
