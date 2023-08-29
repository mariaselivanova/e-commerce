import React, { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SortOptions } from '../../utils/types';

import styles from './SortOptionsInput.module.css';

interface ISortOptionsInput {
  sort?: SortOptions;
  setSort: (sort: SortOptions) => void;
}

export const SortOptionsInput: FC<ISortOptionsInput> = ({ sort, setSort }) => {
  const handleChange = (event: SelectChangeEvent): void => {
    setSort(event.target.value as SortOptions);
  };

  return (
    <FormControl className={styles.form}>
      <InputLabel id='sort'>Sort</InputLabel>
      <Select value={sort} label='Sort' onChange={handleChange}>
        <MenuItem value={SortOptions.Newest}>Newest</MenuItem>
        <MenuItem value={SortOptions.Oldest}>Oldest</MenuItem>
        <MenuItem value={SortOptions.LowestPrice}>Lowest price</MenuItem>
        <MenuItem value={SortOptions.HighestPrice}>Highest price</MenuItem>
        <MenuItem value={SortOptions.AZ}>A-Z</MenuItem>
        <MenuItem value={SortOptions.ZA}>Z-A</MenuItem>
      </Select>
    </FormControl>
  );
};
