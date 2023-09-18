import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { LineItem, ProductProjection } from '@commercetools/platform-sdk';

import { ProductCard } from '../ProductCard';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { Preloader } from '../Preloader';

import styles from './ProductList.module.css';
import fallbackImage from '../../assets/images/not-found.jpg';

interface ProductListProps {
  productList: ProductProjection[];
  categoryId: string | null;
  cartItems: LineItem[];
  setSuccessMessage: (message: string) => void;
  isLoading: boolean;
}

export const ProductList: FC<ProductListProps> = ({ productList, categoryId, cartItems, setSuccessMessage, isLoading }) => {
  const windowDimensions = useWindowWidth();

  if (isLoading) {
    return (
      <Box className={styles.helperWrapper}>
        <Preloader isBig />
      </Box>
    );
  }

  if (!productList.length) {
    return (
      <Box className={styles.helperWrapper}>
        <Typography variant='h5'>Sorry, no products were found!</Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={4}
      className={styles.cardsWrapper}
      columns={Math.floor(windowDimensions.windowWidth / 390)}
      width={Math.floor(windowDimensions.windowWidth / 390) * (350 + 32) - 32}
    >
      {productList.map(({ key, masterVariant, name, metaDescription, id }) => {
        const itemInCart = cartItems.find((item) => item.productId === id);
        const quantity = itemInCart ? itemInCart.quantity : 0;
        return (
          <ProductCard
            setSuccessMessage={setSuccessMessage}
            quantity={quantity}
            productId={id}
            categoryId={categoryId}
            key={key}
            productKey={key}
            image={masterVariant.images?.[0]?.url || fallbackImage}
            title={name['en-US']}
            description={metaDescription?.['en-US']}
            initialPrice={masterVariant.prices?.[0].value.centAmount}
            discountedPrice={masterVariant.prices?.[0].discounted?.value.centAmount}
          />
        );
      })}
    </Grid>
  );
};
