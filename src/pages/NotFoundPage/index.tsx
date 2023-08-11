import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Stack, Divider } from '@mui/material';

import styles from './NotFoundPage.module.css';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  return (
    <Stack className={styles.notFoundContainer}>
      <Stack spacing={'1em'} className={styles.notFoundContainer_text}>
        <Typography variant='h5' gutterBottom>
          404: Lost in Space Gems
        </Typography>
        <Box>
          <Typography>
            Oops! It seems like you&apos;ve ventured into the cosmic void of our website, <br />
            where our dazzling gems like to play hide-and-seek.
          </Typography>
          <Typography>While they&apos;re enjoying their little cosmic adventure, we apologize for the temporary detour.</Typography>
          <Typography>Rest assured, our jewelry astronauts are on a mission to retrieve the missing treasures.</Typography>
          <Typography>In the meantime, why not enjoy some stardust humor:</Typography>
          <Typography className={styles.divider}>Why did the diamond feel left out? It couldn&apos;t find a facet-ating group!</Typography>
          <Typography>
            If you need assistance finding your way back, <br />
            reach out to our cosmic customer support team.
          </Typography>
          <Typography>They&apos;ll navigate you back to the shimmering path.</Typography>
          <Typography>Safe travels through the stars,</Typography>
          <Typography gutterBottom>React Cats Team</Typography>
        </Box>

        <Stack spacing={'1em'} direction='row'>
          <Button role='link' variant='contained' onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant='contained' href='/'>
            Main
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
