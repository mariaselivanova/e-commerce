import React, { FC } from 'react';
import { Box, Chip, Grid, Typography } from '@mui/material';

import gitHubIcon from '../../assets/icons/github-mark.svg';
import styles from './AboutCard.module.css';

interface AboutCardProps {
  name: string;
  photo: string;
  github: string;
  bio: string[];
}

export const AboutCard: FC<AboutCardProps> = ({ name, photo, github, bio }) => (
  <Grid className={styles.card} item xs={1}>
    <a target='_blank' rel='noopener noreferrer' href={github}>
      <Box className={styles.cardImgWrapper}>
        <section className={styles.cardImgGitWrapper}>
          <img className={styles.cardImgGit} src={gitHubIcon} />
        </section>
        <img className={styles.cardImg} src={photo} />
      </Box>
    </a>
    <Box className={styles.infoWrapper}>
      <Typography variant='h5' component='h5'>
        {name}
      </Typography>
      <Chip className={styles.role} color='primary' variant='filled' label={name === 'Maria Selivanova' ? 'Team lead' : 'Front-end Developer'} />
      {bio.map((item) => (
        <Typography key={item} className={styles.bio}>
          {item}
        </Typography>
      ))}
    </Box>
  </Grid>
);
