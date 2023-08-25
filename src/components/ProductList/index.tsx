import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';

import { ProductCard } from '../ProductCard';

import styles from './ProductList.module.css';

interface ProductListProps {
  productList: ProductProjection[];
}

export const ProductList: FC<ProductListProps> = ({ productList }) => (
  <Grid container spacing={4} className={styles.cardsWrapper}>
    {productList.map(({ key, masterVariant, name, metaDescription }) => (
      <ProductCard
        key={key}
        productKey={key}
        image={masterVariant.images?.[0]?.url}
        title={name['en-US']}
        description={metaDescription?.['en-US']}
        initialPrice={masterVariant.prices?.[0].value.centAmount}
        discountedPrice={masterVariant.prices?.[0].discounted?.value.centAmount}
      />
    ))}
  </Grid>
);
