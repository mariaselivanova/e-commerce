import React, { FC } from 'react';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RouteLinks } from '../../utils/types';

import { PriceDisplay } from '../PriceDisplay';

import styles from './ProductCard.module.css';

interface IProductCardProps {
  productKey?: string;
  image?: string;
  title: string;
  description?: string;
  initialPrice?: number;
  discountedPrice?: number;
}

export const ProductCard: FC<IProductCardProps> = (props) => {
  const { productKey, image, title, description, initialPrice, discountedPrice } = props;

  const navigate = useNavigate();

  const onCardClick = (): void => {
    navigate(`${RouteLinks.Catalog}/${productKey}`);
  };

  return (
    <Grid className={styles.wrapper} item xl={4}>
      <Card className={styles.card} onClick={onCardClick}>
        <CardActionArea>
          <CardMedia className={styles.cardMedia} component='img' image={image} alt={title} />
          <CardContent className={styles.content}>
            <Typography gutterBottom variant='h6' component='h2'>
              {title}
            </Typography>
            <Typography className={styles.text} gutterBottom variant='body2' component='p' color='text.secondary'>
              {description}
            </Typography>
            <PriceDisplay initialPrice={initialPrice} discountedPrice={discountedPrice} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
