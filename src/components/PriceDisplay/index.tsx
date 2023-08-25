import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';

import styles from './PriceDisplay.module.css';

interface IPriceDisplayProps {
  initialPrice?: number;
  discountedPrice?: number;
}

export const PriceDisplay: FC<IPriceDisplayProps> = ({ initialPrice, discountedPrice }) => {
  const convertPrice = (price: number): string => `$ ${price / 100}`;
  let initial: string;
  if (initialPrice) {
    initial = convertPrice(initialPrice);
  }

  const renderPrice = (): ReactElement =>
    discountedPrice ? (
      <Box display='flex' flexDirection='row' gap='10px'>
        <Typography className={styles.old} variant='h6'>
          {initial}
        </Typography>
        <Typography className={styles.discount} variant='h6'>
          {convertPrice(discountedPrice)}
        </Typography>
      </Box>
    ) : (
      <Typography variant='h6'>{initial}</Typography>
    );

  return renderPrice();
};
