import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';
import { v4 as uuidv4 } from 'uuid';

import { getProductsProjections } from '../../sdk/requests';

export const CatalogPage: FC = () => {
  const [productList, setProductList] = useState<ProductProjection[]>([]);

  useEffect(() => {
    getProductsProjections().then((data) => setProductList(data.body.results));
  }, []);

  return (
    <Grid container spacing={4}>
      {productList.map((product) => (
        <Grid item xs={4} key={uuidv4()}>
          <Box
            sx={{
              width: '100%',
              padding: '20px',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Typography>{product.name['en-US']}</Typography>
            {product.description && <Typography>{product.description['en-US']}</Typography>}
            <Button variant='contained'>Learn more</Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
