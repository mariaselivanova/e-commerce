import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import styles from './PriceDisplay.module.css';

interface IPriceDisplayProps {
  initialPrice?: number;
  discountedPrice?: number;
}

export const PriceDisplay: FC<IPriceDisplayProps> = ({ initialPrice, discountedPrice }) => {
  const formatPrice = (price: number): string => `$ ${price / 100}`;

  const initialPriceDisplay = initialPrice ? formatPrice(initialPrice) : '';

  const oldPriceClassName = discountedPrice ? styles.oldPrice : '';

  return (
    <Box className={styles.wrapper}>
      <Typography className={oldPriceClassName} variant='body1' component='p'>
        {initialPriceDisplay}
      </Typography>
      {discountedPrice && (
        <Typography className={styles.discount} variant='body1' component='p'>
          {formatPrice(discountedPrice)}
        </Typography>
      )}
    </Box>
  );
};
