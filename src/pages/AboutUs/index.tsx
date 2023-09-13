import React, { FC } from 'react';
import { Avatar, Box, Container, Grid, IconButton, Link, Typography, Stack } from '@mui/material';

import { useWindowWidth } from '../../hooks/useWindowWidth';
import { creatorsInfo } from '../../utils/creatorsInfo';

import { StepperVertical } from '../../components/StepperVertical';
import { AboutCard } from '../../components/AboutCard';

import rsIcon from '../../assets/icons/rs.svg';
import styles from './AboutUs.module.css';

export const AboutUs: FC = () => {
  const windowDimensions = useWindowWidth();

  return (
    <>
      <Typography className={styles.team} variant='h4' component='h4'>
        Our incomparable team
      </Typography>
      <Grid className={styles.grid} container columns={windowDimensions.windowWidth <= 830 ? 1 : 3}>
        {creatorsInfo.map((card) => (
          <AboutCard key={card.name} name={card.name} photo={card.photo} github={card.github} bio={card.bio} />
        ))}
      </Grid>
      <Box className={styles.contribution}>
        <Typography className={styles.header} variant='h4' component='h4'>
          Contributions to the project
        </Typography>
        <Container className={styles.avatarContainer}>
          <Stack>
            <Avatar className={styles.maria}>M</Avatar>
            <Typography>Maria</Typography>
          </Stack>
          <Stack>
            <Avatar className={styles.danuta}>D</Avatar>
            <Typography>Danuta</Typography>
          </Stack>
          <Stack>
            <Avatar className={styles.pavel}>P</Avatar>
            <Typography>Pavel</Typography>
          </Stack>
        </Container>
        <StepperVertical />
      </Box>
      <Link target='_blank' rel='noopener noreferrer' href='https://rs.school/index.html'>
        <IconButton className={styles.rsIconWrapper}>
          <img className={styles.rsIcon} src={rsIcon} />
        </IconButton>
      </Link>
    </>
  );
};
