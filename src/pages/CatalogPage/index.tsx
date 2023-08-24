import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { getProductsProjections } from '../../sdk/requests';
import { catalogRoute } from '../../utils/routes';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import { UserMessage } from '../../components/UserMessage';

import styles from './CatalogPage.module.css';

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
      <Grid container spacing={4}>
        {productList.map((product) => (
          <Grid item xs={4} key={uuidv4()}>
            <Box className={styles.wrapper}>
              <Typography>{product.name['en-US']}</Typography>
              <Button variant='contained' onClick={(): void => navigate(`${catalogRoute}/${product.key}`)}>
                Learn more
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
