import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { getProductByKey } from '../../sdk/requests';

import styles from './ProductPage.module.css';

interface IProduct {
  name: string;
  description?: string;
}

export const ProductPage: FC = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState<IProduct>({
    name: '',
    description: '',
  });

  useEffect(() => {
    getProductByKey(productKey as string).then(({ body: { name, description } }) => {
      const descriptionText = description ? description['en-US'] : '';
      setProduct({ name: name['en-US'], description: descriptionText });
    });
  }, [productKey]);

  return (
    <Box className={styles.wrapper}>
      <Typography className={styles.text} variant='h4'>
        {product.name}
      </Typography>
      <Typography className={styles.text} variant='body1'>
        {product.description}
      </Typography>
    </Box>
  );
};
