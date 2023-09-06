import React, { FC, useContext } from 'react';
import { Typography, Box, Stack, createTheme, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

import { useWindowWidth } from '../../hooks/useWindowWidth';
import { RouteLinks } from '../../utils/types';

import { themeOptionsDark } from '../../theme';
import styles from './MainPage.module.css';
import { UserContext } from '../../contexts/userContext';
import { getDiscounts } from '../../sdk/requests';

const themeDark = createTheme(themeOptionsDark);

export const MainPage: FC = () => {
  const { windowWidth, isMobileScreen } = useWindowWidth();
  const user = useContext(UserContext);
  const promocodes = ['GOLDEN20', 'DIAMOND50', 'SILVER10', 'PLATINUM35'];

  const showDiscounts = (): void => {
    getDiscounts().then((data) => {
      console.log(data);
    });
  };

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
      {user.name ? (
        <Box color={themeDark.palette.text.primary} className={styles.promocodes}>
          <Typography onClick={showDiscounts} variant='h5' component='h5'>
            Active promocodes:
          </Typography>
          <Stack spacing={1} color={themeDark.palette.text.primary} className={styles.promocodesItems}>
            {promocodes.map((item) => (
              <Chip color='primary' variant='filled' label={item} key={item} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </div>
  );
};
