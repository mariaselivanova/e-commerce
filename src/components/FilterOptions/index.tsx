import { Box, Button, Popover, Stack } from '@mui/material';
import React, { FC, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { PriceSlider } from './PriceSlider';
import { RadioGroupEl } from './RadioGroupEl';

import styles from './FilterOptions.module.css';

type Metal = 'gold' | 'silver' | '';
type Gemstone = 'ruby' | 'emerald' | '';

const metals = ['gold', 'silver'];
const gemstones = ['ruby', 'emerald'];

const INITIAL_PRICE_RANGE = [1, 1500];
const QUERY_REGEX = /(?=variants\.)/;
const PRICE_QUERY_REGEX = /range\((\d+)00 to (\d+)00\)/;
const FILTER_QUERY = 'filter';

const queryStrings = {
  gemstone: (gemstone: Gemstone): string => `variants.attributes.gemstones:"${gemstone}"`,
  metal: (metal: Metal): string => `variants.attributes.metal:"${metal}"`,
  price: (range: number[]): string => `variants.price.centAmount:range(${range[0]}00 to ${range[1]}00)`,
};

export const FilterOptions: FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>(INITIAL_PRICE_RANGE);
  const [selectedAttributes, setSelectedAttributes] = useState<{ metal: Metal; gemstone: Gemstone }>({
    metal: '',
    gemstone: '',
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const filterQuery = searchParams.get(FILTER_QUERY);

  const resetFilters = (): void => {
    setPriceRange(INITIAL_PRICE_RANGE);
    setSelectedAttributes({ metal: '', gemstone: '' });
  };

  useEffect(() => {
    resetFilters();
    if (filterQuery) {
      filterQuery.split(QUERY_REGEX).forEach((filter) => {
        const priceMatch = filter.match(PRICE_QUERY_REGEX);
        const metalMatch = metals.find((metal) => filter.includes(queryStrings.metal(metal as Metal)));
        const gemstoneMatch = gemstones.find((gemstone) => filter.includes(queryStrings.gemstone(gemstone as Gemstone)));

        if (priceMatch) {
          const [minPrice, maxPrice] = priceMatch.slice(1).map(Number);
          setPriceRange([minPrice, maxPrice]);
        }

        if (metalMatch) {
          setSelectedAttributes({ ...selectedAttributes, metal: metalMatch as Metal });
        }

        if (gemstoneMatch) {
          setSelectedAttributes({ ...selectedAttributes, gemstone: gemstoneMatch as Gemstone });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSetFilters = (): void => {
    const selectedFilters: string[] = [];

    if (selectedAttributes.metal) {
      selectedFilters.push(queryStrings.metal(selectedAttributes.metal));
    }

    if (selectedAttributes.gemstone) {
      selectedFilters.push(queryStrings.gemstone(selectedAttributes.gemstone));
    }

    selectedFilters.push(queryStrings.price(priceRange));

    searchParams.set(FILTER_QUERY, selectedFilters.join(' '));
    navigate({ search: searchParams.toString() });
    setAnchorEl(null);
  };

  const handleReset = (): void => {
    resetFilters();
    searchParams.delete(FILTER_QUERY);
    navigate(`?${searchParams.toString()}`, { replace: true });
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  return (
    <Box sx={{ width: 100 }}>
      <Button variant='text' endIcon={<ArrowDropDownIcon fontSize='small' />} onClick={(e): void => setAnchorEl(e.currentTarget)}>
        Filters
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={(): void => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Stack className={styles.popover}>
          <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
          <RadioGroupEl
            value={selectedAttributes.metal}
            onChange={(e): void => setSelectedAttributes({ ...selectedAttributes, metal: e.target.value as Metal })}
            options={metals}
            label='Metal'
          />
          <RadioGroupEl
            value={selectedAttributes.gemstone}
            onChange={(e): void => setSelectedAttributes({ ...selectedAttributes, gemstone: e.target.value as Gemstone })}
            options={gemstones}
            label='Gemstones'
          />
          <Box className={styles.btnWrapper}>
            <Button variant='contained' onClick={handleSetFilters}>
              Set filters
            </Button>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Stack>
      </Popover>
    </Box>
  );
};
