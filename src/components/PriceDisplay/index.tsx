import React, { FC } from 'react';
import { Stack, Typography } from '@mui/material';

import styles from './PriceDisplay.module.css';

interface IPriceDisplayProps {
  initialPrice?: number;
  discountedPrice?: number;
  size?: string;
  directionRow?: boolean;
}

export const PriceDisplay: FC<IPriceDisplayProps> = ({ initialPrice, discountedPrice, size = 'small', directionRow = true }) => {
  const formatPrice = (price: number): string => `$ ${(price / 100).toFixed(2)}`;

  const initialPriceDisplay = initialPrice ? formatPrice(initialPrice) : '';

  const oldPriceClassName = discountedPrice ? styles.oldPrice : '';

  const sizeVariant = size === 'small' ? 'body1' : 'h5';

  return (
    <>
      <Stack direction={directionRow ? 'row' : 'column'} className={styles.wrapper}>
        <Typography className={oldPriceClassName} variant={sizeVariant} component='p'>
          {initialPriceDisplay}
        </Typography>
        {discountedPrice && (
          <Typography className={styles.discount} variant={sizeVariant} component='p'>
            {formatPrice(discountedPrice)}
          </Typography>
        )}
      </Stack>
    </>
  );
};
