import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import styles from './PriceDisplay.module.css';

interface IPriceDisplayProps {
  initialPrice?: number;
  discountedPrice?: number;
  size?: string;
}

export const PriceDisplay: FC<IPriceDisplayProps> = ({ initialPrice, discountedPrice, size = 'small' }) => {
  const formatPrice = (price: number): string => `$ ${(price / 100).toFixed(2)}`;

  const initialPriceDisplay = initialPrice ? formatPrice(initialPrice) : '';

  const oldPriceClassName = discountedPrice ? styles.oldPrice : '';

  const sizeVariant = size === 'small' ? 'body1' : 'h5';

  return (
    <Box className={styles.wrapper}>
      <Typography className={oldPriceClassName} variant={sizeVariant} component='p'>
        {initialPriceDisplay}
      </Typography>
      {discountedPrice && (
        <Typography className={styles.discount} variant={sizeVariant} component='p'>
          {formatPrice(discountedPrice)}
        </Typography>
      )}
    </Box>
  );
};
