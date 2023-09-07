import React, { FC, useEffect } from 'react';
import { Typography, Box, Stack, createTheme } from '@mui/material';

import { useWindowWidth } from '../../hooks/useWindowWidth';

import { themeOptionsDark } from '../../theme';
import styles from './MainPage.module.css';
import { getDiscountCodes } from '../../sdk/requests';
import { DiscountCarousel } from '../../components/DiscountCarousel';

const themeDark = createTheme(themeOptionsDark);

export const MainPage: FC = () => {
  const { windowWidth, isMobileScreen } = useWindowWidth();

  useEffect(() => {
    getDiscountCodes()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        if (err.code === 403) {
          console.error('Cant get discount codes!');
        }
      });
  }, []);

  return (
    <div className={styles.mainBg}>
      <Stack className={styles.mainPageText} gap='2em' direction='column' color={themeDark.palette.text.primary}>
        <Typography variant={isMobileScreen ? 'h5' : 'h4'}>Step into a Universe of Sparkle!</Typography>
        <Box width={windowWidth < 1000 ? '90%' : '30vw'}>
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
      <DiscountCarousel />
    </div>
  );
};
