import React, { FC, useEffect, useState } from 'react';
import { Popover, TextField, IconButton, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './SearchInput.module.css';

export const SearchInput: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const [searchOptions, setSearchOptions] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    const searchFromQuery = searchParams.get('search') || '';
    setSearchOptions(searchFromQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const closePopover = (): void => {
    setAnchorEl(null);
  };

  const handleSearch = (): void => {
    if (searchOptions === '') {
      searchParams.delete('search');
    } else {
      searchParams.set('search', searchOptions);
    }
    navigate({ search: searchParams.toString() });
    closePopover();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'search-popover' : undefined;

  return (
    <>
      <IconButton onClick={(e): void => setAnchorEl(e.currentTarget)}>
        <SearchIcon />
      </IconButton>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={closePopover} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Box className={styles.wrapper}>
          <TextField
            variant='standard'
            value={searchOptions}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setSearchOptions(event.target.value);
            }}
          />
          <Button onClick={handleSearch} className={styles.button}>
            Search
          </Button>
        </Box>
      </Popover>
    </>
  );
};
