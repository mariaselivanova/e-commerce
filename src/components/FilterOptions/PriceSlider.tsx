import { Box, Slider, Typography } from '@mui/material';
import React, { FC } from 'react';

import styles from './FilterOptions.module.css';

interface IPriceSlider {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}

function valuetext(value: number): string {
  return `${value}`;
}

const marks = [
  {
    value: 1,
    label: '$ 1',
  },
  {
    value: 750,
    label: '$ 750',
  },
  {
    value: 1500,
    label: '$ 1500',
  },
];

export const PriceSlider: FC<IPriceSlider> = ({ priceRange, setPriceRange }) => {
  const handleChange = (event: Event, newValue: number | number[]): void => {
    setPriceRange(newValue as number[]);
  };

  return (
    <Box>
      <Typography>Price range:</Typography>
      <Box className={styles.slider}>
        <Slider
          getAriaLabel={(): string => 'Price range'}
          min={1}
          max={1500}
          value={priceRange}
          onChange={handleChange}
          valueLabelDisplay='auto'
          getAriaValueText={valuetext}
          size='small'
          marks={marks}
        />
      </Box>
    </Box>
  );
};
