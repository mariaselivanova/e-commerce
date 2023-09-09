import React, { FC, useState } from 'react';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia, Button, Stack, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
  categoryId: string | null;
}

export const ProductCard: FC<IProductCardProps> = (props) => {
  const { productKey, image, title, description, initialPrice, discountedPrice, categoryId } = props;
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  const onCardClick = (): void => {
    navigate(`${RouteLinks.Catalog}/${productKey}`, {
      state: { fromCategory: categoryId },
    });
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setAmount(1);
  };

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setAmount((prev) => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setAmount((prev) => prev - 1);
  };

  return (
    <Grid justifyContent='center' className={styles.wrapper} item xl={4}>
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
        {amount < 1 ? (
          <Button className={styles.addBtn} onClick={handleAddToCart}>
            Add to cart
          </Button>
        ) : (
          <Stack direction='row' className={styles.amount}>
            <IconButton onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
            <Typography>{amount}</Typography>
            <IconButton onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>
          </Stack>
        )}
      </Card>
    </Grid>
  );
};
