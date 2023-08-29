import React, { FC, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { SortOptions } from '../../utils/types';

import styles from './SortOptionsInput.module.css';

export const SortOptionsInput: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sort, setSort] = useState('');
  const categoryId = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    setSort(SortOptions.Initial);
  }, [categoryId]);

  const handleChange = (event: SelectChangeEvent): void => {
    const newSort = event.target.value as SortOptions;
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort', newSort);
    navigate({ search: searchParams.toString() });
    setSort(newSort);
  };

  return (
    <FormControl size='small' className={styles.form}>
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
