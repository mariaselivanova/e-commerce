import React, { FC } from 'react';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';

import styles from './ProductCard.module.css';

interface IProductCardProps {
  image?: string;
  title: string;
  description?: string;
  onClick: () => void;
}

export const ProductCard: FC<IProductCardProps> = ({ image, title, description, onClick }) => (
  <Grid item md={4} className={styles.wrapper}>
    <Card sx={{ maxWidth: 300 }} raised onClick={onClick}>
      <CardActionArea>
        <CardMedia component='img' height='280' image={image} alt='green iguana' />
        <CardContent>
          <Typography gutterBottom color='text.primary' variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <Typography variant='h6' color='text.primary'>
            <span>$200 </span>
            <span> $150</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);
