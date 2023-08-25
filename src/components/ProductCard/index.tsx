import React, { FC } from 'react';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';

import { PriceDisplay } from '../PriceDisplay';

import styles from './ProductCard.module.css';

interface IProductCardProps {
  image?: string;
  title: string;
  description?: string;
  onClick: () => void;
  initialPrice?: number;
  discountedPrice?: number;
}

export const ProductCard: FC<IProductCardProps> = (props) => {
  const { image, title, description, onClick, initialPrice, discountedPrice } = props;

  return (
    <Grid item xl={4} className={styles.wrapper}>
      <Card className={styles.card} onClick={onClick}>
        <CardActionArea>
          <CardMedia className={styles.cardMedia} component='img' image={image} alt={title} />
          <CardContent className={styles.content}>
            <Typography gutterBottom variant='h6' component='h2'>
              {title}
            </Typography>
            <Typography className={styles.text} variant='body2' component='p' color='text.secondary'>
              {description}
            </Typography>
            <PriceDisplay initialPrice={initialPrice} discountedPrice={discountedPrice} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
