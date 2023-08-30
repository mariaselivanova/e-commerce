import React, { FC, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './SortOptionsInput.module.css';

const sortOptions = [
  { label: 'Newest', value: 'createdAt desc' },
  { label: 'Oldest', value: 'createdAt asc' },
  { label: 'Lowest price', value: 'price asc' },
  { label: 'Highest price', value: 'price desc' },
  { label: 'A-Z', value: 'name.en-US asc' },
  { label: 'Z-A', value: 'name.en-US desc' },
  { label: 'Default', value: '' },
];

export const SortOptionsInput: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const [sort, setSort] = useState('');

  useEffect(() => {
    const sortFromQuery = searchParams.get('sort') || '';
    setSort(sortFromQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleChange = (event: SelectChangeEvent): void => {
    const newSort = event.target.value;

    if (newSort === '') {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', newSort);
    }

    navigate({ search: searchParams.toString() });
    setSort(newSort);
  };

  return (
    <FormControl className={styles.form} size='small'>
      <InputLabel className={styles.placeholder} id='sort'>
        Sort
      </InputLabel>
      <Select className={styles.options} value={sort} label='Sort' onChange={handleChange}>
        {sortOptions.map(({ value, label }) => (
          <MenuItem className={styles.options} key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
