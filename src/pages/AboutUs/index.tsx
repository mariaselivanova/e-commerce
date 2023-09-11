import React, { FC } from 'react';
import { Avatar, Box, Chip, Container, Grid, IconButton, Link, Typography, Stack } from '@mui/material';
import { StepperVertical } from '../../components/StepperVertical';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import gitHubIcon from '../../assets/icons/github-mark.svg';
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
        <Grid className={styles.card} item xs={1}>
          <a href='https://github.com/mariaselivanova'>
            <Box className={styles.cardImgWrapper}>
              <section className={styles.cardImgGitWrapper}>
                <img className={styles.cardImgGit} src={gitHubIcon} />
              </section>
              <img className={styles.cardImg} src='https://imgflip.com/s/meme/Cute-Cat.jpg' />
            </Box>
          </a>
          <Box className={styles.infoWrapper}>
            <Typography variant='h5' component='h5'>
              Maria Selivanova
            </Typography>
            <Chip className={styles.role} color='primary' variant='filled' label='Front-end Developer' />
            <Typography className={styles.bio}>
              Im a front-end developer: the creative force behind the digital space. I spend my days dreaming up new and exciting ways to make
              interactive multimedia experiences come to life. But dont let my creative abilities fool you, Im also a problem-solving machine and will
              stop at nothing until the project is completed and the client is happy. I have a passion for creating, and the drive to make a
              difference.
            </Typography>
          </Box>
        </Grid>
        <Grid className={styles.card} item xs={1}>
          <a href='https://github.com/Inari13066'>
            <Box className={styles.cardImgWrapper}>
              <section className={styles.cardImgGitWrapper}>
                <img className={styles.cardImgGit} src={gitHubIcon} />
              </section>
              <img className={styles.cardImg} src='https://imgflip.com/s/meme/Cute-Cat.jpg' />
            </Box>
          </a>
          <Box className={styles.infoWrapper}>
            <Typography variant='h5' component='h5'>
              Danuta Carpava
            </Typography>
            <Chip className={styles.role} color='primary' variant='filled' label='Front-end Developer' />
            <Typography className={styles.bio}>
              Im a front-end developer: the creative force behind the digital space. I spend my days dreaming up new and exciting ways to make
              interactive multimedia experiences come to life. But dont let my creative abilities fool you, Im also a problem-solving machine and will
              stop at nothing until the project is completed and the client is happy. I have a passion for creating, and the drive to make a
              difference.
            </Typography>
          </Box>
        </Grid>
        <Grid className={styles.card} item xs={1}>
          <a href='https://github.com/Svygzhryr'>
            <Box className={styles.cardImgWrapper}>
              <section className={styles.cardImgGitWrapper}>
                <img className={styles.cardImgGit} src={gitHubIcon} />
              </section>
              <img className={styles.cardImg} src='https://i.imgur.com/eo3IDdK.jpg' />
            </Box>
          </a>
          <Box className={styles.infoWrapper}>
            <Typography variant='h5' component='h5'>
              Pavel Mihailov
            </Typography>
            <Chip className={styles.role} color='primary' variant='filled' label='Front-end Developer' />
            <Typography className={styles.bio}>
              Born in Mogilev, Belarus, graduated a Belarusian-Russian University with a degree in biotechnical systems and technologies. Strives to
              learn Front-end because this is what he always wanted to do. May and will be lazy sometimes but for sure will try his best. (on the last
              day before the deadline)
            </Typography>
          </Box>
        </Grid>
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
      <Link href='https://rs.school/index.html'>
        <IconButton className={styles.rsIconWrapper}>
          <img className={styles.rsIcon} src={rsIcon} />
        </IconButton>
      </Link>
    </>
  );
};
