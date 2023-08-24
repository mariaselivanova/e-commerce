import React, { FC } from 'react';
import { Typography, Box, Stack, createTheme, Button, ButtonGroup } from '@mui/material';

import { useWindowWidth } from '../../hooks/useWindowWidth';

import { themeOptionsDark } from '../../theme';
import styles from './styles.module.css';
import { loginRoute, registerRoute } from '../../utils/routes';

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
        <ButtonGroup size='large'>
          <Button variant='contained' href={loginRoute}>
            Log in
          </Button>
          <Button variant='contained' href={registerRoute}>
            Register
          </Button>
        </ButtonGroup>
      </Stack>
    </div>
  );
};
