import { Box, Button, Popover, Stack } from '@mui/material';
import React, { FC, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { PriceSlider } from './PriceSlider';
import { RadioGroupEl } from './RadioGroupEl';

import styles from './FilterOptionsInputs.module.css';

type Metal = 'gold' | 'silver' | '';
type Gemstone = 'ruby' | 'emerald' | '';

const metals = ['gold', 'silver'];
const gemstones = ['ruby', 'emerald'];

const INITIAL_PRICE_RANGE = [1, 1500];
const QUERY_REGEX = /(?=variants\.)/;
const PRICE_QUERY_REGEX = /range\((\d+)00 to (\d+)00\)/;

const queryStrings = {
  gemstone: (gemstone: Gemstone): string => `variants.attributes.gemstones:"${gemstone}"`,
  metal: (metal: Metal): string => `variants.attributes.metal:"${metal}"`,
  price: (range: number[]): string => `variants.price.centAmount:range(${range[0]}00 to ${range[1]}00)`,
};

export const FilterOptions: FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>(INITIAL_PRICE_RANGE);
  const [selectedMetal, setSelectedMetal] = useState<Metal>('');
  const [selectedGemstone, setSelectedGemstone] = useState<Gemstone>('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const filterQuery = searchParams.get('filter');

  const resetFilters = (): void => {
    setPriceRange(INITIAL_PRICE_RANGE);
    setSelectedMetal('');
    setSelectedGemstone('');
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
          setSelectedMetal(metalMatch as Metal);
        }

        if (gemstoneMatch) {
          setSelectedGemstone(gemstoneMatch as Gemstone);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSetFilters = (): void => {
    const selectedAttributes: string[] = [];

    selectedAttributes.push(queryStrings.price(priceRange));

    if (selectedMetal) {
      selectedAttributes.push(queryStrings.metal(selectedMetal));
    }

    if (selectedGemstone) {
      selectedAttributes.push(queryStrings.gemstone(selectedGemstone));
    }

    searchParams.set('filter', selectedAttributes.join(' '));
    navigate({ search: searchParams.toString() });
    setAnchorEl(null);
  };

  const handleReset = (): void => {
    resetFilters();
    searchParams.delete('filter');
    navigate(`?${searchParams.toString()}`, { replace: true });
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
        <Stack display='flex' className={styles.popover}>
          <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
          <RadioGroupEl value={selectedMetal} onChange={(e): void => setSelectedMetal(e.target.value as Metal)} options={metals} label='Metal' />
          <RadioGroupEl
            value={selectedGemstone}
            onChange={(e): void => setSelectedGemstone(e.target.value as Gemstone)}
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
