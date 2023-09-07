import React, { FC } from 'react';
import { Typography, Box, Stack, createTheme, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { useWindowWidth } from '../../hooks/useWindowWidth';
import { RouteLinks } from '../../utils/types';

import { themeOptionsDark } from '../../theme';
import styles from './MainPage.module.css';

const themeDark = createTheme(themeOptionsDark);

export const MainPage: FC = () => {
  const { windowWidth, isMobileScreen } = useWindowWidth();

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
        <Stack spacing={3} direction='row'>
          <Link to={RouteLinks.Login}>
            <Button role='link' variant='contained'>
              Log in
            </Button>
          </Link>
          <Link to={RouteLinks.Register}>
            <Button role='link' variant='contained'>
              Register
            </Button>
          </Link>
        </Stack>
      </Stack>
    </div>
  );
};
