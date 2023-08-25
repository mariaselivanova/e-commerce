import React, { FC } from 'react';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';

import styles from './ProductCard.module.css';

interface IProductCardProps {
  image?: string;
  title: string;
  description?: string;
  onClick: () => void;
  initialPrice?: number;
  discountedPrice?: number;
}

export const ProductCard: FC<IProductCardProps> = ({ image, title, description, onClick, initialPrice, discountedPrice }) => (
  <Grid item md={4} className={styles.wrapper}>
    <Card sx={{ maxWidth: 380 }} onClick={onClick}>
      <CardActionArea>
        <CardMedia component='img' height='380' image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom color='text.primary' variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <Typography variant='h6' color='text.primary'>
            <span>{initialPrice}</span>
            <span>{discountedPrice}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);
