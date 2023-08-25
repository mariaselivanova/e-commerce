import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import styles from './PriceDisplay.module.css';

interface IPriceDisplayProps {
  initialPrice?: number;
  discountedPrice?: number;
}

export const PriceDisplay: FC<IPriceDisplayProps> = ({ initialPrice, discountedPrice }) => {
  const convertPrice = (price: number): string => `$ ${price / 100}`;

  if (!initialPrice) {
    return null;
  }

  const convertedInitialPrice = (): string => convertPrice(initialPrice);

  return (
    <>
      {discountedPrice ? (
        <Box className={styles.wrapper}>
          <Typography className={styles.oldPrice} variant='body1' component='p'>
            {convertedInitialPrice()}
          </Typography>
          <Typography className={styles.discount} variant='body1' component='p'>
            {convertPrice(discountedPrice)}
          </Typography>
        </Box>
      ) : (
        <Typography variant='body1' component='p'>
          {convertedInitialPrice()}
        </Typography>
      )}
    </>
  );
};
