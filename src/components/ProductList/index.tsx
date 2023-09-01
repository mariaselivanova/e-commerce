import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';

import { ProductCard } from '../ProductCard';

import styles from './ProductList.module.css';
import fallbackImage from '../../assets/images/not-found.jpg';

interface ProductListProps {
  productList: ProductProjection[];
  categoryId: string | null;
}

export const ProductList: FC<ProductListProps> = ({ productList, categoryId }) => {
  if (!productList.length) {
    return (
      <Box flex={1} alignItems='center' justifyContent='center' display='flex'>
        <Typography variant='h5'>Sorry, no products were found!</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4} className={styles.cardsWrapper}>
      {productList.map(({ key, masterVariant, name, metaDescription }) => (
        <ProductCard
          categoryId={categoryId}
          key={key}
          productKey={key}
          image={masterVariant.images?.[0]?.url || fallbackImage}
          title={name['en-US']}
          description={metaDescription?.['en-US']}
          initialPrice={masterVariant.prices?.[0].value.centAmount}
          discountedPrice={masterVariant.prices?.[0].discounted?.value.centAmount}
        />
      ))}
    </Grid>
  );
};
