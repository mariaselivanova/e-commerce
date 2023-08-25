import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { getProductsProjections } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { RouteLinks } from '../../utils/types';

import { UserMessage } from '../../components/UserMessage';

import styles from './CatalogPage.module.css';
import { ProductCard } from '../../components/ProductCard';

export const CatalogPage: FC = () => {
  const [productList, setProductList] = useState<ProductProjection[]>([]);

  const navigate = useNavigate();

  const { errorState, closeError, handleError } = useErrorHandling();

  useEffect(() => {
    closeError();
    getProductsProjections()
      .then((data) => setProductList(data.body.results))
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <Grid container spacing={4} className={styles.cardsWrapper}>
        {productList.map((product) => (
          <ProductCard
            key={uuidv4()}
            image={product.masterVariant.images?.[0]?.url}
            title={product.name['en-US']}
            description={product.metaDescription?.['en-US']}
            onClick={(): void => navigate(`${RouteLinks.Catalog}/${product.key}`)}
          />
        ))}
      </Grid>
    </>
  );
};
