import React, { FC } from 'react';
import { Typography, Box, Stack, createTheme } from '@mui/material';

import { useWindowWidth } from '../../hooks/useWindowWidth';

import { themeOptionsDark } from '../../theme';
import { DiscountCarousel } from '../../components/DiscountCarousel';
import styles from './MainPage.module.css';

const themeDark = createTheme(themeOptionsDark);

export const MainPage: FC = () => {
  const { windowWidth, isMobileScreen } = useWindowWidth();

  return (
    <div className={styles.mainBg}>
      <Stack className={styles.mainPageText} direction='column' color={themeDark.palette.text.primary}>
        <Typography variant={isMobileScreen ? 'h6' : 'h4'}>Step into a Universe of Sparkle!</Typography>
        <Box width={windowWidth < 1000 ? '90%' : '30vw'}>
          <Typography className={styles.mainText}>
            Welcome to our dazzling jewelry galaxy, <br />
            where elegance meets celestial brilliance.
          </Typography>
          <Typography className={styles.mainText}>
            Explore our stellar collection and find <br /> the perfect piece to light up your world.
          </Typography>
        </Box>
        <Typography className={styles.mainText}>React Cats Team</Typography>
      </Stack>
      <DiscountCarousel />
    </div>
  );
};
