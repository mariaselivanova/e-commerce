import React, { FC } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { createTheme } from '@mui/material';

import { themeOptionsDark } from '../../theme';
import styles from './styles.module.css';

const themeDark = createTheme(themeOptionsDark);
export const MainPage: FC = () => {
  return (
    <div className={styles.mainBg}>
      <Stack className={styles.mainPageText} gap='2em' direction='column' color={themeDark.palette.text.primary}>
        <Typography variant='h4'>Step into a Universe of Sparkle!</Typography>
        <Box width='30vw'>
          <Typography>
            Welcome to our dazzling jewelry galaxy, <br />
            where elegance meets celestial brilliance.
          </Typography>
          <Typography>
            Explore our stellar collection and find <br /> the perfect piece to light up your world.
          </Typography>
        </Box>
        <Typography>React Cats Team</Typography>
      </Stack>
      {/* <Box component='form' noValidate autoComplete='off'>
        <TextField variant='outlined' id='no-error-input' label='No error' defaultValue='No error input' />
        <TextField variant='outlined' error id='error-input' label='Error' defaultValue='Error input' helperText='Incorrect entry.' />
        <Button variant='contained'>React cats</Button>
      </Box> */}
    </div>
  );
};
