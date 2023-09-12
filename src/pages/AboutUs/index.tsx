import React, { FC } from 'react';
import { Avatar, Box, Container, Grid, IconButton, Link, Typography, Stack } from '@mui/material';

import { useWindowWidth } from '../../hooks/useWindowWidth';
import { StepperVertical } from '../../components/StepperVertical';

import rsIcon from '../../assets/icons/rs.svg';

import styles from './AboutUs.module.css';
import { AboutCard } from '../../components/AboutCard';

export const AboutUs: FC = () => {
  const windowDimensions = useWindowWidth();

  const creatorsInfo = [
    {
      name: 'Maria Selivanova',
      photo: 'https://imgflip.com/s/meme/Cute-Cat.jpg',
      github: 'https://github.com/mariaselivanova',
      bio: 'Im a front-end developer: the creative force behind the digital space. I spend my days dreaming up new and exciting ways to make interactive multimedia experiences come to life. But dont let my creative abilities fool you, Im also a problem-solving machine and will stop at nothing until the project is completed and the client is happy. I have a passion for creating, and the drive to make a difference.',
    },
    {
      name: 'Danuta Carpava',
      photo: 'https://imgflip.com/s/meme/Cute-Cat.jpg',
      github: 'https://github.com/Inari13066',
      bio: 'Im a front-end developer: the creative force behind the digital space. I spend my days dreaming up new and exciting ways to make interactive multimedia experiences come to life. But dont let my creative abilities fool you, Im also a problem-solving machine and will stop at nothing until the project is completed and the client is happy. I have a passion for creating, and the drive to make a difference.',
    },
    {
      name: 'Pavel Mihailov',
      photo: 'https://i.imgur.com/eo3IDdK.jpg',
      github: 'https://github.com/Svygzhryr',
      bio: 'Born in Mogilev, Belarus, graduated a Belarusian-Russian University with a degree in biotechnical systems and technologies. Strives to learn Front-end because this is what he always wanted to do. May and will be lazy sometimes but for sure will try his best. (on the last day before the deadline)',
    },
  ];

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
