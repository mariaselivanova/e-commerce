import React, { FC } from 'react';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RouteLinks } from '../../utils/types';

import { PriceDisplay } from '../PriceDisplay';
import { AddToCartBtn } from '../AddToCartBtn';

import styles from './ProductCard.module.css';

interface IProductCardProps {
  productKey?: string;
  image?: string;
  title: string;
  description?: string;
  initialPrice?: number;
  discountedPrice?: number;
  categoryId: string | null;
  productId: string;
  quantity: number;
}

export const ProductCard: FC<IProductCardProps> = (props) => {
  const { productKey, image, title, description, initialPrice, discountedPrice, categoryId, productId, quantity } = props;

  const navigate = useNavigate();

  const onCardClick = (): void => {
    navigate(`${RouteLinks.Catalog}/${productKey}`, {
      state: { fromCategory: categoryId },
    });
  };

  return (
    <Grid justifyContent='center' className={styles.wrapper} item xl={4}>
      <Card className={styles.card}>
        <CardActionArea onClick={onCardClick}>
          <CardMedia className={styles.cardMedia} component='img' image={image} alt={title} />
        </CardActionArea>
        <CardContent className={styles.content}>
          <Typography gutterBottom variant='h6' component='h2'>
            {title}
          </Typography>
          <Typography className={styles.text} gutterBottom variant='body2' component='p' color='text.secondary'>
            {description}
          </Typography>
          <PriceDisplay initialPrice={initialPrice} discountedPrice={discountedPrice} />
          <AddToCartBtn productId={productId} quantity={quantity} />
        </CardContent>
      </Card>
    </Grid>
  );
};
