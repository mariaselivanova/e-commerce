import React, { FC } from 'react';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';

import styles from './ProductCard.module.css';
import { PriceDisplay } from '../PriceDisplay';

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
          <PriceDisplay initialPrice={initialPrice} discountedPrice={discountedPrice} />
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);
